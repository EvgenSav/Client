import { DeviceSettings } from "./DeviceSettings";

export class Device {
    addr: number;
    name: string;
    channel: number;
    type: number;
    state: number;
    key: number;
    settings: DeviceSettings = new DeviceSettings();
}