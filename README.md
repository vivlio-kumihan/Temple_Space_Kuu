
```
├── src/
│   ├── app/
│   │   ├── booking/
│   │   │   └── complete/
│   │   │       ├── page.jsx
│   │   │       └── complete.module.scss
│   │   ├── temples/
│   │   │   └── [id]/
│   │   │       ├── page.js
│   │   │       └── temple.module.scss
│   │   ├── global.scss
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   ├── page.module.scss
│   │   └── reset.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.module.scss
│   │   │   ├── Header.jsx
│   │   │   └── Header.module.scss
│   │   └── ui/
│   │       ├── AvailabilityCalendar.jsx
│   │       ├── AvailabilityCalendar.module.scss
│   │       ├── Button.jsx (styled-components)
│   │       ├── Gallery.jsx (styled-components)
│   │       ├── MixIn.jsx
│   │       ├── Movie.jsx
│   │       └── MySwiper.jsx (styled-components)
│   ├── hooks/
│   │   └── useScrollAnimation.jsx
│   ├── lib/
│   │   ├── availability.js
│   │   ├── readPhotographedWorksMetaData.jsx
│   │   ├── supabase.js
│   │   └── temples.js
│   ├── styles/
│   │   └── globals
│   │       ├── _index.scss
│   │       ├── _mixins.scss
│   │       └── _variables.scss
│   └── assets/
└── public/
    ├── data/
    │   └── temples.csv
    ├── images/
    │   ├── photographedWorks/
    │   │   └── meta-data.csv
    │   │   └── photo01.png
    │   │   └── photo02.jpg
    │   │   └── photo03.jpg
    │   │   └── ...
    │   └── temples/
    └── movies/       
        └── sample.mp4
```


```
整理用
│   │   ├── about/
│   │   │   └── page.jsx
│   │   │   └── About.module.scss
│   │   ├── contact/
│   │   │   └── page.jsx
│   │   │   └── Contact.module.scss
```

命名規則の統一案
ファイル名
|種類|命名規則|例|
|----|----|----|
|ページ|page.jsx|app/temples/[id]/page.jsx|
|レイアウト|layout.jsx|app/layout.jsx|
|コンポーネント|PascalCase|Header/index.jsx
|CSS Modules|コンポーネント名.module.scss|Header.module.scss または header.module.scss|
|ユーティリティ|camelCase.js|temples.js, supabase.js|
|Hooks|use + PascalCase.js|useScrollAnimation.js|
|型定義（TS）|PascalCase.ts|Temple.ts|


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


|fileName|caption|location|
|:---|:----|:---|
|220526_1023368.jpg|おいしいご飯|大阪/京橋|
|220526_1023369.jpg|お茶|静岡/永谷園|
|220526_1023370.jpg|アイスコーヒーをいただく|東京/渋谷|


"fileName", "caption", "location",
"220526_1023368.jpg", "おいしいご飯", "大阪/京橋",
"220526_1023369.jpg", "お茶", "静岡/永谷園",
"220526_1023370.jpg", "アイスコーヒーをいただく", "東京/渋谷",


## Getting Started

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Project URL
https://adcvlpeqpdupwfjhdooz.supabase.co

anon public (公開用キー)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkY3ZscGVxcGR1cHdmamhkb296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3OTc5MjQsImV4cCI6MjA3NjM3MzkyNH0.G6yCujQTjnf9rM-iGPnzumVtjcLoCOAoqMCnMdJFNpM