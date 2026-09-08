const buildContainer = ({ inContainerConfig = null, inFormSpec = null, inClasses = {} } = {}) => {
    const localContainerConfig = inContainerConfig;
    const localFormSpec = inFormSpec;
    const localClasses = inClasses;

    if (!localContainerConfig) {
        return localFormSpec;
    }

    const containerClass = localClasses?.container || localContainerConfig?.class || "card shadow-sm border-0 mb-4";
    const containerAttributes = {
        class: containerClass
    };
    if (localContainerConfig?.id) {
        containerAttributes.id = localContainerConfig.id;
    }

    const containerChildren = [];

    // 1. Container Header (e.g. Card Header with Title, Icon, and Actions/Controls)
    const headerConfig = localContainerConfig?.header;
    if (headerConfig) {
        const headerClass = localClasses?.containerHeader || headerConfig?.class || "card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center";
        const headerChildren = [];

        // Left section: Icon and Title
        const titleText = headerConfig?.title || "Form";
        const iconClass = headerConfig?.icon || "";
        const titleClass = headerConfig?.titleClass || "fw-semibold text-secondary";

        const titleChildren = [];
        if (iconClass) {
            titleChildren.push({
                tagName: "i",
                attributes: { class: `${iconClass} me-1` }
            });
        }
        titleChildren.push({
            tagName: "span",
            textContent: titleText
        });

        headerChildren.push({
            tagName: "div",
            attributes: { class: titleClass },
            children: titleChildren
        });

        // Right section: Actions / extra controls
        if (Array.isArray(headerConfig?.actions) && headerConfig.actions.length > 0) {
            const actionsWrapper = {
                tagName: "div",
                attributes: { class: "d-flex align-items-center gap-2" },
                children: headerConfig.actions.map(action => {
                    const actionChildren = [];
                    if (action.icon) {
                        actionChildren.push({
                            tagName: "i",
                            attributes: { class: `${action.icon} me-1` }
                        });
                    }
                    if (action.label) {
                        actionChildren.push({
                            tagName: "span",
                            textContent: action.label
                        });
                    }

                    const btnAttr = {
                        type: action.type || "button",
                        class: action.class || "btn btn-sm btn-outline-secondary"
                    };
                    if (action.id) btnAttr.id = action.id;
                    if (action.title) btnAttr.title = action.title;

                    return {
                        tagName: "button",
                        attributes: btnAttr,
                        children: actionChildren
                    };
                })
            };
            headerChildren.push(actionsWrapper);
        }

        containerChildren.push({
            tagName: "div",
            attributes: { class: headerClass },
            children: headerChildren
        });
    }

    // 2. Container Body wrapping Form Spec
    const bodyClass = localClasses?.containerBody || localContainerConfig?.bodyClass || "card-body";
    const bodyChildren = localFormSpec ? [localFormSpec] : [];

    // Additional controls inside container if specified
    if (Array.isArray(localContainerConfig?.extraControls)) {
        bodyChildren.push(...localContainerConfig.extraControls);
    }

    containerChildren.push({
        tagName: "div",
        attributes: { class: bodyClass },
        children: bodyChildren
    });

    // 3. Optional Container Footer
    if (localContainerConfig?.footer) {
        const footerConfig = localContainerConfig.footer;
        const footerClass = localClasses?.containerFooter || footerConfig?.class || "card-footer bg-light py-2";
        containerChildren.push({
            tagName: "div",
            attributes: { class: footerClass },
            textContent: footerConfig.text || ""
        });
    }

    return {
        tagName: "div",
        attributes: containerAttributes,
        children: containerChildren
    };
};

export { buildContainer };
export default buildContainer;
