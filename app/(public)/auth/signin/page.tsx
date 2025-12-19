'use client';

import { Card, Stack, Title, Text, Button, Divider, Group } from '@mantine/core';
import { signIn } from 'next-auth/react';
import { IconLogin } from '@tabler/icons-react';

export default function LoginPage() {
  const handleLogin = () => {
    signIn('battlenet', {
      callbackUrl: '/',
    });
  };

  return (
    <Group justify="center" align="center" h="100%" px="md">
      <Card withBorder radius="md" p="lg" maw={420} w="100%">
        <Stack gap="md">
          <Title order={3} ta="center">
            ReadyCheck 로그인
          </Title>

          <Text size="sm" c="dimmed" ta="center">
            ReadyCheck는 BATTLENET 계정 연동이 필수입니다.
            <br />
            캐릭터 정보는 파티 모집에만 사용됩니다.
          </Text>

          <Divider />

          <Stack gap="sm">
            <Button size="md" leftSection={<IconLogin size={18} />} onClick={() => handleLogin()}>
              대한민국 (KR)
            </Button>
          </Stack>

          <Text size="xs" c="dimmed" ta="center">
            로그인 시 ReadyCheck의 이용약관 및 개인정보 처리방침에 동의한 것으로 간주됩니다.
          </Text>
        </Stack>
      </Card>
    </Group>
  );
}
