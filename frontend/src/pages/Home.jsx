import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { Link, Links} from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import Spin from '../components/Spin.jsx';
import Bookstable from '../components/Home/Bookstable.jsx';
import Bookscard from '../components/Home/Bookscard.jsx';

const Home = () => {
    const [books,setbooks] =useState([]);
    const [loading,setloading]=useState(false);
    const[showtype,Setshowtype]=useState('table');
    useEffect(() => {
      setloading(true);
      axios.get("http://localhost:9000/books")
      .then((response)=>{
        setbooks(response.data.data);
        setloading(false);
      })
      .catch((error)=>{
        console.log(error);
        setloading(false);
      })
    },[]);
    
  return (
    
    <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => Setshowtype('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => Setshowtype('card')}
        >
          Card
        </button>
      </div>
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl my-8'>Books List</h1>
            <Link to='/books/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl'></MdOutlineAddBox></Link>
        </div>
        {loading?<Spin/>:showtype=='table'?(
            <Bookstable books={books}/>
        ):(<Bookscard books={books}/>)}
      
    </div>
  )
}

export default Home
