'use client'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList, BreadcrumbPage,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {Product} from ".prisma/client";
import {useEffect, useState} from "react";
import {Skeleton} from "@/components/ui/skeleton";

type Props = {
	product: Product | null;
}
export default function WindowCardBreadCrumb({product}: Props) {

	const [breadcrumb, setBreadcrumb] = useState<boolean>(false);
	useEffect(() => {
		async function getBreadCrumb(){
			if(product){
				setBreadcrumb(true);
				setTimeout(() => {
					setBreadcrumb(false);
				}, 1000);
			}
			else{
				setBreadcrumb(false);
			}
		}
		getBreadCrumb()
	},[product])
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">Главная</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbLink asChild>
						<Link href="/">Пиццы</Link>
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>
						{breadcrumb ? (
							<Skeleton className="mx-auto h-[25px] w-[115px] rounded-2xl" />
						) : (product?.name)}
					</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	)
}