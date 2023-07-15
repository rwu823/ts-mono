export declare enum CacheScope {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}
type CacheControlArgs = {
    maxAge: number;
    scope?: CacheScope;
};
export declare const setCacheControl: {
    (args: CacheControlArgs): string;
    minutes: number;
    hours: number;
    days: number;
};
export {};
