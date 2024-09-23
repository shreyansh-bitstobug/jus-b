import dynamic from "next/dynamic";
const SignUpPage = dynamic(() => import("@/components/auth/sign-up"));

export default function SignUp() {
  return <SignUpPage />;
}
