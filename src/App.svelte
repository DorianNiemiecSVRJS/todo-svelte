<script lang="ts">
  import { persistedState } from "svelte-persisted-state";

  type Todo = {
    task: string;
    checked: boolean;
  };

  const todos = persistedState<Todo[]>("todos", []);
  let todoToSubmit: string = $state("");
</script>

<main class="max-w-4xl w-full mx-auto px-3 py-4 md:py-8">
  <h1
    class="text-[2.5rem] md:text-[3rem] leading-none font-bold text-center my-6"
  >
    To-do list
  </h1>
  <form
    class="border-border border-2 flex rounded-lg max-w-2xl w-full mx-auto"
    onsubmit={(e) => {
            e.preventDefault();
            const task = todoToSubmit.trim();
            if (task != "") {
                todos.current.push({
                    task,
                    checked: false,
                });
                todoToSubmit = "";
            }
        }}
  >
    <input
      type="text"
      placeholder="Something to do..."
      bind:value={todoToSubmit}
      class="px-2 py-0.5 md:py-1 placeholder:text-muted grow border-border border-e-2"
    >
    <input
      type="submit"
      value="Add task"
      class="bg-primary rounded-e-lg font-bold px-4 md:px-6 py-0.5 md:py-1 cursor-pointer"
    >
  </form>
  {#if todos.current.length === 0}
    <p class="my-6 italic text-muted text-center text-lg">Nothing to do...</p>
  {:else}
    <div class="my-6 flex flex-col gap-2">
      {#each todos.current as todo, index}
        <div class="w-full flex gap-1.5 md:gap-2 items-center">
          <input
            type="checkbox"
            id={`todo-${index}`}
            checked={todo.checked}
            onchange={(e) => {
                            todos.current[index].checked = (
                                e.target as HTMLInputElement
                            ).checked;
                        }}
            class="peer relative appearance-none size-7 min-w-7 border-border border-2 rounded-sm checked:bg-primary"
          >
          <svg
            class="absolute hidden pointer-events-none size-5 peer-checked:block mt-0.5 ms-1"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.06067 9.4689L5.56067 13.9689L16.5607 0.968903"
              stroke="black"
              stroke-width="3"
            />
          </svg>
          <label
            for={`todo-${index}`}
            class="grow peer-checked:text-muted peer-checked:italic peer-checked:line-through text-ellipsis overflow-hidden"
          >
            {todo.task}
          </label>
          <button
            class="bg-destructive border-border border-2 rounded-lg font-bold px-4 md:px-6 py-0.5 md:py-1 cursor-pointer"
            onclick={(e) => {
                            e.preventDefault();
                            todos.current.splice(index, 1);
                        }}
          >
            Remove
          </button>
        </div>
      {/each}
    </div>
  {/if}
</main>
