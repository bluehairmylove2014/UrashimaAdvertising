import OfficerMainTemplate from '@presentational/templates/OfficerMainTemplate';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OfficerMainTemplate>{children}</OfficerMainTemplate>;
}
