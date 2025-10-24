"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Campaign {
  _id: string;
  name: string;
  sent: number;
  replies: number;
  status: string;
  createdAt: string;
}

const Card = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center justify-center hover:shadow-lg transition">
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    axios.get("/api/campaigns").then((res) => setCampaigns(res.data));
  }, []);

  // Only active campaigns
  const activeCampaigns = campaigns.filter((c) => c.status === "Active");
  
  const totalSent = activeCampaigns.reduce((acc, c) => acc + (c.sent || 0), 0);
  const totalReplies = activeCampaigns.reduce((acc, c) => acc + (c.replies || 0), 0);

  const data = activeCampaigns.map((c) => ({
    name: c.name,
    sent: c.sent,
    replies: c.replies,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Active Campaigns" value={activeCampaigns.length} />
        <Card title="Emails Sent" value={totalSent} />
        <Card title="Replies" value={totalReplies} />
        <Card title="Meetings Booked" value={Math.floor(totalReplies / 3)} />
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Active Campaign Performance</h2>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="sent"
                stroke="#2563eb"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="replies"
                stroke="#16a34a"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center py-6 text-gray-500">No active campaigns to display.</p>
        )}
      </div>
    </div>
  );
}
