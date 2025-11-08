import Header from "@/components/shared/Header";
import WindowCardBreadCrumb from "@/components/shared/WindowCardBreadCrumb";
import WindowCardItem from "@/components/shared/WindowCardItem";
import Recommended from "@/components/shared/Recommended";

export default function ProductPage() {
	return (
		<div className="mx-20 bg-white rounded-4xl min-h-screen lg:mx-20">
			<Header buttonHide={true} searchHide={false}/>
			<div className="flex flex-col mx-18 mt-10 min-h-screen gap-10">
				<WindowCardBreadCrumb/>
				<WindowCardItem/>
				<Recommended/>
			</div>
		</div>

	)
}