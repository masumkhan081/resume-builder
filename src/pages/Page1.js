import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "./utils/firb";
import { updateDoc, doc, setDoc, getDoc } from "firebase/firestore";
import ImageTitle from "./partials/ImageTitle";
import BasicInfo from "./partials/BasicInfo";
import TechSkills from "./partials/TechSkills";
import { NextPrevious } from "./partials/Common";
import { authContext } from "../context/Provider";
import Loader from "./partials/Loader";
//

//
export default function Page1() {
  const { user, setTheUser, loading } = React.useContext(authContext);
  const navigate = useNavigate();
  const [page1Error, setPage1Error] = React.useState("");

  //
  React.useEffect(() => {
    getPage1();

    console.log("pg-1 mounted ");
    return () => {
      console.log("pag1 unmounted");
    };
  }, []);

  async function getPage1() {
    try {
      let emal = user.account_email;

      // all this can be conditional to user.resume_status == true or false
      const resumeRef = doc(db, "resumes", emal);
      const resumeSnap = await getDoc(resumeRef);
      if (resumeSnap.exists()) {
        console.log("Document data:", resumeSnap.data());
        let obtained = {
          resume_email: resumeSnap.data().email,
          resume_name: resumeSnap.data().resume_name,
          address: resumeSnap.data().address,
          github: resumeSnap.data().github,
          linkedin: resumeSnap.data().linkedin,
          portfolio: resumeSnap.data().portfolio,
          resume_pic: resumeSnap.data().resume_pic,
          phone_number: resumeSnap.data().phone_number,
          title: resumeSnap.data().title,
          front_end_skills: resumeSnap.data().front_end_skills,
          back_end_skills: resumeSnap.data().back_end_skills,
          data_tier_skills: resumeSnap.data().data_tier_skills,
          personal_kills: resumeSnap.data().personal_skills,
        };
        console.log("obtained-pg-1:     .. " + JSON.stringify(obtained));
        // updateState(obtained);  ------------------------------------------------------------
      } else {
        console.log("pg-1: No document data-> " + user.account_email);
      }
      console.log("reached  getPage1-> end  ..");
      //       setBusy(false);
    } catch (e) {
      //       setBusy(false);
      console.error("pg-1: Error finding: ", e);
    }
  }

  async function saveAndNext() {
    //     setBusy(true);
    console.log("save and next");
    if (user.resume_name == "") {
      showError("Resume without name ? ");
    } else if (user.title == "") {
      showError("Resume without title ?");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email)
    ) {
      showError("Invalid Email");
    } else if (user.phone_number.length < 11) {
      showError("Phone number must be 11 digit");
    } else if (user.address.length < 10) {
      showError("Plz provide a real address");
    } else if (user.github == "" && user.portfolio == "") {
      showError("Github & portfolio both can't be empty");
    } else {
      let data = {
        resume_email: user.email,
        resume_name: user.resume_name,
        address: user.address,
        github: user.github,
        linkedin: user.linkedin,
        portfolio: user.portfolio,
        resume_pic: user.resume_pic,
        phone_number: user.phone_number,
        title: user.title,
        front_end_skills: user.front_end_skills,
        back_end_skills: user.back_end_skills,
        data_tier_skills: user.data_tier_skills,
        personal_skills: user.personal_skills,
      };
      if (user.resume_status == false) {
        await setDoc(doc(db, "resumes", user.account_email), data);
        const profileRef = doc(db, "profiles", user.account_email);
        await updateDoc(profileRef, {
          resume_status: true,
        });
        setTheUser({ resume_status: true });
      } else {
        const resumeRef = doc(db, "resumes", user.account_email);
        await updateDoc(resumeRef, data);
      }
      navigate("/resume/page2");
    }
    //     setBusy(false);
  }

  function showError(msg) {
    console.log("show error not functioning");
    //     setPage1Error(msg);
    //     setTimeout(() => {
    //       setPage1Error("");
    //     }, 3000);
  }

  function updateState(nextState) {
    console.log("inside  -> updateState " + JSON.stringify(nextState));
  }
  function setTestData(action) {
    console.log("inside setTest data:  " + action);
    //     action == "reset"
    //       ? setState({
    //           resume_email: "",
    //           resume_name: user.profileName,
    //           dob: "",
    //           address: "",
    //           github: "github.com/",
    //           linkedin: "linkedin.com/in/",
    //           portfolio: "",
    //           resume_pic: "", //user.photoURL,
    //           phone_number: "",
    //           title: "",
    //           front_end_skills: [],
    //           back_end_skills: [],
    //           data_tier_skills: [],
    //           personal_skills: [],
    //         })
    //       : setState({
    //           title: "full stack-developer",
    //           resume_email: "masumkhan081@gmail.com",
    //           resume_name: "Masum Khan",
    //           dob: "",
    //           address: "Rd-6, Khadim",
    //           github: "github.com/masumkhan081",
    //           linkedin: "linkedin.in/masumkhan081",
    //           portfolio: "github.com/masumkhan081",
    //           resume_pic:
    //             "https://media.licdn.com/dms/image/C5603AQGVhTn0cvkcRw/profile-displayphoto-shrink_800_800/0/1661930138028?e=2147483647&v=beta&t=eOwHOZQG1XdsGw2u5S0BP_xb438QudkAgTj33ttcShQ",
    //           phone_number: "01833-347848",
    //           front_end_skills: [
    //             "react",
    //             "bootstrap",
    //             "react-bootstrap",
    //             "material-ui",
    //             "react-icons",
    //             "recharts",
    //             "tailwindCSS",
    //           ],
    //           back_end_skills: ["Express"],
    //           data_tier_skills: ["MongoDB"],
    //           personal_skills: ["Problem Solving"],
    //         });
  }

  const clsNames =
    "mt-4 row mx-auto d-flex justify-content-center border-0 border-bottom";
  // if (loading === true) {
  //   return <Loader />;
  // }
  // user.account_email &&
  if (loading === false) {
    return (
      <div className={clsNames}>
        <NextPrevious
          // busy={busy}
          error={page1Error}
          next={"/resume-page-2"}
          nextText={"Save & Next"}
          saveAndNext={saveAndNext}
          setTestData={setTestData}
        />
        <ImageTitle />
        <BasicInfo />
        <TechSkills />
      </div>
    );
  }
  // if (user.account_email === "" && loading == false) {
  //   //return <Navigate to="/login" replace={true} />;
  //   navigate("/login");
  // }
}
