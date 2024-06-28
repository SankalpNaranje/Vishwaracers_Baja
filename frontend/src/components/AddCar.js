import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import noteContext from "../context/notes/noteContext";
import './AddCar.css'

const Addcar = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const navigate = useNavigate(); 

  const [note, setNote] = useState({ name: '', description: '', cost: '', images: [],Used_for:'' });

  const handleClick = async (e) => {
    e.preventDefault();
    const{name , description , cost , images , Used_for } = note;
    const formData = new FormData();
    formData.append("name" , name);
    formData.append("description" , description);
    formData.append("cost", cost);
    formData.append("Used_for" , Used_for);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    const response = await fetch(`https://vishwaracers-baja-backend.vercel.app/api/rent/addcar`,{
      method : 'POST',
      headers: {
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/json',
      }, // This is needed if you want to upload files with this request
      body: formData, 
    });
    // console.log("Sucesfully Added Data In Database")
    const json = await response.json();
    console.log(json);
    navigate('/home'); 
  };

  const handleImageChange = (e) => {
    setNote({
      ...note,
      images: e.target.files, // Update the images state with selected files
    });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
    return (
      <div className="add_car">
<div className="Addingcar" id='Addingcar'>
  <div className="row" style={{padding: 150}}>
    <div className="col-md-6 newCarDetails">
      <h2 className='addar-text'>ADD NEW FLEET IN THE ROOM</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">VEHICLE NAME</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={note.name} onChange={onChange} minLength={3} required placeholder='Enter Vehicle Name'/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">VEHICLE DESCRIPTION</label>
          {/* <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder='Enter Vehicle Description' onChange={onChange} minLength={5} required /> */}
          <textarea
            className="form-control"
            id="description"
            value={note.description}
            onChange={onChange}
            name="description"
            placeholder="Enter Description"
            minLength={5}
             required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cost" className="form-label">PRICE</label>
          <input type="text" className="form-control" id="cost" name="cost" value={note.cost} placeholder='Enter Price (in RS)' onChange={onChange} required />
        </div>
        <div className="form-group">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          className="form-control"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>

        <div className="mb-3">
            <label htmlFor="Used_for" className="form-label">TYPE OF VEHICLE</label>
                <select className="form-select" value={note.Used_for} onChange={onChange} name="Used_for" id="Used_for">
                    <option value="">Select Occupation</option>
                    <option value="farmer">Farmer</option>
                    <option value="manager">Manager</option>
                    <option value="tourist">Tourist</option>
                    {/* Add more options as needed */}
                </select>
        </div>

        <button disabled={note.name.length < 3 || note.description.length < 5} type="submit" className="team-engage-button" onClick={handleClick}>Add Car</button>
      </form>
    </div>
    <div className="col-md-6" style={{margin: 'auto' , mixBlendMode:"darken"}}>
      <img src='https://pbs.twimg.com/media/EPm_tKZUUAEAgod.jpg' alt="Car" className="img-fluid" />
    </div>
  </div>
</div>
</div>

    )
}

export default Addcar
