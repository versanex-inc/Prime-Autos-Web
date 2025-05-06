import path from 'path';
import { mkdirSync, writeFileSync, unlinkSync, existsSync } from 'fs';

export const saveFile = async (file) => {
  if (!file) return null;

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  mkdirSync(uploadDir, { recursive: true });

  // Generate a unique filename using a timestamp
  const timestamp = Date.now();
  const baseName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
  const ext = path.extname(file.name).toLowerCase();
  const uniqueName = `${timestamp}_${baseName}${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only images (JPEG, JPG, PNG, GIF, WebP) are allowed');
  }

  // Validate file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB limit');
  }

  // Read the file as a buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Write the file to disk
  writeFileSync(filePath, buffer);

  return `/uploads/${uniqueName}`;
};

export const deleteFile = (filePath) => {
  if (!filePath || filePath === '') return;
  const fullPath = path.join(process.cwd(), 'public', filePath);
  if (existsSync(fullPath)) {
    unlinkSync(fullPath);
  }
};