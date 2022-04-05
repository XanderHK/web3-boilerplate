import '../styles/globals.css'
import '../styles/styles.scss'
import React, { FC, useEffect } from 'react';
import { AppContext, AppProps } from 'next/app';
import { IState, reduxWrapper } from '../src/store';
import Navbar from '../src/components/Navbar';
import { Web3ReactProvider, useWeb3React, createWeb3ReactRoot } from "@web3-react/core"
import { useSelector } from 'react-redux';
import { getLibrary, populateNftsByAddress } from '../src/contract/utils';
import Footer from '../src/components/Footer';
import Message from '../src/components/Message';


const Web3ReactApp = ({ Component, pageProps }) => {

	const { library, active, account } = useWeb3React()
	const errors: string[] = useSelector<IState>((state) => state.errorMessages) as string[] ?? []
	const successes: string[] = useSelector<IState>((state) => state.successMessages) as string[] ?? []

	useEffect(() => {
		if (active) {
			populateNftsByAddress(library)
		}
	}, [active])

	return (
		<>
			<Navbar />
			{errors.map((error, index: number) => {
				return <Message message={error} key={index} />
			})}
			{successes.map((message, index: number) => {
				return <Message message={message} key={index} type='success' />
			})}
			<Component {...pageProps} />
			<Footer />
		</>
	)
}

const App: FC<AppProps> & { getInitialProps: Function } = ({ Component, pageProps }: AppProps) => {
	return (
		<Web3ReactProvider getLibrary={(provider: any) => getLibrary(provider)}>
			<Web3ReactApp Component={Component} pageProps={pageProps} />
		</Web3ReactProvider>
	)
}

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
	const pageProps = !Component.getInitialProps ? {} : await Component.getInitialProps(ctx);
	return { pageProps };
};

// eslint-disable-next-line import/no-default-export
export default reduxWrapper.withRedux(App);
