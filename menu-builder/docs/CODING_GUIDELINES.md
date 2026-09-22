# コーディングガイドライン

このプロジェクト(menu-builder)におけるコードの書き方のルール集です。
「なぜそうするか」の経緯や背景は [DECISIONS.md](./DECISIONS.md) を参照してください。

## 目次

- [関数定義](#関数定義)
- [サイズ指定](#サイズ指定)

---

## 関数定義

関数定義は `function` ではなく `const` + アロー関数を使用する。

```ts
// Good
const getCategoryLabel = (cat: Category): React.ReactNode => {
  // ...
}

// Bad
function getCategoryLabel(cat: Category): React.ReactNode {
  // ...
}
```

戻り値の型が複数種類にまたがる場合(文字列とJSXが混在するなど)は、戻り値の型を明示する。

## サイズ指定

アイコンなどのサイズは `px` による直接指定を基本的に行わず、`em` を使用する。周囲のテキストの `font-size` に自動で追従させ、サイズの定義元を1箇所(CSSの`font-size`)に集約するため。

```tsx
// Good
<CupSoda size="1em" />

// Bad
<CupSoda size={16} />
```
