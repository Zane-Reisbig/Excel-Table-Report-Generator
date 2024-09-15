import { TableViewProps } from "../../Types/TableView";

import "./TableView.css";

const TableView = <T,>(props: TableViewProps<T>) => {
    const defaultShownRows = 10;

    const colCheck = props.showTheseCols
        ? props.showTheseCols
        : [...Array(props.source[0].length).keys()];

    const sourceLines = props.source;
    const allFoundCols = sourceLines.map((row) => {
        return row.filter((val, index) => {
            return colCheck.includes(index);
        });
    });

    const shownRows = allFoundCols.slice(
        0,
        Math.min(
            props.shownRowAmount ? props.shownRowAmount : defaultShownRows,
            allFoundCols.length
        )
    );

    return (
        <div className="tableView">
            <div className="stats">
                <div>
                    <label>Total Results: </label>
                    <span>{allFoundCols.length}</span>
                </div>
                <div>
                    <label>Shown Results: </label>
                    <span>{shownRows.length}</span>
                </div>
            </div>

            <div className="preview">
                {shownRows.map((i) => {
                    return (
                        <div>
                            {i.map((item) => {
                                return <>&nbsp;{String(item)}&nbsp;</>;
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TableView;
