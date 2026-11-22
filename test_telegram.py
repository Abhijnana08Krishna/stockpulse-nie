
import requests

token = input("Enter your NEW Telegram bot token: ")
chat_id = input("Enter your Telegram Chat ID: ")

url = f"https://api.telegram.org/bot{token}/sendMessage"

message = "Stock Pulse test successful! Telegram alerts are working."

response = requests.post(
    url,
    data={
        "chat_id": chat_id,
        "text": message
    },
    timeout=20
)

data = response.json()

if data.get("ok"):
    print("Telegram message sent successfully!")
else:
    print("Telegram error:", data.get("description"))
