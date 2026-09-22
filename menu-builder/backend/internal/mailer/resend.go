package mailer

import (
	"fmt"
	"html"
	"os"
	"strings"

	"github.com/resend/resend-go/v2"
	"home-order-app/internal/model"
)

// SendOrderNotification は注文が入ったらオーナーにメールを送る
func SendOrderNotification(items []model.OrderItem, totalPrice int) error {
	apiKey := os.Getenv("RESEND_API_KEY")
	notifyEmail := os.Getenv("NOTIFY_EMAIL")

	if apiKey == "" || notifyEmail == "" {
		return fmt.Errorf("RESEND_API_KEY または NOTIFY_EMAIL が設定されていません")
	}

	client := resend.NewClient(apiKey)

	// メール本文を組み立てる
	var sb strings.Builder
	sb.WriteString("<h2>🛎️ 新しい注文が入りました！</h2>")
	sb.WriteString("<table border='1' cellpadding='8' cellspacing='0' style='border-collapse:collapse;'>")
	sb.WriteString("<tr><th>メニュー</th><th>数量</th><th>小計</th></tr>")

	for _, item := range items {
		nameCell := html.EscapeString(item.Name)
		if item.Recipe != "" {
			nameCell = fmt.Sprintf(
				"%s<br><small style='color:#aaa;font-size:0.85em'>📋 %s</small>",
				html.EscapeString(item.Name), html.EscapeString(item.Recipe),
			)
		}
		sb.WriteString(fmt.Sprintf(
			"<tr><td>%s</td><td>%d</td><td>¥%d</td></tr>",
			nameCell,
			item.Quantity,
			item.Price*item.Quantity,
		))
	}

	sb.WriteString("</table>")
	sb.WriteString(fmt.Sprintf("<p><strong>合計: ¥%d</strong></p>", totalPrice))

	params := &resend.SendEmailRequest{
		From:    "注文通知 <onboarding@resend.dev>",
		To:      []string{notifyEmail},
		Subject: fmt.Sprintf("🛎️ 新しい注文 - 合計 ¥%d", totalPrice),
		Html:    sb.String(),
	}

	_, err := client.Emails.Send(params)
	if err != nil {
		return fmt.Errorf("メール送信エラー: %w", err)
	}

	return nil
}
