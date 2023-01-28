import React from 'react'
import { Space, Image, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './screen.css'


const ScreenLogo = () => {

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
        <Space className='w-100 text-center' direction='vertical' size={20}>
            <Image src='/images/danske-bank-logo.svg' />
            <Spin indicator={antIcon} />
        </Space>
    </div>
  )
}

export default ScreenLogo