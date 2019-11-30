import { IDeviceSettings } from "./DeviceSettings";
import { IDeviceState } from './DeviceState';
import { DeviceTypeEnum } from './Request';

export interface IDevice {
    State: IDeviceState;
    Name: string;
    Channel: number;
    Type: DeviceTypeEnum;
    SubType: number;
    Key: number;
    Room: string;
    Settings: IDeviceSettings;
}