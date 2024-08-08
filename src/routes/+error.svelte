<script>
	import { page } from '$app/stores';
</script>

<h1>You've hit an error.</h1>
<h2>{$page.status}: {$page.error.message}</h2>