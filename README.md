# home-order-app

友達を家に呼んだ時に使う、スマートフォン向け料理・ドリンク注文アプリ。

現在、誰でも自分の「お家メニュー」を作れるサービスへと拡張中です。開発は `menu-builder/` 配下で進めています。

## ディレクトリ構成

```
home-order-app/
├── menu-builder/     # 開発中の新サービス
│   ├── frontend/     # React + TypeScript
│   ├── backend/      # Go API サーバー
│   └── docs/         # コーディングガイドライン・意思決定ログ
```

## スタック

- **フロントエンド**: React + TypeScript + Vite
- **バックエンド**: Go
- **DB**: Supabase (PostgreSQL)
- **画像**: Cloudinary
- **メール通知**: Resend
- **デプロイ**: Vercel (フロント) + Railway (バックエンド)

## ドキュメント

- [コーディングガイドライン](./menu-builder/docs/CODING_GUIDELINES.md)
- [意思決定ログ](./menu-builder/docs/DECISIONS.md)

## セットアップ

### 環境変数

**menu-builder/backend/.env**
```
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres
RESEND_API_KEY=re_xxxx
NOTIFY_EMAIL=your@email.com
PORT=8080
```

**menu-builder/frontend/.env**
```
VITE_API_URL=http://localhost:8080
```

### 起動方法

```bash
# バックエンド
cd menu-builder/backend
go run cmd/server/main.go

# フロントエンド
cd menu-builder/frontend
npm install
npm run dev
```

### フォーマット・Lint

```bash
cd menu-builder/frontend
npm run format:fix   # コード整形
npm run lint          # 静的解析
```
