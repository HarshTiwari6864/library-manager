import React,{useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Backbutton from '../components/Backbutton';
import Spin from '../components/Spin';
const DeleteBook = () => {
  const[loading,setloading]=useState(false);
  const navigate = useNavigate();
  const {id}=useParams();
  const handledeletebook=()=>{
    setloading(true);
    axios.delete(`http://localhost:9000/books/${id}`)
    .then(()=>{
      setloading(false);
      navigate('/');
    })
    .catch((error)=>{
      console.log(error);
      setloading(false);
    })
  }
  return (
    <div className='p-4'>
    <Backbutton />
    <h1 className='text-3xl my-4'>Delete Book</h1>
    {loading ? <Spin /> : ''}
    <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
      <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

      <button
        className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handledeletebook}
      >
        Yes, Delete it
      </button>
    </div>
  </div>
  )
}

export default DeleteBook
