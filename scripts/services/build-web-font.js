/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { default as webfont } from 'webfont';
import path from 'path';
import fs from 'fs-extra';

import processScss from './process-scss.js';
import prepareSVGsForFonts from './web-font-process-svgs.js';
import config from '../config.js';
import fileSystemHelper from '../helpers/fs-helper.js';

const webFontOptions = {
  files: path.resolve(config.desPath, '**/icons/svg/*.svg'),
  fontName: 'Eva-Icons',
  template: 'css',
  templateFontName: 'Eva-Icons',
  templateClassName: 'eva',
  templateFontPath: './fonts',
  normalize: true,
  fontHeight: 600,
};

const buildFont = () => {
  const dest = path.join(config.desPath, '/style/fonts');
  const destTemplate = path.join(config.desPath, '/style');

  fileSystemHelper.mkDirByPathSync(dest);

  return prepareSVGsForFonts()
    .then(() => {
      return webfont(webFontOptions)
        .then((result) => {
          const { fontName, template } = result.config;

          return Promise.all(
            Object.keys(result).map(type => {
              if (
                type === 'config' ||
                type === 'usedBuildInTemplate' ||
                type === 'glyphsData'
              ) {
                return Promise.resolve();
              }

              const content = result[type];
              let file = null;

              if (type !== 'template') {
                file = path.resolve(dest, `${fontName}.${type}`);
              } else {
                file = path.resolve(destTemplate, `${fontName.toLowerCase()}.${template}`);
              }

              return fs.outputFile(file, content);
            }))
            .then(() => processScss())
            .then(() => fileSystemHelper.remove(path.join(config.desPath, '/style/icons')));
        });
  });
};

export default buildFont;
