const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phones = data.data;
    displayPhones(phones)
}


const displayPhones = (phones) => {
    // get show button 
    const showButton = document.getElementById('show-button');
    if (phones.length > 12) {
        showButton.classList.remove('hidden')
    }
    else {
        showButton.classList.add('hidden')
    }

    phones = phones.slice(0, 12);

    // phone container 
    const phonesContainer = document.getElementById('phones-container');

    // clear previes content
    phonesContainer.textContent = '';



    // find each phone by foreach 
    phones.forEach(phone => {
        // create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img class="pt-10" src="${phone.image}" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;
        phonesContainer.appendChild(phoneCard);
    })
    loadingSpinner(false)
};

// handle details button on cards 
const handleShowDetails = (id) => {
    console.log(id)
}


const handleSearch = () => {
    // call loading spinner 
    loadingSpinner(true)
    // get input Field 
    const inputField = document.getElementById('search-input-field');
    const searchText = inputField.value;
    loadPhone(searchText)
}

// loading spinner 
const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById('loading-spinner');
    if (isLoading) {
        spinner.classList.remove('hidden')
    }
    else {
        spinner.classList.add('hidden')
    }
}

