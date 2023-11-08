const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

let customerRef = db.collection("users");

// customerRef.get().then((snapshot) => {
//   snapshot.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data());
//   });
// });

module.exports = db;
