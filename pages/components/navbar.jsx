import Link from 'next/link'
import { useRef } from 'react'
import {
	useDisclosure,
	useColorMode, useColorModeValue,
	Center, Button, IconButton,
	Flex, Drawer,
	DrawerHeader, DrawerBody, DrawerFooter,
	DrawerOverlay, DrawerContent, DrawerCloseButton
} from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'
import { BiSun, BiMoon } from 'react-icons/bi'
import { DiGithubBadge } from 'react-icons/di'


function MenuDrawer() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = useRef()
	const colorMode = useColorModeValue('light', 'dark')
	const boxBgColor = (colorMode == 'light' ? 'marine' : 'primary')

	return (
		<>
			<IconButton
				ref={btnRef}
				variant='ghost'
				color='black'
				bg={boxBgColor}
				onClick={onOpen}
				height='10'
				width='10'
			>
				<MdMenu size={['30', '50']}/>
			</IconButton>

			<Drawer
				isOpen={isOpen}
				placement='right'
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay/>
				<DrawerContent>
					<DrawerCloseButton
						size='30px'
						margin='5px'
					/>
					<DrawerHeader background={boxBgColor}>
						Menu
					</DrawerHeader>

					<DrawerBody size='xs' background={boxBgColor}>
						<Link href="https://api.nasa.gov/" passHref>
							<Button
								size='lg'
								boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
								variant='mw_button'
							>
								API
							</Button>
						</Link>
					</DrawerBody>

					<DrawerFooter background={boxBgColor}/>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default function Navbar(props) {
	const { colorMode, toggleColorMode } = useColorMode()
	const boxBgColor = (colorMode == 'light' ? 'marine' : 'primary')
	const textColor = (colorMode == 'light' ? 'white' : 'black')
	const iconColor = (colorMode == 'light' ? 'black' : 'white')

	return (
		<Flex
			bg={boxBgColor}
			width='100%'
			height={['80px', '100px']}
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
				<Link href="https://github.com/AlvaroDavi5/MyWorkspace" passHref
				>
					<Button
						size='xl'
						boxShadow='1px 1px 2px 2px rgba(0, 0, 0, 0.3)'
						color={iconColor}
						variant='mw_button'
						bg={textColor}
						padding='5px'
						marginRight='5px'
						display='list-item'
					>
						<DiGithubBadge size='60'/>
					</Button>
				</Link>
			</div>

			<Center
				color='black'
				display='inline-block'
				justifySelf='center'
				textAlign='center'
				margin='5px'
				fontSize={['xl', 'xx-large']}
				fontWeight={['bold', 'normal']}
			>
				{props.pageName}
			</Center>

			<Flex
				className="menu-button"
			>
				<IconButton
					icon={colorMode == 'light' ? <BiMoon size={['30', '50']}/> : <BiSun size={['30', '50']}/>}
					variant='ghost'
					backgroundColor={boxBgColor}
					color='black'
					marginRight={['10px', '50px']}
					onClick={toggleColorMode}
				/>
				<MenuDrawer/>
			</Flex>
		</Flex>
	)
}
