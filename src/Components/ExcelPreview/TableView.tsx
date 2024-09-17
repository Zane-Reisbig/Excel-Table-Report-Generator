import { TableViewProps } from "../../Types/TableView";

import "./TableView.css";

const TableView = <T,>(props: TableViewProps<T>) => {
    const defaultShownRows = 10;
    let usedRowAmount = !props.shownRowAmount
        ? defaultShownRows
        : props.shownRowAmount;

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
        Math.min(usedRowAmount, allFoundCols.length)
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
                {shownRows.length != 0 ? (
                    shownRows.map((i) => {
                        return (
                            <div className="tableRow">
                                {i.map((item) => {
                                    return (
                                        <div className="tableCell">
                                            &nbsp;{String(item).toString()}
                                            &nbsp;
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })
                ) : (
                    <div className="tableRow">
                        {[...Array(colCheck.length)].map(() => {
                            return <div className="tableCell">No Results</div>;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TableView;
