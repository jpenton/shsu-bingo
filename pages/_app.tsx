import React from 'react';
import App from 'next/app';
import Header from '../components/Header';
import '../styles/index.css';
import Container from '../components/Container';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Header />
        <Container className="mt-4 mb-24">
          <Component {...pageProps} />
        </Container>
      </>
    );
  }
}

export default MyApp;
