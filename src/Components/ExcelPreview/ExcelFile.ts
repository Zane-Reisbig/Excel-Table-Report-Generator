import { ExcelLines, FilterOptions } from "../../Types/ExcelPreview";

export enum Operator {
    AND,
    OR,
}

export default class ExcelTable {
    private _lines: ExcelLines;
    get lines() {
        return this._lines;
    }

    private _headerRow: number;
    get headerRow() {
        return this._headerRow;
    }

    private _headers: string[];
    get headers() {
        return this._headers;
    }

    private _data: string[][];
    get data() {
        return this._data;
    }

    constructor(lines: ExcelLines, headerRow: number) {
        this._lines = lines;
        this._headerRow = headerRow;

        this._headers = this._lines[headerRow];
        this._data = this._lines.slice(this._headerRow + 1);
    }

    returnHeaders(headers: string[]): ExcelLines {
        let needed: number[] = [];
        headers.forEach((header) => {
            needed.push(this._headers.indexOf(header));
        });

        return this._data.map((row) => {
            return row.filter((a, index) => {
                return needed.includes(index);
            });
        });
    }
}

export function filterRows(
    source: ExcelLines,
    rowContains: string | string[],
    options: FilterOptions
) {
    if (options.matchWholeWord == null) options.matchWholeWord = false;
    if (options.operator == null) options.operator = Operator.AND;

    if (typeof rowContains === "string") {
        rowContains = [rowContains];
    }

    const includeOption = (source: string, contains: string) => {
        return options.matchWholeWord
            ? source.indexOf(contains) == -1
                ? false
                : true
            : source.includes(contains);
    };

    return source.filter((row) => {
        let rowContainsCheckCounter = (rowContains as string[]).map(() => {
            return 0;
        });

        for (let item of row) {
            for (let check of rowContains) {
                if (includeOption(item, check)) {
                    rowContainsCheckCounter[rowContains.indexOf(check)] += 1;
                }
            }
        }

        return options.operator == Operator.AND
            ? rowContainsCheckCounter.every((val) => {
                  return val >= 1;
              })
                ? true
                : false
            : rowContainsCheckCounter.findIndex((val) => {
                  return val >= 1;
              });
    });
}
