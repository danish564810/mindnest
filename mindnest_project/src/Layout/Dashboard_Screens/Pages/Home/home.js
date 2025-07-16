import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../useAuth/useAuth";
import { getWellnessGuide } from "../../../../Api";
import { getAllPatientTask } from "../../../../Api";
import { getCareManagerDetails } from "../../../../Api";
import { getPatientAppointment } from "../../../../Api";
import IntakeModal from "../../Components/Modal/IntakeModal";
import AddNewModal from "../../Components/Modal/AddNewModal";
import Dropdown from 'react-bootstrap/Dropdown';
import hiImage from "../../../../assests/images/hi_image.png";
import noPatient from "../../../../assests/svgs/no-Shape.svg"
import Task from "../../Components/Tasks/Task";

const Home = () => {
    //First name

    const { authToken, user } = useAuth();
    //wallness Guide
    const [wellnessData, setWellnessData] = useState(null);
    //care manager
    const [careManagerData, setCareManagerData] = useState(null);
    //patient appointment
    const [patientAppointment, setPatientAppointment] = useState(null);
    //add toggle
    const [isActive, setActive] = useState(true);
    //add modal
    const [Addnew, setAddNew] = useState(false);
    const [registeringFor, setRegisteringFor] = useState(null); 
    //show modal
    const [showModal, setShowModal] = useState(false);
    //show error message
    const [errorMessage, setErrorMessage] = useState(false);
    //get value
    const [inputValue, setInputValue] = useState('');
    //todo
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    
    //complete state
    const [completeTask, setCompleteTask] = useState(() => {
        const savedCompleteTasks = localStorage.getItem('completeTask');
        return savedCompleteTasks ? JSON.parse(savedCompleteTasks) : []
    });
    const [description, setDescription] = useState('');
    const [selectedTask, setSelectedTask] = useState('');

    //fetch Api
    //wallness guide
    const fetchWellnessData = async () => {
        if (!authToken) return;
        try {
            const response = await getWellnessGuide(authToken);
            if (response && response.data) {
                setWellnessData(response.data);
            } else {
                setErrorMessage('No wellness data available.');
            }
        } catch (error) {
            setErrorMessage('Error occurred while fetching wellness data: ' + error.message);
        }
    };
    
    //total task
    const fetchTotalTasksData = async () => {
        if (!authToken) return;
        try {
            const response = await getAllPatientTask(authToken);
            if (response && response.data) {
                const { completedTaskList = [], inCompleteTaskList = [] } = response.data;
              setTodos(inCompleteTaskList); // Incomplete tasks
              setCompleteTask(completedTaskList); // Completed tasks
                
            } else {
                setErrorMessage('Error Occured');
            }
        } catch (error) {
            setErrorMessage('Error occurred while fetching total tasks: ' + error.message);
        }
    };
    //care manager
    const fetchCareManagerData = async () => {
        if (!authToken) return;
        try {
            const response = await getCareManagerDetails(authToken);
            if (response && response.data) {
                setCareManagerData(response.data.careManager[0] || null);
            } else {
                setErrorMessage('No care manager data available.');
            }
        } catch (error) {
            setErrorMessage('Error occurred while fetching care manager data: ' + error.message);
        }
    }
    //fetch patient appointment
    
    const fetchPatientAppoitnment = async () => {
        if (!authToken) return;
        try {
            const response = await getPatientAppointment(authToken);
            if (response && response.data) {
                setPatientAppointment(response.data.appointments[0] || null);
            } else {
                setErrorMessage('No care manager data available.');
            }
        } catch (error) {
            setErrorMessage('Error occurred while fetching care manager data: ' + error.message);
        }
    }
   
    // Fetch both wellness data and tasks when token changes
    useEffect(() => {
        if (authToken) {
            fetchWellnessData();
            fetchTotalTasksData();
            fetchCareManagerData();
            fetchPatientAppoitnment();
        }
    }, [authToken]);

//show modal
const modalOpen = () =>{
    setShowModal(true);
}



    //task count
    const totalTask = wellnessData ? wellnessData.totalTask : 0;
    const completedTask = wellnessData ? wellnessData.completedTask : 0;


    //percentage
    const complitionPercentage = totalTask === 0 ? 0 : Math.round((completedTask / totalTask) * 100)
    //toggle add new
    const toggleClass = () => {
        setActive(!isActive);
    }

    const handleInputChange = (event) => {
        const value = event.currentTarget.value;
        setInputValue(value);
        if (value.trim() !== "") {
            setErrorMessage('');
        }
    }

    //store todo task in local storage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        localStorage.setItem('completeTask', JSON.stringify(completeTask));
    }, [todos, completeTask]);
    //detele task
    const handleDelete = (index) => {
        const newList = todos.filter((_, i) => i !== index);
        setTodos(newList);
    }
    //complete
    const markTaskComplete = (task) => {
        if (task) {
            // Remove task from todos
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== task.id));

            // Add task to completeTask with completed set to true
            setCompleteTask((prevCompleteTask) => [
                ...prevCompleteTask,
                { ...task, completed: true }
            ]);
        }
    }
    //undo task
    const undoTask = (task) => {
        setCompleteTask((prevCompleteTask) =>
            prevCompleteTask.filter((t) => t.id !== task.id) // Remove task from completeTask
        );
        setTodos((prevTodos) => [
            ...prevTodos,
            { ...task, completed: false } // Add task back to todos with completed set to false
        ]);
    };


    //show validation on click add new button
    const onClickBtn = () => {
        // Check if input value is empty (trimmed to handle leading/trailing spaces)
        if (inputValue.trim() === "") {
            setAddNew(false);
            setErrorMessage('The Title field is required.');
        } else {
            setAddNew(true);
            setErrorMessage('');
        }
    }

    //edit task
    const handleEdit = (task) => {
        setSelectedTask(task);
        setInputValue(task.title);
        setDescription(task.description);
        setAddNew(true);
    };


    //handle discription and submit task


    const handleDescriptionChange = (event) => {
        const value = event.target.value;
        setDescription(value || '');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue) {
            setErrorMessage('the title field is required');
        }
        else {
            if (selectedTask) {
                setTodos(todos.map((task) =>
                    task.id === selectedTask.id ? { ...task, title: inputValue, description } : task
                ));
            }
            else {
                const newTask = {
                    title: inputValue, description, completed: false, id: Date.now()
                };
                setTodos([...todos, newTask])
            }
            setInputValue('');
            setDescription('');
            setAddNew(false);  // Close modal
            setSelectedTask(null);
        }
    }


    return (
        <>
            <div className="card-dashboard scrol-inner">
                <div className="card-main-sec">
                    <div className="inner-card">
                        <div className="col-lg-5  col-md-12 col-sm-12">
                            <div className="nam-sh">
                                <div className="na-mai d-flex align-items-center">
                                    <div className="na-txt">
                                        <h2 className="mb-0">Hi, {user ? user.firstName : 'Guest'}
                                            <img src={hiImage} alt="hi-image" />
                                        </h2>
                                    </div>
                                </div>
                                <div className="st-he">
                                    <p>Let’s help you stay on the top of your health</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12 col-sm-12 weln-ma">
                            <div className="card-lrf d-flex ">
                                <div id="tasks-all-completed" className="com-txt d-flex align-items-center d-none">
                                    <div className="que-comp">Complete</div>
                                    <div className="icon-tick-icon"></div>
                                </div>
                                <div className="main-main-main">
                                    <div className="image-card">
                                    </div>
                                    <div className="progress-mai">
                                        <div id="tasks-progressbar" className="progress-bar bg-c-red" style={{
                                            width: `${complitionPercentage}%`,
                                            transition: 'width 0.5s ease'
                                        }}></div>
                                    </div>
                                </div>
                                <div className="gui_ma d-flex ">
                                    <h3>Your wellness guide</h3>
                                    <p><span className="text-capitalize">{wellnessData ? wellnessData.gender : 'N/A'}</span>, {wellnessData ? wellnessData.age : 'N/A'} years old</p>
                                </div>
                                <div className="po-mai">
                                    <h1 id="tasks-marks">{wellnessData ? wellnessData.completedTask : 0} /
                                        {wellnessData ? wellnessData.totalTask : 0}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="detail-tsk">
                    <div className="detail-inner d-flex">
                        <div className="col-xl-8 col-lg-9 col-md-8 col-sm-12 dashboard-left">
                           
                                    <div className="join-call">
                                        <div className="comin-event-heading">
                                            <h4>Upcoming</h4>
                                        </div>
                                        <div id="Patient-Appointments">
                                        {patientAppointment ? (
                                            <div className="join-call-inner">
                                                <div className="pro-call-main">
                                                    <div className="provider-call mb-4">
                                                        <div className="call-provider d-flex">
                                                            <div className="provider-image">
                                                                <img src={patientAppointment ? patientAppointment.doctorPic : ''} alt="" />
                                                            </div>
                                                            <div className="provider-details">
                                                                <div className="provider-name mb-1">{patientAppointment.doctorName || 'N/A'}</div>
                                                                <ul className="provider-specialization d-flex p-0">
                                                                    <li className="specialization-list text-muted"> {patientAppointment.title || 'N/A'}</li>
                                                                    <li className="specialization-list provider-location text-muted"> {patientAppointment.city || 'N/A'} </li>
                                                                </ul>
                                                                <div className="date-time">Video on  Video on {patientAppointment.startDate || 'N/A'}@{patientAppointment.startTime || 'N/A'} </div>
                                                            </div>
                                                        </div>
                                                        <div className="join-call-btn">
                                                            <button href="#" className="Join-Call btn-primary btn-secondary d-flex align-items-center justify-content-center">
                                                                <div className="icon-video-user schedual-icons">
                                                                </div>  Reschedule
                                                            </button>
                                                            <button className="cancel-call d-flex align-items-center justify-content-center CancelAppointmentBtn" >
                                                                <div className="icon-panciluser">
                                                                </div> Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            ) : (
                                                <div className="no-appointments">
                                                    <p>No appointments available!</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                

                            
                            <div id="Patient-task">
                                {/* add new task */}
                                {completeTask && (
                                    <Task todos={todos} onRemove={handleDelete} onComplete={markTaskComplete} onEdit={handleEdit} openIntake= {modalOpen}/>
                                )
                                }
                                <IntakeModal show={showModal} close={() => setShowModal(false)} setRegisteringFor={setRegisteringFor} />


                                {/* Add new custom task section */}
                                <div className="task-inner">
                                    <div className="add-new">
                                        <div className="add-new-inner d-flex align-items-center">
                                            <p className="mb-0">Add New</p>
                                            <div className="add-n-ma add-main-btn d-flex align-items-center justify-content-center" onClick={toggleClass}>
                                                <div className="icon-align-left"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={isActive ? 'ntq d-none' : null}>
                                    <div className="new-task-fields">
                                        <ol className="new-field p-0">
                                            <li className="d-flex add-new-field">
                                                <div className="input-field">
                                                    <input type="text" placeholder="Add New Task"
                                                        value={inputValue}
                                                        onChange={handleInputChange}
                                                        className="new-tsk"
                                                        name="addnewval"
                                                    />
                                                    {errorMessage && (
                                                        <p className="error m-0" style={{ color: "red" }}>{errorMessage}</p>
                                                    )}

                                                </div>
                                                <div className="add-tsk-btn">
                                                    <button id="button" className="save-btn-task" onClick={onClickBtn}>SAVE AS A NEW TASK </button>
                                                    <AddNewModal show={Addnew} close={() => setAddNew(false)}
                                                        handleChange={handleInputChange}
                                                        inputValue={inputValue}
                                                        description={description}
                                                        handleDescriptionChange={handleDescriptionChange}
                                                        error={errorMessage}
                                                        submit={handleSubmit}
                                                    />
                                                </div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                                  {/* Completed tasks section */}
                                <div className="text-complete mt-2">
                                    <h4>Completed</h4>
                                </div>
                                <div className="btn-banch">
                                    {completeTask.length > 0 ? (
                                        completeTask.map((task, index) => (
                                            <div className="det-banc complete align-items-center justify-content-between" key={index}>
                                                <div className="bnch-mrk">
                                                    <a href="#" className="bnch-sec">
                                                        <div className="bnc-m d-flex align-items-center">
                                                            <div className="bnch-tx">
                                                                <p>{task.title}</p>

                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className='dropdown-main'>
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic">
                                                            <div className='icon-dots-horizontal-triple'></div>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu align={"end"}>
                                                            <Dropdown.Item ><button onClick={() => undoTask(task)}>Incomplete</button></Dropdown.Item>
                                                            <Dropdown.Item><button onClick={() => handleEdit(index)} >Edit</button></Dropdown.Item>
                                                            <Dropdown.Item><button>Delete</button></Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>

                                            </div>
                                        ))
                                    ) : (
                                        <p>No tasks completed yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-3 col-md-4 col-sm-12 p-0 dashboard-right">
                            <div className="care-team text-center">
                                <div className="care-team-inner">
                                    <h4 className="care-team-heading text-center">Your Care Team</h4>
                                    <div className="care-team-detail">
                                        <div className="care-team-image">
                                            <img src={careManagerData && careManagerData.imagePath ? careManagerData.imagePath : noPatient} alt="care-manager" />
                                        </div>
                                        <div className="care-team-des">
                                            <div className="fl-ct">
                                                <h5>{careManagerData ? careManagerData.firstName : "N/A"} {careManagerData ? careManagerData.lastName : "N/A"}</h5>
                                                <p className="m-0">Your
                                                    Care Manager
                                                </p>
                                            </div>
                                            <address> {careManagerData ? careManagerData.address : "N/A"}, <br /> {careManagerData ? careManagerData.city : "N/A"}, {careManagerData ? careManagerData.state : "N/A"}, {careManagerData ? careManagerData.zipCode : "N/A"}</address>
                                        </div>
                                        <button type="button" className="btn-send-m btn-primary send-request">Send message</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;