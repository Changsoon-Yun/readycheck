'use client';

import { Button, Center, Group } from '@mantine/core';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <Center>
      <Group>
        <Button onClick={() => router.push('/create/crew')}>인력사무소 오픈</Button>
        <Button onClick={() => router.push('/create/me')}>자기소개하기</Button>
      </Group>
    </Center>
  );
}
