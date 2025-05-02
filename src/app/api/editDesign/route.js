import { connectionStr } from '@/utils/db';
import { Design } from '@/utils/models/design';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { saveFile, deleteFile } from '@/utils/saveFile';
import jwt from 'jsonwebtoken';

export async function PUT(request) {
  try {
    if (!connectionStr) throw new Error('MONGO_URI is not defined');
    if (mongoose.connection.readyState === 0) await mongoose.connect(connectionStr);

    const token = request.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'No token found' }, { status: 401 });
    jwt.verify(token, process.env.JWT_SECRET);

    let id, imageUrl, slug, title, designNumber, carName, file;
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      id = formData.get('id');
      file = formData.get('image');
      imageUrl = file ? await saveFile(file, formData.get('title')) : formData.get('imageUrl') || '';
      slug = formData.get('slug') || '';
      title = formData.get('title') || '';
      designNumber = formData.get('designNumber') || '';
      carName = formData.get('carName') || '';
    } else {
      const body = await request.json();
      id = body.id;
      imageUrl = body.imageUrl || '';
      slug = body.slug || '';
      title = body.title || '';
      designNumber = body.designNumber || '';
      carName = body.carName || '';
    }

    if (!id || (!imageUrl && !file) || !slug || !title || !designNumber || !carName) {
      return NextResponse.json({ error: 'All fields are required, including ID' }, { status: 400 });
    }

    const existingDesign = await Design.findById(id);
    if (!existingDesign) return NextResponse.json({ error: 'Design not found' }, { status: 404 });

    const oldImageUrl = existingDesign.image?.url || '';

    const updateData = {};
    if (imageUrl || imageUrl === '') {
      updateData['image.url'] = imageUrl;
      if (oldImageUrl && (imageUrl !== oldImageUrl || imageUrl === '')) {
        deleteFile(oldImageUrl);
      }
    }
    if (slug) updateData.slug = slug;
    if (title) updateData.title = title;
    if (designNumber) updateData.designNumber = designNumber;
    if (carName) updateData.carName = carName;

    const updatedDesign = await Design.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedDesign) return NextResponse.json({ error: 'Design not found' }, { status: 404 });

    return NextResponse.json({ message: 'Design updated successfully', design: updatedDesign }, { status: 200 });
  } catch (error) {
    console.error('Error updating design:', error);
    if (error.code === 11000) return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    if (error.message.includes('Only images') || error.message.includes('File size')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update design' }, { status: 500 });
  }
}