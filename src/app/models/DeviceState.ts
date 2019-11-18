
export interface IMeasuredData {
    Temperature?: number;
    Humidity?: number;
}

export interface IDeviceState {
    Bright: number;
    LoadState: number;
    FirmwareVersion: number;
    ExtType: number;
    MeasuredData: IMeasuredData;
}