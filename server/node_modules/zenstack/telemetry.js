"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telemetry = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const prisma_1 = require("@zenstackhq/sdk/prisma");
const async_exit_hook_1 = __importDefault(require("async-exit-hook"));
const commander_1 = require("commander");
const mixpanel_1 = require("mixpanel");
const os = __importStar(require("os"));
const sleep_promise_1 = __importDefault(require("sleep-promise"));
const cli_error_1 = require("./cli/cli-error");
const constants_1 = require("./constants");
const is_docker_1 = __importDefault(require("./utils/is-docker"));
const machine_id_utils_1 = require("./utils/machine-id-utils");
const version_utils_1 = require("./utils/version-utils");
/**
 * Utility class for sending telemetry
 */
class Telemetry {
    constructor() {
        this.hostId = (0, machine_id_utils_1.getMachineId)();
        this.sessionid = (0, cuid2_1.createId)();
        this._os_type = os.type();
        this._os_release = os.release();
        this._os_arch = os.arch();
        this._os_version = os.version();
        this._os_platform = os.platform();
        this.version = (0, version_utils_1.getVersion)();
        this.prismaVersion = (0, prisma_1.getPrismaVersion)();
        this.isDocker = (0, is_docker_1.default)();
        this.exitWait = 200;
        if (process.env.DO_NOT_TRACK !== '1' && constants_1.TELEMETRY_TRACKING_TOKEN) {
            this.mixpanel = (0, mixpanel_1.init)(constants_1.TELEMETRY_TRACKING_TOKEN, {
                geolocate: true,
            });
        }
        (0, async_exit_hook_1.default)((callback) => __awaiter(this, void 0, void 0, function* () {
            if (this.mixpanel) {
                // a small delay to ensure telemetry is sent
                yield (0, sleep_promise_1.default)(this.exitWait);
            }
            callback();
        }));
        const errorHandler = (err) => __awaiter(this, void 0, void 0, function* () {
            if (err instanceof cli_error_1.CliError || err instanceof commander_1.CommanderError) {
                this.track('cli:error', {
                    message: err.message,
                    stack: err.stack,
                });
                if (this.mixpanel) {
                    // a small delay to ensure telemetry is sent
                    yield (0, sleep_promise_1.default)(this.exitWait);
                }
                // error already logged
            }
            else {
                console.error('\nAn unexpected error occurred:\n', err);
                this.track('cli:crash', {
                    message: err.message,
                    stack: err.stack,
                });
                if (this.mixpanel) {
                    // a small delay to ensure telemetry is sent
                    yield (0, sleep_promise_1.default)(this.exitWait);
                }
            }
            process.exit(1);
        });
        async_exit_hook_1.default.unhandledRejectionHandler(errorHandler);
        async_exit_hook_1.default.uncaughtExceptionHandler(errorHandler);
    }
    track(event, properties = {}) {
        if (this.mixpanel) {
            const payload = Object.assign({ distinct_id: this.hostId, session: this.sessionid, time: new Date(), $os: this._os_type, osType: this._os_type, osRelease: this._os_release, osPlatform: this._os_platform, osArch: this._os_arch, osVersion: this._os_version, nodeVersion: process.version, version: this.version, prismaVersion: this.prismaVersion, isDocker: this.isDocker }, properties);
            this.mixpanel.track(event, payload);
        }
    }
    trackSpan(startEvent, completeEvent, errorEvent, properties, action) {
        return __awaiter(this, void 0, void 0, function* () {
            this.track(startEvent, properties);
            const start = Date.now();
            let success = true;
            try {
                return yield action();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (err) {
                this.track(errorEvent, Object.assign({ message: err.message, stack: err.stack }, properties));
                success = false;
                throw err;
            }
            finally {
                this.track(completeEvent, Object.assign({ duration: Date.now() - start, success }, properties));
            }
        });
    }
}
exports.Telemetry = Telemetry;
exports.default = new Telemetry();
//# sourceMappingURL=telemetry.js.map