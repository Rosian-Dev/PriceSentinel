const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const selfsigned = require("selfsigned");
const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(express.static(__dirname));
app.use(express.json());

// ── Your eBay Production Credentials ─────────────────────────────────────────
const EBAY_APP_ID   = "IanDosSa-PriceSen-PRD-1bf29ee92-4939b638";
const EBAY_DEV_ID   = "84e88242-23c4-4206-b0a9-fb0f486d474c";
const EBAY_CERT_ID  = "PRD-bf29ee92269b-aebf-4099-a41d-86c9";
const NGROK_URL     = "https://transnationally-hardheaded-karon.ngrok-free.dev";
const RUNAME        = "Ian_Dos_Santos-IanDosSa-PriceS-gdtznczw";
const TOKEN_FILE    = path.join(__dirname, "tokens.json");
const CACHE_FILE    = path.join(__dirname, "competitor-cache.json");

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE));
      console.log(`✅ Loaded competitor cache (${Object.keys(data).length} listings)`);
      return data;
    }
  } catch(_) {}
  return {};
}

function saveCache(results) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(competitorCache, null, 2));
  console.log(`💾 Competitor cache saved (${Object.keys(competitorCache).length} listings)`);
}

function isCacheValid(entry) {
  if (!entry || entry.error) return false;
  return entry.cachedAt && (Date.now() - entry.cachedAt) < CACHE_TTL_MS;
}

// ── Token storage ─────────────────────────────────────────────────────────────
function loadTokens() {
  try {
    if (fs.existsSync(TOKEN_FILE)) return JSON.parse(fs.readFileSync(TOKEN_FILE));
  } catch(_) {}
  return { userToken: "", refreshToken: "", expiresAt: 0 };
}
function saveTokens(data) {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(data, null, 2));
}
let tokens = loadTokens();

// ── In-memory competitor cache (populated by bulk scan) ───────────────────────
let competitorCache = loadCache(); // persists across restarts, refreshes daily

// ── Auto token refresh ────────────────────────────────────────────────────────
async function getValidToken() {
  // If token is still valid (with 5min buffer), use it
  if (tokens.userToken && Date.now() < tokens.expiresAt - 300000) {
    return tokens.userToken;
  }
  console.log("🔄 Token expired, attempting refresh...");
  // Refresh using refresh token
  if (tokens.refreshToken) {
    try {
      const creds = Buffer.from(`${EBAY_APP_ID}:${EBAY_CERT_ID}`).toString("base64");
      const resp = await axios.post(
        "https://api.ebay.com/identity/v1/oauth2/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: tokens.refreshToken,
          scope: "https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly",
        }).toString(),
        { headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${creds}` } }
      );
      tokens.userToken = resp.data.access_token;
      tokens.expiresAt = Date.now() + resp.data.expires_in * 1000;
      saveTokens(tokens);
      console.log("✅ Token refreshed automatically");
      return tokens.userToken;
    } catch(err) {
      console.error("Token refresh failed:", err.response?.data || err.message);
    }
  }
  // Fall back to hardcoded token
  return tokens.userToken || USER_TOKEN_FALLBACK;
}

// ── OAuth callback to capture refresh token ───────────────────────────────────
app.get("/oauth-callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.send("No code received.");
  try {
    const creds = Buffer.from(`${EBAY_APP_ID}:${EBAY_CERT_ID}`).toString("base64");
    const resp = await axios.post(
      "https://api.ebay.com/identity/v1/oauth2/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: RUNAME,
      }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${creds}` } }
    );
    tokens.userToken = resp.data.access_token;
    tokens.refreshToken = resp.data.refresh_token;
    tokens.expiresAt = Date.now() + resp.data.expires_in * 1000;
    saveTokens(tokens);
    console.log("✅ Refresh token captured and saved!");
    res.send("<h2>✅ Success! Token saved. You can close this tab and go back to Price Sentinel.</h2>");
  } catch(err) {
    console.error("OAuth callback error:", err.response?.data || err.message);
    res.send("<h2>❌ Error capturing token. Check server console.</h2>");
  }
});

// ── OAuth login URL ───────────────────────────────────────────────────────────
app.get("/oauth-login", (req, res) => {
  const scopes = encodeURIComponent([
    "https://api.ebay.com/oauth/api_scope",
    "https://api.ebay.com/oauth/api_scope/sell.marketing.readonly",
    "https://api.ebay.com/oauth/api_scope/sell.inventory.readonly",
    "https://api.ebay.com/oauth/api_scope/sell.account.readonly",
    "https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly",
    "https://api.ebay.com/oauth/api_scope/sell.inventory",
  ].join(" "));
  const url = `https://auth.ebay.com/oauth2/authorize?client_id=${EBAY_APP_ID}&response_type=code&redirect_uri=${encodeURIComponent(RUNAME)}&scope=${scopes}`;
  res.redirect(url);
});

let USER_TOKEN_FALLBACK = "v^1.1#i^1#r^0#f^0#I^3#p^3#t^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";

// ── eBay Trading API call helper ──────────────────────────────────────────────
async function ebayTradingCall(callName, xmlBody) {
  const response = await axios.post(
    "https://api.ebay.com/ws/api.dll",
    xmlBody,
    {
      headers: {
        "X-EBAY-API-CALL-NAME":            callName,
        "X-EBAY-API-SITEID":               "0",
        "X-EBAY-API-COMPATIBILITY-LEVEL":  "967",
        "X-EBAY-API-APP-NAME":             EBAY_APP_ID,
        "X-EBAY-API-DEV-NAME":             EBAY_DEV_ID,
        "X-EBAY-API-CERT-NAME":            EBAY_CERT_ID,
        "Content-Type":                    "text/xml",
      },
    }
  );
  return response.data;
}

// ── Parse XML to JS object ────────────────────────────────────────────────────
async function parseXml(xml) {
  return xml2js.parseStringPromise(xml, { explicitArray: false });
}

// ── GET /listings — fetch all active listings ─────────────────────────────────
app.get("/listings", async (req, res) => {
  try {
    let allItems = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const xml = `<?xml version="1.0" encoding="utf-8"?>
      <GetMyeBaySellingRequest xmlns="urn:ebay:apis:eBLBaseComponents">
        <RequesterCredentials>
          <eBayAuthToken>${await getValidToken()}</eBayAuthToken>
        </RequesterCredentials>
        <ActiveList>
          <Include>true</Include>
          <Sort>TimeLeft</Sort>
          <Pagination>
            <EntriesPerPage>200</EntriesPerPage>
            <PageNumber>${page}</PageNumber>
          </Pagination>
        </ActiveList>
        <DetailLevel>ReturnAll</DetailLevel>
      </GetMyeBaySellingRequest>`;

      const rawXml = await ebayTradingCall("GetMyeBaySelling", xml);
      const parsed = await parseXml(rawXml);
      const resp   = parsed.GetMyeBaySellingResponse;

      // Check for errors
      if (resp.Ack === "Failure") {
        const errMsg = resp.Errors?.ShortMessage || "Unknown eBay API error";
        return res.status(400).json({ error: errMsg });
      }

      const activeList = resp.ActiveList;
      if (!activeList || !activeList.ItemArray) break;

      // Normalize to array (single item comes back as object)
      const items = Array.isArray(activeList.ItemArray.Item)
        ? activeList.ItemArray.Item
        : [activeList.ItemArray.Item];

      // Map to the shape Price Sentinel expects
      const mapped = items.map((item) => ({
        itemId:   item.ItemID,
        title:    item.Title,
        price:    parseFloat(item.BuyItNowPrice?._ || item.SellingStatus?.CurrentPrice?._ || 0),
        qty:      item.Quantity || "1",
        condition: item.ConditionDisplayName || "Ungraded",
        category: item.PrimaryCategory?.CategoryName || "",
        watchers: parseInt(item.WatchCount || "0", 10),
        sold:     parseInt(item.SellingStatus?.QuantitySold || "0", 10),
      }));

      allItems = allItems.concat(mapped);

      // Check if more pages
      const pagination = activeList.PaginationResult;
      const totalPages = parseInt(pagination?.TotalNumberOfPages || "1", 10);
      hasMore = page < totalPages;
      page++;
    }

    cachedListings = allItems;
    res.json(allItems);
  } catch (err) {
    console.error("Error fetching listings:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /debug?title=... — show raw Browse API response for a listing ─────────
app.get("/debug", async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "title required" });
  try {
    const appToken = await getAppToken();
    const response = await axios.get("https://api.ebay.com/buy/browse/v1/item_summary/search", {
      params: { q: title, filter: "buyingOptions:{FIXED_PRICE}", sort: "price", limit: 50 },
      headers: { Authorization: `Bearer ${appToken}`, "X-EBAY-C-MARKETPLACE-ID": "EBAY_US", "X-EBAY-C-ENDUSERCTX": "contextualLocation=country%3DUS%2Czip%3D92683" }
    });
    const items = (response.data?.itemSummaries || []).map(item => ({
      title: item.title,
      itemId: item.itemId,
      seller: item.seller?.username,
      price: item.price,
      shippingOptions: item.shippingOptions,
      buyingOptions: item.buyingOptions,
    }));
    res.json({ query: title, count: items.length, items });
  } catch(err) {
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ── POST /listings/reprice — set a listing price to competitor minus 1 cent ──
app.post("/listings/reprice", async (req, res) => {
  const { itemId, newPrice } = req.body;
  if (!itemId || !newPrice) return res.status(400).json({ error: "itemId and newPrice required" });
  try {
    const token = await getValidToken();
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<ReviseItemRequest xmlns="urn:ebay:apis:eBLBaseComponents">
  <RequesterCredentials><eBayAuthToken>${token}</eBayAuthToken></RequesterCredentials>
  <Item>
    <ItemID>${itemId}</ItemID>
    <StartPrice>${Number(newPrice).toFixed(2)}</StartPrice>
  </Item>
</ReviseItemRequest>`;
    const resp = await axios.post("https://api.ebay.com/ws/api.dll", xml, {
      headers: {
        "X-EBAY-API-SITEID": "0",
        "X-EBAY-API-COMPATIBILITY-LEVEL": "967",
        "X-EBAY-API-CALL-NAME": "ReviseItem",
        "Content-Type": "text/xml",
      }
    });
    const parsed = await xml2js.parseStringPromise(resp.data, { explicitArray: true });
    const ack = parsed?.ReviseItemResponse?.Ack?.[0];
    if (ack === "Success" || ack === "Warning") {
      console.log(`✅ Repriced ${itemId} to $${Number(newPrice).toFixed(2)}`);
      res.json({ success: true, newPrice: Number(newPrice).toFixed(2) });
    } else {
      const errors = parsed?.ReviseItemResponse?.Errors?.[0]?.LongMessage?.[0] || "Unknown error";
      console.error(`❌ Reprice failed for ${itemId}:`, errors);
      res.status(500).json({ error: errors });
    }
  } catch(err) {
    console.error("Reprice error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /competitors/refresh — force rescan a single listing ─────────────────
app.get("/competitors/refresh", async (req, res) => {
  const { itemId, title } = req.query;
  if (!itemId || !title) return res.status(400).json({ error: "itemId and title required" });
  try {
    // Fetch live price from eBay first
    let myPrice = parseFloat(req.query.price) || 0;
    try {
      const token = await getValidToken();
      const liveResp = await axios.post("https://api.ebay.com/ws/api.dll", `<?xml version="1.0" encoding="utf-8"?><GetItemRequest xmlns="urn:ebay:apis:eBLBaseComponents"><RequesterCredentials><eBayAuthToken>${token}</eBayAuthToken></RequesterCredentials><ItemID>${itemId}</ItemID><DetailLevel>ReturnAll</DetailLevel></GetItemRequest>`,
        { headers: { "X-EBAY-API-SITEID":"0","X-EBAY-API-COMPATIBILITY-LEVEL":"967","X-EBAY-API-CALL-NAME":"GetItem","Content-Type":"text/xml" } }
      );
      const parsed = await xml2js.parseStringPromise(liveResp.data, { explicitArray: true });
      const livePrice = parseFloat(parsed?.GetItemResponse?.Item?.[0]?.StartPrice?.[0]?._ || parsed?.GetItemResponse?.Item?.[0]?.StartPrice?.[0] || myPrice);
      if (livePrice > 0) myPrice = livePrice;
    } catch(priceErr) {
      console.log("Could not fetch live price, using cached:", priceErr.message);
    }
    const { lowestPrice, lowestItemPrice, lowestShipping, lowestItemId, lowestSeller, undercut } = await searchCompetitors(title, itemId, myPrice);
    const result = { itemId, lowestPrice, lowestItemPrice, lowestShipping, lowestItemId, lowestSeller, undercut, myPrice, cachedAt: Date.now() };
    competitorCache[itemId] = result;
    saveCache(competitorCache);
    const compStr = lowestPrice != null ? "$" + lowestPrice.toFixed(2) + (undercut ? " ⚠ UNDERCUT" : " ✓") : "no comp";
    console.log(`🔄 Refreshed: ${title.substring(0,45)} | my $${myPrice.toFixed(2)} vs ${compStr}`);
    res.json(result);
  } catch(err) {
    console.error("Refresh error:", err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
});

// ── GET /competitors?title=...&price=...&itemId=... ───────────────────────────
// Returns cached result from last bulk scan (no live API call)
app.get("/competitors", (req, res) => {
  const { itemId, price } = req.query;
  if (!itemId) return res.status(400).json({ error: "itemId required" });

  const cached = competitorCache[itemId];
  if (cached) {
    // Recalculate undercut with current price if provided
    const myPrice = parseFloat(price) || cached.myPrice;
    return res.json({ ...cached, myPrice, undercut: cached.lowestPrice !== null && myPrice > cached.lowestPrice });
  }

  res.json({ itemId, lowestPrice: null, lowestItemId: null, lowestSeller: null, undercut: false, myPrice: parseFloat(price) || 0, cached: false });
});


// ── Extract plain numeric eBay item ID from Browse API format (v1|123|456 -> 123)
function extractItemId(browseItemId) {
  if (!browseItemId) return null;
  if (browseItemId.includes("|")) return browseItemId.split("|")[1];
  return browseItemId;
}

// ── Browse API search helper ──────────────────────────────────────────────────
async function searchCompetitors(title, myItemId, myPrice) {
  const appToken = await getAppToken();
  const response = await axios.get("https://api.ebay.com/buy/browse/v1/item_summary/search", {
    params: {
      q: title,
      filter: "buyingOptions:{FIXED_PRICE}",
      sort: "price",
      limit: 50,
    },
    headers: {
      Authorization: `Bearer ${appToken}`,
      "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
        "X-EBAY-C-ENDUSERCTX": "contextualLocation=country%3DUS%2Czip%3D92683",
    }
  });

  const items = response.data?.itemSummaries || [];
  let lowestPrice = null, lowestItemPrice = null, lowestShipping = null, lowestItemId = null, lowestSeller = null;

  for (const item of items) {
    // Skip ALL variation listings (v1|itemId|variationId where variationId is non-zero)
    const rawId = item.itemId || "";
    const parts = rawId.split("|");
    if (parts.length === 3 && parts[2] !== "0") continue;
    const cleanId = extractItemId(rawId);
    if (cleanId === myItemId) continue;
    const seller = item.seller?.username || "";
    if (seller.toLowerCase() === "rosiansells") continue;

    // Holo/non-holo mismatch filtering
    const compTitle = (item.title || "").toLowerCase();
    const myTitleLower = title.toLowerCase();
    const isNonHoloTitle = t => t.includes("non-holo") || t.includes("non holo") || /\bnon\b/.test(t) && t.includes("holo");
    const isHoloTitle = t => t.includes("holo") && !isNonHoloTitle(t);
    const myIsHolo = isHoloTitle(myTitleLower);
    const myIsNonHolo = isNonHoloTitle(myTitleLower);
    const compIsHolo = isHoloTitle(compTitle);
    const compIsNonHolo = isNonHoloTitle(compTitle);
    // Only filter if there's an explicit conflict
    if (myIsHolo && compIsNonHolo) continue;
    if (myIsNonHolo && compIsHolo) continue;
    // Don't filter if my listing doesn't mention holo at all - could still be holo

    const price = parseFloat(item.price?.value || "0");
    const shippingOption = item.shippingOptions?.[0];
    // Skip calculated shipping — we can't know the true total price
    if (shippingOption?.shippingCostType === "CALCULATED") continue;
    const shippingRaw = shippingOption?.shippingCost?.value;
    const shipping = shippingRaw != null ? parseFloat(shippingRaw) : 0;
    const total = price + shipping;

    if (lowestPrice === null || total < lowestPrice) {
      lowestPrice = total;
      lowestItemPrice = price;
      lowestShipping = shipping;
      lowestItemId = extractItemId(item.itemId);
      lowestSeller = seller;
    }
  }

  const undercut = lowestPrice !== null && myPrice > lowestPrice;
  return { lowestPrice, lowestItemPrice, lowestShipping, lowestItemId, lowestSeller, undercut };
}

// ── App token for Browse API (client credentials, no user needed) ─────────────
let appToken = null;
let appTokenExpiry = 0;
async function getAppToken() {
  if (appToken && Date.now() < appTokenExpiry - 60000) return appToken;
  const creds = Buffer.from(`${EBAY_APP_ID}:${EBAY_CERT_ID}`).toString("base64");
  const resp = await axios.post(
    "https://api.ebay.com/identity/v1/oauth2/token",
    new URLSearchParams({ grant_type: "client_credentials", scope: "https://api.ebay.com/oauth/api_scope" }).toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded", Authorization: `Basic ${creds}` } }
  );
  appToken = resp.data.access_token;
  appTokenExpiry = Date.now() + resp.data.expires_in * 1000;
  console.log("✅ Browse API app token obtained");
  return appToken;
}

// ── runBulkScan — shared bulk scan logic ────────────────────────────────────
async function runBulkScan(listings) {
  if (scanInProgress) {
    console.log("⚠ Scan already in progress, skipping.");
    return [];
  }
  scanInProgress = true;
  const delay = (ms) => new Promise(r => setTimeout(r, ms));
  const results = [];
  const scanTime = new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});
  console.log(`🔍 Bulk scan: ${listings.length} listings... [${scanTime}]`);
  let scanCount = 0;
  for (const listing of listings) {
    scanCount++;
    try {
      const myPrice = parseFloat(listing.price) || 0;
      const { lowestPrice, lowestItemPrice, lowestShipping, lowestItemId, lowestSeller, undercut } = await searchCompetitors(listing.title, listing.itemId, myPrice);
      const result = { itemId: listing.itemId, lowestPrice, lowestItemPrice, lowestShipping, lowestItemId, lowestSeller, undercut, myPrice, cachedAt: Date.now() };
      competitorCache[listing.itemId] = result;
      results.push(result);
      const pct = Math.round((scanCount / listings.length) * 100);
      const pctStr   = `[${String(pct).padStart(3)}%]`;
      const countStr = `[${String(scanCount).padStart(String(listings.length).length)}/${listings.length}]`;
      const titleStr = listing.title.substring(0, 52).padEnd(52);
      const priceStr = lowestPrice !== null ? ("$" + lowestPrice.toFixed(2)).padStart(8) : "  no comp";
      const statusStr = undercut ? " ⚠ UNDERCUT" : lowestPrice !== null ? " ✓" : "";
      console.log(`  ${pctStr} ${countStr} ${titleStr} ${priceStr}${statusStr}`);
    } catch (err) {
      const errResult = { itemId: listing.itemId, error: err.message };
      competitorCache[listing.itemId] = errResult;
      results.push(errResult);
      if (err.response?.status === 429 || err.response?.status === 500) {
        console.log(`  ⚠ Rate limit on ${listing.title.substring(0,40)}, skipping.`);
      } else {
        console.error(`  ❌ Error on ${listing.title.substring(0,40)}:`, err.message);
      }
    }
    await delay(50);
  }
  saveCache(competitorCache);
  return results;
}

// ── POST /competitors/bulk — batch all listings ──────────────────────────────
// Accepts JSON body: [{itemId, title, price}, ...]
// Returns JSON array of competitor results
app.post("/competitors/bulk", async (req, res) => {
  const listings = req.body;
  if (!Array.isArray(listings)) return res.status(400).json({ error: "body must be JSON array" });
  try {
    const results = await runBulkScan(listings);
    res.json(results);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ status: "Price Sentinel server running" }));

// ── Auto-scan state ───────────────────────────────────────────────────────────
let lastScanTime   = null;
let scanInProgress = false;
let nextScanTime   = null;
let autoScanActive = false;
let cachedListings = []; // updated each time /listings is called

// ── GET /scan-status — returns last scan time and next scan time ───────────────
app.get("/scan-status", (req, res) => {
  res.json({
    lastScanTime,
    nextScanTime,
    secondsUntilScan: nextScanTime ? Math.max(0, Math.round((nextScanTime - Date.now()) / 1000)) : null,
  });
});

// ── Server-side auto-scan every 90 minutes, 9am-9pm Pacific ──────────────────
function scheduleNextScan() {
  const INTERVAL_MS = 90 * 60 * 1000;
  nextScanTime = Date.now() + INTERVAL_MS;
  setTimeout(async () => {
    const hour = new Date().getHours();
    const isOffHours = hour < 9 || hour >= 21;
    if (isOffHours) {
      console.log("⏸ Auto-scan skipped (off hours 9pm-9am)");
    } else if (cachedListings.length > 0) {
      const now = new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});
      console.log(`🔁 Auto-scan triggered at ${now}`);
      lastScanTime = Date.now();
      try {
        await runBulkScan(cachedListings);
      } catch(e) {
        scanInProgress = false; // ensure lock releases even on error
        console.error("Auto-scan error:", e.message);
      }
    } else {
      console.log("⏸ Auto-scan skipped (no listings cached yet)");
    }
    scheduleNextScan();
  }, INTERVAL_MS);
}
scheduleNextScan();

const PORT = 3001;
const HTTP_PORT = 3002;
const attrs = [{ name: "commonName", value: "localhost" }];
const pems  = selfsigned.generate(attrs, { days: 365, keySize: 2048 });
https.createServer({ key: pems.private, cert: pems.cert }, app)
  .listen(PORT, () => console.log("✅ Price Sentinel HTTPS running on https://localhost:" + PORT));

const http = require("http");
http.createServer(app).listen(HTTP_PORT, () => console.log("✅ HTTP running on http://localhost:" + HTTP_PORT + " (for ngrok)"));
