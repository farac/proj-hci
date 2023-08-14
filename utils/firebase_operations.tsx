import { database } from "@/firebaseConfig";
import { ref, onValue, child, get, getDatabase } from "@firebase/database";

const dbRef = ref(database);

export default function bla() {
  get(child(dbRef, "sessions/" + 0 + "/entries"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

const sessionId = 0;

const entriesRef = ref(database, "sessions/" + sessionId + "/entries");
// onValue(entriesRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });
