//get API from programming hero github
function loadData(search, isShowAll) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    .then((res) => res.json())
    .then((data) => displayData(data.data, isShowAll));
}
//display the API data
function displayData(phones, isShowAll) {
  // show all button 
  const showAll = document.getElementById('show-all-button');
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove('hidden');
  }
  else {
    showAll.classList.add('hidden')
  }
  // phone slice 
  if (!isShowAll) {
    phones = phones.slice(0, 12)
  }
  // not available picture 
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
        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-accent">Show Details</button>
        `;
    //append the created div into the phone container
    phoneContainer.appendChild(div);
  });
  toggleLoadingSpinner(false)
}
// handle show details 
const handleShowDetails = async (id) => {
  console.log('clicked on', id)
  // load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  displaySingleMobile(phone)
}

// single mobile details 
const displaySingleMobile = (phone) => {
  console.log(phone)
  show_details_modal.showModal()
  const displayContainer = document.getElementById('show_details_modal');
  displayContainer.classList = `modal modal-bottom sm:modal-middle`;
  displayContainer.innerHTML = `
  <div class="modal-box">
      <img src="${phone.image}">
      <h3 class="font-bold text-lg">Brand - ${phone.brand}</h3>
      <p class="py-4">${phone.name}</p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  `
}

// search handler
const handleSearch = (isShowAll) => {
  // get input field and value
  const inputValue = document.getElementById("inputField");

  const value = inputValue.value;
  toggleLoadingSpinner(true)
  //call the main function
  loadData(value, isShowAll);
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

// handle show all button
const handleShowAll = () => {
  handleSearch(true)
}
