<script>
    import { run } from 'svelte/legacy'

    import { flip } from 'svelte/animate'
    import { dndzone, TRIGGERS } from 'svelte-dnd-action'
    import { data } from './data.svelte.ts'
    import Card from './Card.svelte'

    const flipDurationMs = 150

    /** @type {{folder: any, dropFromOthersDisabled?: boolean}} */
    let { folder = $bindable(), dropFromOthersDisabled = false } = $props()
    run(() => {
        console.log(dropFromOthersDisabled)
    })

    function handleConsider(e) {
        const {
            items,
            info: { id, trigger },
        } = e.detail

        // 		if (trigger === TRIGGERS.DRAGGED_ENTERED) {
        // 			const findId = (id, object) => {
        // 				if (object.id === id) {
        // 					return object;
        // 				}

        // 				if (typeof object !== "object") {
        // 					return null;
        // 				}

        // 				for (const [key, value] of Object.entries(object)) {
        // 					const result = findId(id, value);
        // 					if (result) {
        // 						return result;
        // 					}
        // 				}
        // 			};

        // 			const isFolder = (object) => {
        // 				if (object.items != null) {
        // 					return true;
        // 				}
        // 				return false;
        // 			};

        // 			if (isFolder(findId(id, $data))) {
        // 				dropFromOthersDisabled = true;
        // 			}
        // 		}

        folder.items = items
    }

    function handleFinalize(e) {
        folder.items = e.detail.items
    }
</script>

<div class="wrapper">
    <div>
        {folder.name}
    </div>

    <div
        class="drop-zone"
        use:dndzone={{
            items: folder.items,
            flipDurationMs,
            dropFromOthersDisabled,
        }}
        onconsider={handleConsider}
        onfinalize={handleFinalize}>
        {#each folder.items as item (item.id)}
            <div animate:flip={{ duration: flipDurationMs }}>
                <Card name={item.name} />
            </div>
        {/each}
    </div>
</div>

<style>
    .wrapper {
        margin: 0.4em 0;
        padding: 0.5rem;
        background-color: white;
        border: 1px solid;
    }

    .drop-zone {
        min-height: 3rem;
    }
</style>
