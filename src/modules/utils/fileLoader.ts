import { glob } from 'glob'
import path from 'node:path';

async function deleteCachedFile(file: string): Promise<void> {
    const filePath = path.resolve(file);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (require.cache[filePath] != null) delete require.cache[filePath]
}

export async function loadFiles(dirName: string): Promise<string[]> {
    try {
        const files = await glob(path.join(process.cwd(), dirName, "**/*.js").replace(/\\/g, "/"));
        const jsFiles = files.filter(file => path.extname(file) === '.js');
        await Promise.all(jsFiles.map(deleteCachedFile));
        return jsFiles;
    } catch (error: any) {
        console.error(`Error loading files from directory ${dirName}: ${error}`)
        throw error;
    }
}