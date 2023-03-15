/* eslint-disable no-unused-vars */
import { pool, AppError } from "../../helpers";
import { Messages } from "../../constants";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../../logger";
import * as StatusCodes from "http-status-codes";
import { COMMON_ERROR } from "../../constants/constant";
import { IAsset } from "./asset.type";

/**
 * AssetDao
 *
 */
export class AssetDao {
  public async create(asset: IAsset): Promise<any> {
    try {
      const stmt: string =
        "INSERT INTO assets (uid, name, status, note, user_id) VALUES(?, ?, ?, ?y, ?);";
      const result: any = await pool
        .promise()
        .query(stmt, [
          uuidv4(),
          asset.name,
          asset.status,
          asset.note,
          asset.user_id,
        ]);
      if (!result || result.affectedRows < 1) {
        return false;
      }
      return true;
    } catch (e) {
      logger.error("Create Asset error", { err: e });
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        COMMON_ERROR.SOMETHING_BAD,
        Messages.SOMETHING_BAD
      );
    }
  }

  public getQueryForAssetList(params: any): string {
    let likeQuery: string = "";
    let allAssetSql: string = "";
    allAssetSql = `SELECT assets.*, users.name as user_name, companies.name as company_name from assets
    LEFT JOIN users ON assets.user_id = users.id LEFT JOIN companies ON users.company_id = companies.id`;
    if (params.company_id || params.asset_ids) {
      likeQuery += ` WHERE `;
    }
    if (params.company_id) {
      likeQuery += `companies.name IN ('${params.company_id}')`;
    }
    if (params.company_id && params.asset_ids) {
      likeQuery += ` AND `;
    }
    if (params.asset_ids) {
      likeQuery += `assets.id IN ('${params.asset_ids}')`;
    }

    return `${allAssetSql} ${likeQuery} LIMIT ?, ?`;
  }

  public async getTotalAssetList(params: any): Promise<number> {
    let likeQuery: string = "";
    let allAssetSql: string = "";
    allAssetSql = `SELECT assets.*, users.name as user_name, companies.name as company_name from assets LEFT JOIN users ON assets.user_id = users.id
    LEFT JOIN companies ON users.company_id = companies.id`;

    if (params.company_id || params.asset_ids) {
      likeQuery += ` WHERE `;
    }

    if (params.company_id) {
      likeQuery += `companies.name IN ('${params.company_id}')`;
    }

    if (params.company_id && params.asset_ids) {
      likeQuery += ` AND `;
    }

    if (params.asset_ids) {
      likeQuery += `assets.id IN ('${params.asset_ids}')`;
    }

    allAssetSql = `${allAssetSql} ${likeQuery}`;

    const result: any = await pool.promise().query(allAssetSql);
    if (result[0].length === 0) {
      return 0;
    }
    return result[0].length;
  }
}
