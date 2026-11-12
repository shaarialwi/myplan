import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const plans = sqliteTable('plans', {id:text('id').primaryKey(), owner:text('owner').notNull(), data:text('data').notNull()});
export const expenses=sqliteTable('expenses',{id:text('id').primaryKey(),owner:text('owner').notNull(),data:text('data').notNull()});
export const budgets=sqliteTable('budgets',{id:text('id').primaryKey(),owner:text('owner').notNull(),month:text('month').notNull(),amount:text('amount').notNull()});
