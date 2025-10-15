// ===== CONFIGURATION =====

// Owner wallet address
const OWNER_WALLET = "0xD18EaDE49094fF568Aed13372436d67E30340130";

// Fee percentage
const FEE_PERCENT = 0.17;

// Default mode: "mock" or "hybrid"
let CURRENT_MODE = "mock";

// Supported languages
const SUPPORTED_LANGUAGES = [
  "en", "fr", "es", "de", "zh", "ar", "hi", "pt", "sw", "ja"
];

// Local EVM token list
const TOKEN_LIST = [
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "USDT", name: "Tether" },
  { symbol: "DAI", name: "Dai Stablecoin" },
  { symbol: "USDC", name: "USD Coin" },
  { symbol: "WBTC", name: "Wrapped Bitcoin" },
  { symbol: "LINK", name: "Chainlink" },
  { symbol: "UNI", name: "Uniswap" },
  { symbol: "AAVE", name: "Aave" },
  { symbol: "MKR", name: "Maker" },
  { symbol: "COMP", name: "Compound" },
  { symbol: "SUSHI", name: "SushiSwap" },
  { symbol: "YFI", name: "yearn.finance" },
  { symbol: "SNX", name: "Synthetix" },
  { symbol: "MATIC", name: "Polygon" },
  { symbol: "BAT", name: "Basic Attention Token" },
  { symbol: "ZRX", name: "0x Protocol" },
  { symbol: "REN", name: "Ren" },
  { symbol: "CRV", name: "Curve DAO Token" },
  { symbol: "1INCH", name: "1inch" },
  { symbol: "GRT", name: "The Graph" },
];

// UI translations
const UI_TEXT = {
  en: { dashboard: "Kaizen Dashboard V1", connectWallet: "Connect Wallet", balance: "Balance",
        tradePanel: "Trade Panel", buy: "Buy", sell: "Sell", confirmTrade: "Confirm Trade",
        noTrades: "No trades yet.", tokenSearch: "Search token symbol or name", search: "Search",
        chatPanel: "Chat / Suggestions", send: "Send", mockMode: "Mock Mode", hybridMode: "Hybrid Testnet Mode" },
  fr: { dashboard: "Tableau de bord Kaizen V1", connectWallet: "Connecter le portefeuille", balance: "Solde",
        tradePanel: "Panneau de trading", buy: "Acheter", sell: "Vendre", confirmTrade: "Confirmer le trade",
        noTrades: "Pas de trades pour l'instant.", tokenSearch: "Rechercher symbole ou nom de token", search: "Rechercher",
        chatPanel: "Chat / Suggestions", send: "Envoyer", mockMode: "Mode Mock", hybridMode: "Mode Testnet Hybride" },
  // Add other languages as needed...
};

// ===== STATE =====
let currentLanguage = "en";
let userWalletBalance = 0;
let selectedToken = "ETH";
let tokenAmount = 0;

// ===== FUNCTIONS =====

// Update UI text according to selected language
function updateUITexts() {
  const texts = UI_TEXT[currentLanguage];
  document.querySelector("h1").innerText = texts.dashboard;
  document.getElementById("connectWalletBtn").innerText = texts.connectWallet;
  document.getElementById("walletBalance").innerText = `${texts.balance}: ${userWalletBalance} ETH`;

  document.querySelector(".trade-panel h2").innerText = texts.tradePanel;
  document.querySelectorAll(".tradeBtn").forEach(btn => {
    btn.innerText = btn.dataset.action === "buy" ? texts.buy : texts.sell;
  });
  document.getElementById("confirmTradeBtn").innerText = texts.confirmTrade;
  document.getElementById("tradeStatus").innerText = texts.noTrades;

  document.querySelector(".token-search input").placeholder = texts.tokenSearch;
  document.getElementById("searchBtn").innerText = texts.search;

  document.querySelector(".chat-panel h2").innerText = texts.chatPanel;
  document.getElementById("sendChatBtn").innerText = texts.send;

  document.getElementById("mockBtn").innerText = texts.mockMode;
  document.getElementById("hybridBtn").innerText = texts.hybridMode;
}

// Connect mock wallet
function connectWallet() {
  userWalletBalance = 100; // Mock balance
  document.getElementById("walletBalance").innerText = `${UI_TEXT[currentLanguage].balance}: ${userWalletBalance} ETH`;
  alert("Wallet connected (mock mode)");
}

// Handle trade selection
function selectTrade(action) {
  tokenAmount = 1; // mock amount
  selectedToken = "ETH"; // default token
  document.getElementById("tradeStatus").innerText = `Selected ${action} ${tokenAmount} ${selectedToken}`;
}

// Confirm trade
function confirmTrade() {
  alert(`Trade confirmed: ${tokenAmount} ${selectedToken} (${CURRENT_MODE} mode)`);
  document.getElementById("tradeStatus").innerText = UI_TEXT[currentLanguage].noTrades;
}

// Token search
function searchToken() {
  const query = document.getElementById("searchToken").value.trim().toUpperCase();
  const results = TOKEN_LIST.filter(t => t.symbol.includes(query) || t.name.toUpperCase().includes(query));
  const resultsDiv = document.getElementById("searchResults");
  resultsDiv.innerHTML = results.map(t => `<p>${t.symbol} - ${t.name}</p>`).join("") || "<p>No results</p>";
}

// Send chat message
function sendChat() {
  const msgInput = document.getElementById("chatInput");
  const msg = msgInput.value.trim();
  if(msg) {
    const chatDiv = document.getElementById("chatMessages");
    chatDiv.innerHTML += `<p>${msg}</p>`;
    msgInput.value = "";
    chatDiv.scrollTop = chatDiv.scrollHeight;
  }
}

// Switch mode
function switchMode(mode) {
  CURRENT_MODE = mode;
  alert(`Switched to ${mode} mode`);
}

// ===== EVENT LISTENERS =====
document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
document.querySelectorAll(".tradeBtn").forEach(btn => {
  btn.addEventListener("click", (e) => selectTrade(e.target.dataset.action));
});
document.getElementById("confirmTradeBtn").addEventListener("click", confirmTrade);
document.getElementById("searchBtn").addEventListener("click", searchToken);
document.getElementById("sendChatBtn").addEventListener("click", sendChat);
document.getElementById("mockBtn").addEventListener("click", () => switchMode("mock"));
document.getElementById("hybridBtn").addEventListener("click", () => switchMode("hybrid"));
document.getElementById("languageSelect").addEventListener("change", (e) => {
  currentLanguage = e.target.value;
  updateUITexts();
});

// ===== INITIALIZE UI =====
updateUITexts();