import { useWeb3React } from "@web3-react/core"
import { CardProps } from "../../@types"
import { injected } from "../../wallet/connectors"

const MetamaskCard = ({close} : CardProps) => {
    const { activate} = useWeb3React()

    const connect = async () => {
        try {
            await activate(injected)
            localStorage.setItem('isWalletConnected', "true")
            localStorage.setItem('provider', "metamask")
            close()
        } catch (exc) {
            console.log(exc)
        }
    }

    return (
        <>
            <img onClick={connect} src="/assets/images/metamask.png" alt="Metamask connect button" />
        </>
    )
}

export default MetamaskCard