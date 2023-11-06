const UserPreference = require("../models/fxModel");

async function getPaginatedPreferences(userId, page = 1, limit = 5) {
  const skip = (page - 1) * limit;

  const preferences = await UserPreference.find({ userId })
    .skip(skip)
    .limit(parseInt(limit));

  return preferences;
}

module.exports = { getPaginatedPreferences };
