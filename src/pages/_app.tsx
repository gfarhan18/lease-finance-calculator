import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";
import Layout from "@/components/Layout/_layout";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

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
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    );
  }
}

export default MyApp;
