import { Pagination, Button, ButtonGroup } from "@nextui-org/react";
import Link from "next/link";

export default function TablePagination(props) {
  const { page = 1, totalPages, hasNextPage } = props;

  const currentPage = Math.min(Math.max(Number(page), 1), totalPages);

  const getPagesToShow = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = totalPages < 5 ? totalPages : 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4 > 0 ? totalPages - 4 : 1;
      endPage = totalPages;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pages = getPagesToShow();

  return (
    <ButtonGroup variant="shadow">
      <Button
        as={Link}
        href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
        isDisabled={currentPage === 1}
        size="sm"
      >
        Previous
      </Button>
      {pages.map((p, i) => (
        <Button
          disabled={p === currentPage}
          isIconOnly
          as={Link}
          key={p}
          href={`?page=${p}`}
          size="sm"
          className={
            p === currentPage ? "bg-sky-600 text-white" : "bg-[#d3d3d7]"
          }
        >
          {p}
        </Button>
      ))}

      <Button
        as={Link}
        href={`?page=${
          currentPage < totalPages ? currentPage + 1 : totalPages
        }`}
        isDisabled={!hasNextPage}
        size="sm"
      >
        Next
      </Button>
    </ButtonGroup>
  );
}
