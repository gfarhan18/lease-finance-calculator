import { SignIn } from "@clerk/nextjs";
 
const SignInPage = () => (
  <section className="border-red-500 flex items-center justify-center">
      <div className=" p-5 flex rounded-2xl shadow-lg max-w-5xl">
        <div className="w-full px-5">
          {/* <RegisterForm /> */}
          <SignIn

          />
          
        </div>
      </div>
    </section>
);
export default SignInPage;