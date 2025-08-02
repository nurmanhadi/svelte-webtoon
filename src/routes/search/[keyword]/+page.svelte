<script>
    import { alertError } from "$lib/Alert";
    import ComicApi from "$lib/api/ComicApi";
    import { get } from "svelte/store";
    import CenterLoading from "../../../components/CenterLoading.svelte";
    import { page } from "$app/stores";

    let comics = $state([]);
    let pageNumber = $state(1);
    let size = $state(1);
    let totalPage = $state(0);
    let totalElement = $state(0);

    async function getAllComicUpdate() {}

    $effect(async () => {
        const keyword = $page.params.keyword;
        const response = await ComicApi.searchComic(keyword, pageNumber, size);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            comics = data.contents;
            pageNumber = data.page;
            size = data.size;
            totalElement = data.total_element;
            totalPage = data.total_page;
        } else {
            await alertError(responseBody.error);
        }
    });
</script>

{#if !comics}
    <CenterLoadingg />
{:else if comics.length == 0}
    <h1 class="my-10 text-center">comic not found</h1>
{:else}
    <div class="m-2 min-h-screen">
        <!-- comic update -->
        <div>
            <div
                class="flex justify-between items-center my-3 bg-default px-1 rounded"
            >
                <h1 class="font-bold text-lg text-white">Update</h1>
                <a href="/comic/page/1" class="text-xs text-white rounded"
                    >VIEW ALL</a
                >
            </div>

            <!-- list card comic -->
            <div
                class="grid grid-cols-2 md:grid-cols-5 gap-2 justify-items-center my-3"
            >
                {#each comics as comic (comic.id)}
                    <div class="md:max-w-48">
                        <a href={`/comic/${comic.id}`}>
                            <figure>
                                <img
                                    src={comic.cover_url}
                                    alt={comic.cover_filename}
                                    class="w-full h-56 object-cover rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
                                />
                            </figure>
                        </a>
                        <a
                            href={`/comic/${comic.id}`}
                            class="text-default leading-none my-2 min-h-8 font-bold text-center line-clamp-2"
                        >
                            {comic.title}
                        </a>
                    </div>
                {/each}
            </div>

            <!-- pagination -->
            <div class="flex gap-2 my-5 justify-center">
                {#if pageNumber == 1}
                    <button
                        disabled
                        class="bg-default text-white font-bold py-1 px-2 rounded opacity-50"
                        >{"<"} Prev</button
                    >
                {:else}
                    <button
                        onclick={() => (pageNumber -= 1)}
                        class="bg-default text-white font-bold py-1 px-2 rounded"
                        >{"<"} Prev</button
                    >
                {/if}
                {#if pageNumber == totalPage}
                    <button
                        disabled
                        class="bg-default text-white font-bold py-1 px-2 rounded opacity-50"
                        >Next {">"}</button
                    >
                {:else}
                    <button
                        onclick={() => (pageNumber += 1)}
                        class="bg-default text-white font-bold py-1 px-2 rounded"
                        >Next {">"}</button
                    >
                {/if}
            </div>
        </div>
    </div>
{/if}
