import Head from 'next/head'
import styles from "./styles/home.module.css"


export default function Home() {
	return (
		<div>
			<Head>
				<title>Home - MyWorkspace</title>
			</Head>

			<main className={styles.main}>
				Welcome
			</main>
		</div>
	)
}
