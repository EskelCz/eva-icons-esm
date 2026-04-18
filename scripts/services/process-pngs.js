/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import path from 'path';

import config from '../config.js';
import TransformPngIcons from './transform-png-icons.js';

const processPngs = (srcFiles, srcPath, desPath) => {
  return Promise.all(srcFiles.map((srcFile) => {
    const srcFilePath = path.join(srcPath, srcFile);
    const fileTransformOptions = {
      convertTo: 'png',
      ...config.convertOptions.png,
    };
    const transformPng = new TransformPngIcons(srcFile, srcFilePath, desPath, fileTransformOptions);

    transformPng.convertAndResizeSvgToPng();
  }));
};

export default processPngs;
