import { createStore, AnyAction } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';

export enum StoreActions {
    SetWalletId = "SET_WALLET_ID",
    SetErrorMessages = "SET_ERROR_MESSAGES",
    SetSuccessMessages = "SET_SUCCESS_MESSAGES",
    SetNftImageURIs = "SET_NFT_IMAGE_URIS"
}

export enum DeleteActions {
    DeleteAll = "DELETE_ALL"
}

export interface IState {
    walletId?: string
    errorMessages?: string[]
    successMessages?: string[]
    nftImageURIs?: string[]
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
            return { ...state, nftImageURIs: Array.from(new Set([...nftImageURIs, ...action.payload])) }
        case DeleteActions.DeleteAll:
            return {}
        default:
            return state
    }
}

const makeStore: MakeStore<IState> = (context: Context) => createStore(reducer)
export const reduxWrapper = createWrapper<IState>(makeStore, { debug: false });