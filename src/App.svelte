<script>
  import Spinner from "./Spinner.svelte";
  import AudioPlayer from "./AudioPlayer.svelte";

  async function loadList() {
    let response = await fetch("list.json");
    return response.json();
  }
</script>

<main>
  <h1>
    <img src="cursor.png" alt="Zorica Marković" width="64">
    <br />
    Zorica Marković soundboard
  </h1>

  {#await loadList()}
    <Spinner />
  {:then files}
    <div class="grid">
      {#each files as file}
        <AudioPlayer {file} />
      {/each}
    </div>
  {:catch error}
    <p>Greška kod učitavanja</p>
  {/await}
</main>
