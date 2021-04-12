import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid, blogName, blogUrl } = req.body;
    const blogsRef = firestore.collection("blogs");
    const isExist = !(await blogsRef.where("url", "==", blogUrl).get()).empty;

    if (isExist) {
      res
        .status(403)
        .send({ message: `Blog url: ${blogUrl} is already in use!` });
    } else {
      await blogsRef.doc(uid).set({
        url: blogUrl,
        name: blogName,
        created: new Date().toISOString()
      });
      res.status(200).json(uid);
    }
  } catch (e) {
    res.status(400).end();
  }
};
