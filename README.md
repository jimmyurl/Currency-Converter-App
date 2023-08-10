# Currency-Converter-App
This app is a simple currency converter built using React. Its purpose is to allow users to convert an amount from one currency to another based on the current exchange rate between the two currencies.

Here's how the app works:

1. The user can enter an amount to convert in the "Enter amount" field. The default value is set to 1.
2. The user can enter the source currency code in the "Enter source currency code" field. The default source currency code is "USD" (United States Dollar).
3. The user can enter the target currency code in the "Enter target currency code" field. The default target currency code is "TZS" (Tanzanian Shilling).
4. The app fetches the current exchange rate from an external API (https://free.currconv.com/api/v7/convert) using Axios, which provides real-time currency exchange data.
5. Whenever the source or target currency codes are changed, the app automatically fetches the corresponding exchange rate and updates the conversion accordingly.
6. The user can click the "Switch" button to swap the source and target currencies, making it easier to convert in both directions.
7. When the user clicks the "Convert" button, the app calculates the converted amount based on the entered amount, source currency, target currency, and the fetched exchange rate.
8. The converted amount is then displayed in the "Conversion Result" section, showing the converted amount and the target currency.

Overall, this app provides a user-friendly interface for converting currencies, and it dynamically updates the conversion as the user interacts with the input fields. It's a practical tool for anyone who needs to quickly convert amounts between different currencies. To decorate the app, I've added some styling from https://fonts.googleapis.com/css2?family=Poppins:wght@400;900&display=swap 
![exchange](https://github.com/jimmyurl/Currency-Converter-App/assets/33938444/2e0ef1fb-7098-45da-8405-0e92858b23f1)
