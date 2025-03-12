<script lang="ts">
	import '../app.css';
	 import { ModeWatcher } from "mode-watcher";
	import Header from "$lib/header.svelte";
	let { children } = $props();
</script>
<ModeWatcher />
<Header />
<div></div>
{@render children()}
