/**
 * Telemetry events
 */
export type TelemetryEvents = 'cli:start' | 'cli:complete' | 'cli:error' | 'cli:crash' | 'cli:command:start' | 'cli:command:complete' | 'cli:command:error' | 'cli:plugin:start' | 'cli:plugin:complete' | 'cli:plugin:error' | 'prisma:error';
/**
 * Utility class for sending telemetry
 */
export declare class Telemetry {
    private readonly mixpanel;
    private readonly hostId;
    private readonly sessionid;
    private readonly _os_type;
    private readonly _os_release;
    private readonly _os_arch;
    private readonly _os_version;
    private readonly _os_platform;
    private readonly version;
    private readonly prismaVersion;
    private readonly isDocker;
    private exitWait;
    constructor();
    track(event: TelemetryEvents, properties?: Record<string, unknown>): void;
    trackSpan<T>(startEvent: TelemetryEvents, completeEvent: TelemetryEvents, errorEvent: TelemetryEvents, properties: Record<string, unknown>, action: () => Promise<T> | T): Promise<T>;
}
declare const _default: Telemetry;
export default _default;
