import { useWeb3React } from '@web3-react/core';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreedotLoader from '../src/components/loaders/ThreedotLoader';
import { getNfts, populateDb } from '../src/contract/utils';
import { IState, StoreActions } from '../src/store';

const Nfts = () => {

	const dispatch = useDispatch()
	const nftImageURIs: string[] = useSelector<IState>((state) => state.nftImageURIs) as string[] ?? []
	const { library, active } = useWeb3React()
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		// populateDb(library)
		const getTheNfts = async () => {
			const [result, err] = await getNfts(library)
			if (err) return
			setLoading(false)
			dispatch({ type: StoreActions.SetNftImageURIs, payload: result })
		}
		if (active) {
			getTheNfts()
		}
	}, [nftImageURIs, dispatch, active, library])

	const content = isLoading && nftImageURIs.length < 1 ? <ThreedotLoader /> : (<div className={`grid gap-4 grid-cols-4 grid-rows-${Math.ceil(nftImageURIs.length / 4)}`}>
		{nftImageURIs.map((e, i) => {
			return <img src={e} key={i} onError={() => {
				console.log("Failed loading image")
			}} />
		})}
	</div>)

	return (
		<>
			<Head>
				<title>Welcome</title>
			</Head>
			<section className="container mx-auto p-6 font-mono">
				<div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
					<div className="w-full overflow-x-auto">
						{content}
					</div>
				</div>
			</section>
		</>
	)
}

export default Nfts
