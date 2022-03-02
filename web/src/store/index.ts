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
    nftImageURIs?: { id: number, uri: string }[]
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
            const nftImageURIs = state.nftImageURIs ?? []
            const payload = action.payload

            for (const item of payload) {
                const result = nftImageURIs.some(e => e.id === item.id)
                if (!result) nftImageURIs.push(item)
            }

            return { ...state, nftImageURIs: nftImageURIs }
        case DeleteActions.DeleteAll:
            return {}
        case DeleteActions.DeleteNft:
            const filtered = state.nftImageURIs.filter(e => e.id !== action.payload)
            console.log(filtered)
            return { ...state, nftImageURIs: filtered }
        default:
            return state
    }
}

const makeStore: MakeStore<IState> = (context: Context) => createStore(reducer)
export const reduxWrapper = createWrapper<IState>(makeStore, { debug: false });