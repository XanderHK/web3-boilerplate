import { createStore, AnyAction } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';

export enum StoreActions {
    SetWalletId = "SET_WALLET_ID",
    SetErrorMessages = "SET_ERROR_MESSAGES",
    SetSuccessMessages = "SET_SUCCESS_MESSAGES",
    SetNftImageURIs = "SET_NFT_IMAGE_URIS"
}

export enum DeleteActions {
    DeleteAll = "DELETE_ALL",
    DeleteNft = "DELETE_NFT"
}

export interface IState {
    walletId?: string
    errorMessages?: string[]
    successMessages?: string[]
    nftImageURIs?: Map<number, string>
}

const initialState = {}

const reducer = (state: IState = initialState, action: AnyAction) => {
    switch (action.type) {
        case StoreActions.SetWalletId:
            return { ...state, walletId: action.payload }
        case StoreActions.SetErrorMessages:
            const errors = state.errorMessages ?? []
            return { ...state, errorMessages: [...errors, action.payload] }
        case StoreActions.SetSuccessMessages:
            const successes = state.errorMessages ?? []
            return { ...state, successMessages: [...successes, action.payload] }
        case StoreActions.SetNftImageURIs:
            const payload: { id?: number, uri: string, tokenId: number }[] = action.payload
            const nftImageURIs = state.nftImageURIs ?? new Map()
            for (const item of payload) {
                nftImageURIs.set(item.tokenId, item.uri)
            }

            return <IState>{ ...state, nftImageURIs: nftImageURIs }
        case DeleteActions.DeleteAll:
            return {}
        case DeleteActions.DeleteNft:
            state.nftImageURIs.delete(action.payload)
            return <IState>{ ...state }
        default:
            return state
    }
}

const makeStore: MakeStore<IState> = (context: Context) => createStore(reducer)
export const reduxWrapper = createWrapper<IState>(makeStore, { debug: false });