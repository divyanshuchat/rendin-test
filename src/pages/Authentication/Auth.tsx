import { useContext, useState } from "react";
import Button from "../../elements/Button/Button";
import Input from "../../elements/Input/Input";
import { AuthInputProps } from "../../interfaces/AuthInputProps";
import AuthController from "../../controllers/Authentication/AuthController";
import { Context } from "../../store/Store";

const Auth = () => {
  const [formInputs, setFormInputs] = useState<AuthInputProps>({
    email: "",
    password: "",
    name: "",
  });
  const [showNameInput, setShowNameIput] = useState<Boolean>(false);
  const [error, setError] = useState<String>();
  const { dispatch } = useContext(Context);

  const authenticate = async () => {
    setError("");
    if (formInputs.email !== "" && formInputs.password !== "") {
      const auth = await AuthController.firebaseAuth(formInputs);
      if (auth.result === "success" && !auth.showName) {
        dispatch({ type: "userInfo", userInfo: auth.user });
        dispatch({ type: "isLoggedIn", isLoggedIn: true });
      }
      if (auth.result === "success" && auth.showName) {
        setShowNameIput(true);
      }
    } else setError("Please input the required fields");
  };

  const signUp = async () => {
    setError("");
    if (formInputs.email !== "" && formInputs.password !== "" && formInputs.name !== "") {
      const signup: any = await AuthController.signupUser(formInputs);

      if (signup.result === "success") {
        dispatch({ type: "userInfo", userInfo: signup.user });
        dispatch({ type: "isLoggedIn", isLoggedIn: true });
      } else if (signup.result === "error") {
        setError(signup.error);
      }
    } else setError("Please input the required fields");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="h-12 md:h-20 rounded md:rounded-xl w-auto"
            src="https://rendin.ee/_nuxt/img/rendin-icon-square.652607d.jpg"
            alt="rendin"
          />
          <h1 className="mt-6 text-left text-3xl md:text-5xl font-extrabold text-gray-800">
            Start Here<span className="text-rendin">.</span>
          </h1>
          <div className="rounded-md mt-8">
            <Input
              label="Email address"
              type="email"
              className="rounded-t-md"
              placeHolder="Email address"
              required={true}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  email: e.target.value,
                })
              }
            />
            <Input
              label="Password"
              type="password"
              className="rounded-b-md"
              placeHolder="Password"
              required={true}
              onChange={(e) =>
                setFormInputs({
                  ...formInputs,
                  password: e.target.value,
                })
              }
            />
            {showNameInput && (
              <>
                <p className="py-2 text-sm text-gray-700">Welcome! Enter your name to signup</p>
                <Input
                  label="Name"
                  type="text"
                  className="rounded-b-md"
                  placeHolder="Your Name"
                  required={true}
                  onChange={(e) =>
                    setFormInputs({
                      ...formInputs,
                      name: e.target.value,
                    })
                  }
                />
              </>
            )}
            {error && <p className="text-xs text-red-600 py-2">{error}</p>}
            <div className="mt-6">
              <Button label="Continue" onClick={() => (showNameInput ? signUp() : authenticate())} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
