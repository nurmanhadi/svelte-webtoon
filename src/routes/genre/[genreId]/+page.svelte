<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { alertError } from "$lib/Alert";
    import GenreApi from "$lib/api/GenreApi";
    import CenterLoading from "../../../components/CenterLoading.svelte";

    let genreId = $state("");
    let genres = $state([]);
    let genre = $state(null);
    let pageNumber = $state(1);
    let size = $state(20);
    let totalPage = $state(0);
    let totalElement = $state(0);
    let comics = $state([]);

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
    async function getGenreById() {
        const response = await GenreApi.getById(genreId, pageNumber, size);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            genre = data;
            comics = data.comics.contents;
            pageNumber = data.comics.page;
            size = data.comics.size;
            totalElement = data.comics.total_element;
            totalPage = data.comics.total_page;
        } else {
            await alertError(responseBody.error);
        }
    }
    $effect(() => {
        const genreID = $page.params.genreId;
        genreId = genreID;
        getAllGenres();
        getGenreById();
    });
</script>

{#if !genres}
    <CenterLoading />
{:else}
    <div>
        <!-- list genres -->
        <div class="flex justify-center my-5">
            <!-- Open the modal using ID.showModal() method -->
            <button class="btn" onclick={() => genre_modal.showModal()}
                >List Genre</button
            >
            <dialog id="genre_modal" class="modal">
                <div class="modal-box">
                    <ul>
                        {#each genres as gn (gn.id)}
                            <li class="border-b border-default p-1 mb-1">
                                <button
                                    onclick={() => {
                                        goto(`/genre/${gn.id}`);
                                        document
                                            .getElementById("genre_modal")
                                            .close();
                                    }}
                                    class="cursor-pointer w-full text-left"
                                >
                                    {gn.name}
                                </button>
                            </li>
                        {/each}
                    </ul>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>

        <!-- list card comic -->
        <div
            class="grid grid-cols-2 md:grid-cols-5 gap-2 justify-items-center my-3 px-2"
        >
            {#each comics as comic (comic.id)}
                <div class="md:max-w-48 w-full">
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
{/if}
