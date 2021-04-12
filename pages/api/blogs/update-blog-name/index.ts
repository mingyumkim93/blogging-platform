import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { newName, uid } = req.body;
    await firestore.collection("blogs").doc(uid).update({ name: newName });
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
};
