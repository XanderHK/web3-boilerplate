import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';
import { useWeb3React } from "@web3-react/core";
import { injected } from "../wallet/connectors"


const Connect = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const close = () => setModalOpen(false)
    const open = () => setModalOpen(true)
    const walletId = useSelector<IState>((state) => state.walletId)
    const {active, account, library, connector, activate, deactivate } = useWeb3React()

    const modalBody = () => {

    }

    const connect = async () => {
        try{
            await activate(injected)
            localStorage.setItem('isWalletConnected', "true")
            close()
        }catch(exc){
            console.log(exc)
        }
    }

    const disconnect = async () => {
        try{
            deactivate()
            localStorage.setItem('isWalletConnected', "false")
            close()
        }catch(exc){
            console.log(exc)
        }
    }

    useEffect(() => {
        const connectWalletOnPageLoad = () => {
            if(localStorage?.getItem('isWalletConnected') === 'true'){
                connect()
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
                    handleSubmit={active ? disconnect : connect}
                    title="Connect Wallet"
                    content={modalBody} />}
            </AnimatePresence>
        </>
    )
}

export default Connect