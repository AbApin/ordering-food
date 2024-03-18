import { Category } from '@/app/models/Category';
import { mongoose } from 'mongoose';

export async function POST(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
  } else {
    return Response.json({});
  }
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Category.find());
}

export async function PUT(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, _id } = await req.json();
  if (await isAdmin()) {
    await Category.updateOne({ _id }, { name });
  }

  return Response.json(true);
}

export async function DELETE(req) {
  await mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  if (await isAdmin()) {
    await Category.deleteOne({ _id });
  }
  return Response.json(true);
}
