import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerPhone: {
      type:String,
      required:true,
    },

    pickupAddress:{
      type:String,
      required:true,
    },

    deliveryAddress:{
      type:String,
      required:true,
    },

    driver:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      default:null,
    },

    vehicle:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Vehicle",
      default:null,
    },

    route:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Route",
      default:null,
    },

    priority:{
      type:String,
      enum:["Low","Medium","High"],
      default:"Medium",
    },

    status:{
      type:String,
      enum:[
        "Pending",
        "Assigned",
        "In Transit",
        "Delivered",
        "Cancelled",
      ],
      default:"Pending",
    },

    deliveryDate:{
      type:Date,
    },

    estimatedTime:{
      type:String,
      default:"",
    },

    weight:{
      type:Number,
      default:0,
    },

    notes:{
      type:String,
      trim:true,
      default:"",
    },

    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    currentLocation: {
  type: String,
  default: "",
},

proofOfDelivery: {
  type: String,
  default: "",
},

customerOTP: {
  type: String,
  default: "",
},

deliveredAt: {
  type: Date,
},

pickedUpAt: {
  type: Date,
},

distance: {
  type: Number,
  default: 0,
},


  },
  {
    timestamps:true,
  }
);

export default mongoose.model("Delivery",deliverySchema);