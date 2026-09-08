import { buildField } from "../field/index.js";

const buildBody = ({ inColumns = [], inConfig = {}, inClasses = {} } = {}) => {
    const localColumns = inColumns;
    const localConfig = inConfig;
    const localClasses = inClasses;

    if (!Array.isArray(localColumns)) return { tagName: "div", children: [] };

    // Support for 2-column, 3-column, or multi-column divided sections
    if (Array.isArray(localConfig?.sections) && localConfig.sections.length > 0) {
        const columnsMap = new Map();
        localColumns.forEach(col => {
            if (col && col.key) columnsMap.set(col.key, col);
        });

        const sectionNodes = localConfig.sections.map(section => {
            const sectionColKeys = Array.isArray(section.columns) ? section.columns : [];
            const sectionColumns = sectionColKeys.map(k => typeof k === "string" ? columnsMap.get(k) || { key: k, label: k } : k);

            const fieldRows = sectionColumns.map(col => buildField({ inColumn: col, inClasses: localClasses, inConfig: localConfig }));

            const sectionBodyNode = {
                tagName: "div",
                attributes: section.bodyClass ? { class: section.bodyClass } : (localClasses?.sectionBody ? { class: localClasses.sectionBody } : { class: "d-flex flex-column gap-3" }),
                children: fieldRows
            };

            // If section is configured as a card
            if (section.card) {
                const cardChildren = [];
                if (section.title) {
                    cardChildren.push({
                        tagName: "div",
                        attributes: { class: "card-header bg-light py-2 fw-semibold d-flex align-items-center gap-2" },
                        children: [
                            ...(section.icon ? [{ tagName: "i", attributes: { class: section.icon } }] : []),
                            { tagName: "span", textContent: section.title }
                        ]
                    });
                }
                cardChildren.push({
                    tagName: "div",
                    attributes: { class: "card-body" },
                    children: [sectionBodyNode]
                });

                return {
                    tagName: "div",
                    attributes: { class: section.class || "col-md-6" },
                    children: [
                        {
                            tagName: "div",
                            attributes: { class: "card h-100 shadow-sm border-0" },
                            children: cardChildren
                        }
                    ]
                };
            }

            const sectionChildren = [];
            if (section.title) {
                sectionChildren.push({
                    tagName: "h6",
                    attributes: { class: section.titleClass || "fw-bold text-secondary mb-3 pb-2 border-bottom d-flex align-items-center gap-2" },
                    children: [
                        ...(section.icon ? [{ tagName: "i", attributes: { class: section.icon } }] : []),
                        { tagName: "span", textContent: section.title }
                    ]
                });
            }
            sectionChildren.push(sectionBodyNode);

            return {
                tagName: "div",
                attributes: { class: section.class || "col-md-6" },
                children: sectionChildren
            };
        });

        const bodyAttr = {
            class: localConfig.sectionsRowClass || "row g-4"
        };

        return {
            tagName: "div",
            attributes: bodyAttr,
            children: sectionNodes
        };
    }

    const fieldRows = localColumns.map(col => buildField({ inColumn: col, inClasses: localClasses, inConfig: localConfig }));
    // debugger;
    let bodyClass = localClasses?.body || "";
    if (localConfig?.grid) {
        const gap = typeof localConfig.grid === "object" && localConfig.grid.gap !== undefined
            ? localConfig.grid.gap
            : 3;
        bodyClass = `row g-${gap}`;
    }

    const bodyAttr = bodyClass ? { class: bodyClass } : {};

    return {
        tagName: "div",
        attributes: bodyAttr,
        children: fieldRows
    };
};

export { buildBody };
export default buildBody;
