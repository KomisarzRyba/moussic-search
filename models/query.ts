import { z } from 'zod';

export const queryParams = z.object({
	q: z.string(),
	page: z.number().min(1).optional().default(1),
	prevCache: z
		.array(z.object({ type: z.enum(['c', 'w']), id: z.string() }))
		.optional()
		.nullable(),
});
export type QueryParams = z.infer<typeof queryParams>;

export const queryConfig = z.object({
	perPage: z.number().min(1).default(5),
});
export type QueryConfig = z.infer<typeof queryConfig>;

export const QueryCache = z.array(
	z.object({ type: z.enum(['c', 'w']), id: z.string() })
);
export type QueryCache = z.infer<typeof QueryCache>;

export const uniSearchResponse = z.object({
	cache: z.array(
		z.object({
			type: z.enum(['c', 'w']),
			id: z.string(),
		})
	),
	results: z.array(
		z.object({
			type: z.enum(['c', 'w']),
			id: z.string(),
		})
	),
});
export type UniQueryResponse = z.infer<typeof uniSearchResponse>;
