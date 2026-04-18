/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import gm from 'gm';

const gmImagick = gm.subClass({imageMagick: true});

const graphicsMagickHelper = {
  convertAndResize(size, format, srcPath) {
    return gmImagick(srcPath)
      .resize(size, size)
      .setFormat(format);
  },

  convert(format, srcPath) {
    return gmImagick(srcPath)
      .setFormat(format);
  },

  resize(size, srcPath) {
    return gmImagick(srcPath)
      .resize(size, size);
  },

  convertSvgToPng(size, format, srcPath) {
    return gmImagick(srcPath)
      .in('-size', `${size}x${size}`)
      .background('transparent')
      .setFormat(format);
  }
};

export default graphicsMagickHelper;
