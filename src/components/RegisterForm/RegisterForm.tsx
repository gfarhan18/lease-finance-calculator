import { Formik, Form, Field, ErrorMessage } from "formik";

interface RegisterFormProps {
  onRegister: (values: FormValues) => void;
}
export interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: FormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
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
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const onSubmit = (values: FormValues, { setSubmitting }: any) => {
    onRegister(values); 
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
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

        <div className="mt-4">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <Field
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-yellow-500 focus:bg-white focus:outline-none"
            minLength={6}
            required
          />
          <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
        </div>

        <button
          type="submit"
          className="w-full block bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
