import { connectionStr } from '@/utils/db';
import { Design } from '@/utils/models/design';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!connectionStr) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    const designs = await Design.find({ starred: true }).sort({ createdAt: -1 });

    return NextResponse.json({ designs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching starred designs:', error);
    return NextResponse.json({ error: 'Failed to fetch starred designs' }, { status: 500 });
  }
}