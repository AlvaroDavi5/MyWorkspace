import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<title>MyWorkspace</title>
					<meta name='application-name' content='MyWorkspace'/>
					<meta name="description" content="Webapp para organização de projetos, tarefas e consulta a acervos e catálogos."/>
					<link rel="icon" href="/favicon.ico"/>
					<meta name='theme-color' content='#000000'/>
					<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"/>
					<link rel="manifest" href="manifest.json"/>
					<link rel="manifest" href="manifest.webmanifest"/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		)
	}
}

export default MyDocument
