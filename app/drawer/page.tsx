import Header from "@/components/shared/Header";
import DrawerContent from "@/components/shared/DrawerContent";

export default function DrawerPage() {
	return(
		<div className="mx-20 rounded-4xl bg-neutral-200 h-auto lg:mx-20 ">
			<Header buttonHide={false} searchHide={false}/>
			<DrawerContent/>
		</div>
	)
}