export type Category = {
    categoryImage: string;
    id: number;
    name: string;
    rss: string;
};

export type InferPromise<T extends Promise<unknown>> = T extends Promise<infer U> ? U : never;

export type PlatformType = 'sberbox' | 'mobile' | 'portal' | undefined;
