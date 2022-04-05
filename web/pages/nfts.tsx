import { useWeb3React } from '@web3-react/core';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreedotLoader from '../src/components/loaders/ThreedotLoader';
import { fetchNfts, fetchNftsOfConnected } from '../src/contract/utils';
import { DeleteActions, IState, StoreActions } from '../src/store';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Modal from '../src/components/Modal';
import Transfer from '../src/components/Transfer'
import Image from '../src/components/Image';

const ReactImageAppear = dynamic(() => import('react-image-appear'), {
	ssr: false
});

const Nfts = () => {
	const dispatch = useDispatch()
	const nftImageURIs: Map<number, string> = useSelector<IState>((state) => state.nftImageURIs) as Map<number, string> ?? new Map()
	const { library, active, account } = useWeb3React()
	const [isLoading, setLoading] = useState(true)
	const [modalOpen, setModalOpen] = useState(false)
	const [modalState, setModalState]: [{ tokenId?: number, tokenUri?: string }, Dispatch<SetStateAction<{}>>] = useState({})
	const close = () => setModalOpen(false)
	const open = () => setModalOpen(true)

	useEffect(() => {
		const fetch = async () => {
			const [result, err] = await fetchNftsOfConnected(account)
			if (err) return
			setLoading(false)
			if (result) dispatch({ type: StoreActions.SetNftImageURIs, payload: result.uris })
		}
		if (active) fetch()
		if (!active) dispatch({ type: DeleteActions.DeleteAll })
	}, [library, active, account])

	const handleImageClick = ({ currentTarget }) => {
		const tokenId = currentTarget.src.split('/').filter(e => e.includes('.')).pop().split('.').shift()
		setModalState({
			tokenId: Number(tokenId),
			tokenUri: currentTarget.src
		})
		open()
	}

	const modalBody = () => {
		return (
			<>
				<Transfer tokenId={modalState.tokenId} tokenUri={modalState.tokenUri} close={close} />
			</>
		)
	}

	const content = isLoading && nftImageURIs.size < 1 ? (active ? <ThreedotLoader /> : "Wallet not connected.") : (<div className={`grid gap-4 grid-cols-4 grid-rows-${Math.ceil(nftImageURIs.size / 4)}`}>
		{Array.from(nftImageURIs.entries()).map((e, i) => {
			return (
				<Image src={e[1]} onImageClick={handleImageClick} key={i} />
			)
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
			<AnimatePresence
				initial={false}
				exitBeforeEnter={true}
				onExitComplete={null}
			>
				{modalOpen && <Modal
					handleClose={close}
					title="NFT information"
					content={modalBody}
					submitText="Nothing" />}
			</AnimatePresence>
		</>
	)
}

export default Nfts
