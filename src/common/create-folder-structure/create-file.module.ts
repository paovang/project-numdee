import * as fs from 'fs';

export function createFileModule(modulePath, folderName) {
    const indexPath = `${modulePath}/${folderName}.module.ts`;
    try {
        fs.writeFileSync(indexPath, '', 'utf-8');
        console.log(`ไฟล์ index.ts ถูกสร้างใน ${indexPath}`);
    } catch (err) {
        console.error(`เกิดข้อผิดพลาดในการสร้างไฟล์ index.ts: ${err}`);
    }
}