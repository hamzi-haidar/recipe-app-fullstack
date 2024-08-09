import { useNavigate } from "react-router-dom";

function Button({ children, type, to, onClick, active }) {
  const navigate = useNavigate();

  const styles = {
    secondary: `bg-0 rounded-none text-black sm:text-lg font-medium  ${active === children && "border-b-[3.5px] border-orange-400"}`,
    primary: "  bg-orange-400  hover:bg-orange-500",
    danger: "bg-orange-600  hover:bg-orange-700",
  };

  return (
    <button
      className={`whitespace-nowrap rounded-3xl px-3 py-2 text-sm text-white hover:scale-105 sm:text-base ${styles[type] || styles.primary}`}
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
