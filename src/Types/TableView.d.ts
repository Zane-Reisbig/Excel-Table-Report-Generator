export interface TableViewProps<T> {
    source: Array<Array<T>>;
    shownRowAmount?: number;
    showTheseCols?: Array<number>;
}
