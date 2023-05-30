import React, { createContext, useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../pages/utils/firb";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";
//
export const authContext = createContext();
//
export default function Provider({ children }) {
  //
  const [user, setUser] = useState({
    account_pic: "",
    account_email: "",
    account_name: "",
    resume_name: "",
    resume_status: false,
    resume_email: "",
    dob: "",
    address: "",
    github: "github.com/",
    linkedin: "linkedin.com/in/",
    portfolio: "",
    resume_pic: "",
    phone_number: "",
    title: "",
    front_end_skills: [],
    back_end_skills: [],
    data_tier_skills: [],
    personal_skills: [],
    hobbies: [],
    interests: [],
    projects: [],
    educations: [],
    experiences: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //
  useEffect(() => {
    //
    onAuthStateChanged(auth, (theUser) => {
      if (theUser) {
        //console.log(JSON.stringify(theUser));
        setUser({
          ...user,
          ...{
            account_email: theUser.email,
            pic: theUser.photoURL,
            account_name: theUser.displayName,
          },
        });
        let emal = theUser.email;
        //
        try {
          const userRef = collection(db, "profiles");
          const q = query(userRef, where("signInEmail", "==", emal));
          readData(q, theUser);
        } catch (e) {
          console.error("Error finding: ", e);
        }
      } else {
        console.log("  onAuthStateChanged ....no  <> existing user :  ");
      }
    });
  }, []);

  async function readData(q, theUser) {
    //
    let USER_EXISTS_IN_DB = false;
    try {
      const querySnapshot = await getDocs(q);
      //
      querySnapshot.forEach((doc) => {
        USER_EXISTS_IN_DB = true;

        let obtained = {
          resume_status: doc.data().resumeStatus,
        };
        console.log("USER exist in db ");
        setLoading(false);
        setUser({ ...user, ...obtained });
      });
      if (USER_EXISTS_IN_DB == false) {
        //  create new user
        let extracted = {
          resume_status: false,
          account_email: theUser.email,
          account_name: theUser.displayName,
          account_pic: theUser.photoURL,
        };

        const docRef = await setDoc(
          doc(db, "profiles", theUser.email),
          extracted
        );
        console.log("USER created newly");
        setLoading(false);
        setUser({ ...user, ...extracted });
      }
    } catch (e) {
      console.error("Error finding: ", e);
    }
  }

  function setTheUser(nextState) {
    setUser({ ...user, ...nextState });
  }

  function setTheError(usedProvider) {
    let errMsg =
      "The email been used for a " +
      JSON.stringify(usedProvider) +
      " sign-up-account. Click corresponding button";
    errMsg = errMsg.replace(/"|"|.com/gi, "");
    setError(errMsg);
    // setTimeout(() => {
    //   setToast("");
    // }, 2000);
  }

  function logout() {
    signOut(auth)
      .then(() => {
        setUser({ ...user, ...{ account_email: "" } });
      })
      .catch((error) => {
        setError("error in loggingout");
      });
  }

  return (
    <authContext.Provider
      value={{
        logout,
        user,
        setTheUser,
        loading,
        setLoading,
        error,
        setTheError,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
