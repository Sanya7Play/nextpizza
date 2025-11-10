import Header from "@/components/shared/Header";
import Title from "@/components/shared/Title";
import Order from "@/components/shared/Order";

export default function OrdersPage() {
	return(
		<div className="mx-50 bg-white rounded-4xl min-h-screen lg:mx-20">
			<Header buttonHide={true} searchHide={false}/>
			<div className="flex flex-col mx-18 mt-10 min-h-screen gap-5">
				<Title text='Мои заказы'/>
				<Order/>
				<Order/>
				<Order/>
				<Order/>
			</div>
		</div>
	)
}