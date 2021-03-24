import { Migration } from '@mikro-orm/migrations';

export class Migration20210324062855 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "custom_field_option" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "version" int4 not null default 1);');
    this.addSql('alter table "custom_field_option" add constraint "custom_field_option_pkey" primary key ("id");');

    this.addSql('create table "custom_block" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null default \'My New Block\', "relation_ids" text[] not null, "version" int4 not null default 1);');
    this.addSql('alter table "custom_block" add constraint "custom_block_pkey" primary key ("id");');

    this.addSql('create table "schema" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "view" jsonb not null, "parent_block_id" varchar(255) not null, "version" int4 not null default 1);');
    this.addSql('alter table "schema" add constraint "schema_pkey" primary key ("id");');
    this.addSql('alter table "schema" add constraint "schema_parent_block_id_unique" unique ("parent_block_id");');

    this.addSql('create table "custom_field" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "version" int4 not null default 1, "schema_id" varchar(255) not null, "permit_edit_by" int2 not null default 1, "type" int2 not null default 0, "field_option_id" varchar(255) not null);');
    this.addSql('alter table "custom_field" add constraint "custom_field_pkey" primary key ("id");');
    this.addSql('alter table "custom_field" add constraint "custom_field_field_option_id_unique" unique ("field_option_id");');

    this.addSql('alter table "schema" add constraint "schema_parent_block_id_foreign" foreign key ("parent_block_id") references "custom_block" ("id") on update cascade;');

    this.addSql('alter table "custom_field" add constraint "custom_field_schema_id_foreign" foreign key ("schema_id") references "schema" ("id") on update cascade;');
    this.addSql('alter table "custom_field" add constraint "custom_field_field_option_id_foreign" foreign key ("field_option_id") references "custom_field_option" ("id") on update cascade;');
  }

}
