import mongoose, { Schema, model, models } from "mongoose";

const CampaignSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: { 
        type: String, 
        enum: ["Email", "WhatsApp"], 
        required: true 
    },

    description: { 
        type: String 
    },

    status: { 
        type: String, 
        default: "Active" 
    },

    sent: { 
        type: Number, 
        default: 0 
    },

    replies: { 
        type: Number, 
        default: 0 
    },
  },
  { timestamps: true }
);

const Campaign = models.Campaign || model("Campaign", CampaignSchema);

export default Campaign;
