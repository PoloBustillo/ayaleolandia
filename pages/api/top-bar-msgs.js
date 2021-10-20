/** @format */

import db from "configs/admin/firebase.js";

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const entries = await db.collection("topbar").get();
    const entriesData = entries.docs.map((entry) => entry.data());
    res.status(200).json(entriesData);
  } catch (e) {
    res.status(400).end();
  }
};
