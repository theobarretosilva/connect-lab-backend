import { MigrationInterface, QueryRunner } from "typeorm";

export class userDevicesSchema1673441186317 implements MigrationInterface {
    name = 'userDevicesSchema1673441186317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "PK_06e54be2989de9043573759c83a"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "_id"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "PK_06e54be2989de9043573759c83a" PRIMARY KEY ("_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "PK_06e54be2989de9043573759c83a"`);
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "_id"`);
        await queryRunner.query(`ALTER TABLE "devices" ADD "_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "PK_06e54be2989de9043573759c83a" PRIMARY KEY ("_id")`);
    }

}
