<script>
    import Navbar from "../../components/Navbar.svelte";
    import Footer from "../../components/Footer.svelte";
    const { children } = $props();
</script>

<div>
    <div>
        <Navbar />
    </div>
    <main class="min-h-screen">
        {@render children()}
    </main>
    <div>
        <Footer />
    </div>
</div>
