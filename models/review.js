var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema( {
    writer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photographer: {type: mongoose.Schema.Types.ObjectId, ref: 'Photographer'},
    review: String,
    rating: Number,
    date: {type: Date, default: Date.now},
    useful: Boolean
});

var review = mongoose.model("Review", reviewSchema);

module.exports = {
  Review: review
}
