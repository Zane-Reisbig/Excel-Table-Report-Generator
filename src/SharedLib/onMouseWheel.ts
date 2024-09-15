const onMouseWheel = <T extends Element & { value: string }>(
    event: React.WheelEvent<T>
) => {
    event.preventDefault();

    const el = event.target as T;
    const curVal = el.value === "" ? 0.0 : parseFloat(el.value);

    if (event.deltaY === 0) return curVal;

    const inc = parseFloat(el.getAttribute("step") || "1");
    const max = parseFloat(el.getAttribute("max") || "9999");
    const min = parseFloat(el.getAttribute("min") || "-9999");

    const scrollAmount = -event.deltaY / 180;
    const change = scrollAmount * inc;

    const changedVal = curVal + change;
    if (changedVal > max || changedVal < min) return curVal;

    return changedVal;
};

export default onMouseWheel;
