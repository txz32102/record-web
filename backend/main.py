from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model definition
class Record(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String, nullable=False)
    time = db.Column(db.String, nullable=False)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/server', methods=['POST'])
def handle_data():
    try:
        data = request.json
        print(data)
        # Get the current server time in the specified format
        current_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        # Create a new record with the provided data and the current server time
        new_record = Record(data=data['data'], time=current_time)
        db.session.add(new_record)
        db.session.commit()
        return jsonify({"success": True, "message": "Data and time stored successfully!"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": "An error occurred: " + str(e)}), 500

@app.route('/records', methods=['GET'])
def get_records():
    try:
        # Fetch the last ten records from the database, ordered by id in descending order
        records = Record.query.order_by(Record.id.desc()).limit(10).all()
        # Transform the records into a JSON-serializable format
        records_list = [{"id": record.id, "data": record.data, "time": record.time} for record in records]
        return jsonify(records_list), 200
    except Exception as e:
        return jsonify({"error": "An error occurred: " + str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9001)
