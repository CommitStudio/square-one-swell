/*****************************************************************************
 * Source: https://github.com/swellstores/swell-node/issues/11
 ****************************************************************************/

declare module 'swell-node' {
  import EventEmitter from 'node:events';

  type Callback<D, T> = (error: unknown, data?: D, response?: T) => void | Promise<void>;

  interface SwellNodeClientParams {
    clientId?: string;
    clientKey?: string;
    host?: string;
    port?: string;
    verifyCert?: boolean;
    version?: string;
    session?: any;
    route?: any;
    timeout?: number;
    routeClientId?: string;
    cache?: boolean;
    debug?: boolean;
  }

  interface SwellNodeClient extends EventEmitter {
    params: any;
    server: any;
    cache: any;
    authed: boolean;

    new (
      clientId: string,
      clientKey: string,
      options?: SwellNodeClientParams,
      callback?: (arg: this) => void | Promise<void>
    ): SwellNodeClient;
    create(
      clientId: string,
      clientKey: string,
      options?: SwellNodeClientParams,
      callback?: (arg: this) => void | Promise<void>
    ): SwellNodeClient;
    init(clientId: string, clientKey: string, options?: SwellNodeClientParams): SwellNodeClient;
    connect(callback: (arg: this) => void | Promise<void>): void;
    request<T = any>(method: string, url: string, data?: any): Promise<T>;
    get<T = any>(url: string, data?: any): Promise<T>;
    post<T = any>(url: string, data?: any): Promise<T>;
    put<T = any>(url: string, data?: any): Promise<T>;
    delete<T = any>(url: string, data?: any): Promise<T>;
  }

  export function createClient(
    clientId: string,
    clientKey: string,
    options?: SwellNodeClientParams,
    callback?: (arg: this) => void
  ): SwellNodeClient;
}
