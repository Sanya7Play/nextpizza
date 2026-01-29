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
	pageSize: number[]
}

export default function PaginationHome({page, changePagePlus, changePageMinus, pageSize} : Props) {
	const handlePaginationPlus = () => {
		changePagePlus()
	}
	const handlePaginationMinus = () => {
		if (page > 1) changePageMinus()
	}
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						className='border border-primary'
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
							className='border-foreground/10 mr-1'
						>
							{size}
						</PaginationLink>
					))}
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext
						className='border border-primary'
						size='default'
						onClick={handlePaginationPlus}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
