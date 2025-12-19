import { Group, Burger, ActionIcon, Anchor, Box, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Props {
  showBackButton?: boolean;
  opened: boolean;
  toggle: () => void;
  close: () => void;
}

export function AppHeader({ showBackButton, opened, close, toggle }: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Group h={'100%'} px="md">
      <>
        {!showBackButton ? (
          <Burger opened={opened} onClick={toggle} size="md" hiddenFrom="sm" />
        ) : (
          <ActionIcon variant="subtle" color="gray" onClick={() => router.back()} size="lg">
            <IconArrowLeft size={20} />
          </ActionIcon>
        )}
      </>
      <Group h="100%" justify="space-between" flex={1}>
        <Anchor href={`/`} underline={'never'} onClick={close}>
          <Text size="xl" fw={700} c="blue">
            ReadyCheck
          </Text>
        </Anchor>
        {session && (
          <Box>
            <Text c={'dimmed'} fz={'sm'}>
              {session.user.name || ''}
            </Text>
          </Box>
        )}
      </Group>
    </Group>
  );
}
