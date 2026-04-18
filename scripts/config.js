/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config = {
  'convertOptions': {
    'png': {
      'sizes': ['128']
    }
  },
  'copy': [
    {
      'format': 'svg'
    },
  ],
  'srcPath': path.join(__dirname, `../package/icons`),
  'desPath': path.join(__dirname, `../package-build`),
  'defaultExtension': 'svg'
};

export default config;
