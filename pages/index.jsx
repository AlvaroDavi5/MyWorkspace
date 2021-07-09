import Head from 'next/head'
import Image from 'next/image' 
import Navbar from "./components/navbar.jsx"
import Home from "./home/index.jsx"
import styles from "./styles/index.module.css"
import bgd_img from "./assets/background-universe.jpg"


export default function MainIndex() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Nasa: Unofficial Site</title>
				<meta name="description" content="Rebuild of Nasa site"/>
				<link rel="icon" href="/favicon.ico"/>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
			</Head>

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
