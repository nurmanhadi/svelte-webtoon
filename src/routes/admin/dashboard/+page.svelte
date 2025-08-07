<script>
    import { alertError } from "$lib/Alert";
    import DashboardApi from "$lib/api/DashboardPai";
    import CenterLoading from "../../../components/CenterLoading.svelte";
    import { chart } from "svelte-apexcharts";

    let summary = $state(null);
    let options = $state(null);

    async function getSummary() {
        const response = await DashboardApi.getSummary();
        const responseBody = await response.json();
        if (response.status === 200) {
            const dataObj = responseBody.data;
            console.log(dataObj);
            summary = dataObj;
            options = {
                chart: {
                    type: "bar",
                },
                series: [
                    {
                        name: "Views",
                        data: [
                            dataObj.total_views_daily,
                            dataObj.total_views_weekly,
                            dataObj.total_views_monthly,
                            dataObj.total_views,
                        ],
                    },
                ],
                xaxis: {
                    categories: ["Daily", "Weekly", "Monthly", "Total Views"],
                },
            };
        } else {
            await alertError(responseBody.error);
        }
    }

    $effect(() => {
        getSummary();
    });
</script>

{#if !summary}
    <CenterLoading />
{:else}
    <div>
        <!-- summary card -->
        <div class="grid grid-cols-3 gap-1 mt-3 px-2">
            <div
                class="w-full bg-purple-500 py-2 rounded-md text-center text-white font-bold"
            >
                <p class="text-lg">Comics</p>
                <p>{summary.total_comic}</p>
            </div>
            <div
                class="w-full bg-blue-500 py-2 rounded-md text-center text-white font-bold"
            >
                <p class="text-lg">Chapters</p>
                <p>{summary.total_chapter}</p>
            </div>
            <div
                class="w-full bg-pink-500 py-2 rounded-md text-center text-white font-bold"
            >
                <p class="text-lg">Users</p>
                <p>{summary.total_user}</p>
            </div>
        </div>

        <!-- chart view -->
        <div class="my-3">
            <h1
                class="font-bold mb-1 bg-default px-2 text-center text-lg text-white"
            >
                Views
            </h1>
            <div use:chart={options}></div>
        </div>
    </div>
{/if}
