<script>
    import { goto } from "$app/navigation";
    import { alertError, alertSuccess } from "$lib/Alert.js";
    import ChapterApi from "$lib/api/ChapterApi.js";
    import ContentApi from "$lib/api/ContentApi.js";
    import CenterLoading from "../../../../../../components/CenterLoading.svelte";

    const { params } = $props();
    let comicId = params.comicId;
    let chapterNumber = $state(parseInt(params.number));
    let loading = $state(false);
    let chapter = $state(null);
    let comic = $state(null);
    let chapters = $state([]);
    let contents = $state([]);
    let inputFile = $state(null);

    async function getChapter() {
        const response = await ChapterApi.getChapter(comicId, chapterNumber);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            chapter = data;
            comic = data.comic;
            chapters = data.comic.chapters;
            contents = data.contents;
        } else {
            await alertError(responseBody.error);
        }
    }
    async function uploadContent(e) {
        e.preventDefault();
        loading = true;

        const files = Array.from(inputFile);
        let form = new FormData();
        files.forEach((file) => {
            form.append("contents", file);
        });

        const response = await ContentApi.addContent(comicId, chapter.id, form);
        const responseBody = await response.json();
        if (response.status === 201) {
            const data = responseBody.data;
            getChapter();
            loading = false;
            await alertSuccess("add contents success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }
    $effect(() => {
        getChapter();
    });
</script>

{#if !chapter}
    <CenterLoading />
{:else}
    <div>
        <button
            onclick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            class="fixed bottom-10 right-5 text-2xl opacity-75 cursor-pointer"
            >⬆️</button
        >
        <h1 class="text-center text-lg font-bold mt-5 text-default">
            {comic.title} Chapter {chapterNumber}
        </h1>

        <!-- add contents -->
        <div class="mt-3 flex justify-center">
            <form onsubmit={uploadContent} class="flex gap-2 items-center">
                <input
                    type="file"
                    multiple
                    bind:files={inputFile}
                    class="file-input file-input-sm focus:outline-0"
                    required
                />
                {#if loading == true}
                    <button
                        aria-label="loading"
                        disabled
                        class="bg-default p-1 rounded text-white font-bold"
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

        <div class="flex flex-col justify-center items-center gap-2 mt-3">
            <!-- pagination -->
            <div class="join">
                {#if chapterNumber != 1}
                    <button
                        onclick={() =>
                            goto(
                                `/admin/comic/${comicId}/chapter/${(chapterNumber -= 1)}`,
                            )}
                        class="join-item btn btn-sm">{"<"}</button
                    >
                {/if}
                <button class="join-item btn btn-sm btn-active"
                    >{chapterNumber}</button
                >
                {#if chapterNumber != chapters.length}
                    <button
                        onclick={() =>
                            goto(
                                `/admin/comic/${comicId}/chapter/${(chapterNumber += 1)}`,
                            )}
                        class="join-item btn btn-sm">{">"}</button
                    >
                {/if}
            </div>

            <!-- list chapter -->
            <div class="dropdown dropdown-center">
                <div
                    tabindex="0"
                    role="button"
                    class="text-sm bg-default text-white px-1 rounded cursor-pointer font-bold"
                >
                    list chapter
                </div>
                <ul
                    class="dropdown-content bg-base-100 rounded-box z-1 w-44 p-2 h-60 shadow-sm overflow-y-auto"
                >
                    {#each comic.chapters as chapter (chapter.id)}
                        <li
                            class="bg-default rounded my-1 p-1 text-xs font-bold text-white"
                        >
                            <a
                                onclick={() => (chapterNumber = chapter.number)}
                                href={`/admin/comic/${comicId}/chapter/${chapter.number}`}
                                class="block">Chapter {chapter.number}</a
                            >
                        </li>
                    {/each}
                </ul>
            </div>
        </div>

        <!-- list contents -->
        <div class="flex justify-center flex-col mt-3 min-h-screen">
            {#each contents as content (content.id)}
                <img
                    src={content.url}
                    alt={content.filename}
                    class="w-full"
                    loading="lazy"
                />
            {/each}
        </div>

        <!-- paging -->
        <div class="flex flex-col justify-center items-center gap-2 my-3">
            <!-- list chapter -->
            <div class="dropdown dropdown-center">
                <div
                    tabindex="0"
                    role="button"
                    class="text-sm bg-default text-white px-1 rounded cursor-pointer font-bold"
                >
                    list chapter
                </div>
                <ul
                    class="dropdown-content bg-base-100 rounded-box z-1 w-44 p-2 h-60 shadow-sm overflow-y-auto"
                >
                    {#each comic.chapters as chapter (chapter.id)}
                        <li
                            class="bg-default rounded my-1 p-1 text-xs font-bold text-white"
                        >
                            <a
                                onclick={() => (chapterNumber = chapter.number)}
                                href={`/admin/comic/${comicId}/chapter/${chapter.number}`}
                                class="block">Chapter {chapter.number}</a
                            >
                        </li>
                    {/each}
                </ul>
            </div>

            <!-- pagination -->
            <div class="join">
                {#if chapterNumber != 1}
                    <button
                        onclick={() =>
                            goto(
                                `/admin/comic/${comicId}/chapter/${(chapterNumber -= 1)}`,
                            )}
                        class="join-item btn btn-sm">{"<"}</button
                    >
                {/if}
                <button class="join-item btn btn-sm btn-active"
                    >{chapterNumber}</button
                >
                {#if chapterNumber != chapters.length}
                    <button
                        onclick={() =>
                            goto(
                                `/admin/comic/${comicId}/chapter/${(chapterNumber += 1)}`,
                            )}
                        class="join-item btn btn-sm">{">"}</button
                    >
                {/if}
            </div>
        </div>
    </div>
{/if}
