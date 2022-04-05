import { useWeb3React } from '@web3-react/core';
import Head from 'next/head';
import { useEffect } from 'react';
import Mint from "../src/components/Mint"
import { populateNftsByAddress, isMobileDevice } from '../src/contract/utils';
import { useDispatch } from 'react-redux';
import { StoreActions } from '../src/store';


const Home = () => {

	const dispatch = useDispatch()

	useEffect(() => {
		if (isMobileDevice()) {
			dispatch({ type: StoreActions.SetErrorMessages, payload: 'If you are using metamask, ensure that you are using the in-app browser.' })
		}
	}, [])


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
