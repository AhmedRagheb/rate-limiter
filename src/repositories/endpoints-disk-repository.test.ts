import { DiskFileMock } from './disk-file-mock';
import EndpointsDiskRepository from './endpoints-disk-repository';

describe('Endpoints Disk Repository', () => {
    beforeAll(() => {
        DiskFileMock.mockEndpoints();
    });

    afterEach(() => {
        DiskFileMock.restoreState();
    });

    test('should return the Endpoint data', async () => {
        const target = new EndpointsDiskRepository();
        const actual = await target.read();

        const expected = [
            {
                "endpoint": "GET /user/:id",
                "burst": 4,
                "sustained": 2
            }
        ];

        expect(actual).toEqual(expected);
    });
});
