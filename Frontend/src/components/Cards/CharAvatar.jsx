import React from 'react'

const CharAvatar = ({fullName}) => {
    const getInitials = (fullName) => {
        if(!fullName) return
        const words = fullName.split(' ')
        let initials = "";
        for(let word of words){
            initials += word[0]
        }
        return initials.slice(0,2).toUpperCase()
    }
  return (
    <div className='w-20 h-20 flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100 '>
      <p className='text-2xl'>{getInitials(fullName)}</p>
    </div>
  )
}

export default CharAvatar
