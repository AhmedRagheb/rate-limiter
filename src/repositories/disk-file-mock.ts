import mock from "mock-fs";

export class DiskFileMock {
    static mockEndpoints() {
        mock({
            'end-points.json': '{"rateLimitsPerEndpoint":[{"endpoint":"GET /user/:id","burst":4,"sustained":2}]}',
        });
    }

    static restoreState() {
        mock.restore();
    }
}
