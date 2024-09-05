<script>
	import { flip } from 'svelte/animate';
  import { dndzone, TRIGGERS } from 'svelte-dnd-action';
	import Card from "./Card.svelte";
	import Folder from "./Folder.svelte";
	
	const flipDurationMs = 150;
	
	
	/** @type {{name: any, items: any, onFolderDragStart: any, onDrop: any, isDraggingFolder: any}} */
	let {
		name,
		items = $bindable(),
		onFolderDragStart,
		onDrop,
		isDraggingFolder = $bindable()
	} = $props();
	function handleDndConsiderCards(e) {
		const { items: newItems, info: { id, trigger } } = e.detail;
    console.warn("got consider", name); 
		if (trigger == TRIGGERS.DRAG_STARTED) {
			const itemIdx = items.findIndex(item => item.id === id);
			console.log("index", itemIdx);
			if(!!items[itemIdx].items) {
				onFolderDragStart();
			}
		}
		items = newItems;
  }
  function handleDndFinalizeCards(e) {
		isDraggingFolder = false
    onDrop(e.detail.items);
  }
</script>
<style>
	.wrapper {
		height: 100%;
		width: 100%;
		     /*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
        overflow-y: hidden;
	}
	.column-content {
        height: calc(100% - 2.5em);
        /* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
        overflow-y: scroll;
		    scrollbar-width: thin;
		    padding-inline: 4px;
    }
    .column-title {
				height: 2.5em;
			  font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
			  border-bottom: 1px solid #aaa;
    }
</style>
<div class='wrapper'>
 	<div class="column-title">
		{name}
	</div>
	<div class="column-content" use:dndzone={{items, flipDurationMs}}
     	 onconsider={handleDndConsiderCards} 
			 onfinalize={handleDndFinalizeCards}>
				{#each items as item (item.id)}
           <div animate:flip="{{duration: flipDurationMs}}" >
						 {#if item.items != null}
						 	  <Folder folder={item} dropFromOthersDisabled={isDraggingFolder} />
						 {:else}
                <Card name={item.name} />
						 {/if}
            </div>
        {/each}
    </div>
</div>
