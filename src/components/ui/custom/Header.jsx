import {} from 'react'
import { Button } from '../button'

function Header() {
  return (
    <div className='p-2 shadow-md flex justify-between items-center px-5'>
      <div className='flex items-center gap-2'>
        <img src="/src/components/ui/custom/logo.png" className='w-12 h-12' alt="TourIt Logo" />
<span className='text-3xl font-extrabold text-primary'>Tour It</span>
      </div>
        <div>
            <Button>Sign Up</Button>
        </div>

    </div>
  )
}

export default Header