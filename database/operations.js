import { promises as fs } from 'fs';
import path from 'path';

// Read and parse a text file
export const readFile = async (filePath) => {
    try {
        console.log('Reading file:', filePath);
        const content = await fs.readFile(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading file:', error);
        throw new Error(`Error reading file: ${error.message}`);
    }
};

// Create or overwrite a file
export const writeFile = async (filePath, content) => {
    try {
        console.log('Writing to file:', filePath);
        console.log('Content:', content);
        
        // Ensure directory exists
        const dir = path.dirname(filePath);
        await fs.mkdir(dir, { recursive: true });
        
        await fs.writeFile(filePath, JSON.stringify(content, null, 2));
        console.log('File written successfully');
    } catch (error) {
        console.error('Error writing file:', error);
        throw new Error(`Error writing file: ${error.message}`);
    }
};

// Add content to an existing file
export const appendToFile = async (filePath, content) => {
    try {
        const existingContent = await readFile(filePath);
        const updatedContent = { ...existingContent, ...content };
        await writeFile(filePath, updatedContent);
    } catch (error) {
        console.error('Error appending to file:', error);
        throw new Error(`Error appending to file: ${error.message}`);
    }
};

// Remove a file from the system
export const deleteFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw new Error(`Error deleting file: ${error.message}`);
    }
};

// Get all files in a directory
export const listFiles = async (directory) => {
    try {
        console.log('Listing files in directory:', directory);
        const files = await fs.readdir(directory);
        console.log('Found files:', files);
        return files;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Directory does not exist, creating it:', directory);
            await fs.mkdir(directory, { recursive: true });
            return [];
        }
        console.error('Error listing files:', error);
        throw new Error(`Error listing files: ${error.message}`);
    }
};

// Check if a file exists
export const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}; 