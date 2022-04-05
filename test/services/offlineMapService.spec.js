import mockAxios from 'jest-mock-axios';
import { saveArea, getAreas, syncAreas } from '../../src/services/offlineMapService';

const newMarker =
{
    "coordinates": [
        {
            "latitude": -15.824315693302905,
            "longitude": -48.096313923597336
        },
        {
            "latitude": -15.822622193967165,
            "longitude": -48.081107810139656
        },
        {
            "latitude": -15.8439782782386,
            "longitude": -48.09049554169178
        }
    ],
    "description": "",
    "id": null,
    "multimedia": [],
    "title": "A"
}

afterEach(() => {
    mockAxios.reset();
});

describe('offlineMapService', () => {
    it('Can save a new marker', async () => {
        expect(await getAreas()).toStrictEqual([]);
        await expect(saveArea(newMarker)).resolves.toBeUndefined();
        await expect(saveArea(newMarker)).resolves.toBeUndefined();
        expect((await getAreas()).length).toStrictEqual(2);
    })

    it('Can sync saved markers', async () => {
        const areas = await getAreas();
        expect(areas.length).toBeGreaterThanOrEqual(1);
        mockAxios.post.mockResolvedValue({ data: { id: 'someId' } });

        await expect(syncAreas('some@email.com')).resolves.toBeUndefined();
        expect(mockAxios.post).toHaveBeenCalledTimes(areas.length * 2);

        const newAreas = await getAreas();
        expect(newAreas.length).toStrictEqual(0);
    })

    it('Do not delete on error to sync areas', async () => {
        await saveArea(newMarker);
        await saveArea(newMarker);
        const areas = await getAreas();
        expect(areas.length).toBeGreaterThanOrEqual(1);
        mockAxios.post.mockRejectedValue(new Error("Network Error"));
        await expect(syncAreas('some@email.com')).rejects.toThrow("Network Error");
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        const newAreas = await getAreas();
        expect(newAreas.length).toStrictEqual(areas.length);
    })
})
