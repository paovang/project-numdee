import * as fs from 'fs';
import { createIndexFiles } from './create-file.index';
import { createFileModule } from './create-file.module';

// รับชื่อโฟลเดอร์จาก command line arguments
const folderName = process.argv[2];

if (!folderName) {
  console.error('กรุณาระบุชื่อโฟลเดอร์');
  process.exit(1);
}

// รายชื่อโฟลเดอร์ที่คุณต้องการสร้าง
const foldersToCreate = [
    'command/commands', 
    'command/handlers', 
    'controllers', 
    'data-typeorm/service', 
    'data-typeorm/models', 
    'data-typeorm/seeds', 
    'data-typeorm/seeds/seeders', 
    'domain/entity',
    'domain/repositories',
    'dtos',
    'mappers/dtos',
    'mappers/entities',
    'mappers/presenters',
    'presenters',
    'queries/queries',
    'queries/handles',
];

// ตำแหน่งของโมดูล "user"
const modulePath = `src/modules/${folderName}`;

// สร้างโฟลเดอร์
foldersToCreate.forEach(subfolderName => {
  const folderPath = `${modulePath}/${subfolderName}`;

  try {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`ສ້າງໂຟເດີ່ ${subfolderName} ຖືກສ້າງໃນ ${modulePath}`);
  } catch (err) {
    console.error(`ເກີດຂໍ້ຜິດພາດໃນການສ້າງໂຟເດີ່ ${subfolderName}: ${err}`);
  }
});


/** Create Index File */
createIndexFiles(modulePath);

/** Create File Module */
createFileModule(modulePath, folderName);
