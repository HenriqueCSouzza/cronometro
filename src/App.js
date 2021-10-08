import { useState } from 'react'
import Iframe from 'react-iframe'
import {
  Button,
  ButtonGroup,
  Container,
  Center,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
} from '@chakra-ui/react'
import { useTimer } from 'react-timer-hook'
import './App.css'

function MyTimer() {
  const [value, setValue] = useState(30)
  const handleChange = (value) => setValue(value)
  const [alert, setAlert] = useState(false)
  const expiryTimestamp = new Date()
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + value)

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => setAlert(true),
  })

  return (
    <Container maxW="container.sm">
      <Box p={4}>
        <Center style={{ fontSize: '50px' }}>
          <span>{minutes}</span>:<span>{seconds}</span>
        </Center>
        <Center>
          <Spinner
            thickness="4px"
            speed={isRunning ? '0.65s' : '0.00s'}
            emptyColor="gray.200"
            color="blue.500"
            size="sm"
          />
        </Center>

        <Center>
          <p style={{ color: 'red', height: 18 }}>
            {alert && 'Acabou o tempo'}
          </p>
        </Center>
      </Box>
      <ButtonGroup variant="outline" size="xs">
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            start()
            setAlert(false)
          }}
        >
          Start
        </Button>
        <Button colorScheme="red" onClick={pause}>
          Pause
        </Button>
        <Button
          onClick={() => {
            resume()
            setAlert(false)
          }}
          colorScheme="blue"
        >
          Resume
        </Button>
        <Button
          onClick={() => {
            const time = new Date()
            time.setSeconds(time.getSeconds() + value)
            restart(time)
            setAlert(false)
          }}
          colorScheme="linkedin"
        >
          Restart
        </Button>
      </ButtonGroup>
      <Slider
        flex="1"
        focusThumbOnChange={false}
        value={value}
        onChange={handleChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={value} />
      </Slider>
    </Container>
  )
}
function App() {
  return (
    <span className="App">
      <div className="clock-container">
        <MyTimer />
      </div>
      <div>
        <Iframe
          url={`https://jeopardylabs.com/edit/zaga-7`}
          width="100%"
          height="100%"
          id="rt"
          className="myClassname"
          display="initial"
          allowFullScreen="fullscreen"
          position="relative"
        />
      </div>
    </span>
  )
}

export default App
