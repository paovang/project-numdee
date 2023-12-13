import * as fs from 'fs';

export function createIndexFiles(folderPath) {
    const foldersToCreateIndexFile = [
        'command/handlers',
        'controllers',
        'data-typeorm/models',
        'data-typeorm/seeds/seeders',
        'data-typeorm/service',
        'queries'
    ];

    foldersToCreateIndexFile.forEach(subfolder => {
        createIndexFile(`${folderPath}/${subfolder}`);
    });
}

function createIndexFile(folderPath: string) {
    const indexPath = `${folderPath}/index.ts`;
    try {
        fs.writeFileSync(indexPath, '', 'utf-8');
        console.log(`ไฟล์ index.ts ถูกสร้างใน ${folderPath}`);
    } catch (err) {
        console.error(`เกิดข้อผิดพลาดในการสร้างไฟล์ index.ts: ${err}`);
    }
}