import * as fs from 'fs'
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export async function loadTemplate(fileName, context, next) {
    try {
        const filePath = path.resolve(__dirname, '../', `views/${fileName}`);

        const template = readFileSync(filePath, 'utf-8');

        return template.replace(/{{(.+?)}}/g, (match) => context[match.slice(2, -2)]);
    } catch (err) {
        next(err)
    }
}
