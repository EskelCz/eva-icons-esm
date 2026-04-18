/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import fs from 'fs-extra';
import path from 'path';

import config from '../config.js';
import buildSpriteString from './build-sprite-string.js';

const buildSprite = (folder) => {
  const prefix = folder.toLowerCase();
  const inFileName = `${prefix}-icons.json`;
  const outFileName = `${prefix}-sprite.svg`;
  const inFile = path.join(config.desPath, inFileName);
  const outFile = path.join(config.desPath, outFileName);

  return new Promise((resolve) => {
    const icons = JSON.parse(fs.readFileSync(inFile, 'utf-8'));

    console.log(`Building ${outFile}...`);

    fs.writeFileSync(outFile, buildSpriteString(icons));

    resolve();
  });
};

export default buildSprite;
