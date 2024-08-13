<script lang="ts">
    export let data;
</script>


<div class="wrapper">
    <h1>Welcome to the homepage!</h1>
    <h2>We welcome you {data?.user ? data.user.name : 'stranger'}!</h2>

    <form  method="get" action="/search">
        <input
		class="p-4 bg-neutral-800/60 border border-neutral-700/20 rounded-2xl shadow-md"
		type="text"
        placeholder="Search Something"
        name="q"
		/>
    </form>
</div>

<style>
    h1,h2{ 
        text-align: center;
    }

    h1{ 
        font-size: 1.2rem;
        font-weight: bolder;
    }

    h2{ 
        color: #74aa88;
    }

    form{
        margin: 20px auto 10px;
        width: max-content;
    }

    input{ 
        width: 300px;
    }

    .wrapper{ 
        margin-bottom: 80px;
    }
</style>