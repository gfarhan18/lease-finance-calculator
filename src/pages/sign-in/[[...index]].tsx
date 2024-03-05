import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { BeatLoader, BounceLoader } from "react-spinners";
const SignInPage = () => (
  <section className="border-red-500 flex items-center justify-center">
    <div className=" p-5 flex rounded-2xl shadow-lg max-w-5xl">
      <div className="w-full px-5">
        <ClerkLoading>
          <BeatLoader color="yellow" size={50} />
        </ClerkLoading>
        {/* <RegisterForm /> */}
        <ClerkLoaded>
          <SignIn />
        </ClerkLoaded>
      </div>
    </div>
  </section>
);
export default SignInPage;
