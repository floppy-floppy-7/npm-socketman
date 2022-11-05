import { Server } from 'socket.io/dist/index';
interface Options {
    namespaceName?: string;
    auth: false | {
        username: string;
        password: string;
    };
}
declare function setup(sioInstance: Server, options?: Options): void;
export { setup };
