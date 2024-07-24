import fs from 'fs';

function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Folder created successfully at: ${folderPath}`);
    } else {
      console.log(`Folder already exists at: ${folderPath}`);
    }
  }


export { createFolder };  