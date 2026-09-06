import { repaintBody, repaintFoot, refreshTable } from "./repaints/index.js";
import { renderTable } from "./render/index.js";
import { buildTable } from "./tableBuilder/index.js";

const methods = {
    repaintBody,
    repaintFoot,
    refreshTable,
    renderTable,
    buildTable
};

const createMethods = ({ inTable } = {}) => {
    const localTable = inTable;

    const localRepaintBody = () => {
        if (!localTable?.tableElement) return;

        repaintBody({
            inTableElement: localTable.tableElement,
            inColumns: localTable.store.activeColumns,
            inData: localTable.store.stateData,
            inRowConfig: localTable.store.config?.row,
            inClasses: localTable.classes
        });
    };

    const localRepaintFoot = () => {
        if (!localTable?.tableElement) return;

        repaintFoot({
            inTableElement: localTable.tableElement,
            inColumns: localTable.store.activeColumns,
            inComputedFooter: localTable.store.computedFooter,
            inClasses: localTable.classes
        });
    };

    const localRefreshTable = () => {
        if (!localTable?.tableElement) return;

        refreshTable({
            inTableElement: localTable.tableElement,
            inStore: localTable.store,
            inClasses: localTable.classes
        });
    };

    const localRender = () => {
        const result = renderTable({ inTable: localTable });

        if (result) {
            localTable.tableElement = result.element;
            localTable.controlsTree = result.treeWithIds;
        };
        // console.log("aaaaaaaaaaa---------", result);
        return result;
    };

    return {
        repaintBody: localRepaintBody,
        repaintFoot: localRepaintFoot,
        refreshTable: localRefreshTable,
        render: localRender
    };
};

export { methods, createMethods, repaintBody, repaintFoot, refreshTable, renderTable, buildTable };
export default methods;
