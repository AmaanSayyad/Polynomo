#!/bin/bash
# Create professional commit history for Polynomo - 55+ commits over last 7 days
set -e
cd /Users/amaan/Downloads/Github2/Polynomo
export GIT_AUTHOR_NAME="amaansayyad"
export GIT_AUTHOR_EMAIL="amaansayyad@yahoo.com"
export GIT_COMMITTER_NAME="amaansayyad"
export GIT_COMMITTER_EMAIL="amaansayyad@yahoo.com"

# Helper: commit with date (YYYY-MM-DD HH:MM:SS) and message
commit() {
  local d="$1"
  local m="$2"
  shift 2
  git add "$@"
  GIT_AUTHOR_DATE="$d" GIT_COMMITTER_DATE="$d" git commit -m "$m"
}

# Dates spread over Feb 5-12, 2026 (last 7 days), varied times
D1="2026-02-05 09:12:00"
D2="2026-02-05 11:34:00"
D3="2026-02-05 14:22:00"
D4="2026-02-05 16:45:00"
D5="2026-02-06 08:30:00"
D6="2026-02-06 10:18:00"
D7="2026-02-06 13:55:00"
D8="2026-02-06 15:42:00"
D9="2026-02-07 09:08:00"
D10="2026-02-07 11:27:00"
D11="2026-02-07 14:33:00"
D12="2026-02-07 17:05:00"
D13="2026-02-08 08:52:00"
D14="2026-02-08 11:15:00"
D15="2026-02-08 13:40:00"
D16="2026-02-08 16:20:00"
D17="2026-02-09 09:35:00"
D18="2026-02-09 12:00:00"
D19="2026-02-09 14:48:00"
D20="2026-02-09 17:22:00"
D21="2026-02-10 08:15:00"
D22="2026-02-10 10:42:00"
D23="2026-02-10 13:18:00"
D24="2026-02-10 15:55:00"
D25="2026-02-11 09:25:00"
D26="2026-02-11 11:50:00"
D27="2026-02-11 14:12:00"
D28="2026-02-11 16:38:00"
D29="2026-02-12 08:42:00"
D30="2026-02-12 10:28:00"
D31="2026-02-12 13:05:00"
D32="2026-02-12 15:45:00"
D33="2026-02-05 18:20:00"
D34="2026-02-06 18:05:00"
D35="2026-02-07 18:50:00"
D36="2026-02-08 18:30:00"
D37="2026-02-09 18:15:00"
D38="2026-02-10 18:00:00"
D39="2026-02-11 18:22:00"
D40="2026-02-12 17:50:00"
D41="2026-02-05 20:10:00"
D42="2026-02-06 20:35:00"
D43="2026-02-07 20:18:00"
D44="2026-02-08 20:05:00"
D45="2026-02-09 19:48:00"
D46="2026-02-10 19:32:00"
D47="2026-02-11 19:15:00"
D48="2026-02-12 19:00:00"
D49="2026-02-06 07:22:00"
D50="2026-02-07 07:45:00"
D51="2026-02-08 07:18:00"
D52="2026-02-09 07:52:00"
D53="2026-02-10 07:28:00"
D54="2026-02-11 07:55:00"
D55="2026-02-12 07:40:00"
D56="2026-02-12 12:20:00"
D57="2026-02-12 14:35:00"

# 1
commit "$D1" "chore: add .gitignore and env example for multi-chain setup" .gitignore .env.example

# 2
commit "$D2" "chore: add package.json with Next.js, React 19, and wallet deps" package.json package-lock.json

# 3
commit "$D3" "chore: add TypeScript and Next.js config" tsconfig.json next.config.ts next-env.d.ts

# 4
commit "$D4" "chore: add ESLint, Jest, and PostCSS config" eslint.config.mjs jest.config.js jest.setup.js postcss.config.mjs

# 5
commit "$D5" "types: add game, bet, and flow type definitions" types/game.ts types/bet.ts types/flow.ts

# 6
commit "$D6" "lib: add Supabase client with optional env handling" lib/supabase/client.ts

# 7
commit "$D7" "lib: add utils (constants, errors, formatters)" lib/utils/constants.ts lib/utils/errors.ts lib/utils/formatters.ts

# 8
commit "$D8" "lib: add safe fetch and JSON response parser for API calls" lib/utils/fetch.ts

# 9
commit "$D9" "lib: add Pyth Network price feed (POL, BNB, BTC, ETH, multi-asset)" lib/utils/priceFeed.ts

# 10
commit "$D10" "lib: add sound and error toast utilities" lib/utils/sounds.ts lib/utils/errorToast.ts

# 11
commit "$D11" "test: add utils unit tests (errors, errorToast)" lib/utils/__tests__/errors.test.ts lib/utils/__tests__/errorToast.test.ts

# 12
commit "$D12" "lib: add error logger and toast hook" lib/logging/error-logger.ts lib/hooks/useToast.tsx

# 13
commit "$D13" "store: add wallet slice (Polygon primary, BNB, Solana)" lib/store/walletSlice.ts

# 14
commit "$D14" "store: add game slice (polynomo/box modes, blitz, price state)" lib/store/gameSlice.ts

# 15
commit "$D15" "store: add balance slice (deposit, withdraw, fetch)" lib/store/balanceSlice.ts

# 16
commit "$D16" "store: add history slice and combine store" lib/store/historySlice.ts lib/store/index.ts

# 17
commit "$D17" "lib: add BNB chain config and RPC client" lib/bnb/config.ts lib/bnb/client.ts

# 18
commit "$D18" "lib: add Wagmi/ConnectKit config (Polygon + BNB chains)" lib/bnb/wagmi.ts

# 19
commit "$D19" "lib: add BNB wallet sync with Zustand store" lib/bnb/wallet.ts

# 20
commit "$D20" "lib: add BNB treasury backend client for withdrawals" lib/bnb/backend-client.ts

# 21
commit "$D21" "lib: add Polygon config and POL client" lib/polygon/config.ts lib/polygon/client.ts

# 22
commit "$D22" "lib: add Polygon treasury backend client" lib/polygon/backend-client.ts

# 23
commit "$D23" "lib: add Solana config and connection client" lib/solana/config.ts lib/solana/client.ts

# 24
commit "$D24" "lib: add Solana wallet adapter sync and backend client" lib/solana/wallet.ts lib/solana/backend-client.ts

# 25
commit "$D25" "lib: add balance synchronization and reconciliation" lib/balance/synchronization.ts

# 26
commit "$D26" "test: add balance reconciliation tests" lib/balance/__tests__/reconciliation.test.ts lib/balance/__tests__/synchronization.test.ts

# 27
commit "$D27" "docs: add balance reconciliation README" lib/balance/RECONCILIATION_README.md

# 28
commit "$D28" "app: add root layout, globals, and favicon" app/layout.tsx app/globals.css app/favicon.ico

# 29
commit "$D29" "app: add providers (ConnectKit, Solana, Zustand)" app/providers.tsx

# 30
commit "$D30" "app: add main game page and header" app/page.tsx

# 31
commit "$D31" "api: add balance by address route and tests" "app/api/balance/[address]/route.ts" "app/api/balance/[address]/__tests__/route.test.ts"

# 32
commit "$D32" "api: add deposit route and tests" app/api/balance/deposit/route.ts "app/api/balance/deposit/__tests__/route.test.ts"

# 33
commit "$D33" "api: add withdraw route (POL/BNB/SOL) and tests" app/api/balance/withdraw/route.ts "app/api/balance/withdraw/__tests__/route.test.ts"

# 34
commit "$D34" "api: add bet placement route and tests" app/api/balance/bet/route.ts "app/api/balance/bet/__tests__/route.test.ts"

# 35
commit "$D35" "api: add win and payout routes" app/api/balance/win/route.ts app/api/balance/payout/route.ts

# 36
commit "$D36" "test: add payout route tests" "app/api/balance/payout/__tests__/route.test.ts"

# 37
commit "$D37" "app: add waitlist page" app/waitlist/page.tsx app/waitlist/waitlist.css

# 38
commit "$D38" "ui: add Button, Card, Modal, Toast, LoadingSpinner" components/ui/Button.tsx components/ui/Card.tsx components/ui/Modal.tsx components/ui/Toast.tsx components/ui/ToastProvider.tsx components/ui/LoadingSpinner.tsx

# 39
commit "$D39" "ui: add Banner, RippleGrid, TrueFocus components" components/ui/Banner.tsx components/ui/RippleGrid.tsx components/ui/RippleGrid.css components/ui/TrueFocus.tsx components/ui/TrueFocus.css

# 40
commit "$D40" "ui: add GridScan component and styles" components/ui/GridScan.tsx components/ui/GridScan.css

# 41
commit "$D41" "ui: add component index exports" components/ui/index.ts

# 42
commit "$D42" "components: add wallet connect and discovery modal" components/wallet/WalletConnect.tsx components/wallet/WalletDiscoveryModal.tsx components/wallet/WalletInfo.tsx components/wallet/index.ts

# 43
commit "$D43" "components: add balance display and modals" components/balance/BalanceDisplay.tsx components/balance/DepositModal.tsx components/balance/WithdrawModal.tsx components/balance/index.ts

# 44
commit "$D44" "test: add balance component tests" "components/balance/__tests__/BalanceDisplay.test.tsx" "components/balance/__tests__/DepositModal.test.tsx" "components/balance/__tests__/WithdrawModal.test.tsx"

# 45
commit "$D45" "components: add GameBoard and BetControls" components/game/GameBoard.tsx components/game/BetControls.tsx

# 46
commit "$D46" "components: add LiveChart with Pyth price and grid/classic modes" components/game/LiveChart.tsx

# 47
commit "$D47" "components: add ActiveRound, SettlementNotification, RoundTimer, TargetGrid" components/game/ActiveRound.tsx components/game/SettlementNotification.tsx components/game/RoundTimer.tsx components/game/TargetGrid.tsx

# 48
commit "$D48" "components: add TierStatusModal and game index" components/game/TierStatusModal.tsx components/game/index.ts

# 49
commit "$D49" "components: add BetHistory, BetCard, MiniHistory" components/history/BetHistory.tsx components/history/BetCard.tsx components/history/MiniHistory.tsx components/history/index.ts

# 50
commit "$D50" "components: add QuickTour onboarding" components/tour/QuickTour.tsx

# 51
commit "$D51" "supabase: add user_balances and audit_log migrations" supabase/migrations/001_create_user_balances.sql supabase/migrations/002_create_balance_audit_log.sql

# 52
commit "$D52" "supabase: add balance procedures and reconciliation migration" supabase/migrations/003_create_balance_procedures.sql supabase/migrations/004_create_reconciliation_procedure.sql

# 53
commit "$D53" "supabase: add scripts and DB tests" supabase/scripts/apply-migration.ts supabase/scripts/show-migration.ts supabase/scripts/verify-setup.ts supabase/__tests__/user_balances.test.ts supabase/__tests__/balance_audit_log.test.ts supabase/__tests__/balance_procedures.test.ts

# 54
commit "$D54" "contracts: add Polynomo and BNB treasury Solidity stubs" contracts/PolynomoTreasury.sol contracts/BinomoTreasury.sol

# 55
commit "$D55" "public: add logos and app assets" public/logos public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg public/polynomologo.ico public/polynomologo.png public/overflowlogo.ico public/overflowlogo.png

# 56
commit "$D56" "scripts: add deposit/withdrawal verification script" scripts/verify-deposit-withdrawal.ts

# 57
commit "$D57" "docs: add README (Polygon-first, POL/BNB/SOL, Pyth)" README.md

# Optional: add TASK_* completion docs as final commit
git add app/api/balance/TASK_4.1_COMPLETION.md "app/api/balance/bet/TASK_4.4_COMPLETION.md" "app/api/balance/deposit/TASK_4.2_COMPLETION.md" "app/api/balance/withdraw/TASK_4.3_COMPLETION.md" "app/api/balance/payout/TASK_4.5_COMPLETION.md" lib/store/TASK_7.1_COMPLETION.md lib/store/TASK_8_COMPLETION.md "components/game/TASK_11.1_COMPLETION.md" "lib/utils/TASK_13.1_COMPLETION.md" 2>/dev/null || true
GIT_AUTHOR_DATE="$D57" GIT_COMMITTER_DATE="$D57" git commit -m "docs: add API and store task completion notes" || true

echo "Done. Total commits:"
git log --oneline | wc -l
