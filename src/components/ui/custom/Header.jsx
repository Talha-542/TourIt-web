import {} from 'react'
import { Button } from '../button'

function Header() {
  return (
    <div className='p-2 shadow-md flex justify-between items-center px-5'>
        <img src="/logo.svg" alt="" />
        <div>
            <Button>Sign Up</Button>
        </div>

    </div>
  )
}

export default Header