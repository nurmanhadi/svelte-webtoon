<script>
  const { comic } = $props();
  const appUrl = import.meta.env.VITE_APP_URL;
  const appName = import.meta.env.VITE_APP_NAME;
</script>

<svelte:head>
  <title
    >{comic.title} Bahasa Indonesia - Baca & Update Terbaru di Welltoon</title
  >
  <meta
    name="description"
    content="Baca {comic.title} bahasa Indonesia lengkap di {appName}. {comic.type} populer bergenre {comic.genres
      ?.map((g) => g.name)
      .join(', ') ||
      'Tidak diketahui'}. Update setiap hari, kualitas HD, gratis!"
  />
  <meta
    name="keywords"
    content="{comic.title}, baca {comic.title}, {comic.title} sub indo, {comic.title} bahasa indonesia, {comic.type} {comic.title}, baca komik online gratis"
  />
  <link rel="canonical" href={`${appUrl}/comic/${comic.id}`} />

  <!-- Open Graph / Social Sharing -->
  <meta property="og:title" content="{comic.title} - Baca di {appName}" />
  <meta
    property="og:description"
    content="Baca {comic.title} sub Indo terbaru. Update harian, kualitas tinggi, gratis!"
  />
  <meta property="og:image" content={comic.cover_url} />
  <meta property="og:url" content={`${appUrl}/comic/${comic.id}`} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={appName} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{comic.title} - {appName}" />
  <meta
    name="twitter:description"
    content="Baca {comic.title} sub Indo kualitas HD. Gratis dan update cepat!"
  />
  <meta name="twitter:image" content={comic.cover_url} />

  <!-- Schema Markup (Structured Data) -->
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": comic.title,
      "description": `Baca ${comic.title} bahasa Indonesia lengkap di ${appName}.`,
      "url": `${appUrl}/comic/${comic.id}`,
      "image": comic.cover_url,
      "publisher": {
        "@type": "Organization",
        "name": {appName},
        "logo": {
          "@type": "ImageObject",
          "url": `${appUrl}/logo.png`
        }
      },
      "mainEntity": {
        "@type": "ComicSeries",
        "name": comic.title,
        "description": comic.description,
        "genre": comic.genres?.map(g => g.name),
        "creator": [{ "@type": "Person", "name": comic.author || "Tidak diketahui" }],
        "publisher": { "@type": "Organization", "name": "Welltoon" }
      }
    })}
  </script>
</svelte:head>
