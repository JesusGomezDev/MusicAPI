import { MigrationInterface, QueryRunner } from "typeorm";

export class ApiKeyTableMigration1730257627854 implements MigrationInterface {
    name = 'ApiKeyTableMigration1730257627854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`api_key\` (
                \`id\` INT AUTO_INCREMENT NOT NULL,
                \`user\` VARCHAR(512) NOT NULL,
                \`email\` VARCHAR(512) NOT NULL,
                \`project\` VARCHAR(1024) NOT NULL,
                \`api_key\` VARCHAR(512) NOT NULL,
                PRIMARY KEY (\`id\`)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE \`api_key\`
        `);
    }

}
