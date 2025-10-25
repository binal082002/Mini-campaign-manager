"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Campaign {
  _id: string;
  name: string;
  type: string;
  status: string;
  sent: number;
  replies: number;
  createdAt: string;
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true); // ✅ New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/campaigns");
        setCampaigns(res.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false); // ✅ Stop loading whether success or failure
      }
    };

    fetchData();
  }, []);

  // ✅ Show loading spinner until campaigns are fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 w-full px-4 md:px-8 lg:px-16">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Campaigns</h1>
        <Link
          href="/campaigns/create"
          className="bg-black text-white px-4 py-2 rounded-lg text-sm md:text-base transition w-full sm:w-auto text-center"
        >
          + Create New Campaign
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block w-full bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Sent</th>
              <th className="p-3 text-left">Replies</th>
              <th className="p-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr
                key={c._id}
                className="border-t hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="p-3">
                  <Link
                    href={`/campaigns/${c._id}`}
                    className="text-gray-900 font-medium hover:text-blue-600 transition-colors no-underline"
                  >
                    {c.name}
                  </Link>
                </td>
                <td className="p-3 capitalize">{c.type}</td>
                <td className="p-3">{c.status}</td>
                <td className="p-3">{c.sent}</td>
                <td className="p-3">{c.replies}</td>
                <td className="p-3">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {campaigns.length === 0 && (
          <p className="text-center py-6 text-gray-500 text-sm md:text-base">
            No campaigns yet
          </p>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {campaigns.length === 0 ? (
          <p className="text-center py-6 text-gray-500 text-sm md:text-base">
            No campaigns yet
          </p>
        ) : (
          campaigns.map((c) => (
            <Link
              key={c._id}
              href={`/campaigns/${c._id}`}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Name:</span>
                <span className="text-blue-600 underline">{c.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Type:</span>
                <span className="capitalize">{c.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Status:</span>
                <span>{c.status}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Sent:</span>
                <span>{c.sent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Replies:</span>
                <span>{c.replies}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Created At:</span>
                <span>{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
