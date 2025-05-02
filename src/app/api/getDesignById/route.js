import { Design } from '@/utils/models/design';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectionStr } from '@/utils/db';

export async function GET(request) {
  try {
    if (!connectionStr) throw new Error('MONGO_URI is not defined');
    if (mongoose.connection.readyState === 0) await mongoose.connect(connectionStr);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Design ID is required' }, { status: 400 });
    }

    const design = await Design.findById(id);
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    // Ensure image field exists
    const designData = {
      ...design.toObject(),
      image: design.image || { url: '' },
    };

    return NextResponse.json({ design: designData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching design:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}