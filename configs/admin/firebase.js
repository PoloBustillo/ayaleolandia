/** @format */

import admin from "firebase-admin";
import { Logtail } from "@logtail/node";

const privateKey = process.env.NEXT_FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
const clientEmail = process.env.NEXT_FIREBASE_EMAIL;
const projectId = "ayaleolandia-87c19";
const logtail = new Logtail("46f2YDT9azLZ21YpgxK3uCJJ");

if (!privateKey || !clientEmail || !projectId) {
  logtail.error(
    `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
  );
}

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        client_email: clientEmail,
        private_key: privateKey,
        project_id: projectId,
      }),
      databaseURL: `https://${projectId}.firebaseio.com`,
    });
  } catch (error) {
    logtail.error("Firebase admin initialization error", error.stack);
  }
}
export default admin;
