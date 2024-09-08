<script lang="ts">
    import { flip } from 'svelte/animate'
    import { dndzone } from 'svelte-dnd-action'
    import Column from './Column.svelte'

    const flipDurationMs = 300

    // will be called any time a card or a column gets dropped to update the parent data
    type Props = {
        columns: Column[],
        onFinalUpdate: any
    }
    let { 
        columns = $bindable(), 
        onFinalUpdate
    } = $props()

    let isDraggingFolder = $state(false)

    function handleDndConsiderColumns(e: CustomEvent) {
        columns = e.detail.items
    }
    
    function handleDndFinalizeColumns(e) {
        onFinalUpdate(e.detail.items)
    }

    function handleItemFinalize(columnIdx: number, newItems) {
        columns[columnIdx].items = newItems
        onFinalUpdate([...columns])
        isDraggingFolder = false
    }
</script>

<section
    class="board"
    use:dndzone={{ items: columns, flipDurationMs, type: 'column' }}
    onconsider={handleDndConsiderColumns}
    onfinalize={handleDndFinalizeColumns}>
    {#each columns as { id, name, tasks }, idx (id)}
        <div class="bg-green-100 border-gray-400 border" animate:flip={{ duration: flipDurationMs }}>
            <Column
                {name}
                {items}
                {isDraggingFolder}
                onFolderDragStart={() => (isDraggingFolder = true)}
                onDrop={newItems => handleItemFinalize(idx, newItems)} />
        </div>
    {/each}
</section>

<style>
    .board {
        height: 60vh;
        width: 100%;
        padding: 0.5em;
        margin-bottom: 40px;
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
</style>
