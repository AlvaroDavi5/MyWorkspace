import { Button } from '@chakra-ui/react'
import { DiGithubBadge } from 'react-icons/di'
import styles from "./styles/navbar.module.css"
import logo from "../assets/nasa-logo.svg"


export default function Navbar() {
	return (
		<div className={styles.navbar}>
			<div className={styles.nasa_logo}>
				<img
					className={styles.logo}
					src={logo}
					alt="logo"
				/>
			</div>

			<ul className={styles.nav_options}>
				<li>Missions</li>
				<li>Galleries</li>
				<li>NASA Journal</li>
				<li>NASA TV</li>
				<li>Downloads</li>
				<li>
					<a href="https://api.nasa.gov/">
						<Button
							size='lg'
							color='primary'
							variant='solid'
							bg='secondary'
						>
							API
						</Button>
					</a>
				</li>
				<li>
					<a href="/others/about">About</a>
				</li>
				<li>
					<a href="/others/contact">Contact</a>
				</li>
				<li>
					<a href="https://github.com/AlvaroDavi5/NextJS-first_webapp">
						<Button
							className={styles.github}
							size='xl'
							color='white'
							variant='solid'
							bg='black'
							padding='5px'
						>
							<DiGithubBadge size='60'/>
							Project Repo
						</Button>
					</a>
				</li>
			</ul>

		</div>
	)
}
