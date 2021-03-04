import { useHistory } from "react-router-dom";
import { useStateValue } from "../contexts/StateProvider";
import db from "../adapters/firebase";
import "../styles/Topbar.css";
import { useState, useEffect } from "react";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";
import logo from "../assets/thoka_logo.svg";

function Topbar() {
  const history = useHistory();

  return (
    <div className="topbar --public">
      <header className="navbar navbar-expand-md navbar-light d-print-none --topbar-navbar">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"> */}
          <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href="javascript:void(0)">
              <img
                src={logo}
                // width={32}
                height={32}
                alt="Thoka"
                className="navbar-brand-image"
              />
            </a>
          </div>
          {/* </h1> */}
          <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-title">Sản phẩm</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-title">Tìm hiểu</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-title">Bảng giá</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-title">Liên hệ</span>
                  </a>
                </li>
              </ul>
            </div>
            <div class="navbar-nav flex-row order-md-last">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    onClick={() => history.push("/signin")}
                  >
                    <span className="nav-link-title">Đăng nhập</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    onClick={() => history.push("/signup")}
                  >
                    <span className="nav-link-title">Đăng ký</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

function PrivateTopbar() {
  const history = useHistory();
  const { currentUser, signOut } = useStateValue();
  const [error, setError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { currentUserName, currentUserRole } = useCurrentUserDetails();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      history.push("/signin");
      window.location.reload();
    } catch {
      setError("Failed to sign out!");
    }
    setIsSigningOut(false);
  };

  useEffect(() => {
    let myNavItems = document.querySelectorAll(".nav-item");
    myNavItems.forEach((navItem) => {
      navItem.addEventListener("click", () => {
        myNavItems.forEach((navItem) => navItem.classList.remove("active"));
        navItem.classList.add("active");
      });
    });
  }, []);

  return (
    <div className="topbar">
      <header className="navbar navbar-expand-md navbar-light d-print-none">
        <div className="container-xl">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3"> */}
          <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href=".">
              <img
                src={logo}
                // width={110}
                height={32}
                alt="Thoka"
                className="navbar-brand-image"
              />
            </a>
          </div>
          {/* </h1> */}
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item dropdown d-none d-md-flex me-3">
              <a
                href="#"
                className="nav-link px-0"
                data-bs-toggle="dropdown"
                tabIndex={-1}
                aria-label="Show notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                  <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                </svg>
                <span className="badge bg-red" />
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
                <div className="card">
                  <div className="card-body">notifications</div>
                </div>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link d-flex lh-1 text-reset p-0"
                data-bs-toggle="dropdown"
                aria-label="Open user menu"
              >
                <span
                  className="avatar avatar-sm"
                  style={{
                    backgroundImage:
                      'url("https://www.pngrepo.com/download/26474/avatar.png")',
                  }}
                />
                <div className="d-none d-xl-block ps-2">
                  <div>{currentUserName ? currentUserName : "..."}</div>
                  <div className="mt-1 small text-muted">
                    {currentUserRole ? currentUserRole : "..."}
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <a className="dropdown-item">Cập nhật trạng thái</a>
                <a
                  className="dropdown-item"
                  onClick={() => history.push("/profile-account")}
                >
                  Tài khoản
                </a>
                <a className="dropdown-item">Hóa đơn</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item">Cài đặt</a>
                <a onClick={handleSignOut} className="dropdown-item">
                  Đăng xuất
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="navbar-expand-md">
        <div className="collapse navbar-collapse" id="navbar-menu">
          <div className="navbar navbar-light">
            <div className="container-xl">
              <ul className="navbar-nav">
                <li className="nav-item" onClick={() => history.push("/home")}>
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-dashboard"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1="3" y1="21" x2="21" y2="21" />
                        <line x1="9" y1="8" x2="10" y2="8" />
                        <line x1="9" y1="12" x2="10" y2="12" />
                        <line x1="9" y1="16" x2="10" y2="16" />
                        <line x1="14" y1="8" x2="15" y2="8" />
                        <line x1="14" y1="12" x2="15" y2="12" />
                        <line x1="14" y1="16" x2="15" y2="16" />
                        <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Trang chủ</span>
                  </a>
                </li>
                <li className="nav-item" onClick={() => history.push("/channels")}>
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-dashboard"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                      </svg>
                    </span>
                  <span className="nav-link-title">Kênh xã hội</span>
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={() => history.push("/announcements")}
                >
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-dashboard"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M18 8a3 3 0 0 1 0 6" />
                        <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
                        <path d="M12 8h0l4.524 -3.77a0.9 .9 0 0 1 1.476 .692v12.156a0.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Thông báo</span>
                  </a>
                </li>
                <li
                  className="nav-item"
                  onClick={() => history.push("/workspaces")}
                >
                  <a className="nav-link" href="javascript:void(0)">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-dashboard"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="10" y="5" width="10" height="14" rx="2" />
                        <line x1="7" y1="7" x2="7" y2="17" />
                        <line x1="4" y1="8" x2="4" y2="16" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Không gian làm việc</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    onClick={() => history.push("/activities")}
                  >
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-activity"
                        width="44"
                        height="44"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 12h4l3 8l4 -16l3 8h4" />
                      </svg>
                    </span>
                    <span className="nav-link-title">Hoạt động</span>
                  </a>
                </li>
              </ul>
              <div className="my-2 my-md-0 flex-grow-1 flex-md-grow-0 order-first order-md-last">
                {/* <form action="." method="get">
                  <div className="input-icon">
                    <span className="input-icon-addon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx={10} cy={10} r={7} />
                        <line x1={21} y1={21} x2={15} y2={15} />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search…"
                      aria-label="Search in website"
                    />
                  </div>
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Topbar, PrivateTopbar };
