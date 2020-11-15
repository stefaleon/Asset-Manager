const Asset = require('../models/asset');
const Category = require('../models/category');
const Location = require('../models/location');

exports.createAsset = async (req, res, next) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const location = await Location.findById(req.body.location);
    if (!location) {
      return res.status(404).json({ error: 'Location not found' });
    }
    const asset = await new Asset(req.body).save();
    res.status(200).json({ data: asset });
  } catch (err) {
    next(err);
  }
};

exports.readAssets = async (req, res, next) => {
  try {
    const assets = await Asset.find().sort('name');
    res.status(200).json({ data: assets });
  } catch (err) {
    next(err);
  }
};

exports.readAsset = async (req, res, next) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(200).json({ data: asset });
  } catch (err) {
    next(err);
  }
};