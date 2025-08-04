<script>
    import { page } from "$app/stores";
    import { alertError } from "$lib/Alert";
    import ComicApi from "$lib/api/ComicApi";

    let comicType = $state("");
    let pageNumber = $state(1);
    let comics = $state([]);
    let size = $state(20);
    let totalPage = $state(0);
    let totalElement = $state(0);

    async function getAllComicByType() {
        const response = await ComicApi.getAllComicByType(
            comicType,
            pageNumber,
            size,
        );
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
    }

    $effect(() => {
        comicType = $page.params.type;
        getAllComicByType();
    });
</script>

{#if !comics}
    <CenterLoading />
{:else}
    <div class="m-2 min-h-screen">
        <!-- list type comic -->
        <div class="flex justify-center my-5">
            <div class="dropdown dropdown-center">
                <div
                    tabindex="0"
                    role="button"
                    class="bg-default p-1 text-white font-bold rounded cursor-pointer"
                >
                    Type
                </div>
                <ul
                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                    <li><a href="/comic/type/manga">Manga</a></li>
                    <li><a href="/comic/type/manhua">Manhua</a></li>
                    <li><a href="/comic/type/manhwa">Manhwa</a></li>
                </ul>
            </div>
        </div>

        <!-- comic update -->
        <div>
            <!-- list card comic -->
            <div
                class="grid grid-cols-2 md:grid-cols-5 gap-2 justify-items-center my-3"
            >
                {#each comics as comic (comic.id)}
                    <div class="md:max-w-48">
                        <a href={`/comic/${comic.id}`}>
                            <figure class="relative">
                                <img
                                    src={comic.cover_url}
                                    alt={comic.cover_filename}
                                    class="w-full h-56 object-cover rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
                                />
                                <p class="absolute bottom-1 right-2 text-lg">
                                    {#if comic.type == "manhua"}
                                        🇨🇳
                                    {:else if comic.type == "manga"}
                                        🇯🇵
                                    {:else}
                                        🇰🇷
                                    {/if}
                                </p>
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
