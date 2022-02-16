import { createStore, AnyAction } from 'redux';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';

export enum StoreActions {
    SetWalletId = "SET_WALLET_ID",
    SetErrorMessages = "SET_ERROR_MESSAGES",
    SetSuccessMessages = "SET_SUCCESS_MESSAGES"
}

export type ErrorRequired = {code : string, message : string}
export type ErrorObject<T> = T & {[key : string] : unknown}

export interface IState {
    walletId?: string
    errorMessages?: ErrorObject<ErrorRequired>[]
    successMessages?: string[]
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
        default:
            return state
    }
}

const makeStore: MakeStore<IState> = (context: Context) => createStore(reducer)
export const reduxWrapper = createWrapper<IState>(makeStore, { debug: false });