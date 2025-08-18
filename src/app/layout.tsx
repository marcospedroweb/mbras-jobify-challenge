import { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { AuthButton } from '@/src/components/auth-button';
import Link from 'next/link';
import Footer from '../components/custom/Footer';
import { ToastContainer } from 'react-toastify';

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
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
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
  console.log('SUPA_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

  return (
    <html lang="pt-BR" suppressHydrationWarning className="h-screen">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${montserrat.variable} ${roboto.variable} antialiased h-full`}
      >
        <ToastContainer
          className={
            'max-w-[90vw] mx-auto mt-4 lg:max-w-full lg:mx-auto lg:mt-0'
          }
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="w-full flex justify-center h-fit lg:h-16 border-b-2 border-b-[#6F6E6E]/30">
            <div className="w-full max-w-5xl flex flex-col lg:flex-row justify-between items-center p-3 px-5 text-sm gap-3">
              <div className="flex gap-5 items-center font-semibold mt-2 lg:mt-0 ">
                <h1>
                  <Link href={'/'} className="text-[40px] ">
                    Jobify
                  </Link>
                </h1>
              </div>
              <AuthButton />
            </div>
          </nav>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
