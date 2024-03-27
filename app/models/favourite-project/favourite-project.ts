import mongoose, { Document } from 'mongoose';
const { Schema } = mongoose;

const favouriteProjectSchema = new Schema({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  projectId: { type: String, required: true }
});

const FavouriteProject = mongoose.model('FavouriteProject', favouriteProjectSchema);

// module.exports = FavouriteProject;
export default FavouriteProject;
