<script>
    import { alertError } from "$lib/Alert";
    import ComicApi from "$lib/api/ComicApi";
    import CenterLoading from "../CenterLoading.svelte";

    let comics = $state([]);
    let page = $state(1);
    let size = $state(20);
    let totalPage = $state(0);
    let totalElement = $state(0);

    async function getAllComicUpdate() {
        const response = await ComicApi.getAllComic(page, size);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            console.log(data);
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

{#if comics == []}
    <CenterLoading />
{:else}
    <div class="m-2 min-h-screen">
        <h1 class="my-2 text-center bg-default font-bold text-white rounded">
            Last Update
        </h1>

        <!-- list card comic -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2 justify-items-center">
            {#each comics as comic (comic.id)}
                <div class="md:max-w-48">
                    <a href="/#">
                        <figure>
                            <img
                                src={comic.cover_url}
                                alt={comic.cover_filename}
                                class="w-full h-56 object-cover rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
                            />
                        </figure>
                    </a>
                    <a
                        href="/#"
                        class="text-default leading-none my-2 min-h-8 font-bold text-center line-clamp-2"
                    >
                        {comic.title}
                    </a>
                    <ul>
                        {#each comic.chapters as chapter (chapter.id)}
                            <li
                                class="bg-default p-1 rounded text-sm text-white font-bold mb-1"
                            >
                                <a href="#/" class="block"
                                    >Chapter {chapter.number}</a
                                >
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>
    </div>
{/if}
