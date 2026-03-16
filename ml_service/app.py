import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
from datetime import datetime
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the trained model
MODEL_PATH = os.path.join('data', 'delivery_eta_model.pkl')

def mock_prediction(data):
    """Fallback mock prediction logic based on Kaggle dataset features"""
    # Simple heuristic: distance-based + ratings/age impact
    # Lat/Long difference
    lat_diff = abs(float(data.get('restaurantLatitude', 0)) - float(data.get('deliveryLocationLatitude', 0)))
    lon_diff = abs(float(data.get('restaurantLongitude', 0)) - float(data.get('deliveryLocationLongitude', 0)))
    distance = (lat_diff**2 + lon_diff**2)**0.5 * 111 # rough km conversion
    
    base_time = 15 + (distance * 5) # 15 min base + 5 min per km
    
    # Rating impact
    rating = float(data.get('deliveryPersonRatings', 4.5))
    rating_factor = (5 - rating) * 2 # Lower rating adds time
    
    # Traffic impact (if handled in data)
    traffic = data.get('roadTrafficDensity', 'Low')
    traffic_map = {'Low': 0, 'Medium': 5, 'High': 10, 'Jam': 20}
    traffic_time = traffic_map.get(traffic, 0)
    
    predicted_eta = base_time + rating_factor + traffic_time
    return round(max(10, predicted_eta))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
            # Prepare features for the model
            # This depends on how the model was trained. 
            # For hackathon, we might want a simple fallback or a small pre-trained weights file.
            # Assuming data matches Kaggle features
            # features = ...
            # prediction = model.predict(features)
            # predicted_eta = prediction[0]
            predicted_eta = mock_prediction(data) # Simplified for now ??$$$
        else:
            predicted_eta = mock_prediction(data)
            
        return jsonify({'predicted_eta': predicted_eta})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
