'use client'
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
	changePagePlus: (page: number) => void,
	changePageMinus: (page: number) => void,
	changePage: (size: number) => void,
	pageSize: number[],
	startPage: number,
	endPage: number,
}

export default function PaginationHome({page, changePagePlus, changePageMinus, changePage, pageSize, startPage, endPage} : Props) {


	const handlePaginationPlus = (page: number) => {
		changePagePlus(page);
	}
	const handlePaginationMinus = (page: number) => {
		changePageMinus(page);
	}
	const handlePageSize = (page: number) => {
		changePage(page);
	}
	const handlePage = () => {

	}
	return (
		<Pagination key={page}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className='border border-primary cursor-pointer'
						size='default'
						onClick={() => handlePaginationMinus(page)}
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
						onClick={() => handlePaginationPlus(page)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
