import { z } from 'zod';

export class Settings<T extends z.Schema> {

    static settings = new Map<string, boolean>

    name: string

    schema: T

    value: z.infer<T>

    constructor(name: string, schema: T) {
        if (Settings.settings.has(name)) throw new Error('Duplicated setting name')
        else Settings.settings.set(name, true)
        this.name = name
        this.schema = schema
        this.value = schema.parse(null)
    }
}