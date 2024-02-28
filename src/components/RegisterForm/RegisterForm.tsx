import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";

export interface FormValues {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  status: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  status: "block", // Assuming 'block' is the default status
};

const RegisterForm: React.FC = () => {
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

  const onSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast.success("User registered successfully");
        router.push('/');
      } else {
        console.error("Failed to register user:", await response.text());
        toast.warning("Internal Server error");
      }
    } catch (error) {
      console.error("Internal Server error:", error);
      toast.warning("Internal Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      <Form className="mt-6">
      <div className="mt-2">
          <label htmlFor="first_name" className="block text-gray-700">
            First Name
          </label>
          <Field
            type="text"
            id="first_name"
            name="first_name"
            placeholder="Enter First Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none"
            required
          />
          <ErrorMessage name="first_name" component="div" className="text-red-500" />
        </div>

        <div className="mt-2">
          <label htmlFor="last_name" className="block text-gray-700">
            Last Name
          </label>
          <Field
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Enter Last Name"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none"
            required
          />
          <ErrorMessage name="last_name" component="div" className="text-red-500" />
        </div>
        <div className="mt-2">
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

        <div className="mt-2">
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
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-500"
          />
        </div>
        

        <button
          type="submit"
          className="w-full block bg-yellow-500 hover:bg-yellow-700 focus:bg-yellow-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
