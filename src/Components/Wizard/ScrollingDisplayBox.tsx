import { ScrollingDisplayProps } from "../../Types/ScrollingDisplayBox";

const ScrollingDisplay = <T,>(props: ScrollingDisplayProps<T>) => {
    return (
        <div>
            {props.children}
            <br />
            <div className="filterDisplay">
                {props.source.map((sourceItem) => {
                    return props.listGenerator(sourceItem);
                })}
            </div>
        </div>
    );
};

export default ScrollingDisplay;
