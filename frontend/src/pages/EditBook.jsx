import React,{useState,useEffect} from 'react';
import Backbutton from '../components/Backbutton';
import Spin from '../components/Spin';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishyear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id}=useParams();
  useEffect(()=>{
    setLoading(true);
    axios.get(`http://localhost:9000/books/${id}`)
    .then((response) => {
      setLoading(true);
      const book = response.data;
      setTitle(book.title || 'NEW TITLE'); // Make sure to set default empty string
      setAuthor(book.author || 'NEW AUTHOR'); // Make sure to set default empty string
      setPublishYear(book.publishYear || '');
      setLoading(false); // Make sure to set default empty string
    })
    .catch((error) => {
      setLoading(false);
      console.error(error);
    });
}, [id])
  const handleeditBook=()=>{
    const data={
      title,
      author,
      publishyear,
    };
    setLoading(true);
    axios.put(`http://localhost:9000/books/${id}`,data)
    .then(()=> {
      setLoading(false);
      navigate('/');
    }) .catch ((error)=> {
      setLoading(false);
      console.log(error);
    })
  }
  return (
    <div className='p-4'>
      <Backbutton/>
      <h1 className='text-3xl my-4'>edit book</h1>
       {loading ? <Spin /> : ''}
       <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishyear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2  w-full '
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleeditBook}>
          Save
        </button>
      </div>

    </div>
  )
}

export default EditBook
