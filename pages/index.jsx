import Image from 'next/image' 
import DocumentHead from "./components/document_head.jsx"
import Navbar from "./components/navbar.jsx"
import Home from "./home/index.jsx"
import styles from "./styles/index.module.css"
import bgd_img from "./assets/background-universe.jpg"


export default function MainIndex() {
	return (
		<div className={styles.container}>
			<DocumentHead title="Home"/>

			<Image
				alt="background_universe"
				src={bgd_img}
				className={styles.background_image}
				layout="fill"
				objectFit="cover"
				quality={100}
			/>

			<body>
				<Navbar/>

				<Home/>
			</body>
		</div>
	)
}
