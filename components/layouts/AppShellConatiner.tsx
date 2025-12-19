'use client';

import { AppHeader } from '@/components/layouts/AppHeader';
import { AppNavbar } from '@/components/layouts/AppNavbar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const BACK_BUTTON_ROUTES = ['/auth/signin'];

const shouldShowBackButton = (pathname: string) => {
  return BACK_BUTTON_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
};

export function AppShellContainer({ children }: Props) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [opened, { close, toggle }] = useDisclosure();

  console.log('session from client', { session });

  const showBackbutton = shouldShowBackButton(pathname);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: showBackbutton },
      }}>
      <AppShell.Header>
        <AppHeader opened={opened} toggle={toggle} close={close} showBackButton={showBackbutton} />
      </AppShell.Header>

      <AppShell.Navbar>
        <AppNavbar close={close} />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
