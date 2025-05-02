import { connectionStr } from '@/utils/db';
import { Design } from '@/utils/models/design';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { deleteFile } from '@/utils/saveFile';
import jwt from 'jsonwebtoken';

export async function DELETE(request) {
  try {
    if (!connectionStr) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    const token = request.cookies.get('token')?.value;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET);
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Design ID is required' }, { status: 400 });
    }

    const design = await Design.findById(id);
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    // Delete the associated image
    const imageUrl = design.image?.url;
    if (imageUrl) {
      deleteFile(imageUrl);
    }

    // Delete the design from the database
    await Design.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Design deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting design:', error);
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to delete design' }, { status: 500 });
  }
}