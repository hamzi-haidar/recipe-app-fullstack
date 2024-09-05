function Loader({ type }) {
  return (
    <div
      className={`loading-spinner ${type === "mini" ? "h-4 w-16 scale-50" : "h-20"}`}
    >
      <div className="loading-spinner-inner">
        <div
          className={`loading-spinner-circle ${type === "mini" ? "bg-white" : "bg-orange-500"}`}
        ></div>
        <div
          className={`loading-spinner-circle ${type === "mini" ? "bg-white" : "bg-orange-500"}`}
        ></div>
        <div
          className={`loading-spinner-circle ${type === "mini" ? "bg-white" : "bg-orange-500"}`}
        ></div>
        <div
          className={`loading-spinner-circle ${type === "mini" ? "bg-white" : "bg-orange-500"}`}
        ></div>
      </div>
    </div>
  );
}

export default Loader;
