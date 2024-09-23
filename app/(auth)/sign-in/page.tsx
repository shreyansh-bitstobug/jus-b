import dynamic from "next/dynamic";

const SignInPage = dynamic(() => import("@/components/auth/sign-in"));

export default function SignIn() {
  return <SignInPage />;
}
