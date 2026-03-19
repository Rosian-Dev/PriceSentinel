# Price Sentinel — eBay API Server

## Setup (Windows)

### 1. Create a folder for the server
Make a folder somewhere easy, like:
```
C:\PriceSentinel\server\
```
Put both `server.js` and `package.json` inside it.

### 2. Open Command Prompt in that folder
- Navigate to the folder in File Explorer
- Click the address bar, type `cmd`, press Enter

### 3. Install dependencies
```
npm install
```
This downloads express, axios, cors, and xml2js into a `node_modules` folder.

### 4. Start the server
```
npm start
```
You should see:
```
✅ Price Sentinel server running on http://localhost:3001
```

### 5. Test it works
Open your browser and go to:
```
http://localhost:3001/listings
```
You should see a JSON list of all your active eBay listings.

### 6. Keep it running
Leave the Command Prompt window open while using Price Sentinel.
Run `npm start` again any time you restart your computer.

---

## Token Expiry
Your User Token expires every **2 hours**.
Your **Refresh Token** lasts 18 months and can auto-renew the User Token.
Token refresh automation can be added later if needed.
