import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
const port = 4173; // Standard Vite preview port

const routes = [
    '/',
    '/mentions-legales',
    '/politique-confidentialite',
    '/mentions-legales.html', // Handle .html extension if needed or redirect
    '/politique-confidentialite.html'
];

async function prerender() {
    // 1. Start a local server to serve the 'dist' folder
    const app = express();
    app.use(express.static(distPath));

    // SPA fallback: serve index.html for unknown routes
    app.use((req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });

    const server = app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    // 2. Launch Puppeteer
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    console.log('Starting prerender...');

    for (const route of routes) {
        try {
            console.log(`Prerendering: ${route}`);

            const url = `http://localhost:${port}${route}`;
            await page.goto(url, { waitUntil: 'networkidle0' });

            // Wait a bit for animations/JS to settle manually if networkidle is too fast
            await new Promise(r => setTimeout(r, 1000));

            const content = await page.content();

            // Determine output path
            // If route is /, save to index.html
            // If route is /foo, create dist/foo/index.html
            // If route ends in .html, save as dist/route

            let outputPath;
            if (route === '/') {
                outputPath = path.join(distPath, 'index.html');
            } else if (route.endsWith('.html')) {
                outputPath = path.join(distPath, route.substring(1));
            } else {
                const folder = path.join(distPath, route.substring(1));
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, { recursive: true });
                }
                outputPath = path.join(folder, 'index.html');
            }

            // Replace localhost links with production domain
            const finalHtml = content
                .replace(/http:\/\/localhost:4173/g, 'https://entrepreneuraligne.fr')
            // Remove scripts or added state if necessary (simple for now)

            fs.writeFileSync(outputPath, finalHtml);
            console.log(`Generated: ${outputPath}`);

        } catch (e) {
            console.error(`Error prerendering ${route}:`, e);
        }
    }

    await browser.close();
    server.close();
    console.log('Prerender complete.');
    process.exit(0);
}

prerender();
