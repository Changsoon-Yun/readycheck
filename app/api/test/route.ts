import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await prisma.recruitmentPost.findMany({
    include: { slots: true },
  });

  return NextResponse.json(posts);
}
