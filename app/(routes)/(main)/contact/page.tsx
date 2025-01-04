import { Metadata } from "next";
import dynamic from "next/dynamic";
const ContactPage = dynamic(() => import("@/components/contact/contact-page"));

export const metadata: Metadata = {
  title: {
    default: "Contact Us",
    template: "%s - Jus-b",
  },
  description:
    "Get in touch with Jus-b. Have questions, need assistance, or want to connect with our team? Visit our Contact Us page for support and inquiries.",
  keywords: [
    "contact Jus-b",
    "Jus-b support",
    "customer service Jus-b",
    "Jus-b contact details",
    "get in touch Jus-b",
    "Jus-b fashion inquiries",
  ],
  openGraph: {
    type: "website",
    url: "https://www.jus-b-fashion.com/contact",
    title: "Contact Us - Jus-b",
    description:
      "Get in touch with Jus-b. Have questions, need assistance, or want to connect with our team? Visit our Contact Us page for support and inquiries.",
    images: [
      {
        url: "/assets/hero4.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Jus-b for Support and Inquiries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - Jus-b",
    description:
      "Get in touch with Jus-b. Have questions, need assistance, or want to connect with our team? Visit our Contact Us page for support and inquiries.",
  },
};

export default function Contact() {
  return <ContactPage />;
}
