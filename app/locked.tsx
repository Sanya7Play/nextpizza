import InfoBlock from "@/components/shared/InfoBlock";
import Header from "@/components/shared/Header";
export default function Locked() {
	return(
		<>
			<div className="mx-50 bg-white rounded-4xl min-h-screen lg:mx-20">
				<Header buttonHide={false} searchHide={false}/>
				<div className='flex flex-row gap-10 items-center justify-center'>
					<InfoBlock
						textTitle='Доступ запрещён'
						textDescription='Данную страницу могут просматривать только авторизованные пользователи'
						image='/assets/images/lock.png'
						imageAlt='LockedImage'
					/>
				</div>
			</div>
		</>

	)
}