import { useWeb3React } from "@web3-react/core"
import { CardProps } from "../../@types"

const TrustWalletCard = (props : CardProps) => {

    const { activate } = useWeb3React()

    const connect = async () => {

    }

    return (
        <>
            <img onClick={connect} src="/assets/images/trustwallet.png" alt="Trustwallet connect button" width="64" height="64" />
        </>
    )
}

export default TrustWalletCard