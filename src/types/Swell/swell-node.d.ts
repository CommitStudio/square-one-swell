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
    session?: unknown;
    route?: unknown;
    timeout?: number;
    routeClientId?: string;
    cache?: boolean;
    debug?: boolean;
  }

  interface SwellNodeClient extends EventEmitter {
    params: unknown;
    server: unknown;
    cache: unknown;
    authed: boolean;

    // eslint-disable-next-line @typescript-eslint/no-misused-new
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
    request<T = unknown>(method: string, url: string, data?: unknown): Promise<T>;
    get<T = unknown>(url: string, data?: unknown): Promise<T>;
    post<T = unknown>(url: string, data?: unknown): Promise<T>;
    put<T = unknown>(url: string, data?: unknown): Promise<T>;
    delete<T = unknown>(url: string, data?: unknown): Promise<T>;
  }

  export function createClient(
    clientId: string,
    clientKey: string,
    options?: SwellNodeClientParams,
    callback?: (arg: this) => void
  ): SwellNodeClient;
}
