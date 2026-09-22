package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

// Connect はSupabaseのPostgreSQLに接続してDBを返す
func Connect() (*sql.DB, error) {
	dbURL := os.Getenv("SUPABASE_DB_URL")
	if dbURL == "" {
		return nil, fmt.Errorf("SUPABASE_DB_URL が設定されていません")
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		return nil, fmt.Errorf("DB接続エラー: %w", err)
	}

	if err := db.Ping(); err != nil {
		return nil, fmt.Errorf("DB疎通確認エラー: %w", err)
	}

	return db, nil
}
