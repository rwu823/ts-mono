export var CacheScope;
(function (CacheScope) {
    CacheScope["PUBLIC"] = "PUBLIC";
    CacheScope["PRIVATE"] = "PRIVATE";
})(CacheScope || (CacheScope = {}));
export const setCacheControl = (args) => {
    let string = '';
    for (const [k, v] of Object.entries(args)) {
        string += `${k}: ${v},`;
    }
    return `@cacheControl(${string})`;
};
setCacheControl.minutes = 60;
setCacheControl.hours = setCacheControl.minutes * 60;
setCacheControl.days = setCacheControl.hours * 24;
