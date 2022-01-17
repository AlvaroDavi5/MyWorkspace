import Link from 'next/link'
import {
	useColorMode,
	Flex,
	Center, IconButton
} from '@chakra-ui/react'
import { BiSun, BiMoon } from 'react-icons/bi'
import { DiGithubBadge } from 'react-icons/di'


export default function MinNavbar(props) {
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
					<IconButton
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
					</IconButton>
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

			<div
				className="menu-button"
				flex='1'
			>
				<IconButton
					icon={colorMode == 'light' ? <BiMoon size={['30', '50']}/> : <BiSun size={['30', '50']}/>}
					variant='ghost'
					backgroundColor={boxBgColor}
					color='black'
					marginLeft='10px'
					marginRight='50px'
					onClick={toggleColorMode}
				/>
			</div>
		</Flex>
	)
}
