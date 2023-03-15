/* eslint-disable no-unused-vars */
import { pool, AppError } from "../../helpers";
import { logger } from "../../logger";
import { UserDao } from "../user/user.dao";
import { AssetDao } from "./asset.dao";

/**
 * AssetService
 *
 */
export class AssetService {
  public async createAsset(assetDetails: any, files: any): Promise<any> {
    assetDetails.status = 1;
    assetDetails.user_id = assetDetails.loggedinUserId;

    const assetDao: AssetDao = new AssetDao();
    const result: any = await assetDao.create(assetDetails);

    if (result) {
      //get company details
      const userDao: UserDao = new UserDao();
      let resUser: any = await userDao.getCompanyByUserEmail(
        assetDetails.email
      );
      assetDetails.company_name = resUser.company_name;
      return assetDetails;
    } else {
      return false;
    }
  }

  public async getAssetList(params: any): Promise<any> {
    const assetDao: AssetDao = new AssetDao();
    const stmt: string = assetDao.getQueryForAssetList(params);
    const page = parseInt(params.page_number) || 1;
    const itemsPerPage =
      parseInt(params.page_size) || parseInt(process.env.page_size);
    const offset: number = page > 1 ? (page - 1) * itemsPerPage : 0;
    const assetResult: any = await pool
      .promise()
      .query(stmt, [offset, itemsPerPage]);
    if (assetResult[0].length === 0) {
      return [];
    }
    return assetResult[0];
  }
}
