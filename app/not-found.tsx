import InfoBlock from "@/components/shared/InfoBlock";
import Header from "@/components/shared/Header";
export default function NotFound() {
	return(
		<>
			<div className="mx-50 bg-white rounded-4xl min-h-screen lg:mx-20">
				<Header buttonHide={true} searchHide={true}/>
				<div className='flex flex-row gap-10'>
					<InfoBlock
						textTitle='Cтраница не найдена'
						textDescription='Проверьте корректность введённого адреса или повторите попытку позже'
						image='/assets/images/not-found.png'
						imageAlt='NotFoundImage'
					/>
				</div>
			</div>
		</>

	)
}