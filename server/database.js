const mongoose = require('mongoose');

mongoose.connect('mongodb://root:password@mongo:27017/liitecdata?authSource=admin');

module.exports = mongoose;