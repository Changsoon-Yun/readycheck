import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { mantineHtmlProps, ColorSchemeScript } from '@mantine/core';
import MantineProvider from '@/components/providers/MantineProvider';
import SessionProvider from '@/components/providers/SessionProvider';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const notoSansKr = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'project title',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={notoSansKr.className}>
        <MantineProvider>
          <SessionProvider session={session}>{children}</SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
