<script>
  import { slide } from 'svelte/transition';
  import Spinner from './Spinner.svelte';
  import AudioPlayer from './AudioPlayer.svelte';

  async function loadList() {
    let response = await fetch('list.json');
    return response.json();
  }

  let searchTerm = '';

</script>

<main>
  <div class="left">
    <h1>
      <img src="zoka-cyan.png" alt="Zorica Marković" width="64" />
      <br />
      Zorica Marković soundboard
    </h1>
    <input
      class="search"
      type="search"
      bind:value={searchTerm}
      placeholder="Traži, ne pitaj"
    />
  </div>

  {#await loadList()}
    <Spinner />
  {:then files}
    {@const filteredFiles = files.filter(({ label }) => label.toLowerCase().includes(searchTerm.toLowerCase()))}
    <div class="grid">
      {#each filteredFiles as file, i (i)}
        <div transition:slide|global>
          <AudioPlayer {file} />
        </div>
      {/each}

      {#if filteredFiles?.length < 1}
      <div class="search-empty">
        <img src="/zoka-yellow.png" alt="Zorica te gleda mrko" width="64">
        <h2>Šta me gledaš, a? <br /> Misliš da tu ima išta?</h2>
      <p>Traži nešto drugo!</p>
      </div>
    {/if}
    </div>

    
  {:catch error}
    <p>Greška kod učitavanja</p>
  {/await}
</main>
