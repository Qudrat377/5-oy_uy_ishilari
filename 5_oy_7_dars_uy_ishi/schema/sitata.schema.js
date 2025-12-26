const { ref, required } = require("joi");
const { Schema, model } = require("mongoose");

const Sitata = new Schema(
  {
    sitata: {
      type: String,
      required: false
    },
    user_id: {
      type: Schema.ObjectId,
      ref: "Auth",
      required: true
    },
    book_id: {
        type: Schema.ObjectId,
        ref: "Book",
        required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Sitataschema = model("Sitata", Sitata);

module.exports = Sitataschema;
