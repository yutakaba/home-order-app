package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/cors"

	"home-order-app/internal/db"
	"home-order-app/internal/handler"
)

func main() {
	// .envファイルを読み込む（本番環境では環境変数が直接設定されるのでエラーは無視）
	_ = godotenv.Load()

	// DB接続
	database, err := db.Connect()
	if err != nil {
		log.Fatalf("DB接続に失敗しました: %v", err)
	}
	defer database.Close()
	log.Println("✅ DB接続成功")

	// ハンドラー初期化
	orderHandler := handler.NewOrderHandler(database)

	// ルーティング
	mux := http.NewServeMux()
	mux.HandleFunc("/health", handler.HealthCheck)
	mux.HandleFunc("/orders", orderHandler.CreateOrder)

	// CORS設定（フロントエンドからのアクセスを許可）
	c := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:5173",     // Vite開発サーバー
			"https://*.vercel.app",      // Vercelデプロイ
		},
		AllowedMethods: []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("🚀 サーバー起動: http://localhost:%s", port)
	if err := http.ListenAndServe(":"+port, c.Handler(mux)); err != nil {
		log.Fatalf("サーバー起動エラー: %v", err)
	}
}
