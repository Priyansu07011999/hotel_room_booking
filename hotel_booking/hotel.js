
async function addingRoom(){
    const name = document.getElementById('name').value;
    const floor = document.getElementById('floor').value;
    const room = document.getElementById('room').value;

    try{
        await axios.post('https://crudcrud.com/api/d7545a6f3d8244e9b6a3230755457c8e/addingOnHotel', {name, floor, room})
        fetchAll()
    }
    catch(err){
        console.log(`${err} found`);
    }
}


async function fetchAll(){
    try{
        const respose = await axios.get('https://crudcrud.com/api/d7545a6f3d8244e9b6a3230755457c8e/addingOnHotel')
        const allData = respose.data;
        displayOnScreen(allData)
    }
    catch(err){
        console.log(`${err} found`)
    }
}

function displayOnScreen(allData){
    const bookingDiv = document.getElementById('bookings'); // Corrected typo here
    bookingDiv.innerHTML = '';
    allData.forEach(data => {
        const divBooking = document.createElement('div');
        divBooking.innerHTML = `<p style="color: white;">Name: ${data.name}, Floor No: ${data.floor}, Room No: ${data.room}</p>`

        // create edit button
        const editBtn = document.createElement('button')
        editBtn.textContent = "Edit"
        editBtn.style.backgroundColor = 'blue'
        editBtn.style.color = 'white'
        editBtn.style.borderColor = 'white'
        editBtn.style.borderRadius = '10px'


        // ADD edit functioanlity
        editBtn.onclick = () => edit_booking(data._id)

        // create delete Button
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.style.backgroundColor = 'red'
        deleteBtn.style.color = 'white'
        deleteBtn.style.borderColor = 'white'
        deleteBtn.style.borderRadius = '10px'
        deleteBtn.style.marginLeft = '10px'

        // add delete functionality 
        deleteBtn.onclick = () => delete_booking(data._id)

        // append child
        bookingDiv.appendChild(divBooking)
        bookingDiv.appendChild(editBtn)
        bookingDiv.appendChild(deleteBtn)

    });
}

async function edit_booking(_id){
    const newName = prompt('Update Your Name');
    const newFloor = prompt('Update Your Floor Number');
    const newRoom = prompt('Update Your Room')


    try{
        await axios.put(`https://crudcrud.com/api/d7545a6f3d8244e9b6a3230755457c8e/addingOnHotel/${_id}`, {name: newName, floor: newFloor, room: newRoom})
        fetchAll()
    }
    catch(err){
        console.log(`${err} found`)
    }
}

async function delete_booking(_id){
    try{
        await axios.delete(`https://crudcrud.com/api/d7545a6f3d8244e9b6a3230755457c8e/addingOnHotel/${_id}`)
        fetchAll()
    }
    catch(err){
        console.log(`${err} found`)
    }

}


fetchAll();