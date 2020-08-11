import {MigrationInterface, QueryRunner} from "typeorm";

export class compliments1596326263516 implements MigrationInterface {
    name = 'compliments1596326263516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "compliments" ("id" SERIAL NOT NULL, "sex" character varying, "type" character varying, "text" character varying, "creator_id" integer, CONSTRAINT "PK_c54299c9e1656922eb0045c246e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "compliments" ADD CONSTRAINT "FK_694fdda938afb2c8748457e9755" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "compliments" DROP CONSTRAINT "FK_694fdda938afb2c8748457e9755"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`DROP TABLE "compliments"`);
    }

}
