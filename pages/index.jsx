import { Box } from '@chakra-ui/react'
import Home from "./home/index.jsx"
import Login from "./auth/login.jsx"
import Register from "./auth/register.jsx"


export default function MainIndex() {
	return (
		<Box
			className="homepage"
		>
			<Home/>
		</Box>
	)
}
