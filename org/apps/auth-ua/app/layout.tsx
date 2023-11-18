import './global.scss';
import AccessPageTemplate from '@presentational/templates/AccessPageTemplate';

export const metadata = {
  title: 'Urashima Ads',
  description: 'Urashima Ads authentication hub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AccessPageTemplate>{children}</AccessPageTemplate>
      </body>
    </html>
  );
}
