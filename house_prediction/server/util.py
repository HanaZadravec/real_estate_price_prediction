import json
import pickle
import os
import numpy as np

location = None
data_columns = None
model = None

def predict_house_price(location, sqft, bath, bhk):
    try:
        loc_index = data_columns.index(location.lower())
    except:
        loc_index = -1
    x = np.zeros(len(data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1
    return round(model.predict([x])[0], 2)
    

def get_location_names():
    return location

def load_saved_artifacts():
    print("loading saved artifacts...start")
    global location
    global data_columns
    global model  

    # Get absolute path of the current script (util.py)
    script_dir = os.path.dirname(__file__)  

    # Construct the absolute path to the artifacts folder
    artifacts_path = os.path.join(script_dir, "artifacts")

    # Load columns.json
    with open(os.path.join(artifacts_path, "columns.json"), "r") as f:
        data_columns = json.load(f)['data_columns']
        location = data_columns[3:]

    # Load trained model
    with open(os.path.join(artifacts_path, "house_prices_model.pickle"), "rb") as f:
        model = pickle.load(f)

    print("loading saved artifacts...done")

if __name__ == "__main__":
    load_saved_artifacts()
    print(get_location_names())
    print(predict_house_price("1st Phase JP Nagar", 1000, 2, 2))
    print(predict_house_price("1st Phase JP Nagar", 1000, 3, 3))
    
    