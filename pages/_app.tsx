import React, { FunctionComponent } from "react";
import "styles/globals.css";
import Page from "types/Page";

interface AppProps {
  Component: Page;
  pageProps: any;
}

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const Layout = Component.layout ? Component.layout : React.Fragment;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
