'use client'
import {ArrowRight, Loader, Package, Percent, Truck} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useCartStore} from "@/components/store/cart";
import {deliveryPrice, percent} from "@/components/constants/pizza";
import {useSession} from "next-auth/react";
import axios from "axios";
import {useProviders} from "@/components/shared/context/CategoryFilter";
import {OrderSchema} from "@/types/schemas";
import React from "react";


export default function Total() {
	const {data: session} = useSession();
	const {orders, user, delivery, setError, error, setLoading, loading} = useProviders();
	const totalprice = useCartStore(state => state.totalPrice);
	const items = useCartStore(state => state.items);
	const totalCardPrice = percent * totalprice + deliveryPrice;

	const paymentFunction = async () => {
		setLoading(true);
		setError([])
		const data = {
			name: user?.fullName?.split(' ')[0],
			surname: user?.fullName?.split(' ')[1],
			email: user.email,
			telephone: user.telephone,
			delivery: delivery,

		}
		const parsed = await OrderSchema.safeParseAsync(data);
		if (!parsed.success){
			setError(parsed.error?.issues.map(issue => issue.message) ?? []);
			console.log(error)
			return;
		}
		console.log(orders.length);
		try {
			const response = await axios.post('/api/payment', {
				totalPrice: String(totalCardPrice),
				orderId: orders[orders.length - 1]?.id + 1 || 1 ,
			})

			console.log(response.data);
			if (response.status === 200){
				const cleanedItems = items.map(item => ({
					productId: item.productId,
					quantity: item.quantity,
					ingredients: item.ingredients,
					key: item.key,
					daugh: item.dough,
					size: item.size
				}));
				console.log(cleanedItems);
				const {data} = await axios.post('/api/order', {
					id: orders[orders.length - 1]?.id + 1 || 1,
					items: cleanedItems,
					createdAt: response.data.created_at,
					paymentId: response.data.id,
					status: response.data.status,
					totalPrice: Number(response.data.amount.value),
				},
					{params: {user: user.userId}}
				)
				window.location.href = response.data.confirmation.confirmation_url;
			}
			sendEmail();
		}
		catch (err){
			setLoading(false);
		}
		finally {
			setLoading(false);
		}
	}
	const sendEmail = async () => {
		if (!session?.user?.email) return;
		try {
			const response = await axios.post('/api/send', {
				email: session.user.email,
				firstName: session.user.name,
				totalPrice: totalCardPrice,
				deliveryPrice,
			});
			console.log(response);
		}
		catch (err){

		}
		finally {

		}
	};
	return (
		<div className='flex flex-col w-170 h-121 bg-neutral-300/50 rounded-xl gap-3 p-10'>
			<div className='flex flex-col w-auto h-auto pb-5 p-10 gap-2'>
				<h1 className='text-xl'>Итого:</h1>
				<span className='flex flex-row items-center gap-2 text-4xl font-extrabold'>{totalCardPrice.toFixed(2)} ₽</span>
				<div className='flex flex-col gap-2'>
					<div className='flex flex-row justify-between items-center gap-2'>
						<div className='flex flex-row items-center gap-2'>
							<Package size={16} color='grey'/>
							<p className='flex flex-row items-center text-lg text-muted-foreground'>Cтоимость корзины:</p>
						</div>
						<p className='border-b border-dashed border-gray-400 w-53 p-2 mx-1'></p>
						<span className='flex flex-row items-center gap-0.5 font-bold'>{totalprice} ₽</span>
					</div>
					<div className='flex flex-row justify-between items-center gap-2'>
						<div className='flex flex-row items-center gap-2'>
							<Percent size={16} color='grey'/>
							<p className='flex flex-row items-center text-lg text-muted-foreground'>Налог:</p>
						</div>
						<p className='border-b border-dashed border-gray-400 w-80 p-2 mx-1'></p>
						<span className='flex flex-row items-center gap-0.5 font-bold'>{((totalprice * percent) - totalprice).toFixed(2)} ₽</span>
					</div>
					<div className='flex flex-row justify-between items-center gap-2 pb-10'>
						<div className='flex flex-row items-center gap-2'>
							<Truck size={16} color='grey'/>
							<p className='flex flex-row items-center text-lg text-muted-foreground'>Доставка:</p>
						</div>
						<p className='border-b border-dashed border-gray-400 w-78 p-2 mx-1'></p>
						<span className='flex flex-row items-center gap-0.5 font-bold'>{deliveryPrice} ₽</span>
					</div>
					{loading ? (
						<Button
							className='w-full max-w-[440px] rounded-2xl py-6 text-base font-semibold cursor-pointer'
							disabled
						>
							<p className='animate-spin'>
								<Loader/>
							</p>
						</Button>):(
						<Button variant='default' size='lg' className='w-full py-6 rounded-xl cursor-pointer' onClick={() => paymentFunction()}>
							<p className='flex flex-row items-center text-lg gap-2'>Оформить заказ<ArrowRight size={20}/></p>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}