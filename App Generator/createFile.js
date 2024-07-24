import fs from 'fs';
import path from 'path';



const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content);
  console.log(`File created successfully at: ${filePath}`);
}

export { createFile }