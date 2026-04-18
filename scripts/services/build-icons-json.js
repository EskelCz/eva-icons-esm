/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import fs from 'fs-extra';
import path from 'path';

import config from '../config.js';
import buildIconsObject from './build-icons-object.js';

const getSvg = srcPath => svgFile => fs.readFileSync(path.join(srcPath, svgFile));

const buildIconsJSON = (srcIcons, srcPath, folder) => {
  const prefix = folder.toLowerCase();
  const outFileName = `${prefix}-icons.json`;
  const outFile = path.resolve(config.desPath, outFileName);

  return new Promise((resolve) => {
    const icons = buildIconsObject(srcIcons, getSvg(srcPath));

    console.log(`Building ${outFile}...`);

    fs.writeFileSync(outFile, JSON.stringify(icons));

    resolve();
  });
};

export default buildIconsJSON;
