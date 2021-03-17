import React, { FunctionComponent } from "react";
import "styles/globals.scss";
import Page from "types/Page";
import { ProvideFirebase } from "lib/firebase/FirebaseProvider";

interface AppProps {
  Component: Page;
  pageProps: any;
}

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const Layout = Component.layout ? Component.layout : React.Fragment;

  return (
    <ProvideFirebase>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideFirebase>
  );
};

export default MyApp;
