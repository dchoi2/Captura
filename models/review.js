var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema( {
    writer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photographer: {type: mongoose.Schema.Types.ObjectId, ref: 'Photographer'},
    content: String,
    rating: Number,
    date: {type: Date, default: Date.now},
    useful: Boolean
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

var review = mongoose.model("Review", reviewSchema);

module.exports = {
  Review: review
}
