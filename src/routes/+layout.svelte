<script lang="ts">
    import { page } from '$app/stores';
    import { enhance, applyAction } from '$app/forms';
    import type { ActionData } from './$types';

    export let data;

    let isLoading = false;  
    let error = ''; 
    let form: ActionData;

    const handleSubmitEnhance = async () => { 
        isLoading = true; 
        error = ''; 
        return ({result}) => { 
            isLoading = false; 
            if(result.type === 'redirect'){ 
                form = null; 
                applyAction(result); 
            } 

            if(result.type === 'error'){ 
                error = result.error.message;
            }

            if(result.type === 'failure'){ 
                form = result.data as ActionData;
            }
        }
    }

    $: console.log(!$page.url.pathname.startsWith('/search')); 
</script>


<nav style="grid-area: nav;">
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        {#if !data?.user}
            <li>
                <a href="/login">Login</a>
            </li>
        {/if}
        {#if data?.user}
            <form method="POST" action="/login?/logout&redirectTo={$page.url.pathname}" use:enhance>
                <button type="submit">Logout</button>
            </form>
        {/if}
    </ul>
</nav>
  
<main style="grid-area: main;">
    <slot/>
    
    {#if !data?.user && ($page.url.pathname !== '/login' && !$page.url.pathname.startsWith('/search'))} 
        <form method="POST"
        action="/login?/login&redirectTo={$page.url.pathname}"
        class="w-96 grid gap-8 mx-auto p-8 bg-neutral-800/50 border border-neutral-700/20 rounded-2xl shadow-lg" 
        use:enhance={handleSubmitEnhance}>
            {#if error}
                <p style="color: red;">{error}</p>
            {/if}
            <label class="grid gap-2">
                <span class="font-semibold">Email</span>
                <input
                class="p-4 bg-neutral-800/60 border border-neutral-700/20 rounded-2xl shadow-md"
                type="email"
                name="email"/>
                {#if form && form?.onErrorField === 'email'}
			        <p style="color: red;">{form.errorMessage}</p>
		        {/if}
            </label>
            
            <label class="grid gap-2">
                <span class="font-semibold">Password</span>
                <input
                class="p-4 bg-neutral-800/60 border border-neutral-700/20 rounded-2xl shadow-md"
                type="password"
                name="password"/>
                {#if form && form?.onErrorField === 'password'}
			        <p style="color: red;">{form.errorMessage}</p>
		        {/if}
            </label>
            
            <button
            class="p-4 mt-4 rounded-2xl bg-green-300 hover:bg-green-200 text-green-900 font-semibold shadow-md transition-colors"
            type="submit" disabled={isLoading}>Login</button
            >
        </form>        
    {/if}
</main>

<style>
    nav{
        display: grid;
        place-content: center;
        /* margin-bottom: 100px; */
        padding: 2rem 0;
    }

    nav ul { 
        display: flex;
        flex-flow: row nowrap;
    }

    nav ul li { 
        margin: 0 10px;
    }

    main{ 
        padding: 2rem 0;
    }
</style>