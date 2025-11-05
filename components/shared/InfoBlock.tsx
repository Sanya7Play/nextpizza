'use client'
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import Image from "next/image";

interface InfoBlockProps {
	textTitle: string;
	textDescription: string;
	image: string;
	imageAlt: string;
}

export default function InfoBlock({textTitle, textDescription, image, imageAlt}:InfoBlockProps) {
	return(
		<div className='flex flex-row mt-30 justify-center'>
			<div className='flex flex-col gap-4 pt-18 w-110'>
				<h1 className='text-4xl font-extrabold'>{textTitle}</h1>
				<p className='font-normal text-lg text-muted-foreground'>
					{textDescription}
				</p>
				<div className='flex flex-row gap-6 pt-8'>
					<Button
						variant='default'
						size={"lg"}
						className='font-bold text-base gap-1 cursor-pointer rounded-xl'
						onClick={() => window.location.href = '/'}
					>
						<ArrowLeft size={20}/>
						На главную
					</Button>
					<Button
						variant='outline'
						size={"lg"}
						className='font-bold text-base cursor-pointer rounded-xl'
						onClick={() => window.location.reload()}
					>
						Обновить
					</Button>
				</div>
			</div>
			<Image src={image} alt={imageAlt} width={340} height={345}/>
		</div>
	)
}