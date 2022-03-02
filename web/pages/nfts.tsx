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

const ReactImageAppear = dynamic(() => import('react-image-appear'), {
	ssr: false
});

const Nfts = () => {
	const dispatch = useDispatch()
	const nftImageURIs: { id: number, uri: string }[] = useSelector<IState>((state) => state.nftImageURIs) as { id: number, uri: string }[] ?? []
	const { library, active, account } = useWeb3React()
	const [isLoading, setLoading] = useState(true)
	const [modalOpen, setModalOpen] = useState(false)
	const [modalState, setModalState]: [{ tokenId?: number }, Dispatch<SetStateAction<{}>>] = useState({})
	const close = () => setModalOpen(false)
	const open = () => setModalOpen(true)
	const [nftOption, setNftOption] = useState(true)

	useEffect(() => {
		const fetch = async () => {
			const [result, err] = nftOption ? await fetchNftsOfConnected(account) : await fetchNfts()
			if (err) return
			console.log(result)
			setLoading(false)
			dispatch({ type: StoreActions.SetNftImageURIs, payload: result.uris })
		}
		if (active) fetch()
		if (!active) dispatch({ type: DeleteActions.DeleteAll })
	}, [library, active, account, nftOption])

	const handleImageClick = ({ currentTarget }) => {
		const tokenId = currentTarget.src.split('/').filter(e => e.includes('.')).pop().split('.').shift()
		setModalState({
			tokenId: Number(tokenId)
		})
		open()
	}

	const modalBody = () => {
		return (
			<>
				<Transfer tokenId={modalState.tokenId} close={close} />
			</>
		)
	}

	const content = isLoading && nftImageURIs.length < 1 ? (active ? <ThreedotLoader /> : "Wallet not connected.") : (<div className={`grid gap-4 grid-cols-4 grid-rows-${Math.ceil(nftImageURIs.length / 4)}`}>
		{nftImageURIs.map((e, i) => {
			return (
				<ReactImageAppear
					key={i}
					// @ts-ignore: Unreachable code error
					src={e.uri}
					onClick={handleImageClick}
				/>
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
						{/* <button className='bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
							onClick={() => setNftOption(true)}>
							My NFTs
						</button>
						<button className='bg-emerald-500 text-black active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
							onClick={() => setNftOption(false)}>
							All NFTs
						</button> */}
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
