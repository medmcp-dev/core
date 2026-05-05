export function healthHandler(c) {
    return c.json({
        status: "ok",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
    });
}
//# sourceMappingURL=health.js.map