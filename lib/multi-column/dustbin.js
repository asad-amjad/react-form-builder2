"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

var _formElements = _interopRequireDefault(require("../form-elements"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function getSimpleElement(item, props) {
  if (!item) return null;
  var Element = _formElements["default"][item.element || item.key];
  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement(Element, _extends({}, props, {
    key: "form_".concat(item.id),
    data: item
  })));
}

function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '2rem',
    minWidth: '12rem',
    width: '100%',
    backgroundColor: backgroundColor,
    padding: 0,
    "float": 'left'
  };
}

var Dustbin = /*#__PURE__*/_react["default"].forwardRef(function (_ref, ref) {
  var greedy = _ref.greedy,
      isOver = _ref.isOver,
      isOverCurrent = _ref.isOverCurrent,
      connectDropTarget = _ref.connectDropTarget,
      items = _ref.items,
      col = _ref.col,
      getDataById = _ref.getDataById,
      rest = _objectWithoutProperties(_ref, ["greedy", "isOver", "isOverCurrent", "connectDropTarget", "items", "col", "getDataById"]);

  var item = getDataById(items[col]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      onDrop: function onDrop()
      /* dropped */
      {// const { data } = dropped;
        // console.log('onDrop', data);
      }
    };
  }, []);
  var backgroundColor = 'rgba(0, 0, 0, .03)';

  if (isOverCurrent || isOver && greedy) {
    backgroundColor = 'darkgreen';
  }

  var element = getSimpleElement(item, rest); // console.log('accepts, canDrop', accepts, canDrop);

  return connectDropTarget( /*#__PURE__*/_react["default"].createElement("div", {
    style: getStyle(backgroundColor)
  }, element));
});

var _default = (0, _reactDnd.DropTarget)(function (props) {
  return props.accepts;
}, {
  drop: function drop(props, monitor, component) {
    if (!component) {
      return;
    }

    var item = monitor.getItem();
    component.onDrop(item);

    if (item.data && typeof props.setAsChild === 'function') {
      var isNew = !item.data.id;
      var data = isNew ? item.onCreate(item.data) : item.data;
      props.setAsChild(props.data, data, props.col);
    }
  }
}, function (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({
      shallow: true
    }),
    canDrop: monitor.canDrop()
  };
})(Dustbin);

exports["default"] = _default;