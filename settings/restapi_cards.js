const url = "https://retoolapi.dev/Kd3wdP/data";

document.addEventListener("DOMContentLoaded", () => {
    readData();
    const createButton = document.getElementById("createButton");
    const readButton = document.getElementById("readButton");
    const usersList = document.getElementById("usersList");
    const userForm = document.getElementById("userForm");
    const userFormButton = document.getElementById("userFormButton");
    const idInput = document.getElementById("id");
    const industryNameInput = document.getElementById("industryName");
    const emailAddressInput = document.getElementById("emailAddress");
    const locationInput = document.getElementById("location");


    async function readData() {
        await fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (items) {
                let outPut = document.getElementById("dataOutput");
                let out = "";
                for (let item of items) {
                    out += `
                            <div class="col-sm-6 col-md-3 ">
                                <div class="card h-100 border-info text-bg-dark mb-3">
                                    <div class="card-body text-info">
                                        <h5 class="card-title">${item.Industry}</h5>
                                    </div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item list-group-item-info bg-info border-dark">${item["Email Address"]}</li>
                                        <li class="list-group-item list-group-item-info bg-info border-dark">${item.Location}</li>
                                    </ul>
                                    <div class="card-footer">
                                        <button class="btn btn-outline-success" onclick="loadFormWithData(${item.id})">Update</button>
                                        <button class="btn btn-outline-danger" onclick="deleteUser(${item.id})">Delete</button>
                                    </div>
                                    </div>
                            </div>`
                }
                outPut.innerHTML = out;
            });
    };
    readData();

    createButton.addEventListener("click", () => {
        clearUserForm();
        displayUserForm();
        displayCreateButton();
    });

    readButton.addEventListener("click", () => {
        readData();
        displayUserList();
    })

    userForm.addEventListener("submit", event => {
        event.preventDefault();
        const industry = industryNameInput.value;
        const email = emailAddressInput.value;
        const location = locationInput.value;
        const id = parseInt(idInput.value);
        const user = {
            Industry: industry,
            "Email Address": email,
            Location: location
        };
        if (id == 0) {
            createUser(user);
        }
        else {
            updateUser(id, user);
        }
    });

    async function createUser(user) {
        console.log(user);
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok) {
            readData();
            clearUserForm();
            alert("You've successfully created this record");
        }
        else {
            alert("There was an error creating this record!");
        };
        displayUserList();
    };

    async function loadFormWithData(id) {
        displayUserForm();
        const response = await fetch(url + "/" + id);
        if (!response.ok) {
            readData();
            alert("There was an error loading the updater form!")
            return;
        }
        const user = await response.json()
        console.log(user);
        idInput.value = user.id;
        industryNameInput.value = user.Industry;
        emailAddressInput.value = user["Email Address"];
        locationInput.value = user.Location;
        displayUpdateButton();
    };

    async function updateUser(id, user) {
        const response = await fetch(url + "/" + id, {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            alert("There was an error updating this record!");
            return;
        }
        else {
            alert("You've successfully updated this record!")
        }
        displayUserList();
    };

    async function deleteUser(id) {
        const userConfirm = confirm("Are you sure you want to delete this record?")
        if (!userConfirm) {
            return;
        }
        else {
            const response = await fetch(url + "/" + id, {
                method: "DELETE"
            });
            readData();
            if (!response.ok) {
                alert("There was an error deleting this record!");
            }

        };
    };

    function displayUserList() {
        readData();
        userForm.classList.add("d-none");
        usersList.classList.remove("d-none");
    };

    function displayUserForm() {
        usersList.classList.add("d-none");
        userForm.classList.remove("d-none");
    };

    function clearUserForm() {
        idInput.value = "0";
        industryNameInput.value = "";
        emailAddressInput.value = "";
        locationInput.value = "";
    };

    function displayUpdateButton() {
        userFormButton.textContent = "Update";
        userFormButton.classList.remove("btn-outline-dark");
        userFormButton.classList.add("btn-outline-light");
    };

    function displayCreateButton() {
        userFormButton.textContent = "Create";
        userFormButton.classList.remove("btn-outline-light");
        userFormButton.classList.add("btn-outline-dark");
    };

    window.deleteUser = deleteUser;
    window.loadFormWithData = loadFormWithData;
    readData();
});