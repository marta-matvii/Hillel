"use strict";

$(document).ready(function () {
  function createTaskElement(taskText) {
    var $li = $('<li>').addClass('list-group-item d-flex justify-content-between align-items-center task-item');
    var $span = $('<span>').addClass('task-text').text(taskText);
    var $deleteButton = $('<button>').addClass('btn btn-danger btn-sm delete-btn').text('Видалити');
    $li.append($span).append($deleteButton);
    return $li;
  }
  function addTask() {
    var taskText = $('#taskInput').val().trim();
    if (taskText) {
      var $taskElement = createTaskElement(taskText);
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
  $('#taskInput').on('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
  $('#taskList').on('click', function (event) {
    if ($(event.target).hasClass('delete-btn')) {
      $(event.target).closest('li').remove();
    } else if ($(event.target).hasClass('task-text')) {
      var taskText = $(event.target).text();
      showTaskModal(taskText);
    } else if ($(event.target).hasClass('task-item') && !$(event.target).hasClass('delete-btn')) {
      var _taskText = $(event.target).find('.task-text').text();
      showTaskModal(_taskText);
    }
  });
  var initialTasks = ['Вивчити jQuery', 'Розібратися з Bootstrap', 'Створити модальне вікно'];
  initialTasks.forEach(function (task) {
    var $taskElement = createTaskElement(task);
    $('#taskList').append($taskElement);
  });
});