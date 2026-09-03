"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTrace = normalizeTrace;
exports.normalizeData = normalizeData;
function normalizeTrace(trace) {
    if (trace == null)
        return undefined;
    if (typeof trace === 'string')
        return trace;
    if (trace instanceof Error)
        return trace.stack ?? trace.message;
    if (typeof trace === 'object') {
        try {
            return JSON.stringify(trace);
        }
        catch {
            return '[Unserializable trace object]';
        }
    }
    if (typeof trace === 'number' || typeof trace === 'boolean' || typeof trace === 'bigint')
        return `${trace}`;
    if (typeof trace === 'symbol')
        return trace.description ? `Symbol(${trace.description})` : trace.toString();
    if (typeof trace === 'function')
        return trace.name ? `[Function: ${trace.name}]` : '[Function]';
    return '[Unsupported trace type]';
}
function normalizeData(data) {
    if (data == null)
        return {};
    if (data instanceof Error) {
        return {
            err: {
                name: data.name,
                message: data.message,
                stack: data.stack,
            },
        };
    }
    if (typeof data === 'object')
        return data;
    return { data };
}
//# sourceMappingURL=logger.util.js.map