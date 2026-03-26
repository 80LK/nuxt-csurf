import type { FetchContext, ResponseType } from 'ofetch';
export declare function onRequestBuilder(contextBuilder: () => ({
    csrf: string;
    headerName: string;
})): (context: FetchContext<any, ResponseType>) => Promise<void> | void;
