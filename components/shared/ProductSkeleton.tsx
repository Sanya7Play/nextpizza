import {Skeleton} from "@/components/ui/skeleton";

export default function ProductSkeleton() {
	return(
		<div className='flex flex-col mt-5 w-[300px] space-y-5'>
			<Skeleton className="mx-auto h-[215px] w-[215px] rounded-full" />
			<div className='flex flex-col space-y-3'>
				<Skeleton className="rounded-full w-[200px] h-[20px]" />
				<Skeleton className="rounded-full w-[270px] h-[10px]" />
				<Skeleton className="rounded-full w-[265px] h-[10px]" />
				<Skeleton className="rounded-full w-[250px] h-[10px]" />
			</div>
			<div className='flex flex-row items-center justify-between pt-3'>
				<Skeleton className="rounded-lg w-[70px] h-[40px]" />
				<Skeleton className="rounded-lg w-[100px] h-[40px]" />
			</div>
		</div>
	)
}