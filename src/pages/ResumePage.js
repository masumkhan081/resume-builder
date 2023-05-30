import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../context/Provider";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { Stack } from "react-bootstrap";
import { db } from "./utils/firb";
import Loader from "./partials/Loader";
//
export default function ResumePage() {
  //
  const { user, loading } = useContext(authContext);
  const navigate = useNavigate();
  //
  React.useEffect(() => {
    console.log("  in effect" + user.account_email);
    getResumeDetails();

    return () => {
      console.log("pg-resume unmounted");
    };
  }, []);

  async function getResumeDetails() {
    try {
      let emal = user.account_email;
      const resumeRef = doc(db, "resumes", emal);
      const resumeSnap = await getDoc(resumeRef);
      if (resumeSnap.exists()) {
        let obtained = {
          aacount_email: resumeSnap.data().aacount_email,
          educations: resumeSnap.data().educations,
          experiences: resumeSnap.data().experiences,
        };
        console.log(JSON.stringify(obtained));
      } else {
        console.log("pg-resume: No document -> " + user.signInEmail);
      }
    } catch (e) {
      console.error("pg-resume: Error finding: ", e);
    }
  }

  if (user.account_email === "" && loading == false) {
    navigate("/login");
  }
  if (user.account_email.length && loading == false) {
    return (
      <div>
        <Stack direction="horizontal">
          <Link to="/resume-page-1">Page1</Link>
        </Stack>
        <span className="text-center d-block mt-5  h4">Resume Details ..</span>
        {user.account_email && <span>{user.account_email}</span>}
      </div>
    );
  }
  if (loading == true) {
    return <Loader />;
  }
}
