# Beatree Frontend

Beatree is a modern web application built with Next.js 15, React 19, and TypeScript. The application provides a user-friendly interface for managing music playlists and library.

## Features

- Modern UI built with Mantine Design System (@mantine/core)
- Interactive form handling with @mantine/form
- Reusable components for consistent UI
- Responsive layout with Next.js App Router
- TypeScript for type safety
- Optimized performance with Turbopack

## Project Structure

```
src/
├── app/              # Next.js App Router files
│   ├── layout.tsx   # Root layout component
│   ├── page.tsx     # Main page component
│   ├── library/     # Library-related pages
│   └── playlist/    # Playlist-related pages
├── components/      # Reusable React components
└── public/          # Static assets
```

# Frontend do Beatree

Beatree é uma aplicação web moderna construída com Next.js 15, React 19 e TypeScript. A aplicação oferece uma interface amigável para gerenciar bibliotecas de música e playlists.

## Funcionalidades

- Interface moderna construída com o sistema de design Mantine (@mantine/core)
- Manipulação interativa de formulários com @mantine/form
- Componentes reutilizáveis para uma UI consistente
- Layout responsivo com o Next.js App Router
- TypeScript para segurança de tipos
- Desempenho otimizado com Turbopack

## Estrutura do Projeto

```
src/
├── app/              # Arquivos do Next.js App Router
│   ├── layout.tsx   # Componente de layout raiz
│   ├── page.tsx     # Componente da página principal
│   ├── library/     # Páginas relacionadas à biblioteca
│   └── playlist/    # Páginas relacionadas às playlists
├── components/      # Componentes React reutilizáveis
└── public/          # Ativos estáticos
```

## Começando

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
