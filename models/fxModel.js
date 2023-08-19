const mongoose = require('mongoose');

const userPreferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  currencyPair: {
    type: String,
    required: true,
  },
  targetRate: {
    type: Number,
   // required: true,
  },
  // Add a new field for storing the user's preferred target price
  targetPrice: {
    type: Number,
    //required: true,
  },
});


const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);

module.exports = UserPreference;
