import redis from '../lib/redis';
import { QueryCache } from './query';

//redis cache - sorted set, content format : c:LastName,_FirstName (composer) or w:WorkTitle (work)

export const getCache = async (
	query: string,
	page: number = 1
): Promise<QueryCache> => {
	const cacheResults: string[] = await redis.zrange(query, page - 1, -1, {
		rev: true,
	});

	return cacheResults.map((result) => {
		const [typeStr, id] = result.split(':');
		const type = typeStr as 'c' | 'w';
		return { type, id };
	});
};
