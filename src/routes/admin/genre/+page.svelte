<script>
    import { alertError, alertSuccess } from "$lib/Alert";
    import GenreApi from "$lib/api/GenreApi";
    import CenterLoading from "../../../components/CenterLoading.svelte";

    let loading = $state(false);
    let genres = $state([]);
    let name = $state("");

    async function getAllGenres() {
        const response = await GenreApi.getAllGenre();
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            genres = data;
            genres.sort((a, b) => a.name > b.name);
        } else {
            await alertError(responseBody.error);
        }
    }
    async function addGenre(e) {
        e.preventDefault();
        loading = true;
        const response = await GenreApi.addGenre(name);
        const responseBody = await response.json();
        if (response.status === 201) {
            getAllGenres();
            name = "";
            loading = false;
            await alertSuccess("add genre success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }
    async function deleteGenre(genreId) {
        loading = true;
        const response = await GenreApi.deleteGenre(genreId);
        const responseBody = await response.json();
        if (response.status === 200) {
            getAllGenres();
            loading = false;
            await alertSuccess("delete genre success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }
    $effect(() => {
        getAllGenres();
    });
</script>

<div>
    <!-- add genre -->
    <div class="p-2 flex justify-center">
        <form
            onsubmit={addGenre}
            class="flex justify-center gap-2 items-center"
        >
            <input
                bind:value={name}
                type="text"
                placeholder="name"
                class="outline-0 border-b-2 border-default text-default font-bold"
                required
            />
            {#if loading == true}
                <button
                    aria-label="loading"
                    disabled
                    class="bg-default p-1 rounded text-white font-bold cursor-pointer"
                    ><span class="loading loading-spinner loading-xs"
                    ></span></button
                >
            {:else}
                <button
                    type="submit"
                    class="bg-default p-1 rounded text-white font-bold cursor-pointer"
                    >Add</button
                >
            {/if}
        </form>
    </div>

    <!-- list genre -->
    {#if genres === []}
        <CenterLoading />
    {:else}
        <div class="overflow-x-auto md:flex md:justify-center mt-3">
            <table class="table md:w-96">
                <!-- head -->
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {#each genres as genre, index}
                        <tr>
                            <th>{index + 1}</th>
                            <th>{genre.name}</th>
                            <th>
                                {#if loading == true}
                                    <button
                                        aria-label="loading"
                                        disabled
                                        class="bg-red-500 p-1 rounded text-white font-bold cursor-pointer"
                                        ><span
                                            class="loading loading-spinner loading-xs"
                                        ></span></button
                                    >
                                {:else}
                                    <button
                                        onclick={() => deleteGenre(genre.id)}
                                        class="bg-red-500 p-1 rounded text-white font-bold cursor-pointer"
                                        >Delete</button
                                    >
                                {/if}
                            </th>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
</div>
