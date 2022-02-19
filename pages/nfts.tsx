import { useWeb3React } from '@web3-react/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getNfts } from '../src/contract/utils';

const Nfts = () => {

	const { library, active } = useWeb3React()
	const [nftImageURIs, setNftImageURIs] = useState([])

	useEffect(() => {
		// @todo fix memory leak?
		let isSubscribed = true
		const getTheNfts = async () => {
			const [result, err] = await getNfts(library)
			if (err) return
			setNftImageURIs(result)
		}

		if (isSubscribed) {
			if (active) {
				getTheNfts()
			}
		}

		return () => { isSubscribed = false };

	}, [nftImageURIs, setNftImageURIs, active])

	return (
		<>
			<Head>
				<title>Welcome</title>
			</Head>
			<section className="container mx-auto p-6 font-mono">
				<div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
					<div className="w-full overflow-x-auto">
						{nftImageURIs.map((e, i) => {
							return <img src={e} key={i} />
						})}
					</div>
				</div>
			</section>
		</>
	)
}

export default Nfts
