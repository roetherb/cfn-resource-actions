export interface IActionProvider {
    getLogicalActions(fragment: any): any;
    getPhysicalActions(): any;
    registerCommands(): void;
}
export namespace IActionProvider {
    type Constructor<T> = {
        new(...args: any[]): T;
        readonly prototype: T;
    };
    const implementations: Constructor<IActionProvider>[] = [];
    export function GetImplementations(): Constructor<IActionProvider>[] {
        return implementations;
    }
    export function register<T extends Constructor<IActionProvider>>(ctor: T) {
        implementations.push(ctor);
        return ctor;
    }
    export function registerCommands(): void {
        implementations.forEach(p => new p().registerCommands());
    }
    export function registerActions(): any {
        const result: any = {};
        for (const implConstructor of GetImplementations()) {
            const impl = new implConstructor();
            const actions = impl.getPhysicalActions();
            for (const key of Object.keys(actions)) {
                result[key] = actions[key];
            }
        }
        return result;
    }
}