# chatbot/logic.py
from transformers import pipeline

# Load DialoGPT model
casual_bot = pipeline("text-generation", model="microsoft/DialoGPT-medium")

# Simple room recommendation data (You can replace this with a DB or ML model)
room_data = {
    "CSE 101": "Room 713",
    "CSE 201": "Room 714",
    "CSE 320": "Room 702",
    "CSE 402": "7th floor Lab 4",
    "CSE 405": "Room 414",
    "computer science faculty room": "7th floor Room 701",
    "CSE 222": "Rh 5th floor Room 507",
    "CSE 410": "7th floor Lab 5",

}

def is_room_query(message):
    for keyword in room_data:
        if keyword.lower() in message.lower():
            return True
    return False

def get_room_recommendation(message):
    for keyword, room in room_data.items():
        if keyword.lower() in message.lower():
            return f"You can go to **{room}** for {keyword.title()}."
    return "Sorry, I couldn’t find a room for that subject."

def get_bot_reply(message):
    if is_room_query(message):
        return get_room_recommendation(message)
    else:
        # Casual chat
        response = casual_bot(message, max_length=100, pad_token_id=50256)
        return response[0]['generated_text']
