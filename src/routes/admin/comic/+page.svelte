<script>
    import { goto } from "$app/navigation";
    import { alertError, alertSuccess } from "$lib/Alert";
    import ComicApi from "$lib/api/ComicApi";
    import CenterLoading from "../../../components/CenterLoading.svelte";

    let loading = $state(false);
    let comics = $state([]);
    let page = $state(1);
    let size = $state(10);
    let totalPage = $state(0);
    let totalElement = $state(0);

    let cover = $state(null);
    let title = $state("");
    let synopsis = $state("");
    let author = $state("");
    let artist = $state("");
    let type = $state("");

    async function getAllComic() {
        const response = await ComicApi.getAllComic(page, size);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            comics = data.contents;
            page = data.page;
            size = data.size;
            totalPage = data.total_page;
            totalElement = data.total_element;
        } else {
            await alertError(responseBody.error);
        }
    }
    async function addComic(e) {
        e.preventDefault();
        loading = true;

        let form = new FormData();
        form.append("cover", cover);
        form.append("title", title);
        form.append("synopsis", synopsis);
        form.append("author", author);
        form.append("artist", artist);
        form.append("type", type);

        const response = await ComicApi.addComic(form);
        const responseBody = await response.json();
        if (response.status === 201) {
            await alertSuccess("comic add success");
            getAllComic();
            loading = false;
        } else {
            await alertError(responseBody.error);
            loading = false;
        }
    }
    $effect(() => {
        getAllComic();
    });
</script>

{#if comics === []}
    <CenterLoading />
{:else}
    <div class="md:grid md:grid-cols-2 md:gap-2">
        <!-- add comic -->
        <div class="m-2">
            <h1
                class="text-center font-bold text-white text-lg bg-default rounded mb-2"
            >
                Add Comic
            </h1>
            <form class="w-full px-3" onsubmit={addComic}>
                <div class="mb-3 flex justify-center flex-col">
                    <!-- input file -->
                    <div>
                        <label
                            for="cover"
                            class="text-default font-bold text-sm">Cover</label
                        >
                        <input
                            id="cover"
                            type="file"
                            placeholder="cover"
                            class="file-input file-input-sm w-full mb-3 focus-within:outline-0"
                            onchange={(e) => (cover = e.target.files[0])}
                            required
                        />
                    </div>
                    <!-- input title -->
                    <input
                        type="text"
                        placeholder="title"
                        class="text-default font-bold p-1 outline-0 border-default border-b-2 mb-3"
                        bind:value={title}
                        required
                    />
                    <!-- input synopsis -->
                    <div class="mb-3">
                        <textarea
                            placeholder="synopsis"
                            rows="4"
                            maxlength="255"
                            class="text-default font-bold p-1 outline-0 border-2 w-full rounded border-default"
                            bind:value={synopsis}
                            required
                        ></textarea>
                        <p class="text-xs">{synopsis.length}/255</p>
                    </div>
                    <!-- input author -->
                    <input
                        type="text"
                        placeholder="author"
                        class="text-default font-bold p-1 outline-0 border-default border-b-2 mb-3"
                        bind:value={author}
                        required
                    />
                    <!-- input artist -->
                    <input
                        type="text"
                        placeholder="artist"
                        class="text-default font-bold p-1 outline-0 border-default border-b-2 mb-3"
                        bind:value={artist}
                        required
                    />
                    <!-- input type -->
                    <label
                        class="select select-sm w-44 border border-default focus-within:outline-0 text-default font-bold"
                    >
                        <span class="label">Type</span>
                        <select bind:value={type}>
                            <option value="manga">Manga</option>
                            <option value="manhua">Manhua</option>
                            <option value="manhwa">Manhwa</option>
                        </select>
                    </label>
                    <div class="flex justify-center mt-5">
                        {#if loading == false}
                            <button
                                type="submit"
                                class="btn bg-default w-full font-bold rounded-2xl text-white shadow-none"
                                >Submit</button
                            >
                        {:else}
                            <button
                                aria-label="Loading"
                                disabled="disabled"
                                class="btn bg-default w-full font-bold rounded-2xl text-white shadow-none"
                                ><span
                                    class="loading loading-spinner loading-sm"
                                ></span></button
                            >
                        {/if}
                    </div>
                </div>
            </form>
        </div>

        <!-- list comics -->
        <div class="m-2">
            <h1
                class="text-center font-bold text-white text-lg bg-default rounded mb-2"
            >
                List Comic
            </h1>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each comics as comic (comic.id)}
                            <tr>
                                <td>{comic.title}</td>
                                <td>{comic.type}</td>
                                <td
                                    ><button
                                        onclick={() =>
                                            goto(`/admin/comic/${comic.id}`)}
                                        class="btn shadow-none bg-default btn-sm text-white"
                                        >Detail</button
                                    ></td
                                >
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="join my-3 flex justify-center">
                {#if page != 1}
                    <button onclick={() => (page -= 1)} class="join-item btn"
                        ><p>{"<"}</p></button
                    >
                {/if}
                <button class="join-item btn btn-active">{page}</button>
                {#if page != totalPage}
                    <button onclick={() => (page += 1)} class="join-item btn"
                        ><p>{">"}</p></button
                    >
                {/if}
            </div>
        </div>
    </div>
{/if}
