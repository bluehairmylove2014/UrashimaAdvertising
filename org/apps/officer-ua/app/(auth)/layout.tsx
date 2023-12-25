import AccessPageTemplate from '@presentational/templates/AccessPageTemplate';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccessPageTemplate>
      <main className="w-screen h-screen grid place-items-center relative">
        <Image
          src={'/assets/images/bgs/dark-bg.png'}
          alt="dark-bg"
          fill
          sizes="100vw"
          className="z-10"
        />
        {children}
      </main>
    </AccessPageTemplate>
  );
}
