import {
  useGetPagination,
  useSetCurrentPagePagination,
} from '@business-layer/business-logic/non-service-lib/pagination';
import PaginationButton, {
  paginationButtonType,
} from '@presentational/atoms/PaginationButton';
import {
  calculateFromIndex,
  calculateToIndex,
  isDisableNext,
  isDisablePrev,
} from '@utils/helpers';

const NUMBER_OF_START_BUTTON = 3; // Number button before three dot button

type paginationParamsType = {
  id: number;
};
/**
 * -------------NOTE-------------
 * To get ID, in the page u need pagination,
 * please call useInitPagination to get initPagination Function,
 * After that, call it and get paginationId.
 *
 * Finally, pass this id here!!!
 */
function Pagination({ id }: paginationParamsType) {
  const paginationVersion = useGetPagination(id);
  const { handleChangeCurrentPage } = useSetCurrentPagePagination();

  // methods
  const renderListOfPaginationButton = (
    currentPage: number,
    maxPage: number
  ) => {
    const btns: {
      type: paginationButtonType;
      children: React.ReactNode;
      value: number;
    }[] = [
      { type: 'number', children: <span>{maxPage}</span>, value: maxPage },
    ];

    if (maxPage > 1) {
      btns.unshift({
        type: 'threeDot',
        children: <span>...</span>,
        value: maxPage,
      });

      if (currentPage === 1) {
        for (
          let pageNumber =
            NUMBER_OF_START_BUTTON < maxPage
              ? currentPage + NUMBER_OF_START_BUTTON - 1
              : maxPage - 1;
          pageNumber > 1;
          pageNumber--
        ) {
          btns.unshift({
            type: 'number',
            children: <span>{pageNumber}</span>,
            value: pageNumber,
          });
        }
        btns.unshift({
          type: 'activeNumber',
          children: <span>1</span>,
          value: 1,
        });
      } else if (currentPage <= maxPage) {
        for (
          let pageNumber =
            currentPage + 1 < maxPage ? currentPage + 1 : maxPage - 1;
          pageNumber >= currentPage - 1;
          pageNumber--
        ) {
          btns.unshift({
            type: 'number',
            children: <span>{pageNumber}</span>,
            value: pageNumber,
          });
        }

        if (currentPage < maxPage) {
          btns[1].type = 'activeNumber';
        }
      }
    }

    return btns.map((btn, btnIndex) => (
      <PaginationButton
        type={btn.type}
        onClick={() => handleChangeCurrentPage(id, btn.value)}
        key={`paginationBtn@${btnIndex}`}
      >
        {btn.children}
      </PaginationButton>
    ));
  };

  return (
    <div className="flex items-center justify-between border-t-0 border-gray-200 bg-white py-3 px-6">
      {paginationVersion ? (
        <div className="flex flex-1 items-center justify-between">
          <div>
            <p className="text-xs text-gray-700">
              Showing{' '}
              <span className="font-medium">
                {calculateFromIndex(
                  paginationVersion.data.currentPage,
                  paginationVersion.data.maxElementPerPage
                )}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {calculateToIndex(
                  paginationVersion.data.dataLength,
                  paginationVersion.data.currentPage,
                  paginationVersion.data.maxElementPerPage
                )}
              </span>{' '}
              of{' '}
              <span className="font-medium">
                {paginationVersion.data.dataLength}
              </span>{' '}
              results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <PaginationButton
                type="prev"
                onClick={() =>
                  handleChangeCurrentPage(
                    id,
                    paginationVersion.data.currentPage - 1
                  )
                }
                isDisabled={isDisablePrev({
                  currentPage: paginationVersion.data.currentPage,
                })}
              >
                <span className="sr-only">Previous</span>
                <i className="fi fi-rr-angle-small-left" aria-hidden="true"></i>
              </PaginationButton>

              {renderListOfPaginationButton(
                paginationVersion.data.currentPage,
                paginationVersion.data.maxPage
              )}

              <PaginationButton
                type="next"
                onClick={() =>
                  handleChangeCurrentPage(
                    id,
                    paginationVersion.data.currentPage + 1
                  )
                }
                isDisabled={isDisableNext({
                  currentPage: paginationVersion.data.currentPage,
                  maxPage: paginationVersion.data.maxPage,
                })}
              >
                <span className="sr-only">Next</span>
                <i className="fi fi-rr-angle-small-right" aria-hidden="true" />
              </PaginationButton>
            </nav>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Pagination;
