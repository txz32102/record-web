from db.database_file import get_db_connection

class FileModel:

    @staticmethod
    def increment_view_count(file_path: str):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT views FROM views WHERE file_path = ?', (file_path,))
        result = cursor.fetchone()
        if result:
            views = result[0] + 1
            cursor.execute('UPDATE views SET views = ? WHERE file_path = ?', (views, file_path))
        else:
            views = 1
            cursor.execute('INSERT INTO views (file_path, views) VALUES (?, ?)', (file_path, views))
        conn.commit()
        conn.close()
        return views

    @staticmethod
    def get_view_count(file_path: str):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT views FROM views WHERE file_path = ?', (file_path,))
        result = cursor.fetchone()
        conn.close()
        return result[0] if result else 0
