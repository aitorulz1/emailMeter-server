const mongoose = require("mongoose");

const WorkSchema = mongoose.Schema({
      date: {
          type: Date,
          max: Date.now,
          default: Date.now,
          required: true
      },
      steps: {
          type: Number,
          required: true,
          integer: true,
          get: v => Math.round(v),
          set: v => Math.round(v)           
      },
      distance: {
           type: Number,
           required: true,
           integer: true,
            get: v => Math.round(v),
            set: v => Math.round(v) 
      },
      calories: {
            type: Number,
            required: true,
            integer: true,
            get: v => Math.round(v),
            set: v => Math.round(v) 
      },
      active_minutes: {
            type: Number,
            required: true,
            integer: true,
            get: v => Math.round(v),
            set: v => Math.round(v) 
      },
      user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
      }
})

module.exports = mongoose.model("Work", WorkSchema);