import * as fs from 'fs';

export function createFileModule(modulePath, folderName) {
    const indexPath = `${modulePath}/${folderName}.module.ts`;
    try {
        fs.writeFileSync(indexPath, '', 'utf-8');
        console.log(`ໄຟລ໋ index.ts ຖືກສ້າງໃນ ${indexPath}`);
    } catch (err) {
        console.error(`ເກີດຂໍ້ຜິດພາດໃນການສ້າງໄຟລ໋ index.ts: ${err}`);
    }
}