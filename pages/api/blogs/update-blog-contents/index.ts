import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import BlogData from "types/BlogData";
import BlogContent from "types/BlogContent";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { newContents, uid } = req.body;
    const blogRef = firestore.collection("blogs").doc(uid);

    await blogRef.update({ contents: newContents });
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};
