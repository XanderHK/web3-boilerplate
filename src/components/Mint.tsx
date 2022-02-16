import { useWeb3React } from "@web3-react/core"
import { mint } from "../wallet/utils"
import { useDispatch } from 'react-redux';
import { StoreActions } from "../store";

const Mint = () => {

    const { library } = useWeb3React()
    const dispatch = useDispatch()

    const mintOnClick = async () => {
        const [hash, error] = await mint(library)
        if(error) dispatch({type : StoreActions.SetErrorMessages, payload : error.data})
        if(hash) dispatch({type : StoreActions.SetSuccessMessages, payload : `${hash}`})
    }

    return (
        <>
            <button onClick={mintOnClick}>Mint</button>
        </>
    )
}

export default Mint