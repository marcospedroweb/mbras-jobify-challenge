import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { EnvVarWarning } from '@/src/components/env-var-warning';
import { AuthButton } from '@/src/components/auth-button';
import Link from 'next/link';
import { hasEnvVars } from '@/src/lib/utils';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Jobify',
  description: 'Busque sua vaga aqui',
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'], // todos os pesos
  variable: '--font-montserrat', // opcional, para usar com CSS var
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased h-[calc(100vh-64px)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
              <div className="flex gap-5 items-center font-semibold">
                <h1>
                  <Link href={'/'} className="text-[40px]">
                    Jobify
                  </Link>
                </h1>
              </div>
              {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
