import { MigrationInterface, QueryRunner } from "typeorm";

export class userDevicesSchema1673440771477 implements MigrationInterface {
    name = 'userDevicesSchema1673440771477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_1e8ad179d72b17179a593556039"`);
        await queryRunner.query(`ALTER TABLE "devices" RENAME COLUMN "userId_id" TO "Id_id"`);
        await queryRunner.query(`ALTER TABLE "devices" RENAME COLUMN "Id_id" TO "userId_id"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "userId_id"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "Id_id" integer`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "userId_id" integer`);
        await queryRunner.query(`ALTER TABLE "devices" ALTER COLUMN "_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "devices__id_seq"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_a9cb6f6992443df96dea0f824d8" FOREIGN KEY ("Id_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_1e8ad179d72b17179a593556039" FOREIGN KEY ("userId_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_1e8ad179d72b17179a593556039"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_a9cb6f6992443df96dea0f824d8"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "devices__id_seq" OWNED BY "devices"."_id"`);
        await queryRunner.query(`ALTER TABLE "devices" ALTER COLUMN "_id" SET DEFAULT nextval('"devices__id_seq"')`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "userId_id"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "Id_id"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "userId_id" integer`);
        await queryRunner.query(`ALTER TABLE "devices" RENAME COLUMN "userId_id" TO "Id_id"`);
        await queryRunner.query(`ALTER TABLE "devices" RENAME COLUMN "Id_id" TO "userId_id"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_1e8ad179d72b17179a593556039" FOREIGN KEY ("userId_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
