import Filters from "@/components/shared/Filters";
import Header from "@/components/shared/Header";
import TopBar from "@/components/shared/TopBar";
import ProductsGroupList from "@/components/shared/Products-group-list";

export default function Home() {
  return (
    <div className="mx-50 bg-white rounded-4xl min-h-screen lg:mx-10">
		<Header buttonHide={true} searchHide={true}/>
		<TopBar/>
		<div className='flex flex-row gap-10'>
			<Filters/>
			<ProductsGroupList/>
		</div>
    </div>
  );
}
