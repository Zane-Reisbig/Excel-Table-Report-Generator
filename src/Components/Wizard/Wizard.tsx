import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import TableView from "../ExcelPreview/TableView";

import ExcelTable, { filterRows } from "../ExcelPreview/ExcelFile";
import { ExcelLines } from "../../Types/ExcelPreview";

import RichInput, { RichInputContents } from "./RichInput";

import "./Wizard.css";

const Wizard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const excelTable = location.state as ExcelTable;

    const [searchBoxContents, setSearchBoxContents] =
        useState<RichInputContents>();
    const [filteredRows, setFilteredRows] = useState<ExcelLines>([]);

    useEffect(() => {
        if (excelTable.data == null) {
            navigate("/");
        }

        setFilteredRows(excelTable.data);
    }, []);

    useEffect(() => {
        if (searchBoxContents == null) return;

        console.log(searchBoxContents.itemizedContent());
    }, [searchBoxContents]);

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
                <RichInput
                    className="filterInput"
                    contentStore={setSearchBoxContents}
                />
            </div>

            {filteredRows && (
                <TableView
                    source={filteredRows}
                    showTheseCols={[0, 2, 9]}
                    shownRowAmount={30}
                />
            )}
        </div>
    );
};

export default Wizard;
