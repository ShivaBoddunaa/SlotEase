import sqlite3
import mysql.connector
import os

_DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'local_slotease.sqlite')

class MockCursor:
    def __init__(self, conn, dictionary=False):
        self.conn = conn
        self.cursor = conn.cursor()
        self.dictionary = dictionary

    def execute(self, query, params=()):
        import re
        new_query = query.replace('%s', '?').replace('NOW()', "datetime('now', 'localtime')")
        # MySQL: INT AUTO_INCREMENT PRIMARY KEY → SQLite: INTEGER PRIMARY KEY AUTOINCREMENT
        new_query = re.sub(r'INT\s+AUTO_INCREMENT\s+PRIMARY KEY', 'INTEGER PRIMARY KEY AUTOINCREMENT', new_query, flags=re.IGNORECASE)
        # Remaining AUTO_INCREMENT usages
        new_query = new_query.replace('AUTO_INCREMENT', 'AUTOINCREMENT')
        new_query = new_query.replace('TINYINT(1)', 'INTEGER')
        new_query = new_query.replace('DATETIME', 'TEXT')
        new_query = re.sub(r'VARCHAR\(\d+\)', 'TEXT', new_query)
        if "CREATE DATABASE" in new_query:
            return
        try:
            self.cursor.execute(new_query, params)
        except Exception as e:
            print("SQL Error:", e, "Query:", new_query, "Params:", params)
            raise e

    def fetchall(self):
        rows = self.cursor.fetchall()
        if not rows: return []
        if self.dictionary:
            cols = [desc[0] for desc in self.cursor.description]
            return [dict(zip(cols, row)) for row in rows]
        return rows

    def fetchone(self):
        row = self.cursor.fetchone()
        if not row: return None
        if self.dictionary:
            cols = [desc[0] for desc in self.cursor.description]
            return dict(zip(cols, row))
        return row

class MockConnection:
    def __init__(self, **kwargs):
        self.conn = sqlite3.connect(_DB_PATH, check_same_thread=False)

    def cursor(self, dictionary=False, buffered=False):
        return MockCursor(self.conn, dictionary)

    def commit(self):
        self.conn.commit()

    def close(self):
        self.conn.close()

mysql.connector.connect = lambda **kwargs: MockConnection(**kwargs)
