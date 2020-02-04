const data = [
  {
    status: 200,
    method: 'GET',
    domain: '127.0.0.1',
    file: 'index.html',
    size: 2.83,
    timing: 2
  },
  {
    status: 200,
    method: 'GET',
    domain: '127.0.0.1/page',
    file: 'page.html',
    size: 21.83,
    timing: 1
  },
  {
    status: 200,
    method: 'GET',
    domain: '127.0.0.1',
    file: 'resizable.js',
    size: 5.22,
    timing: 3
  }
]

let resizableGrid = (table) => {
  // first row of the table
  let row = table.getElementsByTagName('tr')[0];
  // cols of the first row
  let cols = row ? row.children : undefined;
  if (!cols) return;
  for (let i = 0; i < cols.length; i++) {
    let div = createDiv(table.offsetHeight);
    cols[i].appendChild(div);
    cols[i].style.position = 'relative';
    setListeners(div);
  }
}
let createDiv = (height) => {
  var div = document.createElement('div');
  div.style.top = 0;
  div.style.right = 0;
  div.style.width = '5px';
  div.style.position = 'absolute';
  div.style.cursor = 'col-resize';
  /* remove backGroundColor later */
  div.style.backgroundColor = 'red';
  div.style.userSelect = 'none';
  /* table height */
  div.style.height = height + 'px';
  return div;
}
let setListeners = (div) => {
  let pageX, curCol, nxtCol, curColWidth, nxtColWidth;
  div.addEventListener('mousedown', (e) => {
    curCol = e.target.parentElement;
    nxtCol = curCol.nextElementSibling;
    pageX = e.pageX;
    curColWidth = curCol.offsetWidth
    if (nxtCol)
      nxtColWidth = nxtCol.offsetWidth
  });

  document.addEventListener('mousemove', (e) => {
    if (curCol) {
      let diffX = e.pageX - pageX;

      if (nxtCol)
        nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';

      curCol.style.width = (curColWidth + diffX) + 'px';
    }
  });

  document.addEventListener('mouseup', (e) => {
    curCol = undefined;
    nxtCol = undefined;
    pageX = undefined;
    nxtColWidth = undefined;
    curColWidth = undefined;
  });
}

// let setDataTable = (data) => {

//   data.forEach(d => {

//     const entries = Object.entries(d);

//     const tr = document.createElement('tr');

//     for (var i = 0; i < entries.length; i++) {

//       const td = document.createElement('td');

//       td.innerHTML = entries[i][1];

//       tr.innerHTML = td;
//     }

//   })

// }

const table = document.getElementById('table');

resizableGrid(table);

setDataTable(data);
