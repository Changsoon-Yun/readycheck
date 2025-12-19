import { AppShellContainer } from '@/components/layouts/AppShellConatiner';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <AppShellContainer>{children}</AppShellContainer>;
}
