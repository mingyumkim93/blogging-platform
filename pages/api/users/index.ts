import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid, email, displayName, photoURL } = req.body;
    const users = await firestore.collection("users").get();
    const usersData = users.docs.map((user) => user.data());

    if (usersData.some((user) => user.email === email)) {
      res.status(400).end();
    } else {
      await firestore.collection("users").doc(uid).set({
        email,
        displayName,
        photoURL,
        created: new Date().toISOString()
      });
      res.status(200).json(uid);
    }
  } catch (e) {
    res.status(400).end();
  }
};
