import Link from "next/link";
import "./styles.scss";

type linkType = {
  children: React.ReactNode | string | number;
  href: string;
};
const CustomLink = ({ children, href }: linkType) => {
  return (
    <Link href={href} className="link">
      {children}
    </Link>
  );
};

export default CustomLink;
