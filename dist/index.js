"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.setup = void 0;
var bcrypt = require('bcrypt');
function setup(sioInstance, options) {
    if (options === void 0) { options = { auth: false, namespaceName: '/admin' }; }
    function createEventObj(socketId, args, nsp, roomSet, direction) {
        var cb = args[args.length - 1] instanceof Function ? args[args.length - 1] : null;
        var payload = cb ? args.slice(1, -1) : args.slice(1);
        var rooms = Array.from(roomSet);
        var obj = {
            socketId: socketId,
            eventName: args[0],
            payload: payload,
            cb: cb,
            date: +new Date(),
            nsp: nsp,
            rooms: rooms,
            direction: direction
        };
        return obj;
    }
    function initAuthMiddleware(adminNamespace, options) {
        var _this = this;
        if (options === void 0) { options = { auth: false }; }
        if (!options.hasOwnProperty('auth')) {
            throw new Error('Property auth not specified. Auth must at least be explicitly false');
        }
        if (options.auth === false) {
            console.warn('Authentication is disabled, please use with caution');
        }
        else {
            var basicAuth_1 = options.auth;
            // test if valid hash
            try {
                bcrypt.getRounds(basicAuth_1.password);
            }
            catch (e) {
                throw new Error('the `password` field must be a valid bcrypt hash');
            }
            // if the passed hash from init is valid, we continue to set a middleware
            // it will trigger on every new socket connection
            adminNamespace.use(function (socket, next) { return __awaiter(_this, void 0, void 0, function () {
                var isMatching;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(socket.handshake.auth.username === basicAuth_1.username)) return [3 /*break*/, 2];
                            return [4 /*yield*/, bcrypt.compare(socket.handshake.auth.password, basicAuth_1.password)];
                        case 1:
                            isMatching = _a.sent();
                            // if no match, failure
                            if (!isMatching) {
                                throw new Error('invalid credentials');
                            }
                            // if match, proceed
                            else {
                                next();
                            }
                            return [3 /*break*/, 3];
                        case 2: throw new Error('invalid credentials');
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        }
    }
    // create a namespace on the io instance they passed in, default to admin
    var requestedNsp = options.namespaceName || '/admin';
    var adminNamespace = sioInstance.of(requestedNsp);
    initAuthMiddleware(adminNamespace, options);
    // get all namespaces on sio instance
    var allNsps = sioInstance._nsps;
    // loop through namespaces
    allNsps.forEach(function (nsp) {
        // prepend listener to namespace
        nsp.on('connection', function (socket) {
            if (nsp !== adminNamespace) {
                // all incoming
                socket.onAny(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    adminNamespace.emit('event_received', createEventObj(socket.id, args, nsp.name, socket.rooms, 'incoming'));
                });
                // all outgoing
                socket.onAnyOutgoing(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    adminNamespace.emit('event_sent', createEventObj(socket.id, args, nsp.name, socket.rooms, 'outgoing'));
                });
            }
        });
    });
}
exports.setup = setup;
//# sourceMappingURL=index.js.map