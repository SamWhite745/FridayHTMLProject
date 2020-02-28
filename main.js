let getAllData = () => {
    let request = new XMLHttpRequest();
    request.open("GET", "http://35.246.87.193:8081/item/all/");
    request.send();
    request.onload = () => {
        let itemList = document.getElementById("itemToAdd");
        itemList.innerText = "";

        let newItemButton = document.createElement("div");
        newItemButton.setAttribute("class","col boxed itemButton");
        newItemButton.setAttribute("onclick","console.log('Hello!')");

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
            deleteDiv.setAttribute("class","row");
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "delete";
            deleteButton.addEventListener("click", () => {
                console.log("Delete!");
            })
            deleteDiv.append(deleteButton);

            let updateDiv = document.createElement("div");
            updateDiv.setAttribute("class","row");
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

getAllData();