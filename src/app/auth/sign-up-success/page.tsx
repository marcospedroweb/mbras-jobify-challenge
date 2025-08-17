import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="bg-[#2D3D50]">
            <CardHeader>
              <CardTitle className="text-2xl">
                Obrigado por se cadastrar!
              </CardTitle>
              <CardDescription>
                Verifique seu email ou{' '}
                <Link href={'/'} className="text-blue-500 underline">
                  continue navegando
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
