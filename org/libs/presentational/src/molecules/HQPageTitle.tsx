import { IBreadcrumb } from '@business-layer/services/entities';
import Breadcrumbs from './Breadcrumbs';

function HQPageTitle({
  title,
  breadcrumbsData,
}: {
  title: string;
  breadcrumbsData?: IBreadcrumb[];
}) {
  return (
    <div className="flex flex-col justify-center items-start mb-6">
      <h3 className="uppercase">{title}</h3>
      {breadcrumbsData ? <Breadcrumbs bcList={breadcrumbsData} /> : <></>}
    </div>
  );
}

export default HQPageTitle;
