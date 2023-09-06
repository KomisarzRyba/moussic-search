import db from '../lib/db';

import { and, ilike, notInArray, or } from 'drizzle-orm';
import { QueryConfig, QueryParams } from './query';
import { composers } from './schema';

//single term query for now
export const query = async (
	params: QueryParams | (QueryParams & QueryConfig)
) => {
	const { q, page, prevCache } = params;
	const perPage = 'perPage' in params ? params.perPage : 5;
	const filter = prevCache?.map((c) => c.id) ?? [];
	const results = await db.query.composers.findMany({
		columns: { id: true },
		where: and(
			or(
				ilike(composers.lastName, `${q}%`),
				ilike(composers.firstName, `${q}%`)
			),
			filter.length >= 1 ? notInArray(composers.id, filter) : undefined
		),
		limit: perPage,
		offset: (page - 1) * perPage,
		// orderBy: (_, { desc }) =>
		// 	desc(sql`count(${composersRelations.table}.works})`),
	});
	return results;
};
