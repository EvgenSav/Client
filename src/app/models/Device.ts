import { IDeviceSettings } from "./DeviceSettings";
import { IDeviceState } from './DeviceState';
import { DeviceTypeEnum } from './BindRequest';

export interface IDevice {
    addr: number;
    state: IDeviceState;
    name: string;
    channel: number;
    type: DeviceTypeEnum;
    subtype: number;
    key: number;
    room: string;
    settings: IDeviceSettings;
}