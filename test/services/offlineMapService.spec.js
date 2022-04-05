import { iteratee } from 'lodash';
import { getAll } from '../../src/services/localDatabase';
import { saveArea, getAreas } from '../../src/services/offlineMapService';

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

describe('offlineMapService', () => {
    it('Can save a new marker', async () => {
        expect(await getAreas()).toStrictEqual([]);
        await expect(saveArea(newMarker)).resolves.toBeUndefined();
        expect((await getAreas()).length).toStrictEqual(1);
    })

})
