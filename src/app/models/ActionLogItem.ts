import { IDeviceState, IMeasuredData } from "./DeviceState";

export interface IActionLogItem {
    Id: number;
    TimeStamp: Date;
    Cmd: number;
    DeviceFk: number;
    DeviceTypeFk: number;
    State: IDeviceState;
    ReceivedBuffer: any;
}