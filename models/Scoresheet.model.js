const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the scoreboard model to whatever makes sense in this case
const scoresheetSchema = new Schema(
  {
    par: {
      type: [Number],
    },
    strokes: {
      type: [Number],
      required:  [true,"you have to insert strokes made"]
    },
    name:{
     player: [{ type: Schema.ObjectId, ref: 'User' }]
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Scoresheet = model("Scoresheet", scoresheetSchema);

module.exports = Scoresheet;
