import { ReactElement } from "react";

export interface ScrollingDisplayProps<T> {
    // forClassName:
    source: T[];
    listGenerator: (sourceElement: T) => React.Element;

    children?: ReactElement | string;
}
