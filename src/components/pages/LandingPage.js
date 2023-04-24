import React from "react";
import { useNavigate } from "react-router-dom";
import { FcReading } from "react-icons/fc";
import { FcList } from "react-icons/fc";

export default function PageLanding() {
  return (
    <div className="row px-5 pt-5">
      {/* --start col-1 */}
      <div className="col-md-4 ">
        <span className="text-success h5 d-block text-center mb-3">
          Go Routes deploy-2
          <FcList size={20} className="mb-1 ms-1" />
        </span>

        <QuickLinks />

        {/* --end of col-1 */}
      </div>
      {/* --start col-2   */}
      <div className="col-md-8 ">
        <span className="text-success h5 d-block text-center mb-3">
          Read Me
          <FcReading size={22} className="mb-1 ms-1" />
        </span>
        <ul className=" rounded d-flex text-start ps-3 flex-column gap-2 list-unstyled ">
          <li className=" ">
            <strong className="bg-light rounded px-1">Features: </strong>
          </li>
          <li className="rounded ">
            Register, Login, Protected routes based on Json Web Token,
            Add-Edit-Delete-Check existence of data, Ensuring other data
            associated or not at deletion, Tabular view
          </li>
          <li className=" ">
            <strong className="bg-light rounded px-1">Implemented: </strong>
          </li>
          <li className="rounded ">
            Register, Login, Protected routes based on Json Web Token,
            Add-Edit-Delete-Check existence of data, Ensuring other data
            associated or not at deletion, Tabular view
          </li>
        </ul>
        {/* --end col-2 */}
      </div>
      {/* --end row */}
    </div>
  );
}
function QuickLinks() {
  const navigate = useNavigate();
  const clsNames =
    "border-0 text-start text-primary rounded bg-success bg-opacity-10";
  return (
    <div className="d-flex flex-column gap-2">
      <button
        onClick={() => {
          navigate("/login");
        }}
        className={clsNames}
      >
        Log in
      </button>
      <button
        onClick={() => {
          navigate("/profile");
        }}
        className={clsNames}
      >
        Profile Page
      </button>
      <button
        onClick={() => {
          navigate("/profile/page1");
        }}
        className={clsNames}
      >
        Page1
      </button>
      <button
        onClick={() => {
          navigate("/profile/page2");
        }}
        className={clsNames}
      >
        Page2
      </button>
      <button
        onClick={() => {
          navigate("/profile/page3");
        }}
        className={clsNames}
      >
        Page3
      </button>
      <button
        onClick={() => {
          navigate("/profile/myresume");
        }}
        className={clsNames}
      >
        View Resume
      </button>
      <button
        onClick={() => {
          navigate("/profile/myresume-pdf");
        }}
        className={clsNames}
      >
        PDF
      </button>
    </div>
  );
}
