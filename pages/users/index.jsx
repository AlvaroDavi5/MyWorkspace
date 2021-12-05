import Router from 'next/router'


export default function Users() {

	function rootRouter() {
		Router.push("/")
	}

	return (
		<body onLoad={rootRouter()}>
		</body>
	)
}
