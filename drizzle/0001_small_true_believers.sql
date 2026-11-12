CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`month` text NOT NULL,
	`amount` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `expenses` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`data` text NOT NULL
);
