import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { createFolder } from './createFolder.js';
import { createFile } from './createFile.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Takes the project name from command line
const args = process.argv.slice(2);
const projectName = args[0];
if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

// Define the folder paths
const baseFolderPath = path.resolve(process.cwd(), `../${projectName}`);
const createController = path.join(baseFolderPath, 'controller');
const routeController = path.join(baseFolderPath, 'routes');
const viewsController = path.join(baseFolderPath, 'views');
const partials = path.join(viewsController, 'partials')
const middleware = path.join(baseFolderPath, 'middleware');
const db = path.join(baseFolderPath, 'db');
const models = path.join(baseFolderPath, 'models');
const publicFolder = path.join(baseFolderPath, 'public');
const css = path.join(publicFolder, 'css');
const images = path.join(publicFolder, 'images');
const js = path.join(publicFolder, 'js');
const appJS = path.join(baseFolderPath, 'app.js');
const gitIgnore = path.join(baseFolderPath, '.gitignore');

// Content for app.js
const content_of_appJs = `
import express from 'express';
const app = express();
const port = process.env.PORT || '3000';

app.get('/', (req, res) => {
    res.send('Express App is up and running');
});

app.listen(port, () => {
    console.log(\`Server Running at http://localhost:\${port}\`);
});
`;

// Content for .gitignore
const content_of_gitIgnore = '/node_modules';

function setupNpm(projectPath) {
  // Change to the project directory
  process.chdir(projectPath);

  // Initialize npm with -y flag
  execSync('npm init -y', { stdio: 'inherit' });

  // Install express
  execSync('npm install express', { stdio: 'inherit' });
  // install ejs
  execSync('npm install ejs', { stdio: 'inherit' });
  // Install mongoose
  execSync('npm install mongoose', { stdio: 'inherit' });
  // Install Cookie-parser
  execSync('npm install cookie-parser', { stdio: 'inherit' });

  // Install nodemon as a development dependency
  execSync('npm install --save-dev nodemon', { stdio: 'inherit' });

  // Modify package.json to include "type": "module" and "dev" script
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Add "type": "module" and "dev" script
  packageJson.type = 'module';
  packageJson.scripts = {
    ...packageJson.scripts,
    dev: 'nodemon app.js'
  };

  // Write the updated package.json back to the file
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

  console.log('NPM initialization, express installation, and package.json update complete.');
}

// Create the folders
createFolder(baseFolderPath);
createFolder(createController);
createFolder(routeController);
createFolder(viewsController);
createFolder(partials);
createFolder(publicFolder);
createFolder(middleware);
createFolder(db);
createFolder(models);
createFolder(css);
createFolder(images);
createFolder(js);

// Create files
createFile(appJS, content_of_appJs);
createFile(gitIgnore, content_of_gitIgnore);

// Set up npm
setupNpm(baseFolderPath);

console.log(`Project structure created successfully in: ${baseFolderPath}`);