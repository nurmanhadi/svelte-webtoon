<script>
    const { comic, chapterNumber } = $props();
    const appUrl = import.meta.env.VITE_APP_URL;
    const appName = import.meta.env.VITE_APP_NAME;
</script>

<svelte:head>
    <title
        >Baca {comic.title} Chapter {chapterNumber} Bahasa Indonesia - {appName}</title
    >
    <meta
        name="description"
        content="Baca {comic.title} Chapter {chapterNumber} sub Indo terbaru di Welltoon. {comic.type} update harian, kualitas HD, gratis tanpa daftar!"
    />
    <meta
        name="keywords"
        content="{comic.title}, baca {comic.title} chapter {chapterNumber}, sub indo, bahasa indonesia, {comic.type}, full color"
    />
    <!-- Open Graph / Social -->
    <meta
        property="og:title"
        content="Baca {comic.title} Chapter {chapterNumber} Bahasa Indonesia - Welltoon"
    />
    <meta
        property="og:description"
        content="Baca {comic.title} Chapter {chapterNumber} sub Indo terbaru di Welltoon."
    />
    <meta property="og:type" content="article" />
    <meta
        property="og:url"
        content={`${appUrl}/comic/${comic.id}/chapter/${chapterNumber}`}
    />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
        name="twitter:title"
        content="Baca {comic.title} Chapter {chapterNumber} Bahasa Indonesia"
    />

    {#if chapterNumber > 1}
        <link rel="prev" href="/comic/{comic.id}/chapter/{chapterNumber - 1}" />
    {/if}
    {#if chapterNumber < comic.chapters?.length}
        <link rel="next" href="/comic/{comic.id}/chapter/{chapterNumber + 1}" />
    {/if}

    <script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `Baca ${comic.title} Chapter ${chapterNumber} Bahasa Indonesia`,
    "description": `Baca ${comic.title} Chapter ${chapterNumber} sub Indo terbaru di ${appName}.`,
    "image": [comic.cover_url],
    "author": {
      "@type": "Organization",
      "name": "Welltoon"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Welltoon",
      "logo": {
        "@type": "ImageObject",
        "url": "https://welltoon.site/logo.jpg"
      }
    },
    "datePublished": comic.chapters?.find(c => c.number == chapterNumber)?.created_at,
    "articleSection": comic.type,
    "keywords": `${comic.title}, baca ${comic.title} chapter ${chapterNumber}, sub indo, bahasa indonesia, ${comic.type} full color`
  })}
    </script>
</svelte:head>
