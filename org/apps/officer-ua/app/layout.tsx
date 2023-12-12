import './global.scss';
import { Montserrat } from 'next/font/google';
import { BusinessLogicProvider } from '@business-layer/business-logic/provider';
import Notification from '@presentational/atoms/Notification';

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
          <Notification />
          {children}
        </BusinessLogicProvider>
      </body>
    </html>
  );
}
