import defaultLayouts from "./layouts.json" with { type: "json" };
import defaultThemes from "./themes.json" with { type: "json" };

export const resolveClasses = ({ inLayout = "stacked", inTheme = "default", inConfigClasses = {}, inCustomClasses = {} } = {}) => {
    const localLayout = inLayout || "stacked";
    const localTheme = inTheme || "default";
    const localConfigClasses = inConfigClasses || {};
    const localCustomClasses = inCustomClasses || {};

    const layoutObj = defaultLayouts[localLayout] || defaultLayouts["stacked"] || {};
    const themeObj = defaultThemes[localTheme] || defaultThemes["default"] || {};

    const allKeys = new Set([
        ...Object.keys(layoutObj),
        ...Object.keys(themeObj),
        ...Object.keys(localConfigClasses),
        ...Object.keys(localCustomClasses)
    ]);

    const resolved = {};

    for (const key of allKeys) {
        const tokens = [
            layoutObj[key],
            themeObj[key],
            localConfigClasses[key],
            localCustomClasses[key]
        ]
            .filter(Boolean)
            .join(" ")
            .split(/\s+/)
            .filter(Boolean);

        // Deduplicate classes preserving order
        resolved[key] = Array.from(new Set(tokens)).join(" ");
    }

    return resolved;
};

export default resolveClasses;
