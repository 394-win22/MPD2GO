// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsLijH-2wBUfU_NwzNNLTBadqqNIHxtFQ",
  authDomain: "mpd2go.firebaseapp.com",
  databaseURL: "https://mpd2go-default-rtdb.firebaseio.com",
  projectId: "mpd2go",
  storageBucket: "mpd2go.appspot.com",
  messagingSenderId: "792215885159",
  appId: "1:792215885159:web:2f30dc65fba26c7644cbc2"
};


export const useUserState = () => {
    const [user, setUser] = useState();
  
    useEffect(() => {
      onIdTokenChanged(getAuth(firebase), setUser);
    }, []);
  
    return [user];
};

/* authentication functions */
export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
  
    signInWithRedirect(getAuth(firebase), provider);
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

