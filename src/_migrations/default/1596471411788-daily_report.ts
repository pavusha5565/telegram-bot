import {MigrationInterface, QueryRunner} from "typeorm";

export class dailyReport1596471411788 implements MigrationInterface {
    name = 'dailyReport1596471411788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "daily_report" ("id" SERIAL NOT NULL, "yesterday" character varying, "today" character varying, "blockers" character varying, "creator_id" integer NOT NULL, "date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_6f51b9eb292151755dc3ade12b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "team" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD CONSTRAINT "FK_ac0ae30abf72a2a8a4a19bf84ce" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_report" DROP CONSTRAINT "FK_ac0ae30abf72a2a8a4a19bf84ce"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "team"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "daily_report"`);
    }

}
