import { AdsService } from '@business-layer/services';
import DisplayAdDetail from '@presentational/organisms/DisplayAdDetail';

const officerService = new AdsService();

async function AdBoards({ params }: { params: { boardId: string } }) {
  const adData = await officerService.getOfficerLocationDetail(
    Number.parseInt(params.boardId)
  );

  return (
    <main className="container mx-auto px-4 py-12">
      <DisplayAdDetail adData={adData} />
    </main>
  );
}

export default AdBoards;
