import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const uid: string = req.query.uid as string;
    const blog = (await firestore.collection("blogs").doc(uid).get()).data();

    if (req.method === "GET") {
      res.status(200).json(blog);
    }
  } catch (e) {
    res.status(400).end();
  }
};
