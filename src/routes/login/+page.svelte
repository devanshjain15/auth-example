<script lang="ts">
	import type { ActionData } from "../$types";
	import { applyAction, enhance } from '$app/forms';

	export let form: ActionData; 

	let isLoading = false; 
	let error = ''; 
</script>

<form
	method="POST"
	action="?/login"
	class="w-96 grid gap-8 mx-auto p-8 bg-neutral-800/50 border border-neutral-700/20 rounded-2xl shadow-lg" 
	use:enhance={() => { 
		isLoading = true; 
        error = ''; 
        return ({result}) => { 
            isLoading = false; 
			error = ''; 
            if(result.type === 'redirect' || result.type === 'failure'){ 
                applyAction(result); 
            } 

            if(result.type === 'error'){ 
                error = result.error.message;
            }
        }
	}}
>
	{#if error}
		<p style="color: red;">{error}</p>
	{/if}


	<label class="grid gap-2">
		<span class="font-semibold">Email</span>
		<input
		class="p-4 bg-neutral-800/60 border border-neutral-700/20 rounded-2xl shadow-md"
		type="email"
		name="email"
		/>
		{#if form && form?.onErrorField === 'email'}
			<p style="color: red;">{form.errorMessage}</p>
		{/if}
	</label>

	
	<label class="grid gap-2">
		<span class="font-semibold">Password</span>
		<input
		class="p-4 bg-neutral-800/60 border border-neutral-700/20 rounded-2xl shadow-md"
		type="password"
		name="password"
		/>
		{#if form && form?.onErrorField === 'password'}
			<p style="color: red;">{form.errorMessage}</p>
		{/if}
	</label>

	<button
		class="p-4 mt-4 rounded-2xl bg-green-300 hover:bg-green-200 text-green-900 font-semibold shadow-md transition-colors"
		type="submit" disabled={isLoading}>Login</button
	>
</form>
