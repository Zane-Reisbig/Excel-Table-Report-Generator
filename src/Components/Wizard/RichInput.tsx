import { useEffect, useRef, useState } from "react";

import ScrollingDisplay from "./ScrollingDisplayBox";

import { RichInputProps } from "../../Types/RichInput";

import "./RichInput.css";

export class RichInputContents {
    public labelDelimiter = "=";
    public entryDelimiter = "\n";

    private _value: string;
    get value() {
        return this._value;
    }

    get labeledEntries(): { [key: string]: string[] } {
        let out = this.value
            .split(this.entryDelimiter)
            .reduce((acc: { [key: string]: string[] }, cur) => {
                if (cur === "") return acc;
                if (!cur.includes(this.labelDelimiter)) return acc;

                let splitLine = cur.split(this.labelDelimiter).map((i) => {
                    return i.trim();
                });

                let entry = {
                    [splitLine[0]]: [splitLine[1]],
                };

                if (splitLine[0] in acc) {
                    entry[splitLine[0]].push(`${acc[splitLine[0]]}`);
                }

                return { ...acc, ...entry };
            }, {});

        return out;
    }

    get unlabeledEntries() {
        let out = this.value.split(this.entryDelimiter).filter((val) => {
            return !val.includes(this.labelDelimiter);
        });

        return out[0] === "" ? [] : Array.from(new Set(out));
    }

    constructor(from: string, labelDelimeter: string = "=") {
        this._value = from;
        this.labelDelimiter = labelDelimeter;
    }

    toString() {
        return this._value;
    }

    itemizedContent() {
        return {
            labeled: this.labeledEntries,
            unlabed: this.unlabeledEntries,
        };
    }
}

const RichInput = (
    props: RichInputProps<RichInputContents> & {
        className?: string;
    }
) => {
    const labelDelim = !props.labelDelimiter ? "=" : props.labelDelimiter;

    const mainTextElement = useRef<HTMLTextAreaElement>(null);
    const [mainTextVal, setMainText] = useState<string>("");
    const [formattedText, setFormattedText] = useState<RichInputContents>();

    const defaultColAmount = 25;
    const [colAmount, setColAmount] = useState<number>(defaultColAmount);

    useEffect(() => {
        mainTextElement.current!.style.resize = "none";
        mainTextElement.current!.style.fontFamily = "Monospace";
        mainTextElement.current!.style.fontWeight = "bold";
    }, []);

    useEffect(() => {
        if (mainTextVal == null) return;

        setFormattedText(new RichInputContents(mainTextVal));
    }, [mainTextVal]);

    useEffect(() => {
        if (formattedText == null) return;

        const longestLine = formattedText.value
            .split("\n")
            .reduce((prev, cur) => {
                return prev > cur.length ? prev : cur.length;
            }, -1);

        setColAmount(
            longestLine > defaultColAmount ? longestLine : defaultColAmount
        );

        props.contentStore(formattedText);
    }, [formattedText]);

    return (
        <div className={props.className ? props.className : ""}>
            <div className="richTextArea">
                <div>
                    {labelDelim && (
                        <div>
                            Column Identifier: &#91;&nbsp;{labelDelim}
                            &nbsp;&#93;
                        </div>
                    )}
                    <div>
                        <textarea
                            ref={mainTextElement}
                            placeholder="Search Filters...&#10;I.E. Country=Poland"
                            rows={7}
                            cols={colAmount}
                            wrap="hard"
                            value={mainTextVal}
                            onChange={(e) => {
                                setMainText(e.target.value);
                            }}
                            className="mainRichTextArea"
                        />
                    </div>
                </div>
                {formattedText && (
                    <ScrollingDisplay
                        source={Object.entries(formattedText.labeledEntries)}
                        listGenerator={([key, val]) => {
                            return (
                                <div>
                                    {val.map((i) => {
                                        return (
                                            <>
                                                {"["} <b>{i}</b> {"]"}
                                            </>
                                        );
                                    })}{" "}
                                    in {"["} <b>{key}</b> {"]"}
                                </div>
                            );
                        }}
                    >
                        {
                            <span>
                                {"<"}
                                <b>Entry</b>
                                {">"} In {"<"}
                                <b>Column</b>
                                {">"}
                            </span>
                        }
                    </ScrollingDisplay>
                )}

                {formattedText && (
                    <ScrollingDisplay
                        source={formattedText.unlabeledEntries}
                        listGenerator={(entry) => {
                            return (
                                <div>
                                    {"["} <b>{entry}</b> {"]"} in Any
                                </div>
                            );
                        }}
                    >
                        {
                            <span>
                                {"<"}
                                <b>Entry</b>
                                {">"} In {"<"}
                                <b>Any</b>
                                {">"}
                            </span>
                        }
                    </ScrollingDisplay>
                )}
            </div>
        </div>
    );
};

export default RichInput;
