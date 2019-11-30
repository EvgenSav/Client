
export interface IRequestMetaData {
    Channel: number;
    AddressF?: number;
}

export interface IRequest {
    Id?: string,
    DeviceFk?: number;
    Completed?: Date;
    DeviceType: DeviceTypeEnum;
    Name: string;
    Type: RequestTypeEnum;
    Step?: RequestStepEnum;
    MetaData?: IRequestMetaData;
}

export enum RequestStepEnum {
    Created,
    Pending,
    Completed,
    Error
}

export enum RequestTypeEnum {
    Bind = 0,
    Unbind = 1
}

export enum DeviceTypeEnum {
    RemoteController = 0,
    PowerUnit = 1,
    PowerUnitF = 2,
    Sensor = 3
}