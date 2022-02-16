import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import '../styles/styles.scss'
import React, { FC } from 'react';
import { AppContext, AppProps } from 'next/app';
import { ErrorObject, ErrorRequired, IState, reduxWrapper } from '../src/store';
import Navbar from '../src/components/Connect';
import { Web3ReactProvider } from "@web3-react/core"
import { useSelector } from 'react-redux';
import { getLibrary } from '../src/contract/utils';
import Footer from '../src/components/Footer';
import Message from '../src/components/Message';

const App: FC<AppProps> & { getInitialProps: Function } = ({ Component, pageProps }: AppProps) => {

  const errors = useSelector<IState>((state) => state.errorMessages) as ErrorObject<ErrorRequired>[] ?? []

  return (
    <Web3ReactProvider getLibrary={(provider: any) => getLibrary(provider)}>
      <Navbar />
      {errors.map((error, index: number) => {
        return <Message message={error.message} key={index} />
      })}
      <Component {...pageProps} />
      <Footer />
    </Web3ReactProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const pageProps = !Component.getInitialProps ? {} : await Component.getInitialProps(ctx);
  return { pageProps };
};

// eslint-disable-next-line import/no-default-export
export default reduxWrapper.withRedux(App);
