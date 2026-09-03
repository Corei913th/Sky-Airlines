"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = exports.NodeEnvironment = void 0;
var NodeEnvironment;
(function (NodeEnvironment) {
    NodeEnvironment["Development"] = "development";
    NodeEnvironment["Production"] = "production";
    NodeEnvironment["Test"] = "test";
})(NodeEnvironment || (exports.NodeEnvironment = NodeEnvironment = {}));
var LogLevel;
(function (LogLevel) {
    LogLevel["Info"] = "info";
    LogLevel["Error"] = "error";
    LogLevel["Warning"] = "warning";
    LogLevel["Debug"] = "debug";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
//# sourceMappingURL=index.js.map