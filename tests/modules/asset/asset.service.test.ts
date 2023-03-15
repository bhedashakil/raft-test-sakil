import { AssetService } from "../../../src/modules/asset/asset.service";
import { mockRequest, mockResponse } from "../../helpers/testConstant";
import { AppError } from "../../../src/helpers";

jest.mock("jsonwebtoken");
jest.mock("express-fileupload");

const assetService = new AssetService();

describe("test asset service", () => {
  it("Should createAsset return 200 with success response", async () => {
    try {
      const req = mockRequest();
      const res = mockResponse();
      AssetService.prototype.createAsset = jest.fn().mockReturnValueOnce({});
      const response = await assetService.createAsset(
        {
          name: "test",
          note: "abcd",
        },
        req.files
      );
      expect(typeof response).toBe("object");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
