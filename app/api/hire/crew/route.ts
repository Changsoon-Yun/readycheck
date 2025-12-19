import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const post = await prisma.recruitmentPost.create({
    data: {
      title: body.title,
      difficulty: body.difficulty,
      startDate: body.startDate,
      endDate: body.endDate,
      startTime: body.startTime,
      endTime: body.endTime,
      memo: body.memo,
      discordUrl: body.discordUrl,
      kakaoUrl: body.kakaoUrl,
      dmUrl: body.dmUrl,
      slots: {
        create: body.slots,
      },
    },
  });

  return NextResponse.json(post);
}

export async function GET() {
  const posts = await prisma.recruitmentPost.findMany({
    include: { slots: true },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(posts);
}
