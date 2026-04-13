import {Skeleton} from "@/components/ui/skeleton";

export default function IngredientSkeleton() {
	return (
		<div className="flex flex-row items-center gap-3">
			<Skeleton className="mx-auto h-[20px] w-[20px] m-0 rounded-xs" />
			<Skeleton className="mx-auto h-[25px] w-[115px] rounded-xl m-0" />
		</div>
	)
}