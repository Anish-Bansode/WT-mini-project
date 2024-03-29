// script.js

document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");
    
    if (taskInput.value === "") {
        alert("Please enter a task!");
        return;
    }

    var li = document.createElement("li");
    li.textContent = taskInput.value;
    li.onclick = function() {
        this.classList.toggle("completed");
        saveTasks();
    };

    var removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-button";
    removeButton.onclick = function(event) {
        event.stopPropagation(); // Prevent event bubbling
        taskList.removeChild(li);
        saveTasks();
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);
    taskInput.value = "";

    saveTasks();
}

function saveTasks() {
    var taskList = document.getElementById("taskList");
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = localStorage.getItem("tasks") || "";
    
    // Re-attach remove button click event handlers
    var removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach(function(button) {
        button.onclick = function(event) {
            event.stopPropagation(); // Prevent event bubbling
            var listItem = button.parentElement;
            taskList.removeChild(listItem);
            saveTasks();
        };
    });
}
