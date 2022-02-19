import { useWeb3React } from "@web3-react/core"
import { CardProps } from "../../@types"
import { resetWalletConnector, walletconnect } from "../../wallet/connectors"

const WalletConnectCard = ({close} : CardProps) => {

    const { activate } = useWeb3React()

    const connect = async () => {
        try {
            await activate(walletconnect, undefined, true)
            localStorage.setItem('isWalletConnected', "true")
            localStorage.setItem('provider', "walletconnect")
            close()
        } catch (exc) {
            resetWalletConnector(walletconnect)
        }
    }

    return (
        <>
            <img onClick={connect} src="/assets/images/walletconnect-square-white.png" alt="Walletconnect connect button" width="64" height="64" />
        </>
    )
}

export default WalletConnectCard