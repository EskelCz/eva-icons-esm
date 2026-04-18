/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import fs from 'fs-extra';
import globby from 'globby';
import path from 'path';

import config from '../config.js';
import fileSystemHelper from '../helpers/fs-helper.js';
import optimizeSvg from './oprimize-svg.js';

const prepareSVGsForFonts = () => {
  const srcPath = path.resolve(config.desPath, '**/svg/*.svg');
  const destPath = path.join(config.desPath, '/style/icons/svg');

  fileSystemHelper.mkDirByPathSync(destPath);

  return globby([srcPath])
    .then(foundFiles => {
      return Promise.all(foundFiles.map((svgFile) => {
        const filesName = path.basename(svgFile);
        const desSvgPath = path.join(destPath, filesName);
        const svg = fs.readFileSync(svgFile);

        return optimizeSvg(svg)
          .then((processedSvg) => {
            fs.writeFileSync(desSvgPath, processedSvg);
          });
      }));
    });
};

export default prepareSVGsForFonts;
