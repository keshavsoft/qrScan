import { buildRow } from "../row/buildRow.js";

const buildBody = ({ inColumns = [], inData = [], inRowConfig = {},
    inClasses = {}, inColumnsConfig: inColumnsConfig } = {}) => {

    const localColumns = inColumns;
    const localData = inData;
    const localRowConfig = inRowConfig;
    const localClasses = inClasses;
    const localColumnsConfig = inColumnsConfig;

    // console.log("localColumnsConfig-------:", localColumnsConfig);

    if (!Array.isArray(localData) || localData.length === 0) {
        const emptyRow = {
            tagName: "tr",
            children: [{
                tagName: "td",
                textContent: "No matching records found",
                attributes: {
                    colspan: String(localColumns.length),
                    class: "text-center text-muted fst-italic py-4"
                }
            }]
        };

        const tbodyAttr = localClasses?.tbody ? { class: localClasses.tbody } : {};

        return {
            tagName: "tbody",
            attributes: tbodyAttr,
            children: [emptyRow]
        };
    }

    const bodyRows = localData.map(row => {
        const cells = localColumns.map(col => {

            const findConfig = localColumnsConfig.find(loopConfig => {
                return loopConfig.key === col.key;
            });

            // console.log("findConfig : ", findConfig);

            return {
                textContent: col.key === "amount" ? Number(row[col.key]).toFixed(2) : String(row[col.key] ?? ""),
                align: col.align,
                style: findConfig?.th?.style
            }
        });

        // console.log("cells:", cells, row);

        return buildRow({
            inCellTagName: "td",
            inCells: cells,
            inRowClass: localClasses?.tr || "",
            inCellClass: localClasses?.td || "",
            inColumnsConfig: localColumnsConfig
        });
    });

    const tbodyAttr = localClasses?.tbody ? { class: localClasses.tbody } : {};

    return {
        tagName: "tbody",
        attributes: tbodyAttr,
        children: bodyRows
    };
};

export { buildBody };
export default buildBody;
