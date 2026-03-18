'use client'
import Header from "@/components/shared/Header";
import Title from "@/components/shared/Title";
import Order from "@/components/shared/Order";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import axios from "axios";

export default function OrdersPage() {
	const {orders, setOrders, user, loading, setLoading} = useProviders();
	const {data: session} = useSession();
	useEffect(() => {
		async function getOrders(){
			if(!session) return;
			try {
				setLoading(true);
				const response= await axios.get('/api/order', {
					params: { user: user?.userId }
				});
				setOrders(response.data);
			}
			catch (err){
				setLoading(false)
			}
			finally {
				setLoading(false);
			}
		}
		getOrders();
	},[user])
	console.log(orders);
	return(
		<div className="mx-50 bg-white rounded-4xl min-h-screen lg:mx-20">
			<Header buttonHide={true} searchHide={false}/>
			<div className="flex flex-col mx-18 mt-10 min-h-screen gap-5">
				<Title text='Мои заказы'/>
				{orders.map((order) => (
					<Order
						id={order.id}
						key={order.id}
						status={order.status}
						totalPrice={order.totalPrice}
						createdAt={order.createdAt}
						items={order.items || []}
						loading={loading}
					/>
				))}
			</div>
		</div>
	)
}