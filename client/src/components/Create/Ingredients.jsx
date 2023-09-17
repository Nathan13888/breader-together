import React, { useContext, useState } from "react";

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }
  
    return (
        <div className="w-full max-w-md mx-auto mt-10 p-5 bg-white rounded shadow-md">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                </div>
                
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                </div>
                
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full p-2 border rounded-md"
                    />
                </div>
                
                <div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                </div>
            </form>
        </div>
    );
  }