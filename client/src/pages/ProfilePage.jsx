import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import React, { useState } from 'react';


const ProfilePage = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const navigate = useNavigate();
    const [name, setName] = useState("Martin");
    const [bio, setBio] = useState("Hi everyone, You are using quickChat");

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/')
    }

  return (
    
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
             border-gray-600 flex items-center justify-between max-sm:flex-col-reverse
              rounded-lg'>
        <form onSubmit = {handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg">Profile details</h3>
          {/* Upload Profile Image */}
          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id='avatar'
              accept='.png, .jpg, .jpeg'
              hidden />
              <img
                src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon}
                alt=""
                className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} />
                <span>Upload Profile Image</span>
          </label>
          {/* Name Input */}
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required placeholder="Your name"
              className="w-full bg-transparent border border-gray-400 
                         rounded-md px-3 py-2 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          {/* Bio Input */}
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Hi Everyone, I am using QuickChat"
              className="w-full bg-transparent border border-gray-500 
                         rounded-md px-3 py-2 text-white placeholder-gray-300 
                         focus:outline-none focus:ring-2 focus:ring-violet-500"
              rows={3}>
            </textarea>

          {/* Save Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-violet-500 
                        text-white px-5 py-2 rounded-md 
                        hover:opacity-90 transition-all w-full mt-3">
              Save Profile
            </button>
        </form>
            <img className=' "max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10' src={assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfilePage
