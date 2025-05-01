import { connectionStr } from '@/utils/db';
import { Design } from '@/utils/models/design';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function PUT(request) {
  try {
    if (!connectionStr) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    const body = await request.json();
    const { id, imageUrl, slug, title, designNumber, carName } = body;

    if (!id) {
      return NextResponse.json({ error: 'Design ID is required' }, { status: 400 });
    }

    const updateData = {};
    if (imageUrl) updateData['image.url'] = imageUrl;
    if (slug) updateData.slug = slug;
    if (title) updateData.title = title;
    if (designNumber) updateData.designNumber = designNumber;
    if (carName) updateData.carName = carName;

    const updatedDesign = await Design.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedDesign) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Design updated successfully', design: updatedDesign }, { status: 200 });
  } catch (error) {
    console.error('Error updating design:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update design' }, { status: 500 });
  }
}