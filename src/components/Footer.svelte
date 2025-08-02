<script>
    const appName = import.meta.env.VITE_APP_NAME;
</script>

<footer class="bg-default text-white py-8 px-4 sm:px-8">
    <div
        class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
    >
        <aside class="text-center sm:text-left">
            <p class="text-sm">
                � {new Date().getFullYear()}
                <span class="font-semibold">Welltoon</span>. All rights
                reserved.
            </p>
            <p class="text-xs text-white/80">
                Baca komik, manga, manhua, manhwa bahasa Indonesia terbaru di {appName}.
                Update harian, kualitas HD, full color, tanpa daftar. Gratis dan
                cepat!
            </p>
        </aside>
    </div>
</footer>
