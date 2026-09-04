import fs from 'fs';
import path from 'path';

const schemaFolder = path.join('Config', 'Schemas');
const dataFolder = path.join('Data');

// Ensure data folder exists
if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder, { recursive: true });
}

// Read schema files
const schemaFiles = fs.readdirSync(schemaFolder);

schemaFiles.forEach(file => {
    const schemaPath = path.join(schemaFolder, file);
    const dataPath = path.join(dataFolder, file);

    // Read schema content
    const schemaContent = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

    // Extract data array or create empty array if no data
    const data = schemaContent.data || [];

    // Write data array to new file
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
});

console.log('Data files generated!');