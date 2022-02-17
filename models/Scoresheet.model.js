const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the scoreboard model to whatever makes sense in this case
const scoresheetSchema = new Schema(
  {
    par: {
      type: [Number],
      enum: [3, 4, 5],
    },
    strokes: {
      type: [Number],
      required: [true, "you have to insert strokes made"],
    },
    holes:{
      type:[Number]
    },

    playerID: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Scoresheet = model("Scoresheet", scoresheetSchema);

module.exports = Scoresheet;
