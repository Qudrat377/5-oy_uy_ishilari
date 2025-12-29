const { Schema, model } = require("mongoose");

const Citation = new Schema({
    text: {
        type: String,
    },
    book_id: {
      type: Schema.ObjectId,
      ref: "Book",
      required: true
    },
    admin_id: {
      type: String,
    }
},
{
    versionKey: false,
    timestamps: true
}
)

const CitationSchema = model("Citation", Citation)

module.exports = CitationSchema