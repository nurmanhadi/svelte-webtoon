<script>
    import logo from "../assets/logo.jpg";
    import defaultProfile from "../assets/user-icon.svg";
</script>

<div class="navbar bg-default shadow-sm">
    <div class="flex-1">
        <a href="/" class="flex gap-1 items-center">
            <figure>
                <img src={logo} alt="logo" class="h-10 w-10 rounded-full" />
            </figure>
            <h1 class="text-2xl font-bold text-white">Welltoon</h1>
        </a>
    </div>
    <div class="flex gap-3 items-center">
        <!-- search 1 -->
        <form class="bg-white rounded-sm p-1 hidden md:flex items-center gap-1">
            <input type="text" placeholder="Search" class="outline-none" />
            <button type="submit">🔍</button>
        </form>

        <!-- search 2 -->
        <div class="dropdown dropdown-end flex items-center md:hidden">
            <button tabindex="0" class="bg-white p-1 rounded-full w-8 h-8"
                >🔍</button
            >
            <ul
                class="dropdown-content menu bg-base-100 rounded-box z-1 p-2 shadow-sm top-12"
            >
                <form class="bg-white rounded-sm p-1 flex items-center gap-1">
                    <input
                        type="text"
                        placeholder="Search"
                        class="outline-none"
                    />
                    <button type="submit">🔍</button>
                </form>
            </ul>
        </div>

        <!-- account -->
        <div class="dropdown dropdown-end flex items-center">
            <button tabindex="0">
                <figure class="bg-base-100 rounded-full cursor-pointer">
                    <img
                        src={defaultProfile}
                        alt="logo"
                        class="h-10 w-10 rounded-full"
                    />
                </figure>
            </button>
            <ul
                class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm top-13"
            >
                <li><a href="/#">Item 1</a></li>
                <li><a href="/#">Item 2</a></li>
            </ul>
        </div>
    </div>
</div>
