import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "types/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid, blogName }: User = req.body;
    const blogsRef = firestore.collection("blogs");
    const isExist = !(await blogsRef.where("name", "==", blogName).get()).empty;

    if (isExist) {
      res
        .status(403)
        .send({ message: `Blog name: ${blogName} is already in use!` });
    } else {
      await blogsRef
        .doc(uid)
        .set({ name: blogName, created: new Date().toISOString() });
      res.status(200).json(uid);
    }
  } catch (e) {
    res.status(400).end();
  }
};
