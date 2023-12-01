import './Uptimer.css';
import { useState, useEffect } from 'react';
import { Form, Button, Input, InputGroup, InputGroupText, Table } from 'reactstrap';
import { useStopwatch } from 'react-timer-hook';

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
            console.log(task);
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
  // const [taskLog, setTaskLog] = useState(TASKLOG_SAMPLE);
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
        taskLog={TASKLOG_SAMPLE}
      />
    </div>
  );
}

export default Uptimer;
