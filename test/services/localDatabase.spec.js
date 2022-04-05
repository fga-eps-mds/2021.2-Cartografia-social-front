import * as localDatabase from '../../src/services/localDatabase';

describe('localDatabase', () => {
    it('check if can post a test object', async () => {
        expect(await localDatabase.getAll('test')).toStrictEqual([]);
        expect(await localDatabase.exists('test', 'test')).toStrictEqual(false);
        await localDatabase.post('test', { id: 'test' });
        expect(await localDatabase.get('test', 'test')).toStrictEqual({ id: 'test' });
        expect(await localDatabase.getAll('test')).toStrictEqual([{ id: 'test' }]);
        expect(await localDatabase.exists('test', 'test')).toStrictEqual(true);
        await localDatabase.post('test', { id: 'test2' });
        expect(await localDatabase.getAll('test')).toStrictEqual([{ id: 'test' }, { id: 'test2' }]);
        expect(await localDatabase.get('test', 'test2')).toStrictEqual({ id: 'test2' });
    });

    it('can put a exists entity', async () => {
        expect(await localDatabase.get('test', 'test')).toStrictEqual({ id: 'test' });
        await localDatabase.put('test', { id: 'test', name: 'test' });
        expect(await localDatabase.get('test', 'test')).toStrictEqual({ id: 'test', name: 'test' });
    })

    it('fails when post a duplicated entity id', async () => {
        await expect(localDatabase.post('test', { id: 'test' })).rejects.toThrow();
    })

    it('pass when put a duplicated entity id', async () => {
        await expect(localDatabase.put('test', { id: 'test', name: 'newName' })).resolves.toBeUndefined();
        expect(await localDatabase.get('test', 'test')).toStrictEqual({ id: 'test', name: 'newName' });
        expect(await localDatabase.exists('test', 'test')).toStrictEqual(true);
        expect(await localDatabase.get('test', 'test')).toStrictEqual({ id: 'test', name: 'newName' });
    })

    it('can delete a data entity', async () => {
        await localDatabase.remove('test', 'test');
        await localDatabase.remove('test', 'test2');
        expect(await localDatabase.getAll('test')).toStrictEqual([]);
        expect(await localDatabase.exists('test', 'test')).toStrictEqual(false);
        await expect(localDatabase.get('test', 'test')).resolves.toBeUndefined();
    })

    it('can get a data entity', async () => {
        await localDatabase.post('test', { id: 'test', name: 'newName' });
        expect(await localDatabase.get('test', 'test')).toStrictEqual({ id: 'test', name: 'newName' });
    })

    it('can get all data entities', async () => {
        await localDatabase.put('test', { id: 'test', name: 'newName' });
        await localDatabase.post('test', { id: 'test2', name: 'newName2' });
        expect(await localDatabase.getAll('test')).toStrictEqual([
            { id: 'test', name: 'newName' },
            { id: 'test2', name: 'newName2' },
        ]);
    })

    it('fails with a data without id', async () => {
        await expect(localDatabase.post('test', { name: 'newName' })).rejects.toThrow();
    })

    it('can put and delete n objects', async () => {
        const data = await localDatabase.getAll('test');
        expect(data).toHaveLength(2);
        await expect(localDatabase.remove('test', 'test')).resolves.toBeUndefined();
        await expect(localDatabase.remove('test', 'test2')).resolves.toBeUndefined();
        expect(await localDatabase.getAll('test')).toStrictEqual([]);
    })
})

