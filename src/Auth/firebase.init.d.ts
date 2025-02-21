declare module "../Auth/firebase.init" {
  import { Auth } from "firebase/auth";
  import { GoogleAuthProvider } from "firebase/auth";

  export const auth: Auth;
  export const GoogleAuthProvider: typeof GoogleAuthProvider;
}
