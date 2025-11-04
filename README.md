# Farcaster Connect

A Farcaster Mini App that enables users to connect their Farcaster wallet to any dApp via WalletConnect. Use your Farcaster wallet to sign transactions and interact with Web3 applications seamlessly.

## Features

- **WalletConnect Integration**: Connect to any WalletConnect-enabled dApp
- **Multi-Chain Support**: Support for 16 EVM chains including Ethereum, Base, Arbitrum, Optimism, Polygon, and more
- **Session Management**: View, reconnect, and manage active WalletConnect sessions
- **Transaction History**: Track all signing requests and transactions with full history
- **Real-time Notifications**: Toast notifications for all connection and transaction events
- **Chain Switching**: Easily switch between supported chains
- **QR Code Scanning**: Scan WalletConnect QR codes directly from dApps

## Supported Chains

- Ethereum Mainnet
- Base
- Arbitrum One
- Optimism
- Polygon
- Avalanche C-Chain
- BNB Smart Chain
- Gnosis
- Celo
- Fantom Opera
- zkSync Era
- Linea
- Scroll
- Polygon zkEVM
- Mantle
- Blast

## How to Use

### On Desktop
1. Open a dApp (like OpenSea) on your desktop (recommended in incognito mode)
2. Select "WalletConnect" as the sign-in option

### In the Mini App
1. Click "Connect to App"
2. Scan the QR Code displayed on the dApp
3. Approve the connection
4. Sign & transact as needed

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A WalletConnect Project ID (get one at [WalletConnect Cloud](https://cloud.walletconnect.com))
- Farcaster account with wallet access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/farcaster-connect.git
cd farcaster-connect
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env.local` file:
```bash
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **WalletConnect**: @reown/walletkit
- **Farcaster SDK**: @farcaster/miniapp-sdk
- **Notifications**: Sonner

## Project Structure

```
app/
├── _components/
│   ├── chain/           # Chain selection components
│   ├── connect/         # WalletConnect connection logic
│   ├── farcaster/       # Farcaster wallet integration
│   └── transactions/    # Transaction history
├── globals.css
├── layout.tsx
└── page.tsx
components/
└── ui/                  # shadcn/ui components
lib/                     # Utility functions
```

## Key Components

### Connection Flow
- `connect.button.tsx` - Initiates connection process
- `connect.scan.tsx` - QR code scanner modal
- `connect.service.ts` - WalletConnect service layer
- `connect.store.ts` - Connection state management

### Session Management
- `connect.sessions.tsx` - Lists and manages active sessions
- `connect.info.tsx` - Displays current connection details

### Transaction Handling
- `transactions.list.tsx` - Transaction history display
- `transactions.store.ts` - Transaction state management

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_PROJECT_ID` | WalletConnect Project ID | Yes |

## Development

### Running Tests
```bash
pnpm test
```

### Building for Production
```bash
pnpm build
```

### Linting
```bash
pnpm lint
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [WalletConnect](https://walletconnect.com/)
- Powered by [Farcaster](https://www.farcaster.xyz/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## Support

For issues and questions, please open an issue on GitHub or reach out on Farcaster.
