// Default language
let currentLanguage = "en";

// Mock wallet
let userWalletBalance = 0;
let selectedToken = "ETH";
let tokenAmount = 0;

// ----- Language switch -----
const languageSelect = document.getElementById("languageSelect");
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
  document.getElementById("sendChatBtn").innerText = texts