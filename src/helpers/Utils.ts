
/**
 * Utils
 */

import * as _ from 'lodash'
import { pool } from './db'
export class Utils {
  public hasDuplicates (array: string[]): boolean {
    return (new Set(array)).size !== array.length
  }
}
