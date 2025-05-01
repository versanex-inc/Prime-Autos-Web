import { Design } from '@/utils/models/design';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Design ID is required' }, { status: 400 });
  }

  try {
    const design = await Design.findById(id);
    if (!design) {
      return NextResponse.json({ error: 'Design not found' }, { status: 404 });
    }
    return NextResponse.json({ design }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}