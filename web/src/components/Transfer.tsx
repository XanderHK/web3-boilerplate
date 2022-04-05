import { useWeb3React } from "@web3-react/core"
import { transfer } from "../contract/utils"
import { useDispatch } from 'react-redux';
import { DeleteActions, StoreActions } from "../store";
import { useState } from "react";

const Transfer = ({ tokenId, close, tokenUri }) => {

    const { library, active } = useWeb3React()
    const dispatch = useDispatch()
    const [to, setTo] = useState('')

    const transferOnClick = async () => {
        if (active) {
            if (!to) {
                dispatch({ type: StoreActions.SetErrorMessages, payload: "Please fill in a address." })
                return
            }
            const [result, err] = await transfer({ provider: library, to: to, tokenId: Number(tokenId) })
            console.log(result, err)
            if (err) {
                dispatch({ type: StoreActions.SetErrorMessages, payload: "Something went wrong during the transfer." })
                return;
            }
            dispatch({ type: StoreActions.SetSuccessMessages, payload: `Transfer succesful! ${result}` })
            dispatch({ type: DeleteActions.DeleteNft, payload: tokenId })
        }
        close()
    }

    const handleChange = ({ target }) => {
        setTo(target.value)
    }

    return (
        <>
            <form>
                <input type="text" name="to" onChange={handleChange} />
                <button type="button" onClick={transferOnClick}>Transfer</button>
            </form>
        </>
    )
}

export default Transfer