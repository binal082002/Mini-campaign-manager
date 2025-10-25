"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

type Campaign = {
  _id: string;
  name: string;
  type: string;
  description?: string;
  status?: string;
  sent: number;
  replies: number;
  createdAt: string;
};

export default function CampaignDetailsClient({ id }: { id: string }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`/api/campaigns/${id}`)
      .then((res) => {
        if (mounted) setCampaign(res.data);
      })
      .catch(() => toast.error("Failed to load campaign"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  const patchCount = async (field: "sent" | "replies", amount = 1) => {
    if (!campaign) return;
    // optimistic UI
    const previous = { ...campaign };
    setCampaign({ ...campaign, [field]: (campaign as any)[field] + amount });
    setBusy(true);

    try {
      const res = await axios.patch(`/api/campaigns/${id}`, {
        action: "increment",
        field,
        amount,
      });
      setCampaign(res.data); // update with authoritative server state
      toast.success(`${field === "sent" ? "Sent" : "Reply"} updated`);
    } catch (err) {
      // rollback on error
      setCampaign(previous);
      toast.error("Failed to update count");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }
  if (!campaign) return <p>Campaign not found</p>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          <p className="text-sm text-gray-600">
            {campaign.type} · {campaign.status}
          </p>
        </div>
        <Link href="/campaigns" className="text-sm text-blue-600">
          ← Back
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-sm text-gray-700">
          {campaign.description || "No description"}
        </p>

        <div className="mt-4 flex flex-wrap gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Sent</div>
            <div className="text-2xl font-semibold">{campaign.sent}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Replies</div>
            <div className="text-2xl font-semibold">{campaign.replies}</div>
          </div>

          <div className="ml-auto flex gap-3 items-center">
            <button
              onClick={() => patchCount("sent", 1)}
              disabled={busy}
              className="px-3 py-1.5 bg-black text-white text-sm rounded-md hover:opacity-90 disabled:opacity-60 transition"
            >
              Send +1
            </button>

            <button
              onClick={() => patchCount("replies", 1)}
              disabled={busy}
              className="px-3 py-1.5 border text-sm rounded-md hover:bg-gray-100 disabled:opacity-60 transition"
            >
              Record Reply +1
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
