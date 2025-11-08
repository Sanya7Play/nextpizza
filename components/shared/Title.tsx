
interface Props{
	text: string
}
export default function Title({text}:Props ){
	return (
		<h1 className='font-extrabold text-4xl'>{text}</h1>
	)
}