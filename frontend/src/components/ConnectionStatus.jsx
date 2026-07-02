import "../styles/Components.css";

function ConnectionStatus({ status }) {
  // Pick a CSS class based on current status text
  const getStatusClass = () => {
    if (status === "Connected") return "status connected";
    if (status === "Disconnected") return "status disconnected";
    return "status connecting";
  };

  return <div className={getStatusClass()}>{status}</div>;
}

export default ConnectionStatus;