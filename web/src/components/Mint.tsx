import { useWeb3React } from "@web3-react/core"
import { mint } from "../contract/utils"
import { useDispatch } from 'react-redux';
import { StoreActions } from "../store";

const Mint = () => {

    const { library, active } = useWeb3React()
    const dispatch = useDispatch()

    const mintOnClick = async () => {
        if(!active){
            dispatch({type : StoreActions.SetErrorMessages, payload : 'Not connected to a wallet.'})
            return
        }
        const [hash, error] = await mint(library)
        if(error) dispatch({type : StoreActions.SetErrorMessages, payload : 'Something went wrong during the minting process, please make sure you have sufficient funds.'})
        if(hash) dispatch({type : StoreActions.SetSuccessMessages, payload : `${hash}`})
    }

    return (
        <>
            <button onClick={mintOnClick}>Mint</button>
        </>
    )
}

export default Mint