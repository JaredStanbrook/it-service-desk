function getFormDataValue(formData: FormData, key: string, defaultValue: string = ""): string {
    return formData.get(key)?.toString() ?? defaultValue;
}
function getFormDataNumber(formData: FormData, key: string, defaultValue: number = 0): number {
    const value = formData.get(key);
    const numberValue = value ? Number(value) : defaultValue;
    return isNaN(numberValue) ? defaultValue : numberValue;
}
function getFormDataDate(formData: FormData, key: string, defaultValue: Date = new Date()): Date {
    const value = formData.get(key);
    return value ? new Date(value.toString()) : defaultValue;
}
function getFormDataBool(formData: FormData, key: string, defaultValue: boolean = false): boolean {
    const value = formData.get(key);
    if (value === null) return defaultValue;
    return value === "true" || value === "1" || value === "on";
}
export { getFormDataValue, getFormDataNumber, getFormDataDate, getFormDataBool };
