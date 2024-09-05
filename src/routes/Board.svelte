<script>
	import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
	import Column from "./Column.svelte";
	
	const flipDurationMs = 300;
	
	// will be called any time a card or a column gets dropped to update the parent data
  /** @type {{columns: any, onFinalUpdate: any}} */
  let { columns = $bindable(), onFinalUpdate } = $props();
	
	let isDraggingFolder = $state(false);
 
  function handleDndConsiderColumns(e) {
    columns = e.detail.items;
  }
  function handleDndFinalizeColumns(e) {
    onFinalUpdate(e.detail.items);
  }
 	function handleItemFinalize(columnIdx, newItems) {
		columns[columnIdx].items = newItems;
		onFinalUpdate([...columns]);
		isDraggingFolder = false;
	}
</script>
<style>
    .board {
        height: 60vh;
        width: 100%;
        padding: 0.5em;
        margin-bottom: 40px;
    }
    .column {
        height: 100%;
        width: 250px;
        padding: 0;
        margin: 1em;
        float: left;
        border: 1px solid #333333;
				background-color: white;
			  color: black;
    }
</style>

<section class="board" 
	use:dndzone={{items:columns, flipDurationMs, type:'column'}} 
	onconsider={handleDndConsiderColumns} 
	onfinalize={handleDndFinalizeColumns}>
    {#each columns as {id, name,items}, idx (id)}
  		<div class="column"animate:flip="{{duration: flipDurationMs}}" >    
				<Column name={name} items={items} isDraggingFolder={isDraggingFolder} onFolderDragStart={() => (isDraggingFolder = true)} onDrop={(newItems) => handleItemFinalize(idx, newItems)} />
			</div>
    {/each}
</section>