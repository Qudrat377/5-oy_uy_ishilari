const { Schema, model } = require("mongoose");

const Book = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    pages: {
      type: Number,
      required: true,
      min: [3, "kami kitob varaqi 3 betlik bo'lishi lerak"]
    },
    published_year: {
      type: String,
      required: true,
      max: new Date().getFullYear()
    },
    image_url: {
      type: String,
      required: true,
      minLength: [15, "Kamida 15 ta harfdan iborat bo'lsin"],
    },
    description: {
      type: String,
      required: true,
      minLength: 20,
    },
    genre: {
      type: String,
      required: true,
      set: value => value.toLowerCase(),
      enum: {
        values: [
          "historical", "drama", "horror", "romance", "detective",
          "documentry", "sciencs fiction", "fantasy", "comedy", "reality", "animation", "triller", "advanture",
          "novel", "poetry", "satir", "mella dramma", "action"
        ],
        message: `{VALUE} bunday qiymat qabul qilinmaydi`
      }
    },
    period: {
      type: String,
      required: true,
      set: value => value.toLowerCase(),
      enum: {
        values: ["temuriylar davri", "jadid adabiyoti", "sovet davri", "mustaqillik davri"],
        message: `{VALUE} bunday qiymt qabul qilinmaydi`
      }
    },
    published_home: {
      type: String,
      required: true,
      set: value => value.toLowerCase(),
      enum: {
        values: ["kitooob", "hilol nashr", "tirilish", "asaxiy", "bukhara books", "pir nashr"]
      }
    },
    author_id: {
      type: Schema.ObjectId,
      ref: "Author",
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BookSchema = model("Book", Book);

module.exports = BookSchema;
