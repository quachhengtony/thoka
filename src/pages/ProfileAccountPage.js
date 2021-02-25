import React from "react";
import { useCurrentUserDetails } from "../contexts/CurrentUserDetailsContext";
import "../styles/ProfileAccountPage.css";

export default function ProfileAccountPage() {
  const { currentUserName, currentUserRole, currentUserBusinessName, currentUserCreatedAt } = useCurrentUserDetails();

  const handleUpdateProfileAccount = () => {
    // Open a modal
  }

  return (
    <div className="profile-account">
      <div className="content">
        <div className="container-xl">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">Tài khoản</h2>
                <div className="text-muted mt-1">
                  Thông tin cơ bản & chi tiết tài khoản
                </div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                  <button className="btn btn-primary" onClick={handleUpdateProfileAccount}>
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
                      <path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z" />
                      <path d="M16 5l3 3" />
                      <path d="M9 7.07a7.002 7.002 0 0 0 1 13.93a7.002 7.002 0 0 0 6.929 -5.999" />
                    </svg>
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="profile-account-card">
              <div className="card">
                <div className="card-body p-4 text-center">
                  <span
                    className="avatar avatar-xl mb-3 avatar-rounded"
                    style={{
                      backgroundImage: "url('https://www.pngrepo.com/download/26474/avatar.png')",
                    }}
                  />
                  <h3 className="m-0 mb-1">
                    <a>{currentUserName}</a>
                  </h3>
                  <div className="text-muted">{currentUserRole}</div>
                  <div className="text-muted">{currentUserBusinessName}</div>
                  <div className="mt-3">
                    <span className="badge bg-purple-lt">Thành viên</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
