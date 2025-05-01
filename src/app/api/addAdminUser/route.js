import { connectionStr } from '@/utils/db';
import { AdminUser } from '@/utils/models/adminUser';
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
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newAdminUser = new AdminUser({
      username,
      email,
      password,
    });

    await newAdminUser.save();

    return NextResponse.json({ message: 'Admin user added successfully', adminUser: { username, email } }, { status: 201 });
  } catch (error) {
    console.error('Error adding admin user:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Username or email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to add admin user' }, { status: 500 });
  }
}