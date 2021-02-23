import React from "react";

export default function MaintenancePage() {
  return (
    <div className="maintenance-page">
      <div className="antialiased d-flex flex-column">
        <div className="flex-fill d-flex align-items-center justify-content-center">
          <div className="container-tight py-6">
            <div className="empty">
              <div className="empty-img">
                <img
                  src="https://www.aaravinfotech.com/assets/images/pages/website-maintenance-package-15d8b17c07f6d7.svg"
                  height={128}
                  alt=""
                />
              </div>
              <p className="empty-title">Temporarily down for maintenance</p>
              <p className="empty-subtitle text-muted">
                Sorry for the inconvenience but we’re performing some
                maintenance at the moment. We’ll be back online shortly!
              </p>
              <div className="empty-action">
                <button className="btn btn-primary">
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
                    <line x1={5} y1={12} x2={19} y2={12} />
                    <line x1={5} y1={12} x2={11} y2={18} />
                    <line x1={5} y1={12} x2={11} y2={6} />
                  </svg>
                  Take me home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
