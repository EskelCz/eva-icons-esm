import fs from 'fs-extra';
import path from 'path';

import fileSystemHelper from '../helpers/fs-helper.js';
import graphicsMagickHelper from '../helpers/gm-helper.js';
import TransformIcons from './transform-icons.js';

class TransformPngIcons extends TransformIcons {
  constructor(...args) {
    super(...args);
  }

  convertAndResizeSvgToPng() {
    const desFileName = `${fileSystemHelper.trimFileExtension(this.srcFile)}.${this.options.convertTo}`;
    const maxSize = Math.max(...this.options.sizes).toString();
    const desFolderPath = this.getAndMakeDesFolder(this.desPath, maxSize);
    const desFilePath = path.join(desFolderPath, desFileName);
    const writeStream = fs.createWriteStream(desFilePath);

    const writableStream = graphicsMagickHelper.convertSvgToPng(
      maxSize,
      this.options.convertTo,
      this.readableStream
    ).stream().pipe(writeStream);

    if (this.options.sizes === 1) {
      return ;
    }

    writableStream.on('finish', () => {
      // resize
      this.options.sizes.forEach((itemSize) => {
        if (itemSize === maxSize) {
          return;
        }

        const desFolderPath = this.getAndMakeDesFolder(this.desPath, itemSize);
        const desResizeFilePath = path.join(
          desFolderPath,
          desFileName,
        );
        const readableStream = fs.createReadStream(desFilePath);
        const writeStream = fs.createWriteStream(desResizeFilePath);

        graphicsMagickHelper.resize(
          itemSize,
          readableStream,
        ).stream().pipe(writeStream);
      });
    });
  }
}

export default TransformPngIcons;
