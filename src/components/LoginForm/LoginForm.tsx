import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
};
interface LoginResponse {
  token: string;
}
const LoginForm: React.FC = () => {
  const router = useRouter();
  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  const onSubmit = async (
    values: FormValues,
    { setSubmitting }: any
  ) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log("User logged in successfully");
        toast.success("User logged in successfully");
        const data: LoginResponse = await response.json();
        localStorage.setItem('token', data.token);
        router.push("/dashboard"); // Redirect to dashboard after successful login
      } else {
        console.error("Failed to log in:", await response.text());
        toast.error("Invalid email or password");
      }
    } catch (error) {
      console.error("Internal Server error:", error);
      toast.error("Internal Server error");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      <Form className="mt-6">
        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email Address"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none"
            autoFocus
            autoComplete="email"
            required
          />
          <ErrorMessage name="email" component="div" className="text-red-500" />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <Field
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none"
            minLength={6}
            required
          />
          <ErrorMessage name="password" component="div" className="text-red-500" />
        </div>

        {/* <div className="text-right mt-2">
          <a
            href="#"
            className="text-sm font-semibold text-gray-700 hover:text-yellow-700 focus:text-yellow-700"
          >
            Forgot Password?
          </a>
        </div> */}

        <button
          type="submit"
          className="w-full block bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
        >
          Log In
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
