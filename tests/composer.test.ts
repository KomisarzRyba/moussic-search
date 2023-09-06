import { query } from '../models/composers';

describe('composer', () => {
	test('env', () => {
		expect(process.env.SUPABASE_URL).toBeDefined();
		expect(process.env.SUPABASE_KEY).toBeDefined();
	});
	// test('supabase', async () => {
	// 	const res = await query('bach', { perPage: 1 });
	// 	console.log(res);
	// 	expect(res).toBeDefined();
	// });
});
