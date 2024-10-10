<script>
    import { onMount } from 'svelte';
  
    export let pdfs, nextPage, prevPage;
  
    let downloadLinks = [];
  
    onMount(() => {
      downloadLinks = pdfs.map(pdf => ({
        name: pdf.name,
        url: `data:application/pdf;base64,${pdf.data}`
      }));
    });
  </script>
  
  <ul>
    {#each downloadLinks as pdf}
      <li>
        <a href={pdf.url} download={pdf.name}>Download {pdf.name}</a>
      </li>
    {/each}
  </ul>
  
  {#if nextPage}
    <button>Next Page</button>
  {/if}
  {#if prevPage}
    <button>Previous Page</button>
  {/if}