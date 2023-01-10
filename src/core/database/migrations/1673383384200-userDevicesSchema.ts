import { MigrationInterface, QueryRunner } from "typeorm";

export class userDevicesSchema1673383384200 implements MigrationInterface {
    name = 'userDevicesSchema1673383384200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "devices" ("_id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "madeBy" character varying NOT NULL, "isOn" boolean NOT NULL, "info" character varying NOT NULL, "ipAddress" character varying NOT NULL, "macAddress" character varying NOT NULL, "local" character varying NOT NULL, "userId_id" integer, CONSTRAINT "PK_06e54be2989de9043573759c83a" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "devices" ADD CONSTRAINT "FK_1e8ad179d72b17179a593556039" FOREIGN KEY ("userId_id") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "devices" DROP CONSTRAINT "FK_1e8ad179d72b17179a593556039"`);
        await queryRunner.query(`DROP TABLE "devices"`);
    }

}
