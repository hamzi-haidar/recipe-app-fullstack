import { useNavigate, useSearchParams } from "react-router-dom";

function Button({ children, type, to, onClick, disabled }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const active =
    searchParams.get("filter")[0].toUpperCase() +
    searchParams.get("filter").slice(1).replace("-", " ");

  const styles = {
    secondary: `bg-0 rounded-none sm:text-lg font-medium  ${active === children && "border-b-[3.5px] border-orange-400"}`,
    primary: "  bg-orange-400 text-white  hover:bg-orange-500",
    danger: "bg-orange-600 text-white hover:bg-orange-700",
  };

  return (
    <button
      className={`whitespace-nowrap rounded-3xl px-3 py-2 text-sm text-black hover:scale-105 disabled:cursor-not-allowed sm:text-base ${styles[type] || styles.primary}`}
      disabled={disabled}
      onClick={
        to
          ? () => {
              navigate(to);
            }
          : onClick
      }
    >
      {children}
    </button>
  );
}

export default Button;
