import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

CheckinsSchema.plugin(mongoosePaginate);

export default mongoose.model('Checkins', CheckinsSchema);
