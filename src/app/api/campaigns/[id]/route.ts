// src/app/api/campaigns/[id]/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Campaign from "@/models/Campaign";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = await params;
  const campaign = await Campaign.findById(id);
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(campaign);
}

/**
 * PATCH body examples:
 * { action: "increment", field: "sent", amount: 1 }
 * { action: "increment", field: "replies", amount: 1 }
 * { action: "set", field: "sent", value: 10 } // optional
 */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = await params;
  try {
    const body = await req.json();
    const { action, field } = body as { action: string; field: string };

    if (!["sent", "replies"].includes(field)) {
      return NextResponse.json({ error: "Invalid field" }, { status: 400 });
    }

    let update: any = {};
    if (action === "increment") {
      const amount = Number(body.amount || 1);
      // use $inc for atomic increment (important for concurrency)
      update = { $inc: { [field]: amount } };
    } else if (action === "set") {
      const value = Number(body.value ?? 0);
      update = { $set: { [field]: value } };
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const updated = await Campaign.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error" }, { status: 500 });
  }
}
