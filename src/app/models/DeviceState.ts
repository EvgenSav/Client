export interface IDeviceState {
    bright: number;
    loadState: number;
    firmwareVersion: number;
    extType: number;
    measuredDate: Map<string, number>;
}