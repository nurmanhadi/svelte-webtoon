<script>
    import { alertError } from "$lib/Alert";
    import ComicApi from "$lib/api/ComicApi";
    import CenterLoading from "../CenterLoading.svelte";
    import ListComicPopulerDaily from "./ListComicPopulerDaily.svelte";

    let comics = $state([]);
    let page = $state(1);
    let size = $state(20);

    async function getAllComicUpdate() {
        const response = await ComicApi.getAllComic(page, size);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            comics = data.contents;
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
    <div>
        <!-- list comic daily populer -->
        <ListComicPopulerDaily />

        <!-- comic update -->
        <div>
            <div class="flex justify-between items-center my-3 bg-default px-2">
                <h1 class="font-bold text-lg text-white">Update</h1>
                <a href="/comic/page/1" class="text-xs text-white rounded"
                    >VIEW ALL</a
                >
            </div>

            <!-- list card comic -->
            <div
                class="grid grid-cols-2 md:grid-cols-5 gap-2 justify-items-center"
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
        </div>
    </div>
{/if}
