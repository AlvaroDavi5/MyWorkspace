import Head from 'next/head'
import styles from "./styles/home.module.css"


export default function Home() {
	return (
		<div>
			<Head>
				<title>Home - Nasa: Unofficial Site</title>
			</Head>

			<main className={styles.main}>
				Welcome
			</main>
		</div>
	)
}
