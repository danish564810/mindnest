import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Form } from "react-bootstrap";
import './Modal.css';
import '../../../../Plugins/DateTimePicker/DateTimePicker.css'
import { ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import crossSign from '../../../../assests/svgs/cross-modal.svg';
import Button from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import DateTimePicker from "../../../../Plugins/DateTimePicker/DateTimePicker";
import CustomSelect from "../../../../Plugins/Select2/CustomSelect";





const AddNewModal = ({
    close,
    show,
    inputValue,
    description,
    handleChange,
    handleDescriptionChange,
    error,
    submit
}
) => {

    //select 2 
    const toDoTask = [
        { value: 'Care Manager', label: 'Care Manager' },
        { value: 'You', label: 'You' },
    ]
    return (
        <>
            {/* add new task modal */}

            <Modal
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <ModalHeader>
                    <h5 className="modal-title">Create a task</h5>
                    <button type="button" className="close"
                        onClick={close}>
                        <img src={crossSign} /></button>
                </ModalHeader>
                <Form onSubmit={submit}>
                    <ModalBody>
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Title"
                            className="mb-3"

                        >
                            <Form.Control type="text"
                                placeholder="name@example.com"
                                value={inputValue || ''}
                                onChange={handleChange}
                                style={{ height: '45px', minHeight: '45px' }}
                            />
                            {error && (
                                <p className="error m-0" style={{ color: "red" }}>{error}</p>
                            )}
                        </FloatingLabel>

                        <FloatingLabel controlId="floatingTextarea2" label="Description..">
                            <Form.Control
                                value={description || ''}
                                onChange={handleDescriptionChange}
                                as="textarea"
                                placeholder="Description.."
                                className="mb-3"
                                style={{ height: '145px', resize: 'none' }}
                            />


                        </FloatingLabel>

                        <div className="row">
                            <div className="col p-0 me-1">
                                <DateTimePicker />
                            </div>
                            <div className="col p-0">
                                <CustomSelect
                                    options={toDoTask}
                                    placeholder="Assign To"
                                    value={toDoTask}
                                    layout="dashboard"
                                />
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="ModalButton btn-tertiary" onClick={submit}>Create Task</button>
                    </ModalFooter>

                </Form>

            </Modal></>
    )
}
export default AddNewModal;