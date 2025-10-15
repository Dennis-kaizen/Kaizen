// ----- Config -----
let CURRENT_MODE = "mock";
let currentLanguage = "en";
let userWalletBalance = 0;
let selectedAction = null;

// ----- DOM Elements -----
const connectWalletBtn = document.getElementById("connectWalletBtn");
const walletBalance = document.getElementById("walletBalance");
const tradeButtons = document.querySelectorAll(".tradeBtn");
const confirmTradeBtn = document.getElementById("confirmTradeBtn");
const tradeStatus = document.getElementById("tradeStatus");
const searchTokenInput = document.getElementById("searchToken");
const searchBtn = document.getElementById("searchBtn");
const searchResults = document.getElementById("searchResults");
const chatInput = document.getElementById("chatInput");
const sendChatBtn = document.getElementById("sendChatBtn");
const chatMessages = document.getElementById("chatMessages");
const languageSelect = document.getElementById("languageSelect");
const mockBtn = document.getElementById("mockBtn");
const hybridBtn = document.getElementById("hybridBtn");

// ----- Events -----
// Connect wallet
connectWalletBtn.addEventListener("click", () => {
  userWalletBalance = 10;
  walletBalance.innerText = `Balance: ${userWalletBalance} ETH`;
  alert("Wallet connected (mock)");
});

// Trade selection
tradeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedAction = btn.dataset.action;
    tradeStatus.innerText = `Selected action: ${selectedAction}`;
  });
});

// Confirm trade
confirmTradeBtn.addEventListener("click", () => {
  if (!selectedAction) return alert("Select Buy or Sell first!");
  tradeStatus.innerText = `Trade confirmed: ${selectedAction}`;
  selectedAction = null;
});

// Token search
searchBtn.addEventListener("click", () => {
  const query = searchTokenInput.value.trim().toUpperCase();
  if (!query) return;
  const results = TOKEN_LIST.filter(t => t.symbol.includes(query) || t.name.toUpperCase().includes(query));
  searchResults.innerHTML = results.length
    ? results.map(t => `<p>${t.symbol} - ${t.name}</p>`).join("")
    : "<p>No tokens found.</p>";
});

// Chat
sendChatBtn.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  chatMessages.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
  chatMessages.innerHTML += `<p><strong>Kaizen:</strong> (mock) Got it!</p>`;
  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Language switch
languageSelect.addEventListener("change", () => {
  currentLanguage = languageSelect.value;
  updateUITexts();
});

// Mode buttons
mockBtn.addEventListener("click", () => {
  CURRENT_MODE = "mock";
  alert("Switched to Mock Mode");
});
hybridBtn.addEventListener("click", () => {
  CURRENT_MODE = "hybrid";
  alert("Switched to Hybrid Testnet Mode");
});

// ----- UI Update -----
function updateUITexts() {
  const texts = UI_TEXT[currentLanguage];
  document.querySelector("h1").innerText = texts.dashboard;
  connectWalletBtn.innerText = texts.connectWallet;
  walletBalance.innerText = `${texts.balance}: ${userWalletBalance} ETH`;
  document.querySelector(".trade-panel h2").innerText = texts.tradePanel;
  tradeButtons.forEach(btn => btn.innerText = btn.dataset.action === "buy" ? texts.buy : texts.sell);
  confirmTradeBtn.innerText = texts.confirmTrade;
  tradeStatus.innerText = texts.noTrades;
  searchTokenInput.placeholder = texts.tokenSearch;
  searchBtn.innerText = texts.search;
  document.querySelector(".chat-panel h2").innerText = texts.chatPanel;
  sendChatBtn.innerText = texts.send;
  mockBtn.innerText = texts.mockMode;
  hybridBtn.innerText = texts.hybridMode;
}

// Initialize UI
updateUITexts();