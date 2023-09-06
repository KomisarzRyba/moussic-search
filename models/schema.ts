import { relations } from 'drizzle-orm';
import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const composers = pgTable('composers', {
	id: varchar('c_id', { length: 255 }).primaryKey(),
	lastName: varchar('last_name', { length: 127 }).notNull(),
	firstName: varchar('first_name', { length: 127 }),
});

export const composersRelations = relations(composers, ({ many }) => ({
	works: many(works, {
		relationName: 'works',
	}),
}));

export const works = pgTable('works', {
	id: uuid('w_id').defaultRandom().primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	composerId: varchar('c_id')
		.notNull()
		.references(() => composers.id),
	imslp_id: integer('imslp_id'),
});

export const worksRelations = relations(works, ({ one }) => ({
	composer: one(composers, {
		fields: [works.composerId],
		references: [composers.id],
		relationName: 'composer',
	}),
}));
