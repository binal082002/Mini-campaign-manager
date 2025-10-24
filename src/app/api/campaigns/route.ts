import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Campaign from "@/models/Campaign";

export async function GET() {
  await dbConnect();
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const data = await req.json();
    const newCampaign = await Campaign.create(data);
    return NextResponse.json(newCampaign, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
