const Location = require('../models/location');

exports.createLocation = async (req, res, next) => {
  try {
    const location = await new Location(req.body).save();
    res.status(200).json({ data: location });
  } catch (err) {
    next(err);
  }
};

exports.readLocations = async (req, res, next) => {
  try {
    const locations = await Location.find().sort('name');
    res.status(200).json({ data: locations });
  } catch (err) {
    next(err);
  }
};

exports.readLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    res.status(200).json({ data: location });
  } catch (err) {
    next(err);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    await location.set(req.body).save();
    res.status(200).json({ data: location });
  } catch (err) {
    next(err);
  }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    const deleted = await location.remove();
    res.status(200).json({ data: deleted });
  } catch (err) {
    next(err);
  }
};
