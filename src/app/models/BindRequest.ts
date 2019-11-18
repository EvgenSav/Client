
export interface IBindRequest {
    Id?: string,
    DeviceFk?: number;
    Completed?: Date;
    DeviceType: DeviceTypeEnum;
    Name: string;
    Type: number;
}
export enum DeviceTypeEnum {
    RemoteController = 0,
    PowerUnit = 1,
    PowerUnitF = 2,
    Sensor = 3
}