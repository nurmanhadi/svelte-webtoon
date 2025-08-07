<script>
    import { alertError } from "$lib/Alert";
    import ComicApi from "$lib/api/ComicApi";
    import { period } from "$lib/perios";
    import CenterLoading from "../CenterLoading.svelte";

    let comics = $state([]);

    async function getAllComicPeriod(timePeriod) {
        const response = await ComicApi.getAllComicByViewsByPeriod(
            timePeriod,
            12,
        );
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            comics = data;
        } else {
            await alertError(responseBody.error);
        }
    }

    $effect(() => {
        getAllComicPeriod(period.allTime);
    });
</script>

{#if !comics}
    <CenterLoading />
{:else}
    <div class="my-3">
        <h1 class="font-bold text-lg text-white bg-default px-2">Populer</h1>
    </div>
    <div class="flex gap-2 items-center px-2">
        <button
            onclick={() => getAllComicPeriod(period.allTime)}
            class="bg-default p-1 rounded text-white font-bold">All Time</button
        >
        <button
            onclick={() => getAllComicPeriod(period.monthly)}
            class="bg-default p-1 rounded text-white font-bold">Monthly</button
        >
        <button
            onclick={() => getAllComicPeriod(period.weekly)}
            class="bg-default p-1 rounded text-white font-bold">Weekly</button
        >
    </div>

    <!-- list comics -->
    <div class="grid gap-1 grid-cols-3 px-2 my-3 justify-items-center">
        {#each comics as comic (comic.id)}
            <div class="w-28">
                <a href={`/comic/${comic.id}`}>
                    <figure class="relative">
                        <img
                            src={comic.cover_url}
                            alt={comic.cover_filename}
                            class="w-28 h-36 border object-cover rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
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
                    class="text-default my-2 font-bold truncate block"
                >
                    {comic.title}
                </a>
            </div>
        {/each}
    </div>
{/if}
