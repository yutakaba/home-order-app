package handler

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"home-order-app/internal/mailer"
	"home-order-app/internal/model"
)

type OrderHandler struct {
	DB *sql.DB
}

func NewOrderHandler(db *sql.DB) *OrderHandler {
	return &OrderHandler{DB: db}
}

// Orders は GET/POST /orders をメソッドで振り分ける
func (h *OrderHandler) Orders(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		h.ListOrders(w, r)
	case http.MethodPost:
		h.CreateOrder(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// ListOrders は GET /orders を処理する
func (h *OrderHandler) ListOrders(w http.ResponseWriter, r *http.Request) {
	rows, err := h.DB.Query(
		`SELECT id, items, total_price, created_at FROM orders ORDER BY created_at DESC LIMIT 100`,
	)
	if err != nil {
		log.Printf("DB取得エラー: %v", err)
		http.Error(w, "注文履歴の取得に失敗しました", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	orders := make([]model.Order, 0)
	for rows.Next() {
		var o model.Order
		if err := rows.Scan(&o.ID, &o.Items, &o.TotalPrice, &o.CreatedAt); err != nil {
			log.Printf("行スキャンエラー: %v", err)
			continue
		}
		orders = append(orders, o)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(orders)
}

// CreateOrder は POST /orders を処理する
func (h *OrderHandler) CreateOrder(w http.ResponseWriter, r *http.Request) {

	var req model.CreateOrderRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "リクエストの解析に失敗しました", http.StatusBadRequest)
		return
	}

	if len(req.Items) == 0 {
		http.Error(w, "注文アイテムが空です", http.StatusBadRequest)
		return
	}

	// アイテムをJSONに変換してDBへ保存
	itemsJSON, err := json.Marshal(req.Items)
	if err != nil {
		http.Error(w, "データの変換に失敗しました", http.StatusInternalServerError)
		return
	}

	var orderID string
	err = h.DB.QueryRow(
		`INSERT INTO orders (items, total_price) VALUES ($1, $2) RETURNING id`,
		itemsJSON,
		req.TotalPrice,
	).Scan(&orderID)
	if err != nil {
		log.Printf("DB保存エラー: %v", err)
		http.Error(w, "注文の保存に失敗しました", http.StatusInternalServerError)
		return
	}

	// メール通知を非同期で送信（失敗しても注文は成功扱い）
	go func() {
		if err := mailer.SendOrderNotification(req.Items, req.TotalPrice); err != nil {
			log.Printf("メール送信エラー: %v", err)
		}
	}()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"id":      orderID,
		"message": "注文を受け付けました",
	})
}

// HealthCheck は GET /health を処理する（Railway用）
func HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}
