import React from 'react'
import {
	useDisclosure,
	useColorMode,
	Box, Center, Button,
	Drawer,
	DrawerHeader, DrawerBody, DrawerFooter,
	DrawerOverlay, DrawerContent, DrawerCloseButton
} from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import { CgArrowsExchange } from 'react-icons/cg'
import { BiSun, BiMoon } from 'react-icons/bi'
import { DiGithubBadge } from 'react-icons/di'


function MenuDrawer() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()

	return (
		<>
		<Button
			ref={btnRef}
			variant='ghost'
			color='black'
			bg='marine'
			boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
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
				<DrawerCloseButton
					boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
				/>
				<DrawerHeader background='marine'>
					Menu
				</DrawerHeader>

				<DrawerBody size="xs" background='marine'>
					<a href="https://api.nasa.gov/">
						<Button
							size='lg'
							bg='clear_lake'
							boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
							variant='ghost'
						>
							API
						</Button>
					</a>
				</DrawerBody>

				<DrawerFooter background='marine'/>
			</DrawerContent>
		</Drawer>
		</>
	)
}

export default function Navbar(props) {
	const { colorMode,  toggleColorMode } = useColorMode()

	return (
		<Box
			bg='marine'
			w='100%'
			h='100px'
			p={5}
			color='black'
			boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
			boxSizing='border-box'
			padding='10px 15px'
			display='flex'
			justifyContent='space-between'
			alignItems='center'
		>
			<div
				className="logo"
			>
				<a href="https://github.com/AlvaroDavi5/MyWorkspace"
				>
					<Button
						size='xl'
						boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
						color='white'
						variant='solid'
						bg='black'
						padding='5px'
						display='list-item'
					>
						<DiGithubBadge size='60'/>
					</Button>
				</a>
			</div>

			<Center
				color="black"
				display='inline-block'
				justifySelf='center'
				textAlign='center'
				margin='5px'
				fontSize='xx-large'
			>
				{props.pageName}
			</Center>

			<div
				className="menu-button"
				flex='1'
			>
				<Button
					variant='ghost'
					backgroundColor='marine'
					color='black'
					marginRight='50px'
					boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
					onClick={toggleColorMode}
				>
					<BiSun size='20'/>
					<CgArrowsExchange size='20'/>
					<BiMoon size='20'/>
				</Button>

				<MenuDrawer/>
			</div>
		</Box>
	)
}
