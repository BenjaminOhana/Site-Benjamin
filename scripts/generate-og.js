
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../public');
const generatorPath = path.join(publicDir, 'og-generator.html');
const outputPath = path.join(publicDir, 'og-social-v5.png');

async function generateOG() {
    console.log('Starting OG Image generation...');

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set viewport to OG standard
        await page.setViewport({
            width: 1200,
            height: 630,
            deviceScaleFactor: 2 // High resolution
        });

        // Load the local HTML file
        // We use file:// protocol
        const fileUrl = `file://${generatorPath}`;
        console.log(`Loading: ${fileUrl}`);

        await page.goto(fileUrl, { waitUntil: 'networkidle0' });

        // Wait a small moment for any fonts or images to settle perfectly
        await new Promise(r => setTimeout(r, 1000));

        await page.screenshot({
            path: outputPath,
            type: 'png',
            fullPage: true
        });

        console.log(`✅ OG Image generated at: ${outputPath}`);

    } catch (error) {
        console.error('❌ Error generating OG image:', error);
        process.exit(1);
    } finally {
        await browser.close();
    }
}

generateOG();
