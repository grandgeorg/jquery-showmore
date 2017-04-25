# JQuery-Showmore

JQuery Plugin to hide and show parts of content in a container by changing the container's height.

The height is animated by CSS transition.

Window-resize events will be handled gracefully.

## Usage

See demo/index.html

Make sure to load jquery and to load ```dist/jquery.showmore.min.js```.
Then call the plugin with a jquery selector e.g.

```
$('#container').showmore({
    closedHeight: 70,
    buttonTextMore: 'Show more',
    buttonTextLess: 'Show less',
    buttonCssClass: 'showmore-button',
    animationSpeed: 0.5
});
```

## License

MIT License (MIT)

Copyright (c) 2017 Viktor Grandgeorg
