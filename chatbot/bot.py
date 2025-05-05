# chatbot/bot.py
from transformers import pipeline

chatbot = pipeline("text-generation", model="microsoft/DialoGPT-medium")

def get_bot_response(user_input):
    response = chatbot(user_input, max_length=100, pad_token_id=50256)
    return response[0]["generated_text"]
