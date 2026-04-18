/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import fs from 'fs-extra';
import path from 'path';

import config from '../config.js';

const mergeIconsJSON = (files) => {
  const outFileName = 'eva-icons.json';
  const outFile = path.join(config.desPath, outFileName);

  return new Promise((resolve) => {
    const fileContent = files
      .filter(file => path.extname(file) === '.json')
      .reduce((result, item) => {
        const content = fs.readFileSync(path.join(config.desPath, item), 'utf-8');

        return  {
          ...result,
          ...JSON.parse(content),
        };
      }, {});

    console.log(`Building ${outFile}...`);

    fs.writeFileSync(outFile, JSON.stringify(fileContent));

    resolve();
  });
};

export default mergeIconsJSON;
