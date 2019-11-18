import { IDeviceState } from "./DeviceState";

export interface IActionLogItem {
    Id: number;
    TimeStamp: Date;
    Cmd: number;
    DeviceFk: number;
    DeviceTypeFk: number;
    State: IDeviceState;
    ReceivedBuffer: any;
    MeasuredData?: number;
}