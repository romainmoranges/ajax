/* variables */
let body = document.getElementsByTagName('body')[0];
let table = document.createElement('table');
body.appendChild(table);
let done = (rep) => {
    let res = JSON.parse(rep.responseText);
    fillTable(res);
}

let error = (err) => {
    alert(err);
}


/* fonctions */

function getCities(cp) {
    if (cp.value.length > 1) {
        $get('villes.php', {
            'cp': cp.value
        }, done, error);
    }
}

function fillTable(res) {
    if (res.length > 0) {
        table.innerHTML = '';
        for (let i = 0; i < res.length; i++) {
            let row = document.createElement('tr');
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement('td');
                row.appendChild(cell);
            }
            let close = document.createElement('img');
            close.src = "./img/close.png";
            row.childNodes[0].appendChild(document.createTextNode(res[i].cp));
            row.childNodes[1].appendChild(document.createTextNode(res[i].ville));
            row.childNodes[2].appendChild(close);
            table.appendChild(row);
            close.addEventListener('click', () => {
                deleteCity(res, row)
            });
            row.childNodes[1].addEventListener('dblclick', () => { updateCity(row.childNodes[1]) })
        }
        body.appendChild(table);
    } else {
        if (body.lastChild) {body.removeChild(body.lastChild);}
        err = document.createElement('b');
        err.appendChild(document.createTextNode('erreur!'))
        body.appendChild(err);
    }
}

function deleteCity(res, row) {
    let confirm = window.confirm(`êtes vous sur de vouloir supprimer la ville ${res[row.rowIndex].ville} ?`)
    if (confirm) {
        $get('deleteVille.php', {
                'ville': res[row.rowIndex].ville
            },
            () => {
                /* done */
                alert(`la ville ${res[row.rowIndex].ville} a bien été supprimée`);
            },
            () => {
                /* error */
                alert('error');
            });
    } else {
        alert("supression annulée")
    }
}

function formCity() {
    let rowAdd = document.createElement('tr');
    for (let i = 0; i < 2; i++) {
        let input = document.createElement('input');
        rowAdd.appendChild(input);
    }
    rowAdd.childNodes[0].name = "cp";
    rowAdd.childNodes[1].name = "ville";

    let valid = document.createElement('img');
    valid.src = "./img/valid.png";
    rowAdd.appendChild(valid);
    body.appendChild(rowAdd);

    valid.addEventListener("click", () => {
        if (rowAdd.childNodes[0].value.length === 5 && rowAdd.childNodes[1].value.length > 0) {
            addCity(rowAdd.childNodes[0].value, rowAdd.childNodes[1].value);
        } else {
            alert("il manque des champs, ou il y a une erreur dans l'un d'entre eux")
        }
    });

}

function addCity(cp, ville) {
    console.log(cp, ville);
    $get('addVille.php', {
            'cp': cp,
            'ville': ville
        },
        () => {
            /* Done */
            alert('votre ville a bien été ajoutée');
            cp.innerHTML = ''
            ville.innerHTML = '';
        },
        () => {
            alert('error');
        })
}

    function updateCity(cell) {
        let oldValue = cell.firstChild.textContent;
        console.log(oldValue);
        let textArea = document.createElement('textarea');
        textArea.value = oldValue;
        cell.parentNode.appendChild(textArea)
        cell.parentNode.removeChild(cell)
        console.log(cell.parentNode);
        textArea.addEventListener('blur', () => {saveCity(textArea.value, oldValue); })
    }

    function saveCity(ville, oldValue) {
        console.log('je suis dans ma fonction')
        $get('updateVille.php', {'ville' : ville, 'oldValue' : oldValue}, 
        () => {
            /* done */
            alert("la modification a bien été réalisée")
        },
        (e) => {
            /* err */
            alert(e);
        })
    }
/* Code */

cp.addEventListener('keyup', () => {
    getCities(cp)
})

add.addEventListener('click', () => {
    formCity();
})