import sqlite3
import os

# Path to the SQLite database
BASEDIR = os.path.abspath(os.path.dirname(__file__))
DATABASE_PATH = '/root/home/record-web/backend/data.sqlite'

def create_connection(db_file):
    """Create a database connection to the SQLite database specified by db_file"""
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except sqlite3.Error as e:
        print(e)
    return conn

def list_tables():
    """List all tables in the database"""
    conn = create_connection(DATABASE_PATH)
    cur = conn.cursor()
    cur.execute("SELECT name FROM sqlite_master WHERE type='table';")

    tables = cur.fetchall()

    print("Tables in the database:")
    for table in tables:
        print(table[0])
    
    conn.close()

def get_all_records(table_name):
    """Query all rows in the specified table"""
    conn = create_connection(DATABASE_PATH)
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM {table_name}")

    rows = cur.fetchall()

    for row in rows:
        print(row)
    
    conn.close()

def get_last_n_records(table_name, n):
    """Query the last n rows in the specified table, ordered by id in descending order"""
    conn = create_connection(DATABASE_PATH)
    cur = conn.cursor()
    cur.execute(f"SELECT * FROM {table_name} ORDER BY id DESC LIMIT ?", (n,))

    rows = cur.fetchall()

    for row in rows:
        print(row)
    
    conn.close()

if __name__ == '__main__':
    list_tables()
    table_name = 'record'
    print("\nFetching all records:")
    get_all_records(table_name)
    
