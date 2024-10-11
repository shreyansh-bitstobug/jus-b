"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { syne } from "@/lib/direct-fonts";
import { RiInstagramLine, RiWhatsappLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "../ui/use-toast";

// Define validation schema using zod
const formSchema = z.object({
  fname: z.string().min(1, { message: "First Name is required" }),
  lname: z.string().min(1, { message: "Last Name is required" }),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, { message: "Phone number is required" }),
  message: z.string().min(20, { message: "Message is shorter than 20 characters" }),
});

export default function ContactPage() {
  const [whatsappLink, setWhatsappLink] = useState("https://chat.whatsapp.com/BfPHIvJq0Gg4FJeohDBjry");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { toast } = useToast();

  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const groupLink = "https://chat.whatsapp.com/BfPHIvJq0Gg4FJeohDBjry"; // WhatsApp group link
    const whatsappSchemeLink = "whatsapp://chat?code=BfPHIvJq0Gg4FJeohDBjry"; // Custom scheme to open app
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    orderId && form.setValue("message", `Order ID: ${orderId}`); // Pre-fill message with order ID

    // Detect if user is on Windows or Mobile
    if (navigator.userAgent.includes("Windows")) {
      if (navigator.userAgent.includes("WhatsApp")) {
        // If WhatsApp is installed on Windows, use the custom scheme
        setWhatsappLink(whatsappSchemeLink);
      } else {
        // Otherwise, open WhatsApp Web
        setWhatsappLink(groupLink);
      }
    } else if (isMobile) {
      // On mobile devices, use the custom scheme to open WhatsApp app
      setWhatsappLink(whatsappSchemeLink);
    } else {
      // Default fallback to WhatsApp Web
      setWhatsappLink(groupLink);
    }
  }, []);

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { fname, lname, email, phone } = values;
    const name = `${fname} ${lname}`;
    const query = values.message;

    const message: string = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${query}`;

    try {
      setIsLoading(true);
      const response = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      } else {
        toast({ title: "Message sent!", description: "We'll get back to you shortly" });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
        form.reset(); // Reset the form after submission
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className=" container py-20 space-y-14">
      <section className="space-y-1">
        <p className="flex gap-3">
          <Image src="/assets/contact-icon.svg" width={20} height={20} alt="Contact" />
          <span className="uppercase font-medium text-sm">Contact us</span>
        </p>
        <h1 className="text-4xl font-medium">Let&#39;s Connect</h1>
      </section>

      <section className="grid md:grid-cols-2 gap-12">
        {/* Column-1 (Contact Form) */}
        <div className="max-w-[668px]">
          <form className="space-y-10" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex w-full gap-10">
              <div className="w-1/2">
                <Input className=" bg-snow border-neutral-700" {...form.register("fname")} placeholder="First Name*" />
                {form.formState.errors.fname && (
                  <span className="text-sm text-red-600">{form.formState.errors.fname.message}</span>
                )}
              </div>
              <div className="w-1/2">
                <Input className=" bg-snow border-neutral-700" {...form.register("lname")} placeholder="Last Name*" />
                {form.formState.errors.lname && (
                  <span className="text-sm text-red-600">{form.formState.errors.lname.message}</span>
                )}
              </div>
            </div>

            <div className="flex w-full gap-10">
              <div className="w-1/2">
                <Input
                  className=" bg-snow border-neutral-700"
                  {...form.register("email")}
                  type="email"
                  placeholder="Email address*"
                />
                {form.formState.errors.email && (
                  <span className="text-sm text-red-600">{form.formState.errors.email.message}</span>
                )}
              </div>
              <div className="w-1/2">
                <Input
                  className=" bg-snow border-neutral-700"
                  {...form.register("phone")}
                  type="tel"
                  placeholder="Phone number with country code*"
                />
                {form.formState.errors.phone && (
                  <span className="text-sm text-red-600">{form.formState.errors.phone.message}</span>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col items-end gap-4">
              <div className="w-full text-right">
                <Textarea
                  {...form.register("message")}
                  placeholder="Your message here..."
                  className="min-h-40 bg-snow border-neutral-700"
                />
                {form.formState.errors.message && (
                  <span className="text-sm text-red-600">{form.formState.errors.message.message}</span>
                )}
              </div>

              {success && <p className="text-green-800 text-sm">Your message has successfully been sent!</p>}
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className={cn("w-fit px-10", success ? "bg-green-700" : "")}
              >
                {success ? "Sent!" : "Send Message"}
              </Button>
            </div>
          </form>
        </div>

        {/* Column-2 (Contact Information) */}
        <div className="space-y-6">
          <h1 className="uppercase font-medium">Contact Information</h1>
          <p className="">
            We&#39;re here to help! Whether you&#39;re looking for product information, assistance with an order, or
            have feedback, we&#39;re just a message or call away.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="space-y-4 max-w-[290px]">
              <h1 className={cn("text-2xl font-bold", syne.className)}>India</h1>
              <div className="flex flex-col gap-2">
                {/* Address */}
                <p className="flex gap-2">
                  <span>
                    <MapPin className="h-5 w-5" />
                  </span>
                  WZ 1550 Nangal Raya, New Delhi 110046
                </p>

                {/* Contact */}
                <Link href="tel:+919953321989" className="flex gap-2 hover:text-muted-foreground w-fit">
                  <span>
                    <Phone className="h-5 w-5" />
                  </span>
                  +91 99533 21989
                </Link>

                {/* Email */}
                <Link href="mailto:info@jus-b-fashion.com" className="flex gap-2 hover:text-muted-foreground w-fit">
                  <span>
                    <Mail className="h-5 w-5" />
                  </span>
                  info@jus-b-fashion.com
                </Link>
              </div>
            </div>

            <div className="space-y-4 px-4">
              <h1 className={cn("text-2xl font-bold", syne.className)}>UK</h1>
              <div className="flex flex-col gap-2">
                {/* Contact */}
                <Link href="tel:+44%207768%20332329" className="flex gap-2 hover:text-muted-foreground w-fit">
                  <span>
                    <Phone className="h-5 w-5" />
                  </span>
                  +44 7768 332329
                </Link>

                {/* Email */}
                <Link href="mailto:info@jus-b-fashion.com" className="flex gap-2 hover:text-muted-foreground w-fit">
                  <span>
                    <Mail className="h-5 w-5" />
                  </span>
                  info@jus-b-fashion.com
                </Link>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <h1 className={cn("text-2xl font-semibold", syne.className)}>Social Links</h1>
            <div className="flex items-center gap-4">
              <Link href="https://www.instagram.com/jusb_jb" className="text-muted-foreground hover:text-foreground">
                <RiInstagramLine className="h-5 w-5" />
              </Link>
              <Link href={whatsappLink} className="text-muted-foreground hover:text-foreground">
                <RiWhatsappLine className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
