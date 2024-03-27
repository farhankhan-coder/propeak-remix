import mongoose, { Document } from 'mongoose';

// Define the database model
interface IAppLevelAccessRightEntitlement extends Document {
  id: string;
  Group: string;
  EntitlementId: string;
  Value: boolean;
}

const AppLevelAccessRightEntitlementSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true, 
  },
  Group: {
    type: String,
    required: true,
  },
  EntitlementId: {
    type: String,
    required: true, 
  },
  Value: {
    type: Boolean,
    required: true, 
  },
}, {
  versionKey: false,
});

const AppLevelAccessRightEntitlement = mongoose.model<IAppLevelAccessRightEntitlement>(
  'applevelaccessrightsentitlments',
  AppLevelAccessRightEntitlementSchema
);

export default AppLevelAccessRightEntitlement;
