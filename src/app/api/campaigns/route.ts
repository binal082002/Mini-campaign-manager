import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Campaign from "@/models/Campaign";

// GET all campaigns
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    return NextResponse.json(campaigns, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST a new campaign
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();
    const newCampaign = await Campaign.create(data);
    return NextResponse.json(newCampaign, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
