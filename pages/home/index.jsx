import { Flex, Box, Image } from '@chakra-ui/react'
import style from "./style/home.module.css"


function Card(props) {
	return (
		<Box
			h='410px'
			w='300px'
			marginTop='60px'
			marginLeft='50px'
			marginRight='50px'
			boxShadow='1px 1px 10px 10px rgba(0, 0, 0, 0.1)'
			borderRadius='20px'
			backgroundColor='marine'
			fontSize='xx-large'
			textAlign='center'
			justifyContent='center'
		>
			<a
				href={props.pageHref}
			>
				<Image
					borderRadius='20px'
					width='94%'
					height='70%'
					marginTop='3%'
					marginLeft='3%'
					src={props.imgSource}
				/>
				<Box
					marginTop='15px'
				>
					{props.cardName}
				</Box>
			</a>
		</Box>
	)
}

export default function Home() {
	return (
		<body className={style.pagebody}>
			<Flex
				w='100%'
				h='100%'
				backgroundColor='clear_lake'
				justifyContent='space-between'
			>
				<Card
					cardName="Projetos"
					pageHref="projetos"
					imgSource="https://tecnopressure.com.br/wp-content/uploads/2019/10/Tecno-Pressure-Estudo-de-Viabilidade-T%C3%A9cnico-Econ%C3%B4mica-Projeto-Engenharia-Seguran%C3%A7a-Qualidade-NR-13.jpg"
				/>
				<Card
					cardName="Tarefas"
					pageHref="tarefas"
					imgSource="https://st2.depositphotos.com/1579454/8355/i/600/depositphotos_83553642-stock-photo-checklist-paper-and-pen.jpg"
				/>
				<Card
					cardName="Consultas Bibliográficas"
					pageHref="bibliografia"
					imgSource="https://video-images.vice.com/articles/5d44c9622980b0000824a7e3/lede/1564789576071-GettyImages-949118068.jpeg?crop=1xw:0.8419xh;0xw,0.1581xh"
				/>
			</Flex>
		</body>
	)
}
