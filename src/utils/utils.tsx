function getCurrentTime(): string {
    const now = new Date().toLocaleTimeString("en-US", {
        timeZone: "Australia/Perth",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    return now;
}

export { getCurrentTime };