//get API from programming hero github
function loadData(search) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
}
//display the API data
function displayData(phones) {
  const notAvailableImg = document.getElementById('not-available-image');
  if (phones.length < 1) {
    notAvailableImg.classList.remove('hidden')
  }
  else {
    notAvailableImg.classList.add('hidden')
  }
  // get phone container
  const phoneContainer = document.getElementById("phone-container");
  //   clear before content
  phoneContainer.textContent = "";
  //get each phone from phones
  phones.forEach((phone) => {
    //   create a div
    const div = document.createElement("div");
    div.classList = `card w-96 p-5 w-[90%] flex flex-col items-center border rounded-lg bg-[#eef1f5]`;
    // set the API values into a card
    div.innerHTML = `
        <img src="${phone.image}">
        <h1>Name: ${phone.phone_name}</h1>
        <h4>Name: ${phone.brand}</h4>
        `;
    //append the created div into the phone container
    phoneContainer.appendChild(div);
  });
  toggleLoadingSpinner(false)
}

// search handler
const handleSearch = () => {
  // get input field and value
  const inputValue = document.getElementById("inputField");

  const value = inputValue.value;
  toggleLoadingSpinner(true)
  //call the main function
  loadData(value);

  inputValue.value = "";
};

// loading spinner 
const toggleLoadingSpinner = (condition) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if (condition) {
    loadingSpinner.classList.remove('hidden')
  }
  else {
    loadingSpinner.classList.add('hidden')
  }
}
