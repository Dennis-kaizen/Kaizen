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
  es: { dashboard: "Panel de Kaizen V1", connectWallet: "Conectar cartera", balance: "Saldo",
        tradePanel: "Panel de operaciones", buy: "Comprar", sell: "Vender", confirmTrade: "Confirmar operación",
        noTrades: "No hay operaciones todavía.", tokenSearch: "Buscar símbolo o nombre de token", search: "Buscar",
        chatPanel: "Chat / Sugerencias", send: "Enviar", mockMode: "Modo Mock", hybridMode: "Modo Testnet Híbrido" },
  de: { dashboard: "Kaizen Dashboard V1", connectWallet: "Wallet verbinden", balance: "Kontostand",
        tradePanel: "Handelsbereich", buy: "Kaufen", sell: "Verkaufen", confirmTrade: "Trade bestätigen",
        noTrades: "Noch keine Trades.", tokenSearch: "Token-Symbol oder Name suchen", search: "Suchen",
        chatPanel: "Chat / Vorschläge", send: "Senden", mockMode: "Mock-Modus", hybridMode: "Hybrid-Testnet-Modus" },
  zh: { dashboard: "Kaizen 仪表板 V1", connectWallet: "连接钱包", balance: "余额",
        tradePanel: "交易面板", buy: "买入", sell: "卖出", confirmTrade: "确认交易",
        noTrades: "尚无交易。", tokenSearch: "搜索代币符号或名称", search: "搜索",
        chatPanel: "聊天 / 建议", send: "发送", mockMode: "模拟模式", hybridMode: "混合测试网模式" },
  ar: { dashboard: "لوحة تحكم كايزن V1", connectWallet: "ربط المحفظة", balance: "الرصيد",
        tradePanel: "لوحة التداول", buy: "شراء", sell: "بيع", confirmTrade: "تأكيد الصفقة",
        noTrades: "لا توجد صفقات بعد.", tokenSearch: "ابحث عن رمز أو اسم التوكن", search: "بحث",
        chatPanel: "الدردشة / الاقتراحات", send: "إرسال", mockMode: "الوضع التجريبي", hybridMode: "وضع الاختبار الهجين" },
  hi: { dashboard: "Kaizen डैशबोर्ड V1", connectWallet: "वॉलेट कनेक्ट करें", balance: "बैलेंस",
        tradePanel: "ट्रेड पैनल", buy: "खरीदें", sell: "बेचें", confirmTrade: "ट्रेड कंफर्म करें",
        noTrades: "कोई ट्रेड नहीं।", tokenSearch: "टोकन सिम्बल या नाम खोजें", search: "खोजें",
        chatPanel: "चैट / सुझाव", send: "भेजें", mockMode: "मॉक मोड", hybridMode: "हाइब्रिड टेस्टनेट मोड" },
  pt: { dashboard: "Painel Kaizen V1", connectWallet: "Conectar Carteira", balance: "Saldo",
        tradePanel: "Painel de Trade", buy: "Comprar", sell: "Vender", confirmTrade: "Confirmar Trade",
        noTrades: "Nenhum trade ainda.", tokenSearch: "Pesquisar símbolo ou nome do token", search: "Pesquisar",
        chatPanel: "Chat / Sugestões", send: "Enviar", mockMode: "Modo Mock", hybridMode: "Modo Testnet Híbrido" },
  sw: { dashboard: "Kaizen Dashibodi V1", connectWallet: "Unganisha Wallet", balance: "Salio",
        tradePanel: "Jopo la Biashara", buy: "Nunua", sell: "Uza", confirmTrade: "Thibitisha Biashara",
        noTrades: "Hakuna biashara bado.", tokenSearch: "Tafuta alama au jina la token", search: "Tafuta",
        chatPanel: "Chat / Mapendekezo", send: "Tuma", mockMode: "Hali ya Mock", hybridMode: "Hali ya Hybrid Testnet" },
  ja: { dashboard: "Kaizen ダッシュボード V1", connectWallet: "ウォレットを接続", balance: "残高",
        tradePanel: "取引パネル", buy: "購入", sell: "売却", confirmTrade: "取引を確認",
        noTrades: "まだ取引はありません。", tokenSearch: "トークンのシンボルまたは名前を検索", search: "検索",
        chatPanel: "チャット / 提案", send: "送信", mockMode: "モックモード", hybridMode: "ハイブリッドテストネットモード" }
};