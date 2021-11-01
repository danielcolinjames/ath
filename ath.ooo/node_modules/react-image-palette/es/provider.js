var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import getImagePalette from "image-palette-core";

var ImagePaletteProvider = function (_React$Component) {
  _inherits(ImagePaletteProvider, _React$Component);

  function ImagePaletteProvider() {
    var _ref;

    _classCallCheck(this, ImagePaletteProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = ImagePaletteProvider.__proto__ || Object.getPrototypeOf(ImagePaletteProvider)).call.apply(_ref, [this].concat(args)));

    _this.state = { colors: null };
    _this.onImageload = _this.onImageload.bind(_this);
    _this.onImageError = _this.onImageError.bind(_this);
    return _this;
  }

  _createClass(ImagePaletteProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var image = this.image = new Image();
      image.crossOrigin = this.props.crossOrigin;
      image.src = this.props.image;
      image.onload = this.onImageload;
      image.onerror = this.onImageError;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }, {
    key: "onImageload",
    value: function onImageload() {
      var image = this.image;
      var colors = getImagePalette(this.image);
      this.setState({ colors: colors });
    }
  }, {
    key: "onImageError",
    value: function onImageError() {
      if (this.props.defaults) {
        this.setState({ colors: this.props.defaults });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var colors = this.state.colors;
      var _props = this.props,
          children = _props.children,
          render = _props.render;

      var callback = render || children;
      if (!callback) {
        throw new Error("ImagePaletteProvider expects a render callback either as a child or via the `render` prop");
      }
      return colors ? callback(colors) : null;
    }
  }]);

  return ImagePaletteProvider;
}(React.Component);

export default ImagePaletteProvider;