import Image from 'next/image' 
import DocumentHead from "./components/document_head.jsx"
import Navbar from "./components/navbar.jsx"
import Home from "./home/index.jsx"


export default function MainIndex() {
	return (
		<div className="container">
			<DocumentHead title="Home"/>
			<Navbar/>
			<body>
				<Home/>
			</body>
		</div>
	)
}
