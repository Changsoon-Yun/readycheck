'use client';

import { IconPlus, IconLogout, IconLogin, IconBed, IconSettings, IconForklift } from '@tabler/icons-react';
import { Stack, NavLink, Divider, ScrollArea } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface NavItemBase {
  label: string;
  icon: ReactNode;
}

interface NavLinkItem extends NavItemBase {
  href: string;
  onClick?: never;
}

interface NavActionItem extends NavItemBase {
  onClick: () => void;
  href?: never;
}

export type NavItem = NavLinkItem | NavActionItem;

export const createItems = [
  {
    label: '구인/구직 글 작성',
    href: '/create',
    icon: <IconPlus />,
  },
];

export const contentItems = [
  {
    label: '인력 사무소',
    href: '/hire/crew',
    icon: <IconForklift />,
  },
  {
    label: '쉬었음 청년들',
    href: '/hire/me',
    icon: <IconBed />,
  },
];

export const protectedItmes = [
  {
    label: '계정 설정',
    href: '/profile',
    icon: <IconSettings />,
  },
  {
    label: '로그아웃',
    icon: <IconLogout />,
    onClick: () => {
      signOut({
        callbackUrl: '/auth/signin',
      });
    },
  },
];

export const publicItems = [
  {
    label: '로그인',
    href: '/auth/signin',
    icon: <IconLogin />,
  },
];

function NavSection({ items, onNavigate }: { items: NavItem[] | null; onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    items && (
      <Stack gap={8}>
        {items.map((item) => {
          const isActive = item.href !== undefined && pathname === item.href;
          if (item.onClick) {
            return (
              <NavLink
                px={20}
                key={item.label}
                label={item.label}
                leftSection={item.icon}
                onClick={() => {
                  item.onClick();
                  onNavigate();
                }}
              />
            );
          }
          return (
            <NavLink
              px={20}
              key={item.label}
              label={item.label}
              active={isActive}
              leftSection={item.icon}
              component={Link}
              href={item.href}
              onClick={onNavigate}
            />
          );
        })}
      </Stack>
    )
  );
}

interface Props {
  close: () => void;
}

export function AppNavbar({ close }: Props) {
  const { data: session } = useSession();

  return (
    <ScrollArea>
      <Stack gap="xs" py={20}>
        <NavSection items={contentItems} onNavigate={close} />
        <Divider />
        <NavSection items={session && createItems} onNavigate={close} />
        <Divider />
        <NavSection items={session ? protectedItmes : publicItems} onNavigate={close} />
      </Stack>
    </ScrollArea>
  );
}
