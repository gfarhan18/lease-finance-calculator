import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { BeatLoader } from "react-spinners";

const SignUpPage = () => (
  <section className="border-red-500 flex items-center justify-center">
    <div className=" p-5 flex rounded-2xl shadow-lg max-w-5xl">
      <div className="w-full px-5">
        <ClerkLoading>
          <BeatLoader color="yellow" size={50} />
        </ClerkLoading>
        {/* <RegisterForm /> */}
        <ClerkLoaded>
          <SignUp />
        </ClerkLoaded>
      </div>
    </div>
  </section>
);
export default SignUpPage;
