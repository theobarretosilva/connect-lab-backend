import { MigrationInterface, QueryRunner } from "typeorm";

export class userDevicesSchema1673384923764 implements MigrationInterface {
    name = 'userDevicesSchema1673384923764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" ADD "grouping" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP COLUMN "grouping"`);
    }

}
