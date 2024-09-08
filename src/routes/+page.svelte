<script>
    import { data } from './data.svelte'
    import Board from './Board.svelte'

    function handleBoardUpdated(newColumnsData) {
        // if you wanted to update a database or a server, this is where you would do it
        $data = newColumnsData
    }
</script>

<main class="m-4 ">
    <h2 class="text-3xl">Board</h2>
    <h5  class="text-xl">(svelte-dnd-action example)</h5>
    <p class="mb-8">
        This is an exmaple for a board with draggable columns and items. <br />
        Notice that the scroll position is not maintained if you first scroll down
        in the first column and then drag it. This is because I wanted to keep this
        example super clear. To maintain scroll position you will need to save it
        per column. See
        <a href="https://svelte.dev/repl/eb2f5988bd2f46488810606c1fb13392?version=3.29.4">this example</a >.
    </p>

    <Board columns={$data} onFinalUpdate={handleBoardUpdated} />
</main>

<style lang="postcss">
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
