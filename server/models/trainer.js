const mongoose = require("mongoose");

const TrainerSchema = new mongoose.Schema(
  {
    age: {
      type: Number,
      required: true,
    },
    yoe: {
      type: Number,
      required: true,
    },
    campCount: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trainer", TrainerSchema);
