import firestore from "lib/firebase/firebase-admin/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import BlogData from "types/BlogData";
import BlogContent from "types/BlogContent";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { newContent, uid } = req.body;
    const blogRef = firestore.collection("blogs").doc(uid);
    const blogData = (await blogRef.get()).data() as BlogData;
    const prevBlogContents = blogData.contents || [];

    //add new
    if (!prevBlogContents.some((content) => content.id === newContent.id)) {
      const newContents = [...prevBlogContents, newContent];
      await blogRef.update({ contents: newContents });
      res.status(200).end();
    }

    //update exist
    else {
      const newContents = prevBlogContents.map((content, contentIndex) => {
        if (content.id !== newContent.id) return content;
        return newContent;
      });
      await blogRef.update({ contents: newContents });
      res.status(200).end();
    }
  } catch (e) {
    res.status(400).end();
  }
};
