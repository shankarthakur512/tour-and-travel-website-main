import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { addGuide } from '../../Redux/GuideSlice';

const languagesList = [
  'English', 'Hindi', 'Punjabi', 'Spanish', 'French', 
  'German', 'Mandarin', 'Japanese', 'Korean', 'Italian',
];

const GuideQuestions = ({ imageCaptured, setProfileComp, setGuideData , image}) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isAccepted, setIsAccepted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
   const dispatch = useDispatch()

  const GuideData  = useSelector((state) => state.Guide.userData);
  const handleCheckboxChange = () => {
    setIsAccepted(!isAccepted);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddLanguage = (language) => {
    if (!selectedLanguages.includes(language)) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
    setSearchTerm(''); 
  };

  const handleRemoveLanguage = (language) => {
    setSelectedLanguages(selectedLanguages.filter(lang => lang !== language));
  };

  const filteredLanguages = languagesList.filter(language =>
    language.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedLanguages.includes(language)
  );

  const onSubmit = (data) => {
    if (isAccepted && imageCaptured) {
      console.log('Form Submitted:', data, selectedLanguages);
      setGuideData({...data , Languages : selectedLanguages , Photo : image})
      // dispatch(addGuide({...GuideData , data , languages : selectedLanguages}))
      setProfileComp(false);
    } else {
      toast.error('Please accept the terms and conditions and ensure all fields are filled.');
    }
  };

  return (
    <div className="p-5 rounded-lg">
      <h1 className="text-2xl font-serif mb-4">Some more details</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Do you belong to the place where you want to serve?
          </label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Enter Yes/No"
            {...register('placeBelonging', { required: true })}
          />
          {errors.placeBelonging && <span className="text-red-500 text-sm">This field is required</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Languages you are comfortable with
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
            placeholder="Search for a language"
          />
          {searchTerm && (
            <ul className="border rounded bg-white mt-2">
              {filteredLanguages.map((language, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleAddLanguage(language)}
                >
                  {language}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Selected Languages
          </label>
          <div className="flex flex-wrap">
            {selectedLanguages.map((language, index) => (
              <div key={index} className="bg-primary text-white px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
                {language}
                <button
                  type="button"
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveLanguage(language)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            About yourself
          </label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-700"
            placeholder="About yourself"
            {...register('aboutYourself', { required: true })}
          />
          {errors.aboutYourself && <span className="text-red-500 text-sm">This field is required</span>}
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="h-4 w-4 text-primary bg-primary border-gray-300 rounded"
            checked={isAccepted}
            onChange={handleCheckboxChange}
          />
          <label className="ml-2 block text-sm text-gray-900">
            I accept the <a href="#" className="text-blue-600 hover:underline">policy</a> and <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>.
          </label>
        </div>

        <button
          type="submit"
          className={`px-4 py-2 rounded ${isAccepted && imageCaptured ? 'bg-gradient-to-r from-primary to-secondary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={!isAccepted || !imageCaptured}
        >
          Submit 
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default GuideQuestions;
