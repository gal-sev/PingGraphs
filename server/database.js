import path from 'path';
import sqlite3 from 'sqlite3';

const dbPath = path.join(process.cwd(), './pings.db');

// Open the DB
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
	if (err) return console.error(err.message);
});

// Create Table
export function createDBTable() {
	const createTable = `CREATE TABLE IF NOT EXISTS pings(
		id INTEGER PRIMARY KEY AUTOINCREMENT, 
		url TEXT NOT NULL, 
		date DATETIME NOT NULL, 
		pingTime INTEGER NOT NULL)`;
	db.run(createTable);
}

// Remove the table
export function dropTable() {
	db.run("DROP TABLE pings", (err) => {
		if (err) return console.error(err.message);
	});
}

const toSqlDatetime = (inputDate) => {
	const date = new Date(inputDate);
	const dateWithOffest = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
	return dateWithOffest.toISOString().slice(0, 19).replace('T', ' ');
}

// Insert data to the table
export function insertData(data) {
	data.forEach(pingData => {
		const insertString = `INSERT INTO pings(url, date, pingTime)
		VALUES (?, ?, ?)`;
		db.run(insertString,
			[pingData.url, pingData.date, pingData.pingTime],
			(err) => {
				if (err) return console.error(err.message);
			}
		);
	});
}

// Print the data from the table
export function printTable() {
	const getRows = `SELECT * FROM pings`;
	db.all(getRows, [], (err, rows) => {
		if (err) return console.error(err.message);
		rows.forEach(row => {
			console.log(row);
		});
	});
}

// Get the data from the table
export function getTableData() {
	return new Promise((resolve, reject) => {
		const getRows = `SELECT * FROM pings`;
		db.all(getRows, [], (err, rows) => {
			if (err) {
				reject({message: err.message});
			}
			resolve(rows);
		});
	});
}

// Clear the data from the table
export function clearTableData() {
	const clearTableData = `DELETE FROM pigns`;
	db.run(clearTableData, (err) => {
		if (err) return console.error(err.message);
	});
}



