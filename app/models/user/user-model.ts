import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

interface UserDocument extends Document {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  isDeleted?: boolean;
  companyId?: string;
  reportingManagerId?: string;
  contactNumber?: string;
  alternateNumber?: string;
  gender?: string;
  dob?: string;
  dateOfJoining?: string;
  designation?: string;
  bloodGroup?: string;
  currentAddress?: string;
  permanentAddress?: string;
  panNo?: string;
  addharNo?: string;
  passportNo?: string;
  passportName?: string;
  passportissueDate?: string;
  passportexpiryDate?: string;
  placeOfIssue?: string;
  profilePicture?: string;
  isActive?: boolean;
  createdBy?: string;
  createdOn?: string;
  modifiedBy?: string;
  modifiedOn?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isLocked?: boolean;
  lockedDateTime?: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: String,
    email: { type: String, index: { unique: true } },
    password: String,
    role: String,
    isDeleted: Boolean,
    companyId: String,
    reportingManagerId: String,
    contactNumber: String,
    alternateNumber: String,
    gender: String,
    dob: String,
    dateOfJoining: String,
    designation: String,
    bloodGroup: String,
    currentAddress: String,
    permanentAddress: String,
    panNo: String,
    addharNo: String,
    passportNo: String,
    passportName: String,
    passportissueDate: String,
    passportexpiryDate: String,
    placeOfIssue: String,
    profilePicture: String,
    isActive: Boolean,
    createdBy: String,
    createdOn: String,
    modifiedBy: String,
    modifiedOn: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    isLocked: Boolean,
    lockedDateTime: Date,
  },
  { versionKey: false }
);

UserSchema.pre<UserDocument>('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password || '', SALT_WORK_FACTOR, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password || '');
    return isMatch;
  } catch (error) {
    throw error;
  }
};

// UserSchema.methods.comparePassword = function (
//   candidatePassword: string,
//   cb: (err: Error | null, isMatch?: boolean) => void
// ) {
//   bcrypt.compare(candidatePassword, this.password || '', (err, isMatch) => {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//   });
// };

const User = model<UserDocument>('User', UserSchema);

export default User;
