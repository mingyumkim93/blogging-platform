import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { newUrl, uid } = req.body;
    const blogsRef = firestore.collection("blogs");
    const isExist = !(await blogsRef.where("url", "==", newUrl).get()).empty;
    if (!isExist) {
      await blogsRef.doc(uid).update({ url: newUrl });
      res.status(200).end();
    } else {
      res.status(403).json({ message: `Url: ${newUrl} is already in use!` });
    }
  } catch (e) {
    res.status(400).end();
  }
};
