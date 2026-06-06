package model

import (
	"encoding/json"
	"time"
)

// OrderItem はカート内の1アイテムを表す
type OrderItem struct {
	ID       string `json:"id"`
	Name     string `json:"name"`
	Price    int    `json:"price"`
	Quantity int    `json:"quantity"`
	ImageURL string `json:"imageUrl"`
	Recipe   string `json:"recipe,omitempty"`
}

// Order はDBに保存する注文データ
type Order struct {
	ID         string          `json:"id"`
	Items      json.RawMessage `json:"items"`
	TotalPrice int             `json:"totalPrice"`
	CreatedAt  time.Time       `json:"createdAt"`
}

// CreateOrderRequest はフロントエンドから受け取るリクエスト
type CreateOrderRequest struct {
	Items      []OrderItem `json:"items"`
	TotalPrice int         `json:"totalPrice"`
}
