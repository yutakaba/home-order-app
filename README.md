# home-order-app

友達を家に呼んだ時に使う、スマートフォン向け料理・ドリンク注文アプリ。

## スタック

- **フロントエンド**: React + TypeScript + Vite
- **バックエンド**: Go
- **DB**: Supabase (PostgreSQL)
- **メール通知**: Resend
- **デプロイ**: Vercel (フロント) + Railway (バックエンド)

## ディレクトリ構成

```
home-order-app/
├── frontend/         # React + TypeScript
└── backend/          # Go API サーバー
```

## セットアップ

### 環境変数

**backend/.env**
```
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
RESEND_API_KEY=re_xxxx
NOTIFY_EMAIL=your@email.com
PORT=8080
```

**frontend/.env**
```
VITE_API_URL=http://localhost:8080
```

### 起動方法

```bash
# バックエンド
cd backend
go run cmd/server/main.go

# フロントエンド
cd frontend
npm install
npm run dev
```
