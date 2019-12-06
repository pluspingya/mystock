# MyStock App
A simple web app that allows a user to manage a fake stock portfolio and a cash balance. 

Basic functionality:
- Add or remove amounts to their cash balance, which is then used for buying shares.
- Execute “buy” or “sell” orders for a quantity of stock. For example, the user may wish to buy 3 GOOG shares. The amount of shares times the current price-per-share would then be deducted from their cash balance.
- Current cash and share holdings should be visible to the user.
- Give the user a live quote as they type a ticker
- Net total asset value based on current stock prices

The stock prices uses real data from a free (but limited)service (AlphaVantage API).

The application persist state across web page refreshes. However, there's no database implemented.

## To install
Make sure you have `node.js` and `npm` installed.

Extract a zip file or clone [this repository](https://github.com/pluspingya/mystock), and use the terminal to enter a project folder using following commands
```
cd ./mystock
npm install
npm install --prefix client
```

## To deploy or run the app
```
npm start
```
This runs the server and serves react-app from `/client/build` folder.

## To develop
```
npm run dev
```
This will run both server and client application using `concurrently`. It also support auto-refresh on code changes.

## To build
```
npm run build
```
This will clean up `/client/build/` folder, install dependencies (react-scripts) for the client project, build the react app into `/client/build/` folder.

