<script>
    import { jwtDecode } from "jwt-decode";
    import userIcon from "../../assets/user-icon.svg";
    import CenterLoading from "../../components/CenterLoading.svelte";
    import UserApi from "$lib/api/UserApi";
    import { alertError, alertSuccess } from "$lib/Alert";
    import { goto } from "$app/navigation";

    let loading = $state(false);
    let userId = $state("");
    let username = $state("");
    let oldPassword = $state("");
    let newPassword = $state("");
    let inputFile = $state(null);
    let user = $state(null);

    async function getUser() {
        const response = await UserApi.getById(userId);
        const responseBody = await response.json();
        if (response.status === 200) {
            const data = responseBody.data;
            console.log(data);
            user = data;
        } else {
            await alertError(responseBody.error);
        }
    }
    async function updateUsername(e) {
        e.preventDefault();

        loading = true;

        const response = await UserApi.updateUsername(userId, username);
        const responseBody = await response.json();
        if (response.status === 200) {
            username = "";
            loading = false;
            getUser();
            await alertSuccess("update username success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }

    async function uploadAvatar(e) {
        e.preventDefault();

        loading = true;

        const avatar = Array.from(inputFile);
        let formData = new FormData();
        formData.append("avatar", avatar[0]);

        const response = await UserApi.uploadAvatar(userId, formData);
        const responseBody = await response.json();
        if (response.status === 200) {
            getUser();
            loading = false;
            await alertSuccess("upload avatar success");
        } else {
            loading = false;
            await alertError(responseBody.error);
        }
    }

    $effect(() => {
        const token = localStorage.getItem("access_token");
        if (token == null || token == "") {
            goto("/auth/login");
        } else {
            userId = jwtDecode(token).sub;
            getUser();
        }
    });
</script>

{#if !user}
    <CenterLoading />
{:else}
    <div>
        <h1 class="text-center text-default font-bold text-xl mt-5">
            {user.username}
        </h1>
        <figure class="flex justify-center mt-5">
            <img
                src={user.avatar_url != "" ? user.avatar_url : userIcon}
                alt={user.avatar_filename != ""
                    ? user.avatar_filename
                    : "user icon"}
                class="w-40 h-40 object-cover rounded-2xl shadow shadow-default"
            />
        </figure>

        <hr class="my-10 mx-5 border-default opacity-50" />

        <div class="mx-5">
            <!-- update username -->
            <form onsubmit={updateUsername}>
                <h2 class="text-default font-bold mb-2">Change Username</h2>
                <input
                    type="text"
                    class="outline-none border-b text-default border-default"
                    placeholder="Username"
                    bind:value={username}
                    required
                />
                <button
                    type="submit"
                    class="p-1 text-white font-bold bg-default rounded mx-1"
                    >Submit</button
                >
            </form>

            <!-- upload avatar -->
            <form onsubmit={uploadAvatar} class="mt-10">
                <h2 class="text-default font-bold mb-2">Upload Avatar</h2>
                <input
                    type="file"
                    class="outline-none border-b text-default border-default"
                    bind:files={inputFile}
                    required
                />
                <button
                    type="submit"
                    class="p-1 text-white font-bold bg-default rounded mx-1"
                    >Submit</button
                >
            </form>

            <!-- <form class="mt-10">
                <h2 class="text-default font-bold mb-2">Change Password</h2>
                <input
                    type="password"
                    class="outline-none border-b text-default border-default"
                    placeholder="old password"
                    required
                />
                <input
                    type="password"
                    class="outline-none border-b text-default border-default mt-3"
                    placeholder="new password"
                    required
                />
                <button
                    type="submit"
                    class="p-1 text-white font-bold bg-default rounded mx-1"
                    >Submit</button
                >
            </form> -->
        </div>
    </div>
{/if}
