import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const port = process.env.DB_PORT as number | undefined;

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: port,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	// caminho para as entidades
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	// caminho para as migrations
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});