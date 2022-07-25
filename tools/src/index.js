// 导入所有的包

import bankersRounding  from './modules/bankersRounding';
import copyNewValue  from './modules/copyNewValue'
import getFileAndDownload from './modules/getFileAndDownload'
import { version } from '../package.json';

export default{
  version: version,
  bankersRounding,
  copyNewValue,
  getFileAndDownload
};
