const mongoose = require('mongoose');

const coronaSchema = new mongoose.Schema({
  memberId: {
    type: String,
    ref: 'Member',
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid memberId!`
    },
  },
  vaccines: [{
    date: {
      type: Date,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
      enum: ['Pfizer', 'Moderna', 'AstraZeneca','Bharat Biotech'],
    },
  }],
  positiveResult: {
    date: {
      type: Date,
      validate: {
        validator: function(v) {
          return v instanceof Date && !isNaN(v);
        },
        message: props => `${props.value} is not a valid date!`
      },
    },
    recoveryDate: {
      type: Date,
      validate: {
        validator: function(v) {
          return v instanceof Date && !isNaN(v);
        },
        message: props => `${props.value} is not a valid date!`
      },
    },
  },
});

  

const Corona = mongoose.model('Corona', coronaSchema);

module.exports = Corona