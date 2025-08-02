<script>
    const appUrl = import.meta.env.VITE_APP_URL;
    const appName = import.meta.env.VITE_APP_NAME;
</script>

<svelte:head>
    <!-- Basic SEO -->
    <title
        >{appName} - Baca Komik, Manga, Manhua, Manhwa Bahasa Indonesia Gratis</title
    >
    <meta
        name="description"
        content="Baca komik, manga, manhua, manhwa bahasa Indonesia terbaru di {appName}. Update harian, kualitas HD, full color, tanpa daftar. Gratis dan cepat!"
    />
    <meta
        name="keywords"
        content="baca komik online, manhwa sub indo, manga bahasa indonesia, manhua full color, baca komik gratis, welltoon, komik terbaru, update komik"
    />
    <link rel="canonical" href={appUrl} />

    <!-- Open Graph / Social Sharing -->
    <meta
        property="og:title"
        content="{appName} - Baca Komik Online Bahasa Indonesia"
    />
    <meta
        property="og:description"
        content="Baca manhwa, manga, manhua sub Indo terbaru. Update harian, kualitas HD, gratis!"
    />
    <meta property="og:image" content={`${appUrl}/logo.jpg`} />
    <meta property="og:url" content={appUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={appName} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
        name="twitter:title"
        content="{appName} - Baca Komik Sub Indo Gratis"
    />
    <meta
        name="twitter:description"
        content="Manhwa, manga, manhua full color terbaru hanya di Welltoon. Update cepat, baca tanpa iklan!"
    />
    <meta name="twitter:image" content={`${appUrl}/logo.jpg`} />

    <!-- Schema Markup (Organization + WebSite) -->
    <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": {appName},
      "url": {appUrl},
      "description": "Platform baca komik online gratis dengan terjemahan bahasa Indonesia. Menyediakan manhwa, manga, manhua terbaru dan terpopuler.",
      "publisher": {
        "@type": "Organization",
        "name": {appName},
        "logo": {
          "@type": "ImageObject",
          "url": {`${appUrl}/logo.jpg`}
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {`${appUrl}/search?q={search_term_string}`},
        "query-input": "required name=search_term_string"
      }
    })}
    </script>
</svelte:head>
