import mockAxios from 'jest-mock-axios';
import { saveArea, getCommunityData, syncCommunityData } from '../../src/services/offlineMapService';

const newMarker = {
    "coordinates": [{
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

const mockReturnedMarkers = {
    areas: [newMarker],
    points: []
}

const userEmail = 'user@email.com';

afterEach(() => {
    mockAxios.reset();
});

describe('offlineMapService', () => {
    it('Can save a new marker', async() => {
        mockAxios.get.mockResolvedValue({ data: mockReturnedMarkers });
        mockAxios.post.mockResolvedValue({ data: { id: 'someId' } });
        expect(await getCommunityData(userEmail)).toStrictEqual(mockReturnedMarkers);
        await expect(saveArea(newMarker, userEmail, true)).resolves.toBeUndefined();
        await expect(saveArea(newMarker, userEmail, true)).resolves.toBeUndefined();
        expect(mockAxios.post).toHaveBeenCalledTimes(0);
        const communityData = await getCommunityData();
        expect(communityData.areas.length).toStrictEqual(3);
    })

    it('Can sync saved markers', async() => {
        const communityData = await getCommunityData();
        mockAxios.post.mockResolvedValue({ data: { id: 'someId' } });
        await expect(syncCommunityData('some@email.com')).resolves.toBeUndefined();
        expect(mockAxios.post).toHaveBeenCalledTimes(4); // 4 because the post is called 2 times for each marker
        mockAxios.get.mockResolvedValue({ data: communityData });
        const newCommunityData = await getCommunityData();
        expect(newCommunityData.areas.length).toStrictEqual(3);
    })

    it('Do not delete on error to sync areas', async() => {
        mockAxios.get.mockResolvedValue({ data: mockReturnedMarkers });
        await saveArea(newMarker, userEmail, true);
        await saveArea(newMarker, userEmail, true);
        const communityData = await getCommunityData();
        expect(communityData.areas.length).toStrictEqual(3);
        mockAxios.post.mockRejectedValue(new Error("Network Error"));
        await expect(syncCommunityData('some@email.com')).rejects.toThrow("Network Error");
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        const newCommunityData = await getCommunityData();
        expect(newCommunityData.areas.length).toStrictEqual(3);
    })
})