import mockAxios from 'jest-mock-axios';
import { saveArea, getCommunityData, syncCommunityData, savePoint } from '../../src/services/offlineMapService';

const newArea = {
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

const newPoint = {
    "coordinates": [{
        "latitude": -15.824315693302905,
        "longitude": -48.096313923597336
    }],
    "description": "",
    "id": null,
    "multimedia": [],
    "title": "A"
}

const mockReturnedMarkers = {
    areas: [newArea],
    points: []
}

const userEmail = 'user@email.com';

afterEach(() => {
    mockAxios.reset();
});

describe('Tests with areas', () => {

    it('Can get offline areas with no area saved', async() => {
        await expect(getCommunityData(userEmail, true)).resolves.toStrictEqual({ areas: [], points: [] });
        expect(mockAxios.post).toHaveBeenCalledTimes(0);
        expect(mockAxios.get).toHaveBeenCalledTimes(0);
    });

    it('Can save area directly online', async() => {
        mockAxios.post.mockResolvedValue({ data: { id: 'someId' } });
        await expect(saveArea(newArea, userEmail)).resolves.toBeUndefined();
    })

    it('Can save a new areas offline', async() => {
        mockAxios.get.mockResolvedValue({ data: mockReturnedMarkers });
        mockAxios.post.mockResolvedValue({ data: { id: 'someId' } });
        expect(await getCommunityData(userEmail)).toStrictEqual(mockReturnedMarkers);
        await expect(saveArea(newArea, userEmail, true)).resolves.toBeUndefined();
        await expect(saveArea(newArea, userEmail, true)).resolves.toBeUndefined();
        expect(mockAxios.post).toHaveBeenCalledTimes(0);
        const communityData = await getCommunityData();
        expect(communityData.areas.length).toStrictEqual(3);
        expect(communityData.points.length).toStrictEqual(0);
    })

    it('Can sync saved area', async() => {
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
        await saveArea(newArea, userEmail, true);
        await saveArea(newArea, userEmail, true);
        const communityData = await getCommunityData();
        expect(communityData.areas.length).toStrictEqual(3);
        mockAxios.post.mockRejectedValue(new Error("Network Error"));
        await expect(syncCommunityData('some@email.com')).rejects.toThrow("Network Error");
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        const newCommunityData = await getCommunityData();
        expect(newCommunityData.areas.length).toStrictEqual(3);
        expect(newCommunityData.points.length).toStrictEqual(0);
    })
})

describe('Tests with points', () => {
    it('Can save a point directly online', async() => {
        mockAxios.post.mockResolvedValue({ data: { id: 'someId' } });
        await expect(savePoint(newPoint, userEmail)).resolves.toBeUndefined();
    })

    it('Can save points offline and getCommunityData', async() => {
        mockAxios.get.mockResolvedValue({ data: mockReturnedMarkers });
        mockAxios.post.mockResolvedValue({ data: { id: 'someId' } });
        expect(await getCommunityData(userEmail)).toStrictEqual(mockReturnedMarkers);
        await expect(savePoint(newPoint, userEmail, true)).resolves.toBeUndefined();
        await expect(savePoint(newPoint, userEmail, true)).resolves.toBeUndefined();
        expect(mockAxios.post).toHaveBeenCalledTimes(0);
        const communityData = await getCommunityData();
        expect(communityData.areas.length).toStrictEqual(1);
        expect(communityData.points.length).toStrictEqual(2);
    })

    it('Can sync saved point', async() => {
        const communityData = await getCommunityData();
        mockAxios.post.mockResolvedValue({ data: { id: 'someId' } });
        await expect(syncCommunityData('some@email.com')).resolves.toBeUndefined();
        expect(mockAxios.post).toHaveBeenCalledTimes(4); // 4 because the post is called 2 times for each marker
        mockAxios.get.mockResolvedValue({ data: communityData });
        const newCommunityData = await getCommunityData();
        expect(newCommunityData.areas.length).toStrictEqual(1);
        expect(newCommunityData.points.length).toStrictEqual(2);
    })

    it('Do not delete on error to sync points', async() => {
        mockAxios.get.mockResolvedValue({ data: mockReturnedMarkers });
        await savePoint(newPoint, userEmail, true);
        await savePoint(newPoint, userEmail, true);
        const communityData = await getCommunityData();
        expect(communityData.areas.length).toStrictEqual(1);
        expect(communityData.points.length).toStrictEqual(2);
        mockAxios.post.mockRejectedValue(new Error("Network Error"));
        await expect(syncCommunityData('some@email.com')).rejects.toThrow("Network Error");
        expect(mockAxios.post).toHaveBeenCalledTimes(1);
        const newCommunityData = await getCommunityData();
        expect(newCommunityData.areas.length).toStrictEqual(1);
        expect(newCommunityData.points.length).toStrictEqual(2);
    })
})