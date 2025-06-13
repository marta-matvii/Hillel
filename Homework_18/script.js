$(document).ready(function() {
    
    function createTaskElement(taskText) {
        const $li = $('<li>').addClass('list-group-item d-flex justify-content-between align-items-center task-item');
        const $span = $('<span>').addClass('task-text').text(taskText);
        const $deleteButton = $('<button>')
            .addClass('btn btn-danger btn-sm delete-btn')
            .text('Видалити');
        
        $li.append($span).append($deleteButton);
        return $li;
    }
    
    function addTask() {
        const taskText = $('#taskInput').val().trim();
        
        if (taskText) {
            const $taskElement = createTaskElement(taskText);
            $('#taskList').append($taskElement);
            $('#taskInput').val('');
            $('#taskInput').focus();
        }
    }
    
    function showTaskModal(taskText) {
        $('#modalTaskText').text(taskText);
        $('#taskModal').modal('show');
    }
    
    $('#addButton').on('click', addTask);
    
    $('#taskInput').on('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    
    $('#taskList').on('click', function(event) {
        if ($(event.target).hasClass('delete-btn')) {
            $(event.target).closest('li').remove();
        } 
        else if ($(event.target).hasClass('task-text')) {
            const taskText = $(event.target).text();
            showTaskModal(taskText);
        }
        else if ($(event.target).hasClass('task-item') && !$(event.target).hasClass('delete-btn')) {
            const taskText = $(event.target).find('.task-text').text();
            showTaskModal(taskText);
        }
    });
    
    const initialTasks = ['Вивчити jQuery', 'Розібратися з Bootstrap', 'Створити модальне вікно'];
    
    initialTasks.forEach(function(task) {
        const $taskElement = createTaskElement(task);
        $('#taskList').append($taskElement);
    });
    
});