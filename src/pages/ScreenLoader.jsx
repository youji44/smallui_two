import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './screen.css'

const ScreenLoader = () => {

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
      }}
      spin
    />
  );

  return (
    <div className='loaderScreen'>
        <Spin indicator={antIcon} />
    </div>
  )
}

export default ScreenLoader