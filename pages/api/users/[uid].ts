import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "types/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user: User = req.body;
    const userRef = firestore.collection("users").doc(user.uid);

    if (req.method === "PUT") {
      await userRef.update(user);
      res.status(200).json(user.uid);
    }
  } catch (e) {
    res.status(400).end();
  }
};
