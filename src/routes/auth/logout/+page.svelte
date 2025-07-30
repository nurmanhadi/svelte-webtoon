<script>
    import { goto } from "$app/navigation";

    $effect(() => {
        const token = localStorage.getItem("access_token");
        if (token == "" && token == null) {
            goto("/");
        } else {
            localStorage.setItem("access_token", "");
            goto("/");
        }
    });
</script>
