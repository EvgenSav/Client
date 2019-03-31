import { IDeviceState } from "./DeviceState";

export interface IActionLogItem {
    id: number;
    timeStamp: Date;
    cmd: number;
    deviceFk: number;
    deviceTypeFk: number;
    state: IDeviceState;
    receivedBuffer: any;
    measuredData?: number;
}