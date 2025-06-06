import {z} from 'zod';

export class Settings<Schema extends z.Schema> {
	static settings = new Map<string, boolean>();

	constructor(
		public name: string,
		public schema: Schema,
		public value: z.infer<typeof schema> = schema.parse(undefined),
	) {
		if (Settings.settings.has(name)) throw new Error('Duplicated setting name');
		Settings.settings.set(name, true);
	}

	get defaultValue() {
		return this.schema.parse(undefined);
	}
}
