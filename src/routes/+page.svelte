<script>
    import ListComicUpdate from "../components/comic/ListComicUpdate.svelte";
    import Footer from "../components/Footer.svelte";
    import Navbar from "../components/Navbar.svelte";
</script>

<div>
    <div>
        <Navbar />
    </div>
    <main class="min-h-screen">
        <ListComicUpdate />
    </main>
    <div>
        <Footer />
    </div>
</div>
