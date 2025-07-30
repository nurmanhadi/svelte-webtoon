<script>
    import { goto } from "$app/navigation";
    import { alertError, alertSuccess } from "$lib/Alert";
    import AuthApi from "$lib/api/AuthApi";

    const input = $state({
        username: "",
        password: "",
    });
    let loading = $state(false);

    async function handleSubmit(e) {
        loading = true;
        e.preventDefault();
        const response = await AuthApi.register(input);
        const responseBody = await response.json();
        if (response.status === 201) {
            input.username = "";
            input.password = "";
            loading = false;
            alertSuccess("register success");
            goto("/auth/login");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }
</script>

<div class="flex justify-center items-center min-h-screen p-5">
    <form
        onsubmit={handleSubmit}
        class="rounded-lg bg-default shadow-md p-3 w-full md:w-96"
    >
        <h1 class="text-center mt-5 mb-10 font-bold text-4xl text-white">
            REGISTER
        </h1>
        <div class="mb-3 flex justify-center flex-col">
            <input
                id="username"
                type="text"
                placeholder="Username"
                bind:value={input.username}
                class="input input-md border-none focus:outline-0 text-default font-bold rounded-lg mb-3 w-full"
                required
            />
            <input
                id="username"
                type="password"
                placeholder="Password"
                bind:value={input.password}
                class="input input-md border-none focus:outline-0 text-default font-bold rounded-lg w-full"
                required
            />
        </div>
        <div class="flex justify-center mt-5">
            {#if loading == false}
                <button
                    type="submit"
                    class="btn bg-white w-full font-bold rounded-2xl text-default shadow-none"
                    >Register</button
                >
            {:else}
                <button
                    aria-label="Loading"
                    disabled="disabled"
                    class="btn bg-white w-full font-bold rounded-2xl text-default shadow-none"
                    ><span class="loading loading-spinner loading-sm"
                    ></span></button
                >
            {/if}
        </div>
        <h3 class="text-center my-3 text-sm text-white">
            Have account? <a href="/auth/login">login</a>
        </h3>
    </form>
</div>
