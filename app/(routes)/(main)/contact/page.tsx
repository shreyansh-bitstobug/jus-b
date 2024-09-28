import dynamic from "next/dynamic";
const ContactPage = dynamic(() => import("@/components/contact/contact-page"));

export default function Contact() {
  return <ContactPage />;
}
