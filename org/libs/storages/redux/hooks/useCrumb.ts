import { CRUMBS_TEMPLATE } from '@constants/pages';
import { useDispatch, useSelector } from 'react-redux';
import { setCrumbs, stateType } from '..';

type useCrumbType = {
  addNewCrumb: (pathname: string) => void;
};
export const useCrumb = (): useCrumbType => {
  const crumbsData = useSelector((state: stateType) => state.crumbs);
  const dispatch = useDispatch();

  const addNewCrumb = (pathname: string) => {
    const targetCrumb = CRUMBS_TEMPLATE.reverse().find((crumb) =>
      pathname.includes(crumb.pathname)
    );
    if (targetCrumb) {
      const cloneCrumbsData = [...crumbsData];
      const sameCrumbIndex = cloneCrumbsData.indexOf(targetCrumb);
      if (sameCrumbIndex !== -1) {
        cloneCrumbsData.splice(0, sameCrumbIndex);
      } else {
        cloneCrumbsData.push(targetCrumb);
      }
      dispatch(setCrumbs(cloneCrumbsData));
    }
  };

  return { addNewCrumb };
};
