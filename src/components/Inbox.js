import "../styles/Inbox.css";

export default function Inbox(props) {
  return (
    <div
      className="inbox"
      id="inboxPanel"
      style={{ width: props.inboxPanelWidth }}
    >
      <div className="content">
        <div className="container-xl">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col">
                <h2 className="page-title">Hộp thư</h2>
                <div className="text-muted mt-1">
                  Tin nhắn riêng & cập nhật tài liệu tự động
                  {/* Assigned tasks and details */}
                </div>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="d-flex">
                  <div className="me-3 d-none d-md-block">
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
                      {/* <span className="badge bg-red" /> */}
                    </a>
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
                      <div className="card">
                        <div className="card-body">notifications</div>
                      </div>
                    </div>
                    {/* <div className="input-icon">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search tasks.."
                      />
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
                    </div> */}
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
