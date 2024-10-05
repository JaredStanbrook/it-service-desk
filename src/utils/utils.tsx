function getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');  // Get hours and pad to 2 digits
    const minutes = now.getMinutes().toString().padStart(2, '0');  // Get minutes and pad to 2 digits
    return `${hours}:${minutes}`;
}

export { getCurrentTime };