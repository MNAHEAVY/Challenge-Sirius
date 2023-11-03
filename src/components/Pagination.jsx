import "../styles/Pagination.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

// eslint-disable-next-line react/prop-types
const Pagination = ({ currentPage, pokemonsPerPage, totalPokes, paginate }) => {
  const maxButtons = 5;
  const pages = [];
  const totalPages = Math.ceil(totalPokes / pokemonsPerPage);

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxButtons) {
    const halfButtons = Math.floor(maxButtons / 2);

    if (currentPage <= halfButtons) {
      endPage = maxButtons;
    } else if (currentPage + halfButtons >= totalPages) {
      startPage = totalPages - maxButtons + 1;
    } else {
      startPage = currentPage - halfButtons;
      endPage = currentPage + halfButtons;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className='Pagination'>
      <ul>
        {currentPage > 1 && (
          <li className='pagItem' onClick={() => paginate(currentPage - 1)}>
            <NavigateBeforeIcon />
          </li>
        )}
        {pages.map((page) => (
          <li
            key={page}
            className={`pagItem ${page === currentPage ? "active" : ""}`}
            onClick={() => paginate(page)}
          >
            {page}
          </li>
        ))}
        {currentPage < totalPages && (
          <li className='pagItem' onClick={() => paginate(currentPage + 1)}>
            <NavigateNextIcon />
          </li>
        )}
      </ul>
    </div>
  );
};
export default Pagination;
