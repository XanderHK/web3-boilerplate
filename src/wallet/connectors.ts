import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'

export const injected = new InjectedConnector({
    supportedChainIds: [56],
})

export const walletconnect = new WalletConnectConnector({
    chainId: 56,
    supportedChainIds: [56],
    rpc: { 56: 'https://bsc-dataseed.binance.org/' },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
})

const walletlink = new WalletLinkConnector({ 
    url: '...', 
    appName: '...' 
})

export const resetWalletConnector = (connector: AbstractConnector) => {
  if (
    connector &&
    connector instanceof WalletConnectConnector
  ) {
    connector.walletConnectProvider = undefined
  }
}