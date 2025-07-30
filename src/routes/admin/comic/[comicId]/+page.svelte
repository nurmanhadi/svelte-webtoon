<script>
    import { alertError, alertSuccess } from "$lib/Alert";
    import ChapterApi from "$lib/api/ChapterApi";
    import ComicApi from "$lib/api/ComicApi";
    import ComicGenreApi from "$lib/api/ComicGenreApi";
    import GenreApi from "$lib/api/GenreApi";
    import CenterLoading from "../../../../components/CenterLoading.svelte";

    const { params } = $props();

    const comicId = params.comicId;
    let comic = $state(null);

    let loading = $state(false);
    let cover = $state(null);
    let title = $state("");
    let synopsis = $state("");
    let author = $state("");
    let artist = $state("");
    let type = $state("");

    let genres = $state([]);
    let genreId = $state(0);

    let chapterNumber = $state(0);
    let publishNumber = $state(false);

    async function getComic() {
        const response = await ComicApi.getComicById(comicId);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            comic = data;
        } else {
            await alertError(responseBody.error);
        }
    }
    async function updateComic(e) {
        e.preventDefault();
        loading = true;

        let form = new FormData();
        form.append("cover", cover);
        form.append("title", title);
        form.append("synopsis", synopsis);
        form.append("author", author);
        form.append("artist", artist);
        form.append("type", type);

        const response = await ComicApi.updateComic(comicId, form);
        const responseBody = await response.json();
        if (response.status === 200) {
            document.getElementById("modal_update_comic").close();
            getComic();
            loading = false;
            await alertSuccess("comic update success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }
    async function getAllGenres() {
        const response = await GenreApi.getAllGenre();
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            genres = data;
        } else {
            await alertError(responseBody.error);
        }
    }
    async function addComicGenre(e) {
        e.preventDefault();
        loading = true;

        const response = await ComicGenreApi.addComicGenre(comicId, genreId);
        const responseBody = await response.json();
        if (response.status === 201) {
            getComic();
            genreId = 0;
            loading = false;
            await alertSuccess("add genre success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }
    async function removeComicGenre(genreID) {
        loading = true;

        const response = await ComicGenreApi.deleteComicGenre(comicId, genreID);
        const responseBody = await response.json();
        if (response.status === 200) {
            getComic();
            genreId = 0;
            loading = false;
            await alertSuccess("remove genre success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }
    async function addChapter(e) {
        e.preventDefault();
        loading = true;

        const response = await ChapterApi.addChapter(comicId, chapterNumber);
        const responseBody = await response.json();
        if (response.status === 201) {
            getComic();
            genreId = 0;
            loading = false;
            await alertSuccess("add chapter success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }
    async function deleteChapter(chapterId) {
        loading = true;

        const response = await ChapterApi.deleteChapter(comicId, chapterId);
        const responseBody = await response.json();
        if (response.status === 200) {
            getComic();
            genreId = 0;
            loading = false;
            await alertSuccess("delete chapter success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }
    async function publishChapter(chapterId, publish) {
        loading = true;

        if (publish == true) {
            publishNumber = false;
        } else {
            publishNumber = true;
        }

        const response = await ChapterApi.publishChapter(
            comicId,
            chapterId,
            publishNumber,
        );
        const responseBody = await response.json();
        if (response.status === 200) {
            getComic();
            genreId = 0;
            loading = false;
            await alertSuccess("publish chapter success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }

    $effect(() => {
        getComic();
        getAllGenres();
    });
</script>

{#if comic == null}
    <CenterLoading />
{:else}
    <div>
        <!-- detail comic -->
        <div class="m-2">
            <figure>
                <img
                    src={comic.cover_url}
                    alt={comic.cover_filename}
                    class="w-full h-56 object-cover"
                />
            </figure>
            <h1 class="text-center text-default mt-3 text-lg font-bold">
                {comic.title}
            </h1>
            <p class="text-sm text-center text-default">
                {comic.author}, {comic.artist}
            </p>
            <div class="flex gap-2 my-2">
                {#each comic.genres as genre (genre.id)}
                    <div>
                        <a
                            href="/#"
                            class="p-1 bg-default text-xs rounded text-white font-bold"
                            >{genre.name}</a
                        >
                        {#if loading == false}
                            <button
                                onclick={() => removeComicGenre(genre.id)}
                                class="bg-red-500 rounded-full px-1 text-xs text-white font-bold cursor-pointer hover:bg-white hover:text-red-500"
                                >X</button
                            >
                        {:else}
                            <button
                                aria-label="loading"
                                disabled
                                class="bg-red-500 rounded-full px-1 text-xs text-white font-bold cursor-pointer hover:bg-white hover:text-red-500"
                                ><span
                                    class="loading loading-spinner loading-xs"
                                ></span></button
                            >
                        {/if}
                    </div>
                {/each}
            </div>
            <h3 class="text-sm text-default mb-2 font-bold">
                Type: {comic.type}
            </h3>
            <p class="text-sm text-default">{comic.synopsis}</p>

            <div class="flex gap-2 mt-5 items-center">
                <!-- update comic -->
                <div>
                    <!-- Open the modal using ID.showModal() method -->
                    <button
                        class="btn btn-sm text-white bg-default font-bold"
                        onclick={() => modal_update_comic.showModal()}
                        >update</button
                    >
                    <dialog id="modal_update_comic" class="modal">
                        <div class="modal-box">
                            <form class="w-full px-3" onsubmit={updateComic}>
                                <div class="mb-3 flex justify-center flex-col">
                                    <!-- input file -->
                                    <div>
                                        <label
                                            for="cover"
                                            class="text-default font-bold text-sm"
                                            >Cover</label
                                        >
                                        <input
                                            id="cover"
                                            type="file"
                                            placeholder="cover"
                                            class="file-input file-input-sm w-full mb-3 focus-within:outline-0"
                                            onchange={(e) =>
                                                (cover = e.target.files[0])}
                                        />
                                    </div>
                                    <!-- input title -->
                                    <input
                                        type="text"
                                        placeholder="title"
                                        class="text-default font-bold p-1 outline-0 border-default border-b-2 mb-3"
                                        bind:value={title}
                                    />
                                    <!-- input synopsis -->
                                    <div class="mb-3">
                                        <textarea
                                            placeholder="synopsis"
                                            rows="4"
                                            maxlength="255"
                                            class="text-default font-bold p-1 outline-0 border-2 w-full rounded border-default"
                                            bind:value={synopsis}
                                        ></textarea>
                                        <p class="text-xs">
                                            {synopsis.length}/255
                                        </p>
                                    </div>
                                    <!-- input author -->
                                    <input
                                        type="text"
                                        placeholder="author"
                                        class="text-default font-bold p-1 outline-0 border-default border-b-2 mb-3"
                                        bind:value={author}
                                    />
                                    <!-- input artist -->
                                    <input
                                        type="text"
                                        placeholder="artist"
                                        class="text-default font-bold p-1 outline-0 border-default border-b-2 mb-3"
                                        bind:value={artist}
                                    />
                                    <!-- input type -->
                                    <label
                                        class="select select-sm w-44 border border-default focus-within:outline-0 text-default font-bold"
                                    >
                                        <span class="label">Type</span>
                                        <select bind:value={type}>
                                            <option value="manga">Manga</option>
                                            <option value="manhua"
                                                >Manhua</option
                                            >
                                            <option value="manhwa"
                                                >Manhwa</option
                                            >
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
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>

                <!-- add genre -->
                <div class="dropdown dropdown-top">
                    <div
                        tabindex="0"
                        role="button"
                        class="btn btn-sm text-white bg-default font-bold"
                    >
                        add genre
                    </div>
                    <ul
                        class="dropdown-content menu bg-base-100 rounded-box z-1 w-64 p-2 shadow-sm"
                    >
                        <form class="flex gap-1" onsubmit={addComicGenre}>
                            <label
                                class="select select-sm border border-default focus-within:outline-0 text-default font-bold"
                            >
                                <span class="label">Genre</span>
                                <select bind:value={genreId}>
                                    {#each genres as genre (genre.id)}
                                        <option value={genre.id}
                                            >{genre.name}</option
                                        >
                                    {/each}
                                </select>
                            </label>
                            {#if loading == false}
                                <button
                                    class="px-2 bg-default text-white text-sm font-bold rounded cursor-pointer"
                                    type="submit">add</button
                                >
                            {:else}
                                <button
                                    aria-label="loading"
                                    disabled="disabled"
                                    class="px-2 bg-default text-white text-sm font-bold rounded"
                                    ><span
                                        class="loading loading-spinner loading-xs"
                                    ></span></button
                                >
                            {/if}
                        </form>
                    </ul>
                </div>
            </div>
        </div>

        <!-- list chapter -->
        <div class="mt-5 mx-2">
            <h1
                class="text-center rounded text-lg bg-default text-white font-bold"
            >
                Chapter
            </h1>

            <!-- add chapter -->
            <div class="mt-5">
                <form
                    onsubmit={addChapter}
                    class="flex gap-2 items-center justify-center"
                >
                    <input
                        type="number"
                        placeholder="number of chapter"
                        class="border-default text-default border-b-2 outline-0"
                        bind:value={chapterNumber}
                        required
                    />
                    {#if loading == false}
                        <button
                            class="bg-default px-1 rounded text-white font-bold cursor-pointer"
                            >Add</button
                        >
                    {:else}
                        <button
                            aria-label="loading"
                            disabled
                            class="bg-default px-1 rounded text-white font-bold"
                            ><span class="loading loading-spinner loading-xs"
                            ></span></button
                        >
                    {/if}
                </form>
            </div>

            <div class="flex justify-center my-5">
                <ul class=" p-2 w-64 rounded-md h-64 overflow-y-auto">
                    {#each comic.chapters as chapter (chapter.id)}
                        <li
                            class="bg-default rounded my-1 text-sm font-bold p-1 text-white flex justify-between"
                        >
                            <a
                                href={`/admin/comic/${comicId}/chapter/${chapter.number}`}
                                class="block">Chapter {chapter.number}</a
                            >
                            <div>
                                <!-- publish -->
                                {#if loading == false}
                                    <button
                                        onclick={() =>
                                            publishChapter(
                                                chapter.id,
                                                chapter.publish,
                                            )}
                                        class={`cursor-pointer px-1 rounded ${chapter.publish ? "bg-green-500" : "bg-yellow-500"}`}
                                        >Publish</button
                                    >
                                {:else}
                                    <button
                                        aria-label="loading"
                                        disabled
                                        class={`cursor-pointer px-1 rounded ${chapter.publish ? "bg-green-500" : "bg-yellow-500"}`}
                                        ><span
                                            class="loading loading-spinner loading-xs"
                                        ></span></button
                                    >
                                {/if}

                                <!-- delete -->
                                {#if loading == false}
                                    <button
                                        onclick={() =>
                                            deleteChapter(chapter.id)}
                                        class="hover:text-red-500 hover:bg-white cursor-pointer bg-red-500 px-1 rounded"
                                        >Delete</button
                                    >
                                {:else}
                                    <button
                                        aria-label="loading"
                                        disabled
                                        class="hover:text-red-500 hover:bg-white bg-red-500 px-1 rounded"
                                        ><span
                                            class="loading loading-spinner loading-xs"
                                        ></span></button
                                    >
                                {/if}
                            </div>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
{/if}
