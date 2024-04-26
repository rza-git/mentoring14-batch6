import { writeFile } from 'fs/promises';
import path from 'path';

export const uploadFile = async (file, pathLocation) => {
    // convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to folder public/images
    const fileName = file.name.toLowerCase().split(' ').join('-');
    const filePath = path.join( pathLocation, Date.now() + '-' + fileName);
    const finalPath = path.join(process.cwd(), 'public', filePath);

    await writeFile(finalPath, buffer);

    return filePath.replace('\\', '/');
};