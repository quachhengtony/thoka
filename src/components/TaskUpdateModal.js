import React from "react";

export default function TaskUpdateModal(props) {
  return (
    <div
      className="modal modal-blur fade"
      id="modal-task-update"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        role="document"
      >
        <div className="modal-content">
          {/* <div className="modal-header">
          <h5 className="modal-title">Scrollable modal</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div> */}
          <div className="modal-body">{props.taskColumns.map((taskColumn, index) => (
              <p>{taskColumn.name}</p>
          ))}</div>
          {/* <div className="modal-footer">
          <button
            type="button"
            className="btn me-auto"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Save changes
          </button>
        </div> */}
        </div>
      </div>
    </div>
  );
}
