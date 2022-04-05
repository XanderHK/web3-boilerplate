import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from 'react-redux';
import { DeleteActions, IState } from '../store';
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "../wallet/connectors"
import MetamaskCard from "./cards/MetamaskCard";
import WalletConnectCard from "./cards/WalletConnectCard";
import { useRouter } from "next/router";

const Connect = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const router = useRouter()
    const close = () => setModalOpen(false)
    const open = () => setModalOpen(true)
    const dispatch = useDispatch()
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const modalBody = () => {

        const options = (
            <div className="grid gap-4 grid-cols-2 grid-rows-2">
                <MetamaskCard close={close} />
                <WalletConnectCard close={close} />
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
            dispatch({ type: DeleteActions.DeleteAll })
            localStorage.removeItem('isWalletConnected')
            localStorage.removeItem('provider')
            router.push('/')
            close()
        } catch (exc) {
            console.log(exc)
        }
    }

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            if (localStorage?.getItem('isWalletConnected') === 'true') {
                if (localStorage?.getItem('provider') === "metamask") await activate(injected)
                if (localStorage?.getItem('provider') === "walletconnect") await activate(walletconnect, undefined, true)
            }
        }
        connectWalletOnPageLoad()
    }, [])

    return (
        <>
            <button
                onClick={() => modalOpen ? close() : open()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
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