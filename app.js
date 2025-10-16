// ---------------- CONFIG ----------------
let CURRENT_MODE = "mock";
let currentLanguage = "en";
let userWalletAddress = null;
let userWalletBalance = 0;
let selectedToken = "ETH";

// ---------------- UI SETUP ----------------
function $(id) {
  return document.getElementById(id);
}

function showMessage(msg) {
  $("tradeStatus").innerText = msg;
  console.log(msg);
}

// ---------------- LANGUAGE HANDLER ----------------
function updateUITexts() {
  const t = UI_TEXT[currentLanguage];

  $("connectWalletBtn").innerText = t.connectWallet;
  $("walletBalance").innerText = `${t.balance}: ${userWalletBalance} ETH`;
  document.querySelector(".trade-panel h2").innerText = t.tradePanel;

  document.querySelectorAll(".tradeBtn").forEach(btn => {
    btn.innerText = btn.dataset.action === "buy" ? t.buy : t.sell;
  });

  $("confirmTradeBtn").innerText = t.confirmTrade;
  $("tradeStatus").innerText = t.noTrades;
  document.querySelector(".token-search input").placeholder = t.tokenSearch;
  $("searchBtn").innerText = t.search;
  document.querySelector(".chat-panel h2").innerText = t.chatPanel;
  $("sendChatBtn").innerText = t.send;
  $("mockBtn").innerText = t.mockMode;
  $("hybridBtn").innerText = t.hybridMode;
  document.querySelector("h1").innerText = t.dashboard;
}

$("languageSelect").addEventListener("change", e => {
  currentLanguage = e.target.value;
  updateUITexts();
});

// ---------------- WALLET CONNECTION ----------------
$("connectWalletBtn").addEventListener("click", async () => {
  alert("Attempting wallet connection...");
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      userWalletAddress = accounts[0];
      CURRENT_MODE = "hybrid";
      $("walletBalance").innerText = `Wallet: ${userWalletAddress.slice(0, 6)}...${userWalletAddress.slice(-4)}`;
      showMessage("✅ Connected to MetaMask successfully!");
      alert("Wallet connected successfully!");
    } catch (error) {
      showMessage("❌ Wallet connection rejected.");
      alert("Wallet connection rejected.");
    }
  } else {
    showMessage("⚠️ MetaMask not detected — using mock mode.");
    alert("MetaMask not detected — switched to mock mode!");
    CURRENT_MODE = "mock";
  }
});

// ---------------- TRADE LOGIC ----------------
function performTrade(action) {
  if (CURRENT_MODE === "hybrid" && userWalletAddress) {
    showMessage(`🔹 ${action.toUpperCase()} order sent to testnet for ${selectedToken}!`);
  } else if (CURRENT_MODE === "mock") {
    showMessage(`🧩 ${action.toUpperCase()} mock trade executed for ${selectedToken}.`);
  } else {
    showMessage("⚠️ Connect wallet or enable hybrid mode first!");
  }
}

document.querySelectorAll(".tradeBtn").forEach(btn => {
  btn.addEventListener("click", () => performTrade(btn.dataset.action));
});

$("confirmTradeBtn").addEventListener("click", () => {
  showMessage("✅ Trade confirmed!");
});

// ---------------- MODE SWITCH ----------------
$("mockBtn").addEventListener("click", () => {
  CURRENT_MODE = "mock";
  showMessage("🧩 Mock mode activated.");
});

$("hybridBtn").addEventListener("click", () => {
  if (window.ethereum) {
    CURRENT_MODE = "hybrid";
    showMessage("🔗 Hybrid Testnet mode activated.");
  } else {
    showMessage("⚠️ MetaMask not found. Still in mock mode.");
  }
});

// ---------------- TOKEN SEARCH ----------------
$("searchBtn").addEventListener("click", () => {
  const query = $("searchToken").value.toLowerCase();
  const results = TOKEN_LIST.filter(t =>
    t.symbol.toLowerCase().includes(query) || t.name.toLowerCase().includes(query)
  );

  const resultHTML = results.length
    ? results.map(t => `<div>${t.symbol} - ${t.name}</div>`).join("")
    : "<div>No token found</div>";

  $("searchResults").innerHTML = resultHTML;
});

// ---------------- CHAT PANEL ----------------
$("sendChatBtn").addEventListener("click", () => {
  const msg = $("chatInput").value.trim();
  if (!msg) return;
  $("chatMessages").innerHTML += `<div><b>You:</b> ${msg}</div>`;
  $("chatInput").value = "";
  $("chatMessages").scrollTop = $("chatMessages").scrollHeight;

  setTimeout(() => {
    $("chatMessages").innerHTML += `<div><b>Kaizen:</b> I'm still learning! Try a command or search a token.</div>`;
    $("chatMessages").scrollTop = $("chatMessages").scrollHeight;
  }, 500);
});

// ---------------- INIT ----------------
window.addEventListener("load", updateUITexts);