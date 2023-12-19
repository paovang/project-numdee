export function camelToSnakeCase(value: string): string {
    return value.replace(/([A-Z])/g, (match) => `${match.toLowerCase()}`);
}