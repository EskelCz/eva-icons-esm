<h1><img src="https://i.imgur.com/cXYo5bi.png"> Eva Icons</h1>

**Eva Icons** is a pack of more than 480 beautifully crafted Open Source icons for common actions and items. Additionally, Eva Icons supports 4 animation types: `zoom`, `pulse`, `shake` and `flip`. Icons are provided in two visual types: `Fill` and `Outline`.

## Installation

```
npm i eva-icons
```

## How to use

- Add the `data-eva` attribute with the icon name to an element:

```html
<i data-eva="github"></i>
```

- Import and call `replace()` to replace all `data-eva` elements with inline SVGs:

```html
<!DOCTYPE html>
<html lang="en">
  <title></title>
  <body>

    <i data-eva="github"></i>

    <script type="module">
      import { replace } from 'eva-icons';
      replace();
    </script>
  </body>
</html>
```

- Additional attributes:
  * `data-eva-fill`: set icon color
  * `data-eva-height`: set icon height
  * `data-eva-width`: set icon width
  * `data-eva-animation`: [set icon animation](#animation)

```html
<i data-eva="github" data-eva-fill="#ff0000" data-eva-height="48" data-eva-width="48"></i>
```

## Documentation

### `replace(options)`

Replaces all elements that have a `data-eva` attribute with SVG markup.

`options` optional object.

#### Available 'option' properties:
| Name |  Type   |  Default value | Description |
|------| ------  | -------------  |-------------|
| fill | string | none           | Icon color  |
| width | string or number | 24px    | Icon width  |
| height | string or number | 24px    | Icon height  |
| class | string | none | Custom css class  |
| animation | object | none    | [Icon animation](#animation)  |

### Animation

- Add the `data-eva-animation` attribute with the animation type `(zoom, pulse, shake and flip)` to an element:

```html
<i data-eva="github" data-eva-animation="zoom"></i>
```

- Additional animation attributes:
  * `data-eva-hover`: Makes the animation available on hover. Default value is `true`. Available true or false.
  * `data-eva-infinite`: Makes the animation infinite. Default value is `false`. Available true or false.

```html
<i data-eva="github" data-eva-animation="zoom" data-eva-hover="false" data-eva-infinite="true"></i>
```

> **Note:** In the above example `github icon` will be always animated. This type of animation will be applied only to current icons.

- Pass animation as property in a `replace` method.

```js
import { replace } from 'eva-icons';

replace({
  animation: {
    type: string, // zoom, pulse, shake, flip
    hover: boolean, // default true
    infinite: boolean, // default false
  }
});
```

> **Note:** The animation will be applied to all replaced elements.

- Add `eva-parent-hover` class to the parent container in a case you want to activate the animation hovering on the parent element.

```html
<div class="eva-parent-hover">
  <i data-eva="github" data-eva-animation="zoom"></i>
  Zoom animation
</div>
```

## License
[MIT](LICENSE.txt) license.
