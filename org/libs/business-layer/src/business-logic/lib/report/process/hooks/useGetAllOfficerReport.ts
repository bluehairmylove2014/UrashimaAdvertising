import { getToken } from '@business-layer/business-logic/lib/auth/process/hooks/useAccessToken';
import { useGetAllOfficerReportQuery } from '../../fetching/query';

function useGetAllOfficerReport() {
  const { data, refetch } = useGetAllOfficerReportQuery(getToken());
  return { data, refetch };
}

export default useGetAllOfficerReport;
