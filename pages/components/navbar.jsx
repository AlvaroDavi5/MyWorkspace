import React from 'react'
import {
	useDisclosure,
	Box, Center, Button,
	Drawer,
	DrawerHeader, DrawerBody, DrawerFooter,
	DrawerOverlay, DrawerContent, DrawerCloseButton
} from '@chakra-ui/react'
import { MdMenu } from "react-icons/md"
import { DiGithubBadge } from 'react-icons/di'


function MenuDrawer() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()

	return (
		<>
		<Button
			ref={btnRef}
			colorScheme='teal'
			color='black'
			onClick={onOpen}
			height='10'
		>
			<MdMenu size='30'/>
		</Button>

		<Drawer
			isOpen={isOpen}
			placement="right"
			onClose={onClose}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay/>
			<DrawerContent>
				<DrawerCloseButton/>
				<DrawerHeader background='dark_forest'>
					Create your account
				</DrawerHeader>

				<DrawerBody size="xs" background='dark_forest'>
					<a href="https://api.nasa.gov/">
						<Button
							size='lg'
							variant='solid'
							bg='secondary'
						>
							API
						</Button>
					</a>
				</DrawerBody>

				<DrawerFooter background='dark_forest'/>
			</DrawerContent>
		</Drawer>
		</>
	)
}

export default function Navbar() {
	return (
		<Box
			bg='primary'
			w="100%"
			p={5}
			color="black"
		>
			<a href="https://github.com/AlvaroDavi5/NextJS-first_webapp">
				<Button
					size='xl'
					color='white'
					variant='solid'
					bg='black'
					padding='5px'
					justifySelf='start'
				>
					<DiGithubBadge size='60'/>
					Project Repo
				</Button>
			</a>

			<Center
				h="100px"
				color="white"
				display='inline'
				justifySelf='center'
			>
				This is the Center
			</Center>

			<MenuDrawer/>
		</Box>
	)
}
