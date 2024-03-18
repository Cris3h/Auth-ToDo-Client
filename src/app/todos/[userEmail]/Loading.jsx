import Image from 'next/image'
import React from 'react'
import loading from '../../../../public/loading.gif';


export default function Loading(){
  return (
    <Image src={loading}></Image>
  )
}
