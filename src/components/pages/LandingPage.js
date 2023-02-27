import React from "react";

export default function PageLanding() {
  return (
    <div className="row px-4 pt-5">
      {/* --start col-1 */}
      <div className="col-md-4 d-flex flex-column gap-2">
        <span href="" className="text-success h5">
          Go Routes
        </span>
        <a
          href="https://verdant-entremet-0f77ac.netlify.app/login"
          className="text-decoration-none "
        >
          Login Page
        </a>
        <a href="/profile" className="text-decoration-none ">
          Profile Page
        </a>
        <a href="/profile/page1" className="text-decoration-none  ">
          Page 1
        </a>
        <a href="/profile/page2" className="text-decoration-none  ">
          Page 2
        </a>
        <a href="/profile/page3" className="text-decoration-none ">
          Page 3
        </a>
        <a href="/profile/myresume" className="text-decoration-none  ">
          View resume
        </a>
        <a href="/profile/myresume-pdf " className="text-decoration-none  ">
          PDF
        </a>

        {/* --end of col-1 */}
      </div>
      {/* --start col-2   */}
      <div className="col-md-7 border-1 border-start border-success rounded-3">
        <ul className=" rounded d-flex text-start ps-4 flex-column align-content-between list-unstyled ">
          <li className="rounded text-center text-success pb-1 ">
            <i className="fas fa-hand-point-right h5 "></i>
            <strong className="h5 "> Read Me</strong>
          </li>
          <li className="rounded ">
            <strong>Features: </strong>
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
