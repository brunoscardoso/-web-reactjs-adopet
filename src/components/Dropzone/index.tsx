import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css'

interface FileProps {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<FileProps> = ({ onFileUploaded }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);

    onFileUploaded(file)
  }, [onFileUploaded]);
  
  const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/*'})

  return (
    <div className="dropzone"{...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {
        selectedFileUrl
        ? <img src={selectedFileUrl} alt="point-thumb" />
        : (
          <p>
            <FiUpload />
            Imagem do Pet
          </p>
        )
      }
    </div>
  )
}

export default Dropzone;