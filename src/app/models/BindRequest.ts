
export interface IBindRequest {
    id?: string,
    deviceFk?: number;
    completed?: Date;
    deviceType: DeviceTypeEnum;
    name: string;
    type: number;
}
export enum DeviceTypeEnum {
    RemoteController = 0,
    PowerUnit = 1,
    PowerUnitF = 2,
    Sensor = 3
}