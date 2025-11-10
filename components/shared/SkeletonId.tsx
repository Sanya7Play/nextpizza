import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonId() {
	return (
		<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
			<div className="p-10 rounded-2xl w=[570] h=[570] flex items-center justify-center gap-5">
				<Skeleton className="mx-auto h-[500px] w-[500px] rounded-full"/>
			</div>
			<div className="flex flex-col gap-6 p-10 rounded-2xl">
				<div className="flex flex-col gap-3">
					<Skeleton className="h-[40px] w-[350px] rounded-2xl"/>
					<Skeleton className="h-[15px] w-[400px] rounded-2xl"/>
				</div>
				<div className="flex flex-col gap-3 w-full max-w-[440px]">
					<Skeleton className="mx-auto h-[40px] w-[440px] rounded-2xl"/>
					<Skeleton className="mx-auto h-[40px] w-[440px] rounded-2xl"/>
				</div>
				<div className="flex flex-col gap-3">
					<Skeleton className="h-[15px] w-[150px] rounded-2xl"/>
					<div className='flex flex-row gap-5'>
						<Skeleton className="h-[190px] w-[135px] rounded-2xl"/>
						<Skeleton className="h-[190px] w-[135px] rounded-2xl"/>
						<Skeleton className="h-[190px] w-[135px] rounded-2xl"/>
						<Skeleton className="h-[190px] w-[135px] rounded-2xl"/>
					</div>
				</div>
				<div className="pt-2">
					<Skeleton className="h-[50px] w-[350px] rounded-2xl"/>
				</div>
			</div>
		</div>
	)
}