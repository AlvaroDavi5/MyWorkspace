import React from 'react'
import {
	useDisclosure,
	useColorMode, useColorModeValue,
	Box, Center, Button, IconButton,
	Drawer,
	DrawerHeader, DrawerBody, DrawerFooter,
	DrawerOverlay, DrawerContent, DrawerCloseButton
} from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import { BiSun, BiMoon } from 'react-icons/bi'
import { DiGithubBadge } from 'react-icons/di'


function MenuDrawer() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = React.useRef()
	const colorMode = useColorModeValue('light', 'dark')
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')

	return (
		<>
		<Button
			ref={btnRef}
			variant='ghost'
			color='black'
			bg={boxBgColor}
			boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
			onClick={onOpen}
			height='10'
		>
			<MdMenu size='30'/>
		</Button>

		<Drawer
			isOpen={isOpen}
			placement='right'
			onClose={onClose}
			finalFocusRef={btnRef}
		>
			<DrawerOverlay/>
			<DrawerContent>
				<DrawerCloseButton
					boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
				/>
				<DrawerHeader background={boxBgColor}>
					Menu
				</DrawerHeader>

				<DrawerBody size='xs' background={boxBgColor}>
					<a href="https://api.nasa.gov/">
						<Button
							size='lg'
							boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
							variant='mw_button'
						>
							API
						</Button>
					</a>
				</DrawerBody>

				<DrawerFooter background={boxBgColor}/>
			</DrawerContent>
		</Drawer>
		</>
	)
}

export default function Navbar(props) {
	const { colorMode,  toggleColorMode } = useColorMode()
	const boxBgColor = (colorMode == 'light'? 'marine' : 'primary')
	const textColor = (colorMode == 'light'? 'white' : 'black')
	const iconColor = (colorMode == 'light'? 'black' : 'white')

	return (
		<Box
			bg={boxBgColor}
			w='100%'
			h='100px'
			p='5'
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
						color={iconColor}
						variant='mw_button'
						bg={textColor}
						padding='5px'
						display='list-item'
					>
						<DiGithubBadge size='60'/>
					</Button>
				</a>
			</div>

			<Center
				color='black'
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
				<IconButton
					icon={colorMode == 'light'? <BiMoon size='30'/> : <BiSun size='30'/>}
					variant='ghost'
					backgroundColor={boxBgColor}
					color='black'
					marginRight='50px'
					boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
					onClick={toggleColorMode}
				/>
				<MenuDrawer/>
			</div>
		</Box>
	)
}
