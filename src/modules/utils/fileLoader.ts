import { glob } from 'glob'
import path from 'node:path';

async function deleteCachedFile(file: string) {
    const filePath = path.resolve(file);
    if (require.cache[filePath]) delete require.cache[filePath]
}

export async function loadFiles(dirName: string) {
    try {
        const files = await glob(path.join(process.cwd(), dirName, "**/*.js").replace(/\\/g, "/"));
        const jsFiles = files.filter(file => path.extname(file) === '.js');
        await Promise.all(jsFiles.map(deleteCachedFile));
        return jsFiles;
    } catch (error) {
        console.error(`Error loading files from directory ${dirName}: ${error}`)
        throw error;
    }
}