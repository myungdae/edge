# Edge Solutions 웹사이트

`edgesolutions.co.kr` 공식 웹사이트입니다.

## 구성

- `index.html` - 메인 페이지
- `assets/style.css` - 스타일시트
- `assets/main.js` - JavaScript

## 로컬 실행

```bash
# 간단한 HTTP 서버로 실행
python3 -m http.server 8080
# 또는
npx serve .
```

## GitHub Pages

`main` 브랜치의 루트 디렉토리에서 GitHub Pages로 서비스합니다.

Settings → Pages → Source: Deploy from a branch → Branch: main / (root)

## Route53 연결

도메인 연결 후 `edgesolutions.co.kr`로 서비스될 예정입니다.
