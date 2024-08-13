<script>
    import { page } from '$app/stores';
</script>

<div class="wrapper">
    <h1>Search result for: {$page.url.searchParams.get('q')}</h1>
</div>

<style>
    h1{ 
        font-size: 1.2rem;
        font-weight: bold;
        text-align: center;
        color: #9bfdbf;
    }
</style>