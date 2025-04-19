const fs = require('fs');
const path = require('path');

// Create necessary directories if they don't exist
const createDirectories = () => {
    const dirs = ['patients', 'sessions', 'therapists'].map(dir => 
        path.join(__dirname, dir)
    );
    
    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    });
};

// Generate a unique ID between min and max
const generateUniqueID = async (min, max, type) => {
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    const exists = await checkIDExists(id, type);
    if (exists) {
        return generateUniqueID(min, max, type);
    }
    return id;
};

// Check if an ID already exists
const checkIDExists = async (id, type) => {
    const dir = path.join(__dirname, type);
    if (!fs.existsSync(dir)) return false;
    
    const files = fs.readdirSync(dir);
    return files.some(file => file.includes(`_${id}.txt`));
};

// Format timestamp in ISO format
const formatTimestamp = () => {
    return new Date().toISOString();
};

// Format content object to string
const formatContent = (content) => {
    return Object.entries(content)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
};

// Parse file content to object
const parseContent = (content) => {
    return content.split('\n').reduce((acc, line) => {
        const [key, ...values] = line.split(':');
        if (key && values.length) {
            acc[key.trim()] = values.join(':').trim();
        }
        return acc;
    }, {});
};

module.exports = {
    createDirectories,
    generateUniqueID,
    checkIDExists,
    formatTimestamp,
    formatContent,
    parseContent
}; 