import mongoose from 'mongoose';

export const mongooseConn = mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    // useFindAndModify: false, // not supported ???
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("mongoose connection successful");
})

export const appointmentSchema = new mongoose.Schema({
  clientEmail: {
    type: String,
    required: true
  }, 
  clientName: {
    type: String,
    required: true
  }, 
  clientPhone: {
    type: String,
    required: true
  },
  date: {
    type: Object,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: false
  }
});

export const Appointment = mongoose.model("Booking", appointmentSchema);

