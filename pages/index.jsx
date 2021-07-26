import { Box } from '@chakra-ui/react'
import DocumentHead from "./components/document_head.jsx"
import Navbar from "./components/navbar.jsx"
import Home from "./home/index.jsx"


export default function MainIndex() {
	return (
		<Box
			className="homepage"
		>
			<DocumentHead title="Home"/>

			<Navbar pageName="Área de Trabalho"/>

			<Home/>
		</Box>
	)
}
