let dogEditID = -1;
document.addEventListener("DOMContentLoaded", () => {
    fetchAndPopTable();
});

function fetchAndPopTable() {
    const tableContainer = document.getElementById("table-body");
    tableContainer.innerHTML = "";
    fetch("http://localhost:3000/dogs")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((dog) => {
                let newTableElement = document.createElement("tr");
                newTableElement.id = dog.id;

                let newName = document.createElement("td");
                newName.innerHTML = dog.name;

                let newBreed = document.createElement("td");
                newBreed.innerHTML = dog.breed;

                let newSex = document.createElement("td");
                newSex.innerHTML = dog.sex;

                let newEdit = document.createElement("td");
                let editButton = document.createElement("button");
                editButton.innerHTML = "Edit Dog";
                editButton.addEventListener("click", editDog);
                newEdit.append(editButton);

                newTableElement.append(newName, newBreed, newSex, newEdit);
                tableContainer.append(newTableElement);
            });
        });
}

function editDog(e) {
    const editForm = document.getElementById("dog-form");
    editForm.name.value = e.target.parentElement.parentElement.children[0].innerHTML;
    editForm.breed.value = e.target.parentElement.parentElement.children[1].innerHTML;
    editForm.sex.value = e.target.parentElement.parentElement.children[2].innerHTML;
    dogEditID = e.target.parentElement.parentElement.id;

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (dogEditID >= 0) {
            let dataObj = {
                name: e.target.name.value,
                breed: e.target.breed.value,
                sex: e.target.sex.value,
            };
            let postObj = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(dataObj),
            };
            fetch(`http://localhost:3000/dogs/${dogEditID}`, postObj).then((response) => {
                dogEditID = -1;
                e.target.name.value = e.target.breed.value = e.target.sex.value = "";
                fetchAndPopTable();
            });
        }
    });
}
