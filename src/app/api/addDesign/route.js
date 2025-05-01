import { connectionStr } from '@/utils/db';
import { Design } from '@/utils/models/design';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    if (!connectionStr) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    const body = await request.json();
    const { imageUrl, slug, title, designNumber, carName } = body;

    if (!imageUrl || !slug || !title || !designNumber || !carName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newDesign = new Design({
      image: { url: imageUrl },
      slug,
      title,
      designNumber,
      carName,
    });

    await newDesign.save();

    const response = { message: 'Design added successfully', design: newDesign };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error adding design:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to add design' }, { status: 500 });
  }
}