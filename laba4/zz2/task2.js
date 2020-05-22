const table = {
    data : new Map(),

    createDelBtn: () => {
        let remBtn = document.createElement("a");
        remBtn.setAttribute("class", "btn");
        remBtn.innerText = "Видалити";
        remBtn.addEventListener("click", table.remove);
        return remBtn;
    },

    add: () => {
        
        let key = parseInt(Math.random() * 5);
        let value = parseInt(Math.random() * 50);
        table.data.set(key, value); // add new element to the map

        let newRow = document.createElement("tr");
        newRow.setAttribute("data-key", key);
        newRow.setAttribute("data-value", value);

        let rowHead = document.createElement("th");
        rowHead.setAttribute("contenteditable", "true")
        rowHead.setAttribute("scope", "row");
        rowHead.addEventListener('input', table.edit);
        rowHead.innerText = key;

        let rowData = document.createElement("td");
        rowData.setAttribute("contenteditable", "true")
        rowData.addEventListener('input', table.edit);
        rowData.innerText = value;

        let delBtnRow = document.createElement("td");
        delBtnRow.appendChild(table.createDelBtn());

        newRow.appendChild(rowHead);
        newRow.appendChild(rowData);
        newRow.appendChild(delBtnRow);

        document.querySelector("tbody").appendChild(newRow); // add new row to the table
        diagram.createCol(key, value); // add new diagram
    },

    remove: (event) => {
        let btn = event.target;
        let td = btn.parentNode;
        let row = td.parentNode;

        let key = row.getAttribute("data-key");
        table.data.delete(parseInt(key)); // remove element from the map

        row.remove(); // remove row from the table
        diagram.removeCol(key); // remove diagram
    },

    edit: (event) => {
        let val = event.target;
        let row = val.parentNode;

        let data_key = row.getAttribute("data-key");
        let data_value = row.getAttribute("data-value");

        if(val.nodeName == "TH")
        {
            table.data.set(parseInt(val.innerText), parseInt(data_value));
            table.data.delete(parseInt(data_key));
            row.setAttribute("data-key", val.innerText);
            diagram.editCol(data_key, val.innerText, data_value);
        }
        else
        {
            table.data.set(parseInt(data_key), parseInt(val.innerText));
            row.setAttribute("data-value", val.innerText);
            diagram.editCol(data_key, data_key, val.innerText);
        }
    },

    get maxValue() { // max value of map
        let max = 0;
        for(let val of table.data.values()){
            if(val > max) {
                max = val;
            }
        }
        return max;
    },
}

function removeChildren (currNode) {
    while (currNode.firstChild) {
        currNode.removeChild(currNode.lastChild);
    }
}

const diagram = {
    get size() { // cols count
        return document.getElementsByClassName("task-diagram-col").length;
    },

    showTitle: (event) => { // alternative text of each diagram
        let parent = event.target.parentNode;
        event.target.title = parent.getAttribute("data-value"); 
    },

    createCol: (key, value) => {
        let newCol = document.createElement("div");
        newCol.setAttribute("class", "task-diagram-col");
        newCol.setAttribute("data-value", value);
        newCol.setAttribute("data-key", key);

        let newColVal = document.createElement("div");
        newColVal.setAttribute("class", "task-diagram-col__value");

        newColVal.addEventListener("mouseover", diagram.showTitle);
        
        let newColDesc = document.createElement("div");
        newColDesc.setAttribute("class", "task-diagram-col__desc");
        newColDesc.innerText = key;

        newCol.appendChild(newColVal);
        newCol.appendChild(newColDesc);
        document.getElementsByClassName("task-diagram")[0].appendChild(newCol); // add new diagram

        if(diagram.size <= 1) { // default col size
            newColVal.style.height = "300px";
            newColVal.style.width = "100px";
            newColVal.style.background = getRandomColor();
            return;
        }

        newColVal.style.width = (100 - (20 * Math.ceil(diagram.size / 5))).toString() + "px";
        newColVal.style.background = getRandomColor();

        if(parseInt(value) < table.maxValue) // size due to the biggest value
        {
            newColVal.style.height = (300 * (parseInt(value) / table.maxValue)).toString() + "px";
        }
        else 
        {
            newColVal.style.height = "300px";
        }
        diagram.rewriteCols();
    },

    removeCol: (key) => { // remove diagram by key
        diagram.getCol(key).remove();
        diagram.rewriteCols();
    },


    getCol: (key) => {
        let cols = document.getElementsByClassName("task-diagram-col");
        return Array.from(cols).find((x) => { return x.getAttribute("data-key") == key });
    }
}

function getRandomColor() { // random hex color 
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
    }

    

window.onload = () => {
    document.getElementsByClassName("btn-primary")[0].addEventListener('click', table.add);
    table.add();
    table.add();
}