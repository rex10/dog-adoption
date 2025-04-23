import { useTheme } from "../../contexts/ThemeContext";
import Button from "../ui/Button";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (currentPage: number, totalPages: number) => {
  const groupSize = 10;
  const currentGroup = Math.floor(currentPage / groupSize);
  const startPage = currentGroup * groupSize;
  const endPage = Math.min(startPage + groupSize, totalPages);

  const pages = [];
  const showStartEllipsis = currentGroup > 0;
  const showEndEllipsis = endPage < totalPages;


  for (let i = startPage; i < endPage; i++) {
    pages.push(i);
  }

  return { pages, showStartEllipsis, showEndEllipsis };
};

export default function Pagination({ currentPage, totalItems, pageSize, onPageChange }: PaginationProps) {

  const { darkMode } = useTheme();
  const totalPages = Math.ceil(totalItems / pageSize);
  const { pages, showStartEllipsis, showEndEllipsis } = getPageNumbers(currentPage, totalPages);
  const currentGroup = Math.floor(currentPage / 10);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">

      <div className="sm:hidden flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded-lg ${!darkMode ? 'text-gray-200 !bg-gray-600 hover:!bg-gray-800' : 'text-gray-900 bg-gray-200 hover:bg-gray-200'}  disabled:opacity-50`}
        >
          Previous
        </Button>
        <span className={`px-4 py-2 ${darkMode ? 'text-gray-50' : 'text-gray-600'}`}>
          Page {currentPage + 1} / {totalPages}
        </span>
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className={`px-4 py-2 rounded-lg ${!darkMode ? 'text-gray-200 !bg-gray-600 hover:!bg-gray-800' : 'text-gray-900 bg-gray-200 hover:bg-gray-200'}  disabled:opacity-50`}
        >
          Next
        </Button>
      </div>


      <div className="hidden sm:flex items-center gap-2">

        <Button
          variant="ghost"
          onClick={() => onPageChange(Math.max(0, (currentGroup - 1) * 10))}
          disabled={currentGroup === 0}
          aria-label="Previous group"
        >
          «
        </Button>

        <Button
          variant="ghost"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          ‹
        </Button>

        {showStartEllipsis && (
          <span className="px-3 py-2 text-gray-400">...</span>
        )}

        {pages.map((page) => (
          <Button
            key={page}
            variant="ghost"
            onClick={() => onPageChange(page)}
            
          >
            {page + 1}
          </Button>
        ))}

        {showEndEllipsis && (
          <span className="px-3 py-2 text-gray-400">...</span>
        )}

        <Button
          variant="ghost"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
        >
          ›
        </Button>

        <Button
          variant="ghost"
          onClick={() => onPageChange((currentGroup + 1) * 10)}
          disabled={(currentGroup + 1) * 10 >= totalPages}
          aria-label="Next group"
        >
          »
        </Button>
      </div>

      <div className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-600'}`}>
        Showing {(currentPage * pageSize) + 1} - {Math.min((currentPage + 1) * pageSize, totalItems)} of {totalItems} items
      </div>
    </div>
  );
}