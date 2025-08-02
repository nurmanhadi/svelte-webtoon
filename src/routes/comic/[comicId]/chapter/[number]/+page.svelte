<script>
    import { goto } from "$app/navigation";
    import { alertError } from "$lib/Alert.js";
    import ChapterApi from "$lib/api/ChapterApi.js";
    import CenterLoading from "../../../../../components/CenterLoading.svelte";
    import CustomHeadContent from "../../../../../components/comic/CustomHeadContent.svelte";

    const { params } = $props();
    const comicId = $state(params.comicId);
    let chapterNumber = $state(parseInt(params.number));

    let chapter = $state(null);
    let chapters = $state([]);
    let comic = $state(null);
    let contents = $state([]);

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

    $effect(() => {
        getChapter();
    });
</script>

{#if !chapter}
    <CenterLoading />
{:else}
    <!-- html head -->
    <CustomHeadContent {comic} {chapterNumber} />

    <div class="min-h-screen">
        <button
            onclick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            class="fixed bottom-10 right-5 text-2xl opacity-75 cursor-pointer"
            >⬆️</button
        >

        <div class="m-2">
            <h1
                class="text-center my-10 text-xl leading-none text-default font-bold"
            >
                Baca {comic.title} Chapter {chapterNumber} Bahasa Indonesia
            </h1>
            <p class="text-default text-justify">
                Baca <strong>{comic.title} Chapter {chapterNumber}</strong>
                dalam terjemahan bahasa Indonesia di <strong>Welltoon</strong>. {comic.type}
                populer ini update setiap hari dengan scan berkualitas tinggi. Nikmati
                pengalaman baca lancar, tanpa iklan mengganggu, dan selalu gratis.
                Jangan lewatkan update terbaru – baca chapter sebelumnya atau lanjut
                ke chapter berikutnya hanya di Welltoon!
            </p>
            <div
                class="mt-5 grid gap-2 grid-cols-[60%_40%] justify-items-center"
            >
                <!-- list chapters -->
                <div class="w-full">
                    <button
                        class="border border-default cursor-pointer p-1 font-bold w-full rounded"
                        onclick={() => list_chapter_modal_1.showModal()}
                        >Chapter {chapterNumber}</button
                    >
                    <dialog id="list_chapter_modal_1" class="modal">
                        <div class="modal-box">
                            <ul class="h-64 overflow-y-auto">
                                {#each chapters as chapter (chapter.id)}
                                    <li
                                        class="p-2 border-b border-b-default text-default font-bold"
                                    >
                                        <a
                                            onclick={() => {
                                                chapterNumber = chapter.number;
                                                document
                                                    .getElementById(
                                                        "list_chapter_modal_1",
                                                    )
                                                    .close();
                                            }}
                                            href={`/comic/${comicId}/chapter/${chapter.number}`}
                                            class="block"
                                            >Chapter {chapter.number}</a
                                        >
                                    </li>
                                {/each}
                            </ul>
                        </div>
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </div>

                <!-- pagination -->
                <div class="flex gap-2">
                    {#if chapterNumber == 1}
                        <button
                            disabled
                            class="bg-default text-white font-bold py-1 px-2 rounded opacity-50"
                            >{"<"} Prev</button
                        >
                    {:else}
                        <button
                            onclick={() => {
                                chapterNumber -= 1;
                                goto(
                                    `/comic/${comicId}/chapter/${chapterNumber}`,
                                );
                            }}
                            class="bg-default text-white font-bold py-1 px-2 rounded"
                            >{"<"} Prev</button
                        >
                    {/if}
                    {#if chapterNumber == chapters.length}
                        <button
                            disabled
                            class="bg-default text-white font-bold py-1 px-2 rounded opacity-50"
                            >Next {">"}</button
                        >
                    {:else}
                        <button
                            onclick={() => {
                                chapterNumber += 1;
                                goto(
                                    `/comic/${comicId}/chapter/${chapterNumber}`,
                                );
                            }}
                            class="bg-default text-white font-bold py-1 px-2 rounded"
                            >Next {">"}</button
                        >
                    {/if}
                </div>
            </div>
        </div>

        <!-- list content -->
        <div class="my-5">
            {#each contents as content (content.id)}
                <img
                    src={content.url}
                    alt={content.filename}
                    class="w-full"
                    loading="lazy"
                />
            {/each}
        </div>

        <div
            class="my-5 mx-2 grid gap-2 grid-cols-[60%_40%] justify-items-center"
        >
            <!-- list chapters -->
            <div class="w-full">
                <button
                    class="border border-default cursor-pointer p-1 font-bold w-full rounded"
                    onclick={() => list_chapter_modal_2.showModal()}
                    >Chapter {chapterNumber}</button
                >
                <dialog id="list_chapter_modal_2" class="modal">
                    <div class="modal-box">
                        <ul class="h-64 overflow-y-auto">
                            {#each chapters as chapter (chapter.id)}
                                <li
                                    class="p-2 border-b border-b-default text-default font-bold"
                                >
                                    <a
                                        onclick={() => {
                                            chapterNumber = chapter.number;
                                            document
                                                .getElementById(
                                                    "list_chapter_modal_2",
                                                )
                                                .close();
                                        }}
                                        href={`/comic/${comicId}/chapter/${chapter.number}`}
                                        class="block"
                                        >Chapter {chapter.number}</a
                                    >
                                </li>
                            {/each}
                        </ul>
                    </div>
                    <form method="dialog" class="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

            <!-- pagination -->
            <div class="flex gap-2">
                {#if chapterNumber == 1}
                    <button
                        disabled
                        class="bg-default text-white font-bold py-1 px-2 rounded opacity-50"
                        >{"<"} Prev</button
                    >
                {:else}
                    <button
                        onclick={() => {
                            chapterNumber -= 1;
                            goto(`/comic/${comicId}/chapter/${chapterNumber}`);
                        }}
                        class="bg-default text-white font-bold py-1 px-2 rounded"
                        >{"<"} Prev</button
                    >
                {/if}
                {#if chapterNumber == chapters.length}
                    <button
                        disabled
                        class="bg-default text-white font-bold py-1 px-2 rounded opacity-50"
                        >Next {">"}</button
                    >
                {:else}
                    <button
                        onclick={() => {
                            chapterNumber += 1;
                            goto(`/comic/${comicId}/chapter/${chapterNumber}`);
                        }}
                        class="bg-default text-white font-bold py-1 px-2 rounded"
                        >Next {">"}</button
                    >
                {/if}
            </div>
        </div>
        <p class="m-2 text-default text-sm text-justify">
            Tags: {comic.title}, chapter {chapterNumber}, bahasa indonesia, sub
            indo, full color
        </p>
    </div>
{/if}
