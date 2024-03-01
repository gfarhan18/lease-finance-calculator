import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Layout from "@/components/Layout/_layout";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ClerkProvider } from '@clerk/nextjs'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const {asPath,route,pathname } = router 
  if (asPath === "/dashboard") {
  return (
    <ToastProvider>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </ToastProvider>
  );
  }
  else {
    return (
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <ToastProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
      </ClerkProvider>
    );
  }
}

export default MyApp;
