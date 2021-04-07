import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import AppBarLayout from "components/layouts/AppBarLayout";
import firebase from "lib/firebase/firebase";
import Page from "types/Page";
import { useState } from "react";
import { useFirebase } from "lib/firebase/FirebaseProvider";
import { useRouter } from "next/router";

const Blog: Page = () => {
  return <div>asd</div>;
};

export default Blog;
