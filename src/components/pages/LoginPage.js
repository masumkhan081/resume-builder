import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/Provider";
import AuthOptions from "../auth/AuthOptions";
import Emailpass from "../auth/Emailpass";
import Loader from "../partials/Loader";
//
export default function PageLogin() {
  const { user, loading, error } = useContext(authContext);
  // const [msg, setMsg] = React.useState("<-->");
  const navigate = useNavigate();
  //
  if (loading == true) {
    return <Loader />;
  }
  if (user.loggedIn == false && loading == false) {
    return (
      <>
        <div className=" text-center mt-3 ">
          {error ? (
            <span className="fw-light bg-danger bg-opacity-25 px-2 rounded ">
              {error}
            </span>
          ) : (
            <br />
          )}
        </div>
        <div className="mt-2 row d-flex gap-5 justify-content-around">
          <Emailpass />
          {/* <div className=" col-md-1 col-sm-2 mt-5 text-wrap">{error}</div> */}
          <AuthOptions />
        </div>
      </>
    );
  }
  if (user.loggedIn == true && loading == false) {
    navigate("/profile");
  }
}
