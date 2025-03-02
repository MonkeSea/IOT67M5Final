import requests
import json

# Replace this with your server URL
SERVER_URL = "http://localhost:3000/update"

# Example data to send
station_data = [
    {"station": "Station 1", "pm25": 50},
    {"station": "Station 2", "pm25": 15},
    {"station": "Station 3", "pm25": 15},
]

# Function to update station data
def update_station_data(station):
    try:
        response = requests.post(SERVER_URL, json=station)
        if response.status_code == 200:
            print(f"Successfully updated: {station['station']}")
        else:
            print(f"Failed to update: {station['station']} (Status: {response.status_code})")
    except Exception as e:
        print(f"Error updating {station['station']}: {e}")

# Loop through the station data and send updates
for station in station_data:
    update_station_data(station)
