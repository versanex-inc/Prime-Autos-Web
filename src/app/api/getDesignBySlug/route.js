import { connectionStr } from '@/utils/db';
import { Design } from '@/utils/models/design';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    if (!connectionStr) throw new Error('MONGO_URI is not defined');
    if (mongoose.connection.readyState === 0) await mongoose.connect(connectionStr);

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const design = await Design.findOne({ slug: { $regex: new RegExp(slug, 'i') } });
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    const designData = {
      ...design.toObject(),
      image: design.image || { url: '' },
    };

    return NextResponse.json({ design: designData }, { status: 200 });
  } catch (error) {
    console.error('Error fetching design by slug:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}