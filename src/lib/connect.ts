import { BaseDirectory, createDir, exists, writeFile } from "@tauri-apps/api/fs";
import { appConfigDir } from "@tauri-apps/api/path";
import SQLite from "tauri-plugin-sqlite-api";

const database = "database.db";
let db: SQLite;

export const initializeDatabase = async () => {
  try {
    let alreadyExists = true;
    if (!(await exists(database, {dir: BaseDirectory.AppConfig}))) {
      await writeFile(database, "", { dir: BaseDirectory.AppConfig });
      alreadyExists = false;
    }
  
    const url: string = (await appConfigDir()) + "/" + database;
    db = await SQLite.open(url);

    // Kalau belum ada, buat yang baru
    if (!alreadyExists) {
      await initializeTable();
      await initializeDefaultValues();
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const initializeTable = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      khotib TEXT NOT NULL DEFAULT 'KHOTIB',
      imam TEXT NOT NULL DEFAULT 'IMAM',
      muadzin TEXT NOT NULL DEFAULT 'MUADZIN',
      saldoAwal TEXT NOT NULL DEFAULT '0',
      plus TEXT NOT NULL DEFAULT '0',
      minus TEXT NOT NULL DEFAULT '0',
      saldoAkhir TEXT NOT NULL DEFAULT '0'
    );
    CREATE TABLE IF NOT EXISTS jws (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dAdz INTEGER NOT NULL DEFAULT 5,
      dSho INTEGER NOT NULL DEFAULT 20,
      dKhu INTEGER NOT NULL DEFAULT 30,
      dInf INTEGER NOT NULL DEFAULT 12,
      dJel INTEGER NOT NULL DEFAULT 10,
      iQis INTEGER NOT NULL DEFAULT 8,
      iQsu INTEGER NOT NULL DEFAULT 12,
      iQdz INTEGER NOT NULL DEFAULT 10,
      iQas INTEGER NOT NULL DEFAULT 8,
      iQma INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS masjid (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      logoT TEXT NULL,
      typeT TEXT NOT NULL DEFAULT 'Masjid',
      namaT TEXT NOT NULL DEFAULT 'Babul Gaffar',
      alamat TEXT NOT NULL DEFAULT 'Jl. Tamalaki, Kolaka, Sultra'
    );
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      useVid INTEGER DEFAULT 0,
      isLive INTEGER DEFAULT 0,
      backG TEXT NULL,
      backGV TEXT NULL,
      liveVid TEXT DEFAULT "moQtMet7F7w"
    );
    CREATE TABLE IF NOT EXISTS slideFile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NULL,
      slideImg TEXT NULL,
      colorText TEXT DEFAULT 'Putih',
      fontText TEXT DEFAULT 'Abel',
      typeText TEXT DEFAULT 'L1'
    );
    CREATE TABLE IF NOT EXISTS ontime (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      madz TEXT NOT NULL DEFAULT 'Shafi',
      meth TEXT NOT NULL DEFAULT 'Singapore',
      lati REAL NOT NULL DEFAULT -4.0629830,
      long REAL NOT NULL DEFAULT 121.6099516,
      ihti INTEGER NOT NULL DEFAULT 2,
      koIs INTEGER NOT NULL DEFAULT 0,
      koSu INTEGER NOT NULL DEFAULT 0,
      koDz INTEGER NOT NULL DEFAULT 0,
      koAs INTEGER NOT NULL DEFAULT 0,
      koMa INTEGER NOT NULL DEFAULT 0,
      koHj INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS display (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      theme TEXT NOT NULL DEFAULT 'Satu',
      themeWarna TEXT NOT NULL DEFAULT 'Satu',
      typeSlide TEXT NOT NULL DEFAULT 'Satu',
      styleTxt TEXT NOT NULL DEFAULT 'zoom',
      styleImg TEXT NOT NULL DEFAULT 'zoom',
      sizeJws TEXT NOT NULL DEFAULT 'Satu',
      spSlideJws TEXT NOT NULL DEFAULT 8,
      spSlideTxt TEXT NOT NULL DEFAULT 10,
      spSlideImg TEXT NOT NULL DEFAULT 10,
      spRuntext TEXT NOT NULL DEFAULT 200,
      spInfo TEXT NOT NULL DEFAULT 5
    );
    CREATE TABLE IF NOT EXISTS runningText (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      runText TEXT NOT NULL DEFAULT 'ASSALAMUALAIKUM'
    );
    CREATE TABLE IF NOT EXISTS slides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      arabText TEXT NOT NULL DEFAULT 'السلام عليكم',
      translateText TEXT NOT NULL DEFAULT 'Assalamualaikum',
      sumberText TEXT NOT NULL DEFAULT "Al-Qur'an"
    );
    CREATE TABLE IF NOT EXISTS audio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tartilIsya TEXT NULL,
      tartilSubuh TEXT NULL,
      tartilDzuhur TEXT NULL,
      tartilAshar TEXT NULL,
      tartilMaghrib TEXT NULL,
      tarhimIsya TEXT NULL,
      tarhimSubuh TEXT NULL,
      tarhimDzuhur TEXT NULL,
      tarhimAshar TEXT NULL,
      tarhimMaghrib TEXT NULL,
      adzanIsya TEXT NULL,
      adzanSubuh TEXT NULL,
      adzanDzuhur TEXT NULL,
      adzanAshar TEXT NULL,
      adzanMaghrib TEXT NULL,
      isTartil INTEGER DEFAULT 0,
      isTarhim INTEGER DEFAULT 0,
      isAdzan INTEGER DEFAULT 0
    );
    `);
};

const initializeDefaultValues = async () => {
  await db.execute(`
  INSERT INTO info DEFAULT VALUES;
  INSERT INTO jws DEFAULT VALUES;
  INSERT INTO masjid DEFAULT VALUES;
  INSERT INTO media DEFAULT VALUES;
  INSERT INTO slideFile DEFAULT VALUES;
  INSERT INTO ontime DEFAULT VALUES;
  INSERT INTO display DEFAULT VALUES;
  INSERT INTO runningText DEFAULT VALUES;
  INSERT INTO slides DEFAULT VALUES;
  INSERT INTO audio DEFAULT VALUES;
  `)
};

export const inputTable = async (sql: string, data: any) => {
  await db.execute(sql, data);
};

export const fetchData = async <T>(
  sql: string,
  values?: unknown[] | undefined
): Promise<T> => {
  return await db.select<T>(sql, values);
};
