import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Campaign from "@/models/Campaign";

// GET campaign by ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params; // ✅ must await
  const campaign = await Campaign.findById(id);
  if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(campaign, { status: 200 });
}

/**
 * PATCH campaign by ID
 * Example bodies:
 * { action: "increment", field: "sent", amount: 1 }
 * { action: "increment", field: "replies", amount: 1 }
 * { action: "set", field: "sent", value: 10 } 
 */
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await context.params; // ✅ must await

  try {
    const body = await req.json();
    const { action, field } = body as { action: string; field: string };

    if (!["sent", "replies"].includes(field)) {
      return NextResponse.json({ error: "Invalid field" }, { status: 400 });
    }

    let update: any = {};
    if (action === "increment") {
      const amount = Number(body.amount || 1);
      update = { $inc: { [field]: amount } }; // atomic increment
    } else if (action === "set") {
      const value = Number(body.value ?? 0);
      update = { $set: { [field]: value } };
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const updated = await Campaign.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error" }, { status: 500 });
  }
}
