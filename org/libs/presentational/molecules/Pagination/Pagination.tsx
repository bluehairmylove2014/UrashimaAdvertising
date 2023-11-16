/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import './styles.scss';
import {
  handleNextPage,
  handlePrevPage,
  isDisableNext,
  isDisablePrev,
  calculateNumberList,
} from '@utils/helpers/Pagination';
import { CommonButton } from '@presentational/atoms/CommonButton/CommonButton';

type paginationParamsType = {
  state: {
    paginationState: {
      currentPage: number;
      maxPage: number;
    };
    setPaginationState: Function;
  };
  callback: () => void;
};
const Pagination = ({ state, callback }: paginationParamsType) => {
  const isFirstRender = useRef(true);
  const { paginationState, setPaginationState } = state;

  useEffect(() => {
    if (!isFirstRender.current) {
      callback && callback();
    }
  }, [paginationState?.currentPage]);

  const handleChangePageByNumber = (e: any) => {
    setPaginationState({
      ...paginationState,
      currentPage: Number(e.target.getAttribute('data-pagenumber')),
    });
  };

  const renderPagePaginationNumberBtn = (
    targetPage: number,
    numberOfPages: number
  ) => {
    const displayPages = calculateNumberList(targetPage, numberOfPages);

    const htmlDisplayPages = displayPages.map((p, i) => {
      return (
        <button
          className={p.active ? 'active' : ''}
          data-pagenumber={p.page}
          onClick={(e) => {
            isFirstRender.current && (isFirstRender.current = false);
            handleChangePageByNumber(e);
          }}
          key={`trending-hotel-page-number@${i}`}
        >
          {p.page}
        </button>
      );
    });

    return <>{htmlDisplayPages}</>;
  };

  if (
    !paginationState ||
    !paginationState.currentPage ||
    !paginationState.maxPage
  ) {
    return <></>;
  } else
    return !Number.isNaN(paginationState.currentPage) &&
      !Number.isNaN(paginationState.maxPage) ? (
      <div className="pagination-wrapper">
        <div className="pagination">
          <CommonButton
            disabled={paginationState.currentPage === 1}
            style={'modern-onlyBorder'}
            onClick={() => {
              isFirstRender.current && (isFirstRender.current = false);
              setPaginationState({
                ...paginationState,
                currentPage: 1,
              });
            }}
          >
            <i className="fi fi-bs-angle-double-left"></i>
          </CommonButton>
          <CommonButton
            disabled={isDisablePrev({
              currentPage: paginationState.currentPage,
            })}
            style={'modern-onlyBorder'}
            onClick={() => {
              isFirstRender.current && (isFirstRender.current = false);
              handlePrevPage(paginationState, setPaginationState);
            }}
          >
            <i className="fi fi-bs-angle-left"></i>
          </CommonButton>

          {renderPagePaginationNumberBtn(
            paginationState.currentPage,
            paginationState.maxPage
          )}

          <CommonButton
            style={'modern-onlyBorder'}
            disabled={isDisableNext(paginationState)}
            onClick={() => {
              isFirstRender.current && (isFirstRender.current = false);
              handleNextPage(paginationState, setPaginationState);
            }}
          >
            <i className="fi fi-bs-angle-double-right"></i>
          </CommonButton>
          <CommonButton
            style={'modern-onlyBorder'}
            disabled={paginationState.currentPage === paginationState.maxPage}
            onClick={() => {
              isFirstRender.current && (isFirstRender.current = false);
              setPaginationState({
                ...paginationState,
                currentPage: paginationState.maxPage,
              });
            }}
          >
            <i className="fi fi-bs-angle-right"></i>
          </CommonButton>
        </div>
      </div>
    ) : (
      <p>ERROR RENDER PAGINATION</p>
    );
};

export default Pagination;
