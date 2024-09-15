import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Preview from "../ExcelPreview/ExcelPreview";
import ExcelTable from "../ExcelPreview/ExcelFile";

import "./Home.css";

function Home() {
    const [workingTable, setWorkingTable] = useState<ExcelTable>();
    const navigator = useNavigate();

    useEffect(() => {
        if (!workingTable) return;

        navigator("/wizard", { state: workingTable });
    }, [workingTable]);

    return (
        <div className="Home">
            <Preview
                store={(val: ExcelTable) => {
                    setWorkingTable(val);
                }}
            />
        </div>
    );
}

export default Home;
