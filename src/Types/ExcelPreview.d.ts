export type ExcelLines = Array<Array<String>>;
export interface ExcelPreviewProps {
    store: React.Dispatch;
}
export interface FileInputProps {
    contentStore: React.Dispatch;
}

type Operator = enum;
export interface FilterOptions {
    operator?: Operator;
    matchWholeWord?: boolean;
}
