
type PaginationCountProps = {
    currentPage: number;
    totalElements: number;
    pageSize: number;
    currentPageSize: number;
};

const PaginationCount: React.FC<PaginationCountProps> = ({ currentPage, totalElements, pageSize, currentPageSize }) => {
    return (
        <div className="pagination-count">
            {totalElements === 0 ? "No items" : `Displaying ${(currentPage * pageSize) + 1} to ${(currentPage * pageSize) + currentPageSize} of ${totalElements} items`}
        </div>
    );
};

export default PaginationCount;