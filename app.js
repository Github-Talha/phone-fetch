//get API from programming hero github
function loadData(search) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
}
//display the API data
function displayData(phones) {
  // get phone container
  const phoneContainer = document.getElementById("phone-container");
  //get each phone from phones
  phones.forEach((phone) => {
    //   create a div
    const div = document.createElement("div");
    div.classList = `card w-96`;
    // set the API values into a card
    div.innerHTML = `
        <img src="${phone.image}">
        <h1>Name: ${phone.phone_name}</h1>
        <h4>Name: ${phone.brand}</h4>
        `;
    //append the created div into the phone container
    phoneContainer.appendChild(div);
    //style the div
    div.style.padding = "20px";
    div.style.width = "90%";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.border = "2px solid #ccc";
    div.style.borderRadius = "10px";
  });
}

// search handler
const handleSearch = () => {
  // get input field and value
  const inputValue = document.getElementById("inputField");

  const value = inputValue.value;
  //call the main function
  loadData(value);

  inputValue.value = "";
};
