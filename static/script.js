let done = (rep) => {
    let res = JSON.parse(rep.responseText);
    createDom(res);
}

let error = (err) => {
    console.log(err)
}

function clientRow(row, data) {
    let index = (row.rowIndex);
    console.log(data);
    if (row.childNodes.length < 5) {
        for (let i = 0; i < data[row.rowIndex].tp.length; i++) {
            let cell = document.createElement('td');
            let valueCell = document.createTextNode(data[row.rowIndex].tp[i]);
            cell.appendChild(valueCell);
            row.appendChild(cell);
        }
        row.style.backgroundColor = "green";
    } else {
        for (let x = row.childNodes.length - 1; x > 3; x--) {
            row.removeChild(row.childNodes[x]);
        }
        row.style.backgroundColor = "grey";
    }
}

function createDom(data) {
    let body = document.getElementsByTagName('body')[0];
    let tableau = document.createElement('table');

    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        let month = data[i].mois;
        let max = Math.max(...data[i].tp);
        let min = Math.min(...data[i].tp);
        let sum = 0;
        for (let j = 0; j < data[i].tp.length; j++) {
            sum += data[i].tp[j];
        }
        let moy = (sum / data[i].tp.length).toPrecision(4);
        let dataRow = [month, max, min, moy];
        row.onclick = () => { clientRow(row, data) };

        for (let j = 0; j < dataRow.length; j++) {
            let cell = document.createElement('td');
            let valueCell = document.createTextNode(dataRow[j]);
            cell.appendChild(valueCell);
            row.appendChild(cell);
        }
        tableau.appendChild(row);
    }
    body.appendChild(tableau);
}

$get('temperature.json', null, done, error);