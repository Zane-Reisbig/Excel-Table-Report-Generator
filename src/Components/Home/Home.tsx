import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExcelTable from "../ExcelPreview/ExcelFile";

import "./Home.css";
import FileInput from "../ExcelPreview/ExcelFileInput";

function Home() {
    const [workingTable, setWorkingTable] = useState<ExcelTable>();
    const navigator = useNavigate();

    useEffect(() => {
        if (!workingTable) return;

        navigator("/wizard", { state: workingTable });
    }, [workingTable]);

    return (
        <div className="Home">
            <FileInput
                contentStore={(content) => {
                    setWorkingTable(
                        new ExcelTable(content.lines, content.headerRow)
                    );
                }}
            />
        </div>
    );
}

export default Home;
