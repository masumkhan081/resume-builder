import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authContext } from "../context/Provider";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { Stack, Badge } from "react-bootstrap";
import { db } from "./utils/firb";
import Loader from "./partials/Loader";
import Angry from "./images/angry.jpg";
//
export default function ResumePage() {
  //
  const { user, loading } = useContext(authContext);
  const navigate = useNavigate();
  //
  useEffect(() => {

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
        console.log("pg-resume: No document -> " + user.aacount_email);
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
        <Stack className="container mt-sm-3 mt-1 flex-sm-row flex-col justify-content-between border-2 border-success shadow-sm border-top rounded-pill ">
          <span className=" fw-bold fst-italic text-dark rounded-start-pill">
            Pages:
          </span>

          <Link to="/resume-page-1" className="text-decoration-none">
            <Badge className="ms-1 bg-info bg-opacity-10 text-dark">
              Basic Info & Skills
            </Badge>
          </Link>
          <span className="  text-dark rounded-start-pill">
            <AiOutlineArrowRight size={16} className=" text-danger fw-bold" />
          </span>
          <Link to="/resume-page-2" className="text-decoration-none">
            <Badge className="ms-1 bg-info bg-opacity-10 text-dark">
              Education + Experiences
            </Badge>
          </Link>
          <span className="  text-dark rounded-start-pill">
            <AiOutlineArrowRight size={16} className=" text-danger fw-bold" />
          </span>
          <Link to="/resume-page-3" className="text-decoration-none">
            <Badge className="ms-1 bg-info bg-opacity-10 text-dark">
              Projects
            </Badge>
          </Link>
        </Stack>
        {user.resume_status === false && (
          <span className="mt-3 text-dark text-info badge d-block mt-2  h6">
            No resume been attemted yet <img src={Angry} height={20}></img>
          </span>
        )}
      </div>
    );
  }
  if (loading == true) {
    return <Loader />;
  }
}
