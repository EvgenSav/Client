import { IDeviceSettings } from "./DeviceSettings";

export interface IDevice {
    addr: number;
    name: string;
    channel: number;
    type: number;
    state: number;
    key: number;
    room: string;
    settings: IDeviceSettings;
}