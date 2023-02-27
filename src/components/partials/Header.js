import React, { useContext } from "react";
import { authContext } from "../../context/Provider";
import { Badge, Button, Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { FaHome, FaClipboardList, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { TbLayoutList } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { IconContext } from "react-icons";
//

export default function Header() {
  const { logout, user } = useContext(authContext);
  const navigate = useNavigate();

  return (
    <IconContext.Provider value={{ className: "shared-class", size: 20 }}>
      <div className="d-flex container-fluid  bg-dark bg-opacity-10 bg-gradient flex-column pt-1 shadow">
        <Nav className="h6">
          <Nav.Link href="/" className="px-sm-3 text-success fw-bolder">
            <GoHome size={23} className="text-dark mb-1 me-1 " />
            Online-Resume-Builder
          </Nav.Link>

          {user.loggedIn == true ? (
            <div className="ms-auto d-flex">
              <Dropdown className="  border-0 btn-sm text-sm rounded-pill">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className=" border-0 btn-sm text-sm bg-success bg-opacity-75 px-3 rounded-pill"
                >
                  <span className="fw-bold mx-1">Profile</span>
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="bg-light py-5 shadow"
                  style={{ backgroundColor: "rgb(198, 228, 208)" }}
                >
                  <Dropdown.Item href="/profile">
                    <Button className="btn w-100 my-2 btn-success ">
                      {user.profileName}
                    </Button>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button
                      onClick={logout}
                      className="my-2 btn btn-danger w-100"
                    >
                      Log Out
                    </Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              style={{ height: "25px" }}
              className="my-auto px-4 ms-auto bg-light bg-opacity-25 bg-gradient rounded-pill border-0 border-end  border-light text-dark shadow-sm fw-normal"
            >
              Log in
            </button>
          )}
        </Nav>
        <div className="d-flex flex-wrap justify-content-start gap-1 ">
          <Badge className="py-0 badge bg-dark bg-gradient rounded-3 text-warning fw-bold">
            Tools:
            <TbLayoutList size={12} className="ms-1 text-light" />
          </Badge>
          <Badge className="py-0 badge  bg-success bg-opacity-25 rounded-pill text-dark">
            Firebase auth & FireStore cloud
          </Badge>
          <Badge className="py-0 badge bg-success bg-opacity-25  rounded-pill   text-dark">
            React Router
          </Badge>
          <Badge className="py-0 my-0 badge bg-success bg-opacity-25  rounded-pill   text-dark">
            React-pdf
          </Badge>
          <Badge className="py-0 badge bg-success bg-opacity-25 rounded-pill   text-dark">
            React-bootstrap
          </Badge>
          <Badge className="py-0 badge bg-success bg-opacity-25 rounded-pill   text-dark">
            React-icons
          </Badge>
          <Badge className="py-0 badge bg-success bg-opacity-25  rounded-pill   text-dark">
            Context, Hooks, Component composition
          </Badge>
        </div>
      </div>
    </IconContext.Provider>
  );
}
