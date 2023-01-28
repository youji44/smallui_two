import React, { useEffect } from 'react'
import { Result, Row, Col, Card } from 'antd';
import './screen.css'

const ScreenApprov = () => {
  useEffect(()=>{
    setTimeout(()=>{
        window.location.href="/approved?register=true"
    },[3000])
  },[])
  return (
    <div className='loaderScreen'>
        <Row className='justfyContent-center'>
            <Col xs={22} sm={22} md={22} lg={18} xl={14}>
                <Card className='cardc' style={{height:"100%",width:"100%"}}>
                    <Result
                        title="Admin will Approve Your Account"
                    />
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default ScreenApprov