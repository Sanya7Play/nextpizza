import InfoBlock from "@/components/shared/InfoBlock";
export default function Locked() {
	return(
		<InfoBlock
			textTitle='Доступ запрещён'
			textDescription='Данную страницу могут просматривать только авторизованные пользователи'
			image='/assets/images/lock.png'
			imageAlt='LockedImage'
		/>
	)
}