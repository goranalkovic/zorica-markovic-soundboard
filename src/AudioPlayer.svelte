<script context="module">
	let current;
</script>

<script>
	import { slide } from 'svelte/transition';

	export let file;
	let audio;
	let paused = true;

	function stopOthers() {
		if (current && current !== audio) current.pause();
		current = audio;
	}

	function play() {
		if (!paused) {
			audio.pause();
			currentDuration = 0.15;
			audio.currentTime = 0;
			paused = true;
			return;
		}

		stopOthers();
		if (current && current === audio) {
			currentDuration = current.duration;
			audio.currentTime = 0;
			audio.play();
		}
		current = audio;
	}

	let currentDuration = 0.15
</script>

<div>
	<audio bind:this={audio} bind:paused on:play={stopOthers} src="audio/{file.filename}" />

	<button class:paused={!paused} on:click={play} style="--duration: {currentDuration - 0.15}s">
		{file.label}
	</button>
</div>
