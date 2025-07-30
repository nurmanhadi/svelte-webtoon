<script>
    import Footer from "../../components/Footer.svelte";
    let { children } = $props();
</script>

<div>
    <main class="min-h-screen">
        {@render children()}
    </main>
    <div>
        <Footer />
    </div>
</div>
