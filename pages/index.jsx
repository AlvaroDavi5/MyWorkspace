import { Box } from '@chakra-ui/react'
import Login from "./auth/login.jsx"


export default function AppIndex() {
	return (
		<Box
			className="mainpage"
		>
			<Login/>
		</Box>
	)
}
