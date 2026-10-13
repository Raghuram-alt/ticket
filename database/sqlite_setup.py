"""
Initializes the SQLite database from schema.sql and seed.sql
Run with: python sqlite_setup.py
"""

import os
import sqlite3

def init_db():
    db_path = os.path.join(os.path.dirname(__file__), "support_tickets.db")
    schema_path = os.path.join(os.path.dirname(__file__), "schema.sql")
    seed_path = os.path.join(os.path.dirname(__file__), "seed.sql")

    print(f"Initializing SQLite database at: {db_path}")

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    with open(schema_path, 'r', encoding='utf-8') as f:
        schema_sql = f.read()
        cursor.executescript(schema_sql)
    print("✓ Schema created successfully.")

    with open(seed_path, 'r', encoding='utf-8') as f:
        seed_sql = f.read()
        cursor.executescript(seed_sql)
    print("✓ Seed records inserted successfully.")

    cursor.execute("SELECT COUNT(*) FROM tickets")
    count = cursor.fetchone()[0]
    print(f"✓ Total tickets in database: {count}")

    conn.commit()
    conn.close()
    print("Database setup complete.")

if __name__ == "__main__":
    init_db()
