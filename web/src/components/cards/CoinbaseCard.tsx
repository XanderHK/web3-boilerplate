import { useWeb3React } from "@web3-react/core"
import { CardProps } from "../../@types"

const CoinbaseCard = (props : CardProps) => {    
    const { activate } = useWeb3React()

    const connect = async () => {
        
    }

    return (
        <>
           <img onClick={connect} src="/assets/images/coinbase.png" alt="Coinbase connect button" />
        </>
    )
}

export default CoinbaseCard