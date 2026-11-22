
import requests

token = input("Enter your Telegram bot token: ")

url = f"https://api.telegram.org/bot{token}/getUpdates"

try:
    response = requests.get(url, timeout=20)
    data = response.json()

    if not data.get("ok"):
        print("Telegram API error:", data.get("description", "Unknown error"))

    else:
        results = data.get("result", [])

        if results:
            chat_id = results[-1]["message"]["chat"]["id"]
            print("Your Chat ID is:", chat_id)
        else:
            print("No messages found.")
            print("Open your bot in Telegram and send /start.")

except requests.exceptions.RequestException as error:
    print("Connection error:", error)
except ValueError:
    print("Telegram returned an invalid response.")
