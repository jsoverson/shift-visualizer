!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.shift=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// istanbul ignore next
"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

// istanbul ignore next

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

require("es6-map/implement");

var _objectAssign = require("object-assign");

var objectAssign = _objectAssign;

var _multimap = require("multimap");

var MultiMap = _multimap;

// FIXME: remove this when collections/multi-map is working
MultiMap.prototype.addEach = function (otherMap) {
  var _this2 = this;

  otherMap.forEachEntry(function (v, k) {
    _this2.set.apply(_this2, [k].concat(v));
  });
  return this;
};

var identity = undefined; // initialised below EarlyErrorState

var EarlyErrorState = (function () {
  function EarlyErrorState() {
    _classCallCheck(this, EarlyErrorState);

    this.errors = [];
    // errors that are only errors in strict mode code
    this.strictErrors = [];

    // Label values used in LabeledStatement nodes; cleared at function boundaries
    this.usedLabelNames = [];

    // BreakStatement nodes; cleared at iteration; switch; and function boundaries
    this.freeBreakStatements = [];
    // ContinueStatement nodes; cleared at
    this.freeContinueStatements = [];

    // labeled BreakStatement nodes; cleared at LabeledStatement with same Label and function boundaries
    this.freeLabeledBreakStatements = [];
    // labeled ContinueStatement nodes; cleared at labeled iteration statement with same Label and function boundaries
    this.freeLabeledContinueStatements = [];

    // NewTargetExpression nodes; cleared at function (besides arrow expression) boundaries
    this.newTargetExpressions = [];

    // BindingIdentifier nodes; cleared at containing declaration node
    this.boundNames = new MultiMap();
    // BindingIdentifiers that were found to be in a lexical binding position
    this.lexicallyDeclaredNames = new MultiMap();
    // BindingIdentifiers that were the name of a FunctionDeclaration
    this.functionDeclarationNames = new MultiMap();
    // BindingIdentifiers that were found to be in a variable binding position
    this.varDeclaredNames = new MultiMap();
    // BindingIdentifiers that were found to be in a variable binding position
    this.forOfVarDeclaredNames = [];

    // Names that this module exports
    this.exportedNames = new MultiMap();
    // Locally declared names that are referenced in export declarations
    this.exportedBindings = new MultiMap();

    // CallExpressions with Super callee
    this.superCallExpressions = [];
    // SuperCall expressions in the context of a Method named "constructor"
    this.superCallExpressionsInConstructorMethod = [];
    // MemberExpressions with Super object
    this.superPropertyExpressions = [];
  }

  _createClass(EarlyErrorState, [{
    key: "addFreeBreakStatement",
    value: function addFreeBreakStatement(s) {
      this.freeBreakStatements.push(s);
      return this;
    }
  }, {
    key: "addFreeLabeledBreakStatement",
    value: function addFreeLabeledBreakStatement(s) {
      this.freeLabeledBreakStatements.push(s);
      return this;
    }
  }, {
    key: "clearFreeBreakStatements",
    value: function clearFreeBreakStatements() {
      this.freeBreakStatements = [];
      return this;
    }
  }, {
    key: "addFreeContinueStatement",
    value: function addFreeContinueStatement(s) {
      this.freeContinueStatements.push(s);
      return this;
    }
  }, {
    key: "addFreeLabeledContinueStatement",
    value: function addFreeLabeledContinueStatement(s) {
      this.freeLabeledContinueStatements.push(s);
      return this;
    }
  }, {
    key: "clearFreeContinueStatements",
    value: function clearFreeContinueStatements() {
      this.freeContinueStatements = [];
      return this;
    }
  }, {
    key: "enforceFreeBreakStatementErrors",
    value: function enforceFreeBreakStatementErrors(createError) {
      [].push.apply(this.errors, this.freeBreakStatements.map(createError));
      this.freeBreakStatements = [];
      return this;
    }
  }, {
    key: "enforceFreeLabeledBreakStatementErrors",
    value: function enforceFreeLabeledBreakStatementErrors(createError) {
      [].push.apply(this.errors, this.freeLabeledBreakStatements.map(createError));
      this.freeLabeledBreakStatements = [];
      return this;
    }
  }, {
    key: "enforceFreeContinueStatementErrors",
    value: function enforceFreeContinueStatementErrors(createError) {
      [].push.apply(this.errors, this.freeContinueStatements.map(createError));
      this.freeContinueStatements = [];
      return this;
    }
  }, {
    key: "enforceFreeLabeledContinueStatementErrors",
    value: function enforceFreeLabeledContinueStatementErrors(createError) {
      [].push.apply(this.errors, this.freeLabeledContinueStatements.map(createError));
      this.freeLabeledContinueStatements = [];
      return this;
    }
  }, {
    key: "observeIterationLabel",
    value: function observeIterationLabel(label) {
      this.usedLabelNames.push(label);
      this.freeLabeledBreakStatements = this.freeLabeledBreakStatements.filter(function (s) {
        return s.label !== label;
      });
      this.freeLabeledContinueStatements = this.freeLabeledContinueStatements.filter(function (s) {
        return s.label !== label;
      });
      return this;
    }
  }, {
    key: "observeNonIterationLabel",
    value: function observeNonIterationLabel(label) {
      this.usedLabelNames.push(label);
      this.freeLabeledBreakStatements = this.freeLabeledBreakStatements.filter(function (s) {
        return s.label !== label;
      });
      return this;
    }
  }, {
    key: "clearUsedLabelNames",
    value: function clearUsedLabelNames() {
      this.usedLabelNames = [];
      return this;
    }
  }, {
    key: "observeSuperCallExpression",
    value: function observeSuperCallExpression(node) {
      this.superCallExpressions.push(node);
      return this;
    }
  }, {
    key: "observeConstructorMethod",
    value: function observeConstructorMethod() {
      this.superCallExpressionsInConstructorMethod = this.superCallExpressions;
      this.superCallExpressions = [];
      return this;
    }
  }, {
    key: "clearSuperCallExpressionsInConstructorMethod",
    value: function clearSuperCallExpressionsInConstructorMethod() {
      this.superCallExpressionsInConstructorMethod = [];
      return this;
    }
  }, {
    key: "enforceSuperCallExpressions",
    value: function enforceSuperCallExpressions(createError) {
      [].push.apply(this.errors, this.superCallExpressions.map(createError));
      [].push.apply(this.errors, this.superCallExpressionsInConstructorMethod.map(createError));
      this.superCallExpressions = [];
      this.superCallExpressionsInConstructorMethod = [];
      return this;
    }
  }, {
    key: "enforceSuperCallExpressionsInConstructorMethod",
    value: function enforceSuperCallExpressionsInConstructorMethod(createError) {
      [].push.apply(this.errors, this.superCallExpressionsInConstructorMethod.map(createError));
      this.superCallExpressionsInConstructorMethod = [];
      return this;
    }
  }, {
    key: "observeSuperPropertyExpression",
    value: function observeSuperPropertyExpression(node) {
      this.superPropertyExpressions.push(node);
      return this;
    }
  }, {
    key: "clearSuperPropertyExpressions",
    value: function clearSuperPropertyExpressions() {
      this.superPropertyExpressions = [];
      return this;
    }
  }, {
    key: "enforceSuperPropertyExpressions",
    value: function enforceSuperPropertyExpressions(createError) {
      [].push.apply(this.errors, this.superPropertyExpressions.map(createError));
      this.superPropertyExpressions = [];
      return this;
    }
  }, {
    key: "observeNewTargetExpression",
    value: function observeNewTargetExpression(node) {
      this.newTargetExpressions.push(node);
      return this;
    }
  }, {
    key: "clearNewTargetExpressions",
    value: function clearNewTargetExpressions() {
      this.newTargetExpressions = [];
      return this;
    }
  }, {
    key: "bindName",
    value: function bindName(name, node) {
      this.boundNames.set(name, node);
      return this;
    }
  }, {
    key: "clearBoundNames",
    value: function clearBoundNames() {
      this.boundNames = new MultiMap();
      return this;
    }
  }, {
    key: "observeLexicalDeclaration",
    value: function observeLexicalDeclaration() {
      this.lexicallyDeclaredNames.addEach(this.boundNames);
      this.boundNames = new MultiMap();
      return this;
    }
  }, {
    key: "observeLexicalBoundary",
    value: function observeLexicalBoundary() {
      this.previousLexicallyDeclaredNames = this.lexicallyDeclaredNames;
      this.lexicallyDeclaredNames = new MultiMap();
      this.functionDeclarationNames = new MultiMap();
      return this;
    }
  }, {
    key: "enforceDuplicateLexicallyDeclaredNames",
    value: function enforceDuplicateLexicallyDeclaredNames(createError) {
      var _this3 = this;

      this.lexicallyDeclaredNames.forEachEntry(function (nodes /*, bindingName*/) {
        if (nodes.length > 1) {
          nodes.slice(1).forEach(function (dupeNode) {
            _this3.addError(createError(dupeNode));
          });
        }
      });
      return this;
    }
  }, {
    key: "enforceConflictingLexicallyDeclaredNames",
    value: function enforceConflictingLexicallyDeclaredNames(otherNames, createError) {
      var _this4 = this;

      this.lexicallyDeclaredNames.forEachEntry(function (nodes, bindingName) {
        if (otherNames.has(bindingName)) {
          nodes.forEach(function (conflictingNode) {
            _this4.addError(createError(conflictingNode));
          });
        }
      });
      return this;
    }
  }, {
    key: "observeFunctionDeclaration",
    value: function observeFunctionDeclaration() {
      this.observeVarBoundary();
      this.functionDeclarationNames.addEach(this.boundNames);
      this.boundNames = new MultiMap();
      return this;
    }
  }, {
    key: "functionDeclarationNamesAreLexical",
    value: function functionDeclarationNamesAreLexical() {
      this.lexicallyDeclaredNames.addEach(this.functionDeclarationNames);
      this.functionDeclarationNames = new MultiMap();
      return this;
    }
  }, {
    key: "observeVarDeclaration",
    value: function observeVarDeclaration() {
      this.varDeclaredNames.addEach(this.boundNames);
      this.boundNames = new MultiMap();
      return this;
    }
  }, {
    key: "recordForOfVars",
    value: function recordForOfVars() {
      var _this5 = this;

      this.varDeclaredNames.forEach(function (bindingIdentifier) {
        _this5.forOfVarDeclaredNames.push(bindingIdentifier);
      });
      return this;
    }
  }, {
    key: "observeVarBoundary",
    value: function observeVarBoundary() {
      this.lexicallyDeclaredNames = new MultiMap();
      this.functionDeclarationNames = new MultiMap();
      this.varDeclaredNames = new MultiMap();
      this.forOfVarDeclaredNames = [];
      return this;
    }
  }, {
    key: "exportName",
    value: function exportName(name, node) {
      this.exportedNames.set(name, node);
      return this;
    }
  }, {
    key: "exportDeclaredNames",
    value: function exportDeclaredNames() {
      this.exportedNames.addEach(this.lexicallyDeclaredNames).addEach(this.varDeclaredNames);
      this.exportedBindings.addEach(this.lexicallyDeclaredNames).addEach(this.varDeclaredNames);
      return this;
    }
  }, {
    key: "exportBinding",
    value: function exportBinding(name, node) {
      this.exportedBindings.set(name, node);
      return this;
    }
  }, {
    key: "addError",
    value: function addError(e) {
      this.errors.push(e);
      return this;
    }
  }, {
    key: "addStrictError",
    value: function addStrictError(e) {
      this.strictErrors.push(e);
      return this;
    }
  }, {
    key: "enforceStrictErrors",
    value: function enforceStrictErrors() {
      [].push.apply(this.errors, this.strictErrors);
      this.strictErrors = [];
      return this;
    }
  }, {
    key: "concat",
    value: function concat(s) {
      if (this === identity) return s;
      if (s === identity) return this;
      [].push.apply(this.errors, s.errors);
      [].push.apply(this.strictErrors, s.strictErrors);
      [].push.apply(this.usedLabelNames, s.usedLabelNames);
      [].push.apply(this.freeBreakStatements, s.freeBreakStatements);
      [].push.apply(this.freeContinueStatements, s.freeContinueStatements);
      [].push.apply(this.freeLabeledBreakStatements, s.freeLabeledBreakStatements);
      [].push.apply(this.freeLabeledContinueStatements, s.freeLabeledContinueStatements);
      [].push.apply(this.newTargetExpressions, s.newTargetExpressions);
      this.boundNames.addEach(s.boundNames);
      this.lexicallyDeclaredNames.addEach(s.lexicallyDeclaredNames);
      this.functionDeclarationNames.addEach(s.functionDeclarationNames);
      this.varDeclaredNames.addEach(s.varDeclaredNames);
      [].push.apply(this.forOfVarDeclaredNames, s.forOfVarDeclaredNames);
      this.exportedNames.addEach(s.exportedNames);
      this.exportedBindings.addEach(s.exportedBindings);
      [].push.apply(this.superCallExpressions, s.superCallExpressions);
      [].push.apply(this.superCallExpressionsInConstructorMethod, s.superCallExpressionsInConstructorMethod);
      [].push.apply(this.superPropertyExpressions, s.superPropertyExpressions);
      return this;
    }
  }], [{
    key: "empty",

    // MONOID IMPLEMENTATION

    value: function empty() {
      return identity;
    }
  }]);

  return EarlyErrorState;
})();

exports.EarlyErrorState = EarlyErrorState;

identity = new EarlyErrorState();
Object.getOwnPropertyNames(EarlyErrorState.prototype).forEach(function (methodName) {
  if (methodName === "constructor") return;
  Object.defineProperty(identity, methodName, {
    value: function value() {
      return EarlyErrorState.prototype[methodName].apply(new EarlyErrorState(), arguments);
    },
    enumerable: false,
    writable: true,
    configurable: true });
});

var EarlyError = (function (_Error) {
  function EarlyError(node, message) {
    _classCallCheck(this, EarlyError);

    _get(Object.getPrototypeOf(EarlyError.prototype), "constructor", this).call(this, message);
    this.node = node;
    this.message = message;
  }

  _inherits(EarlyError, _Error);

  return EarlyError;
})(Error);

exports.EarlyError = EarlyError;
},{"es6-map/implement":8,"multimap":68,"object-assign":69}],2:[function(require,module,exports){
// istanbul ignore next
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _shiftReducer = require("shift-reducer");

var _utils = require("./utils");

var _earlyErrorState = require("./early-error-state");

var _patternAcceptor = require("./pattern-acceptor");

function isStrictFunctionBody(_ref) {
  var directives = _ref.directives;

  return directives.some(function (directive) {
    return directive.rawValue === "use strict";
  });
}

function containsDuplicates(list) {
  var uniqs = [];
  for (var i = 0, l = list.length; i < l; ++i) {
    var item = list[i];
    if (uniqs.indexOf(item) >= 0) {
      return true;
    }
    uniqs.push(item);
  }
  return false;
}

function isValidSimpleAssignmentTarget(node) {
  switch (node.type) {
    case "IdentifierExpression":
    case "ComputedMemberExpression":
    case "StaticMemberExpression":
      return true;
  }
  return false;
}

function isLabelledFunction(_x4) {
  var _left;

  var _again2 = true;

  _function2: while (_again2) {
    _again2 = false;
    var node = _x4;

    if (!(_left = node.type === "LabeledStatement")) {
      return _left;
    }

    if (_left = node.body.type === "FunctionDeclaration") {
      return _left;
    }

    _x4 = node.body;
    _again2 = true;
    continue _function2;
  }
}

function isIterationStatement(_x5) {
  var _again3 = true;

  _function3: while (_again3) {
    _again3 = false;
    var node = _x5;

    switch (node.type) {
      case "LabeledStatement":
        _x5 = node.body;
        _again3 = true;
        continue _function3;

      case "DoWhileStatement":
      case "ForInStatement":
      case "ForOfStatement":
      case "ForStatement":
      case "WhileStatement":
        return true;
    }
    return false;
  }
}

function isSpecialMethod(methodDefinition) {
  if (methodDefinition.name.type !== "StaticPropertyName" || methodDefinition.name.value !== "constructor") {
    return false;
  }
  switch (methodDefinition.type) {
    case "Getter":
    case "Setter":
      return true;
    case "Method":
      return methodDefinition.isGenerator;
  }
  /* istanbul ignore next */
  throw new Error("not reached");
}

function enforceDuplicateConstructorMethods(node, s) {
  var ctors = node.elements.filter(function (e) {
    return !e.isStatic && e.method.type === "Method" && !e.method.isGenerator && e.method.name.type === "StaticPropertyName" && e.method.name.value === "constructor";
  });
  if (ctors.length > 1) {
    ctors.slice(1).forEach(function (ctor) {
      s = s.addError(new _earlyErrorState.EarlyError(ctor, "Duplicate constructor method in class"));
    });
  }
  return s;
}

var SUPERCALL_ERROR = function SUPERCALL_ERROR(node) {
  return new _earlyErrorState.EarlyError(node, "Calls to super must be in the \"constructor\" method of a class expression or class declaration that has a superclass");
};
var SUPERPROPERTY_ERROR = function SUPERPROPERTY_ERROR(node) {
  return new _earlyErrorState.EarlyError(node, "Member access on super must be in a method");
};
var DUPLICATE_BINDING = function DUPLICATE_BINDING(node) {
  return new _earlyErrorState.EarlyError(node, "Duplicate binding " + JSON.stringify(node.name));
};
var FREE_CONTINUE = function FREE_CONTINUE(node) {
  return new _earlyErrorState.EarlyError(node, "Continue statement must be nested within an iteration statement");
};
var UNBOUND_CONTINUE = function UNBOUND_CONTINUE(node) {
  return new _earlyErrorState.EarlyError(node, "Continue statement must be nested within an iteration statement with label " + JSON.stringify(node.label));
};
var FREE_BREAK = function FREE_BREAK(node) {
  return new _earlyErrorState.EarlyError(node, "Break statement must be nested within an iteration statement or a switch statement");
};
var UNBOUND_BREAK = function UNBOUND_BREAK(node) {
  return new _earlyErrorState.EarlyError(node, "Break statement must be nested within a statement with label " + JSON.stringify(node.label));
};

var EarlyErrorChecker = (function (_MonoidalReducer) {
  function EarlyErrorChecker() {
    _classCallCheck(this, EarlyErrorChecker);

    _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "constructor", this).call(this, _earlyErrorState.EarlyErrorState);
  }

  _inherits(EarlyErrorChecker, _MonoidalReducer);

  _createClass(EarlyErrorChecker, [{
    key: "reduceAssignmentExpression",
    value: function reduceAssignmentExpression() {
      return _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceAssignmentExpression", this).apply(this, arguments).clearBoundNames();
    }
  }, {
    key: "reduceArrowExpression",
    value: function reduceArrowExpression(node, _ref2) {
      var params = _ref2.params;
      var body = _ref2.body;

      params = params.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      if (node.body.type === "FunctionBody") {
        body = body.enforceConflictingLexicallyDeclaredNames(params.lexicallyDeclaredNames, DUPLICATE_BINDING);
        if (isStrictFunctionBody(node.body)) {
          params = params.enforceStrictErrors();
          body = body.enforceStrictErrors();
        }
      }
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceArrowExpression", this).call(this, node, { params: params, body: body });
      s = s.observeVarBoundary();
      return s;
    }
  }, {
    key: "reduceBindingIdentifier",
    value: function reduceBindingIdentifier(node) {
      var s = this.identity;
      if (_utils.isRestrictedWord(node.name) || _utils.isStrictModeReservedWord(node.name)) {
        s = s.addStrictError(new _earlyErrorState.EarlyError(node, "The identifier " + JSON.stringify(node.name) + " must not be in binding position in strict mode"));
      }
      return s.bindName(node.name, node);
    }
  }, {
    key: "reduceBlock",
    value: function reduceBlock() {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceBlock", this).apply(this, arguments);
      s = s.functionDeclarationNamesAreLexical();
      s = s.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      s = s.enforceConflictingLexicallyDeclaredNames(s.varDeclaredNames, DUPLICATE_BINDING);
      s = s.observeLexicalBoundary();
      return s;
    }
  }, {
    key: "reduceBreakStatement",
    value: function reduceBreakStatement(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceBreakStatement", this).apply(this, arguments);
      s = node.label == null ? s.addFreeBreakStatement(node) : s.addFreeLabeledBreakStatement(node);
      return s;
    }
  }, {
    key: "reduceCallExpression",
    value: function reduceCallExpression(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceCallExpression", this).apply(this, arguments);
      if (node.callee.type === "Super") {
        s = s.observeSuperCallExpression(node);
      }
      return s;
    }
  }, {
    key: "reduceCatchClause",
    value: function reduceCatchClause(node, _ref3) {
      var binding = _ref3.binding;
      var body = _ref3.body;

      binding = binding.observeLexicalDeclaration();
      binding = binding.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      binding = binding.enforceConflictingLexicallyDeclaredNames(body.previousLexicallyDeclaredNames, DUPLICATE_BINDING);
      binding.lexicallyDeclaredNames.forEachEntry(function (nodes, bindingName) {
        if (body.varDeclaredNames.has(bindingName)) {
          body.varDeclaredNames.get(bindingName).forEach(function (conflictingNode) {
            if (body.forOfVarDeclaredNames.indexOf(conflictingNode) >= 0) {
              binding = binding.addError(DUPLICATE_BINDING(conflictingNode));
            }
          });
        }
      });
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceCatchClause", this).call(this, node, { binding: binding, body: body });
      s = s.observeLexicalBoundary();
      return s;
    }
  }, {
    key: "reduceClassDeclaration",
    value: function reduceClassDeclaration(node, _ref4) {
      var name = _ref4.name;
      var _super = _ref4["super"];
      var elements = _ref4.elements;

      var s = name;
      var sElements = this.fold(elements);
      sElements = sElements.enforceStrictErrors();
      if (node["super"] != null) {
        s = this.append(s, _super);
        sElements = sElements.clearSuperCallExpressionsInConstructorMethod();
      }
      sElements = sElements.enforceSuperCallExpressions(SUPERCALL_ERROR);
      sElements = sElements.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
      s = this.append(s, sElements);
      s = enforceDuplicateConstructorMethods(node, s);
      s = s.observeLexicalDeclaration();
      return s;
    }
  }, {
    key: "reduceClassElement",
    value: function reduceClassElement(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceClassElement", this).apply(this, arguments);
      if (!node.isStatic && isSpecialMethod(node.method)) {
        s = s.addError(new _earlyErrorState.EarlyError(node, "Constructors cannot be generators, getters or setters"));
      }
      if (node.isStatic && node.method.name.type === "StaticPropertyName" && node.method.name.value === "prototype") {
        s = s.addError(new _earlyErrorState.EarlyError(node, "Static class methods cannot be named \"prototype\""));
      }
      return s;
    }
  }, {
    key: "reduceClassExpression",
    value: function reduceClassExpression(node, _ref5) {
      var name = _ref5.name;
      var _super = _ref5["super"];
      var elements = _ref5.elements;

      var s = node.name == null ? this.identity : name;
      var sElements = this.fold(elements);
      sElements = sElements.enforceStrictErrors();
      if (node["super"] != null) {
        s = this.append(s, _super);
        sElements = sElements.clearSuperCallExpressionsInConstructorMethod();
      }
      sElements = sElements.enforceSuperCallExpressions(SUPERCALL_ERROR);
      sElements = sElements.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
      s = this.append(s, sElements);
      s = enforceDuplicateConstructorMethods(node, s);
      s = s.clearBoundNames();
      return s;
    }
  }, {
    key: "reduceComputedMemberExpression",
    value: function reduceComputedMemberExpression(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceComputedMemberExpression", this).apply(this, arguments);
      if (node.object.type === "Super") {
        s = s.observeSuperPropertyExpression(node);
      }
      return s;
    }
  }, {
    key: "reduceContinueStatement",
    value: function reduceContinueStatement(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceContinueStatement", this).apply(this, arguments);
      s = node.label == null ? s.addFreeContinueStatement(node) : s.addFreeLabeledContinueStatement(node);
      return s;
    }
  }, {
    key: "reduceDoWhileStatement",
    value: function reduceDoWhileStatement(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceDoWhileStatement", this).apply(this, arguments);
      if (isLabelledFunction(node.body)) {
        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a do-while statement must not be a labeled function declaration"));
      }
      s = s.clearFreeContinueStatements();
      s = s.clearFreeBreakStatements();
      return s;
    }
  }, {
    key: "reduceExport",
    value: function reduceExport() {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceExport", this).apply(this, arguments);
      s = s.functionDeclarationNamesAreLexical();
      s = s.exportDeclaredNames();
      return s;
    }
  }, {
    key: "reduceExportSpecifier",
    value: function reduceExportSpecifier(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceExportSpecifier", this).apply(this, arguments);
      s = s.exportName(node.exportedName, node);
      s = s.exportBinding(node.name || node.exportedName, node);
      return s;
    }
  }, {
    key: "reduceExportDefault",
    value: function reduceExportDefault(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceExportDefault", this).apply(this, arguments);
      s = s.functionDeclarationNamesAreLexical();
      switch (node.body.type) {
        case "FunctionDeclaration":
        case "ClassDeclaration":
          if (node.body.name.name !== "*default*") {
            s = s.exportDeclaredNames();
          }
          break;
      }
      s = s.exportName("*default*", node);
      return s;
    }
  }, {
    key: "reduceFormalParameters",
    value: function reduceFormalParameters() {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceFormalParameters", this).apply(this, arguments);
      s = s.observeLexicalDeclaration();
      return s;
    }
  }, {
    key: "reduceForStatement",
    value: function reduceForStatement(node, _ref6) {
      var init = _ref6.init;
      var test = _ref6.test;
      var update = _ref6.update;
      var body = _ref6.body;

      if (init != null) {
        init = init.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
        init = init.enforceConflictingLexicallyDeclaredNames(body.varDeclaredNames, DUPLICATE_BINDING);
      }
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceForStatement", this).call(this, node, { init: init, test: test, update: update, body: body });
      if (node.init != null && node.init.type === "VariableDeclaration" && node.init.kind === "const") {
        node.init.declarators.forEach(function (declarator) {
          if (declarator.init == null) {
            s = s.addError(new _earlyErrorState.EarlyError(declarator, "Constant lexical declarations must have an initialiser"));
          }
        });
      }
      if (isLabelledFunction(node.body)) {
        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a for statement must not be a labeled function declaration"));
      }
      s = s.clearFreeContinueStatements();
      s = s.clearFreeBreakStatements();
      s = s.observeLexicalBoundary();
      return s;
    }
  }, {
    key: "reduceForInStatement",
    value: function reduceForInStatement(node, _ref7) {
      var left = _ref7.left;
      var right = _ref7.right;
      var body = _ref7.body;

      left = left.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      left = left.enforceConflictingLexicallyDeclaredNames(body.varDeclaredNames, DUPLICATE_BINDING);
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceForInStatement", this).call(this, node, { left: left, right: right, body: body });
      if (isLabelledFunction(node.body)) {
        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a for-in statement must not be a labeled function declaration"));
      }
      s = s.clearFreeContinueStatements();
      s = s.clearFreeBreakStatements();
      s = s.observeLexicalBoundary();
      return s;
    }
  }, {
    key: "reduceForOfStatement",
    value: function reduceForOfStatement(node, _ref8) {
      var left = _ref8.left;
      var right = _ref8.right;
      var body = _ref8.body;

      left = left.recordForOfVars();
      left = left.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      left = left.enforceConflictingLexicallyDeclaredNames(body.varDeclaredNames, DUPLICATE_BINDING);
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceForOfStatement", this).call(this, node, { left: left, right: right, body: body });
      if (isLabelledFunction(node.body)) {
        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a for-of statement must not be a labeled function declaration"));
      }
      s = s.clearFreeContinueStatements();
      s = s.clearFreeBreakStatements();
      s = s.observeLexicalBoundary();
      return s;
    }
  }, {
    key: "reduceFunctionBody",
    value: function reduceFunctionBody(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceFunctionBody", this).apply(this, arguments);
      s = s.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      s = s.enforceConflictingLexicallyDeclaredNames(s.varDeclaredNames, DUPLICATE_BINDING);
      s = s.enforceFreeContinueStatementErrors(FREE_CONTINUE);
      s = s.enforceFreeLabeledContinueStatementErrors(UNBOUND_CONTINUE);
      s = s.enforceFreeBreakStatementErrors(FREE_BREAK);
      s = s.enforceFreeLabeledBreakStatementErrors(UNBOUND_BREAK);
      s = s.clearUsedLabelNames();
      if (isStrictFunctionBody(node)) {
        s = s.enforceStrictErrors();
      }
      return s;
    }
  }, {
    key: "reduceFunctionDeclaration",
    value: function reduceFunctionDeclaration(node, _ref9) {
      var name = _ref9.name;
      var params = _ref9.params;
      var body = _ref9.body;

      var isSimpleParameterList = node.params.rest == null && node.params.items.every(function (i) {
        return i.type === "BindingIdentifier";
      });
      var addError = !isSimpleParameterList || node.isGenerator ? "addError" : "addStrictError";
      params.lexicallyDeclaredNames.forEachEntry(function (nodes /*, bindingName*/) {
        if (nodes.length > 1) {
          nodes.slice(1).forEach(function (dupeNode) {
            params = params[addError](DUPLICATE_BINDING(dupeNode));
          });
        }
      });
      body = body.enforceConflictingLexicallyDeclaredNames(params.lexicallyDeclaredNames, DUPLICATE_BINDING);
      body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
      body = body.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
      params = params.enforceSuperCallExpressions(SUPERCALL_ERROR);
      params = params.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
      body = body.clearNewTargetExpressions();
      if (isStrictFunctionBody(node.body)) {
        params = params.enforceStrictErrors();
        body = body.enforceStrictErrors();
      }
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceFunctionDeclaration", this).call(this, node, { name: name, params: params, body: body });
      s = s.observeFunctionDeclaration();
      return s;
    }
  }, {
    key: "reduceFunctionExpression",
    value: function reduceFunctionExpression(node, _ref10) {
      var name = _ref10.name;
      var params = _ref10.params;
      var body = _ref10.body;

      var isSimpleParameterList = node.params.rest == null && node.params.items.every(function (i) {
        return i.type === "BindingIdentifier";
      });
      var addError = !isSimpleParameterList || node.isGenerator ? "addError" : "addStrictError";
      params.lexicallyDeclaredNames.forEachEntry(function (nodes, bindingName) {
        if (nodes.length > 1) {
          nodes.slice(1).forEach(function (dupeNode) {
            params = params[addError](new _earlyErrorState.EarlyError(dupeNode, "Duplicate binding " + JSON.stringify(bindingName)));
          });
        }
      });
      body = body.enforceConflictingLexicallyDeclaredNames(params.lexicallyDeclaredNames, DUPLICATE_BINDING);
      body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
      body = body.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
      params = params.enforceSuperCallExpressions(SUPERCALL_ERROR);
      params = params.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
      body = body.clearNewTargetExpressions();
      if (isStrictFunctionBody(node.body)) {
        params = params.enforceStrictErrors();
        body = body.enforceStrictErrors();
      }
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceFunctionExpression", this).call(this, node, { name: name, params: params, body: body });
      s = s.clearBoundNames();
      s = s.observeVarBoundary();
      return s;
    }
  }, {
    key: "reduceGetter",
    value: function reduceGetter(node, _ref11) {
      var name = _ref11.name;
      var body = _ref11.body;

      body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
      body = body.clearSuperPropertyExpressions();
      body = body.clearNewTargetExpressions();
      if (isStrictFunctionBody(node.body)) {
        body = body.enforceStrictErrors();
      }
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceGetter", this).call(this, node, { name: name, body: body });
      s = s.observeVarBoundary();
      return s;
    }
  }, {
    key: "reduceIdentifierExpression",
    value: function reduceIdentifierExpression(node) {
      var s = this.identity;
      if (_utils.isStrictModeReservedWord(node.name)) {
        s = s.addStrictError(new _earlyErrorState.EarlyError(node, "The identifier " + JSON.stringify(node.name) + " must not be in expression position in strict mode"));
      }
      return s;
    }
  }, {
    key: "reduceIfStatement",
    value: function reduceIfStatement(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceIfStatement", this).apply(this, arguments);
      if (isLabelledFunction(node.consequent)) {
        s = s.addError(new _earlyErrorState.EarlyError(node.consequent, "The consequent of an if statement must not be a labeled function declaration"));
      }
      if (node.alternate != null && isLabelledFunction(node.alternate)) {
        s = s.addError(new _earlyErrorState.EarlyError(node.alternate, "The alternate of an if statement must not be a labeled function declaration"));
      }
      return s;
    }
  }, {
    key: "reduceImport",
    value: function reduceImport() {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceImport", this).apply(this, arguments);
      s = s.observeLexicalDeclaration();
      return s;
    }
  }, {
    key: "reduceImportNamespace",
    value: function reduceImportNamespace() {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceImportNamespace", this).apply(this, arguments);
      s = s.observeLexicalDeclaration();
      return s;
    }
  }, {
    key: "reduceLabeledStatement",
    value: function reduceLabeledStatement(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceLabeledStatement", this).apply(this, arguments);
      if (node.label === "yield") {
        s = s.addStrictError(new _earlyErrorState.EarlyError(node, "The identifier " + JSON.stringify(node.label) + " must not be in label position in strict mode"));
      }
      if (s.usedLabelNames.indexOf(node.label) >= 0) {
        s = s.addError(new _earlyErrorState.EarlyError(node, "Label " + JSON.stringify(node.label) + " has already been declared"));
      }
      if (node.body.type === "FunctionDeclaration") {
        s = s.addStrictError(new _earlyErrorState.EarlyError(node, "Labeled FunctionDeclarations are disallowed in strict mode"));
      }
      s = isIterationStatement(node.body) ? s.observeIterationLabel(node.label) : s.observeNonIterationLabel(node.label);
      return s;
    }
  }, {
    key: "reduceLiteralRegExpExpression",
    value: function reduceLiteralRegExpExpression(node) {
      var s = this.identity;
      // NOTE: the RegExp pattern acceptor is disabled until we have more confidence in its correctness (more tests)
      //if (!PatternAcceptor.test(node.pattern, node.flags.indexOf("u") >= 0)) {
      //  s = s.addError(new EarlyError(node, "Invalid regular expression pattern"));
      //}
      if (!/^[igmyu]*$/.test(node.flags) || containsDuplicates(node.flags)) {
        s = s.addError(new _earlyErrorState.EarlyError(node, "Invalid regular expression flags"));
      }
      return s;
    }
  }, {
    key: "reduceMethod",
    value: function reduceMethod(node, _ref12) {
      var name = _ref12.name;
      var params = _ref12.params;
      var body = _ref12.body;

      params = params.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      body = body.enforceConflictingLexicallyDeclaredNames(params.lexicallyDeclaredNames, DUPLICATE_BINDING);
      if (node.name.type === "StaticPropertyName" && node.name.value === "constructor") {
        body = body.observeConstructorMethod();
        params = params.observeConstructorMethod();
      } else {
        body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
        params = params.enforceSuperCallExpressions(SUPERCALL_ERROR);
      }
      body = body.clearSuperPropertyExpressions();
      params = params.clearSuperPropertyExpressions();
      body = body.clearNewTargetExpressions();
      if (isStrictFunctionBody(node.body)) {
        params = params.enforceStrictErrors();
        body = body.enforceStrictErrors();
      }
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceMethod", this).call(this, node, { name: name, params: params, body: body });
      s = s.observeVarBoundary();
      return s;
    }
  }, {
    key: "reduceModule",
    value: function reduceModule() {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceModule", this).apply(this, arguments);
      s = s.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      s = s.enforceConflictingLexicallyDeclaredNames(s.varDeclaredNames, DUPLICATE_BINDING);
      s.exportedNames.forEachEntry(function (nodes, bindingName) {
        if (nodes.length > 1) {
          nodes.slice(1).forEach(function (dupeNode) {
            s = s.addError(new _earlyErrorState.EarlyError(dupeNode, "Duplicate export " + JSON.stringify(bindingName)));
          });
        }
      });
      s.exportedBindings.forEachEntry(function (nodes, bindingName) {
        if (bindingName !== "*default*" && !s.lexicallyDeclaredNames.has(bindingName) && !s.varDeclaredNames.has(bindingName)) {
          nodes.forEach(function (undeclaredNode) {
            s = s.addError(new _earlyErrorState.EarlyError(undeclaredNode, "Exported binding " + JSON.stringify(bindingName) + " is not declared"));
          });
        }
      });
      s.newTargetExpressions.forEach(function (node) {
        s = s.addError(new _earlyErrorState.EarlyError(node, "new.target must be within function (but not arrow expression) code"));
      });
      s = s.enforceFreeContinueStatementErrors(FREE_CONTINUE);
      s = s.enforceFreeLabeledContinueStatementErrors(UNBOUND_CONTINUE);
      s = s.enforceFreeBreakStatementErrors(FREE_BREAK);
      s = s.enforceFreeLabeledBreakStatementErrors(UNBOUND_BREAK);
      s = s.enforceSuperCallExpressions(SUPERCALL_ERROR);
      s = s.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
      s = s.enforceStrictErrors();
      return s;
    }
  }, {
    key: "reduceNewTargetExpression",
    value: function reduceNewTargetExpression(node) {
      return this.identity.observeNewTargetExpression(node);
    }
  }, {
    key: "reduceObjectExpression",
    value: function reduceObjectExpression(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceObjectExpression", this).apply(this, arguments);
      s = s.enforceSuperCallExpressionsInConstructorMethod(SUPERCALL_ERROR);
      var protos = node.properties.filter(function (p) {
        return p.type === "DataProperty" && p.name.type === "StaticPropertyName" && p.name.value === "__proto__";
      });
      protos.slice(1).forEach(function (n) {
        s = s.addError(new _earlyErrorState.EarlyError(n, "Duplicate __proto__ property in object literal not allowed"));
      });
      return s;
    }
  }, {
    key: "reducePostfixExpression",
    value: function reducePostfixExpression(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reducePostfixExpression", this).apply(this, arguments);
      switch (node.operator) {
        case "++":
        case "--":
          if (!isValidSimpleAssignmentTarget(node.operand)) {
            s = s.addError(new _earlyErrorState.EarlyError(node, "Increment/decrement target must be an identifier or member expression"));
          }
          break;
      }
      return s;
    }
  }, {
    key: "reducePrefixExpression",
    value: function reducePrefixExpression(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reducePrefixExpression", this).apply(this, arguments);
      switch (node.operator) {
        case "++":
        case "--":
          if (!isValidSimpleAssignmentTarget(node.operand)) {
            s = s.addError(new _earlyErrorState.EarlyError(node, "Increment/decrement target must be an identifier or member expression"));
          }
          break;
        case "delete":
          if (node.operand.type === "IdentifierExpression") {
            s = s.addStrictError(new _earlyErrorState.EarlyError(node, "Identifier expressions must not be deleted in strict mode"));
          }
          break;
      }
      return s;
    }
  }, {
    key: "reduceScript",
    value: function reduceScript() {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceScript", this).apply(this, arguments);
      s = s.enforceSuperCallExpressions(SUPERCALL_ERROR);
      s = s.enforceSuperPropertyExpressions(SUPERPROPERTY_ERROR);
      s.newTargetExpressions.forEach(function (node) {
        s = s.addError(new _earlyErrorState.EarlyError(node, "new.target must be within function (but not arrow expression) code"));
      });
      return s;
    }
  }, {
    key: "reduceSetter",
    value: function reduceSetter(node, _ref13) {
      var name = _ref13.name;
      var param = _ref13.param;
      var body = _ref13.body;

      param = param.observeLexicalDeclaration();
      param = param.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      body = body.enforceConflictingLexicallyDeclaredNames(param.lexicallyDeclaredNames, DUPLICATE_BINDING);
      param = param.enforceSuperCallExpressions(SUPERCALL_ERROR);
      body = body.enforceSuperCallExpressions(SUPERCALL_ERROR);
      param = param.clearSuperPropertyExpressions();
      body = body.clearSuperPropertyExpressions();
      body = body.clearNewTargetExpressions();
      if (isStrictFunctionBody(node.body)) {
        param = param.enforceStrictErrors();
        body = body.enforceStrictErrors();
      }
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceSetter", this).call(this, node, { name: name, param: param, body: body });
      s = s.observeVarBoundary();
      return s;
    }
  }, {
    key: "reduceStaticMemberExpression",
    value: function reduceStaticMemberExpression(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceStaticMemberExpression", this).apply(this, arguments);
      if (node.object.type === "Super") {
        s = s.observeSuperPropertyExpression(node);
      }
      return s;
    }
  }, {
    key: "reduceSwitchStatement",
    value: function reduceSwitchStatement(node, _ref14) {
      var discriminant = _ref14.discriminant;
      var cases = _ref14.cases;

      var sCases = this.fold(cases);
      sCases = sCases.functionDeclarationNamesAreLexical();
      sCases = sCases.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      sCases = sCases.enforceConflictingLexicallyDeclaredNames(sCases.varDeclaredNames, DUPLICATE_BINDING);
      sCases = sCases.observeLexicalBoundary();
      var s = this.append(discriminant, sCases);
      s = s.clearFreeBreakStatements();
      return s;
    }
  }, {
    key: "reduceSwitchStatementWithDefault",
    value: function reduceSwitchStatementWithDefault(node, _ref15) {
      var discriminant = _ref15.discriminant;
      var preDefaultCases = _ref15.preDefaultCases;
      var defaultCase = _ref15.defaultCase;
      var postDefaultCases = _ref15.postDefaultCases;

      var sCases = this.append(defaultCase, this.append(this.fold(preDefaultCases), this.fold(postDefaultCases)));
      sCases = sCases.functionDeclarationNamesAreLexical();
      sCases = sCases.enforceDuplicateLexicallyDeclaredNames(DUPLICATE_BINDING);
      sCases = sCases.enforceConflictingLexicallyDeclaredNames(sCases.varDeclaredNames, DUPLICATE_BINDING);
      sCases = sCases.observeLexicalBoundary();
      var s = this.append(discriminant, sCases);
      s = s.clearFreeBreakStatements();
      return s;
    }
  }, {
    key: "reduceVariableDeclaration",
    value: function reduceVariableDeclaration(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceVariableDeclaration", this).apply(this, arguments);
      switch (node.kind) {
        case "const":
        case "let":
          {
            s = s.observeLexicalDeclaration();
            if (s.lexicallyDeclaredNames.has("let")) {
              s.lexicallyDeclaredNames.get("let").forEach(function (n) {
                s = s.addError(new _earlyErrorState.EarlyError(n, "Lexical declarations must not have a binding named \"let\""));
              });
            }
            break;
          }
        case "var":
          s = s.observeVarDeclaration();
          break;
      }
      return s;
    }
  }, {
    key: "reduceVariableDeclarationStatement",
    value: function reduceVariableDeclarationStatement(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceVariableDeclarationStatement", this).apply(this, arguments);
      if (node.declaration.kind === "const") {
        node.declaration.declarators.forEach(function (declarator) {
          if (declarator.init == null) {
            s = s.addError(new _earlyErrorState.EarlyError(declarator, "Constant lexical declarations must have an initialiser"));
          }
        });
      }
      return s;
    }
  }, {
    key: "reduceWhileStatement",
    value: function reduceWhileStatement(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceWhileStatement", this).apply(this, arguments);
      if (isLabelledFunction(node.body)) {
        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a while statement must not be a labeled function declaration"));
      }
      s = s.clearFreeContinueStatements().clearFreeBreakStatements();
      return s;
    }
  }, {
    key: "reduceWithStatement",
    value: function reduceWithStatement(node) {
      var s = _get(Object.getPrototypeOf(EarlyErrorChecker.prototype), "reduceWithStatement", this).apply(this, arguments);
      if (isLabelledFunction(node.body)) {
        s = s.addError(new _earlyErrorState.EarlyError(node.body, "The body of a with statement must not be a labeled function declaration"));
      }
      s = s.addStrictError(new _earlyErrorState.EarlyError(node, "Strict mode code must not include a with statement"));
      return s;
    }
  }], [{
    key: "check",
    value: function check(node) {
      return _shiftReducer["default"](new EarlyErrorChecker(), node).errors;
    }
  }]);

  return EarlyErrorChecker;
})(_shiftReducer.MonoidalReducer);

exports.EarlyErrorChecker = EarlyErrorChecker;
},{"./early-error-state":1,"./pattern-acceptor":5,"./utils":7,"shift-reducer":71}],3:[function(require,module,exports){
/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var ErrorMessages = {
  UNEXPECTED_TOKEN: "Unexpected token {0}",
  UNEXPECTED_ILLEGAL_TOKEN: "Unexpected {0}",
  UNEXPECTED_NUMBER: "Unexpected number",
  UNEXPECTED_STRING: "Unexpected string",
  UNEXPECTED_IDENTIFIER: "Unexpected identifier",
  UNEXPECTED_RESERVED_WORD: "Unexpected reserved word",
  UNEXPECTED_EOS: "Unexpected end of input",
  UNEXPECTED_LINE_TERMINATOR: "Unexpected line terminator",
  NEWLINE_AFTER_THROW: "Illegal newline after throw",
  UNTERMINATED_REGEXP: "Invalid regular expression: missing /",
  INVALID_REGEXP_FLAGS: "Invalid regular expression flags",
  INVALID_LHS_IN_ASSIGNMENT: "Invalid left-hand side in assignment",
  INVALID_LHS_IN_FOR_IN: "Invalid left-hand side in for-in",
  INVALID_LHS_IN_FOR_OF: "Invalid left-hand side in for-of",
  MULTIPLE_DEFAULTS_IN_SWITCH: "More than one default clause in switch statement",
  NO_CATCH_OR_FINALLY: "Missing catch or finally after try",
  ILLEGAL_RETURN: "Illegal return statement",
  ILLEGAL_ARROW_FUNCTION_PARAMS: "Illegal arrow function parameter list",
  INVALID_VAR_INIT_FOR_IN: "Invalid variable declaration in for-in statement",
  INVALID_VAR_INIT_FOR_OF: "Invalid variable declaration in for-of statement",
  ILLEGAL_PROPERTY: "Illegal property initializer" };
exports.ErrorMessages = ErrorMessages;
},{}],4:[function(require,module,exports){
// istanbul ignore next
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _errors = require("./errors");

var _tokenizer = require("./tokenizer");

// Empty parameter list for ArrowExpression
var ARROW_EXPRESSION_PARAMS = "CoverParenthesizedExpressionAndArrowParameterList";

var Precedence = {
  Sequence: 0,
  Yield: 1,
  Assignment: 1,
  Conditional: 2,
  ArrowFunction: 2,
  LogicalOR: 3,
  LogicalAND: 4,
  BitwiseOR: 5,
  BitwiseXOR: 6,
  BitwiseAND: 7,
  Equality: 8,
  Relational: 9,
  BitwiseSHIFT: 10,
  Additive: 11,
  Multiplicative: 12,
  Unary: 13,
  Postfix: 14,
  Call: 15,
  New: 16,
  TaggedTemplate: 17,
  Member: 18,
  Primary: 19 };

var BinaryPrecedence = {
  "||": Precedence.LogicalOR,
  "&&": Precedence.LogicalAND,
  "|": Precedence.BitwiseOR,
  "^": Precedence.BitwiseXOR,
  "&": Precedence.BitwiseAND,
  "==": Precedence.Equality,
  "!=": Precedence.Equality,
  "===": Precedence.Equality,
  "!==": Precedence.Equality,
  "<": Precedence.Relational,
  ">": Precedence.Relational,
  "<=": Precedence.Relational,
  ">=": Precedence.Relational,
  "in": Precedence.Relational,
  "instanceof": Precedence.Relational,
  "<<": Precedence.BitwiseSHIFT,
  ">>": Precedence.BitwiseSHIFT,
  ">>>": Precedence.BitwiseSHIFT,
  "+": Precedence.Additive,
  "-": Precedence.Additive,
  "*": Precedence.Multiplicative,
  "%": Precedence.Multiplicative,
  "/": Precedence.Multiplicative };

function copyLocation(from, to) {
  if ("loc" in from) {
    to.loc = from.loc;
  }
  return to;
}

function isValidSimpleAssignmentTarget(node) {
  switch (node.type) {
    case "IdentifierExpression":
    case "ComputedMemberExpression":
    case "StaticMemberExpression":
      return true;
  }
  return false;
}

function transformDestructuring(node) {
  switch (node.type) {
    case "ObjectExpression":
      return copyLocation(node, {
        type: "ObjectBinding",
        properties: node.properties.map(transformDestructuring) });
    case "DataProperty":
      return copyLocation(node, {
        type: "BindingPropertyProperty",
        name: node.name,
        binding: transformDestructuring(node.expression) });
    case "ShorthandProperty":
      return copyLocation(node, {
        type: "BindingPropertyIdentifier",
        binding: copyLocation(node, { type: "BindingIdentifier", name: node.name }),
        init: null });
    case "ArrayExpression":
      var last = node.elements[node.elements.length - 1];
      if (last != null && last.type === "SpreadElement") {
        return copyLocation(node, {
          type: "ArrayBinding",
          elements: node.elements.slice(0, -1).map(function (e) {
            return e && transformDestructuring(e);
          }),
          restElement: copyLocation(last.expression, transformDestructuring(last.expression)) });
      } else {
        return copyLocation(node, {
          type: "ArrayBinding",
          elements: node.elements.map(function (e) {
            return e && transformDestructuring(e);
          }),
          restElement: null });
      }
      /* istanbul ignore next */
      break;
    case "AssignmentExpression":
      return copyLocation(node, {
        type: "BindingWithDefault",
        binding: transformDestructuring(node.binding),
        init: node.expression });
    case "IdentifierExpression":
      return copyLocation(node, { type: "BindingIdentifier", name: node.name });
    case "StaticPropertyName":
      return copyLocation(node, { type: "BindingIdentifier", name: node.value });
    case "ComputedMemberExpression":
    case "StaticMemberExpression":
    case "ArrayBinding":
    case "BindingIdentifier":
    case "BindingPropertyIdentifier":
    case "BindingPropertyProperty":
    case "BindingWithDefault":
    case "ObjectBinding":
      return node;
    // istanbul ignore next
    default:
      throw new Error("Not reached");
  }
}

function isPrefixOperator(type) {
  switch (type) {
    case _tokenizer.TokenType.INC:
    case _tokenizer.TokenType.DEC:
    case _tokenizer.TokenType.ADD:
    case _tokenizer.TokenType.SUB:
    case _tokenizer.TokenType.BIT_NOT:
    case _tokenizer.TokenType.NOT:
    case _tokenizer.TokenType.DELETE:
    case _tokenizer.TokenType.VOID:
    case _tokenizer.TokenType.TYPEOF:
      return true;
  }
  return false;
}

var Parser = (function (_Tokenizer) {
  function Parser(source) {
    _classCallCheck(this, Parser);

    _get(Object.getPrototypeOf(Parser.prototype), "constructor", this).call(this, source);
    this.allowIn = true;
    this.inFunctionBody = false;
    this.inGeneratorParameter = false;
    this.inParameter = false;
    this.inGeneratorBody = false;
    this.allowYieldExpression = false;
    this.module = false;

    // Cover grammar
    this.isBindingElement = true;
    this.isAssignmentTarget = true;
    this.firstExprError = null;
  }

  _inherits(Parser, _Tokenizer);

  _createClass(Parser, [{
    key: "match",
    value: function match(subType) {
      return this.lookahead.type === subType;
    }
  }, {
    key: "eat",
    value: function eat(tokenType) {
      if (this.lookahead.type === tokenType) {
        return this.lex();
      }
    }
  }, {
    key: "expect",
    value: function expect(tokenType) {
      if (this.lookahead.type === tokenType) {
        return this.lex();
      }
      throw this.createUnexpected(this.lookahead);
    }
  }, {
    key: "matchContextualKeyword",
    value: function matchContextualKeyword(keyword) {
      return this.lookahead.type === _tokenizer.TokenType.IDENTIFIER && this.lookahead.value === keyword;
    }
  }, {
    key: "expectContextualKeyword",
    value: function expectContextualKeyword(keyword) {
      if (this.lookahead.type === _tokenizer.TokenType.IDENTIFIER && this.lookahead.value === keyword) {
        return this.lex();
      } else {
        throw this.createUnexpected(this.lookahead);
      }
    }
  }, {
    key: "eatContextualKeyword",
    value: function eatContextualKeyword(keyword) {
      if (this.lookahead.type === _tokenizer.TokenType.IDENTIFIER && this.lookahead.value === keyword) {
        return this.lex();
      }
    }
  }, {
    key: "consumeSemicolon",
    value: function consumeSemicolon() {
      if (this.hasLineTerminatorBeforeNext) return;
      if (this.eat(_tokenizer.TokenType.SEMICOLON)) return;
      if (!this.eof() && !this.match(_tokenizer.TokenType.RBRACE)) {
        throw this.createUnexpected(this.lookahead);
      }
    }
  }, {
    key: "markLocation",

    // this is a no-op, reserved for future use
    value: function markLocation(node /*, startLocation*/) {
      return node;
    }
  }, {
    key: "parseModule",
    value: function parseModule() {
      this.module = true;
      this.lookahead = this.advance();

      var startLocation = this.getLocation();
      var items = [];
      while (!this.eof()) {
        items.push(this.parseModuleItem());
      }
      return this.markLocation({ type: "Module", items: items }, startLocation);
    }
  }, {
    key: "parseScript",
    value: function parseScript() {
      this.lookahead = this.advance();

      var startLocation = this.getLocation();
      var body = this.parseBody();
      if (!this.match(_tokenizer.TokenType.EOS)) {
        throw this.createUnexpected(this.lookahead);
      }
      return this.markLocation({ type: "Script", body: body }, startLocation);
    }
  }, {
    key: "parseFunctionBody",
    value: function parseFunctionBody() {
      var startLocation = this.getLocation();

      var oldInFunctionBody = this.inFunctionBody;
      var oldModule = this.module;
      this.inFunctionBody = true;
      this.module = false;

      this.expect(_tokenizer.TokenType.LBRACE);
      var body = this.markLocation(this.parseBody(), startLocation);
      this.expect(_tokenizer.TokenType.RBRACE);

      this.inFunctionBody = oldInFunctionBody;
      this.module = oldModule;

      return body;
    }
  }, {
    key: "parseBody",
    value: function parseBody() {
      var startLocation = this.getLocation();

      var directives = [],
          statements = [],
          parsingDirectives = true;

      while (true) {
        if (this.eof() || this.match(_tokenizer.TokenType.RBRACE)) break;
        var _token = this.lookahead;
        var text = _token.slice.text;
        var isStringLiteral = _token.type === _tokenizer.TokenType.STRING;
        var directiveLocation = this.getLocation();
        var stmt = this.parseStatementListItem();
        if (parsingDirectives) {
          if (isStringLiteral && stmt.type === "ExpressionStatement" && stmt.expression.type === "LiteralStringExpression") {
            directives.push(this.markLocation({ type: "Directive", rawValue: text.slice(1, -1) }, directiveLocation));
          } else {
            parsingDirectives = false;
            statements.push(stmt);
          }
        } else {
          statements.push(stmt);
        }
      }

      return this.markLocation({ type: "FunctionBody", directives: directives, statements: statements }, startLocation);
    }
  }, {
    key: "parseImportSpecifier",
    value: function parseImportSpecifier() {
      var startLocation = this.getLocation(),
          name = undefined;
      if (this.match(_tokenizer.TokenType.IDENTIFIER) || this.match(_tokenizer.TokenType.YIELD) || this.match(_tokenizer.TokenType.LET)) {
        name = this.parseIdentifier();
        if (!this.eatContextualKeyword("as")) {
          return this.markLocation({
            type: "ImportSpecifier",
            name: null,
            binding: this.markLocation({ type: "BindingIdentifier", name: name }, startLocation) }, startLocation);
        }
      } else if (this.lookahead.type.klass.isIdentifierName) {
        name = this.parseIdentifierName();
        this.expectContextualKeyword("as");
      }

      return this.markLocation({ type: "ImportSpecifier", name: name, binding: this.parseBindingIdentifier() }, startLocation);
    }
  }, {
    key: "parseNameSpaceBinding",
    value: function parseNameSpaceBinding() {
      this.expect(_tokenizer.TokenType.MUL);
      this.expectContextualKeyword("as");
      return this.parseBindingIdentifier();
    }
  }, {
    key: "parseNamedImports",
    value: function parseNamedImports() {
      var result = [];
      this.expect(_tokenizer.TokenType.LBRACE);
      while (!this.eat(_tokenizer.TokenType.RBRACE)) {
        result.push(this.parseImportSpecifier());
        if (!this.eat(_tokenizer.TokenType.COMMA)) {
          this.expect(_tokenizer.TokenType.RBRACE);
          break;
        }
      }
      return result;
    }
  }, {
    key: "parseFromClause",
    value: function parseFromClause() {
      this.expectContextualKeyword("from");
      var value = this.expect(_tokenizer.TokenType.STRING).str;
      this.consumeSemicolon();
      return value;
    }
  }, {
    key: "parseImportDeclaration",
    value: function parseImportDeclaration() {
      var startLocation = this.getLocation(),
          defaultBinding = null,
          moduleSpecifier = undefined;
      this.expect(_tokenizer.TokenType.IMPORT);
      switch (this.lookahead.type) {
        case _tokenizer.TokenType.STRING:
          moduleSpecifier = this.lex().str;
          this.consumeSemicolon();
          return this.markLocation({ type: "Import", defaultBinding: null, namedImports: [], moduleSpecifier: moduleSpecifier }, startLocation);
        case _tokenizer.TokenType.IDENTIFIER:
        case _tokenizer.TokenType.YIELD:
        case _tokenizer.TokenType.LET:
          defaultBinding = this.parseBindingIdentifier();
          if (!this.eat(_tokenizer.TokenType.COMMA)) {
            return this.markLocation({ type: "Import", defaultBinding: defaultBinding, namedImports: [], moduleSpecifier: this.parseFromClause() }, startLocation);
          }
          break;
      }
      if (this.match(_tokenizer.TokenType.MUL)) {
        return this.markLocation({
          type: "ImportNamespace",
          defaultBinding: defaultBinding,
          namespaceBinding: this.parseNameSpaceBinding(),
          moduleSpecifier: this.parseFromClause() }, startLocation);
      } else if (this.match(_tokenizer.TokenType.LBRACE)) {
        return this.markLocation({
          type: "Import",
          defaultBinding: defaultBinding,
          namedImports: this.parseNamedImports(),
          moduleSpecifier: this.parseFromClause() }, startLocation);
      } else {
        throw this.createUnexpected(this.lookahead);
      }
    }
  }, {
    key: "parseExportSpecifier",
    value: function parseExportSpecifier() {
      var startLocation = this.getLocation();
      var name = this.parseIdentifier();
      if (this.eatContextualKeyword("as")) {
        var exportedName = this.parseIdentifierName();
        return this.markLocation({ type: "ExportSpecifier", name: name, exportedName: exportedName }, startLocation);
      }
      return this.markLocation({ type: "ExportSpecifier", name: null, exportedName: name }, startLocation);
    }
  }, {
    key: "parseExportClause",
    value: function parseExportClause() {
      this.expect(_tokenizer.TokenType.LBRACE);
      var result = [];
      while (!this.eat(_tokenizer.TokenType.RBRACE)) {
        result.push(this.parseExportSpecifier());
        if (!this.eat(_tokenizer.TokenType.COMMA)) {
          this.expect(_tokenizer.TokenType.RBRACE);
          break;
        }
      }
      return result;
    }
  }, {
    key: "parseExportDeclaration",
    value: function parseExportDeclaration() {
      var startLocation = this.getLocation(),
          decl = undefined;
      this.expect(_tokenizer.TokenType.EXPORT);
      switch (this.lookahead.type) {
        case _tokenizer.TokenType.MUL:
          this.lex();
          // export * FromClause ;
          decl = { type: "ExportAllFrom", moduleSpecifier: this.parseFromClause() };
          break;
        case _tokenizer.TokenType.LBRACE:
          // export ExportClause FromClause ;
          // export ExportClause ;
          var namedExports = this.parseExportClause();
          var moduleSpecifier = null;
          if (this.matchContextualKeyword("from")) {
            moduleSpecifier = this.parseFromClause();
          }
          decl = { type: "ExportFrom", namedExports: namedExports, moduleSpecifier: moduleSpecifier };
          break;
        case _tokenizer.TokenType.CLASS:
          // export ClassDeclaration
          decl = { type: "Export", declaration: this.parseClass({ isExpr: false, inDefault: false }) };
          break;
        case _tokenizer.TokenType.FUNCTION:
          // export HoistableDeclaration
          decl = { type: "Export", declaration: this.parseFunction({ isExpr: false, inDefault: false, allowGenerator: true }) };
          break;
        case _tokenizer.TokenType.DEFAULT:
          this.lex();
          switch (this.lookahead.type) {
            case _tokenizer.TokenType.FUNCTION:
              // export default HoistableDeclaration[Default]
              decl = {
                type: "ExportDefault",
                body: this.parseFunction({ isExpr: false, inDefault: true, allowGenerator: true }) };
              break;
            case _tokenizer.TokenType.CLASS:
              // export default ClassDeclaration[Default]
              decl = { type: "ExportDefault", body: this.parseClass({ isExpr: false, inDefault: true }) };
              break;
            default:
              {
                // export default [lookahead ∉ {function, class}] AssignmentExpression[In] ;
                decl = { type: "ExportDefault", body: this.parseAssignmentExpression() };
                break;
              }
          }
          break;
        case _tokenizer.TokenType.VAR:
        case _tokenizer.TokenType.LET:
        case _tokenizer.TokenType.CONST:
          // export LexicalDeclaration
          decl = { type: "Export", declaration: this.parseVariableDeclaration(true) };
          this.consumeSemicolon();
          break;
        default:
          throw this.createUnexpected(this.lookahead);
      }
      return this.markLocation(decl, startLocation);
    }
  }, {
    key: "parseModuleItem",
    value: function parseModuleItem() {
      switch (this.lookahead.type) {
        case _tokenizer.TokenType.IMPORT:
          return this.parseImportDeclaration();
        case _tokenizer.TokenType.EXPORT:
          return this.parseExportDeclaration();
        default:
          return this.parseStatementListItem();
      }
    }
  }, {
    key: "lookaheadLexicalDeclaration",
    value: function lookaheadLexicalDeclaration() {
      if (this.match(_tokenizer.TokenType.LET) || this.match(_tokenizer.TokenType.CONST)) {
        var lexerState = this.saveLexerState();
        this.lex();
        if (this.match(_tokenizer.TokenType.IDENTIFIER) || this.match(_tokenizer.TokenType.YIELD) || this.match(_tokenizer.TokenType.LET) || this.match(_tokenizer.TokenType.LBRACE) || this.match(_tokenizer.TokenType.LBRACK)) {
          this.restoreLexerState(lexerState);
          return true;
        } else {
          this.restoreLexerState(lexerState);
        }
      }
      return false;
    }
  }, {
    key: "parseStatementListItem",
    value: function parseStatementListItem() {
      if (this.eof()) throw this.createUnexpected(this.lookahead);

      switch (this.lookahead.type) {
        case _tokenizer.TokenType.FUNCTION:
          return this.parseFunction({ isExpr: false, inDefault: false, allowGenerator: true });
        case _tokenizer.TokenType.CLASS:
          return this.parseClass({ isExpr: false, inDefault: false });
        default:
          if (this.lookaheadLexicalDeclaration()) {
            var startLocation = this.getLocation();
            return this.markLocation(this.parseVariableDeclarationStatement(), startLocation);
          } else {
            return this.parseStatement();
          }
      }
    }
  }, {
    key: "parseStatement",
    value: function parseStatement() {
      var startLocation = this.getLocation();
      var stmt = this.isolateCoverGrammar(this.parseStatementHelper);
      return this.markLocation(stmt, startLocation);
    }
  }, {
    key: "parseStatementHelper",
    value: function parseStatementHelper() {
      if (this.eof()) {
        throw this.createUnexpected(this.lookahead);
      }

      switch (this.lookahead.type) {
        case _tokenizer.TokenType.SEMICOLON:
          return this.parseEmptyStatement();
        case _tokenizer.TokenType.LBRACE:
          return this.parseBlockStatement();
        case _tokenizer.TokenType.LPAREN:
          return this.parseExpressionStatement();
        case _tokenizer.TokenType.BREAK:
          return this.parseBreakStatement();
        case _tokenizer.TokenType.CONTINUE:
          return this.parseContinueStatement();
        case _tokenizer.TokenType.DEBUGGER:
          return this.parseDebuggerStatement();
        case _tokenizer.TokenType.DO:
          return this.parseDoWhileStatement();
        case _tokenizer.TokenType.FOR:
          return this.parseForStatement();
        case _tokenizer.TokenType.IF:
          return this.parseIfStatement();
        case _tokenizer.TokenType.RETURN:
          return this.parseReturnStatement();
        case _tokenizer.TokenType.SWITCH:
          return this.parseSwitchStatement();
        case _tokenizer.TokenType.THROW:
          return this.parseThrowStatement();
        case _tokenizer.TokenType.TRY:
          return this.parseTryStatement();
        case _tokenizer.TokenType.VAR:
          return this.parseVariableDeclarationStatement();
        case _tokenizer.TokenType.WHILE:
          return this.parseWhileStatement();
        case _tokenizer.TokenType.WITH:
          return this.parseWithStatement();
        case _tokenizer.TokenType.FUNCTION:
        case _tokenizer.TokenType.CLASS:
          throw this.createUnexpected(this.lookahead);

        default:
          {
            if (this.lookaheadLexicalDeclaration()) {
              throw this.createUnexpected(this.lookahead);
            }
            var _expr = this.parseExpression();
            // 12.12 Labelled Statements;
            if (_expr.type === "IdentifierExpression" && this.eat(_tokenizer.TokenType.COLON)) {
              var labeledBody = this.match(_tokenizer.TokenType.FUNCTION) ? this.parseFunction({ isExpr: false, inDefault: false, allowGenerator: false }) : this.parseStatement();
              return { type: "LabeledStatement", label: _expr.name, body: labeledBody };
            } else {
              this.consumeSemicolon();
              return { type: "ExpressionStatement", expression: _expr };
            }
          }
      }
    }
  }, {
    key: "parseEmptyStatement",
    value: function parseEmptyStatement() {
      this.lex();
      return { type: "EmptyStatement" };
    }
  }, {
    key: "parseBlockStatement",
    value: function parseBlockStatement() {
      return { type: "BlockStatement", block: this.parseBlock() };
    }
  }, {
    key: "parseExpressionStatement",
    value: function parseExpressionStatement() {
      var expr = this.parseExpression();
      this.consumeSemicolon();
      return { type: "ExpressionStatement", expression: expr };
    }
  }, {
    key: "parseBreakStatement",
    value: function parseBreakStatement() {
      this.lex();

      // Catch the very common case first: immediately a semicolon (U+003B).
      if (this.eat(_tokenizer.TokenType.SEMICOLON) || this.hasLineTerminatorBeforeNext) {
        return { type: "BreakStatement", label: null };
      }

      var label = null;
      if (this.match(_tokenizer.TokenType.IDENTIFIER) || this.match(_tokenizer.TokenType.YIELD) || this.match(_tokenizer.TokenType.LET)) {
        label = this.parseIdentifier();
      }

      this.consumeSemicolon();

      return { type: "BreakStatement", label: label };
    }
  }, {
    key: "parseContinueStatement",
    value: function parseContinueStatement() {
      this.lex();

      // Catch the very common case first: immediately a semicolon (U+003B).
      if (this.eat(_tokenizer.TokenType.SEMICOLON) || this.hasLineTerminatorBeforeNext) {
        return { type: "ContinueStatement", label: null };
      }

      var label = null;
      if (this.match(_tokenizer.TokenType.IDENTIFIER) || this.match(_tokenizer.TokenType.YIELD) || this.match(_tokenizer.TokenType.LET)) {
        label = this.parseIdentifier();
      }

      this.consumeSemicolon();

      return { type: "ContinueStatement", label: label };
    }
  }, {
    key: "parseDebuggerStatement",
    value: function parseDebuggerStatement() {
      this.lex();
      this.consumeSemicolon();
      return { type: "DebuggerStatement" };
    }
  }, {
    key: "parseDoWhileStatement",
    value: function parseDoWhileStatement() {
      this.lex();
      var body = this.parseStatement();
      this.expect(_tokenizer.TokenType.WHILE);
      this.expect(_tokenizer.TokenType.LPAREN);
      var test = this.parseExpression();
      this.expect(_tokenizer.TokenType.RPAREN);
      this.eat(_tokenizer.TokenType.SEMICOLON);
      return { type: "DoWhileStatement", body: body, test: test };
    }
  }, {
    key: "parseForStatement",
    value: function parseForStatement() {
      this.lex();
      this.expect(_tokenizer.TokenType.LPAREN);
      var test = null;
      var right = null;
      if (this.eat(_tokenizer.TokenType.SEMICOLON)) {
        if (!this.match(_tokenizer.TokenType.SEMICOLON)) {
          test = this.parseExpression();
        }
        this.expect(_tokenizer.TokenType.SEMICOLON);
        if (!this.match(_tokenizer.TokenType.RPAREN)) {
          right = this.parseExpression();
        }
        return { type: "ForStatement", init: null, test: test, update: right, body: this.getIteratorStatementEpilogue() };
      } else {
        var startsWithLet = this.match(_tokenizer.TokenType.LET);
        var isForDecl = this.lookaheadLexicalDeclaration();
        var leftLocation = this.getLocation();
        if (this.match(_tokenizer.TokenType.VAR) || isForDecl) {
          var previousAllowIn = this.allowIn;
          this.allowIn = false;
          var init = this.parseVariableDeclaration(false);
          this.allowIn = previousAllowIn;

          if (init.declarators.length === 1 && (this.match(_tokenizer.TokenType.IN) || this.matchContextualKeyword("of"))) {
            var type = undefined;

            if (this.match(_tokenizer.TokenType.IN)) {
              if (init.declarators[0].init != null) {
                throw this.createError(_errors.ErrorMessages.INVALID_VAR_INIT_FOR_IN);
              }
              type = "ForInStatement";
              this.lex();
              right = this.parseExpression();
            } else {
              if (init.declarators[0].init != null) {
                throw this.createError(_errors.ErrorMessages.INVALID_VAR_INIT_FOR_OF);
              }
              type = "ForOfStatement";
              this.lex();
              right = this.parseAssignmentExpression();
            }

            var body = this.getIteratorStatementEpilogue();

            return { type: type, left: init, right: right, body: body };
          } else {
            this.expect(_tokenizer.TokenType.SEMICOLON);
            if (!this.match(_tokenizer.TokenType.SEMICOLON)) {
              test = this.parseExpression();
            }
            this.expect(_tokenizer.TokenType.SEMICOLON);
            if (!this.match(_tokenizer.TokenType.RPAREN)) {
              right = this.parseExpression();
            }
            return { type: "ForStatement", init: init, test: test, update: right, body: this.getIteratorStatementEpilogue() };
          }
        } else {
          var previousAllowIn = this.allowIn;
          this.allowIn = false;
          var _expr2 = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
          this.allowIn = previousAllowIn;

          if (this.isAssignmentTarget && _expr2.type !== "AssignmentExpression" && (this.match(_tokenizer.TokenType.IN) || this.matchContextualKeyword("of"))) {
            if (startsWithLet && this.matchContextualKeyword("of")) {
              throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_FOR_OF);
            }
            var type = this.match(_tokenizer.TokenType.IN) ? "ForInStatement" : "ForOfStatement";

            this.lex();
            right = this.parseExpression();

            return { type: type, left: transformDestructuring(_expr2), right: right, body: this.getIteratorStatementEpilogue() };
          } else {
            if (this.firstExprError) {
              throw this.firstExprError;
            }
            while (this.eat(_tokenizer.TokenType.COMMA)) {
              var rhs = this.parseAssignmentExpression();
              _expr2 = this.markLocation({ type: "BinaryExpression", left: _expr2, operator: ",", right: rhs }, leftLocation);
            }
            if (this.match(_tokenizer.TokenType.IN)) {
              throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_FOR_IN);
            }
            if (this.matchContextualKeyword("of")) {
              throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_FOR_OF);
            }
            this.expect(_tokenizer.TokenType.SEMICOLON);
            if (!this.match(_tokenizer.TokenType.SEMICOLON)) {
              test = this.parseExpression();
            }
            this.expect(_tokenizer.TokenType.SEMICOLON);
            if (!this.match(_tokenizer.TokenType.RPAREN)) {
              right = this.parseExpression();
            }
            return { type: "ForStatement", init: _expr2, test: test, update: right, body: this.getIteratorStatementEpilogue() };
          }
        }
      }
    }
  }, {
    key: "getIteratorStatementEpilogue",
    value: function getIteratorStatementEpilogue() {
      this.expect(_tokenizer.TokenType.RPAREN);
      var body = this.parseStatement();
      return body;
    }
  }, {
    key: "parseIfStatement",
    value: function parseIfStatement() {
      this.lex();
      this.expect(_tokenizer.TokenType.LPAREN);
      var test = this.parseExpression();
      this.expect(_tokenizer.TokenType.RPAREN);
      var consequent = this.parseStatement();
      var alternate = null;
      if (this.eat(_tokenizer.TokenType.ELSE)) {
        alternate = this.parseStatement();
      }
      return { type: "IfStatement", test: test, consequent: consequent, alternate: alternate };
    }
  }, {
    key: "parseReturnStatement",
    value: function parseReturnStatement() {
      if (!this.inFunctionBody) {
        throw this.createError(_errors.ErrorMessages.ILLEGAL_RETURN);
      }

      this.lex();

      if (this.hasLineTerminatorBeforeNext) {
        return { type: "ReturnStatement", expression: null };
      }

      var expression = null;
      if (!this.match(_tokenizer.TokenType.SEMICOLON)) {
        if (!this.match(_tokenizer.TokenType.RBRACE) && !this.eof()) {
          expression = this.parseExpression();
        }
      }

      this.consumeSemicolon();
      return { type: "ReturnStatement", expression: expression };
    }
  }, {
    key: "parseSwitchStatement",
    value: function parseSwitchStatement() {
      this.lex();
      this.expect(_tokenizer.TokenType.LPAREN);
      var discriminant = this.parseExpression();
      this.expect(_tokenizer.TokenType.RPAREN);
      this.expect(_tokenizer.TokenType.LBRACE);

      if (this.eat(_tokenizer.TokenType.RBRACE)) {
        return { type: "SwitchStatement", discriminant: discriminant, cases: [] };
      }

      var cases = this.parseSwitchCases();
      if (this.match(_tokenizer.TokenType.DEFAULT)) {
        var defaultCase = this.parseSwitchDefault();
        var postDefaultCases = this.parseSwitchCases();
        if (this.match(_tokenizer.TokenType.DEFAULT)) {
          throw this.createError(_errors.ErrorMessages.MULTIPLE_DEFAULTS_IN_SWITCH);
        }
        this.expect(_tokenizer.TokenType.RBRACE);
        return {
          type: "SwitchStatementWithDefault",
          discriminant: discriminant,
          preDefaultCases: cases,
          defaultCase: defaultCase,
          postDefaultCases: postDefaultCases };
      } else {
        this.expect(_tokenizer.TokenType.RBRACE);
        return { type: "SwitchStatement", discriminant: discriminant, cases: cases };
      }
    }
  }, {
    key: "parseSwitchCases",
    value: function parseSwitchCases() {
      var result = [];
      while (!(this.eof() || this.match(_tokenizer.TokenType.RBRACE) || this.match(_tokenizer.TokenType.DEFAULT))) {
        result.push(this.parseSwitchCase());
      }
      return result;
    }
  }, {
    key: "parseSwitchCase",
    value: function parseSwitchCase() {
      var startLocation = this.getLocation();
      this.expect(_tokenizer.TokenType.CASE);
      return this.markLocation({
        type: "SwitchCase",
        test: this.parseExpression(),
        consequent: this.parseSwitchCaseBody() }, startLocation);
    }
  }, {
    key: "parseSwitchDefault",
    value: function parseSwitchDefault() {
      var startLocation = this.getLocation();
      this.expect(_tokenizer.TokenType.DEFAULT);
      return this.markLocation({ type: "SwitchDefault", consequent: this.parseSwitchCaseBody() }, startLocation);
    }
  }, {
    key: "parseSwitchCaseBody",
    value: function parseSwitchCaseBody() {
      this.expect(_tokenizer.TokenType.COLON);
      return this.parseStatementListInSwitchCaseBody();
    }
  }, {
    key: "parseStatementListInSwitchCaseBody",
    value: function parseStatementListInSwitchCaseBody() {
      var result = [];
      while (!(this.eof() || this.match(_tokenizer.TokenType.RBRACE) || this.match(_tokenizer.TokenType.DEFAULT) || this.match(_tokenizer.TokenType.CASE))) {
        result.push(this.parseStatementListItem());
      }
      return result;
    }
  }, {
    key: "parseThrowStatement",
    value: function parseThrowStatement() {
      var token = this.lex();
      if (this.hasLineTerminatorBeforeNext) {
        throw this.createErrorWithLocation(token, _errors.ErrorMessages.NEWLINE_AFTER_THROW);
      }
      var expression = this.parseExpression();
      this.consumeSemicolon();
      return { type: "ThrowStatement", expression: expression };
    }
  }, {
    key: "parseTryStatement",
    value: function parseTryStatement() {
      this.lex();
      var body = this.parseBlock();

      if (this.match(_tokenizer.TokenType.CATCH)) {
        var catchClause = this.parseCatchClause();
        if (this.eat(_tokenizer.TokenType.FINALLY)) {
          var finalizer = this.parseBlock();
          return { type: "TryFinallyStatement", body: body, catchClause: catchClause, finalizer: finalizer };
        }
        return { type: "TryCatchStatement", body: body, catchClause: catchClause };
      }

      if (this.eat(_tokenizer.TokenType.FINALLY)) {
        var finalizer = this.parseBlock();
        return { type: "TryFinallyStatement", body: body, catchClause: null, finalizer: finalizer };
      } else {
        throw this.createError(_errors.ErrorMessages.NO_CATCH_OR_FINALLY);
      }
    }
  }, {
    key: "parseVariableDeclarationStatement",
    value: function parseVariableDeclarationStatement() {
      var declaration = this.parseVariableDeclaration(true);
      this.consumeSemicolon();
      return { type: "VariableDeclarationStatement", declaration: declaration };
    }
  }, {
    key: "parseWhileStatement",
    value: function parseWhileStatement() {
      this.lex();
      this.expect(_tokenizer.TokenType.LPAREN);
      var test = this.parseExpression();
      var body = this.getIteratorStatementEpilogue();
      return { type: "WhileStatement", test: test, body: body };
    }
  }, {
    key: "parseWithStatement",
    value: function parseWithStatement() {
      this.lex();
      this.expect(_tokenizer.TokenType.LPAREN);
      var object = this.parseExpression();
      this.expect(_tokenizer.TokenType.RPAREN);
      var body = this.parseStatement();
      return { type: "WithStatement", object: object, body: body };
    }
  }, {
    key: "parseCatchClause",
    value: function parseCatchClause() {
      var startLocation = this.getLocation();

      this.lex();
      this.expect(_tokenizer.TokenType.LPAREN);
      if (this.match(_tokenizer.TokenType.RPAREN) || this.match(_tokenizer.TokenType.LPAREN)) {
        throw this.createUnexpected(this.lookahead);
      }
      var binding = this.parseBindingTarget();
      this.expect(_tokenizer.TokenType.RPAREN);
      var body = this.parseBlock();

      return this.markLocation({ type: "CatchClause", binding: binding, body: body }, startLocation);
    }
  }, {
    key: "parseBlock",
    value: function parseBlock() {
      var startLocation = this.getLocation();
      this.expect(_tokenizer.TokenType.LBRACE);
      var body = [];
      while (!this.match(_tokenizer.TokenType.RBRACE)) {
        body.push(this.parseStatementListItem());
      }
      this.expect(_tokenizer.TokenType.RBRACE);
      return this.markLocation({ type: "Block", statements: body }, startLocation);
    }
  }, {
    key: "parseVariableDeclaration",
    value: function parseVariableDeclaration(bindingPatternsMustHaveInit) {
      var startLocation = this.getLocation();
      var token = this.lex();

      // preceded by this.match(TokenSubType.VAR) || this.match(TokenSubType.LET);
      var kind = token.type === _tokenizer.TokenType.VAR ? "var" : token.type === _tokenizer.TokenType.CONST ? "const" : "let";
      var declarators = this.parseVariableDeclaratorList(bindingPatternsMustHaveInit);
      return this.markLocation({ type: "VariableDeclaration", kind: kind, declarators: declarators }, startLocation);
    }
  }, {
    key: "parseVariableDeclaratorList",
    value: function parseVariableDeclaratorList(bindingPatternsMustHaveInit) {
      var result = [];
      do {
        result.push(this.parseVariableDeclarator(bindingPatternsMustHaveInit));
      } while (this.eat(_tokenizer.TokenType.COMMA));
      return result;
    }
  }, {
    key: "parseVariableDeclarator",
    value: function parseVariableDeclarator(bindingPatternsMustHaveInit) {
      var startLocation = this.getLocation();

      if (this.match(_tokenizer.TokenType.LPAREN)) {
        throw this.createUnexpected(this.lookahead);
      }

      var binding = this.parseBindingTarget();
      if (bindingPatternsMustHaveInit && binding.type !== "BindingIdentifier" && !this.match(_tokenizer.TokenType.ASSIGN)) {
        this.expect(_tokenizer.TokenType.ASSIGN);
      }

      var init = null;
      if (this.eat(_tokenizer.TokenType.ASSIGN)) {
        init = this.parseAssignmentExpression();
      }

      return this.markLocation({ type: "VariableDeclarator", binding: binding, init: init }, startLocation);
    }
  }, {
    key: "isolateCoverGrammar",
    value: function isolateCoverGrammar(parser) {
      var oldIsBindingElement = this.isBindingElement,
          oldIsAssignmentTarget = this.isAssignmentTarget,
          oldFirstExprError = this.firstExprError,
          result;
      this.isBindingElement = this.isAssignmentTarget = true;
      this.firstExprError = null;
      result = parser.call(this);
      if (this.firstExprError !== null) {
        throw this.firstExprError;
      }
      this.isBindingElement = oldIsBindingElement;
      this.isAssignmentTarget = oldIsAssignmentTarget;
      this.firstExprError = oldFirstExprError;
      return result;
    }
  }, {
    key: "inheritCoverGrammar",
    value: function inheritCoverGrammar(parser) {
      var oldIsBindingElement = this.isBindingElement,
          oldIsAssignmentTarget = this.isAssignmentTarget,
          oldFirstExprError = this.firstExprError,
          result;
      this.isBindingElement = this.isAssignmentTarget = true;
      this.firstExprError = null;
      result = parser.call(this);
      this.isBindingElement = this.isBindingElement && oldIsBindingElement;
      this.isAssignmentTarget = this.isAssignmentTarget && oldIsAssignmentTarget;
      this.firstExprError = oldFirstExprError || this.firstExprError;
      return result;
    }
  }, {
    key: "parseExpression",
    value: function parseExpression() {
      var startLocation = this.getLocation();

      var left = this.parseAssignmentExpression();
      if (this.match(_tokenizer.TokenType.COMMA)) {
        while (!this.eof()) {
          if (!this.match(_tokenizer.TokenType.COMMA)) break;
          this.lex();
          var right = this.parseAssignmentExpression();
          left = this.markLocation({ type: "BinaryExpression", left: left, operator: ",", right: right }, startLocation);
        }
      }
      return left;
    }
  }, {
    key: "parseArrowExpressionTail",
    value: function parseArrowExpressionTail(head, startLocation) {
      var arrow = this.expect(_tokenizer.TokenType.ARROW);

      // Convert param list.
      var _head$params = head.params;
      var params = _head$params === undefined ? null : _head$params;
      var _head$rest = head.rest;
      var rest = _head$rest === undefined ? null : _head$rest;

      if (head.type !== ARROW_EXPRESSION_PARAMS) {
        if (head.type === "IdentifierExpression") {
          params = [transformDestructuring(head)];
        } else {
          throw this.createUnexpected(arrow);
        }
      }

      var paramsNode = this.markLocation({ type: "FormalParameters", items: params, rest: rest }, startLocation);

      if (this.match(_tokenizer.TokenType.LBRACE)) {
        var _previousYield = this.allowYieldExpression;
        this.allowYieldExpression = false;
        var body = this.parseFunctionBody();
        this.allowYieldExpression = _previousYield;
        return this.markLocation({ type: "ArrowExpression", params: paramsNode, body: body }, startLocation);
      } else {
        var body = this.parseAssignmentExpression();
        return this.markLocation({ type: "ArrowExpression", params: paramsNode, body: body }, startLocation);
      }
    }
  }, {
    key: "parseAssignmentExpression",
    value: function parseAssignmentExpression() {
      return this.isolateCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
    }
  }, {
    key: "parseAssignmentExpressionOrBindingElement",
    value: function parseAssignmentExpressionOrBindingElement() {
      var startLocation = this.getLocation();

      if (this.allowYieldExpression && !this.inGeneratorParameter && this.match(_tokenizer.TokenType.YIELD)) {
        this.isBindingElement = this.isAssignmentTarget = false;
        return this.parseYieldExpression();
      }

      var expr = this.parseConditionalExpression();

      if (!this.hasLineTerminatorBeforeNext && this.match(_tokenizer.TokenType.ARROW)) {
        this.isBindingElement = this.isAssignmentTarget = false;
        this.firstExprError = null;
        return this.parseArrowExpressionTail(expr, startLocation);
      }

      var isAssignmentOperator = false;
      var operator = this.lookahead;
      switch (operator.type) {
        case _tokenizer.TokenType.ASSIGN_BIT_OR:
        case _tokenizer.TokenType.ASSIGN_BIT_XOR:
        case _tokenizer.TokenType.ASSIGN_BIT_AND:
        case _tokenizer.TokenType.ASSIGN_SHL:
        case _tokenizer.TokenType.ASSIGN_SHR:
        case _tokenizer.TokenType.ASSIGN_SHR_UNSIGNED:
        case _tokenizer.TokenType.ASSIGN_ADD:
        case _tokenizer.TokenType.ASSIGN_SUB:
        case _tokenizer.TokenType.ASSIGN_MUL:
        case _tokenizer.TokenType.ASSIGN_DIV:
        case _tokenizer.TokenType.ASSIGN_MOD:
          isAssignmentOperator = true;
          break;
      }
      if (isAssignmentOperator) {
        if (!this.isAssignmentTarget || !isValidSimpleAssignmentTarget(expr)) {
          throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_ASSIGNMENT);
        }
        expr = transformDestructuring(expr);
      } else if (operator.type === _tokenizer.TokenType.ASSIGN) {
        if (!this.isAssignmentTarget) {
          throw this.createError(_errors.ErrorMessages.INVALID_LHS_IN_ASSIGNMENT);
        }
        expr = transformDestructuring(expr);
      } else {
        return expr;
      }

      this.lex();
      var previousInGeneratorParameter = this.inGeneratorParameter;
      this.inGeneratorParameter = false;
      var rhs = this.parseAssignmentExpression();

      this.inGeneratorParameter = previousInGeneratorParameter;
      this.firstExprError = null;
      return this.markLocation({
        type: "AssignmentExpression",
        binding: expr,
        operator: operator.type.name,
        expression: rhs }, startLocation);
    }
  }, {
    key: "lookaheadAssignmentExpression",
    value: function lookaheadAssignmentExpression() {
      switch (this.lookahead.type) {
        case _tokenizer.TokenType.ADD:
        case _tokenizer.TokenType.ASSIGN_DIV:
        case _tokenizer.TokenType.CLASS:
        case _tokenizer.TokenType.DEC:
        case _tokenizer.TokenType.DIV:
        case _tokenizer.TokenType.FALSE:
        case _tokenizer.TokenType.FUNCTION:
        case _tokenizer.TokenType.IDENTIFIER:
        case _tokenizer.TokenType.LET:
        case _tokenizer.TokenType.LBRACE:
        case _tokenizer.TokenType.LBRACK:
        case _tokenizer.TokenType.LPAREN:
        case _tokenizer.TokenType.NEW:
        case _tokenizer.TokenType.NOT:
        case _tokenizer.TokenType.NULL:
        case _tokenizer.TokenType.NUMBER:
        case _tokenizer.TokenType.STRING:
        case _tokenizer.TokenType.SUB:
        case _tokenizer.TokenType.THIS:
        case _tokenizer.TokenType.TRUE:
        case _tokenizer.TokenType.YIELD:
        case _tokenizer.TokenType.TEMPLATE:
          return true;
      }
      return false;
    }
  }, {
    key: "parseYieldExpression",
    value: function parseYieldExpression() {
      var startLocation = this.getLocation();

      this.lex();
      if (this.hasLineTerminatorBeforeNext) {
        return this.markLocation({ type: "YieldExpression", expression: null }, startLocation);
      }
      var isGenerator = !!this.eat(_tokenizer.TokenType.MUL);
      var previousYield = this.allowYieldExpression;
      var expr = null;
      if (isGenerator || this.lookaheadAssignmentExpression()) {
        expr = this.parseAssignmentExpression();
      }
      this.allowYieldExpression = previousYield;
      var type = isGenerator ? "YieldGeneratorExpression" : "YieldExpression";
      return this.markLocation({ type: type, expression: expr }, startLocation);
    }
  }, {
    key: "parseConditionalExpression",
    value: function parseConditionalExpression() {
      var startLocation = this.getLocation();
      var test = this.parseBinaryExpression();
      if (this.firstExprError) return test;
      if (this.eat(_tokenizer.TokenType.CONDITIONAL)) {
        var previousAllowIn = this.allowIn;
        this.allowIn = true;
        var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
        this.allowIn = previousAllowIn;
        this.expect(_tokenizer.TokenType.COLON);
        var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
        return this.markLocation({ type: "ConditionalExpression", test: test, consequent: consequent, alternate: alternate }, startLocation);
      }
      return test;
    }
  }, {
    key: "isBinaryOperator",
    value: function isBinaryOperator(type) {
      switch (type) {
        case _tokenizer.TokenType.OR:
        case _tokenizer.TokenType.AND:
        case _tokenizer.TokenType.BIT_OR:
        case _tokenizer.TokenType.BIT_XOR:
        case _tokenizer.TokenType.BIT_AND:
        case _tokenizer.TokenType.EQ:
        case _tokenizer.TokenType.NE:
        case _tokenizer.TokenType.EQ_STRICT:
        case _tokenizer.TokenType.NE_STRICT:
        case _tokenizer.TokenType.LT:
        case _tokenizer.TokenType.GT:
        case _tokenizer.TokenType.LTE:
        case _tokenizer.TokenType.GTE:
        case _tokenizer.TokenType.INSTANCEOF:
        case _tokenizer.TokenType.SHL:
        case _tokenizer.TokenType.SHR:
        case _tokenizer.TokenType.SHR_UNSIGNED:
        case _tokenizer.TokenType.ADD:
        case _tokenizer.TokenType.SUB:
        case _tokenizer.TokenType.MUL:
        case _tokenizer.TokenType.DIV:
        case _tokenizer.TokenType.MOD:
          return true;
        case _tokenizer.TokenType.IN:
          return this.allowIn;
        default:
          return false;
      }
    }
  }, {
    key: "parseBinaryExpression",
    value: function parseBinaryExpression() {
      var _this2 = this;

      var startLocation = this.getLocation();
      var left = this.parseUnaryExpression();
      if (this.firstExprError) {
        return left;
      }

      var operator = this.lookahead.type;

      if (!this.isBinaryOperator(operator)) return left;

      this.isBindingElement = this.isAssignmentTarget = false;

      this.lex();
      var stack = [];
      stack.push({ startLocation: startLocation, left: left, operator: operator, precedence: BinaryPrecedence[operator.name] });
      startLocation = this.getLocation();
      var right = this.isolateCoverGrammar(this.parseUnaryExpression);
      operator = this.lookahead.type;
      while (this.isBinaryOperator(operator)) {
        var precedence = BinaryPrecedence[operator.name];
        // Reduce: make a binary expression from the three topmost entries.
        while (stack.length && precedence <= stack[stack.length - 1].precedence) {
          var stackItem = stack[stack.length - 1];
          var stackOperator = stackItem.operator;
          left = stackItem.left;
          stack.pop();
          startLocation = stackItem.startLocation;
          right = this.markLocation({ type: "BinaryExpression", left: left, operator: stackOperator.name, right: right }, startLocation);
        }

        this.lex();
        stack.push({ startLocation: startLocation, left: right, operator: operator, precedence: precedence });

        startLocation = this.getLocation();
        right = this.isolateCoverGrammar(this.parseUnaryExpression);
        operator = this.lookahead.type;
      }

      // Final reduce to clean-up the stack.
      return stack.reduceRight(function (expr, stackItem) {
        return _this2.markLocation({
          type: "BinaryExpression",
          left: stackItem.left,
          operator: stackItem.operator.name,
          right: expr }, stackItem.startLocation);
      }, right);
    }
  }, {
    key: "parseUnaryExpression",
    value: function parseUnaryExpression() {
      if (this.lookahead.type.klass !== _tokenizer.TokenClass.Punctuator && this.lookahead.type.klass !== _tokenizer.TokenClass.Keyword) {
        return this.parsePostfixExpression();
      }
      var startLocation = this.getLocation();
      var operator = this.lookahead;
      if (!isPrefixOperator(operator.type)) {
        return this.parsePostfixExpression();
      }

      this.lex();
      this.isBindingElement = this.isAssignmentTarget = false;
      var expr = this.isolateCoverGrammar(this.parseUnaryExpression);

      return this.markLocation({ type: "PrefixExpression", operator: operator.value, operand: expr }, startLocation);
    }
  }, {
    key: "parsePostfixExpression",
    value: function parsePostfixExpression() {
      var startLocation = this.getLocation();

      var operand = this.parseLeftHandSideExpression({ allowCall: true });
      if (this.firstExprError || this.hasLineTerminatorBeforeNext) return operand;

      var operator = this.lookahead;
      if (operator.type !== _tokenizer.TokenType.INC && operator.type !== _tokenizer.TokenType.DEC) return operand;
      this.lex();

      return this.markLocation({ type: "PostfixExpression", operand: operand, operator: operator.value }, startLocation);
    }
  }, {
    key: "parseLeftHandSideExpression",
    value: function parseLeftHandSideExpression(_ref) {
      var allowCall = _ref.allowCall;

      var startLocation = this.getLocation();
      var previousAllowIn = this.allowIn;
      this.allowIn = allowCall;

      var expr = undefined,
          token = this.lookahead;

      if (this.eat(_tokenizer.TokenType.SUPER)) {
        this.isBindingElement = false;
        this.isAssignmentTarget = false;
        expr = this.markLocation({ type: "Super" }, startLocation);
        if (this.match(_tokenizer.TokenType.LPAREN)) {
          if (allowCall) {
            expr = this.markLocation({
              type: "CallExpression",
              callee: expr,
              arguments: this.parseArgumentList() }, startLocation);
          } else {
            throw this.createUnexpected(token);
          }
        } else if (this.match(_tokenizer.TokenType.LBRACK)) {
          expr = this.markLocation({
            type: "ComputedMemberExpression",
            object: expr,
            expression: this.parseComputedMember() }, startLocation);
          this.isAssignmentTarget = true;
        } else if (this.match(_tokenizer.TokenType.PERIOD)) {
          expr = this.markLocation({
            type: "StaticMemberExpression",
            object: expr,
            property: this.parseStaticMember() }, startLocation);
          this.isAssignmentTarget = true;
        } else {
          throw this.createUnexpected(token);
        }
      } else if (this.match(_tokenizer.TokenType.NEW)) {
        this.isBindingElement = this.isAssignmentTarget = false;
        expr = this.parseNewExpression();
      } else {
        expr = this.parsePrimaryExpression();
        if (this.firstExprError) {
          return expr;
        }
      }

      while (true) {
        if (allowCall && this.match(_tokenizer.TokenType.LPAREN)) {
          this.isBindingElement = this.isAssignmentTarget = false;
          expr = this.markLocation({
            type: "CallExpression",
            callee: expr,
            arguments: this.parseArgumentList() }, startLocation);
        } else if (this.match(_tokenizer.TokenType.LBRACK)) {
          this.isBindingElement = false;
          this.isAssignmentTarget = true;
          expr = this.markLocation({
            type: "ComputedMemberExpression",
            object: expr,
            expression: this.parseComputedMember() }, startLocation);
        } else if (this.match(_tokenizer.TokenType.PERIOD)) {
          this.isBindingElement = false;
          this.isAssignmentTarget = true;
          expr = this.markLocation({
            type: "StaticMemberExpression",
            object: expr,
            property: this.parseStaticMember() }, startLocation);
        } else if (this.match(_tokenizer.TokenType.TEMPLATE)) {
          this.isBindingElement = this.isAssignmentTarget = false;
          expr = this.markLocation({
            type: "TemplateExpression",
            tag: expr,
            elements: this.parseTemplateElements() }, startLocation);
        } else {
          break;
        }
      }

      this.allowIn = previousAllowIn;

      return expr;
    }
  }, {
    key: "parseTemplateElements",
    value: function parseTemplateElements() {
      var startLocation = this.getLocation();
      var token = this.lookahead;
      if (token.tail) {
        this.lex();
        return [this.markLocation({ type: "TemplateElement", rawValue: token.slice.text.slice(1, -1) }, startLocation)];
      }
      var result = [this.markLocation({ type: "TemplateElement", rawValue: this.lex().slice.text.slice(1, -2) }, startLocation)];
      while (true) {
        result.push(this.parseExpression());
        if (!this.match(_tokenizer.TokenType.RBRACE)) {
          throw this.createILLEGAL();
        }
        this.index = this.startIndex;
        this.line = this.startLine;
        this.lineStart = this.startLineStart;
        this.lookahead = this.scanTemplateElement();
        startLocation = this.getLocation();
        token = this.lex();
        if (token.tail) {
          result.push(this.markLocation({ type: "TemplateElement", rawValue: token.slice.text.slice(1, -1) }, startLocation));
          return result;
        } else {
          result.push(this.markLocation({ type: "TemplateElement", rawValue: token.slice.text.slice(1, -2) }, startLocation));
        }
      }
    }
  }, {
    key: "parseStaticMember",
    value: function parseStaticMember() {
      this.lex();
      if (!this.lookahead.type.klass.isIdentifierName) {
        throw this.createUnexpected(this.lookahead);
      } else {
        return this.lex().value;
      }
    }
  }, {
    key: "parseComputedMember",
    value: function parseComputedMember() {
      this.lex();
      var expr = this.parseExpression();
      this.expect(_tokenizer.TokenType.RBRACK);
      return expr;
    }
  }, {
    key: "parseNewExpression",
    value: function parseNewExpression() {
      var _this3 = this;

      var startLocation = this.getLocation();
      this.lex();
      if (this.eat(_tokenizer.TokenType.PERIOD)) {
        var ident = this.expect(_tokenizer.TokenType.IDENTIFIER);
        if (ident.value !== "target") {
          throw this.createUnexpected(ident);
        }
        return this.markLocation({ type: "NewTargetExpression" }, startLocation);
      }
      var callee = this.isolateCoverGrammar(function () {
        return _this3.parseLeftHandSideExpression({ allowCall: false });
      });
      return this.markLocation({
        type: "NewExpression",
        callee: callee,
        arguments: this.match(_tokenizer.TokenType.LPAREN) ? this.parseArgumentList() : [] }, startLocation);
    }
  }, {
    key: "parsePrimaryExpression",
    value: function parsePrimaryExpression() {
      if (this.match(_tokenizer.TokenType.LPAREN)) {
        return this.parseGroupExpression();
      }

      var startLocation = this.getLocation();

      switch (this.lookahead.type) {
        case _tokenizer.TokenType.IDENTIFIER:
        case _tokenizer.TokenType.YIELD:
        case _tokenizer.TokenType.LET:
          return this.markLocation({ type: "IdentifierExpression", name: this.parseIdentifier() }, startLocation);
        case _tokenizer.TokenType.STRING:
          this.isBindingElement = this.isAssignmentTarget = false;
          return this.parseStringLiteral();
        case _tokenizer.TokenType.NUMBER:
          this.isBindingElement = this.isAssignmentTarget = false;
          return this.parseNumericLiteral();
        case _tokenizer.TokenType.THIS:
          this.lex();
          this.isBindingElement = this.isAssignmentTarget = false;
          return this.markLocation({ type: "ThisExpression" }, startLocation);
        case _tokenizer.TokenType.FUNCTION:
          this.isBindingElement = this.isAssignmentTarget = false;
          return this.markLocation(this.parseFunction({ isExpr: true, inDefault: false, allowGenerator: true }), startLocation);
        case _tokenizer.TokenType.TRUE:
          this.lex();
          this.isBindingElement = this.isAssignmentTarget = false;
          return this.markLocation({ type: "LiteralBooleanExpression", value: true }, startLocation);
        case _tokenizer.TokenType.FALSE:
          this.lex();
          this.isBindingElement = this.isAssignmentTarget = false;
          return this.markLocation({ type: "LiteralBooleanExpression", value: false }, startLocation);
        case _tokenizer.TokenType.NULL:
          this.lex();
          this.isBindingElement = this.isAssignmentTarget = false;
          return this.markLocation({ type: "LiteralNullExpression" }, startLocation);
        case _tokenizer.TokenType.LBRACK:
          return this.parseArrayExpression();
        case _tokenizer.TokenType.LBRACE:
          return this.parseObjectExpression();
        case _tokenizer.TokenType.TEMPLATE:
          this.isBindingElement = this.isAssignmentTarget = false;
          return this.markLocation({ type: "TemplateExpression", tag: null, elements: this.parseTemplateElements() }, startLocation);
        case _tokenizer.TokenType.DIV:
        case _tokenizer.TokenType.ASSIGN_DIV:
          this.isBindingElement = this.isAssignmentTarget = false;
          this.lookahead = this.scanRegExp(this.match(_tokenizer.TokenType.DIV) ? "/" : "/=");
          var token = this.lex();
          var lastSlash = token.value.lastIndexOf("/");
          var pattern = token.value.slice(1, lastSlash);
          var flags = token.value.slice(lastSlash + 1);
          return this.markLocation({ type: "LiteralRegExpExpression", pattern: pattern, flags: flags }, startLocation);
        case _tokenizer.TokenType.CLASS:
          this.isBindingElement = this.isAssignmentTarget = false;
          return this.parseClass({ isExpr: true, inDefault: false });
        default:
          throw this.createUnexpected(this.lookahead);
      }
    }
  }, {
    key: "parseNumericLiteral",
    value: function parseNumericLiteral() {
      var startLocation = this.getLocation();
      var token = this.lex();
      var node = token.value === 1 / 0 ? { type: "LiteralInfinityExpression" } : { type: "LiteralNumericExpression", value: token.value };
      return this.markLocation(node, startLocation);
    }
  }, {
    key: "parseStringLiteral",
    value: function parseStringLiteral() {
      var startLocation = this.getLocation();
      return this.markLocation({ type: "LiteralStringExpression", value: this.lex().str }, startLocation);
    }
  }, {
    key: "parseIdentifierName",
    value: function parseIdentifierName() {
      if (this.lookahead.type.klass.isIdentifierName) {
        return this.lex().value;
      } else {
        throw this.createUnexpected(this.lookahead);
      }
    }
  }, {
    key: "parseBindingIdentifier",
    value: function parseBindingIdentifier() {
      var startLocation = this.getLocation();
      return this.markLocation({ type: "BindingIdentifier", name: this.parseIdentifier() }, startLocation);
    }
  }, {
    key: "parseIdentifier",
    value: function parseIdentifier() {
      if (this.match(_tokenizer.TokenType.IDENTIFIER) || this.match(_tokenizer.TokenType.YIELD) || this.match(_tokenizer.TokenType.LET)) {
        return this.lex().value;
      } else {
        throw this.createUnexpected(this.lookahead);
      }
    }
  }, {
    key: "parseArgumentList",
    value: function parseArgumentList() {
      this.lex();
      var args = this.parseArguments();
      this.expect(_tokenizer.TokenType.RPAREN);
      return args;
    }
  }, {
    key: "parseArguments",
    value: function parseArguments() {
      var result = [];
      while (true) {
        if (this.match(_tokenizer.TokenType.RPAREN) || this.eof()) {
          return result;
        }
        var arg = undefined;
        if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
          var startLocation = this.getLocation();
          arg = this.markLocation({ type: "SpreadElement", expression: this.parseAssignmentExpression() }, startLocation);
        } else {
          arg = this.parseAssignmentExpression();
        }
        result.push(arg);
        if (!this.eat(_tokenizer.TokenType.COMMA)) break;
      }
      return result;
    }
  }, {
    key: "ensureArrow",

    // 11.2 Left-Hand-Side Expressions;

    value: function ensureArrow() {
      if (this.hasLineTerminatorBeforeNext) {
        throw this.createError(_errors.ErrorMessages.UNEXPECTED_LINE_TERMINATOR);
      }
      if (!this.match(_tokenizer.TokenType.ARROW)) {
        this.expect(_tokenizer.TokenType.ARROW);
      }
    }
  }, {
    key: "parseGroupExpression",
    value: function parseGroupExpression() {
      // At this point, we need to parse 3 things:
      //  1. Group expression
      //  2. Assignment target of assignment expression
      //  3. Parameter list of arrow function
      var rest = null;
      var start = this.expect(_tokenizer.TokenType.LPAREN);
      if (this.eat(_tokenizer.TokenType.RPAREN)) {
        this.ensureArrow();
        this.isBindingElement = this.isAssignmentTarget = false;
        return {
          type: ARROW_EXPRESSION_PARAMS,
          params: [],
          rest: null };
      } else if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
        rest = this.parseBindingIdentifier();
        this.expect(_tokenizer.TokenType.RPAREN);
        this.ensureArrow();
        this.isBindingElement = this.isAssignmentTarget = false;
        return {
          type: ARROW_EXPRESSION_PARAMS,
          params: [],
          rest: rest };
      }

      var startLocation = this.getLocation();
      var group = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);

      var params = this.isBindingElement ? [group] : null;

      while (this.eat(_tokenizer.TokenType.COMMA)) {
        this.isAssignmentTarget = false;
        if (this.match(_tokenizer.TokenType.ELLIPSIS)) {
          if (!this.isBindingElement) {
            throw this.createUnexpected(this.lookahead);
          }
          this.lex();
          rest = this.parseBindingIdentifier();
          break;
        }

        if (!group) {
          // Can be only binding elements.
          var binding = this.parseBindingElement();
          params.push(binding);
        } else {
          // Can be either binding element or assignment target.
          var _expr3 = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
          if (!this.isBindingElement) {
            params = null;
          } else {
            params.push(_expr3);
          }

          if (this.firstExprError) {
            group = null;
          } else {
            group = this.markLocation({
              type: "BinaryExpression",
              left: group,
              operator: ",",
              right: _expr3 }, startLocation);
          }
        }
      }

      this.expect(_tokenizer.TokenType.RPAREN);

      if (!this.hasLineTerminatorBeforeNext && this.match(_tokenizer.TokenType.ARROW)) {
        if (!this.isBindingElement) {
          throw this.createErrorWithLocation(start, _errors.ErrorMessages.ILLEGAL_ARROW_FUNCTION_PARAMS);
        }

        params = params.map(transformDestructuring);

        this.isBindingElement = false;
        return { type: ARROW_EXPRESSION_PARAMS, params: params, rest: rest };
      } else {
        // Ensure assignment pattern:
        if (rest) {
          this.ensureArrow();
        }
        this.isBindingElement = false;
        return group;
      }
    }
  }, {
    key: "parseArrayExpression",
    value: function parseArrayExpression() {
      var startLocation = this.getLocation();

      this.lex();

      var exprs = [];

      while (true) {
        if (this.match(_tokenizer.TokenType.RBRACK)) {
          break;
        }
        if (this.eat(_tokenizer.TokenType.COMMA)) {
          exprs.push(null);
        } else {
          var elementLocation = this.getLocation();
          var _expr4 = undefined;
          if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
            // Spread/Rest element
            _expr4 = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
            if (!this.isAssignmentTarget && this.firstExprError) {
              throw this.firstExprError;
            }
            _expr4 = this.markLocation({ type: "SpreadElement", expression: _expr4 }, elementLocation);
            if (!this.match(_tokenizer.TokenType.RBRACK)) {
              this.isBindingElement = this.isAssignmentTarget = false;
            }
          } else {
            _expr4 = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
            if (!this.isAssignmentTarget && this.firstExprError) {
              throw this.firstExprError;
            }
          }
          exprs.push(_expr4);

          if (!this.match(_tokenizer.TokenType.RBRACK)) {
            this.expect(_tokenizer.TokenType.COMMA);
          }
        }
      }

      this.expect(_tokenizer.TokenType.RBRACK);

      return this.markLocation({ type: "ArrayExpression", elements: exprs }, startLocation);
    }
  }, {
    key: "parseObjectExpression",
    value: function parseObjectExpression() {
      var startLocation = this.getLocation();

      this.lex();

      var properties = [];
      while (!this.match(_tokenizer.TokenType.RBRACE)) {
        var property = this.inheritCoverGrammar(this.parsePropertyDefinition);
        properties.push(property);
        if (!this.match(_tokenizer.TokenType.RBRACE)) {
          this.expect(_tokenizer.TokenType.COMMA);
        }
      }
      this.expect(_tokenizer.TokenType.RBRACE);
      return this.markLocation({ type: "ObjectExpression", properties: properties }, startLocation);
    }
  }, {
    key: "parsePropertyDefinition",
    value: function parsePropertyDefinition() {
      var startLocation = this.getLocation();
      var token = this.lookahead;

      var _parseMethodDefinition = this.parseMethodDefinition();

      var methodOrKey = _parseMethodDefinition.methodOrKey;
      var kind = _parseMethodDefinition.kind;

      switch (kind) {
        case "method":
          this.isBindingElement = this.isAssignmentTarget = false;
          return methodOrKey;
        case "identifier":
          // IdentifierReference,
          if (this.eat(_tokenizer.TokenType.ASSIGN)) {
            // CoverInitializedName
            var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
            this.firstExprError = this.createErrorWithLocation(startLocation, _errors.ErrorMessages.ILLEGAL_PROPERTY);
            return this.markLocation({
              type: "BindingPropertyIdentifier",
              binding: transformDestructuring(methodOrKey),
              init: init }, startLocation);
          } else if (!this.match(_tokenizer.TokenType.COLON)) {
            if (token.type !== _tokenizer.TokenType.IDENTIFIER && token.type !== _tokenizer.TokenType.YIELD && token.type !== _tokenizer.TokenType.LET) {
              throw this.createUnexpected(token);
            }
            return this.markLocation({ type: "ShorthandProperty", name: methodOrKey.value }, startLocation);
          }
      }

      // DataProperty
      this.expect(_tokenizer.TokenType.COLON);

      var expr = this.inheritCoverGrammar(this.parseAssignmentExpressionOrBindingElement);
      return this.markLocation({ type: "DataProperty", name: methodOrKey, expression: expr }, startLocation);
    }
  }, {
    key: "parsePropertyName",
    value: function parsePropertyName() {
      // PropertyName[Yield,GeneratorParameter]:
      var token = this.lookahead;
      var startLocation = this.getLocation();

      if (this.eof()) {
        throw this.createUnexpected(token);
      }

      switch (token.type) {
        case _tokenizer.TokenType.STRING:
          return {
            name: this.markLocation({
              type: "StaticPropertyName",
              value: this.parseStringLiteral().value }, startLocation),
            binding: null };
        case _tokenizer.TokenType.NUMBER:
          var numLiteral = this.parseNumericLiteral();
          return {
            name: this.markLocation({
              type: "StaticPropertyName",
              value: "" + (numLiteral.type === "LiteralInfinityExpression" ? 1 / 0 : numLiteral.value) }, startLocation),
            binding: null };
        case _tokenizer.TokenType.LBRACK:
          var previousYield = this.allowYieldExpression;
          if (this.inGeneratorParameter) {
            this.allowYieldExpression = false;
          }
          this.lex();
          var expr = this.parseAssignmentExpression();
          this.expect(_tokenizer.TokenType.RBRACK);
          this.allowYieldExpression = previousYield;
          return { name: this.markLocation({ type: "ComputedPropertyName", expression: expr }, startLocation), binding: null };
      }

      var name = this.parseIdentifierName();
      return {
        name: this.markLocation({ type: "StaticPropertyName", value: name }, startLocation),
        binding: this.markLocation({ type: "BindingIdentifier", name: name }, startLocation) };
    }
  }, {
    key: "lookaheadPropertyName",

    /**
     * Test if lookahead can be the beginning of a `PropertyName`.
     * @returns {boolean}
     */
    value: function lookaheadPropertyName() {
      switch (this.lookahead.type) {
        case _tokenizer.TokenType.NUMBER:
        case _tokenizer.TokenType.STRING:
        case _tokenizer.TokenType.LBRACK:
          return true;
        default:
          return this.lookahead.type.klass.isIdentifierName;
      }
    }
  }, {
    key: "parseMethodDefinition",

    /**
     * Try to parse a method definition.
     *
     * If it turns out to be one of:
     *  * `IdentifierReference`
     *  * `CoverInitializedName` (`IdentifierReference "=" AssignmentExpression`)
     *  * `PropertyName : AssignmentExpression`
     * The parser will stop at the end of the leading `Identifier` or `PropertyName` and return it.
     *
     * @returns {{methodOrKey: (Method|PropertyName), kind: string}}
     */
    value: function parseMethodDefinition() {
      var token = this.lookahead;
      var startLocation = this.getLocation();

      var isGenerator = !!this.eat(_tokenizer.TokenType.MUL);

      var _parsePropertyName = this.parsePropertyName();

      var name = _parsePropertyName.name;
      var binding = _parsePropertyName.binding;

      if (!isGenerator && token.type === _tokenizer.TokenType.IDENTIFIER) {
        var _name = token.value;
        if (_name.length === 3) {
          // Property Assignment: Getter and Setter.
          if (_name === "get" && this.lookaheadPropertyName()) {
            var _parsePropertyName2 = this.parsePropertyName();

            _name = _parsePropertyName2.name;

            this.expect(_tokenizer.TokenType.LPAREN);
            this.expect(_tokenizer.TokenType.RPAREN);
            var body = this.parseFunctionBody();
            return {
              methodOrKey: this.markLocation({ type: "Getter", name: _name, body: body }, startLocation),
              kind: "method" };
          } else if (_name === "set" && this.lookaheadPropertyName()) {
            var _parsePropertyName3 = this.parsePropertyName();

            _name = _parsePropertyName3.name;

            this.expect(_tokenizer.TokenType.LPAREN);
            var param = this.parseBindingElement();
            this.expect(_tokenizer.TokenType.RPAREN);
            var _previousYield2 = this.allowYieldExpression;
            this.allowYieldExpression = false;
            var body = this.parseFunctionBody();
            this.allowYieldExpression = _previousYield2;
            return {
              methodOrKey: this.markLocation({ type: "Setter", name: _name, param: param, body: body }, startLocation),
              kind: "method" };
          }
        }
      }

      if (this.match(_tokenizer.TokenType.LPAREN)) {
        var _previousYield3 = this.allowYieldExpression;
        var previousInGeneratorParameter = this.inGeneratorParameter;
        this.inGeneratorParameter = isGenerator;
        this.allowYieldExpression = isGenerator;
        var params = this.parseParams();
        this.inGeneratorParameter = previousInGeneratorParameter;
        this.allowYieldExpression = _previousYield3;
        var previousInGeneratorBody = this.inGeneratorBody;
        this.allowYieldExpression = isGenerator;

        if (isGenerator) {
          this.inGeneratorBody = true;
        }

        var body = this.parseFunctionBody();
        this.allowYieldExpression = _previousYield3;
        this.inGeneratorBody = previousInGeneratorBody;

        return {
          methodOrKey: this.markLocation({ type: "Method", isGenerator: isGenerator, name: name, params: params, body: body }, startLocation),
          kind: "method" };
      }

      if (isGenerator && this.match(_tokenizer.TokenType.COLON)) {
        throw this.createUnexpected(this.lookahead);
      }

      return {
        methodOrKey: name,
        kind: token.type.klass.isIdentifierName ? "identifier" : "property",
        binding: binding };
    }
  }, {
    key: "parseClass",
    value: function parseClass(_ref2) {
      var _this4 = this;

      var isExpr = _ref2.isExpr;
      var inDefault = _ref2.inDefault;

      var startLocation = this.getLocation();

      this.lex();
      var name = null;
      var heritage = null;

      if (this.match(_tokenizer.TokenType.IDENTIFIER)) {
        name = this.parseBindingIdentifier();
      } else if (!isExpr) {
        if (inDefault) {
          name = this.markLocation({ type: "BindingIdentifier", name: "*default*" }, startLocation);
        } else {
          throw this.createUnexpected(this.lookahead);
        }
      }

      var previousInGeneratorParameter = this.inGeneratorParameter;
      var previousParamYield = this.allowYieldExpression;
      if (isExpr) {
        this.inGeneratorParameter = false;
        this.allowYieldExpression = false;
      }
      if (this.eat(_tokenizer.TokenType.EXTENDS)) {
        heritage = this.isolateCoverGrammar(function () {
          return _this4.parseLeftHandSideExpression({ allowCall: true });
        });
      }

      this.expect(_tokenizer.TokenType.LBRACE);
      var elements = [];
      while (!this.eat(_tokenizer.TokenType.RBRACE)) {
        if (this.eat(_tokenizer.TokenType.SEMICOLON)) {
          continue;
        }
        var isStatic = false;

        var _parseMethodDefinition2 = this.parseMethodDefinition();

        var methodOrKey = _parseMethodDefinition2.methodOrKey;
        var kind = _parseMethodDefinition2.kind;

        if (kind === "identifier" && methodOrKey.value === "static") {
          isStatic = true;

          var _temp = this.parseMethodDefinition();

          methodOrKey = _temp.methodOrKey;
          kind = _temp.kind;
          _temp;
        }
        if (kind === "method") {
          elements.push(copyLocation(methodOrKey, { type: "ClassElement", isStatic: isStatic, method: methodOrKey }));
        } else {
          throw this.createError("Only methods are allowed in classes");
        }
      }
      this.allowYieldExpression = previousParamYield;
      this.inGeneratorParameter = previousInGeneratorParameter;
      return this.markLocation({ type: isExpr ? "ClassExpression" : "ClassDeclaration", name: name, "super": heritage, elements: elements }, startLocation);
    }
  }, {
    key: "parseFunction",
    value: function parseFunction(_ref3) {
      var isExpr = _ref3.isExpr;
      var inDefault = _ref3.inDefault;
      var allowGenerator = _ref3.allowGenerator;

      var startLocation = this.getLocation();

      this.lex();

      var name = null;
      var isGenerator = allowGenerator && !!this.eat(_tokenizer.TokenType.MUL);
      var previousGeneratorParameter = this.inGeneratorParameter;
      var previousYield = this.allowYieldExpression;
      var previousInGeneratorBody = this.inGeneratorBody;

      if (!this.match(_tokenizer.TokenType.LPAREN)) {
        name = this.parseBindingIdentifier();
      } else if (!isExpr) {
        if (inDefault) {
          name = this.markLocation({ type: "BindingIdentifier", name: "*default*" }, startLocation);
        } else {
          throw this.createUnexpected(this.lookahead);
        }
      }

      this.inGeneratorParameter = isGenerator;
      this.allowYieldExpression = isGenerator;
      var params = this.parseParams();
      this.inGeneratorParameter = previousGeneratorParameter;

      this.allowYieldExpression = isGenerator;

      if (isGenerator) {
        this.inGeneratorBody = true;
      }

      var body = this.parseFunctionBody();
      this.inGeneratorBody = previousInGeneratorBody;
      this.allowYieldExpression = previousYield;

      var type = isExpr ? "FunctionExpression" : "FunctionDeclaration";
      return this.markLocation({ type: type, isGenerator: isGenerator, name: name, params: params, body: body }, startLocation);
    }
  }, {
    key: "parseArrayBinding",
    value: function parseArrayBinding() {
      var startLocation = this.getLocation();

      this.expect(_tokenizer.TokenType.LBRACK);

      var elements = [],
          restElement = null;

      while (true) {
        if (this.match(_tokenizer.TokenType.RBRACK)) {
          break;
        }
        var el = undefined;

        if (this.eat(_tokenizer.TokenType.COMMA)) {
          el = null;
        } else {
          if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
            restElement = this.parseBindingIdentifier();
            break;
          } else {
            el = this.parseBindingElement();
          }
          if (!this.match(_tokenizer.TokenType.RBRACK)) {
            this.expect(_tokenizer.TokenType.COMMA);
          }
        }
        elements.push(el);
      }

      this.expect(_tokenizer.TokenType.RBRACK);

      return this.markLocation({ type: "ArrayBinding", elements: elements, restElement: restElement }, startLocation);
    }
  }, {
    key: "parseBindingProperty",
    value: function parseBindingProperty() {
      var startLocation = this.getLocation();
      var token = this.lookahead;

      var _parsePropertyName4 = this.parsePropertyName();

      var name = _parsePropertyName4.name;
      var binding = _parsePropertyName4.binding;

      if ((token.type === _tokenizer.TokenType.IDENTIFIER || token.type === _tokenizer.TokenType.YIELD) && name.type === "StaticPropertyName") {
        if (!this.match(_tokenizer.TokenType.COLON)) {
          var defaultValue = null;
          if (this.eat(_tokenizer.TokenType.ASSIGN)) {
            var previousAllowYieldExpression = this.allowYieldExpression;
            if (this.inGeneratorParameter) {
              this.allowYieldExpression = false;
            }
            var _expr5 = this.parseAssignmentExpression();
            defaultValue = _expr5;
            this.allowYieldExpression = previousAllowYieldExpression;
          }
          return this.markLocation({
            type: "BindingPropertyIdentifier",
            binding: binding,
            init: defaultValue }, startLocation);
        }
      }
      this.expect(_tokenizer.TokenType.COLON);
      binding = this.parseBindingElement();
      return this.markLocation({ type: "BindingPropertyProperty", name: name, binding: binding }, startLocation);
    }
  }, {
    key: "parseObjectBinding",
    value: function parseObjectBinding() {
      var startLocation = this.getLocation();

      this.expect(_tokenizer.TokenType.LBRACE);

      var properties = [];
      while (!this.match(_tokenizer.TokenType.RBRACE)) {
        properties.push(this.parseBindingProperty());
        if (!this.match(_tokenizer.TokenType.RBRACE)) {
          this.expect(_tokenizer.TokenType.COMMA);
        }
      }

      this.expect(_tokenizer.TokenType.RBRACE);

      return this.markLocation({ type: "ObjectBinding", properties: properties }, startLocation);
    }
  }, {
    key: "parseBindingTarget",
    value: function parseBindingTarget() {
      switch (this.lookahead.type) {
        case _tokenizer.TokenType.IDENTIFIER:
        case _tokenizer.TokenType.LET:
        case _tokenizer.TokenType.YIELD:
          return this.parseBindingIdentifier();
        case _tokenizer.TokenType.LBRACK:
          return this.parseArrayBinding();
        case _tokenizer.TokenType.LBRACE:
          return this.parseObjectBinding();
      }
      throw this.createUnexpected(this.lookahead);
    }
  }, {
    key: "parseBindingElement",
    value: function parseBindingElement() {
      var startLocation = this.getLocation();
      var binding = this.parseBindingTarget();

      if (this.eat(_tokenizer.TokenType.ASSIGN)) {
        var previousInGeneratorParameter = this.inGeneratorParameter;
        var previousYieldExpression = this.allowYieldExpression;
        if (this.inGeneratorParameter) {
          this.allowYieldExpression = false;
        }
        this.inGeneratorParameter = false;
        var init = this.parseAssignmentExpression();
        binding = this.markLocation({ type: "BindingWithDefault", binding: binding, init: init }, startLocation);
        this.inGeneratorParameter = previousInGeneratorParameter;
        this.allowYieldExpression = previousYieldExpression;
      }
      return binding;
    }
  }, {
    key: "parseParam",
    value: function parseParam() {
      var previousInParameter = this.inParameter;
      this.inParameter = true;
      var param = this.parseBindingElement();
      this.inParameter = previousInParameter;
      return param;
    }
  }, {
    key: "parseParams",
    value: function parseParams() {
      var paramsLocation = this.getLocation();

      this.expect(_tokenizer.TokenType.LPAREN);

      var items = [],
          rest = null;
      if (!this.match(_tokenizer.TokenType.RPAREN)) {
        while (!this.eof()) {
          if (this.eat(_tokenizer.TokenType.ELLIPSIS)) {
            rest = this.parseBindingIdentifier();
            break;
          }
          items.push(this.parseParam());
          if (this.match(_tokenizer.TokenType.RPAREN)) break;
          this.expect(_tokenizer.TokenType.COMMA);
        }
      }

      this.expect(_tokenizer.TokenType.RPAREN);

      return this.markLocation({ type: "FormalParameters", items: items, rest: rest }, paramsLocation);
    }
  }]);

  return Parser;
})(_tokenizer["default"]);

exports.Parser = Parser;
},{"./errors":3,"./tokenizer":6}],5:[function(require,module,exports){
// istanbul ignore next
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PatternAcceptor = (function () {
  function PatternAcceptor(pattern, u) {
    _classCallCheck(this, PatternAcceptor);

    this.index = 0;
    this.nCapturingParens = 0;
    // constants
    this.length = pattern.length;
    this.pattern = pattern;
    this.u = u;
  }

  _createClass(PatternAcceptor, [{
    key: "eat",
    value: function eat(ch) {
      if (this.index >= this.length || this.pattern[this.index] !== ch) return false;
      ++this.index;
      return true;
    }
  }, {
    key: "eatRegExp",
    value: function eatRegExp(r) {
      if (this.index >= this.length || !r.test(this.pattern[this.index])) return false;
      ++this.index;
      return true;
    }
  }, {
    key: "eatN",
    value: function eatN(n, r) {
      if (this.index + n <= this.length && r.test(this.pattern.slice(this.index, this.index + n))) {
        this.index += n;
        return true;
      }
      return false;
    }
  }, {
    key: "match",
    value: function match(ch) {
      return this.index < this.length && this.pattern[this.index] === ch;
    }
  }, {
    key: "matchRegExp",
    value: function matchRegExp(r) {
      return this.index < this.length && r.test(this.pattern[this.index]);
    }
  }, {
    key: "trackback",
    value: function trackback(start, result) {
      if (result) return true;
      this.index = start;
      return false;
    }
  }, {
    key: "readDisjunction",
    value: function readDisjunction() {
      return this.readAlternative() && (this.eat("|") ? this.readDisjunction() : true);
    }
  }, {
    key: "readAlternative",
    value: function readAlternative() {
      var savedIndex = this.index;
      while (this.readTerm()) {
        savedIndex = this.index;
      }
      this.index = savedIndex;
      return true;
    }
  }, {
    key: "readTerm",
    value: function readTerm() {
      if (!this.u) return this.readExtendedTerm();
      return this.readAssertion() || this.readQuantifiableAssertion() || this.readAtom() && (this.readQuantifier(), true);
    }
  }, {
    key: "readExtendedTerm",
    value: function readExtendedTerm() {
      return this.readQuantifiableAssertion() && (this.readQuantifier(), true) || this.readAssertion() || this.readAtomNoBrace() && (this.readQuantifier(), true) || this.readAtom();
    }
  }, {
    key: "readAssertion",
    value: function readAssertion() {
      return this.eat("^") || this.eat("$") || this.eatN(2, /^\\[bB]$/);
    }
  }, {
    key: "readQuantifiableAssertion",
    value: function readQuantifiableAssertion() {
      var start = this.index;
      return this.eatN(3, /^\(\?[=!]$/) && this.trackback(start, this.readDisjunction() && this.eat(")"));
    }
  }, {
    key: "readQuantifier",
    value: function readQuantifier() {
      return this.readQuantifierPrefix() && (this.eat("?"), true);
    }
  }, {
    key: "readQuantifierPrefix",
    value: function readQuantifierPrefix() {
      if (this.eat("*") || this.eat("+") || this.eat("?")) return true;
      if (this.eat("{") && this.readDecimalDigits()) {
        if (this.eat(",")) this.readDecimalDigits();
        return this.eat("}");
      }
      return false;
    }
  }, {
    key: "readDecimalDigits",
    value: function readDecimalDigits() {
      var start = this.index;
      while (this.eatRegExp(/^\d$/));
      return this.index > start;
    }
  }, {
    key: "readAtomNoBrace",
    value: function readAtomNoBrace() {
      var start = this.index;
      var startingParens = this.nCapturingParens;
      if (this.readPatternCharacterNoBrace() || this.eat(".")) return true;
      if (this.eat("\\")) return this.trackback(start, this.readAtomEscape());
      if (this.readCharacterClass()) return true;
      if (this.eat("(")) {
        if (!this.eatN(2, /^\?:$/)) ++this.nCapturingParens;
        if (this.readDisjunction() && this.eat(")")) return true;
        this.nCapturingParens = startingParens;
        this.index = start;
        return false;
      }
      return false;
    }
  }, {
    key: "readAtom",
    value: function readAtom() {
      return this.readAtomNoBrace() || this.eat("{") || this.eat("}");
    }
  }, {
    key: "readSyntaxCharacter",
    value: function readSyntaxCharacter() {
      return this.eatRegExp(/^[\^$\\.*+?()[\]{}|]$/);
    }
  }, {
    key: "readPatternCharacterNoBrace",
    value: function readPatternCharacterNoBrace() {
      return this.eatRegExp(/^[^\^$\\.*+?()[\]{}|]$/);
    }
  }, {
    key: "readAtomEscape",
    value: function readAtomEscape() {
      return this.readDecimalEscape() || this.readCharacterEscape() || this.readCharacterClassEscape();
    }
  }, {
    key: "readCharacterEscape",
    value: function readCharacterEscape() {
      return this.readControlEscape() || this.eat("c") && this.readControlLetter() || this.readHexEscapeSequence() || this.readRegExpUnicodeEscapeSequence() || this.readIdentityEscape();
    }
  }, {
    key: "readControlEscape",
    value: function readControlEscape() {
      return this.eatRegExp(/^[fnrtv]$/);
    }
  }, {
    key: "readControlLetter",
    value: function readControlLetter() {
      return this.eatRegExp(/^[a-zA-Z]$/);
    }
  }, {
    key: "readHexEscapeSequence",
    value: function readHexEscapeSequence() {
      return this.eat("x") && this.readHexDigit() && this.readHexDigit();
    }
  }, {
    key: "readHexDigit",
    value: function readHexDigit() {
      return this.eatRegExp(/^[a-fA-F0-9]$/);
    }
  }, {
    key: "readRegExpUnicodeEscapeSequence",
    value: function readRegExpUnicodeEscapeSequence() {
      if (!this.eat("u")) return false;
      if (this.u) {
        if (this.eatN(4, /^D[abAB89][a-fA-F0-9]{2}$/)) {
          this.eatN(6, /^\\u[dD][c-fC-F0-9][a-fA-F0-9]{2}$/);
          return true;
        }
        return this.readHex4Digits() || this.eat("{") && this.readHexDigits() && this.eat("}");
      } else {
        return this.readHex4Digits();
      }
    }
  }, {
    key: "readHex4Digits",
    value: function readHex4Digits() {
      var k = 4;
      while (k > 0) {
        --k;
        if (!this.readHexDigit()) return false;
      }
      return true;
    }
  }, {
    key: "readHexDigits",
    value: function readHexDigits() {
      var start = this.index;
      while (this.readHexDigit());
      return this.index > start;
    }
  }, {
    key: "readIdentityEscape",
    value: function readIdentityEscape() {
      if (this.u) {
        return this.readSyntaxCharacter() || this.eat("/");
      } else {
        return this.eatRegExp(/^[^a-zA-Z0-9_]$/); // TODO: SourceCharacter but not UnicodeIDContinue
      }
    }
  }, {
    key: "readDecimalEscape",
    value: function readDecimalEscape() {
      if (this.eat("0")) {
        if (!this.matchRegExp(/^\d$/)) return true;
        --this.index;
        return false;
      }
      var start = this.index;
      while (this.eatRegExp(/^\d$/));
      return this.trackback(start, this.index > start && (this.u || +this.pattern.slice(start, this.index) <= this.nCapturingParens));
    }
  }, {
    key: "readCharacterClassEscape",
    value: function readCharacterClassEscape() {
      return this.eatRegExp(/^[dDsSwW]$/);
    }
  }, {
    key: "readCharacterClass",
    value: function readCharacterClass() {
      var start = this.index;
      return this.eat("[") && this.trackback(start, (this.eat("^"), true) && this.readClassRanges() && this.eat("]"));
    }
  }, {
    key: "readClassRanges",
    value: function readClassRanges() {
      var start = this.index;
      if (!this.readNonemptyClassRanges()) {
        this.index = start;
      }
      return true;
    }
  }, {
    key: "readNonemptyClassRanges",
    value: function readNonemptyClassRanges() {
      if (!this.readClassAtom()) return false;
      if (this.match("]")) return true;
      if (this.eat("-")) {
        if (this.match("]")) return true;
        return this.readClassAtom() && this.readClassRanges();
      }
      return this.readNonemptyClassRangesNoDash();
    }
  }, {
    key: "readNonemptyClassRangesNoDash",
    value: function readNonemptyClassRangesNoDash() {
      // NOTE: it is impossible to reach this next line with a value matched by RegularExpressionLiteral;
      // the pattern "[-a" would reach here if it could get past RegularExpressionLiteral
      /* istanbul ignore next */
      if (!this.readClassAtomNoDash()) return false;
      if (this.match("]")) return true;
      if (this.eat("-")) {
        if (this.match("]")) return true;
        return this.readClassAtom() && this.readClassRanges();
      }
      return this.readNonemptyClassRangesNoDash();
    }
  }, {
    key: "readClassAtom",
    value: function readClassAtom() {
      return this.eat("-") || this.readClassAtomNoDash();
    }
  }, {
    key: "readClassAtomNoDash",
    value: function readClassAtomNoDash() {
      return this.eatRegExp(/^[^\\\]-]$/) || this.eat("\\") && this.readClassEscape();
    }
  }, {
    key: "readClassEscape",
    value: function readClassEscape() {
      return this.readDecimalEscape() || this.eat("b") || this.u && this.eat("-") || this.readCharacterEscape() || this.readCharacterClassEscape();
    }
  }], [{
    key: "test",
    value: function test(pattern, u) {
      var acceptor = new PatternAcceptor(pattern, u);
      return acceptor.readDisjunction() && acceptor.index === acceptor.length;
    }
  }]);

  return PatternAcceptor;
})();

exports.PatternAcceptor = PatternAcceptor;
},{}],6:[function(require,module,exports){
// istanbul ignore next
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

// istanbul ignore next

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _utils = require("./utils");

var _errors = require("./errors");

var TokenClass = {
  Eof: { name: "<End>" },
  Ident: { name: "Identifier", isIdentifierName: true },
  Keyword: { name: "Keyword", isIdentifierName: true },
  NumericLiteral: { name: "Numeric" },
  TemplateElement: { name: "Template" },
  Punctuator: { name: "Punctuator" },
  StringLiteral: { name: "String" },
  RegularExpression: { name: "RegularExpression" },
  LineComment: { name: "Line" },
  BlockComment: { name: "Block" },
  Illegal: { name: "Illegal" } };

exports.TokenClass = TokenClass;
var TokenType = {
  EOS: { klass: TokenClass.Eof, name: "EOS" },
  LPAREN: { klass: TokenClass.Punctuator, name: "(" },
  RPAREN: { klass: TokenClass.Punctuator, name: ")" },
  LBRACK: { klass: TokenClass.Punctuator, name: "[" },
  RBRACK: { klass: TokenClass.Punctuator, name: "]" },
  LBRACE: { klass: TokenClass.Punctuator, name: "{" },
  RBRACE: { klass: TokenClass.Punctuator, name: "}" },
  COLON: { klass: TokenClass.Punctuator, name: ":" },
  SEMICOLON: { klass: TokenClass.Punctuator, name: ";" },
  PERIOD: { klass: TokenClass.Punctuator, name: "." },
  ELLIPSIS: { klass: TokenClass.Punctuator, name: "..." },
  ARROW: { klass: TokenClass.Punctuator, name: "=>" },
  CONDITIONAL: { klass: TokenClass.Punctuator, name: "?" },
  INC: { klass: TokenClass.Punctuator, name: "++" },
  DEC: { klass: TokenClass.Punctuator, name: "--" },
  ASSIGN: { klass: TokenClass.Punctuator, name: "=" },
  ASSIGN_BIT_OR: { klass: TokenClass.Punctuator, name: "|=" },
  ASSIGN_BIT_XOR: { klass: TokenClass.Punctuator, name: "^=" },
  ASSIGN_BIT_AND: { klass: TokenClass.Punctuator, name: "&=" },
  ASSIGN_SHL: { klass: TokenClass.Punctuator, name: "<<=" },
  ASSIGN_SHR: { klass: TokenClass.Punctuator, name: ">>=" },
  ASSIGN_SHR_UNSIGNED: { klass: TokenClass.Punctuator, name: ">>>=" },
  ASSIGN_ADD: { klass: TokenClass.Punctuator, name: "+=" },
  ASSIGN_SUB: { klass: TokenClass.Punctuator, name: "-=" },
  ASSIGN_MUL: { klass: TokenClass.Punctuator, name: "*=" },
  ASSIGN_DIV: { klass: TokenClass.Punctuator, name: "/=" },
  ASSIGN_MOD: { klass: TokenClass.Punctuator, name: "%=" },
  COMMA: { klass: TokenClass.Punctuator, name: "," },
  OR: { klass: TokenClass.Punctuator, name: "||" },
  AND: { klass: TokenClass.Punctuator, name: "&&" },
  BIT_OR: { klass: TokenClass.Punctuator, name: "|" },
  BIT_XOR: { klass: TokenClass.Punctuator, name: "^" },
  BIT_AND: { klass: TokenClass.Punctuator, name: "&" },
  SHL: { klass: TokenClass.Punctuator, name: "<<" },
  SHR: { klass: TokenClass.Punctuator, name: ">>" },
  SHR_UNSIGNED: { klass: TokenClass.Punctuator, name: ">>>" },
  ADD: { klass: TokenClass.Punctuator, name: "+" },
  SUB: { klass: TokenClass.Punctuator, name: "-" },
  MUL: { klass: TokenClass.Punctuator, name: "*" },
  DIV: { klass: TokenClass.Punctuator, name: "/" },
  MOD: { klass: TokenClass.Punctuator, name: "%" },
  EQ: { klass: TokenClass.Punctuator, name: "==" },
  NE: { klass: TokenClass.Punctuator, name: "!=" },
  EQ_STRICT: { klass: TokenClass.Punctuator, name: "===" },
  NE_STRICT: { klass: TokenClass.Punctuator, name: "!==" },
  LT: { klass: TokenClass.Punctuator, name: "<" },
  GT: { klass: TokenClass.Punctuator, name: ">" },
  LTE: { klass: TokenClass.Punctuator, name: "<=" },
  GTE: { klass: TokenClass.Punctuator, name: ">=" },
  INSTANCEOF: { klass: TokenClass.Keyword, name: "instanceof" },
  IN: { klass: TokenClass.Keyword, name: "in" },
  NOT: { klass: TokenClass.Punctuator, name: "!" },
  BIT_NOT: { klass: TokenClass.Punctuator, name: "~" },
  DELETE: { klass: TokenClass.Keyword, name: "delete" },
  TYPEOF: { klass: TokenClass.Keyword, name: "typeof" },
  VOID: { klass: TokenClass.Keyword, name: "void" },
  BREAK: { klass: TokenClass.Keyword, name: "break" },
  CASE: { klass: TokenClass.Keyword, name: "case" },
  CATCH: { klass: TokenClass.Keyword, name: "catch" },
  CLASS: { klass: TokenClass.Keyword, name: "class" },
  CONTINUE: { klass: TokenClass.Keyword, name: "continue" },
  DEBUGGER: { klass: TokenClass.Keyword, name: "debugger" },
  DEFAULT: { klass: TokenClass.Keyword, name: "default" },
  DO: { klass: TokenClass.Keyword, name: "do" },
  ELSE: { klass: TokenClass.Keyword, name: "else" },
  EXPORT: { klass: TokenClass.Keyword, name: "export" },
  EXTENDS: { klass: TokenClass.Keyword, name: "extends" },
  FINALLY: { klass: TokenClass.Keyword, name: "finally" },
  FOR: { klass: TokenClass.Keyword, name: "for" },
  FUNCTION: { klass: TokenClass.Keyword, name: "function" },
  IF: { klass: TokenClass.Keyword, name: "if" },
  IMPORT: { klass: TokenClass.Keyword, name: "import" },
  LET: { klass: TokenClass.Keyword, name: "let" },
  NEW: { klass: TokenClass.Keyword, name: "new" },
  RETURN: { klass: TokenClass.Keyword, name: "return" },
  SUPER: { klass: TokenClass.Keyword, name: "super" },
  SWITCH: { klass: TokenClass.Keyword, name: "switch" },
  THIS: { klass: TokenClass.Keyword, name: "this" },
  THROW: { klass: TokenClass.Keyword, name: "throw" },
  TRY: { klass: TokenClass.Keyword, name: "try" },
  VAR: { klass: TokenClass.Keyword, name: "var" },
  WHILE: { klass: TokenClass.Keyword, name: "while" },
  WITH: { klass: TokenClass.Keyword, name: "with" },
  NULL: { klass: TokenClass.Keyword, name: "null" },
  TRUE: { klass: TokenClass.Keyword, name: "true" },
  FALSE: { klass: TokenClass.Keyword, name: "false" },
  YIELD: { klass: TokenClass.Keyword, name: "yield" },
  NUMBER: { klass: TokenClass.NumericLiteral, name: "" },
  STRING: { klass: TokenClass.StringLiteral, name: "" },
  REGEXP: { klass: TokenClass.RegularExpression, name: "" },
  IDENTIFIER: { klass: TokenClass.Ident, name: "" },
  CONST: { klass: TokenClass.Keyword, name: "const" },
  TEMPLATE: { klass: TokenClass.TemplateElement, name: "" },
  ILLEGAL: { klass: TokenClass.Illegal, name: "" } };

exports.TokenType = TokenType;
var TT = TokenType;
var I = TT.ILLEGAL;
var F = false;
var T = true;

var ONE_CHAR_PUNCTUATOR = [I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, TT.NOT, I, I, I, TT.MOD, TT.BIT_AND, I, TT.LPAREN, TT.RPAREN, TT.MUL, TT.ADD, TT.COMMA, TT.SUB, TT.PERIOD, TT.DIV, I, I, I, I, I, I, I, I, I, I, TT.COLON, TT.SEMICOLON, TT.LT, TT.ASSIGN, TT.GT, TT.CONDITIONAL, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, TT.LBRACK, I, TT.RBRACK, TT.BIT_XOR, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, TT.LBRACE, TT.BIT_OR, TT.RBRACE, TT.BIT_NOT];

var PUNCTUATOR_START = [F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, T, F, F, F, T, T, F, T, T, T, T, T, T, F, T, F, F, F, F, F, F, F, F, F, F, T, T, T, T, T, T, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, T, F, T, T, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, F, T, T, T, T, F];

var JsError = (function (_Error) {
  function JsError(index, line, column, msg) {
    _classCallCheck(this, JsError);

    _get(Object.getPrototypeOf(JsError.prototype), "constructor", this).call(this, msg);
    this.index = index;
    this.line = line;
    this.column = column;
    this.description = msg;
    this.message = "[" + line + ":" + column + "]: " + msg;
  }

  _inherits(JsError, _Error);

  return JsError;
})(Error);

exports.JsError = JsError;

function fromCodePoint(cp) {
  if (cp <= 65535) return String.fromCharCode(cp);
  var cu1 = String.fromCharCode(Math.floor((cp - 65536) / 1024) + 55296);
  var cu2 = String.fromCharCode((cp - 65536) % 1024 + 56320);
  return cu1 + cu2;
}

function decodeUtf16(lead, trail) {
  return (lead - 55296) * 1024 + (trail - 56320) + 65536;
}

var Tokenizer = (function () {
  function Tokenizer(source) {
    _classCallCheck(this, Tokenizer);

    this.source = source;
    this.index = 0;
    this.line = 0;
    this.lineStart = 0;
    this.startIndex = 0;
    this.startLine = 0;
    this.startLineStart = 0;
    this.lastIndex = 0;
    this.lastLine = 0;
    this.lastLineStart = 0;
    this.hasLineTerminatorBeforeNext = false;
    this.tokenIndex = 0;
  }

  _createClass(Tokenizer, [{
    key: "saveLexerState",
    value: function saveLexerState() {
      return {
        source: this.source,
        index: this.index,
        line: this.line,
        lineStart: this.lineStart,
        startIndex: this.startIndex,
        startLine: this.startLine,
        startLineStart: this.startLineStart,
        lastIndex: this.lastIndex,
        lastLine: this.lastLine,
        lastLineStart: this.lastLineStart,
        lookahead: this.lookahead,
        hasLineTerminatorBeforeNext: this.hasLineTerminatorBeforeNext,
        tokenIndex: this.tokenIndex };
    }
  }, {
    key: "restoreLexerState",
    value: function restoreLexerState(state) {
      this.source = state.source;
      this.index = state.index;
      this.line = state.line;
      this.lineStart = state.lineStart;
      this.startIndex = state.startIndex;
      this.startLine = state.startLine;
      this.startLineStart = state.startLineStart;
      this.lastIndex = state.lastIndex;
      this.lastLine = state.lastLine;
      this.lastLineStart = state.lastLineStart;
      this.lookahead = state.lookahead;
      this.hasLineTerminatorBeforeNext = state.hasLineTerminatorBeforeNext;
      this.tokenIndex = state.tokenIndex;
    }
  }, {
    key: "createILLEGAL",
    value: function createILLEGAL() {
      this.startIndex = this.index;
      this.startLine = this.line;
      this.startLineStart = this.lineStart;
      return this.index < this.source.length ? this.createError(_errors.ErrorMessages.UNEXPECTED_ILLEGAL_TOKEN, this.source.charAt(this.index)) : this.createError(_errors.ErrorMessages.UNEXPECTED_EOS);
    }
  }, {
    key: "createUnexpected",
    value: function createUnexpected(token) {
      switch (token.type.klass) {
        case TokenClass.Eof:
          return this.createError(_errors.ErrorMessages.UNEXPECTED_EOS);
        case TokenClass.NumericLiteral:
          return this.createError(_errors.ErrorMessages.UNEXPECTED_NUMBER);
        case TokenClass.StringLiteral:
          return this.createError(_errors.ErrorMessages.UNEXPECTED_STRING);
        case TokenClass.Ident:
          return this.createError(_errors.ErrorMessages.UNEXPECTED_IDENTIFIER);
        case TokenClass.Keyword:
          return this.createError(_errors.ErrorMessages.UNEXPECTED_TOKEN, token.slice.text);
        case TokenClass.Punctuator:
          return this.createError(_errors.ErrorMessages.UNEXPECTED_TOKEN, token.type.name);
      }
    }
  }, {
    key: "createError",
    value: function createError(message) {
      var _arguments2 = arguments;

      /* istanbul ignore next */
      var msg = message.replace(/\{(\d+)\}/g, function (_, n) {
        return JSON.stringify(_arguments2[+n + 1]);
      });
      return new JsError(this.startIndex, this.startLine + 1, this.startIndex - this.startLineStart + 1, msg);
    }
  }, {
    key: "createErrorWithLocation",
    value: function createErrorWithLocation(location, message) {
      var _arguments3 = arguments;

      /* istanbul ignore next */
      var msg = message.replace(/\{(\d+)\}/g, function (_, n) {
        return JSON.stringify(_arguments3[+n + 2]);
      });
      if (location.slice && location.slice.startLocation) {
        location = location.slice.startLocation;
      }
      return new JsError(location.offset, location.line, location.column + 1, msg);
    }
  }, {
    key: "skipSingleLineComment",
    value: function skipSingleLineComment(offset) {
      this.index += offset;
      while (this.index < this.source.length) {
        /**
         * @type {Number}
         */
        var chCode = this.source.charCodeAt(this.index);
        this.index++;
        if (_utils.isLineTerminator(chCode)) {
          this.hasLineTerminatorBeforeNext = true;
          if (chCode === 13 /* "\r" */ && this.source.charCodeAt(this.index) === 10 /*"\n" */) {
            this.index++;
          }
          this.lineStart = this.index;
          this.line++;
          return;
        }
      }
    }
  }, {
    key: "skipMultiLineComment",
    value: function skipMultiLineComment() {
      this.index += 2;
      var length = this.source.length;
      var isLineStart = false;
      while (this.index < length) {
        var chCode = this.source.charCodeAt(this.index);
        if (chCode < 128) {
          switch (chCode) {
            case 42:
              // "*"
              // Block comment ends with "*/".
              if (this.source.charAt(this.index + 1) === "/") {
                this.index = this.index + 2;
                return isLineStart;
              }
              this.index++;
              break;
            case 10:
              // "\n"
              isLineStart = true;
              this.hasLineTerminatorBeforeNext = true;
              this.index++;
              this.lineStart = this.index;
              this.line++;
              break;
            case 13:
              // "\r":
              isLineStart = true;
              this.hasLineTerminatorBeforeNext = true;
              if (this.source.charAt(this.index + 1) === "\n") {
                this.index++;
              }
              this.index++;
              this.lineStart = this.index;
              this.line++;
              break;
            default:
              this.index++;
          }
        } else if (chCode === 8232 || chCode === 8233) {
          isLineStart = true;
          this.hasLineTerminatorBeforeNext = true;
          this.index++;
          this.lineStart = this.index;
          this.line++;
        } else {
          this.index++;
        }
      }
      throw this.createILLEGAL();
    }
  }, {
    key: "skipComment",
    value: function skipComment() {
      this.hasLineTerminatorBeforeNext = false;

      var isLineStart = this.index === 0;
      var length = this.source.length;

      while (this.index < length) {
        var chCode = this.source.charCodeAt(this.index);
        if (_utils.isWhiteSpace(chCode)) {
          this.index++;
        } else if (_utils.isLineTerminator(chCode)) {
          this.hasLineTerminatorBeforeNext = true;
          this.index++;
          if (chCode === 13 /* "\r" */ && this.source.charAt(this.index) === "\n") {
            this.index++;
          }
          this.lineStart = this.index;
          this.line++;
          isLineStart = true;
        } else if (chCode === 47 /* "/" */) {
          if (this.index + 1 >= length) {
            break;
          }
          chCode = this.source.charCodeAt(this.index + 1);
          if (chCode === 47 /* "/" */) {
            this.skipSingleLineComment(2);
            isLineStart = true;
          } else if (chCode === 42 /* "*" */) {
            isLineStart = this.skipMultiLineComment() || isLineStart;
          } else {
            break;
          }
        } else if (!this.module && isLineStart && chCode === 45 /* "-" */) {
          if (this.index + 2 >= length) {
            break;
          }
          // U+003E is ">"
          if (this.source.charAt(this.index + 1) === "-" && this.source.charAt(this.index + 2) === ">") {
            // "-->" is a single-line comment
            this.skipSingleLineComment(3);
          } else {
            break;
          }
        } else if (!this.module && chCode === 60 /* "<" */) {
          if (this.source.slice(this.index + 1, this.index + 4) === "!--") {
            this.skipSingleLineComment(4);
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }
  }, {
    key: "scanHexEscape2",
    value: function scanHexEscape2() {
      if (this.index + 2 > this.source.length) {
        return -1;
      }
      var r1 = _utils.getHexValue(this.source.charAt(this.index));
      if (r1 === -1) {
        return -1;
      }
      var r2 = _utils.getHexValue(this.source.charAt(this.index + 1));
      if (r2 === -1) {
        return -1;
      }
      this.index += 2;
      return r1 << 4 | r2;
    }
  }, {
    key: "scanUnicode",
    value: function scanUnicode() {
      if (this.source.charAt(this.index) === "{") {
        //\u{HexDigits}
        var i = this.index + 1;
        var hexDigits = 0,
            ch = undefined;
        while (i < this.source.length) {
          ch = this.source.charAt(i);
          var hex = _utils.getHexValue(ch);
          if (hex === -1) {
            break;
          }
          hexDigits = hexDigits << 4 | hex;
          if (hexDigits > 1114111) {
            throw this.createILLEGAL();
          }
          i++;
        }
        if (ch !== "}") {
          throw this.createILLEGAL();
        }
        this.index = i + 1;
        return hexDigits;
      } else {
        //\uHex4Digits
        if (this.index + 4 > this.source.length) {
          return -1;
        }
        var r1 = _utils.getHexValue(this.source.charAt(this.index));
        if (r1 === -1) {
          return -1;
        }
        var r2 = _utils.getHexValue(this.source.charAt(this.index + 1));
        if (r2 === -1) {
          return -1;
        }
        var r3 = _utils.getHexValue(this.source.charAt(this.index + 2));
        if (r3 === -1) {
          return -1;
        }
        var r4 = _utils.getHexValue(this.source.charAt(this.index + 3));
        if (r4 === -1) {
          return -1;
        }
        this.index += 4;
        return r1 << 12 | r2 << 8 | r3 << 4 | r4;
      }
    }
  }, {
    key: "getEscapedIdentifier",
    value: function getEscapedIdentifier() {
      var id = "";
      var check = _utils.isIdentifierStart;

      while (this.index < this.source.length) {
        var ch = this.source.charAt(this.index);
        var code = ch.charCodeAt(0);
        var start = this.index;
        ++this.index;
        if (ch === "\\") {
          if (this.index >= this.source.length) {
            throw this.createILLEGAL();
          }
          if (this.source.charAt(this.index) !== "u") {
            throw this.createILLEGAL();
          }
          ++this.index;
          code = this.scanUnicode();
          if (code < 0) {
            throw this.createILLEGAL();
          }
          if (55296 <= code && code <= 56319) {
            if (this.source.charAt(this.index) !== "\\") {
              throw this.createILLEGAL();
            }
            ++this.index;
            if (this.index >= this.source.length) {
              throw this.createILLEGAL();
            }
            if (this.source.charAt(this.index) !== "u") {
              throw this.createILLEGAL();
            }
            ++this.index;
            var lowSurrogateCode = this.scanUnicode();
            if (!(56320 <= lowSurrogateCode && lowSurrogateCode <= 57343)) {
              throw this.createILLEGAL();
            }
            code = decodeUtf16(code, lowSurrogateCode);
          }
          ch = fromCodePoint(code);
        } else if (55296 <= code && code <= 56319) {
          if (this.index >= this.source.length) {
            throw this.createILLEGAL();
          }
          var lowSurrogateCode = this.source.charCodeAt(this.index);
          ++this.index;
          if (!(56320 <= lowSurrogateCode && lowSurrogateCode <= 57343)) {
            throw this.createILLEGAL();
          }
          code = decodeUtf16(code, lowSurrogateCode);
          ch = fromCodePoint(code);
        }
        if (!check(code)) {
          if (id.length < 1) {
            throw this.createILLEGAL();
          }
          this.index = start;
          return id;
        }
        check = _utils.isIdentifierPart;
        id += ch;
      }
      return id;
    }
  }, {
    key: "getIdentifier",
    value: function getIdentifier() {
      var start = this.index;
      var l = this.source.length;
      var i = this.index;
      var check = _utils.isIdentifierStart;
      while (i < l) {
        var ch = this.source.charAt(i);
        var code = ch.charCodeAt(0);
        if (ch === "\\" || 55296 <= code && code <= 56319) {
          // Go back and try the hard one.
          this.index = start;
          return this.getEscapedIdentifier();
        }
        if (!check(code)) {
          this.index = i;
          return this.source.slice(start, i);
        }
        ++i;
        check = _utils.isIdentifierPart;
      }
      this.index = i;
      return this.source.slice(start, i);
    }
  }, {
    key: "scanIdentifier",
    value: function scanIdentifier() {
      var startLocation = this.getLocation();
      var start = this.index;

      // Backslash (U+005C) starts an escaped character.
      var id = this.source.charAt(this.index) === "\\" ? this.getEscapedIdentifier() : this.getIdentifier();

      // There is no keyword or literal with only one character.
      // Thus, it must be an identifier.
      var slice = this.getSlice(start, startLocation);
      slice.text = id;

      return { type: Tokenizer.getKeyword(id), value: id, slice: slice };
    }
  }, {
    key: "getLocation",
    value: function getLocation() {
      return {
        line: this.startLine + 1,
        column: this.startIndex - this.startLineStart,
        offset: this.startIndex };
    }
  }, {
    key: "getSlice",
    value: function getSlice(start, startLocation) {
      return { text: this.source.slice(start, this.index), start: start, startLocation: startLocation, end: this.index };
    }
  }, {
    key: "scanPunctuatorHelper",
    value: function scanPunctuatorHelper() {
      var ch1 = this.source.charAt(this.index);

      switch (ch1) {
        // Check for most common single-character punctuators.
        case ".":
          var ch2 = this.source.charAt(this.index + 1);
          if (ch2 !== ".") return TokenType.PERIOD;
          var ch3 = this.source.charAt(this.index + 2);
          if (ch3 !== ".") return TokenType.PERIOD;
          return TokenType.ELLIPSIS;
        case "(":
          return TokenType.LPAREN;
        case ")":
        case ";":
        case ",":
          return ONE_CHAR_PUNCTUATOR[ch1.charCodeAt(0)];
        case "{":
          return TokenType.LBRACE;
        case "}":
        case "[":
        case "]":
        case ":":
        case "?":
        case "~":
          return ONE_CHAR_PUNCTUATOR[ch1.charCodeAt(0)];
        default:
          // "=" (U+003D) marks an assignment or comparison operator.
          if (this.index + 1 < this.source.length && this.source.charAt(this.index + 1) === "=") {
            switch (ch1) {
              case "=":
                if (this.index + 2 < this.source.length && this.source.charAt(this.index + 2) === "=") {
                  return TokenType.EQ_STRICT;
                }
                return TokenType.EQ;
              case "!":
                if (this.index + 2 < this.source.length && this.source.charAt(this.index + 2) === "=") {
                  return TokenType.NE_STRICT;
                }
                return TokenType.NE;
              case "|":
                return TokenType.ASSIGN_BIT_OR;
              case "+":
                return TokenType.ASSIGN_ADD;
              case "-":
                return TokenType.ASSIGN_SUB;
              case "*":
                return TokenType.ASSIGN_MUL;
              case "<":
                return TokenType.LTE;
              case ">":
                return TokenType.GTE;
              case "/":
                return TokenType.ASSIGN_DIV;
              case "%":
                return TokenType.ASSIGN_MOD;
              case "^":
                return TokenType.ASSIGN_BIT_XOR;
              case "&":
                return TokenType.ASSIGN_BIT_AND;
              // istanbul ignore next
              default:
                break; //failed
            }
          }
      }

      if (this.index + 1 < this.source.length) {
        var _ch2 = this.source.charAt(this.index + 1);
        if (ch1 === _ch2) {
          if (this.index + 2 < this.source.length) {
            var _ch3 = this.source.charAt(this.index + 2);
            if (ch1 === ">" && _ch3 === ">") {
              // 4-character punctuator: >>>=
              if (this.index + 3 < this.source.length && this.source.charAt(this.index + 3) === "=") {
                return TokenType.ASSIGN_SHR_UNSIGNED;
              }
              return TokenType.SHR_UNSIGNED;
            }

            if (ch1 === "<" && _ch3 === "=") {
              return TokenType.ASSIGN_SHL;
            }

            if (ch1 === ">" && _ch3 === "=") {
              return TokenType.ASSIGN_SHR;
            }
          }
          // Other 2-character punctuators: ++ -- << >> && ||
          switch (ch1) {
            case "+":
              return TokenType.INC;
            case "-":
              return TokenType.DEC;
            case "<":
              return TokenType.SHL;
            case ">":
              return TokenType.SHR;
            case "&":
              return TokenType.AND;
            case "|":
              return TokenType.OR;
            // istanbul ignore next
            default:
              break; //failed
          }
        } else if (ch1 === "=" && _ch2 === ">") {
          return TokenType.ARROW;
        }
      }

      return ONE_CHAR_PUNCTUATOR[ch1.charCodeAt(0)];
    }
  }, {
    key: "scanPunctuator",

    // 7.7 Punctuators
    value: function scanPunctuator() {
      var startLocation = this.getLocation();
      var start = this.index;
      var subType = this.scanPunctuatorHelper();
      this.index += subType.name.length;
      return { type: subType, value: subType.name, slice: this.getSlice(start, startLocation) };
    }
  }, {
    key: "scanHexLiteral",
    value: function scanHexLiteral(start, startLocation) {
      var i = this.index;
      while (i < this.source.length) {
        var ch = this.source.charAt(i);
        var hex = _utils.getHexValue(ch);
        if (hex === -1) {
          break;
        }
        i++;
      }

      if (this.index === i) {
        throw this.createILLEGAL();
      }

      if (i < this.source.length && _utils.isIdentifierStart(this.source.charCodeAt(i))) {
        throw this.createILLEGAL();
      }

      this.index = i;

      var slice = this.getSlice(start, startLocation);
      return { type: TokenType.NUMBER, value: parseInt(slice.text.substr(2), 16), slice: slice };
    }
  }, {
    key: "scanBinaryLiteral",
    value: function scanBinaryLiteral(start, startLocation) {
      var offset = this.index - start;

      while (this.index < this.source.length) {
        var ch = this.source.charAt(this.index);
        if (ch !== "0" && ch !== "1") {
          break;
        }
        this.index++;
      }

      if (this.index - start <= offset) {
        throw this.createILLEGAL();
      }

      if (this.index < this.source.length && (_utils.isIdentifierStart(this.source.charCodeAt(this.index)) || _utils.isDecimalDigit(this.source.charCodeAt(this.index)))) {
        throw this.createILLEGAL();
      }

      return {
        type: TokenType.NUMBER,
        value: parseInt(this.getSlice(start, startLocation).text.substr(offset), 2),
        slice: this.getSlice(start, startLocation),
        octal: false };
    }
  }, {
    key: "scanOctalLiteral",
    value: function scanOctalLiteral(start, startLocation) {
      while (this.index < this.source.length) {
        var ch = this.source.charAt(this.index);
        if ("0" <= ch && ch <= "7") {
          this.index++;
        } else if (_utils.isIdentifierPart(ch.charCodeAt(0))) {
          throw this.createILLEGAL();
        } else {
          break;
        }
      }

      if (this.index - start === 2) {
        throw this.createILLEGAL();
      }

      return {
        type: TokenType.NUMBER,
        value: parseInt(this.getSlice(start, startLocation).text.substr(2), 8),
        slice: this.getSlice(start, startLocation),
        octal: false };
    }
  }, {
    key: "scanLegacyOctalLiteral",
    value: function scanLegacyOctalLiteral(start, startLocation) {
      var isOctal = true;

      while (this.index < this.source.length) {
        var ch = this.source.charAt(this.index);
        if ("0" <= ch && ch <= "7") {
          this.index++;
        } else if (ch === "8" || ch === "9") {
          isOctal = false;
          this.index++;
        } else if (_utils.isIdentifierPart(ch.charCodeAt(0))) {
          throw this.createILLEGAL();
        } else {
          break;
        }
      }

      return {
        type: TokenType.NUMBER,
        slice: this.getSlice(start, startLocation),
        value: parseInt(this.getSlice(start, startLocation).text.substr(1), isOctal ? 8 : 10),
        octal: true };
    }
  }, {
    key: "scanNumericLiteral",
    value: function scanNumericLiteral() {
      var ch = this.source.charAt(this.index);
      // assert(ch === "." || "0" <= ch && ch <= "9")
      var startLocation = this.getLocation();
      var start = this.index;

      if (ch === "0") {
        this.index++;
        if (this.index < this.source.length) {
          ch = this.source.charAt(this.index);
          if (ch === "x" || ch === "X") {
            this.index++;
            return this.scanHexLiteral(start, startLocation);
          } else if (ch === "b" || ch === "B") {
            this.index++;
            return this.scanBinaryLiteral(start, startLocation);
          } else if (ch === "o" || ch === "O") {
            this.index++;
            return this.scanOctalLiteral(start, startLocation);
          } else if ("0" <= ch && ch <= "9") {
            return this.scanLegacyOctalLiteral(start, startLocation);
          }
        } else {
          var _slice = this.getSlice(start, startLocation);
          return {
            type: TokenType.NUMBER,
            value: +_slice.text,
            slice: _slice,
            octal: false };
        }
      } else if (ch !== ".") {
        // Must be "1".."9"
        ch = this.source.charAt(this.index);
        while ("0" <= ch && ch <= "9") {
          this.index++;
          if (this.index === this.source.length) {
            var _slice2 = this.getSlice(start, startLocation);
            return {
              type: TokenType.NUMBER,
              value: +_slice2.text,
              slice: _slice2,
              octal: false };
          }
          ch = this.source.charAt(this.index);
        }
      }

      var e = 0;
      if (ch === ".") {
        this.index++;
        if (this.index === this.source.length) {
          var _slice3 = this.getSlice(start, startLocation);
          return {
            type: TokenType.NUMBER,
            value: +_slice3.text,
            slice: _slice3,
            octal: false };
        }

        ch = this.source.charAt(this.index);
        while ("0" <= ch && ch <= "9") {
          e++;
          this.index++;
          if (this.index === this.source.length) {
            var _slice4 = this.getSlice(start, startLocation);
            return {
              type: TokenType.NUMBER,
              value: +_slice4.text,
              slice: _slice4,
              octal: false };
          }
          ch = this.source.charAt(this.index);
        }
      }

      // EOF not reached here
      if (ch === "e" || ch === "E") {
        this.index++;
        if (this.index === this.source.length) {
          throw this.createILLEGAL();
        }

        ch = this.source.charAt(this.index);
        var neg = false;
        if (ch === "+" || ch === "-") {
          neg = ch === "-";
          this.index++;
          if (this.index === this.source.length) {
            throw this.createILLEGAL();
          }
          ch = this.source.charAt(this.index);
        }

        var f = 0;
        if ("0" <= ch && ch <= "9") {
          while ("0" <= ch && ch <= "9") {
            f *= 10;
            f += +ch;
            this.index++;
            if (this.index === this.source.length) {
              break;
            }
            ch = this.source.charAt(this.index);
          }
        } else {
          throw this.createILLEGAL();
        }
        e += neg ? f : -f;
      }

      if (_utils.isIdentifierStart(ch.charCodeAt(0))) {
        throw this.createILLEGAL();
      }

      var slice = this.getSlice(start, startLocation);
      return {
        type: TokenType.NUMBER,
        value: +slice.text,
        slice: slice,
        octal: false };
    }
  }, {
    key: "scanStringEscape",
    value: function scanStringEscape(str, octal) {
      this.index++;
      if (this.index === this.source.length) {
        throw this.createILLEGAL();
      }
      var ch = this.source.charAt(this.index);
      if (!_utils.isLineTerminator(ch.charCodeAt(0))) {
        switch (ch) {
          case "n":
            str += "\n";
            this.index++;
            break;
          case "r":
            str += "\r";
            this.index++;
            break;
          case "t":
            str += "\t";
            this.index++;
            break;
          case "u":
          case "x":
            var unescaped = undefined;
            this.index++;
            if (this.index >= this.source.length) {
              throw this.createILLEGAL();
            }
            unescaped = ch === "u" ? this.scanUnicode() : this.scanHexEscape2();
            if (unescaped < 0) {
              throw this.createILLEGAL();
            }
            str += fromCodePoint(unescaped);
            break;
          case "b":
            str += "\b";
            this.index++;
            break;
          case "f":
            str += "\f";
            this.index++;
            break;
          case "v":
            str += "\u000b";
            this.index++;
            break;
          default:
            if ("0" <= ch && ch <= "7") {
              var octLen = 1;
              // 3 digits are only allowed when string starts
              // with 0, 1, 2, 3
              if ("0" <= ch && ch <= "3") {
                octLen = 0;
              }
              var code = 0;
              while (octLen < 3 && "0" <= ch && ch <= "7") {
                if (octLen > 0 || ch !== "0") {
                  octal = true;
                }
                code *= 8;
                octLen++;
                code += ch - "0";
                this.index++;
                if (this.index === this.source.length) {
                  throw this.createILLEGAL();
                }
                ch = this.source.charAt(this.index);
              }
              str += String.fromCharCode(code);
            } else if (ch === "8" || ch === "9") {
              throw this.createILLEGAL();
            } else {
              str += ch;
              this.index++;
            }
        }
      } else {
        this.index++;
        if (ch === "\r" && this.source.charAt(this.index) === "\n") {
          this.index++;
        }
        this.lineStart = this.index;
        this.line++;
      }
      return [str, octal];
    }
  }, {
    key: "scanStringLiteral",

    // 7.8.4 String Literals
    value: function scanStringLiteral() {
      var str = "";

      var quote = this.source.charAt(this.index);
      //  assert((quote === "\"" || quote === """), "String literal must starts with a quote")

      var startLocation = this.getLocation();
      var start = this.index;
      this.index++;

      var octal = false;
      while (this.index < this.source.length) {
        var ch = this.source.charAt(this.index);
        if (ch === quote) {
          this.index++;
          return { type: TokenType.STRING, slice: this.getSlice(start, startLocation), str: str, octal: octal };
        } else if (ch === "\\") {
          var _temp = this.scanStringEscape(str, octal);

          var _temp2 = _slicedToArray(_temp, 2);

          str = _temp2[0];
          octal = _temp2[1];
          _temp;
        } else if (_utils.isLineTerminator(ch.charCodeAt(0))) {
          throw this.createILLEGAL();
        } else {
          str += ch;
          this.index++;
        }
      }

      throw this.createILLEGAL();
    }
  }, {
    key: "scanTemplateElement",
    value: function scanTemplateElement() {
      var startLocation = this.getLocation();
      var start = this.index;
      this.index++;
      while (this.index < this.source.length) {
        var ch = this.source.charCodeAt(this.index);
        switch (ch) {
          case 96:
            // `
            this.index++;
            return { type: TokenType.TEMPLATE, tail: true, slice: this.getSlice(start, startLocation) };
          case 36:
            // $
            if (this.source.charCodeAt(this.index + 1) === 123) {
              // {
              this.index += 2;
              return { type: TokenType.TEMPLATE, tail: false, slice: this.getSlice(start, startLocation) };
            }
            this.index++;
            break;
          case 92:
            // \\
            {
              var octal = this.scanStringEscape("", false)[1];
              if (octal) {
                throw this.createILLEGAL();
              }
              break;
            }
          default:
            this.index++;
        }
      }

      throw this.createILLEGAL();
    }
  }, {
    key: "scanRegExp",
    value: function scanRegExp(str) {
      var startLocation = this.getLocation();
      var start = this.index;

      var terminated = false;
      var classMarker = false;
      while (this.index < this.source.length) {
        var ch = this.source.charAt(this.index);
        if (ch === "\\") {
          str += ch;
          this.index++;
          ch = this.source.charAt(this.index);
          // ECMA-262 7.8.5
          if (_utils.isLineTerminator(ch.charCodeAt(0))) {
            throw this.createError(_errors.ErrorMessages.UNTERMINATED_REGEXP);
          }
          str += ch;
          this.index++;
        } else if (_utils.isLineTerminator(ch.charCodeAt(0))) {
          throw this.createError(_errors.ErrorMessages.UNTERMINATED_REGEXP);
        } else {
          if (classMarker) {
            if (ch === "]") {
              classMarker = false;
            }
          } else {
            if (ch === "/") {
              terminated = true;
              str += ch;
              this.index++;
              break;
            } else if (ch === "[") {
              classMarker = true;
            }
          }
          str += ch;
          this.index++;
        }
      }

      if (!terminated) {
        throw this.createError(_errors.ErrorMessages.UNTERMINATED_REGEXP);
      }

      while (this.index < this.source.length) {
        var ch = this.source.charAt(this.index);
        if (ch === "\\") {
          throw this.createError(_errors.ErrorMessages.INVALID_REGEXP_FLAGS);
        }
        if (!_utils.isIdentifierPart(ch.charCodeAt(0))) {
          break;
        }
        this.index++;
        str += ch;
      }
      return { type: TokenType.REGEXP, value: str, slice: this.getSlice(start, startLocation) };
    }
  }, {
    key: "advance",
    value: function advance() {
      var startLocation = this.getLocation();

      this.lastIndex = this.index;
      this.lastLine = this.line;
      this.lastLineStart = this.lineStart;

      this.skipComment();

      this.startIndex = this.index;
      this.startLine = this.line;
      this.startLineStart = this.lineStart;

      if (this.lastIndex === 0) {
        this.lastIndex = this.index;
        this.lastLine = this.line;
        this.lastLineStart = this.lineStart;
      }

      if (this.index >= this.source.length) {
        return { type: TokenType.EOS, slice: this.getSlice(this.index, startLocation) };
      }

      var charCode = this.source.charCodeAt(this.index);

      if (charCode < 128) {
        if (PUNCTUATOR_START[charCode]) {
          return this.scanPunctuator();
        }

        if (_utils.isIdentifierStart(charCode) || charCode === 92 /* backslash (\) */) {
          return this.scanIdentifier();
        }

        // Dot (.) U+002E can also start a floating-polet number, hence the need
        // to check the next character.
        if (charCode === 46) {
          if (this.index + 1 < this.source.length && _utils.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
            return this.scanNumericLiteral();
          }
          return this.scanPunctuator();
        }

        // String literal starts with single quote (U+0027) or double quote (U+0022).
        if (charCode === 39 || charCode === 34) {
          return this.scanStringLiteral();
        }

        // Template literal starts with back quote (U+0060)
        if (charCode === 96) {
          return this.scanTemplateElement();
        }

        if (48 /* "0" */ <= charCode && charCode <= 57 /* "9" */) {
          return this.scanNumericLiteral();
        }

        // Slash (/) U+002F can also start a regex.
        throw this.createILLEGAL();
      } else {
        if (_utils.isIdentifierStart(charCode) || 55296 <= charCode && charCode <= 56319) {
          return this.scanIdentifier();
        }

        throw this.createILLEGAL();
      }
    }
  }, {
    key: "eof",
    value: function eof() {
      return this.lookahead.type === TokenType.EOS;
    }
  }, {
    key: "lex",
    value: function lex() {
      var prevToken = this.lookahead;
      this.lookahead = this.advance();
      this.tokenIndex++;
      return prevToken;
    }
  }], [{
    key: "cse2",
    value: function cse2(id, ch1, ch2) {
      return id.charAt(1) === ch1 && id.charAt(2) === ch2;
    }
  }, {
    key: "cse3",
    value: function cse3(id, ch1, ch2, ch3) {
      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3;
    }
  }, {
    key: "cse4",
    value: function cse4(id, ch1, ch2, ch3, ch4) {
      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3 && id.charAt(4) === ch4;
    }
  }, {
    key: "cse5",
    value: function cse5(id, ch1, ch2, ch3, ch4, ch5) {
      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3 && id.charAt(4) === ch4 && id.charAt(5) === ch5;
    }
  }, {
    key: "cse6",
    value: function cse6(id, ch1, ch2, ch3, ch4, ch5, ch6) {
      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3 && id.charAt(4) === ch4 && id.charAt(5) === ch5 && id.charAt(6) === ch6;
    }
  }, {
    key: "cse7",
    value: function cse7(id, ch1, ch2, ch3, ch4, ch5, ch6, ch7) {
      return id.charAt(1) === ch1 && id.charAt(2) === ch2 && id.charAt(3) === ch3 && id.charAt(4) === ch4 && id.charAt(5) === ch5 && id.charAt(6) === ch6 && id.charAt(7) === ch7;
    }
  }, {
    key: "getKeyword",
    value: function getKeyword(id) {
      if (id.length === 1 || id.length > 10) {
        return TokenType.IDENTIFIER;
      }

      /* istanbul ignore next */
      switch (id.length) {
        case 2:
          switch (id.charAt(0)) {
            case "i":
              switch (id.charAt(1)) {
                case "f":
                  return TokenType.IF;
                case "n":
                  return TokenType.IN;
                default:
                  break;
              }
              break;
            case "d":
              if (id.charAt(1) === "o") {
                return TokenType.DO;
              }
              break;
          }
          break;
        case 3:
          switch (id.charAt(0)) {
            case "v":
              if (Tokenizer.cse2(id, "a", "r")) {
                return TokenType.VAR;
              }
              break;
            case "f":
              if (Tokenizer.cse2(id, "o", "r")) {
                return TokenType.FOR;
              }
              break;
            case "n":
              if (Tokenizer.cse2(id, "e", "w")) {
                return TokenType.NEW;
              }
              break;
            case "t":
              if (Tokenizer.cse2(id, "r", "y")) {
                return TokenType.TRY;
              }
              break;
            case "l":
              if (Tokenizer.cse2(id, "e", "t")) {
                return TokenType.LET;
              }
              break;
          }
          break;
        case 4:
          switch (id.charAt(0)) {
            case "t":
              if (Tokenizer.cse3(id, "h", "i", "s")) {
                return TokenType.THIS;
              } else if (Tokenizer.cse3(id, "r", "u", "e")) {
                return TokenType.TRUE;
              }
              break;
            case "n":
              if (Tokenizer.cse3(id, "u", "l", "l")) {
                return TokenType.NULL;
              }
              break;
            case "e":
              if (Tokenizer.cse3(id, "l", "s", "e")) {
                return TokenType.ELSE;
              }
              break;
            case "c":
              if (Tokenizer.cse3(id, "a", "s", "e")) {
                return TokenType.CASE;
              }
              break;
            case "v":
              if (Tokenizer.cse3(id, "o", "i", "d")) {
                return TokenType.VOID;
              }
              break;
            case "w":
              if (Tokenizer.cse3(id, "i", "t", "h")) {
                return TokenType.WITH;
              }
              break;
          }
          break;
        case 5:
          switch (id.charAt(0)) {
            case "w":
              if (Tokenizer.cse4(id, "h", "i", "l", "e")) {
                return TokenType.WHILE;
              }
              break;
            case "b":
              if (Tokenizer.cse4(id, "r", "e", "a", "k")) {
                return TokenType.BREAK;
              }
              break;
            case "f":
              if (Tokenizer.cse4(id, "a", "l", "s", "e")) {
                return TokenType.FALSE;
              }
              break;
            case "c":
              if (Tokenizer.cse4(id, "a", "t", "c", "h")) {
                return TokenType.CATCH;
              } else if (Tokenizer.cse4(id, "o", "n", "s", "t")) {
                return TokenType.CONST;
              } else if (Tokenizer.cse4(id, "l", "a", "s", "s")) {
                return TokenType.CLASS;
              }
              break;
            case "t":
              if (Tokenizer.cse4(id, "h", "r", "o", "w")) {
                return TokenType.THROW;
              }
              break;
            case "y":
              if (Tokenizer.cse4(id, "i", "e", "l", "d")) {
                return TokenType.YIELD;
              }
              break;
            case "s":
              if (Tokenizer.cse4(id, "u", "p", "e", "r")) {
                return TokenType.SUPER;
              }
              break;
          }
          break;
        case 6:
          switch (id.charAt(0)) {
            case "r":
              if (Tokenizer.cse5(id, "e", "t", "u", "r", "n")) {
                return TokenType.RETURN;
              }
              break;
            case "t":
              if (Tokenizer.cse5(id, "y", "p", "e", "o", "f")) {
                return TokenType.TYPEOF;
              }
              break;
            case "d":
              if (Tokenizer.cse5(id, "e", "l", "e", "t", "e")) {
                return TokenType.DELETE;
              }
              break;
            case "s":
              if (Tokenizer.cse5(id, "w", "i", "t", "c", "h")) {
                return TokenType.SWITCH;
              }
              break;
            case "e":
              if (Tokenizer.cse5(id, "x", "p", "o", "r", "t")) {
                return TokenType.EXPORT;
              }
              break;
            case "i":
              if (Tokenizer.cse5(id, "m", "p", "o", "r", "t")) {
                return TokenType.IMPORT;
              }
              break;
          }
          break;
        case 7:
          switch (id.charAt(0)) {
            case "d":
              if (Tokenizer.cse6(id, "e", "f", "a", "u", "l", "t")) {
                return TokenType.DEFAULT;
              }
              break;
            case "f":
              if (Tokenizer.cse6(id, "i", "n", "a", "l", "l", "y")) {
                return TokenType.FINALLY;
              }
              break;
            case "e":
              if (Tokenizer.cse6(id, "x", "t", "e", "n", "d", "s")) {
                return TokenType.EXTENDS;
              }
              break;
          }
          break;
        case 8:
          switch (id.charAt(0)) {
            case "f":
              if (Tokenizer.cse7(id, "u", "n", "c", "t", "i", "o", "n")) {
                return TokenType.FUNCTION;
              }
              break;
            case "c":
              if (Tokenizer.cse7(id, "o", "n", "t", "i", "n", "u", "e")) {
                return TokenType.CONTINUE;
              }
              break;
            case "d":
              if (Tokenizer.cse7(id, "e", "b", "u", "g", "g", "e", "r")) {
                return TokenType.DEBUGGER;
              }
              break;
          }
          break;
        case 10:
          if (id === "instanceof") {
            return TokenType.INSTANCEOF;
          }
          break;
      }
      return TokenType.IDENTIFIER;
    }
  }]);

  return Tokenizer;
})();

exports["default"] = Tokenizer;
},{"./errors":3,"./utils":7}],7:[function(require,module,exports){
"use strict";

exports.isStrictModeReservedWord = isStrictModeReservedWord;
exports.getHexValue = getHexValue;
/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var _esutils = require("esutils");

var isReservedWordES6 = _esutils.keyword.isReservedWordES6;
var isRestrictedWord = _esutils.keyword.isRestrictedWord;
var isIdentifierStartES6 = _esutils.code.isIdentifierStartES6;
var isIdentifierPartES6 = _esutils.code.isIdentifierPartES6;
var isWhiteSpace = _esutils.code.isWhiteSpace;
var isLineTerminator = _esutils.code.isLineTerminator;
var isDecimalDigit = _esutils.code.isDecimalDigit;
exports.isRestrictedWord = isRestrictedWord;
exports.isIdentifierStart = isIdentifierStartES6;
exports.isIdentifierPart = isIdentifierPartES6;
exports.isWhiteSpace = isWhiteSpace;
exports.isLineTerminator = isLineTerminator;
exports.isDecimalDigit = isDecimalDigit;

function isStrictModeReservedWord(id) {
  return isReservedWordES6(id, true);
}

function getHexValue(rune) {
  if ("0" <= rune && rune <= "9") {
    return rune.charCodeAt(0) - 48;
  }
  if ("a" <= rune && rune <= "f") {
    return rune.charCodeAt(0) - 87;
  }
  if ("A" <= rune && rune <= "F") {
    return rune.charCodeAt(0) - 55;
  }
  return -1;
}
},{"esutils":67}],8:[function(require,module,exports){
'use strict';

if (!require('./is-implemented')()) {
	Object.defineProperty(require('es5-ext/global'), 'Map',
		{ value: require('./polyfill'), configurable: true, enumerable: false,
			writable: true });
}

},{"./is-implemented":9,"./polyfill":63,"es5-ext/global":17}],9:[function(require,module,exports){
'use strict';

module.exports = function () {
	var map, iterator, result;
	if (typeof Map !== 'function') return false;
	try {
		// WebKit doesn't support arguments and crashes
		map = new Map([['raz', 'one'], ['dwa', 'two'], ['trzy', 'three']]);
	} catch (e) {
		return false;
	}
	if (map.size !== 3) return false;
	if (typeof map.clear !== 'function') return false;
	if (typeof map.delete !== 'function') return false;
	if (typeof map.entries !== 'function') return false;
	if (typeof map.forEach !== 'function') return false;
	if (typeof map.get !== 'function') return false;
	if (typeof map.has !== 'function') return false;
	if (typeof map.keys !== 'function') return false;
	if (typeof map.set !== 'function') return false;
	if (typeof map.values !== 'function') return false;

	iterator = map.entries();
	result = iterator.next();
	if (result.done !== false) return false;
	if (!result.value) return false;
	if (result.value[0] !== 'raz') return false;
	if (result.value[1] !== 'one') return false;
	return true;
};

},{}],10:[function(require,module,exports){
// Exports true if environment provides native `Map` implementation,
// whatever that is.

'use strict';

module.exports = (function () {
	if (typeof Map === 'undefined') return false;
	return (Object.prototype.toString.call(Map.prototype) === '[object Map]');
}());

},{}],11:[function(require,module,exports){
'use strict';

module.exports = require('es5-ext/object/primitive-set')('key',
	'value', 'key+value');

},{"es5-ext/object/primitive-set":37}],12:[function(require,module,exports){
'use strict';

var setPrototypeOf    = require('es5-ext/object/set-prototype-of')
  , d                 = require('d')
  , Iterator          = require('es6-iterator')
  , toStringTagSymbol = require('es6-symbol').toStringTag
  , kinds             = require('./iterator-kinds')

  , defineProperties = Object.defineProperties
  , unBind = Iterator.prototype._unBind
  , MapIterator;

MapIterator = module.exports = function (map, kind) {
	if (!(this instanceof MapIterator)) return new MapIterator(map, kind);
	Iterator.call(this, map.__mapKeysData__, map);
	if (!kind || !kinds[kind]) kind = 'key+value';
	defineProperties(this, {
		__kind__: d('', kind),
		__values__: d('w', map.__mapValuesData__)
	});
};
if (setPrototypeOf) setPrototypeOf(MapIterator, Iterator);

MapIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(MapIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__values__[i];
		if (this.__kind__ === 'key') return this.__list__[i];
		return [this.__list__[i], this.__values__[i]];
	}),
	_unBind: d(function () {
		this.__values__ = null;
		unBind.call(this);
	}),
	toString: d(function () { return '[object Map Iterator]'; })
});
Object.defineProperty(MapIterator.prototype, toStringTagSymbol,
	d('c', 'Map Iterator'));

},{"./iterator-kinds":11,"d":14,"es5-ext/object/set-prototype-of":38,"es6-iterator":50,"es6-symbol":59}],13:[function(require,module,exports){
'use strict';

var copy       = require('es5-ext/object/copy')
  , map        = require('es5-ext/object/map')
  , callable   = require('es5-ext/object/valid-callable')
  , validValue = require('es5-ext/object/valid-value')

  , bind = Function.prototype.bind, defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, bindTo) {
	var value = validValue(desc) && callable(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, bindTo*/) {
	var bindTo = arguments[1];
	return map(props, function (desc, name) {
		return define(name, desc, bindTo);
	});
};

},{"es5-ext/object/copy":27,"es5-ext/object/map":35,"es5-ext/object/valid-callable":41,"es5-ext/object/valid-value":42}],14:[function(require,module,exports){
'use strict';

var assign        = require('es5-ext/object/assign')
  , normalizeOpts = require('es5-ext/object/normalize-options')
  , isCallable    = require('es5-ext/object/is-callable')
  , contains      = require('es5-ext/string/#/contains')

  , d;

d = module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (dscr == null) {
		c = w = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
		w = contains.call(dscr, 'w');
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== 'string') {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (get == null) {
		get = undefined;
	} else if (!isCallable(get)) {
		options = get;
		get = set = undefined;
	} else if (set == null) {
		set = undefined;
	} else if (!isCallable(set)) {
		options = set;
		set = undefined;
	}
	if (dscr == null) {
		c = true;
		e = false;
	} else {
		c = contains.call(dscr, 'c');
		e = contains.call(dscr, 'e');
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":24,"es5-ext/object/is-callable":30,"es5-ext/object/normalize-options":36,"es5-ext/string/#/contains":43}],15:[function(require,module,exports){
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear

'use strict';

var value = require('../../object/valid-value');

module.exports = function () {
	value(this).length = 0;
	return this;
};

},{"../../object/valid-value":42}],16:[function(require,module,exports){
'use strict';

var toPosInt = require('../../number/to-pos-integer')
  , value    = require('../../object/valid-value')

  , indexOf = Array.prototype.indexOf
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , abs = Math.abs, floor = Math.floor;

module.exports = function (searchElement/*, fromIndex*/) {
	var i, l, fromIndex, val;
	if (searchElement === searchElement) { //jslint: ignore
		return indexOf.apply(this, arguments);
	}

	l = toPosInt(value(this).length);
	fromIndex = arguments[1];
	if (isNaN(fromIndex)) fromIndex = 0;
	else if (fromIndex >= 0) fromIndex = floor(fromIndex);
	else fromIndex = toPosInt(this.length) - floor(abs(fromIndex));

	for (i = fromIndex; i < l; ++i) {
		if (hasOwnProperty.call(this, i)) {
			val = this[i];
			if (val !== val) return i; //jslint: ignore
		}
	}
	return -1;
};

},{"../../number/to-pos-integer":22,"../../object/valid-value":42}],17:[function(require,module,exports){
'use strict';

module.exports = new Function("return this")();

},{}],18:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Math.sign
	: require('./shim');

},{"./is-implemented":19,"./shim":20}],19:[function(require,module,exports){
'use strict';

module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== 'function') return false;
	return ((sign(10) === 1) && (sign(-20) === -1));
};

},{}],20:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return (value > 0) ? 1 : -1;
};

},{}],21:[function(require,module,exports){
'use strict';

var sign = require('../math/sign')

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};

},{"../math/sign":18}],22:[function(require,module,exports){
'use strict';

var toInteger = require('./to-integer')

  , max = Math.max;

module.exports = function (value) { return max(0, toInteger(value)); };

},{"./to-integer":21}],23:[function(require,module,exports){
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

'use strict';

var isCallable = require('./is-callable')
  , callable   = require('./valid-callable')
  , value      = require('./valid-value')

  , call = Function.prototype.call, keys = Object.keys
  , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb/*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(isCallable(compareFn) ? compareFn.bind(obj) : undefined);
		}
		return list[method](function (key, index) {
			if (!propertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

},{"./is-callable":30,"./valid-callable":41,"./valid-value":42}],24:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.assign
	: require('./shim');

},{"./is-implemented":25,"./shim":26}],25:[function(require,module,exports){
'use strict';

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== 'function') return false;
	obj = { foo: 'raz' };
	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
};

},{}],26:[function(require,module,exports){
'use strict';

var keys  = require('../keys')
  , value = require('../valid-value')

  , max = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, l = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try { dest[key] = src[key]; } catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < l; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":32,"../valid-value":42}],27:[function(require,module,exports){
'use strict';

var assign = require('./assign')
  , value  = require('./valid-value');

module.exports = function (obj) {
	var copy = Object(value(obj));
	if (copy !== obj) return copy;
	return assign({}, obj);
};

},{"./assign":24,"./valid-value":42}],28:[function(require,module,exports){
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

'use strict';

var create = Object.create, shim;

if (!require('./set-prototype-of/is-implemented')()) {
	shim = require('./set-prototype-of/shim');
}

module.exports = (function () {
	var nullObject, props, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	props = {};
	desc = { configurable: false, enumerable: false, writable: true,
		value: undefined };
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === '__proto__') {
			props[name] = { configurable: true, enumerable: false, writable: true,
				value: undefined };
			return;
		}
		props[name] = desc;
	});
	Object.defineProperties(nullObject, props);

	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
		enumerable: false, writable: false, value: nullObject });

	return function (prototype, props) {
		return create((prototype === null) ? nullObject : prototype, props);
	};
}());

},{"./set-prototype-of/is-implemented":39,"./set-prototype-of/shim":40}],29:[function(require,module,exports){
'use strict';

module.exports = require('./_iterate')('forEach');

},{"./_iterate":23}],30:[function(require,module,exports){
// Deprecated

'use strict';

module.exports = function (obj) { return typeof obj === 'function'; };

},{}],31:[function(require,module,exports){
'use strict';

var map = { function: true, object: true };

module.exports = function (x) {
	return ((x != null) && map[typeof x]) || false;
};

},{}],32:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.keys
	: require('./shim');

},{"./is-implemented":33,"./shim":34}],33:[function(require,module,exports){
'use strict';

module.exports = function () {
	try {
		Object.keys('primitive');
		return true;
	} catch (e) { return false; }
};

},{}],34:[function(require,module,exports){
'use strict';

var keys = Object.keys;

module.exports = function (object) {
	return keys(object == null ? object : Object(object));
};

},{}],35:[function(require,module,exports){
'use strict';

var callable = require('./valid-callable')
  , forEach  = require('./for-each')

  , call = Function.prototype.call;

module.exports = function (obj, cb/*, thisArg*/) {
	var o = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, obj, index) {
		o[key] = call.call(cb, thisArg, value, key, obj, index);
	});
	return o;
};

},{"./for-each":29,"./valid-callable":41}],36:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

module.exports = function (options/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (options == null) return;
		process(Object(options), result);
	});
	return result;
};

},{}],37:[function(require,module,exports){
'use strict';

var forEach = Array.prototype.forEach, create = Object.create;

module.exports = function (arg/*, …args*/) {
	var set = create(null);
	forEach.call(arguments, function (name) { set[name] = true; });
	return set;
};

},{}],38:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? Object.setPrototypeOf
	: require('./shim');

},{"./is-implemented":39,"./shim":40}],39:[function(require,module,exports){
'use strict';

var create = Object.create, getPrototypeOf = Object.getPrototypeOf
  , x = {};

module.exports = function (/*customCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf
	  , customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== 'function') return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
};

},{}],40:[function(require,module,exports){
// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554

'use strict';

var isObject      = require('../is-object')
  , value         = require('../valid-value')

  , isPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty = Object.defineProperty
  , nullDesc = { configurable: true, enumerable: false, writable: true,
		value: undefined }
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if ((prototype === null) || isObject(prototype)) return obj;
	throw new TypeError('Prototype must be null or an object');
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, 'level', { configurable: false,
		enumerable: false, writable: false, value: status.level });
}((function () {
	var x = Object.create(null), y = {}, set
	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');

	if (desc) {
		try {
			set = desc.set; // Opera crashes at this point
			set.call(x, y);
		} catch (ignore) { }
		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
	}

	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 2 };

	x = {};
	x.__proto__ = y;
	if (Object.getPrototypeOf(x) === y) return { level: 1 };

	return false;
}())));

require('../create');

},{"../create":28,"../is-object":31,"../valid-value":42}],41:[function(require,module,exports){
'use strict';

module.exports = function (fn) {
	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],42:[function(require,module,exports){
'use strict';

module.exports = function (value) {
	if (value == null) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{}],43:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')()
	? String.prototype.contains
	: require('./shim');

},{"./is-implemented":44,"./shim":45}],44:[function(require,module,exports){
'use strict';

var str = 'razdwatrzy';

module.exports = function () {
	if (typeof str.contains !== 'function') return false;
	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
};

},{}],45:[function(require,module,exports){
'use strict';

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],46:[function(require,module,exports){
'use strict';

var toString = Object.prototype.toString

  , id = toString.call('');

module.exports = function (x) {
	return (typeof x === 'string') || (x && (typeof x === 'object') &&
		((x instanceof String) || (toString.call(x) === id))) || false;
};

},{}],47:[function(require,module,exports){
'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , contains       = require('es5-ext/string/#/contains')
  , d              = require('d')
  , Iterator       = require('./')

  , defineProperty = Object.defineProperty
  , ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
	Iterator.call(this, arr);
	if (!kind) kind = 'value';
	else if (contains.call(kind, 'key+value')) kind = 'key+value';
	else if (contains.call(kind, 'key')) kind = 'key';
	else kind = 'value';
	defineProperty(this, '__kind__', d('', kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(ArrayIterator),
	_resolve: d(function (i) {
		if (this.__kind__ === 'value') return this.__list__[i];
		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
		return i;
	}),
	toString: d(function () { return '[object Array Iterator]'; })
});

},{"./":50,"d":14,"es5-ext/object/set-prototype-of":38,"es5-ext/string/#/contains":43}],48:[function(require,module,exports){
'use strict';

var callable = require('es5-ext/object/valid-callable')
  , isString = require('es5-ext/string/is-string')
  , get      = require('./get')

  , isArray = Array.isArray, call = Function.prototype.call;

module.exports = function (iterable, cb/*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
	if (isArray(iterable)) mode = 'array';
	else if (isString(iterable)) mode = 'string';
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () { broken = true; };
	if (mode === 'array') {
		iterable.some(function (value) {
			call.call(cb, thisArg, value, doBreak);
			if (broken) return true;
		});
		return;
	}
	if (mode === 'string') {
		l = iterable.length;
		for (i = 0; i < l; ++i) {
			char = iterable[i];
			if ((i + 1) < l) {
				code = char.charCodeAt(0);
				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};

},{"./get":49,"es5-ext/object/valid-callable":41,"es5-ext/string/is-string":46}],49:[function(require,module,exports){
'use strict';

var isString = require('es5-ext/string/is-string')
  , ArrayIterator  = require('./array')
  , StringIterator = require('./string')
  , iterable       = require('./valid-iterable')
  , iteratorSymbol = require('es6-symbol').iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};

},{"./array":47,"./string":57,"./valid-iterable":58,"es5-ext/string/is-string":46,"es6-symbol":52}],50:[function(require,module,exports){
'use strict';

var clear    = require('es5-ext/array/#/clear')
  , assign   = require('es5-ext/object/assign')
  , callable = require('es5-ext/object/valid-callable')
  , value    = require('es5-ext/object/valid-value')
  , d        = require('d')
  , autoBind = require('d/auto-bind')
  , Symbol   = require('es6-symbol')

  , defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) return new Iterator(list, context);
	defineProperties(this, {
		__list__: d('w', value(list)),
		__context__: d('w', context),
		__nextIndex__: d('w', 0)
	});
	if (!context) return;
	callable(context.on);
	context.on('_add', this._onAdd);
	context.on('_delete', this._onDelete);
	context.on('_clear', this._onClear);
};

defineProperties(Iterator.prototype, assign({
	constructor: d(Iterator),
	_next: d(function () {
		var i;
		if (!this.__list__) return;
		if (this.__redo__) {
			i = this.__redo__.shift();
			if (i !== undefined) return i;
		}
		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
		this._unBind();
	}),
	next: d(function () { return this._createResult(this._next()); }),
	_createResult: d(function (i) {
		if (i === undefined) return { done: true, value: undefined };
		return { done: false, value: this._resolve(i) };
	}),
	_resolve: d(function (i) { return this.__list__[i]; }),
	_unBind: d(function () {
		this.__list__ = null;
		delete this.__redo__;
		if (!this.__context__) return;
		this.__context__.off('_add', this._onAdd);
		this.__context__.off('_delete', this._onDelete);
		this.__context__.off('_clear', this._onClear);
		this.__context__ = null;
	}),
	toString: d(function () { return '[object Iterator]'; })
}, autoBind({
	_onAdd: d(function (index) {
		if (index >= this.__nextIndex__) return;
		++this.__nextIndex__;
		if (!this.__redo__) {
			defineProperty(this, '__redo__', d('c', [index]));
			return;
		}
		this.__redo__.forEach(function (redo, i) {
			if (redo >= index) this.__redo__[i] = ++redo;
		}, this);
		this.__redo__.push(index);
	}),
	_onDelete: d(function (index) {
		var i;
		if (index >= this.__nextIndex__) return;
		--this.__nextIndex__;
		if (!this.__redo__) return;
		i = this.__redo__.indexOf(index);
		if (i !== -1) this.__redo__.splice(i, 1);
		this.__redo__.forEach(function (redo, i) {
			if (redo > index) this.__redo__[i] = --redo;
		}, this);
	}),
	_onClear: d(function () {
		if (this.__redo__) clear.call(this.__redo__);
		this.__nextIndex__ = 0;
	})
})));

defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
	return this;
}));
defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));

},{"d":14,"d/auto-bind":13,"es5-ext/array/#/clear":15,"es5-ext/object/assign":24,"es5-ext/object/valid-callable":41,"es5-ext/object/valid-value":42,"es6-symbol":52}],51:[function(require,module,exports){
'use strict';

var isString       = require('es5-ext/string/is-string')
  , iteratorSymbol = require('es6-symbol').iterator

  , isArray = Array.isArray;

module.exports = function (value) {
	if (value == null) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	return (typeof value[iteratorSymbol] === 'function');
};

},{"es5-ext/string/is-string":46,"es6-symbol":52}],52:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":53,"./polyfill":55}],53:[function(require,module,exports){
'use strict';

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }
	if (typeof Symbol.iterator === 'symbol') return true;

	// Return 'true' for polyfills
	if (typeof Symbol.isConcatSpreadable !== 'object') return false;
	if (typeof Symbol.iterator !== 'object') return false;
	if (typeof Symbol.toPrimitive !== 'object') return false;
	if (typeof Symbol.toStringTag !== 'object') return false;
	if (typeof Symbol.unscopables !== 'object') return false;

	return true;
};

},{}],54:[function(require,module,exports){
'use strict';

module.exports = function (x) {
	return (x && ((typeof x === 'symbol') || (x['@@toStringTag'] === 'Symbol'))) || false;
};

},{}],55:[function(require,module,exports){
'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , Symbol, HiddenSymbol, globalSymbols = create(null);

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			defineProperty(this, name, d(value));
		}));
		return name;
	};
}());

HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
	return Symbol(description);
};
module.exports = Symbol = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(Symbol, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = Symbol(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),
	hasInstance: d('', Symbol('hasInstance')),
	isConcatSpreadable: d('', Symbol('isConcatSpreadable')),
	iterator: d('', Symbol('iterator')),
	match: d('', Symbol('match')),
	replace: d('', Symbol('replace')),
	search: d('', Symbol('search')),
	species: d('', Symbol('species')),
	split: d('', Symbol('split')),
	toPrimitive: d('', Symbol('toPrimitive')),
	toStringTag: d('', Symbol('toStringTag')),
	unscopables: d('', Symbol('unscopables'))
});
defineProperties(HiddenSymbol.prototype, {
	constructor: d(Symbol),
	toString: d('', function () { return this.__name__; })
});

defineProperties(Symbol.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(Symbol.prototype, Symbol.toPrimitive, d('',
	function () { return validateSymbol(this); }));
defineProperty(Symbol.prototype, Symbol.toStringTag, d('c', 'Symbol'));

defineProperty(HiddenSymbol.prototype, Symbol.toPrimitive,
	d('c', Symbol.prototype[Symbol.toPrimitive]));
defineProperty(HiddenSymbol.prototype, Symbol.toStringTag,
	d('c', Symbol.prototype[Symbol.toStringTag]));

},{"./validate-symbol":56,"d":14}],56:[function(require,module,exports){
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":54}],57:[function(require,module,exports){
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

'use strict';

var setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , d              = require('d')
  , Iterator       = require('./')

  , defineProperty = Object.defineProperty
  , StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) return new StringIterator(str);
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, '__length__', d('', str.length));

};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

StringIterator.prototype = Object.create(Iterator.prototype, {
	constructor: d(StringIterator),
	_next: d(function () {
		if (!this.__list__) return;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
		return char;
	}),
	toString: d(function () { return '[object String Iterator]'; })
});

},{"./":50,"d":14,"es5-ext/object/set-prototype-of":38}],58:[function(require,module,exports){
'use strict';

var isIterable = require('./is-iterable');

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};

},{"./is-iterable":51}],59:[function(require,module,exports){
arguments[4][52][0].apply(exports,arguments)
},{"./is-implemented":60,"./polyfill":61,"dup":52}],60:[function(require,module,exports){
'use strict';

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }
	if (typeof Symbol.iterator === 'symbol') return true;

	// Return 'true' for polyfills
	if (typeof Symbol.isConcatSpreadable !== 'object') return false;
	if (typeof Symbol.isRegExp !== 'object') return false;
	if (typeof Symbol.iterator !== 'object') return false;
	if (typeof Symbol.toPrimitive !== 'object') return false;
	if (typeof Symbol.toStringTag !== 'object') return false;
	if (typeof Symbol.unscopables !== 'object') return false;

	return true;
};

},{}],61:[function(require,module,exports){
'use strict';

var d = require('d')

  , create = Object.create, defineProperties = Object.defineProperties
  , generateName, Symbol;

generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		return '@@' + desc;
	};
}());

module.exports = Symbol = function (description) {
	var symbol;
	if (this instanceof Symbol) {
		throw new TypeError('TypeError: Symbol is not a constructor');
	}
	symbol = create(Symbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};

Object.defineProperties(Symbol, {
	create: d('', Symbol('create')),
	hasInstance: d('', Symbol('hasInstance')),
	isConcatSpreadable: d('', Symbol('isConcatSpreadable')),
	isRegExp: d('', Symbol('isRegExp')),
	iterator: d('', Symbol('iterator')),
	toPrimitive: d('', Symbol('toPrimitive')),
	toStringTag: d('', Symbol('toStringTag')),
	unscopables: d('', Symbol('unscopables'))
});

defineProperties(Symbol.prototype, {
	properToString: d(function () {
		return 'Symbol (' + this.__description__ + ')';
	}),
	toString: d('', function () { return this.__name__; })
});
Object.defineProperty(Symbol.prototype, Symbol.toPrimitive, d('',
	function (hint) {
		throw new TypeError("Conversion of symbol objects is not allowed");
	}));
Object.defineProperty(Symbol.prototype, Symbol.toStringTag, d('c', 'Symbol'));

},{"d":14}],62:[function(require,module,exports){
'use strict';

var d        = require('d')
  , callable = require('es5-ext/object/valid-callable')

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

},{"d":14,"es5-ext/object/valid-callable":41}],63:[function(require,module,exports){
'use strict';

var clear          = require('es5-ext/array/#/clear')
  , eIndexOf       = require('es5-ext/array/#/e-index-of')
  , setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , callable       = require('es5-ext/object/valid-callable')
  , validValue     = require('es5-ext/object/valid-value')
  , d              = require('d')
  , ee             = require('event-emitter')
  , Symbol         = require('es6-symbol')
  , iterator       = require('es6-iterator/valid-iterable')
  , forOf          = require('es6-iterator/for-of')
  , Iterator       = require('./lib/iterator')
  , isNative       = require('./is-native-implemented')

  , call = Function.prototype.call, defineProperties = Object.defineProperties
  , MapPoly;

module.exports = MapPoly = function (/*iterable*/) {
	var iterable = arguments[0], keys, values;
	if (!(this instanceof MapPoly)) return new MapPoly(iterable);
	if (this.__mapKeysData__ !== undefined) {
		throw new TypeError(this + " cannot be reinitialized");
	}
	if (iterable != null) iterator(iterable);
	defineProperties(this, {
		__mapKeysData__: d('c', keys = []),
		__mapValuesData__: d('c', values = [])
	});
	if (!iterable) return;
	forOf(iterable, function (value) {
		var key = validValue(value)[0];
		value = value[1];
		if (eIndexOf.call(keys, key) !== -1) return;
		keys.push(key);
		values.push(value);
	}, this);
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(MapPoly, Map);
	MapPoly.prototype = Object.create(Map.prototype, {
		constructor: d(MapPoly)
	});
}

ee(defineProperties(MapPoly.prototype, {
	clear: d(function () {
		if (!this.__mapKeysData__.length) return;
		clear.call(this.__mapKeysData__);
		clear.call(this.__mapValuesData__);
		this.emit('_clear');
	}),
	delete: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return false;
		this.__mapKeysData__.splice(index, 1);
		this.__mapValuesData__.splice(index, 1);
		this.emit('_delete', index, key);
		return true;
	}),
	entries: d(function () { return new Iterator(this, 'key+value'); }),
	forEach: d(function (cb/*, thisArg*/) {
		var thisArg = arguments[1], iterator, result;
		callable(cb);
		iterator = this.entries();
		result = iterator._next();
		while (result !== undefined) {
			call.call(cb, thisArg, this.__mapValuesData__[result],
				this.__mapKeysData__[result], this);
			result = iterator._next();
		}
	}),
	get: d(function (key) {
		var index = eIndexOf.call(this.__mapKeysData__, key);
		if (index === -1) return;
		return this.__mapValuesData__[index];
	}),
	has: d(function (key) {
		return (eIndexOf.call(this.__mapKeysData__, key) !== -1);
	}),
	keys: d(function () { return new Iterator(this, 'key'); }),
	set: d(function (key, value) {
		var index = eIndexOf.call(this.__mapKeysData__, key), emit;
		if (index === -1) {
			index = this.__mapKeysData__.push(key) - 1;
			emit = true;
		}
		this.__mapValuesData__[index] = value;
		if (emit) this.emit('_add', index, key);
		return this;
	}),
	size: d.gs(function () { return this.__mapKeysData__.length; }),
	values: d(function () { return new Iterator(this, 'value'); }),
	toString: d(function () { return '[object Map]'; })
}));
Object.defineProperty(MapPoly.prototype, Symbol.iterator, d(function () {
	return this.entries();
}));
Object.defineProperty(MapPoly.prototype, Symbol.toStringTag, d('c', 'Map'));

},{"./is-native-implemented":10,"./lib/iterator":12,"d":14,"es5-ext/array/#/clear":15,"es5-ext/array/#/e-index-of":16,"es5-ext/object/set-prototype-of":38,"es5-ext/object/valid-callable":41,"es5-ext/object/valid-value":42,"es6-iterator/for-of":48,"es6-iterator/valid-iterable":58,"es6-symbol":59,"event-emitter":62}],64:[function(require,module,exports){
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    function isExpression(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'ArrayExpression':
            case 'AssignmentExpression':
            case 'BinaryExpression':
            case 'CallExpression':
            case 'ConditionalExpression':
            case 'FunctionExpression':
            case 'Identifier':
            case 'Literal':
            case 'LogicalExpression':
            case 'MemberExpression':
            case 'NewExpression':
            case 'ObjectExpression':
            case 'SequenceExpression':
            case 'ThisExpression':
            case 'UnaryExpression':
            case 'UpdateExpression':
                return true;
        }
        return false;
    }

    function isIterationStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'DoWhileStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'WhileStatement':
                return true;
        }
        return false;
    }

    function isStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'BlockStatement':
            case 'BreakStatement':
            case 'ContinueStatement':
            case 'DebuggerStatement':
            case 'DoWhileStatement':
            case 'EmptyStatement':
            case 'ExpressionStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'IfStatement':
            case 'LabeledStatement':
            case 'ReturnStatement':
            case 'SwitchStatement':
            case 'ThrowStatement':
            case 'TryStatement':
            case 'VariableDeclaration':
            case 'WhileStatement':
            case 'WithStatement':
                return true;
        }
        return false;
    }

    function isSourceElement(node) {
      return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
    }

    function trailingStatement(node) {
        switch (node.type) {
        case 'IfStatement':
            if (node.alternate != null) {
                return node.alternate;
            }
            return node.consequent;

        case 'LabeledStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'WhileStatement':
        case 'WithStatement':
            return node.body;
        }
        return null;
    }

    function isProblematicIfStatement(node) {
        var current;

        if (node.type !== 'IfStatement') {
            return false;
        }
        if (node.alternate == null) {
            return false;
        }
        current = node.consequent;
        do {
            if (current.type === 'IfStatement') {
                if (current.alternate == null)  {
                    return true;
                }
            }
            current = trailingStatement(current);
        } while (current);

        return false;
    }

    module.exports = {
        isExpression: isExpression,
        isStatement: isStatement,
        isIterationStatement: isIterationStatement,
        isSourceElement: isSourceElement,
        isProblematicIfStatement: isProblematicIfStatement,

        trailingStatement: trailingStatement
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{}],65:[function(require,module,exports){
/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;

    // See `tools/generate-identifier-regex.js`.
    ES5Regex = {
        // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        // ECMAScript 5.1/Unicode v7.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
    };

    ES6Regex = {
        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDE00-\uDE11\uDE13-\uDE2B\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDE00-\uDE2F\uDE44\uDE80-\uDEAA]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/,
        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDD0-\uDDDA\uDE00-\uDE11\uDE13-\uDE37\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF01-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };

    function isDecimalDigit(ch) {
        return 0x30 <= ch && ch <= 0x39;  // 0..9
    }

    function isHexDigit(ch) {
        return 0x30 <= ch && ch <= 0x39 ||  // 0..9
            0x61 <= ch && ch <= 0x66 ||     // a..f
            0x41 <= ch && ch <= 0x46;       // A..F
    }

    function isOctalDigit(ch) {
        return ch >= 0x30 && ch <= 0x37;  // 0..7
    }

    // 7.2 White Space

    NON_ASCII_WHITESPACES = [
        0x1680, 0x180E,
        0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
        0x202F, 0x205F,
        0x3000,
        0xFEFF
    ];

    function isWhiteSpace(ch) {
        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 ||
            ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    }

    // 7.6 Identifier Names and Identifiers

    function fromCodePoint(cp) {
        if (cp <= 0xFFFF) { return String.fromCharCode(cp); }
        var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
        var cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xDC00);
        return cu1 + cu2;
    }

    IDENTIFIER_START = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_START[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    IDENTIFIER_PART = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_PART[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch >= 0x30 && ch <= 0x39 ||  // 0..9
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    function isIdentifierStartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    function isIdentifierStartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStartES5: isIdentifierStartES5,
        isIdentifierPartES5: isIdentifierPartES5,
        isIdentifierStartES6: isIdentifierStartES6,
        isIdentifierPartES6: isIdentifierPartES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{}],66:[function(require,module,exports){
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var code = require('./code');

    function isStrictModeReservedWordES6(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isKeywordES5(id, strict) {
        // yield should not be treated as keyword under non-strict mode.
        if (!strict && id === 'yield') {
            return false;
        }
        return isKeywordES6(id, strict);
    }

    function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
            return true;
        }

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    function isReservedWordES5(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
    }

    function isReservedWordES6(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    function isIdentifierNameES5(id) {
        var i, iz, ch;

        if (id.length === 0) { return false; }

        ch = id.charCodeAt(0);
        if (!code.isIdentifierStartES5(ch)) {
            return false;
        }

        for (i = 1, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (!code.isIdentifierPartES5(ch)) {
                return false;
            }
        }
        return true;
    }

    function decodeUtf16(lead, trail) {
        return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
    }

    function isIdentifierNameES6(id) {
        var i, iz, ch, lowCh, check;

        if (id.length === 0) { return false; }

        check = code.isIdentifierStartES6;
        for (i = 0, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (0xD800 <= ch && ch <= 0xDBFF) {
                ++i;
                if (i >= iz) { return false; }
                lowCh = id.charCodeAt(i);
                if (!(0xDC00 <= lowCh && lowCh <= 0xDFFF)) {
                    return false;
                }
                ch = decodeUtf16(ch, lowCh);
            }
            if (!check(ch)) {
                return false;
            }
            check = code.isIdentifierPartES6;
        }
        return true;
    }

    function isIdentifierES5(id, strict) {
        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
    }

    function isIdentifierES6(id, strict) {
        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
    }

    module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isReservedWordES5: isReservedWordES5,
        isReservedWordES6: isReservedWordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierNameES5: isIdentifierNameES5,
        isIdentifierNameES6: isIdentifierNameES6,
        isIdentifierES5: isIdentifierES5,
        isIdentifierES6: isIdentifierES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{"./code":65}],67:[function(require,module,exports){
/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


(function () {
    'use strict';

    exports.ast = require('./ast');
    exports.code = require('./code');
    exports.keyword = require('./keyword');
}());
/* vim: set sw=4 ts=4 et tw=80 : */

},{"./ast":64,"./code":65,"./keyword":66}],68:[function(require,module,exports){
"use strict";

/* global module, define */

var Multimap = (function() {
  var mapCtor;
  if (typeof Map !== 'undefined') {
    mapCtor = Map;
  }

  function Multimap(iterable) {
    var self = this;

    self._map = mapCtor;
    
    if (Multimap.Map) {
      self._map = Multimap.Map;
    }

    self._ = self._map ? new self._map() : {};

    if (iterable) {
      iterable.forEach(function(i) {
        self.set(i[0], i[1]);
      });
    }
  }

  /**
   * @param {Object} key
   * @return {Array} An array of values, undefined if no such a key;
   */
  Multimap.prototype.get = function(key) {
    return this._map ? this._.get(key) : this._[key];
  };

  /** 
   * @param {Object} key
   * @param {Object} val...
   */
  Multimap.prototype.set = function(key, val) {
    var args = Array.prototype.slice.call(arguments);

    key = args.shift();

    var entry = this.get(key);
    if (!entry) {
      entry = [];
      if (this._map)
        this._.set(key, entry);
      else
        this._[key] = entry;
    }

    Array.prototype.push.apply(entry, args);
    return this;
  };

  /**
   * @param {Object} key
   * @param {Object=} val
   * @return {boolean} true if any thing changed
   */
  Multimap.prototype.delete = function(key, val) {
    if (!this.has(key))
      return false;

    if (arguments.length == 1) {
      this._map ? (this._.delete(key)) : (delete this._[key]);
      return true;
    } else {
      var entry = this.get(key);
      var idx = entry.indexOf(val);
      if (idx != -1) {
        entry.splice(idx, 1);
        return true;
      }
    }

    return false;
  };

  /**
   * @param {Object} key
   * @param {Object=} val
   * @return {boolean} whether the map contains 'key' or 'key=>val' pair
   */
  Multimap.prototype.has = function(key, val) {
    var hasKey = this._map ? this._.has(key) : this._.hasOwnProperty(key);

    if (arguments.length == 1 || !hasKey)
      return hasKey;

    var entry = this.get(key) || [];
    return entry.indexOf(val) != -1;
  };

  /**
   * @return {Array} all the keys in the map
   */
  Multimap.prototype.keys = function() {
    if (this._map) 
      return this._.keys();

    return makeIterator(Object.keys(this._));
  };

  /**
   * @return {Array} all the values in the map
   */
  Multimap.prototype.values = function() {
    var vals = [];
    this.forEachEntry(function(entry) {
      Array.prototype.push.apply(vals, entry);
    });

    return makeIterator(vals);
  };

  /**
   *
   */
  Multimap.prototype.forEachEntry = function(iter) {
    var self = this;

    var keys = self.keys();
    var next;
    while(!(next = keys.next()).done) {
      iter(self.get(next.value), next.value, self);
    }
  };

  Multimap.prototype.forEach = function(iter) {
    var self = this;
    self.forEachEntry(function(entry, key) {
      entry.forEach(function(item) {
        iter(item, key, self);
      });
    });
  };


  Multimap.prototype.clear = function() {
    if (this._map) {
      this._.clear();
    } else {
      this._ = {};
    }
  };

  Object.defineProperty(
    Multimap.prototype,
    "size", {
      configurable: false,
      enumerable: true,
      get: function() {
        var self = this;
        var keys = self.keys();
        var next, total = 0;
        while(!(next = keys.next()).done) {
          total += self.get(next.value).length;
        }
        return total;
      }
    });


  function makeIterator(array){
    var nextIndex = 0;
    
    return {
      next: function(){
        return nextIndex < array.length ?
          {value: array[nextIndex++], done: false} :
        {done: true};
      }
    };
  }

  return Multimap;
})();


if(typeof exports === 'object' && module && module.exports)
  module.exports = Multimap;
else if(typeof define === 'function' && define.amd)
  define(function() { return Multimap; });

},{}],69:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],70:[function(require,module,exports){
"use strict";

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ShiftSpec = require("shift-spec")["default"];

var CloneReducer = function CloneReducer() {
  _classCallCheck(this, CloneReducer);
};

exports["default"] = CloneReducer;

for (var typeName in ShiftSpec) {
  var type = ShiftSpec[typeName];
  Object.defineProperty(CloneReducer.prototype, "reduce" + typeName, {
    value: function value(node, state) {
      return state;
    }
  });
}

},{"shift-spec":73}],71:[function(require,module,exports){
"use strict";

exports["default"] = reduce;
/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ShiftSpec = require("shift-spec")["default"];

function transformWithSpec(_x, _x2, _x3) {
  var _left;

  var _again = true;

  _function: while (_again) {
    _again = false;
    var transformer = _x,
        node = _x2,
        spec = _x3;
    _ret = undefined;

    switch (spec.typeName) {
      case "Enum":
      case "String":
      case "Number":
      case "Boolean":
      case "SourceSpan":
        return node;
      case "Const":
        _x = transformer;
        _x2 = node;
        _x3 = spec.argument;
        _again = true;
        continue _function;

      case "Maybe":
        if (!(_left = node)) {
          return _left;
        }

        _x = transformer;
        _x2 = node;
        _x3 = spec.argument;
        _again = true;
        continue _function;

      case "List":
        return node.map(function (e) {
          return transformWithSpec(transformer, e, spec.argument);
        });
      case "Union":
        _x = transformer;
        _x2 = node;
        _x3 = ShiftSpec[node.type];
        _again = true;
        continue _function;

      default:
        {
          var _ret = (function () {
            var state = {};
            spec.fields.forEach(function (field) {
              var v = transformWithSpec(transformer, node[field.name], field.type);
              state[field.name] = v == null ? null : v;
            });
            return {
              v: transformer["reduce" + node.type](node, state)
            };
          })();

          if (typeof _ret === "object") {
            return _ret.v;
          }
        }
    }
  }
}

function reduce(reducer, reducible) {
  return transformWithSpec(reducer, reducible, ShiftSpec[reducible.type]);
}

exports.CloneReducer = require("./clone-reducer")["default"];
exports.MonoidalReducer = require("./monoidal-reducer")["default"];

// TODO: checked version

// TODO: checked version

},{"./clone-reducer":70,"./monoidal-reducer":72,"shift-spec":73}],72:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var ShiftSpec = require("shift-spec")["default"];

var methods = {};

function id(x) {
  return x;
}

function handlerForFieldOfType(_x) {
  var _again = true;

  _function: while (_again) {
    _again = false;
    var type = _x;
    _ret = _ret2 = undefined;

    switch (type.typeName) {
      case "Enum":
      case "String":
      case "Boolean":
      case "Number":
      case "SourceSpan":
        return null;
      case "Const":
        _x = type.argument;
        _again = true;
        continue _function;

      case "Maybe":
        {
          var _ret = (function () {
            var subHandler = handlerForFieldOfType(type.argument);
            if (subHandler == null) return {
                v: null
              };
            return {
              v: function (t) {
                return t == null ? this.identity : subHandler.call(this, t);
              }
            };
          })();

          if (typeof _ret === "object") {
            return _ret.v;
          }
        }
      case "List":
        {
          var _ret2 = (function () {
            var subHandler = handlerForFieldOfType(type.argument);
            if (subHandler == null) return {
                v: null
              };
            return {
              v: function (t) {
                var _this2 = this;

                return this.fold(t.map(function (x) {
                  return subHandler.call(_this2, x);
                }));
              }
            };
          })();

          if (typeof _ret2 === "object") {
            return _ret2.v;
          }
        }
      default:
        return id;
    }
  }
}

for (var typeName in ShiftSpec) {
  (function (typeName) {
    var type = ShiftSpec[typeName];

    var handlers = {};
    type.fields.forEach(function (field) {
      var handler = handlerForFieldOfType(field.type);
      if (handler != null) handlers[field.name] = handler;
    });
    var fieldNames = Object.keys(handlers);

    methods["reduce" + typeName] = {
      value: function value(node, state) {
        var _this = this;

        return this.fold(fieldNames.map(function (fieldName) {
          return handlers[fieldName].call(_this, state[fieldName]);
        }));
      }
    };
  })(typeName);
}

var MonoidalReducer = (function () {
  function MonoidalReducer(monoid) {
    _classCallCheck(this, MonoidalReducer);

    this.identity = monoid.empty();
    var concat = monoid.prototype && monoid.prototype.concat || monoid.concat;
    this.append = function (a, b) {
      return concat.call(a, b);
    };
  }

  _createClass(MonoidalReducer, {
    fold: {
      value: function fold(list, a) {
        var _this = this;

        return list.reduce(function (memo, x) {
          return _this.append(memo, x);
        }, a == null ? this.identity : a);
      }
    }
  });

  return MonoidalReducer;
})();

exports["default"] = MonoidalReducer;

Object.defineProperties(MonoidalReducer.prototype, methods);

},{"shift-spec":73}],73:[function(require,module,exports){
// Generated by src/generate-spec.js. 

/**
 * Copyright 2015 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Meta data generated from spec.idl.
exports.default = (function() {
  var SPEC = {};

  var BOOLEAN = { typeName: "Boolean" };
  var DOUBLE = { typeName: "Number" };
  var STRING = { typeName: "String" };
  function Maybe(arg) { return { typeName: "Maybe", argument: arg }; }
  function List(arg) { return { typeName: "List", argument: arg }; }
  function Const(arg) { return { typeName: "Const", argument: arg }; }
  function Union() { return { typeName: "Union", arguments: [].slice.call(arguments, 0) }; }

  var TYPE_INDICATOR = {
    typeName: "Enum",
    values: ["ArrayBinding", "ArrayExpression", "ArrowExpression", "AssignmentExpression", "BinaryExpression", "BindingIdentifier", "BindingProperty", "BindingPropertyIdentifier", "BindingPropertyProperty", "BindingWithDefault", "Block", "BlockStatement", "BreakStatement", "CallExpression", "CatchClause", "Class", "ClassDeclaration", "ClassElement", "ClassExpression", "ComputedMemberExpression", "ComputedPropertyName", "ConditionalExpression", "ContinueStatement", "DataProperty", "DebuggerStatement", "Directive", "DoWhileStatement", "EmptyStatement", "Export", "ExportAllFrom", "ExportDeclaration", "ExportDefault", "ExportFrom", "ExportSpecifier", "Expression", "ExpressionStatement", "ForInStatement", "ForOfStatement", "ForStatement", "FormalParameters", "Function", "FunctionBody", "FunctionDeclaration", "FunctionExpression", "Getter", "IdentifierExpression", "IfStatement", "Import", "ImportDeclaration", "ImportNamespace", "ImportSpecifier", "IterationStatement", "LabeledStatement", "LiteralBooleanExpression", "LiteralInfinityExpression", "LiteralNullExpression", "LiteralNumericExpression", "LiteralRegExpExpression", "LiteralStringExpression", "MemberExpression", "Method", "MethodDefinition", "Module", "NamedObjectProperty", "NewExpression", "NewTargetExpression", "Node", "ObjectBinding", "ObjectExpression", "ObjectProperty", "PostfixExpression", "PrefixExpression", "PropertyName", "ReturnStatement", "Script", "Setter", "ShorthandProperty", "SourceLocation", "SourceSpan", "SpreadElement", "Statement", "StaticMemberExpression", "StaticPropertyName", "Super", "SwitchCase", "SwitchDefault", "SwitchStatement", "SwitchStatementWithDefault", "TemplateElement", "TemplateExpression", "ThisExpression", "ThrowStatement", "TryCatchStatement", "TryFinallyStatement", "UnaryExpression", "VariableDeclaration", "VariableDeclarationStatement", "VariableDeclarator", "WhileStatement", "WithStatement", "YieldExpression", "YieldGeneratorExpression"]
  };

  var VariableDeclarationKind = {
    typeName: "Enum",
    values: ["var", "let", "const"]
  };

  var AssignmentOperator = {
    typeName: "Enum",
    values: ["=", "+=", "-=", "*=", "/=", "%=", "<<=", ">>=", ">>>=", "|=", "^=", "&="]
  };

  var BinaryOperator = {
    typeName: "Enum",
    values: ["==", "!=", "===", "!==", "<", "<=", ">", ">=", "in", "instanceof", "<<", ">>", ">>>", "+", "-", "*", "/", "%", ",", "||", "&&", "|", "^", "&"]
  };

  var PrefixOperator = {
    typeName: "Enum",
    values: ["+", "-", "!", "~", "typeof", "void", "delete", "++", "--"]
  };

  var PostfixOperator = {
    typeName: "Enum",
    values: ["++", "--"]
  };

  var SourceLocation = SPEC.SourceLocation = {};
  var SourceSpan = SPEC.SourceSpan = {};
  var BindingWithDefault = SPEC.BindingWithDefault = {};
  var BindingIdentifier = SPEC.BindingIdentifier = {};
  var ArrayBinding = SPEC.ArrayBinding = {};
  var ObjectBinding = SPEC.ObjectBinding = {};
  var BindingPropertyIdentifier = SPEC.BindingPropertyIdentifier = {};
  var BindingPropertyProperty = SPEC.BindingPropertyProperty = {};
  var ClassExpression = SPEC.ClassExpression = {};
  var ClassDeclaration = SPEC.ClassDeclaration = {};
  var ClassElement = SPEC.ClassElement = {};
  var Module = SPEC.Module = {};
  var Import = SPEC.Import = {};
  var ImportNamespace = SPEC.ImportNamespace = {};
  var ImportSpecifier = SPEC.ImportSpecifier = {};
  var ExportAllFrom = SPEC.ExportAllFrom = {};
  var ExportFrom = SPEC.ExportFrom = {};
  var Export = SPEC.Export = {};
  var ExportDefault = SPEC.ExportDefault = {};
  var ExportSpecifier = SPEC.ExportSpecifier = {};
  var Method = SPEC.Method = {};
  var Getter = SPEC.Getter = {};
  var Setter = SPEC.Setter = {};
  var DataProperty = SPEC.DataProperty = {};
  var ShorthandProperty = SPEC.ShorthandProperty = {};
  var ComputedPropertyName = SPEC.ComputedPropertyName = {};
  var StaticPropertyName = SPEC.StaticPropertyName = {};
  var LiteralBooleanExpression = SPEC.LiteralBooleanExpression = {};
  var LiteralInfinityExpression = SPEC.LiteralInfinityExpression = {};
  var LiteralNullExpression = SPEC.LiteralNullExpression = {};
  var LiteralNumericExpression = SPEC.LiteralNumericExpression = {};
  var LiteralRegExpExpression = SPEC.LiteralRegExpExpression = {};
  var LiteralStringExpression = SPEC.LiteralStringExpression = {};
  var ArrayExpression = SPEC.ArrayExpression = {};
  var ArrowExpression = SPEC.ArrowExpression = {};
  var AssignmentExpression = SPEC.AssignmentExpression = {};
  var BinaryExpression = SPEC.BinaryExpression = {};
  var CallExpression = SPEC.CallExpression = {};
  var ComputedMemberExpression = SPEC.ComputedMemberExpression = {};
  var ConditionalExpression = SPEC.ConditionalExpression = {};
  var FunctionExpression = SPEC.FunctionExpression = {};
  var IdentifierExpression = SPEC.IdentifierExpression = {};
  var NewExpression = SPEC.NewExpression = {};
  var NewTargetExpression = SPEC.NewTargetExpression = {};
  var ObjectExpression = SPEC.ObjectExpression = {};
  var PostfixExpression = SPEC.PostfixExpression = {};
  var PrefixExpression = SPEC.PrefixExpression = {};
  var StaticMemberExpression = SPEC.StaticMemberExpression = {};
  var TemplateExpression = SPEC.TemplateExpression = {};
  var ThisExpression = SPEC.ThisExpression = {};
  var YieldExpression = SPEC.YieldExpression = {};
  var YieldGeneratorExpression = SPEC.YieldGeneratorExpression = {};
  var BlockStatement = SPEC.BlockStatement = {};
  var BreakStatement = SPEC.BreakStatement = {};
  var ContinueStatement = SPEC.ContinueStatement = {};
  var DebuggerStatement = SPEC.DebuggerStatement = {};
  var DoWhileStatement = SPEC.DoWhileStatement = {};
  var EmptyStatement = SPEC.EmptyStatement = {};
  var ExpressionStatement = SPEC.ExpressionStatement = {};
  var ForInStatement = SPEC.ForInStatement = {};
  var ForOfStatement = SPEC.ForOfStatement = {};
  var ForStatement = SPEC.ForStatement = {};
  var IfStatement = SPEC.IfStatement = {};
  var LabeledStatement = SPEC.LabeledStatement = {};
  var ReturnStatement = SPEC.ReturnStatement = {};
  var SwitchStatement = SPEC.SwitchStatement = {};
  var SwitchStatementWithDefault = SPEC.SwitchStatementWithDefault = {};
  var ThrowStatement = SPEC.ThrowStatement = {};
  var TryCatchStatement = SPEC.TryCatchStatement = {};
  var TryFinallyStatement = SPEC.TryFinallyStatement = {};
  var VariableDeclarationStatement = SPEC.VariableDeclarationStatement = {};
  var WhileStatement = SPEC.WhileStatement = {};
  var WithStatement = SPEC.WithStatement = {};
  var Block = SPEC.Block = {};
  var CatchClause = SPEC.CatchClause = {};
  var Directive = SPEC.Directive = {};
  var FormalParameters = SPEC.FormalParameters = {};
  var FunctionBody = SPEC.FunctionBody = {};
  var FunctionDeclaration = SPEC.FunctionDeclaration = {};
  var Script = SPEC.Script = {};
  var SpreadElement = SPEC.SpreadElement = {};
  var Super = SPEC.Super = {};
  var SwitchCase = SPEC.SwitchCase = {};
  var SwitchDefault = SPEC.SwitchDefault = {};
  var TemplateElement = SPEC.TemplateElement = {};
  var VariableDeclaration = SPEC.VariableDeclaration = {};
  var VariableDeclarator = SPEC.VariableDeclarator = {};

  var Class = Union(ClassExpression, ClassDeclaration);
  var BindingProperty = Union(BindingPropertyIdentifier, BindingPropertyProperty);
  var ExportDeclaration = Union(ExportAllFrom, ExportFrom, Export, ExportDefault);
  var ImportDeclaration = Union(Import, ImportNamespace);
  var MethodDefinition = Union(Method, Getter, Setter);
  var NamedObjectProperty = Union(MethodDefinition, DataProperty);
  var ObjectProperty = Union(NamedObjectProperty, ShorthandProperty);
  var PropertyName = Union(ComputedPropertyName, StaticPropertyName);
  var MemberExpression = Union(ComputedMemberExpression, StaticMemberExpression);
  var UnaryExpression = Union(PostfixExpression, PrefixExpression);
  var Expression = Union(UnaryExpression, MemberExpression, ClassExpression, LiteralBooleanExpression, LiteralInfinityExpression, LiteralNullExpression, LiteralNumericExpression, LiteralRegExpExpression, LiteralStringExpression, ArrayExpression, ArrowExpression, AssignmentExpression, BinaryExpression, CallExpression, ConditionalExpression, FunctionExpression, IdentifierExpression, NewExpression, NewTargetExpression, ObjectExpression, TemplateExpression, ThisExpression, YieldExpression, YieldGeneratorExpression);
  var IterationStatement = Union(DoWhileStatement, ForInStatement, ForOfStatement, ForStatement, WhileStatement);
  var Statement = Union(IterationStatement, ClassDeclaration, BlockStatement, BreakStatement, ContinueStatement, DebuggerStatement, EmptyStatement, ExpressionStatement, IfStatement, LabeledStatement, ReturnStatement, SwitchStatement, SwitchStatementWithDefault, ThrowStatement, TryCatchStatement, TryFinallyStatement, VariableDeclarationStatement, WithStatement, FunctionDeclaration);
  var Node = Union(Statement, Expression, PropertyName, ObjectProperty, ImportDeclaration, ExportDeclaration, BindingWithDefault, BindingIdentifier, ArrayBinding, ObjectBinding, BindingProperty, ClassElement, Module, ImportSpecifier, ExportSpecifier, Block, CatchClause, Directive, FormalParameters, FunctionBody, Script, SpreadElement, Super, SwitchCase, SwitchDefault, TemplateElement, VariableDeclaration, VariableDeclarator);
  var Function = Union(FunctionExpression, FunctionDeclaration);

  SourceLocation.typeName = "SourceLocation";
  SourceLocation.fields = [
    { name: "line", type: DOUBLE },
    { name: "column", type: DOUBLE },
    { name: "offset", type: DOUBLE },
  ];

  SourceSpan.typeName = "SourceSpan";
  SourceSpan.fields = [
    { name: "source", type: Maybe(STRING) },
    { name: "start", type: SourceLocation },
    { name: "end", type: SourceLocation },
  ];

  BindingWithDefault.typeName = "BindingWithDefault";
  BindingWithDefault.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "BindingWithDefault" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
    { name: "init", type: Expression },
  ];

  BindingIdentifier.typeName = "BindingIdentifier";
  BindingIdentifier.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "BindingIdentifier" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: STRING },
  ];

  ArrayBinding.typeName = "ArrayBinding";
  ArrayBinding.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ArrayBinding" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "elements", type: List(Maybe(Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression, BindingWithDefault))) },
    { name: "restElement", type: Maybe(Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression)) },
  ];

  ObjectBinding.typeName = "ObjectBinding";
  ObjectBinding.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ObjectBinding" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "properties", type: List(BindingProperty) },
  ];

  BindingPropertyIdentifier.typeName = "BindingPropertyIdentifier";
  BindingPropertyIdentifier.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "BindingPropertyIdentifier" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "binding", type: BindingIdentifier },
    { name: "init", type: Maybe(Expression) },
  ];

  BindingPropertyProperty.typeName = "BindingPropertyProperty";
  BindingPropertyProperty.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "BindingPropertyProperty" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: PropertyName },
    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression, BindingWithDefault) },
  ];

  ClassExpression.typeName = "ClassExpression";
  ClassExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ClassExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: Maybe(BindingIdentifier) },
    { name: "super", type: Maybe(Expression) },
    { name: "elements", type: List(ClassElement) },
  ];

  ClassDeclaration.typeName = "ClassDeclaration";
  ClassDeclaration.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ClassDeclaration" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: BindingIdentifier },
    { name: "super", type: Maybe(Expression) },
    { name: "elements", type: List(ClassElement) },
  ];

  ClassElement.typeName = "ClassElement";
  ClassElement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ClassElement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "isStatic", type: BOOLEAN },
    { name: "method", type: MethodDefinition },
  ];

  Module.typeName = "Module";
  Module.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Module" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "items", type: List(Union(ImportDeclaration, ExportDeclaration, Statement)) },
  ];

  Import.typeName = "Import";
  Import.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Import" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "moduleSpecifier", type: STRING },
    { name: "defaultBinding", type: Maybe(BindingIdentifier) },
    { name: "namedImports", type: List(ImportSpecifier) },
  ];

  ImportNamespace.typeName = "ImportNamespace";
  ImportNamespace.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ImportNamespace" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "moduleSpecifier", type: STRING },
    { name: "defaultBinding", type: Maybe(BindingIdentifier) },
    { name: "namespaceBinding", type: BindingIdentifier },
  ];

  ImportSpecifier.typeName = "ImportSpecifier";
  ImportSpecifier.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ImportSpecifier" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: Maybe(STRING) },
    { name: "binding", type: BindingIdentifier },
  ];

  ExportAllFrom.typeName = "ExportAllFrom";
  ExportAllFrom.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ExportAllFrom" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "moduleSpecifier", type: STRING },
  ];

  ExportFrom.typeName = "ExportFrom";
  ExportFrom.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ExportFrom" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "namedExports", type: List(ExportSpecifier) },
    { name: "moduleSpecifier", type: Maybe(STRING) },
  ];

  Export.typeName = "Export";
  Export.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Export" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "declaration", type: Union(FunctionDeclaration, ClassDeclaration, VariableDeclaration) },
  ];

  ExportDefault.typeName = "ExportDefault";
  ExportDefault.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ExportDefault" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "body", type: Union(FunctionDeclaration, ClassDeclaration, Expression) },
  ];

  ExportSpecifier.typeName = "ExportSpecifier";
  ExportSpecifier.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ExportSpecifier" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: Maybe(STRING) },
    { name: "exportedName", type: STRING },
  ];

  Method.typeName = "Method";
  Method.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Method" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: PropertyName },
    { name: "isGenerator", type: BOOLEAN },
    { name: "params", type: FormalParameters },
    { name: "body", type: FunctionBody },
  ];

  Getter.typeName = "Getter";
  Getter.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Getter" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: PropertyName },
    { name: "body", type: FunctionBody },
  ];

  Setter.typeName = "Setter";
  Setter.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Setter" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: PropertyName },
    { name: "param", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
    { name: "body", type: FunctionBody },
  ];

  DataProperty.typeName = "DataProperty";
  DataProperty.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "DataProperty" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: PropertyName },
    { name: "expression", type: Expression },
  ];

  ShorthandProperty.typeName = "ShorthandProperty";
  ShorthandProperty.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ShorthandProperty" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: STRING },
  ];

  ComputedPropertyName.typeName = "ComputedPropertyName";
  ComputedPropertyName.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ComputedPropertyName" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "expression", type: Expression },
  ];

  StaticPropertyName.typeName = "StaticPropertyName";
  StaticPropertyName.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "StaticPropertyName" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "value", type: STRING },
  ];

  LiteralBooleanExpression.typeName = "LiteralBooleanExpression";
  LiteralBooleanExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralBooleanExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "value", type: BOOLEAN },
  ];

  LiteralInfinityExpression.typeName = "LiteralInfinityExpression";
  LiteralInfinityExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralInfinityExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
  ];

  LiteralNullExpression.typeName = "LiteralNullExpression";
  LiteralNullExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralNullExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
  ];

  LiteralNumericExpression.typeName = "LiteralNumericExpression";
  LiteralNumericExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralNumericExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "value", type: DOUBLE },
  ];

  LiteralRegExpExpression.typeName = "LiteralRegExpExpression";
  LiteralRegExpExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralRegExpExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "pattern", type: STRING },
    { name: "flags", type: STRING },
  ];

  LiteralStringExpression.typeName = "LiteralStringExpression";
  LiteralStringExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "LiteralStringExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "value", type: STRING },
  ];

  ArrayExpression.typeName = "ArrayExpression";
  ArrayExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ArrayExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "elements", type: List(Maybe(Union(SpreadElement, Expression))) },
  ];

  ArrowExpression.typeName = "ArrowExpression";
  ArrowExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ArrowExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "params", type: FormalParameters },
    { name: "body", type: Union(FunctionBody, Expression) },
  ];

  AssignmentExpression.typeName = "AssignmentExpression";
  AssignmentExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "AssignmentExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "operator", type: AssignmentOperator },
    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
    { name: "expression", type: Expression },
  ];

  BinaryExpression.typeName = "BinaryExpression";
  BinaryExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "BinaryExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "operator", type: BinaryOperator },
    { name: "left", type: Expression },
    { name: "right", type: Expression },
  ];

  CallExpression.typeName = "CallExpression";
  CallExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "CallExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "callee", type: Union(Expression, Super) },
    { name: "arguments", type: List(Union(SpreadElement, Expression)) },
  ];

  ComputedMemberExpression.typeName = "ComputedMemberExpression";
  ComputedMemberExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ComputedMemberExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "object", type: Union(Expression, Super) },
    { name: "expression", type: Expression },
  ];

  ConditionalExpression.typeName = "ConditionalExpression";
  ConditionalExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ConditionalExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "test", type: Expression },
    { name: "consequent", type: Expression },
    { name: "alternate", type: Expression },
  ];

  FunctionExpression.typeName = "FunctionExpression";
  FunctionExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "FunctionExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "isGenerator", type: BOOLEAN },
    { name: "name", type: Maybe(BindingIdentifier) },
    { name: "params", type: FormalParameters },
    { name: "body", type: FunctionBody },
  ];

  IdentifierExpression.typeName = "IdentifierExpression";
  IdentifierExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "IdentifierExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "name", type: STRING },
  ];

  NewExpression.typeName = "NewExpression";
  NewExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "NewExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "callee", type: Expression },
    { name: "arguments", type: List(Union(SpreadElement, Expression)) },
  ];

  NewTargetExpression.typeName = "NewTargetExpression";
  NewTargetExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "NewTargetExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
  ];

  ObjectExpression.typeName = "ObjectExpression";
  ObjectExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ObjectExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "properties", type: List(ObjectProperty) },
  ];

  PostfixExpression.typeName = "PostfixExpression";
  PostfixExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "PostfixExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "operand", type: Expression },
    { name: "operator", type: PostfixOperator },
  ];

  PrefixExpression.typeName = "PrefixExpression";
  PrefixExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "PrefixExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "operand", type: Expression },
    { name: "operator", type: PrefixOperator },
  ];

  StaticMemberExpression.typeName = "StaticMemberExpression";
  StaticMemberExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "StaticMemberExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "object", type: Union(Expression, Super) },
    { name: "property", type: STRING },
  ];

  TemplateExpression.typeName = "TemplateExpression";
  TemplateExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "TemplateExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "tag", type: Maybe(Expression) },
    { name: "elements", type: List(Union(Expression, TemplateElement)) },
  ];

  ThisExpression.typeName = "ThisExpression";
  ThisExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ThisExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
  ];

  YieldExpression.typeName = "YieldExpression";
  YieldExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "YieldExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "expression", type: Maybe(Expression) },
  ];

  YieldGeneratorExpression.typeName = "YieldGeneratorExpression";
  YieldGeneratorExpression.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "YieldGeneratorExpression" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "expression", type: Expression },
  ];

  BlockStatement.typeName = "BlockStatement";
  BlockStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "BlockStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "block", type: Block },
  ];

  BreakStatement.typeName = "BreakStatement";
  BreakStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "BreakStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "label", type: Maybe(STRING) },
  ];

  ContinueStatement.typeName = "ContinueStatement";
  ContinueStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ContinueStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "label", type: Maybe(STRING) },
  ];

  DebuggerStatement.typeName = "DebuggerStatement";
  DebuggerStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "DebuggerStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
  ];

  DoWhileStatement.typeName = "DoWhileStatement";
  DoWhileStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "DoWhileStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "body", type: Statement },
    { name: "test", type: Expression },
  ];

  EmptyStatement.typeName = "EmptyStatement";
  EmptyStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "EmptyStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
  ];

  ExpressionStatement.typeName = "ExpressionStatement";
  ExpressionStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ExpressionStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "expression", type: Expression },
  ];

  ForInStatement.typeName = "ForInStatement";
  ForInStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ForInStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "left", type: Union(VariableDeclaration, ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
    { name: "right", type: Expression },
    { name: "body", type: Statement },
  ];

  ForOfStatement.typeName = "ForOfStatement";
  ForOfStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ForOfStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "left", type: Union(VariableDeclaration, ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
    { name: "right", type: Expression },
    { name: "body", type: Statement },
  ];

  ForStatement.typeName = "ForStatement";
  ForStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ForStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "init", type: Maybe(Union(VariableDeclaration, Expression)) },
    { name: "test", type: Maybe(Expression) },
    { name: "update", type: Maybe(Expression) },
    { name: "body", type: Statement },
  ];

  IfStatement.typeName = "IfStatement";
  IfStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "IfStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "test", type: Expression },
    { name: "consequent", type: Statement },
    { name: "alternate", type: Maybe(Statement) },
  ];

  LabeledStatement.typeName = "LabeledStatement";
  LabeledStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "LabeledStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "label", type: STRING },
    { name: "body", type: Statement },
  ];

  ReturnStatement.typeName = "ReturnStatement";
  ReturnStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ReturnStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "expression", type: Maybe(Expression) },
  ];

  SwitchStatement.typeName = "SwitchStatement";
  SwitchStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "SwitchStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "discriminant", type: Expression },
    { name: "cases", type: List(SwitchCase) },
  ];

  SwitchStatementWithDefault.typeName = "SwitchStatementWithDefault";
  SwitchStatementWithDefault.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "SwitchStatementWithDefault" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "discriminant", type: Expression },
    { name: "preDefaultCases", type: List(SwitchCase) },
    { name: "defaultCase", type: SwitchDefault },
    { name: "postDefaultCases", type: List(SwitchCase) },
  ];

  ThrowStatement.typeName = "ThrowStatement";
  ThrowStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "ThrowStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "expression", type: Expression },
  ];

  TryCatchStatement.typeName = "TryCatchStatement";
  TryCatchStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "TryCatchStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "body", type: Block },
    { name: "catchClause", type: CatchClause },
  ];

  TryFinallyStatement.typeName = "TryFinallyStatement";
  TryFinallyStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "TryFinallyStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "body", type: Block },
    { name: "catchClause", type: Maybe(CatchClause) },
    { name: "finalizer", type: Block },
  ];

  VariableDeclarationStatement.typeName = "VariableDeclarationStatement";
  VariableDeclarationStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "VariableDeclarationStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "declaration", type: VariableDeclaration },
  ];

  WhileStatement.typeName = "WhileStatement";
  WhileStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "WhileStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "test", type: Expression },
    { name: "body", type: Statement },
  ];

  WithStatement.typeName = "WithStatement";
  WithStatement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "WithStatement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "object", type: Expression },
    { name: "body", type: Statement },
  ];

  Block.typeName = "Block";
  Block.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Block" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "statements", type: List(Statement) },
  ];

  CatchClause.typeName = "CatchClause";
  CatchClause.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "CatchClause" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
    { name: "body", type: Block },
  ];

  Directive.typeName = "Directive";
  Directive.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Directive" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "rawValue", type: STRING },
  ];

  FormalParameters.typeName = "FormalParameters";
  FormalParameters.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "FormalParameters" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "items", type: List(Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression, BindingWithDefault)) },
    { name: "rest", type: Maybe(BindingIdentifier) },
  ];

  FunctionBody.typeName = "FunctionBody";
  FunctionBody.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "FunctionBody" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "directives", type: List(Directive) },
    { name: "statements", type: List(Statement) },
  ];

  FunctionDeclaration.typeName = "FunctionDeclaration";
  FunctionDeclaration.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "FunctionDeclaration" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "isGenerator", type: BOOLEAN },
    { name: "name", type: BindingIdentifier },
    { name: "params", type: FormalParameters },
    { name: "body", type: FunctionBody },
  ];

  Script.typeName = "Script";
  Script.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Script" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "body", type: FunctionBody },
  ];

  SpreadElement.typeName = "SpreadElement";
  SpreadElement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "SpreadElement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "expression", type: Expression },
  ];

  Super.typeName = "Super";
  Super.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "Super" },
    { name: "loc", type: Maybe(SourceSpan) },
  ];

  SwitchCase.typeName = "SwitchCase";
  SwitchCase.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "SwitchCase" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "test", type: Expression },
    { name: "consequent", type: List(Statement) },
  ];

  SwitchDefault.typeName = "SwitchDefault";
  SwitchDefault.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "SwitchDefault" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "consequent", type: List(Statement) },
  ];

  TemplateElement.typeName = "TemplateElement";
  TemplateElement.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "TemplateElement" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "rawValue", type: STRING },
  ];

  VariableDeclaration.typeName = "VariableDeclaration";
  VariableDeclaration.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "VariableDeclaration" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "kind", type: VariableDeclarationKind },
    { name: "declarators", type: List(VariableDeclarator) },
  ];

  VariableDeclarator.typeName = "VariableDeclarator";
  VariableDeclarator.fields = [
    { name: "type", type: Const(TYPE_INDICATOR), value: "VariableDeclarator" },
    { name: "loc", type: Maybe(SourceSpan) },
    { name: "binding", type: Union(ObjectBinding, ArrayBinding, BindingIdentifier, MemberExpression) },
    { name: "init", type: Maybe(Expression) },
  ];

  return SPEC;
}());

},{}],"/shift-parser-js/dist":[function(require,module,exports){
/**
 * Copyright 2014 Shape Security, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var _parser = require("./parser");

var _tokenizer = require("./tokenizer");

var _earlyErrors = require("./early-errors");

function markLocation(node, location) {
  node.loc = {
    start: location,
    end: {
      line: this.lastLine + 1,
      column: this.lastIndex - this.lastLineStart,
      offset: this.lastIndex },
    source: null };
  return node;
}

function generateInterface(parsingFunctionName) {
  return function parse(code) {
    var _ref = arguments[1] === undefined ? {} : arguments[1];

    var _ref$loc = _ref.loc;
    var loc = _ref$loc === undefined ? false : _ref$loc;
    var _ref$earlyErrors = _ref.earlyErrors;
    var earlyErrors = _ref$earlyErrors === undefined ? true : _ref$earlyErrors;

    var parser = new _parser.Parser(code);
    if (loc) {
      parser.markLocation = markLocation;
    }
    var ast = parser[parsingFunctionName]();
    if (earlyErrors) {
      var errors = _earlyErrors.EarlyErrorChecker.check(ast);
      // for now, just throw the first error; we will handle multiple errors later
      if (errors.length > 0) {
        var _errors$0 = errors[0];
        var node = _errors$0.node;
        var message = _errors$0.message;

        var offset = 0,
            line = 1,
            column = 0;
        if (node.loc != null) {
          var _temp = node.loc.start;
          offset = _temp.offset;
          line = _temp.line;
          column = _temp.column;
          _temp;
        }
        throw new _tokenizer.JsError(offset, line, column, message);
      }
    }
    return ast;
  };
}

var parseModule = generateInterface("parseModule");
exports.parseModule = parseModule;
var parseScript = generateInterface("parseScript");
exports.parseScript = parseScript;
exports["default"] = parseScript;
},{"./early-errors":2,"./parser":4,"./tokenizer":6}]},{},[])("/shift-parser-js/dist")
});