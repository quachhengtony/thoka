import { useHistory } from "react-router-dom";

export default function ListWorkspace(props) {
  const history = useHistory();

  return (
    <tr key={props.index}>
      <td>{props.number + 1}</td>
      <td onClick={() => history.push(`/workspace/${props.id}/overview`)}>
        <a href="javascript:void(0)" className="text-reset">
          {props.name ? props.name : "..."}
        </a>
      </td>
      <td className="text-muted">
        {new Date(props.timestamp?.toDate()).toUTCString()}
      </td>
      <td className="text-muted">
        {props.authorBusiness ? props.authorBusiness : "..."}
      </td>
      <td>
        <span className="dropdown">
          <button
            className="btn dropdown-toggle align-text-top btn-sm"
            data-bs-boundary="viewport"
            data-bs-toggle="dropdown"
          >
            Actions
          </button>
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
        </span>
      </td>
    </tr>
  );
}
