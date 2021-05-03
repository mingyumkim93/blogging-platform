import React, { FunctionComponent, useEffect } from "react";
import "styles/globals.scss";
import Page from "types/Page";
import { ProvideFirebase } from "lib/firebase/FirebaseProvider";
import "node_modules/@react-page/editor/lib/index.css";
import "node_modules/@react-page/plugins-image/lib/index.css";
import "styles/RichEditor.css";

interface AppProps {
  Component: Page;
  pageProps: any;
}

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  const Layout = Component.layout ? Component.layout : React.Fragment;

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ProvideFirebase>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideFirebase>
  );
};

export default MyApp;
