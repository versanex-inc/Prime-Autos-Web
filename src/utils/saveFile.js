import path from 'path';
import { mkdirSync, writeFileSync, unlinkSync, existsSync } from 'fs';

export const saveFile = async (file) => {
  if (!file) return null;

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  mkdirSync(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only images (jpeg, jpg, png, gif) are allowed');
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

  return `/uploads/${fileName}`;
};

export const deleteFile = (filePath) => {
  if (!filePath || filePath === '') return;
  const fullPath = path.join(process.cwd(), 'public', filePath);
  if (existsSync(fullPath)) {
    unlinkSync(fullPath);
  }
};