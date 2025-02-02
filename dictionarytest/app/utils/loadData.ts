import fs from 'fs';
import path from 'path';

export const loadData = () => {
  const dataPath = path.join(process.cwd(), 'filipino_dictionary.json');
  try {
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error reading data from ${dataPath}:`, error);
    return [];
  }
};
