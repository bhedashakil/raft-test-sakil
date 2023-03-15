import { AssetDao } from "../../../src/modules/asset/asset.dao";
import { AppError, pool } from "../../../src/helpers";

jest.mock("jsonwebtoken");

const assetDao = new AssetDao();

describe("test asset dao", () => {
  it("Should return true for create user", async () => {
    try {
      (pool as any).promise = jest.fn().mockReturnThis();
      (pool as any).query = jest.fn().mockImplementation((sql) => {
        return Promise.resolve([[true]]);
      });

      const response = await assetDao.create({
        name: "test1",
        status: 1,
        type: "image",
        note: "lorem ipsum",
        user_id: 1,
      });

      expect(typeof response).toBe("boolean");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("Should return string for getQueryForAssetList", async () => {
    try {
      (pool as any).promise = jest.fn().mockReturnThis();
      (pool as any).query = jest.fn().mockImplementation((sql) => {
        return "";
      });

      const response = await assetDao.getQueryForAssetList({});

      expect(typeof response).toBe("string");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });

  it("Should return number for getTotalAssetList", async () => {
    try {
      (pool as any).promise = jest.fn().mockReturnThis();
      (pool as any).query = jest.fn().mockImplementation((sql) => {
        return Promise.resolve([[1]]);
      });

      const response = await assetDao.getTotalAssetList({});
      expect(typeof response).toBe("number");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});
