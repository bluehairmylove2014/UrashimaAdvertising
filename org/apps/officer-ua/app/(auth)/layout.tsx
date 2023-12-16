import AccessPageTemplate from '@presentational/templates/AccessPageTemplate';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccessPageTemplate>{children}</AccessPageTemplate>;
}
