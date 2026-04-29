CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"full_name" varchar(255),
	"role" varchar(50) DEFAULT 'EMPLOYEE',
	"department" varchar(100),
	"is_active" boolean DEFAULT true,
	"last_login" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "warehouse_users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"current_task_id" varchar(50),
	"stats" jsonb NOT NULL,
	"performance_history" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"company" varchar(255),
	"main_branch" varchar(255) NOT NULL,
	"join_date" timestamp NOT NULL,
	"avatar_url" text,
	"address" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "customers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "customer_overviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"customer_id" uuid NOT NULL,
	"segment" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'Active' NOT NULL,
	"metrics" jsonb NOT NULL,
	"behavior" jsonb NOT NULL,
	"internal_notes" jsonb DEFAULT '[]'::jsonb,
	"recent_activity" jsonb DEFAULT '[]'::jsonb,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "inventory" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"sku" varchar(100) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"category" varchar(50) NOT NULL,
	"on_hand" integer DEFAULT 0 NOT NULL,
	"allocated" integer DEFAULT 0 NOT NULL,
	"available" integer DEFAULT 0 NOT NULL,
	"min_threshold" integer DEFAULT 5 NOT NULL,
	"zone" varchar(50) NOT NULL,
	"aisle" varchar(20),
	"rack" varchar(20),
	"bin" varchar(20),
	"dimensions" jsonb,
	"weight" jsonb,
	"status" varchar(50) DEFAULT 'IN_STOCK',
	"last_counted" timestamp,
	"supplier" varchar(255),
	"picked_by" jsonb DEFAULT '[]'::jsonb,
	"received_by_users" jsonb DEFAULT '[]'::jsonb,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "inventory_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "inbound_shipments" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"trailer_id" varchar(100) NOT NULL,
	"carrier" varchar(100) NOT NULL,
	"dock_door" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'PENDING' NOT NULL,
	"priority" varchar(50) DEFAULT 'ROUTINE' NOT NULL,
	"manifest" jsonb NOT NULL,
	"total_pallets" integer DEFAULT 0,
	"unloaded_pallets" integer DEFAULT 0,
	"eta" timestamp NOT NULL,
	"arrival_time" timestamp,
	"unload_start" timestamp,
	"unload_end" timestamp,
	"received_by" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "outbound_shipments" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"trailer_id" varchar(100) NOT NULL,
	"carrier" varchar(100) NOT NULL,
	"dock_door" varchar(50) NOT NULL,
	"status" varchar(50) DEFAULT 'STAGING' NOT NULL,
	"priority" varchar(50) DEFAULT 'ROUTINE' NOT NULL,
	"manifest" jsonb NOT NULL,
	"total_pallets" integer DEFAULT 0,
	"loaded_pallets" integer DEFAULT 0,
	"scheduled_departure" timestamp NOT NULL,
	"loading_started" timestamp,
	"actual_departure" timestamp,
	"user_id" uuid,
	"outbound_sid" varchar(100),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "logistics_orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_number" varchar(50) NOT NULL,
	"customer_name" varchar(255) NOT NULL,
	"status" varchar(20) DEFAULT 'PENDING' NOT NULL,
	"priority" varchar(20) DEFAULT 'NORMAL' NOT NULL,
	"items" jsonb NOT NULL,
	"date_created" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "logistics_orders_order_number_unique" UNIQUE("order_number")
);
--> statement-breakpoint
CREATE TABLE "logistics_metadata" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"assigned_picker_id" uuid,
	"assigned_packer_id" uuid,
	"box_size" varchar(50),
	"weight" numeric(10, 2),
	"carrier" varchar(100),
	"tracking_number" varchar(100),
	"seal_number" varchar(100),
	"trailer_number" varchar(100),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "logistics_alerts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"severity" varchar(20) NOT NULL,
	"category" varchar(20) NOT NULL,
	"message" text NOT NULL,
	"is_resolved" boolean DEFAULT false NOT NULL,
	"related_id" varchar(100),
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "complaint_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" varchar(50) NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	"sentiment_score" integer NOT NULL,
	"recent_feedback" text,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_feedback_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" varchar(50) NOT NULL,
	"total_complaints" integer DEFAULT 0,
	"resolved_count" integer DEFAULT 0,
	"avg_resolution_time" numeric(10, 2),
	"top_complaint_reason" varchar(255),
	"sentiment_trend" varchar(20) DEFAULT 'Stable',
	"report_date" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "report_summaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"revenue" jsonb NOT NULL,
	"inventory" jsonb NOT NULL,
	"returns" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "zentory_business_state" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	"active_storage_utilization" integer NOT NULL,
	"summary" jsonb NOT NULL,
	"insights" jsonb DEFAULT '[]'::jsonb
);
--> statement-breakpoint
ALTER TABLE "customer_overviews" ADD CONSTRAINT "customer_overviews_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inbound_shipments" ADD CONSTRAINT "inbound_shipments_received_by_users_id_fk" FOREIGN KEY ("received_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outbound_shipments" ADD CONSTRAINT "outbound_shipments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logistics_metadata" ADD CONSTRAINT "logistics_metadata_assigned_picker_id_users_id_fk" FOREIGN KEY ("assigned_picker_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "logistics_metadata" ADD CONSTRAINT "logistics_metadata_assigned_packer_id_users_id_fk" FOREIGN KEY ("assigned_packer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;