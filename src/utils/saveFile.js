import path from 'path';
import { mkdirSync, writeFileSync, unlinkSync, existsSync } from 'fs';

export const saveFile = async (file, title) => {
  if (!file) return null;

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  mkdirSync(uploadDir, { recursive: true });

  // Generate filename using only the title
  const baseName = title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove special characters
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
  const ext = path.extname(file.name).toLowerCase();
  const fileName = `${baseName}${ext}`;
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