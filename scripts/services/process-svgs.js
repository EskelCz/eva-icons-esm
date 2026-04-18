/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import fs from 'fs-extra';
import path from 'path';

import fileSystemHelper from '../helpers/fs-helper.js';
import optimizeSvg from './oprimize-svg.js';

const processSvgs = (svgFiles, srcPath, desPath) => {
  fileSystemHelper.mkDirByPathSync(desPath);

  return Promise.all(svgFiles.map((svgFile) => {
    const svgPath = path.join(srcPath, svgFile);
    const desSvgPath = path.join(desPath, svgFile);
    const svg = fs.readFileSync(svgPath);

    return optimizeSvg(svg, [ { removeHiddenElems: false } ])
      .then((processedSvg) => {
        fs.writeFileSync(desSvgPath, processedSvg);
      });
  }));
};

export default processSvgs;
