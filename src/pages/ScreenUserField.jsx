import React, { useState } from 'react'
import { Form, Row, Col, Input, Card, Button } from 'antd';
import './screen.css'

const ScreenUserField = () => {
    const [name, setName]= useState('')
    const getApi=()=>{
        var requestOptions = {
        method: 'get',
        redirect: 'follow',
        }
        fetch('https://api.db-ip.com/v2/free/self',requestOptions)
        .then(response=>response.json())
        .then(result=>{
        console.log(result?.ipAddress)
        console.log(get_browser())
        })
        .catch((error)=>{})
    }
    function get_browser() {
        var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
        if(/trident/i.test(M[1])){
            tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
            return {name:'IE',version:(tem[1]||'')};
            }   
        if(M[1]==='Chrome'){
            tem=ua.match(/\bOPR|Edge\/(\d+)/)
            if(tem!=null)   {return {name:'Opera', version:tem[1]};}
            }   
        M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
        return ( M[0] + " " + M[1])
     }
  return (
    <div className='loaderScreen'>
        <Row className='w-100 justfyContent-center'>
            <Col xs={22} sm={22} md={18} lg={20}>
                <Form
                    layout='horizontal'
                >
                    <Card className='cardc'>
                        <Row className='w-100' gutter={[32,32]}>
                            <Col span={24}>
                                <Form.Item label='User Name'>
                                    <Input 
                                        className="w-100" 
                                        style={{padding:"8px 11px"}} 
                                        onChange={(e)=>{
                                            setName(e.target.value)
                                        }}
                                        />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button onClick={getApi}>Submit</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Form>
            </Col>
        </Row>
    </div>
  )
}

export default ScreenUserField