<script context="module">
	let current;
</script>

<script>
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

	<!-- svelte-ignore a11y-invalid-attribute -->
	<a href="" download="/audio/{file.filename}">
		<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-42.34-61.66a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L120,164.69V120a8,8,0,0,1,16,0v44.69l10.34-10.35A8,8,0,0,1,157.66,154.34Z"></path></svg>
	</a>
</div>
