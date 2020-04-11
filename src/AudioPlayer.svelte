<script context="module">
  let current;
</script>

<script>
  export let src;
  let audio;
  let paused = true;

  function stopOthers() {
    if (current && current !== audio) current.pause();
    current = audio;
  }

  function play() {
    stopOthers();
    if (current && current === audio) {
      audio.currentTime = 0;
      audio.play();
    }
    current = audio;
  }

  function formatName(input) {
    return input
      .replace("audio/", "")
      .replace(/-/g, " ")
      .replace(/dj/g, "đ")
      .replace(/dz/g, "dž")
      .replace(".m4a", "")
      .replace(/^./, input[6].toUpperCase());
  }
</script>

<style>
  /* audio { width: 100%; margin: 0.5em 0 1em 0; } */

  .paused {
    background-color: #ff3e00;
    color: #fff;
    border-color: #ff3e00;
  }

  button {
    width: 100%;
    height: 100%;
    margin: 0;
  }
</style>

<div>
  <audio bind:this={audio} bind:paused on:play={stopOthers} {src} />

  <button class:paused={!paused} on:click={play}>{formatName(src)}</button>
</div>
