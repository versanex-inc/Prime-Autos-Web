import { connectionStr } from '@/utils/db';
import { Design } from '@/utils/models/design';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function DELETE(request) {
  try {
    if (!connectionStr) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: 'Design ID is required' }, { status: 400 });
    }

    const deletedDesign = await Design.findByIdAndDelete(id);

    if (!deletedDesign) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Design deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting design:', error);
    return NextResponse.json({ error: 'Failed to delete design' }, { status: 500 });
  }
}