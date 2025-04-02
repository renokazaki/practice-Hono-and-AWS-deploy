# Dockerfile
FROM node:18-alpine AS base

# 依存関係のインストール
FROM base AS deps
WORKDIR /app

# パッケージマネージャーファイルをコピー
COPY package.json package-lock.json* ./

# 依存関係のインストール
RUN npm ci

# ビルド用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 環境変数を設定（ビルド時に必要な変数）
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Prisma クライアントの生成とアプリのビルド
RUN npx prisma generate
RUN npm run build

# 本番環境用
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# 必要なファイルをコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# 新しいディレクトリ構造のために必要なファイルをコピー
# サーバーとクライアントの共有ディレクトリ
COPY --from=builder /app/src/shared ./src/shared

# エラー対策: .next/server ディレクトリが完全にコピーされていることを確認
COPY --from=builder /app/.next/server ./.next/server

# アプリケーションを実行
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]