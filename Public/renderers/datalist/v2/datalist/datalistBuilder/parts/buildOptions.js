import { groupBy } from "../../../common/index.js";

const buildOptions = ({ inData = [], inKey = "", inTopN = 0, inGroupedData } = {}) => {
    const localData = inData;
    const localKey = inKey;
    const localTopN = inTopN;
    const localGroupedData = inGroupedData;

    const groupedItems = Array.isArray(localGroupedData)
        ? localGroupedData
        : groupBy({ inData: localData, inKey: localKey, inTopN: localTopN });

    return groupedItems.map(({ value, count }) => ({
        tagName: "option",
        attributes: {
            value: value,
            label: `${value} (${count})`
        },
        textContent: `${value} (${count})`
    }));
};

export { buildOptions };
export default buildOptions;
