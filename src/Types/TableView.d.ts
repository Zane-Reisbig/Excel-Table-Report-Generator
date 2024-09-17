export interface TableViewProps<T> {
    source: T[][];
    shownRowAmount?: number;
    showTheseCols?: number[];
    headerRow?: string[];
}
