"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { shopBanner } from "@/public/assets/data";
import { cn } from "@/lib/utils";

// Define validation schema using zod
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(1, { message: "Message is required" }),
});

export default function ContactPage() {
  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Do something with the form values
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full overflow-hidden md:h-96 sm:h-72 h-52 flex items-center justify-center relative">
        <Image src={shopBanner} fill alt="Product" className="object-cover brightness-[0.3] -z-10 w-screen" />
        <h1 className={cn("absolute text-center text-white lg:text-7xl md:text-5xl text-4xl px-4  font-bold")}>
          Contact Us
        </h1>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@jus-b-fashion.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>INDIA: +91 9953321989</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span>UK Office England: +447768332329</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>WZ 1550 Nangal Raya, New Delhi 110046</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>Monday to Saturday - 9:00 am to 7:00 pm</span>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input {...form.register("name")} id="name" placeholder="Your Name" />
                {form.formState.errors.name && <span>{form.formState.errors.name.message}</span>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input {...form.register("email")} id="email" type="email" placeholder="your@email.com" />
                {form.formState.errors.email && <span>{form.formState.errors.email.message}</span>}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input {...form.register("phone")} id="phone" type="tel" placeholder="+1 (123) 456-7890" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  {...form.register("message")}
                  id="message"
                  placeholder="Your message here..."
                  className="h-32"
                />
                {form.formState.errors.message && <span>{form.formState.errors.message.message}</span>}
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
