import { useWeb3React } from "@web3-react/core"
import Head from 'next/head';
import Mint from "../src/components/Mint"

const Home = () => {
	const { library } = useWeb3React()

	return (
		<>
			<Head>
				<title>Welcome</title>
			</Head>
			<section className="container mx-auto p-6 font-mono">
				<div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
					<div className="w-full overflow-x-auto">
						<Mint />
					</div>
				</div>
			</section>
		</>
	)
}

export default Home
