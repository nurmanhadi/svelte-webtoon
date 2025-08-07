<script>
    import { alertError } from "$lib/Alert.js";
    import ComicApi from "$lib/api/ComicApi";
    import CenterLoading from "../../../components/CenterLoading.svelte";
    import CustomHeadComicDetail from "../../../components/comic/CustomHeadComicDetail.svelte";

    const { params } = $props();
    const comicId = params.comicId;

    let comic = $state(null);
    let genres = $state([]);
    let chapters = $state([]);

    async function getComic() {
        const response = await ComicApi.getComicById(comicId);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            comic = data;
            genres = data.genres;
            chapters = data.chapters;
        } else {
            await alertError(responseBody.error);
        }
    }
    function dateFormatter(dateString) {
        const date = new Date(dateString);
        const formatter = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        });
        const formatDate = formatter.format(date);
        return formatDate;
    }

    $effect(() => {
        getComic();
    });
</script>

{#if comic == null}
    <CenterLoading />
{:else}
    <!-- html head -->
    <CustomHeadComicDetail {comic} />

    <div class="min-h-screen">
        <!-- detail comic -->
        <div class="m-2">
            <h1
                class="text-center leading-none my-5 text-xl text-default font-bold"
            >
                {comic.title}
            </h1>
            <figure class="flex justify-center mt-10">
                <img
                    src={comic.cover_url}
                    alt={comic.cover_filename}
                    loading="lazy"
                    class="w-52 h-64 object-cover rounded-md"
                />
            </figure>
            <div>
                <p class="mt-3 text-justify text-default">{comic.synopsis}</p>
                <table class="table text-default mt-3">
                    <tbody>
                        <tr>
                            <th>Type</th>
                            <td>{comic.type}</td>
                        </tr>
                        <tr>
                            <th>Author</th>
                            <td>{comic.author}</td>
                        </tr>
                        <tr>
                            <th>Artist</th>
                            <td>{comic.artist}</td>
                        </tr>
                        <tr>
                            <th>Post On</th>
                            <td>{dateFormatter(comic.created_at)}</td>
                        </tr>
                        <tr>
                            <th>Updated On</th>
                            <td>{dateFormatter(comic.updated_post)}</td>
                        </tr>
                        <tr>
                            <th>Views</th>
                            <td>{comic.views}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex gap-2 my-3">
                    {#each genres as genre (genre.id)}
                        <a
                            href="/#"
                            class="p-1 bg-default text-white font-bold text-sm rounded"
                            >{genre.name}</a
                        >
                    {/each}
                </div>
            </div>
        </div>

        <!-- list chapter -->
        <div class="m-2">
            <h1
                class="text-white bg-default text-center text-lg font-bold rounded my-3"
            >
                Chapter
            </h1>
            <div class="flex justify-center my-3">
                <ul
                    class="p-2 w-80 h-64 grid grid-cols-2 gap-2 overflow-y-auto"
                >
                    {#each chapters as chapter (chapter.id)}
                        <li
                            class="bg-default rounded mb-1 p-1 text-white font-bold max-h-12"
                        >
                            <a
                                href={`/comic/${comicId}/chapter/${chapter.number}`}
                                class="block">Chapter {chapter.number}</a
                            >
                            <p class="text-xs opacity-50">
                                {dateFormatter(chapter.created_at)}
                            </p>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </div>
{/if}
