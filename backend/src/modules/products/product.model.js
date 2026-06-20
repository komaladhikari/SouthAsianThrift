import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Lehenga",
        "Saree",
        "Kurti",
        "Anarkali",
        "Dupatta",
        "Accessories",
        "Jewelry",
        "Other",
      ],
    },

    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL", "Free Size", "One Size"],
      default: "Free Size",
    },

    condition: {
      type: String,
      required: true,
      enum: ["New", "Like New", "Good", "Fair"],
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
        },
      },
    ],

    color: {
      type: String,
      trim: true,
    },

    fabric: {
      type: String,
      trim: true,
    },

    brand: {
      type: String,
      trim: true,
    },

    measurements: {
      bust: String,
      waist: String,
      hips: String,
      length: String,
    },

    stock: {
      type: Number,
      default: 1,
      min: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    isSold: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;