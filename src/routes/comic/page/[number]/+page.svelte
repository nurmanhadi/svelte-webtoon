<script>
    import { goto } from "$app/navigation";
    import { alertError } from "$lib/Alert.js";
    import ComicApi from "$lib/api/ComicApi.js";
    import CenterLoading from "../../../../components/CenterLoading.svelte";

    const { params } = $props();
    let page = $state(parseInt(params.number));
    let comics = $state([]);
    let size = $state(20);
    let totalPage = $state(0);
    let totalElement = $state(0);

    async function getAllComicUpdate() {
        const response = await ComicApi.getAllComic(page, size);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            comics = data.contents;
            page = data.page;
            size = data.size;
            totalElement = data.total_element;
            totalPage = data.total_page;
        } else {
            await alertError(responseBody.error);
        }
    }

    $effect(() => {
        getAllComicUpdate();
    });
</script>

{#if !comics}
    <CenterLoading />
{:else}
    <div class="m-2 min-h-screen">
        <!-- comic update -->
        <div>
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
                        <ul>
                            {#each comic.chapters as chapter (chapter.id)}
                                <li
                                    class="bg-default p-1 rounded text-sm text-white font-bold mb-1"
                                >
                                    <a
                                        href={`/comic/${comic.id}/chapter/${chapter.number}`}
                                        class="block"
                                        >Chapter {chapter.number}</a
                                    >
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>

            <!-- pagination -->
            <div class="flex gap-2 my-5 justify-center">
                {#if page == 1}
                    <button
                        disabled
                        class="bg-default text-white font-bold py-1 px-2 rounded opacity-50"
                        >{"<"} Prev</button
                    >
                {:else}
                    <button
                        onclick={() => {
                            page -= 1;
                            goto(`/comic/page/${page}`);
                        }}
                        class="bg-default text-white font-bold py-1 px-2 rounded"
                        >{"<"} Prev</button
                    >
                {/if}
                {#if page == totalPage}
                    <button
                        disabled
                        class="bg-default text-white font-bold py-1 px-2 rounded opacity-50"
                        >Next {">"}</button
                    >
                {:else}
                    <button
                        onclick={() => {
                            page += 1;
                            goto(`/comic/page/${page}`);
                        }}
                        class="bg-default text-white font-bold py-1 px-2 rounded"
                        >Next {">"}</button
                    >
                {/if}
            </div>
        </div>
    </div>
{/if}
