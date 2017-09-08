"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
var _react = require("react"),
  _react2 = _interopRequireDefault(_react),
  _reactLinkify = require("react-linkify"),
  _reactLinkify2 = _interopRequireDefault(_reactLinkify);
function _interopRequireDefault(a) {
  return a && a.__esModule ? a : { default: a };
}
var StringParser = _react2.default.createClass({
  displayName: "StringParser",
  getInitialState: function getInitialState() {
    return { isMore: !1, text: [] };
  },
  componentDidMount: function componentDidMount() {
    this.createTextArr(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(a) {
    a.text != this.props.text && (this.createTextArr(a), console.log("hahaha"));
  },
  createTextArr: function createTextArr(a) {
    var b = [],
      c = [];
    a.text && (b = a.text.split("\n"));
    for (var d = 0; d < b.length; d++) {
      c.push({ text: b[d], newLine: !0 });
      var e = b[d],
        f = [];
      for (f.push(e); 200 < e.length; ) {
        e = f[0].substr(0, f[0].length / 2);
        for (var h, g = 0; g < f.length; g += 2) {
          for (h = f[g].length / 2; " " != f[g].charAt(h) && h < f[g].length; )
            h++;
          f.splice(g + 1, 0, f[g].substr(h)), f.splice(g, 1, f[g].substr(0, h));
        }
      }
      b.splice(d, 1, f[0]),
        c.splice(d, 1, { text: f[0], newLine: !(1 != f.length) });
      for (var k = 1; k < f.length; k++)
        b.splice(d + k, 0, f[k]),
          c.splice(d + k, 0, { text: f[k], newLine: k == f.length - 1 }),
          d++;
    }
    console.log(c), this.setState({ text: c });
  },
  render: function render() {
    var a = this;
    return _react2.default.createElement(
      "div",
      { style: { width: "100%", wordWrap: "break-word" } },
      this.state.text.map(
        function(b, c) {
          var d = this;
          return "" == b.text && (5 > c || this.state.isMore)
            ? _react2.default.createElement(
                "div",
                { style: { height: 10 }, className: "", key: c },
                b.text.replace(/ /g, "\xA0")
              )
            : 5 > c || this.state.isMore
              ? b.newLine
                ? _react2.default.createElement(
                    "span",
                    { key: c },
                    _react2.default.createElement(
                      _reactLinkify2.default,
                      null,
                      b.text
                    ),
                    _react2.default.createElement("div", null)
                  )
                : _react2.default.createElement(
                    _reactLinkify2.default,
                    { key: c },
                    b.text
                  )
              : 5 == c
                ? _react2.default.createElement(
                    "span",
                    {
                      key: c,
                      className: "cursor-pointer edittabs-indiv-tabs",
                      onClick: function onClick() {
                        d.setState({ isMore: !0 });
                      }
                    },
                    "...Read More"
                  )
                : void 0;
        }.bind(this)
      ),
      this.state.isMore
        ? _react2.default.createElement(
            "div",
            {
              className: "cursor-pointer edittabs-indiv-tabs",
              onClick: function onClick() {
                a.setState({ isMore: !1 });
              }
            },
            "...Show less"
          )
        : null
    );
  }
});
exports.default = StringParser;
