import { NextResponse } from "next/server";

export async function GET() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const tag = "gallery-image"; // Fetch images with the tag 'gallery-image'

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary credentials are not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/tags/${tag}?context=true&max_results=50`, // Increased to 50
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary API error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.resources) {
      const images = data.resources.map((resource) => ({
        url: resource.secure_url,
        title: resource.context?.custom?.title || `Project #${resource.public_id}`,
        description: resource.context?.custom?.description || "Bespoke Interior Design",
        format: resource.format, // Added for debugging
      }));
      return NextResponse.json(images, { status: 200 });
    } else {
      return NextResponse.json({ error: "No images found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}