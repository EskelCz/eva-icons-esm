/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import Svgo from 'svgo';

const defaultOptions = [
  { convertShapeToPath: false },
  { mergePaths: false },
  { inlineStyles: { onlyMatchedOnce: false } },
  { removeAttrs: { attrs: '(fill|stroke.*)' } },
  { removeTitle: true },
];

const optimizeSvg = (svg, options = []) => {
  const svgo = new Svgo({
    plugins: defaultOptions.concat(options),
  });

  return svgo.optimize(svg)
    .then(({ data }) => data );
};

export default optimizeSvg;
