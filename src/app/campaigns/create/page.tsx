"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CampaignSchema = z.object({
  name: z.string().min(3, "Campaign name is required"),
  type: z.enum(["Email", "WhatsApp"]),
  description: z.string().optional(),
});

type FormData = z.infer<typeof CampaignSchema>;

export default function CreateCampaign() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(CampaignSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("/api/campaigns", data);
      toast.success("Campaign created successfully!");
      reset();
      router.push("/campaigns");
    } catch (err) {
      toast.error("Failed to create campaign");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New Campaign</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campaign Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            {...register("type")}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="">Select Type</option>
            <option value="Email">Email</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description")}
            className="w-full border border-gray-300 rounded-lg p-2"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white p-2 rounded-lg disabled:opacity-60"
        >
          {isSubmitting ? "Creating..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}
