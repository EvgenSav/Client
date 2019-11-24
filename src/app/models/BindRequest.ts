
export interface IRequestMetaData {
    Channel: number;
    AddressF?: number;
}

export interface IBindRequest {
    Id?: string,
    DeviceFk?: number;
    Completed?: Date;
    DeviceType: DeviceTypeEnum;
    Name: string;
    Type: RequestTypeEnum;
    MetaData?: IRequestMetaData;
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