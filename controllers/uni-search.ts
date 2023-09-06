import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { initStream } from '../lib/stream-init';
import { getCache } from '../models/cache';
import {
	QueryConfig,
	QueryParams,
	UniQueryResponse,
	queryParams,
} from '../models/query';
import { query } from '../models/composers';

export const config: QueryConfig = {
	perPage: 5,
};

const uniSearchController = {
	post: async (req: Request, res: Response) => {
		const body = queryParams.parse(req.body);
		const { q, page } = body;
		let { prevCache } = body;
		try {
			initStream(res);
			// always get cache on the first page
			if (!page || page === 1) {
				prevCache = await getCache(q, page);
				const data: UniQueryResponse = {
					cache: prevCache,
					results: [],
				};

				// res.write('event: message\n');
				// res.write('data: ' + JSON.stringify(data));
				// res.write('\n\n');
				console.log(data);

				if (prevCache.length >= config.perPage) {
					closeStream(res);
					return res.status(200); //maybe not needed
				}
			}
			// fetch from db
			const results = await compoundQuery(body);
			console.log(results);

			closeStream(res);
		} catch (err) {
			console.error(err);
			if (err instanceof ZodError) {
				console.error(err);
				res.send(err.issues).status(400);
			} else {
				res.send((err as any).message).status(500);
			}
		}
	},
};

export default uniSearchController;

const closeStream = (res: Response) => {
	res.write('event: close\n');
	res.write('data: ' + JSON.stringify(Date.now()));
	res.write('\n\n');
};

//returns two promises of results from both composer and work queries
const compoundQuery = async (params: QueryParams) => {
	return Promise.all([query({ ...params, ...config })]);
};
