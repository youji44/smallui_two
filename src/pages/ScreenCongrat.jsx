import React from 'react'
import { Button, Result, Card, Row, Col } from 'antd';
import './screen.css'

const ScreenCongrat = () => {
  return (
    <div className='loaderScreen'>
        <Row className='justfyContent-center'>
            <Col xs={22} sm={22} md={22} lg={18} xl={14}>
                <Card className='cardc' style={{height:"100%",width:"100%"}}>
                    <Result
                        status="success"
                        title="Congratulation Admin has Approved Your Account"
                    />
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default ScreenCongrat