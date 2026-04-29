CREATE TABLE "product_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sku" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"category" varchar(100),
	"units_sold" integer DEFAULT 0,
	"revenue" numeric(12, 2),
	"cog" numeric(12, 2),
	"gross_profit" numeric(12, 2),
	"margin_percent" numeric(5, 2),
	"return_rate" numeric(5, 2),
	"velocity" integer,
	"recommendation" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "report_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"data_source" varchar(50) NOT NULL,
	"time_frame" varchar(20) NOT NULL,
	"visual_type" varchar(20) NOT NULL,
	"metrics" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now()
);
