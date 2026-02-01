import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination"

interface Props{
	page: number,
	changePagePlus: () => void,
	changePageMinus: () => void,
	changePage: (size: number) => void,
	pageSize: number[],
	startPage: number,
	endPage: number
}

export default function PaginationHome({page, changePagePlus, changePageMinus, changePage, pageSize, startPage, endPage} : Props) {
	const handlePaginationPlus = () => {
		changePagePlus()

	}
	const handlePaginationMinus = () => {
		if (page > 1) changePageMinus()
	}
	const handlePageSize = (size: number) => {
		if(startPage === size){
			pageSize.forEach(page => page + 1)
		}
		console.log(size, startPage, endPage)
		changePage(size);
	}
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className='border border-primary cursor-pointer'
						size='default'
						aria-disabled={page === 1}
						onClick={handlePaginationMinus}
					/>
				</PaginationItem>
				<PaginationItem>
					{pageSize.map((size) => (
						<PaginationLink
							key={size}
							isActive={page === size}
							onClick={() => handlePageSize(size)}
							className='mr-1 cursor-pointer'
						>
							{size}
						</PaginationLink>
					))}
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis
						className='cursor-pointer'
					/>
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						className='border border-primary cursor-pointer'
						size='default'
						onClick={handlePaginationPlus}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
