/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import fs from 'fs-extra';
import path from 'path';

import fileSystemHelper from '../helpers/fs-helper.js';

const getNewFileName = (srcFile, extension, postfix) => `${path.basename(srcFile, `.${extension}`)}-${postfix}.${extension}`;

const renameIcons = (srcPath, srcIcons, postfix, commonExtension) => {
  return Promise.all(srcIcons.map((srcFile) => {
    if (srcFile.indexOf(postfix) !== -1) {
      return srcFile;
    }

    let extension = commonExtension;

    if (!extension) {
      extension = fileSystemHelper.getExtension(srcFile);
    }

    const newFileName = getNewFileName(srcFile, extension, postfix);

    fs.renameSync(path.resolve(srcPath, srcFile), path.resolve(srcPath, newFileName));

    return newFileName;
  }));
};

export default renameIcons;
