import { useHistory } from "react-router-dom";

export default function ListWorkspace(props) {
  const history = useHistory();

  return (
    <div className="list-group-item" key={props.index}>
      <div className="row g-2 align-items-center">
        <div className="col-auto text-h3">{props.number + 1}</div>
        <div className="col-auto">
          <img
            src="https://i.pinimg.com/originals/6c/16/ce/6c16ce434979881b61a953aa7ae46043.png"
            className="rounded"
            alt="Workspace avatar"
            width={40}
            height={40}
          />
        </div>
        <div className="col">
          <a href="javascript:void(0)" onClick={() => history.push(`/workspace/${props.id}/tasks`)}>
            {props.name}
          </a>
          <div className="text-muted">
            {new Date(props.timestamp?.toDate()).toUTCString()}
          </div>
        </div>
        <div className="col-auto lh-1">
          <div className="dropdown">
            <a href="#" className="link-secondary" data-bs-toggle="dropdown">
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
                <circle cx={5} cy={12} r={1} />
                <circle cx={12} cy={12} r={1} />
                <circle cx={19} cy={12} r={1} />
              </svg>
            </a>
            <div className="dropdown-menu dropdown-menu-end">
              <a className="dropdown-item" href="#">
                Analytics
              </a>
              <a className="dropdown-item" href="#">
                Settings
              </a>
              <a className="dropdown-item" href="#">
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
