import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import subscriptionImage from "../../../../assests/images/subscription-img.png"
import phramacyImage from "../../../../assests/images/choose-pharmecy-image.png"
import allergiesImage from "../../../../assests/images/add-alergies.png"

function Task({ todos, onRemove, onComplete, onEdit }) {
    const taskTypeMap = {
        1: 'accountCreation',
        2: 'DetermineBenchmark',
        3: 'meetYourCareManager',
        4: 'chooseYourSubscription',
        14: 'intakeRegistration',
        12: 'addAllergies',

    }
    const getTaskStyles = (type) => {
        switch (type) {

            case 'intakeRegistration':
                return {
                    backgroundColor: '#D6D4AC',
                    borderRadius: '20px'
                };
            case 'DetermineBenchmark':
                return {
                    backgroundColor: '#B9BFD4',
                    borderRadius: '20px'
                };
                case 'addAllergies':
                return {
                    image: allergiesImage,
                    backgroundColor: '#DEA785',
                    minHeight: '180px',
                    borderRadius: '20px'
                };
            case 'chooseYourSubscription':
                return {
                    image: subscriptionImage,
                    backgroundColor: '#B7AE95',// Light blue
                    minHeight: '180px',
                    borderRadius: '20px'
                };

            default:
                return {
                    image: null,
                    backgroundColor: '#DB9367', // Default white background
                    minHeight: '85px',
                    borderRadius: '20px'
                };
        }
    }
    return (
        <>
            {/* due now task */}
            <div className="ds-tx">
                <h4>Due now</h4>
            </div>
            <div className="ds-de-cards">
                <div className="due-task-main">
                    <ol className="due-task-inner">
                        {todos.length > 0 ? (
                            todos.map((todo, i) => {
                                const taskType = taskTypeMap[todo.type] || 'default';
                                const { image = null, backgroundColor, minHeight, borderRadius } = getTaskStyles(taskType);
                                return (
                                    <li className="task" key={i} style={{ backgroundColor, borderRadius }}>
                                        <div className="custom-task-sec sec-space">
                                            <div className='add-new-inner d-flex due-inn' style={{minHeight}}>
                                                {todo.title}

                                                <div className='dropdown-main'>
                                                    <Dropdown>
                                                        <Dropdown.Toggle id="dropdown-basic">
                                                            <div className='icon-dots-horizontal-triple'></div>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu align={"end"}>
                                                            <Dropdown.Item>
                                                                <button onClick={() => onEdit(todo)}>Edit Task</button>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item>
                                                                <button onClick={() => onComplete(todo)}>Complete Task</button>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item>
                                                                <button onClick={() => onRemove(i)}>Delete Task</button>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                            {image &&
                                                <div className="subs-image">
                                                    <div className="asub-img">
                                                        <img src={image} alt={taskType} />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </li>
                                )
                            })
                        ) : (
                            <p className='empty'>No Due now task yet.</p>
                        )}
                    </ol>
                </div>
            </div>
        </>
    )
}

export default Task