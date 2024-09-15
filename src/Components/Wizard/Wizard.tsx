import { useLocation, useNavigate } from "react-router-dom";
import ExcelTable, { filterRows } from "../ExcelPreview/ExcelFile";
import { useEffect, useState } from "react";

import TableView from "../ExcelPreview/TableView";
import { ExcelLines } from "../../Types/ExcelPreview";

import { Operator } from "../ExcelPreview/ExcelFile";

import "./Wizard.css";

const Wizard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const delim = ";";
    const maxShownFilters = 3;

    const excelTable = location.state as ExcelTable;

    const [searchBoxContents, setSearchBoxContents] = useState<string[]>([]);
    const [filteredRows, setFilteredRows] = useState<ExcelLines>([]);
    const [doHotReload, setDoHotReload] = useState<boolean>(false);
    const [doMatchWholeWord, setDoMatchWholeWorld] = useState<Operator>(
        Operator.AND
    );

    useEffect(() => {
        console.log(excelTable);

        if (excelTable.data == null) {
            navigate("/");
        }

        setFilteredRows(excelTable.data);
    }, []);

    useEffect(() => {
        if (searchBoxContents == null) return;
        if (!doHotReload) return;

        userFilter();
    }, [searchBoxContents]);

    const userFilter = () => {
        setFilteredRows(
            filterRows(excelTable.data, searchBoxContents, {
                operator: doMatchWholeWord,
                matchWholeWord: false,
            })
        );
    };

    return (
        <div id="Wizard">
            <button
                onClick={() => {
                    navigate("/");
                }}
            >
                &lt;-- Home
            </button>

            <br />
            <br />

            <div>
                <input
                    type="search"
                    onChange={(event) => {
                        let formattedString = event.target.value.includes(delim)
                            ? event.target.value.split(delim).map((val) => {
                                  return val.trim();
                              })
                            : [event.target.value];
                        formattedString = formattedString.filter((val) => {
                            return val !== "";
                        });
                        setSearchBoxContents(formattedString);
                    }}
                    className="filterInput"
                />
                <button onClick={userFilter}>Search</button>
            </div>

            <div>
                <div>
                    <div className="control">
                        <input
                            type="checkbox"
                            checked={doHotReload}
                            onChange={() => {
                                setDoHotReload(!doHotReload);
                            }}
                        />
                        <label>Hot Reload</label>
                    </div>
                    &nbsp;
                    <div className="control">
                        <input
                            type="checkbox"
                            checked={
                                doMatchWholeWord === Operator.AND ? true : false
                            }
                            onChange={() => {
                                setDoMatchWholeWorld(
                                    doMatchWholeWord === Operator.AND
                                        ? Operator.OR
                                        : Operator.AND
                                );
                            }}
                        />
                        <label>Match Whole Word</label>
                    </div>
                </div>
                <div className="appliedFilters">
                    {searchBoxContents &&
                        searchBoxContents.length !== 0 &&
                        searchBoxContents
                            .slice(
                                0,
                                Math.min(
                                    maxShownFilters,
                                    searchBoxContents.length
                                )
                            )
                            .map((filter) => {
                                return <div>- {filter}&nbsp;</div>;
                            })}
                    {searchBoxContents.length > maxShownFilters && (
                        <div>-...</div>
                    )}
                </div>

                <br />

                {filteredRows && (
                    <TableView
                        source={filteredRows}
                        showTheseCols={[0, 2, 9]}
                        shownRowAmount={30}
                    />
                )}
            </div>
        </div>
    );
};

export default Wizard;
