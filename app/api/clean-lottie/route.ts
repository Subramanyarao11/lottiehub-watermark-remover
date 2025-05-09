import { removeLottieLabWatermark } from '@/app/lib/lottie-cleaner';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    if (!file.name.toLowerCase().endsWith('.json')) {
      return NextResponse.json(
        { message: 'Only JSON files are supported' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    let jsonData;
    try {
      jsonData = JSON.parse(buffer.toString());
    } catch (err) {
      return NextResponse.json(
        { message: 'Invalid JSON file' },
        { status: 400 }
      );
    }

    const cleanedData = removeLottieLabWatermark(jsonData);

    return NextResponse.json({
      message: 'File processed successfully',
      cleanedData,
    });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { message: 'Error processing file' },
      { status: 500 }
    );
  }
}
