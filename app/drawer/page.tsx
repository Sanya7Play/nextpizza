import Header from "@/components/shared/Header";
import DrawerContent from "@/components/shared/DrawerContent";

export default function DrawerPage() {
	return(
		<div className="mx-20 my-5 bg-neutral-100 rounded-4xl h-auto">
			<Header buttonHide={false} searchHide={false}/>
			<DrawerContent/>
		</div>
	)
}