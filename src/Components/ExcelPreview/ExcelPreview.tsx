import { useEffect, useState } from "react";

import FileInput from "./ExcelFileInput";
import ExcelTable from "./ExcelFile";
import { ExcelLines, ExcelPreviewProps } from "../../Types/ExcelPreview";

import "./ExcelPreview.css";

const Preview = (props: ExcelPreviewProps) => {
    const [excelLines, setExcelLines] = useState<ExcelTable>();

    useEffect(() => {
        if (excelLines == null) return;

        props.store(excelLines);
    }, [excelLines]);
    return (
        <FileInput
            contentStore={(content: {
                lines: ExcelLines;
                headerRow: number;
            }) => {
                setExcelLines(new ExcelTable(content.lines, content.headerRow));
            }}
        />
    );
};

export default Preview;
