const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json()
    const phones = data.data;
    displayPhones(phones)
}


const displayPhones = (phones) => {
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
            <button class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;
        phonesContainer.appendChild(phoneCard)
    })
}

const handleSearch = () => {
    // get input Field 
    const inputField = document.getElementById('search-input-field');
    const searchText = inputField.value;
    loadPhone(searchText)
}



