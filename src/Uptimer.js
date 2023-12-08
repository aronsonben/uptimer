import './Uptimer.css';
import { useState, useEffect } from 'react';
import { Form, Button, Input, InputGroup, InputGroupText, Table } from 'reactstrap';
import { useStopwatch } from 'react-timer-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKLOG_SAMPLE = [
  {id: 1, time: '00:23:46', goal: 'research', notes: 'ice creams', tags: ['food']},
  {id: 2, time: '00:09:18', goal: 'pay rent', notes: 'nov. 23', tags: ['finance', 'rent']}
]

function GoalBox({ goal, onGoalInput, isRunning, handleStart, handleStop }) {
  return (
    <div className="Box">
      <Form>
        <InputGroup>
          <InputGroupText>
            Goal
          </InputGroupText>
          <Input 
            placeholder="Enter your task goal" 
            onChange={(e) => onGoalInput(e.target.value)} 
            value={goal}
          />
         <Button onClick={isRunning ? handleStop : handleStart} >
            {!isRunning ? "Go!" : "Stop" }
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

function TimerBox({ days, hours, minutes, seconds }) {
  return (
    <div className="Box">
      <div>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  )
}

function LogTable({ taskLog }) {
  return (
    <div className="Box">
      <Table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Goal</th>
            <th>Notes</th>
            <th>Tags</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {taskLog.map((task) => {
            return (
              <LogItem task={task} />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

function LogItem({ task }) {
  return (
    <tr>
      <td>{task.time}</td>
      <td>{task.goal}</td>
      <td>{task.notes}</td>
      <td>{task.tags.toString()}</td>
      <td>Edit. Delete</td>
    </tr>
  );
}


function Uptimer() {
  const [goal, setGoal] = useState('');
  const [taskLog, setTaskLog] = useState([]);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  // Fetch log data from AsyncStorage on mount
  useEffect(() => {
      AsyncStorage.clear();
      storeData(TASKLOG_SAMPLE);
      async function startFetching() {
        setTaskLog(await getData());
      }
      startFetching();
  }, []);

  // Fetch log data on update 
  // useEffect(() => {
  //   console.log('on update');

  //   async function startFetching() {
  //     let data = await getData();
  //     setTaskLog(data);
  //   }
    
  //   if (fetchIfTrue) {
  //     startFetching();
  //   }

  //   return () => {
  //     setFetch(false);
  //   }
  // }, [fetchIfTrue]);

  // Add new data to AsyncStorage
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('taskLog', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  // Fetch data from AsyncStorage
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('taskLog');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const showData = async () => {
    let data = await getData();
    console.log(data);
  }

  /*const logNewTask = async (task) => {
    // let test = {id: 3, time: '00:09:17', goal: 'extra', notes: 'new one', tags: ['test']};
    let data = await getData();
    data.push(task);
    await storeData(data);
    let newData = await getData();
    console.log(newData);
    setTaskLog(newData);
  }
  */

  function handleStart() {
    start(); 
  }

  function handleStop() {
    pause();
  }

  return (
    <div className="Uptimer">
      <GoalBox 
        goal={goal} 
        onGoalInput={setGoal}
        isRunning={isRunning} 
        handleStart={handleStart}
        handleStop={handleStop}
        />
      <TimerBox 
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
      <LogTable 
        taskLog={taskLog}
      />
      <button onClick={showData}>data</button>
    </div>
  );
}

export default Uptimer;
