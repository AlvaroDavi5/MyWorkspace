import { useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { 
	Box, Flex, Button, IconButton, useColorModeValue, useDisclosure,
	Input, Textarea, FormLabel, FormControl, FormHelperText,
	Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react'
import { IoCreateOutline } from 'react-icons/io5'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { parseCookies } from 'nookies'
import axios from 'axios'
import DocumentHead from "../../../components/document_head.jsx"
import Navbar from "../../../components/navbar.jsx"


function TaskEditorModal(props) {
	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose} size='xl' scrollBehavior='outside'>
			<ModalOverlay/>
			<ModalContent bgColor={props.bgColor}>
				<ModalHeader>
					Criar/Editar Tarefa
				</ModalHeader>
		
				<ModalCloseButton/>
				<ModalBody>
					<Input marginTop='20px' type='text' maxLength='95' placeholder='Nome da tarefa' maxWidth='23vw' background='green.100'/>
					<Input marginTop='20px' type='date' maxWidth='15vw' marginLeft='20px' background='green.100'/>
					<Textarea  marginTop='20px'  type='text' maxLength='350' placeholder='Descrição da tarefa' background='green.100'/>
				</ModalBody>

				<ModalFooter>
					<Box>
						<Button
							boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
							variant='ghost'
							backgroundColor='green'
							marginRight='150'
							marginLeft='15'
						>
							Salvar
						</Button>
						<Button
							boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
							variant='ghost'
							backgroundColor='red'
							marginLeft='150'
							marginRight='5'
							onClick={props.onClose}
						>
							Cancelar
						</Button>
					</Box>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

function ListItem(props) {
	const colorMode = useColorModeValue('light', 'dark')
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')
	const nameContinue = (((props.name).toString()).length > 55) ? '...' : ''
	const descContinue = (((props.desc).toString()).length > 110) ? '...' : ''

	return (
		<TaskEditorModal isOpen={props.isOpenEdit} onOpen={props.onOpenEdit} onClose={props.onCloseEdit} bgColor={boxBgColor}/>,

		<Flex
			width='90vw'
			height='75px'
			boxShadow='1px 1px 10px 4px rgba(0, 0, 0, 0.3)'
			margin='20px'
			borderRadius='10px'
			bgColor={boxBgColor}
			flexDirection='row'
			justifyContent='space-between'
		>
			<Box
				backgroundColor='red'
				borderRadius='10px'
				height='20pt'
				width='100px'
				marginTop='25px'
				marginLeft='15px'
				justifyContent='center'
				alignContent='center'
				textAlign='center'
			>
				{props.date}
			</Box>
			<Flex
				justifyContent='center'
				textAlign='center'
				flexDirection='column'
			>
				<Box
					margin='5px'
					fontWeight='bold'
					fontSize='14pt'
				>
					{((props.name.slice(0, 55)).toString()).concat(nameContinue)}
				</Box>
				<Box
					margin='6px'
				>
					{((props.desc.slice(0, 110)).toString()).concat(descContinue)}
				</Box>
			</Flex>
			<Flex
				position='relative'
			>
			<Button
				variant='ghost'
				color='black'
				marginTop='20px'
			>
				<FaEdit onClick={props.onOpenEdit}/>
			</Button>
			<Button
				variant='ghost'
				color='black'
				marginTop='20px'
				marginRight='10px'
			>
				<FaTrashAlt/>
			</Button>
			</Flex>
		</Flex>
	)
}

export default function TasksPage() {
	const colorMode = useColorModeValue('light', 'dark')
	const pageBgColor = (colorMode == 'light'? 'clear_lake' : 'dark_forest')
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [ usr_id, setUserId ] = useState('')

	useEffect(() => {
		const { 'myworkspace-user_id': user_id } = parseCookies()

		if (user_id) {
			setUserId(parseInt(user_id))
		}
		else {
			setUserId('')
		}
	}, [])

	return (
		<body>
			<DocumentHead title="Tarefas"/>
			<Navbar pageName="Tarefas"/>
			<TaskEditorModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} bgColor={boxBgColor}/>

			<Box
				w='100%'
				h='100%'
				position='fixed'
				backgroundColor={pageBgColor}
				justifyContent='space-between'
			>
				<Box
					width='100%'
				>
					<IconButton
						variant='ghost'
						bgColor={boxBgColor}
						color='black'
						margin='10px'
						boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
						onClick={onOpen}
					>
						<IoCreateOutline size='40px'/>
					</IconButton>
				</Box>
				<Scrollbars>
					<Box
						justifyContent='center'
						marginLeft='40px'
						marginRight='40px'
					>
						<ListItem
							userId={usr_id} date='27/08/2021' name='Task 01' desc='Primeira tarefa.'
							isOpenEdit={isOpen} onOpenEdit={onOpen} onCloseEdit={onClose}
						/>
					</Box>
				</Scrollbars>
			</Box>
		</body>
	)
}
