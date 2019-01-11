export enum Operation {
    Replace = 'replace',
    Add = 'add'
}
export class Patch {
    constructor(public value: any, public path: string, public op: Operation = Operation.Replace) {
    }
}