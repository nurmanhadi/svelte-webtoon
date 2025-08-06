<script>
    import { alertError } from "$lib/Alert";
    import ComicApi from "$lib/api/ComicApi";
    import { period } from "$lib/perios";
    import CenterLoading from "../CenterLoading.svelte";
    import logo from "../../assets/logo.jpg";

    let comics = $state([]);
    async function getAllComicPeriodDaily() {
        const response = await ComicApi.getAllComicByViewsByPeriod(
            period.allTime,
            10,
        );
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            console.log(data);
            comics = data;
        } else {
            await alertError(responseBody.error);
        }
    }
    $effect(() => {
        getAllComicPeriodDaily();
    });
</script>

{#if !comics}
    <CenterLoading />
{:else}
    <div class="my-3">
        <h1 class="font-bold text-lg text-white bg-default px-2">
            Daily Populer
        </h1>
        <div class="flex gap-2 overflow-x-auto flex-nowrap mt-2 mx-2">
            {#each comics as comic (comic.id)}
                <div class="w-28">
                    <a href={`/comic/${comic.id}`}>
                        <figure class="relative">
                            <img
                                src={comic.cover_url}
                                alt={comic.cover_filename}
                                class="w-28 border h-36 object-cover rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
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
    </div>
{/if}
