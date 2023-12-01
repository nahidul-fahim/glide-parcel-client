/* 
Tried to make a shared component here. The filed upload functionality is working. But could not implement this as shared component. Need to work on it later to make this component work as shared component.
*/




import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";


// image hosting api and url
const imageHostngApiKey = import.meta.env.VITE_IMAGE_HOSTING_SECRETKEY;
const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageHostngApiKey}`;


const ImageUpload = () => {

    //hooks and custom hooks

    //file to send in imgbb
    const [selectedFile, setSelectedFile] = useState(null);
    //file name to show on display
    const [selectedImage, setSelectedImage] = useState('');


    // handlge file name change when image selected
    const handleFileChange = e => {
        e.preventDefault();
        const fileInput = e.target;
        if (fileInput.files.length > 0) {
            setSelectedFile(e.target.files[0])
            setSelectedImage(fileInput.files[0].name)
        }
        else {
            setSelectedImage('')
        }
    }


    // file upload to imgbb
    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);


            axios.post(imageUploadUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    key: imageHostngApiKey,
                },
            })

                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {
                    console.error('Error uploading image:', error);
                });

        }
    }


    return (
        <div>
            <label
                htmlFor="photo"
                className="relative flex items-center justify-start w-full h-10 cursor-pointer bg-[#ffffff00] text-darkgray"
            >
                <span className="text-darkgray font-heading font-medium ml-[30px]">
                    {selectedImage || 'Your profile image'}
                </span>
                <input
                    type="file"
                    name="photo"
                    id="photo"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
                <FaUpload className="absolute top-3 left-0 text-darkgray" />
            </label>

            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImageUpload;