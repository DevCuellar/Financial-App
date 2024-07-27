import { Column, ColumnOptions } from 'typeorm';

export function NullableColumn(options: ColumnOptions = {}): PropertyDecorator {
    return Column({ default: null, ...options, nullable: true });
}
