import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../wallet/connectors"
import MetamaskCard from "./cards/MetamaskCard";
import WalletConnectCard from "./cards/WalletConnectCard";
import CoinbaseCard from "./cards/CoinbaseCard";
import TrustWalletCard from "./cards/TrustWalletCard";

const Connect = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const close = () => setModalOpen(false)
    const open = () => setModalOpen(true)
    const walletId = useSelector<IState>((state) => state.walletId)
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const modalBody = () => {

        const options = (
            <div className="grid gap-4 grid-cols-2 grid-rows-2">
                <MetamaskCard close={close} />
                <WalletConnectCard close={close} />
                <CoinbaseCard close={close} />
                <TrustWalletCard close={close} />
            </div>
        )

        return (
            <>
            {!active ? options : 'Please disconnect your current wallet'}
            </>
        )
    }

    const disconnect = async () => {
        try {
            deactivate()
            localStorage.removeItem('isWalletConnected')
            localStorage.removeItem('isProviderWalletConnect')
            close()
        } catch (exc) {
            console.log(exc)
        }
    }

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage?.getItem('isWalletConnected') === 'true') {
                // if(localStorage?.getItem('isProviderWalletConnect') !== 'true') connect()
                await activate(injected)
            }
        }
        connectWalletOnPageLoad()
    }, [])

    return (
        <>
            <button
                onClick={() => modalOpen ? close() : open()}
                className="w-full mt-6 text-indigo-50 font-bold bg-indigo-600 py-3 rounded-md hover:bg-indigo-500 transition duration-300"
            >{active ? <span>Connected with: {account.substr(0, 8)}...{account.substr(-8, 8)}</span> : <span>Connect</span>}</button>

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={null}
            >
                {modalOpen && <Modal
                    handleClose={close}
                    handleSubmit={disconnect}
                    title="Connect Wallet"
                    content={modalBody}
                    submitText="Disconnect" />}
            </AnimatePresence>
        </>
    )
}

export default Connect