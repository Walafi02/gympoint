import mongoose from 'mongoose';

const CheckinsSchema = new mongoose.Schema({
  student_id: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

export default mongoose.model('Checkins', CheckinsSchema);
