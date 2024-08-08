import { Link } from "react-router-dom";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useSignup } from "../services/useSignup";
import FormInput from "./FormInput";

function Signup() {
  // const [email, setEmail] = useState("h@test.com");
  // const [password, setPassword] = useState("pass1234");

  const { signup } = useSignup();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function onSubmit({ user_name, email, password }) {
    signup({ user_name, email, password });
  }
  return (
    <div className="flex h-screen items-center justify-center gap-4">
      <img
        className="h-[35rem]"
        src="../src/assets/signup.jpg"
        alt="ingredients"
      />
      <div className="h-[35rem] w-96 px-10">
        <h1>Sign up</h1>
        <p>Create your account and get started</p>
        <form
          className="mt-10 flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            id="user_name"
            type="text"
            register={{
              ...register("user_name", {
                required: "this field is required",
              }),
            }}
            error={errors.user_name?.message}
          >
            User name
          </FormInput>
          <FormInput
            id="email"
            type="email"
            register={{
              ...register("email", {
                required: "this field is required",
              }),
            }}
            error={errors.email?.message}
          >
            Email
          </FormInput>
          <FormInput
            id="password"
            type="password"
            register={{
              ...register("password", {
                required: "this field is required",
                minLength: { value: 8, message: "min 8 characters" },
              }),
            }}
            error={errors.password?.message}
          >
            Password
          </FormInput>
          <FormInput
            id="confirmPassword"
            type="password"
            register={{
              ...register("confirmPassword", {
                required: "this field is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              }),
            }}
            error={errors.confirmPassword?.message}
          >
            Confirm password
          </FormInput>

          <Button>Signup</Button>
        </form>
        <p className="mt-4 text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-blue-400 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
