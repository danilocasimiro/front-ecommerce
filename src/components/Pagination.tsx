import React from "react";

interface ExtraQuery {
  before?: number;
  after?: number;
}

interface PaginationProps {
  currentPage: number,
  totalPages: number,
  firstId: number | undefined,
  lastId: number | undefined,
  quantityModels: number,
  fetchData: (extraQuery: ExtraQuery) => Promise<void>;
}
function Pagination({ currentPage, totalPages, firstId, lastId, fetchData, quantityModels }: PaginationProps) {
  console.log('current_page: ', currentPage)
  console.log('totalPages: ', totalPages)
  console.log('quantityModels: ', quantityModels)
  return (
    <div className="btn-group" role="group">
      {currentPage !== 1 && (
        <button
          className="btn btn-primary mt-4"
          onClick={() => fetchData({ before: firstId })}
        >
          Página Anterior
        </button>
      )}
      <span style={{ marginTop: "2rem", marginLeft: "1rem", marginRight: "1rem" }}>
        {currentPage} / {totalPages}
      </span>
      {quantityModels == 10 && currentPage != totalPages  && (
        <button
          className="btn btn-primary mt-4 ml-4"
          onClick={() => fetchData({ after: lastId })}
        >
          Próxima Página
        </button>
      )}
    </div>
  );
}

export default Pagination;