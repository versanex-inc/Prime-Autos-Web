import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectionStr } from '@/utils/db';
import { AdminUser } from '@/utils/models/adminUser';

export async function POST(request) {
  try {
    if (!connectionStr) {
      throw new Error('MONGO_URI is not defined in the environment variables');
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(connectionStr);
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const adminUser = await AdminUser.findOne({ email });
    if (!adminUser) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: adminUser._id, email: adminUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    response.cookies.set('token', token, { httpOnly: true, maxAge: 3600 });
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ error: 'Failed to log in' }, { status: 500 });
  }
}