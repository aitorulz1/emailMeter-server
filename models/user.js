const mongoose = require("mongoose");
const Workout = require('./workout')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      username: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        default: null,
        lowercase: true,
      },
      password: {
        type: String,
        minlength: 6,
        default: null,
      },
      date_joined: {
          type: Date,
          max: Date.now,
          default: Date.now,
      },
      avg_steps: {
          type: Number,
          default: 0,
          integer: true,
          get: v => Math.round(v),
          set: v => Math.round(v),
      },
      avg_distance: {
            type: Number,
            default: 0,
            integer: true,
            get: v => Math.round(v),
            set: v => Math.round(v) 
      },
      avg_calories: {
            type: Number,
            default: 0,
            integer: true,
            get: v => Math.round(v),
            set: v => Math.round(v) 
      },
      avg_active_minutes: {
            type: Number,
            default: 0,
            integer: true,
            get: v => Math.round(v),
            set: v => Math.round(v) 
      }
},{
  timestamps: true,
  toObject: {virtuals: true },
  toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
          ret.id = doc.id;
          delete ret._id;
          delete ret.__v;
          delete ret.password;
          return ret;
      }
  }
})

UserSchema.virtual('workouts', {
    ref: Workout.modelName,
    localField: "_id",
    foreignField: "user",
    justOne: false
})


module.exports = mongoose.model("User", UserSchema);