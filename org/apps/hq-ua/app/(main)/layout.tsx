import HeadquarterTemplate from '@presentational/templates/HeadquarterTemplate';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HeadquarterTemplate>{children}</HeadquarterTemplate>;
}
