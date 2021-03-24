import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import User from "types/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid, email, displayName, photoURL, provider }: User = req.body;
    const usersRef = firestore.collection("users");
    const users = await usersRef.get();
    const usersData = users.docs.map((user) => user.data());

    if (usersData.some((user) => user.email === email)) {
      res.status(200).json(uid);
    } else {
      await usersRef.doc(uid).set({
        email,
        displayName,
        photoURL,
        provider,
        created: new Date().toISOString()
      });
      res.status(200).json(uid);
    }
  } catch (e) {
    res.status(400).end();
  }
};
