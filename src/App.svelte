<script>
  import Spinner from "./Spinner.svelte";
  import AudioPlayer from "./AudioPlayer.svelte";

  async function loadList() {
    let response = await fetch("list.json");
    return response.json();
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: var(--accent);
    font-size: 4em;
    font-weight: 100;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 10rem);
    grid-auto-rows: 8rem;
    grid-gap: 1rem;
    justify-content: center;

    max-width: 1400px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }

    .grid {
      padding: 2rem 1rem;
    }
  }
</style>

<main>
  <h1>Zorica Marković soundboard</h1>

  {#await loadList()}
    <Spinner />
  {:then files}

    <div class="grid">
      {#each files as file}
        <AudioPlayer src="audio/{file.filename}" />
      {/each}
    </div>
  {:catch error}
    <p>Greška kod učitavanja</p>
  {/await}
</main>
