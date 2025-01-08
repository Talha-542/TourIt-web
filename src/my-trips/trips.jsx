import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Mytrips() {
    useEffect(()=>{
        GetUserTrips();
    },[])

    const GetUserTrips=()=>{
        const user=localStorage.getItem('user');
        const navigate=useNavigate();
        if(!user){
            navigate('/');
            return;
        }


    }

  return (
    <div className="px-10 py-20 md:px-20 lg:px-44 xl:px-56">
        <h1 className="text-4xl font-bold text-primary">
            My trips
        </h1>
    </div>
  )
}

export default Mytrips