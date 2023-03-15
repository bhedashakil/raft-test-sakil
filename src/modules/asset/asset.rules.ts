import { Messages } from "../../constants";
import { checkSchema } from "express-validator";

const assetRules: any = {
  getAssetList: checkSchema({
    page_number: {
      in: ["query"],
      trim: true,
      isNumeric: true,
      toInt: true,
      optional: true,
      errorMessage: "Please enter valid page_number",
    },
    page_size: {
      in: ["query"],
      trim: true,
      isNumeric: true,
      toInt: true,
      optional: true,
      errorMessage: "Please enter valid page_size",
    },
  }),
  createAsset: checkSchema({
    name: {
      in: ["body"],
      trim: true,
      notEmpty: true,
      isString: true,
      errorMessage: "Please enter valid name",
    },
    note: {
      in: ["body"],
      trim: true,
      notEmpty: true,
      isString: true,
      errorMessage: "Please enter valid note",
    },
  }),
};

export default assetRules;
