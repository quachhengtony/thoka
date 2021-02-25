export default function Spinner() {
  return (
    <div className="spinner" style={{display: "flex", height: "100vh", alignItems: "center", justifyContent: "center"}}>
      <div
        className="spinner-grow text-blue"
        role="status"
      ></div>
    </div>
  );
}
