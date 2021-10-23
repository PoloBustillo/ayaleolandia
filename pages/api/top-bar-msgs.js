/** @format */

import firebaseAdmin from "configs/admin/firebase.js";

const storageBucket = firebaseAdmin
  .storage()
  .bucket("gs://ayaleolandia-87c19.appspot.com");

export default async (req, res) => {
  try {
    const entries = await firebaseAdmin.firestore().collection("topbar").get();
    const entriesData = await Promise.all(
      entries.docs.map(async (entry) => {
        let data = await entry.data();
        let imageUrl = null;

        if (data.icon_image || data.icon_image != null) {
          imageUrl = await storageBucket.file(data.icon_image).getSignedUrl({
            action: "read",
            expires: "03-17-2025", // this is an arbitrary date
          });
          console.log(imageUrl);
        }

        return {
          text: data.main_msg,
          subText: data.sub_msg,
          icon: imageUrl,
          url: data.url,
        };
      })
    );

    res.status(200).json(entriesData);
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
