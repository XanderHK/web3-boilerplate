import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

export const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 56]
})

// export const walletConnect = new WalletConnectConnector({
//   rpc: { 1: '', 4: '' },
//   infuraId: '',
//   bridge: '',
//   qrcode: true,
//   supportedChainIds: [1, 3, 4, 5, 42, 56]
// });