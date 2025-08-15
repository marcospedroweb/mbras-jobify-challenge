import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/src/components/ui/pagination';

interface JobsPaginationProps {
  actualPage: number;
  setActualPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export default function JobsPagination({
  actualPage,
  setActualPage,
  totalPages,
}: JobsPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        {actualPage > 1 && (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => {
                setActualPage(actualPage - 1);
              }}
            >
              Anterior
            </PaginationPrevious>
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem
            key={i}
            onClick={() => {
              setActualPage(i + 1);
            }}
            className="cursor-pointer"
          >
            <PaginationLink
              isActive={actualPage == i + 1}
              className={
                actualPage == i + 1
                  ? '!bg-[#FE8A00]  hover:bg-[#CE7000] text-white'
                  : ''
              }
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {actualPage + 1 <= totalPages && (
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => {
                setActualPage(actualPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
