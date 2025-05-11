import { z } from 'zod';

export class Settings<
    Schema extends z.Schema,
    Constant extends Record<string, Record<string, any>>
> {

    static settings = new Map<string, boolean>
    // static settingsCount = 0

    constructor(
        public name: string,
        public schema: Schema,
        public constant?: Constant,
        public value = schema.parse(undefined)
    ) {
        if (Settings.settings.has(name)) throw new Error('Duplicated setting name')
        else Settings.settings.set(name, true)
    }

    get defaultValue() {
        return this.schema.parse(undefined)
    }
}