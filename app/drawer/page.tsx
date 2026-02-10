'use client'
import Header from "@/components/shared/Header";
import DrawerContent from "@/components/shared/DrawerContent";
import {useSession} from "next-auth/react";
import NotFound from "@/app/not-found";

export default function DrawerPage() {
	const {data: session} = useSession();
	return(
		<>
			{session ? <>
				<div className="mx-20 rounded-4xl  h-auto lg:mx-20 ">
					<Header buttonHide={false} searchHide={false}/>
					<DrawerContent/>
				</div>
			</> : <NotFound/>
			}
		</>


	)
}