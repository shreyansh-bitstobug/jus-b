import { db } from "@/firebase/config";
import { Offer } from "@/lib/schema";
import { addDoc, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    const offersCollection = collection(db, "offers");

    const offerSnapshot = await getDocs(offersCollection);

    const offers: Offer[] = offerSnapshot.docs.map((doc) => doc.data() as Offer);

    if (offers.length === 0) {
      return NextResponse.json({ message: "No offer found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "offer retrieved successfully",
        offers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching offer:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch offer",
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("offer", body.offer);
    const { offer } = body;

    // Validate request body
    if (offer === undefined) {
      return NextResponse.json({ message: "Missing required fields: offer" }, { status: 400 });
    }

    // Create a new offer object
    const newOffer: Offer = {
      id: "offer1", // Firestore will generate the ID
      offer: offer,
    };

    console.log("newOffer", newOffer);

    await setDoc(doc(db, "offers", newOffer.id), newOffer);

    return NextResponse.json({ message: "Offer updated successfully", offer: newOffer }, { status: 201 });
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json({ message: "Failed to create offer", error }, { status: 500 });
  }
}
