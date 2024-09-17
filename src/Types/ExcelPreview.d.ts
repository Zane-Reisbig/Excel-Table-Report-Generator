export type ExcelLines = string[][];
export interface ExcelPreviewProps {
    store: React.Dispatch;
}
type Operator = enum;
export interface FilterOptions {
    operator?: Operator;
    matchWholeWord?: boolean;
}
