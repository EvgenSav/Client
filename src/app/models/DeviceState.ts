
export interface IMeasuredData {
    temperature?: number;
    humidity?: number;
}

export interface IDeviceState {
    bright: number;
    loadState: number;
    firmwareVersion: number;
    extType: number;
    measuredData: IMeasuredData;
}