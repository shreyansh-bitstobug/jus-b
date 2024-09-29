import { syne } from "@/lib/direct-fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ReturnExchangePolicy() {
  return (
    <main className="px-6 sm:px-12 md:px-20 lg:px-52 xl:px-72 py-10 flex flex-col gap-10 text-lg">
      <h1 className={cn("text-4xl font-semibold uppercase", syne.className)}>Return / Exchange Policy</h1>
      <p className="flex flex-col gap-4">
        <span className="">
          <span className="font-semibold">Jus-B by JB</span> ensure that every transaction at our website is seamless.
          We take great care in delivering our products and adhere to the highest quality standards.
        </span>
        <span>
          While we believe in selling premium quality and providing the best fit for all our products, we understand
          that quality and fit are personal to individuals and not everyone prefers the same fabrics and fit, hence at
          Alamode, we provide product exchanges and returns.
        </span>
        <span>You are required to apply on our website within 5 working days of receiving the package.</span>
      </p>

      <p className="flex flex-col gap-4">
        <span className={cn("text-2xl font-semibold uppercase", syne.className)}>Exchange & Refund</span>
        <span>
          We offer customised outfits that are carefully curated according to your given measurements that&#58;s why no
          exchange or refund is available on customised outfits.
        </span>
        <span>
          Please note that intimate wear products &#40;swimwear and lingerie&#41; will not be eligible for exchange or
          refund due to hygiene concerns.
        </span>
        <span>We issue refund amount for the exchanged item in your bank account.</span>
        <span>
          All exchanged items must be unused, unaltered, unwashed and returned with original packaging and tags for
          hygiene reasons.
        </span>
        <span>
          Packages that don&#58;t fulfil the above conditions will be rejected in QC and returned to the customer.
        </span>
      </p>

      <p className="flex flex-col gap-4">
        <span className={cn("text-2xl font-semibold uppercase", syne.className)}>Exchange Procedure</span>
        <span>
          You can apply for return of garment at Jus-B by JB by raising a request on our exchange portal:{" "}
          <Link href="/contact">
            <Button size="sm" className="mt-2 font-medium" variant="action">
              Contact Us
            </Button>
          </Link>
        </span>
        <span>Once you click on the link you will asked for your order no and registered email/contact</span>
        <span>Upon filling these details you will see all your products eligible for refund.</span>
        <span>
          Then you can select a reason for exchange/return, give additional remarks, share relevant images and select
          refund option. Request is successfully placed.
        </span>
        <span>In case of defective or incorrect products it is mandatory to upload relevant images.</span>
        <span>It may take 24-48 hours for your request to be approved/ rejected</span>
        <span>Once your request is approved , courier the item on the address provided to you.</span>
        <span>Reverse courier charges are bearable by customer for refund.</span>
        <span>
          If , your request is rejected before pickup or at the QC stage you can seek clarification by emailing us at:
          <Link href="mailto:jolly@jus-b-fashion.com" className="hover:text-muted-foreground underline">
            {" "}
            jolly@jus-b-fashion.com
          </Link>
        </span>
      </p>
    </main>
  );
}
