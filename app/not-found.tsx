import InfoBlock from "@/components/shared/InfoBlock";
export default function NotFound() {
	return(
		<InfoBlock
			textTitle='Cтраница не найдена'
			textDescription='Проверьте корректность введённого адреса или повторите попытку позже'
			image='/assets/images/not-found.png'
			imageAlt='NotFoundImage'
		/>
	)
}