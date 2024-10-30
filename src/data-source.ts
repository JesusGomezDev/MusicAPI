import { DataSource } from 'typeorm';

const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'admin',
    database: 'MusicDB',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: false,
    driver: require('mysql2'),
});

export default dataSource;