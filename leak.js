"use strict";
require('heapdump');

// It is important to use named constructors (like the one below), otherwise
// the heap snapshots will not produce useful outputs for you.
function LeakingClass() {
}

var leaks = [];
setInterval(function() {
  for (var i = 0; i < 100; i++) {
    leaks.push(new LeakingClass);
  }

  console.error('Leaks: %d', leaks.length);
}, 1000);

function generateHeapDumpAndStats(){
  //1. Force garbage collection every time this function is called
  try {
    global.gc();
  } catch (e) {
    console.log("You must run program with 'node --expose-gc index.js' or 'npm start'");
    process.exit();
  }
 
  //2. Output Heap stats
  var heapUsed = process.memoryUsage().heapUsed;
  console.log("Program is using " + heapUsed + " bytes of Heap.")
 
  //3. Get Heap dump
  process.kill(process.pid, 'SIGUSR2');
}
 
//Kick off the program
setInterval(generateHeapDumpAndStats, 2000); //Do garbage collection and heap dump every 2 seconds
 
