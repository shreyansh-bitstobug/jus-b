import { syne } from "@/lib/direct-fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ShippingPolicy() {
  return (
    <main className="px-6 sm:px-12 md:px-20 lg:px-52 xl:px-72 py-10 flex flex-col gap-10">
      <h1 className={cn("text-4xl font-semibold uppercase", syne.className)}>Shipping Policy</h1>
      <div className="flex flex-col gap-4">
        <span className={cn("text-2xl font-semibold uppercase", syne.className)}>General Policy</span>

        <span>
          <li>All ready to ship items ship within 24-48 hours</li>
          <li>Pre-order items ship in 15-20 working days</li>
        </span>

        <span className="">Upon dispatch you will receive tracking details via whatsapp, sms and email.</span>
        <span className="font-bold">No COD</span>
      </div>

      <div className="flex flex-col gap-4">
        <span className={cn("text-2xl font-semibold uppercase", syne.className)}>Shows delivered but not received</span>
        <span>
          You are requested to track your package when it shows delivered on your email or sms. As per the recent update
          in courier companies policies throughout India, you are required to inform us within 3 days if your package
          isn&#39;t delivered and shows delivered in the tracking for us to help you with the same. The courier company
          is not accepting any complaints post 72 hours marked delivery, and we will not be liable if there is delay in
          informing from your end.
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <span className={cn("text-2xl font-semibold uppercase", syne.className)}>Shipping in India</span>
        <span className="font-semibold italic">
          We use premium courier services of BlueDart, Amazon, Xpressbees, Ekart, Ecom and Delhivery.
        </span>
        <span>
          <span className="font-semibold">Metros:</span> Please allow 5-7 working days for the courier to be delivered
          post dispatch.
          <br />
          <span className="font-semibold">Non-Metros and Interiors:</span> Please allow 9-10 working days for the
          courier to be delivered post dispatch. <br />
          Upon dispatch you will receive tracking details via whatsapp, sms and email.
          <br />
          We cannot be held accountable for unforeseen weather conditions, custom clearance processes, and courier
          company caused delay in delivery time. However, we will ensure to keep you well informed incase of any
          unforeseen delay with your order.
        </span>

        <span>Upon filling these details you will see all your products eligible for refund.</span>
        <span>
          Then you can select a reason for exchange/return, give additional remarks, share relevant images and select
          refund option. Request is successfully placed.
        </span>
        <span>In case of defective or incorrect products it is mandatory to upload relevant images.</span>
        <span>It may take 24-48 hours for your request to be approved/ rejected</span>
        <span>Once your request is approved , courier the item on the address provided to you.</span>
        <span>Reverse courier charges are bearable by customer for refund.</span>
      </div>

      <div className="flex flex-col gap-4">
        <span className={cn("text-2xl font-semibold uppercase", syne.className)}>International Shipping</span>

        <span>
          International Shipping is being offered by Jus-B by JB ! We are shipping internationally via Aramex.
        </span>
        <span>For International Shipping, Please use Cashfree payment gateway at checkout.</span>
        <span>
          The shipping charges depend on your country of purchase and order volume & weight and will be calculated at
          checkout.
        </span>
        <span>
          <span className="font-semibold">Jus-B by JB</span> cannot be held responsible for any parcel that is not
          collected by the consignee.
        </span>
        <span>
          Orders are shipped from India and any import duties and taxes charged when the parcel reaches the destination
          country, must be paid by the recipient. We cannot estimate the value of duties and have no control over these
          charges as customs policies vary from country to country.
        </span>
        <span>If you have questions related to custom charges please contact your local customs office.</span>
      </div>

      <div className="flex flex-col gap-4">
        <span className={cn("text-2xl font-semibold uppercase", syne.className)}>Color Difference</span>

        <span>
          The colour in images on the website can slightly vary due to product shoots in professional lighting.
        </span>
      </div>
    </main>
  );
}
