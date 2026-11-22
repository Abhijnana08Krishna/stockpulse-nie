
import requests
import time

token = input("Enter your NEW Telegram bot token: ")
chat_id = input("Enter your Telegram Chat ID: ")

components = {
    "LED": {"stock": 15, "minimum": 20},
    "Resistor": {"stock": 50, "minimum": 30}
}

alerted_items = set()

def send_telegram_alert(message):
    url = f"https://api.telegram.org/bot{token}/sendMessage"

    try:
        response = requests.post(
            url,
            data={"chat_id": chat_id, "text": message},
            timeout=20
        )
        data = response.json()

        if data.get("ok"):
            print("Telegram alert sent!")
            return True

        print("Telegram error:", data.get("description"))
        return False

    except requests.exceptions.RequestException as error:
        print("Connection error:", error)
        return False

while True:
    for name, item in components.items():
        stock = item["stock"]
        minimum = item["minimum"]

        print(f"{name}: {stock} items")

        if stock <= minimum and name not in alerted_items:
            message = (
                f"LOW STOCK ALERT!\n"
                f"Component: {name}\n"
                f"Current stock: {stock}\n"
                f"Minimum stock: {minimum}"
            )

            if send_telegram_alert(message):
                alerted_items.add(name)

        elif stock > minimum:
            alerted_items.discard(name)

    time.sleep(60)
