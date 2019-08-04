
export interface IBindRequest {
    id?: string,
    deviceFk?: number;
    type: DeviceTypeEnum;
    name: string;
}
export enum DeviceTypeEnum {
    RemoteController = 0,
    PowerUnit = 1,
    PowerUnitF = 2,
    Sensor = 3
}