<script>
  import { onMount } from "svelte";
  import "./app.css";
  import { fade } from "svelte/transition";

  let component = "Start";
  let goal = localStorage.getItem("goal");
  let goal1 = localStorage.getItem("goal1");
  let goal2 = localStorage.getItem("goal2");
  let goal3 = localStorage.getItem("goal3");
  let progress1 = parseInt(localStorage.getItem("progress1")?localStorage.getItem("progress1"):"0");
  let progress2 = parseInt(localStorage.getItem("progress2")?localStorage.getItem("progress2"):"0");
  let progress3 = parseInt(localStorage.getItem("progress3")?localStorage.getItem("progress3"):"0");
  if(localStorage.getItem("goal3")){
    component = "Dashboard"
  }
</script>

<div class="flex flex-col w-screen h-screen bg-mountain justify-center">
  <div class="gap-5 flex flex-col w-screen justify-center backdrop-blur-lg p-20 rounded-3xl">

    {#if component=="Start"}
    <h1 transition:fade={{duration:300}} class="text-8xl text-white text-center">Accomplishing goals is difficult</h1>
    <h2 transition:fade={{duration:400}} class="text-4xl text-white text-center">Track your progress and stay committed</h2>
    <div transition:fade={{duration:500}} class="flex justify-center">
      <button on:click={()=>{component="Goals"}} class="drop-shadow-md rounded-lg p-5 transition-colors hover:bg-orange-200 bg-orange-100 text-xl">Start</button>
    </div>
    {/if}

    {#if component=="Goals"}
    <h1 transition:fade={{delay:600, duration:300}} class="text-8xl text-white text-center">Start with writing down a goal</h1>
    <h2 transition:fade={{delay:600, duration:400}} class="text-4xl text-white text-center">Think about something that you always wanted to do</h2>
    <div transition:fade={{delay:600, duration:400}} class="flex justify-center">
      <input id="goal" placeholder="Run a marathon" class="h-14 w-1/2 p-2 rounded-lg" />
    </div>
    <div transition:fade={{delay:600, duration:500}} class="flex justify-center">
      <button on:click={()=>{component="SubGoals";goal=document.getElementById("goal").value}} class="drop-shadow-md rounded-lg p-5 transition-colors hover:bg-orange-200 bg-orange-100 text-xl">Continue</button>
    </div>
    {/if}

    {#if component=="SubGoals"}
    <h1 transition:fade={{delay:800, duration:300}} class="text-8xl text-white text-center">{goal}</h1>
    <h2 transition:fade={{delay:800, duration:400}} class="text-4xl text-white text-center">Now write down three sub-goals that are needed to achieve the main goal</h2>
    <div transition:fade={{delay:800, duration:400}} class="grid grid-cols-1 justify-items-center gap-5">
      <input id="goal1" placeholder="Goal 1" class="h-14 w-1/2 p-2 rounded-lg" />
      <input id="goal2" placeholder="Goal 2" class="h-14 w-1/2 p-2 rounded-lg" />
      <input id="goal3" placeholder="Goal 3" class="h-14 w-1/2 p-2 rounded-lg" />
    </div>
    <div transition:fade={{delay:800, duration:500}} class="flex justify-center">
      <button on:click={()=>{
        component="Dashboard";
        goal1=document.getElementById("goal1").value;
        goal2=document.getElementById("goal2").value;
        goal3=document.getElementById("goal3").value; 
        localStorage.setItem("goal", goal);
        localStorage.setItem("goal1", goal1);
        localStorage.setItem("goal2", goal2);
        localStorage.setItem("goal3", goal3);
        }} class="drop-shadow-md rounded-lg p-5 transition-colors hover:bg-orange-200 bg-orange-100 text-xl">Continue</button>
    </div>
    {/if}

    {#if component=="Dashboard"}
    <div transition:fade={{delay:600, duration:300}} class="flex flex-col justify-center">
      <h1 class="text-8xl text-white text-center">{goal}</h1>
      <div class="grid grid-cols-3">
        <div class="flex flex-col gap-5">
          <h2 class="text-4xl text-white text-center">{goal1}</h2>
          <div class="flex justify-center">
            <progress value={progress1} max="100" class="rounded-lg w-1/2">{progress3}</progress>
          </div>
          <div class="flex justify-center">
            <button class="drop-shadow-md rounded-lg p-5 transition-colors hover:bg-orange-200 bg-orange-100 text-xl" on:click={()=>{progress1=progress1+1; localStorage.setItem("progress1", progress1.toString())}}>Complete action</button>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <h2 class="text-4xl text-white text-center">{goal2}</h2>
          <div class="flex justify-center">
            <progress value={progress2} max="100" class="rounded-lg w-1/2">{progress2}</progress>
          </div>
          <div class="flex justify-center">
            <button class="drop-shadow-md rounded-lg p-5 transition-colors hover:bg-orange-200 bg-orange-100 text-xl" on:click={()=>{progress2=progress2+1; localStorage.setItem("progress2", progress2.toString())}}>Complete action</button>
          </div>
        </div>
        <div class="flex flex-col gap-5">
          <h2 class="text-4xl text-white text-center">{goal3}</h2>
          <div class="flex justify-center">
            <progress value={progress3} max="100" class="rounded-lg w-1/2">{progress3}</progress>
          </div>
          <div class="flex justify-center">
            <button class="drop-shadow-md rounded-lg p-5 transition-colors hover:bg-orange-200 bg-orange-100 text-xl" on:click={()=>{progress3=progress3+1; localStorage.setItem("progress3", progress3.toString())}}>Complete action</button>
          </div>
        </div>
      </div>
    </div>
    {/if}

  </div>
</div>