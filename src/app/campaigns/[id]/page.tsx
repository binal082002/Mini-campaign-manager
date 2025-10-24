// src/app/campaigns/[id]/page.tsx
import CampaignDetailsClient from "@/components/CampaignDetailsClient";

export default async function CampaignDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <CampaignDetailsClient id={id} />;
}
