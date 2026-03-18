import {Skeleton} from "@/components/ui/skeleton";

export default function OrderSkeleton() {
	return(
		<div className='flex flex-col mt-5 py-5 mx-10 w-[930px] h-[98px] space-y-5 shadow-xl p-3 rounded-2xl'>
			<div className='flex flex-row justify-between items-center space-y-3'>
				<div className='flex flex-row items-center gap-2'>
					<Skeleton className="rounded-full w-[150px] h-[30px]" />
					<Skeleton className="rounded-full w-[220px] h-[20px]" />
				</div>
				<Skeleton className="rounded-full w-[80px] h-[20px]" />
			</div>
		</div>
	)
}