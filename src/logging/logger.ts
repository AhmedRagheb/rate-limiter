export default class Logger {
    static info(message?: string, ...params: any[]): void {
        console.error(message, params);
    }

    static error(message?: string, ...params: any[]): void {
        console.error(message, params);
    }
}
