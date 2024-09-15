import { useEffect, useState } from "react";
import { ExcelLines, FileInputProps } from "../../Types/ExcelPreview";
import readXlsxFile from "read-excel-file";
import onMouseWheel from "../../SharedLib/onMouseWheel";

const FileInput = (props: FileInputProps) => {
    const [file, setFile] = useState<File>(new File([], ""));
    const [lines, setLines] = useState<ExcelLines>([]);
    const [headerRow, setHeaderRow] = useState<number>(10);

    useEffect(() => {
        if (file.size === 0) return;

        //@ts-ignore
        readXlsxFile(file, {
            transformData: (rows) => {
                return rows.map((row) => {
                    return row.map((val) => {
                        if (val === null) return "";

                        return String(val);
                    });
                });
            },
        }).then((parsedLines) => {
            setLines(parsedLines as unknown as ExcelLines);
        });
    }, [file]);

    useEffect(() => {
        if (lines.length === 0) return;
    }, [lines]);

    return (
        <div>
            <input
                type="file"
                onChange={(event) => {
                    setFile(event.target.files![0]);
                }}
            />
            {lines.length > 0 && (
                <>
                    <input
                        type="number"
                        value={headerRow}
                        min={1}
                        max={100}
                        onChange={(event) => {
                            setHeaderRow(parseInt(event.target.value));
                        }}
                        onWheel={(event) => {
                            setHeaderRow(onMouseWheel(event));
                        }}
                    />
                    <div>
                        <div>Header Preview: </div>
                        {lines[headerRow].slice(0, 5).map((value) => {
                            return (
                                <div
                                    className="previewPane"
                                    style={{ display: "inline" }}
                                >
                                    {value}&nbsp;
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => {
                            if (lines.length == 0) return;

                            props.contentStore({
                                lines: lines,
                                headerRow: headerRow,
                            });
                        }}
                    >
                        Confirm
                    </button>
                </>
            )}
        </div>
    );
};

export default FileInput;
