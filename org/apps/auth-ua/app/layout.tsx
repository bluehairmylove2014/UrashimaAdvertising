import './global.scss';
import AccessPageTemplate from '@presentational/src/templates/AccessPageTemplate';
import { Montserrat } from 'next/font/google';
import { BusinessLogicProvider } from '@modules/business-logic/provider';

export const metadata = {
  title: 'Urashima Ads',
  description: 'Urashima Ads authentication hub',
};
const montserrat = Montserrat({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <BusinessLogicProvider>
          <AccessPageTemplate>{children}</AccessPageTemplate>
        </BusinessLogicProvider>
      </body>
    </html>
  );
}
