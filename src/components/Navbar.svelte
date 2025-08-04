<script>
    import defaultProfile from "../assets/user-icon.svg";
    import { jwtDecode } from "jwt-decode";
    import { role } from "$lib/role";
    import { goto } from "$app/navigation";
    let token = $state("");
    let userRole = $state("");
    let searchKeyword = $state("");

    $effect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken != null && accessToken != "") {
            token = accessToken;
            userRole = jwtDecode(accessToken).role;
        }
    });
</script>

<div class="navbar bg-default shadow-sm">
    <div class="flex-1">
        <a href="/" class="flex gap-1 items-center">
            <h1 class="text-2xl font-bold text-white">Welltoon</h1>
        </a>
    </div>
    <div class="flex gap-3 items-center">
        <!-- search 1 -->
        <form
            action={`/search/${searchKeyword}`}
            class="bg-white rounded-sm p-1 hidden md:flex items-center gap-1"
        >
            <input
                bind:value={searchKeyword}
                type="text"
                placeholder="Search"
                class="outline-none"
                required
            />
            <button type="submit">🔍</button>
        </form>

        <!-- search 2 -->
        <div class="dropdown dropdown-end flex items-center md:hidden">
            <button tabindex="0" class="bg-white p-1 rounded-full w-8 h-8"
                >🔍</button
            >
            <ul
                class="dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm top-12"
            >
                <form
                    action={`/search/${searchKeyword}`}
                    class="bg-white rounded-sm p-1 flex items-center gap-1"
                >
                    <input
                        bind:value={searchKeyword}
                        type="text"
                        placeholder="Search"
                        class="outline-none"
                        required
                    />
                    <button type="submit">🔍</button>
                </form>
            </ul>
        </div>

        <!-- account -->
        <div class="dropdown dropdown-end flex items-center">
            <button tabindex="0">
                <figure class="bg-base-100 rounded-full cursor-pointer">
                    <img
                        src={defaultProfile}
                        alt="logo"
                        class="h-10 w-10 rounded-full"
                    />
                </figure>
            </button>
            {#if userRole === role.admin}
                <!-- khusus admin -->
                <ul
                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm top-13"
                >
                    <li class="mb-1 rounded bg-default text-white font-bold">
                        <a href="/#">Dashboard</a>
                    </li>
                    <li class="mb-1 rounded bg-default text-white font-bold">
                        <a href="/admin/comic">Comic</a>
                    </li>
                    <li class="mb-1 rounded bg-default text-white font-bold">
                        <a href="/admin/genre">Genre</a>
                    </li>
                    <hr class="my-3 opacity-50 border-default" />
                    <button
                        onclick={() => goto("/auth/logout")}
                        class="btn bg-red-500 shadow-none text-white"
                        >Logout</button
                    >
                </ul>
            {:else}
                <!-- khusus user atau public -->
                <ul
                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm top-13"
                >
                    <li class="mb-1 rounded bg-default text-white font-bold">
                        <a href="/#">Profile</a>
                    </li>
                    <li class="mb-1 rounded bg-default text-white font-bold">
                        <a href="/genre/1">Genre</a>
                    </li>
                    <li class="mb-1 rounded bg-default text-white font-bold">
                        <a href="/#">Pasang Iklan</a>
                    </li>
                    <hr class="my-3 opacity-50 border-default" />
                    {#if token === ""}
                        <button
                            onclick={() => goto("/auth/login")}
                            class="btn bg-default shadow-none text-white"
                            >Login</button
                        >
                    {:else}
                        <button
                            onclick={() => goto("/auth/logout")}
                            class="btn bg-red-500 shadow-none text-white"
                            >Logout</button
                        >
                    {/if}
                </ul>
            {/if}
        </div>
    </div>
</div>
