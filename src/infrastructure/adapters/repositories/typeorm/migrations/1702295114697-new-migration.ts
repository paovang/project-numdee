import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1702295114697 implements MigrationInterface {
    name = 'NewMigration1702295114697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "phone" character varying(100), "email" character varying NOT NULL, "password" character varying NOT NULL, "notification_topic" character varying(100), "isActive" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "delete_at" TIMESTAMP, CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "UQ_db68a43ddfe450bb50bb23fc3ce" UNIQUE ("notification_topic"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" text, "type" character varying(50) NOT NULL, "display_name" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_user" ("user_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_0d02ac0493a7a8193048bbc7da5" PRIMARY KEY ("user_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5261e26da61ccaf8aeda8bca8e" ON "role_user" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_78ee37f2db349d230d502b1c7e" ON "role_user" ("role_id") `);
        await queryRunner.query(`CREATE TABLE "permission_role" ("role_id" integer NOT NULL, "permission_id" integer NOT NULL, CONSTRAINT "PK_559155e68c73c7b70d216b3e2e9" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_693f65986d1bd7b5bc973e30d7" ON "permission_role" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ea144050277434b1ec4a307061" ON "permission_role" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_5261e26da61ccaf8aeda8bca8ea" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_user" ADD CONSTRAINT "FK_78ee37f2db349d230d502b1c7ea" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_693f65986d1bd7b5bc973e30d76" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_role" ADD CONSTRAINT "FK_ea144050277434b1ec4a3070614" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_ea144050277434b1ec4a3070614"`);
        await queryRunner.query(`ALTER TABLE "permission_role" DROP CONSTRAINT "FK_693f65986d1bd7b5bc973e30d76"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_78ee37f2db349d230d502b1c7ea"`);
        await queryRunner.query(`ALTER TABLE "role_user" DROP CONSTRAINT "FK_5261e26da61ccaf8aeda8bca8ea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ea144050277434b1ec4a307061"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_693f65986d1bd7b5bc973e30d7"`);
        await queryRunner.query(`DROP TABLE "permission_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78ee37f2db349d230d502b1c7e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5261e26da61ccaf8aeda8bca8e"`);
        await queryRunner.query(`DROP TABLE "role_user"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
