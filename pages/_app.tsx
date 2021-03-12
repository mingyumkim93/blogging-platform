import React, { FunctionComponent } from "react";
import "styles/globals.scss";
import Page from "types/Page";
import { ProvideAuth } from "auth/use-auth";

interface AppProps {
  Component: Page;
  pageProps: any;
}

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const Layout = Component.layout ? Component.layout : React.Fragment;

  return (
    <ProvideAuth>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideAuth>
  );
};

export default MyApp;
