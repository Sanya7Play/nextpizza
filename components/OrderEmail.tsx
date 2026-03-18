interface OrderEmailProps {
	totalPrice: number;
	deliveryPrice: number;
}

export function OrderEmail({
							   totalPrice,
							   deliveryPrice,
						   }: OrderEmailProps) {
	return (
		<div style={{ fontFamily: "Arial" }}>
			<p>Итого: {totalPrice} ₽</p>
			<p>Доставка: {deliveryPrice} ₽</p>
		</div>
	);
}
