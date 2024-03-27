import {
  require_browser_umd
} from "/build/_shared/chunk-FN7THW23.js";
import {
  createHotContext
} from "/build/_shared/chunk-7LE2OC7F.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/models/access-right/applevelaccessright-model.ts
var import_mongoose = __toESM(require_browser_umd(), 1);
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/models/access-right/applevelaccessright-model.ts"
  );
  import.meta.hot.lastModified = "1709470693577.7798";
}
var AppLevelAccessRightSchema = new import_mongoose.default.Schema({
  userId: {
    type: String
  },
  entitlementId: {
    type: String
  },
  group: {
    type: String
  },
  access: {
    type: Boolean
  },
  createdBy: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { versionKey: false });
var AppLevelAccessRight = import_mongoose.default.model("applevelaccessrights", AppLevelAccessRightSchema);
var applevelaccessright_model_default = AppLevelAccessRight;

// app/Components/Entitlement/services/applevelaccessright-service.jsx
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/Components/Entitlement/services/applevelaccessright-service.jsx"
  );
  import.meta.hot.lastModified = "1709384153057.1104";
}
var getUserAppLevelAccessRights = async () => {
  try {
    const accessRights = await applevelaccessright_model_default.find({});
    return { response: accessRights, err: null };
  } catch (err) {
    return { response: null, err };
  }
};

export {
  getUserAppLevelAccessRights
};
//# sourceMappingURL=/build/_shared/chunk-TIVFM4AG.js.map
