let getAllItemData = () => {
    let request = new XMLHttpRequest();
    request.open("GET", "http://35.246.87.193:8081/item/all/");
    request.send();
    request.onload = () => {
        let itemList = document.getElementById("itemToAdd");
        itemList.innerText = "";

        let newItemButton = document.createElement("div");
        newItemButton.setAttribute("class", "col boxed itemButton");
        newItemButton.setAttribute("onclick", "console.log('Hello!')");

        itemList.append(newItemButton);

        for (let obj of JSON.parse(request.response)) {
            let mainDiv = document.createElement("div");
            mainDiv.setAttribute("class", "col boxed itemBoxes");
            itemList.append(mainDiv);

            let rowDiv = document.createElement("div");
            rowDiv.setAttribute("class", "row");
            mainDiv.append(rowDiv);

            let imgDiv = document.createElement("div");
            imgDiv.setAttribute("class", "col-6");
            let imgy = document.createElement("img");
            imgy.setAttribute("src", obj.imageUrl);
            imgy.setAttribute("alt", "Stonks");

            imgDiv.append(imgy);
            rowDiv.append(imgDiv);

            let textDiv = document.createElement("div");
            textDiv.setAttribute("class", "col-6");

            let titleRow = document.createElement("div");
            titleRow.setAttribute("class", "row");
            titleRow.innerText = "Title:";
            let titleTBox = document.createElement("input");
            titleTBox.setAttribute("type", "text");
            titleTBox.setAttribute("name", "Title");
            titleTBox.value = obj.name;
            titleRow.append(titleTBox);
            textDiv.append(titleRow);


            let priceRow = document.createElement("div");
            priceRow.setAttribute("class", "row");
            priceRow.innerText = "Price:";
            let priceTBox = document.createElement("input");
            priceTBox.setAttribute("type", "text");
            priceTBox.setAttribute("name", "Price");
            priceTBox.value = obj.price;
            priceRow.append(priceTBox);
            textDiv.append(priceRow);

            let urlRow = document.createElement("div");
            urlRow.setAttribute("class", "row");
            urlRow.innerText = "URL:";
            let urlTBox = document.createElement("input");
            urlTBox.setAttribute("type", "text");
            urlTBox.setAttribute("name", "URL");
            urlTBox.value = obj.imageUrl;
            urlRow.append(urlTBox);
            textDiv.append(urlRow);

            rowDiv.append(textDiv);

            let deleteDiv = document.createElement("div");
            deleteDiv.setAttribute("class", "row");
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "delete";
            deleteButton.addEventListener("click", () => {
                console.log("Delete!");
            })
            deleteDiv.append(deleteButton);

            let updateDiv = document.createElement("div");
            updateDiv.setAttribute("class", "row");
            let updateButton = document.createElement("button");
            updateButton.innerText = "update";
            updateButton.addEventListener("click", () => {
                console.log("Updated!");
            })
            updateDiv.append(updateButton);

            mainDiv.append(deleteDiv);
            mainDiv.append(updateDiv);
        }
    }
}

getAllItemData();


let deleteData = (id) => {
    let request = new XMLHttpRequest();
    request.open("DELETE", "http://35.246.87.193:8081/order/" + id + "/");
    request.send();
    request.onload = () => {
        getData();
    }

}
let getData = () => {
    let request = new XMLHttpRequest();
    request.open("GET", "http://35.246.87.193:8081/order/all/");
    request.send();
    request.onload = () => {
        let data = JSON.parse(request.response);
        let list = document.getElementById("tasks");
        list.innerText = "";
        for (let task of data) {
            let listItem = document.createElement("li");
            let div = document.createElement("div");
            let para = document.createElement("p");
            para.innerText = task.text;

            let updateButton = document.createElement("button");
            updateButton.className = "btn btn-primary";
            updateButton.innerText = "Update";
            updateButton.addEventListener("click", () => {
                modalUpdate.setId(task.id);
                openModal(task);
            })

            let deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-danger";
            deleteButton.innerText = "Delete"
            deleteButton.addEventListener("click", () => {
                deleteData(task.id);
            })

            div.appendChild(para);
            div.appendChild(updateButton);
            div.appendChild(deleteButton);

            listItem.appendChild(div);
            list.appendChild(listItem);
        }
    }
}

let objFromForm = (event) => {
    let form = event.target;
    let obj = {};
    let inputs = form.getElementsByTagName("input");
    for (let input of inputs) {
        if (input.name) {
            obj[input.name] = input.value;
        }
    }
    return obj
}

let postData = (event) => {
    event.preventDefault();

    let obj = objFromForm(event);
    let request = new XMLHttpRequest();
    request.open("POST", "http://35.246.87.193:8081/order/");
    request.setRequestHeader("Content-Type", "application/json")

    let body = JSON.stringify(obj);
    request.send(body);

    request.onload = () => {
        getData();
    }
}

let openModal = (task) => {
    console.log(task)
    $('#updateModal').modal({ show: true })

    let form = document.getElementById("updateForm");
    for (let input of form) {
        for (let key in task) {
            if (input.name === key) {
                input.value = task[key];
            }
        }
    }

}
// let update = () => {
//     let updateId = 0;
//     return {
//         setId: (id) => {
//             updateId = id;
//         },
//         updateTask: (event) => {
//             event.preventDefault();
//             let obj = objFromForm(event);
//             obj.id =  updateId;
//             let request = new XMLHttpRequest();
//             request.open("PUT", "http://35.246.87.193:8081/order/");
//             request.setRequestHeader("Content-Type", "application/json")
//             let body = JSON.stringify(obj);
//             console.log(body)
//             request.send(body);
//             request.onload = () => {
//                 console.log("hm")
//                 $('#updateModal').modal({ show: false })
//                 getData();
//             }
//         }
//     }

// }
let modalUpdate = update();





getData();
