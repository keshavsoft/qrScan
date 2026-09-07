const groupBy = ({ inData = [], inKey = "", inTopN = 0 } = {}) => {
    const localData = inData;
    const localKey = inKey;
    const localTopN = inTopN;

    if (!Array.isArray(localData) || !localKey) {
        return [];
    }

    const countsMap = new Map();

    for (const row of localData) {
        if (!row || typeof row !== "object") continue;
        const val = row[localKey];
        if (val !== undefined && val !== null) {
            const strVal = String(val).trim();
            if (strVal !== "") {
                countsMap.set(strVal, (countsMap.get(strVal) || 0) + 1);
            }
        }
    }

    const sorted = Array.from(countsMap.entries())
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => a.value.localeCompare(b.value, undefined, { sensitivity: "base", numeric: true }));

    if (localTopN > 0 && Number.isFinite(localTopN)) {
        return sorted.slice(0, localTopN);
    }

    return sorted;
};

export { groupBy };
export default groupBy;
