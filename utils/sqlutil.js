import mysql from 'mysql2/promise';
import { dbConfig } from '../config/dbconfig.js';

export class SQLUtils {

    constructor() {
        this.connection = null;
    }

    async connect() {
        this.connection = await mysql.createConnection(dbConfig);
        console.log('Database connected');
    }

    async query(sql, params = []) {
        const [rows] = await this.connection.execute(sql, params);
        return rows;
    }

    async getSingleValue(sql, params = []) {
        const [rows] = await this.connection.execute(sql, params);

        if (rows.length === 0) {
            return null;
        }

        return Object.values(rows[0])[0];
    }

    async getRow(sql, params = []) {
        const [rows] = await this.connection.execute(sql, params);
        return rows[0] || null;
    }

    async getRows(sql, params = []) {
        const [rows] = await this.connection.execute(sql, params);
        return rows;
    }

    async close() {
        if (this.connection) {
            await this.connection.end();
            console.log('Database connection closed');
        }
    }
}