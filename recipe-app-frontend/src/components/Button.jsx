import { useNavigate } from "react-router-dom";

function Button({ children, type, to, onClick }) {
  const navigate = useNavigate();

  const styles = {
    secondary: "rounded-2xl bg-0 px-3 py-1 text-grey-300 hover:scale-105",
    primary:
      "rounded-2xl bg-orange-400 px-3 py-1 text-white hover:scale-105 hover:bg-orange-500 ",
  };

  return (
    <button
      className={type === "secondary" ? styles.secondary : styles.primary}
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
