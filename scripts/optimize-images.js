import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientsDir = path.join(__dirname, '../src/assets/images/clients');

async function optimize() {
    console.log(`Scanning ${clientsDir}...`);
    const files = fs.readdirSync(clientsDir).filter(file => file.endsWith('.png'));

    for (const file of files) {
        const inputPath = path.join(clientsDir, file);
        const outputPath = path.join(clientsDir, file.replace('.png', '.webp'));

        console.log(`Processing ${file} -> webp...`);

        await sharp(inputPath)
            .resize(128, 128, { fit: 'cover' }) // Resize to reasonable avatar size
            .webp({ quality: 80 })
            .toFile(outputPath);

        console.log(`Saved ${outputPath}`);
    }
    console.log('Done.');
}

optimize().catch(console.error);
