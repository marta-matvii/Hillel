function createMultiplicationTable() {

    const container = document.getElementById('table-container');
    
    let tableHTML = '<table>';
    
    for (let i = 1; i <= 10; i++) {
      tableHTML += '<tr>';
      
      for (let j = 1; j <= 10; j++) {
        tableHTML += '<td>' + (i * j) + '</td>';
      }
      
      tableHTML += '</tr>';
    }
    
    tableHTML += '</table>';
    
    container.innerHTML = tableHTML;
}
  
window.onload = createMultiplicationTable;