import React from 'react';

import moment from 'moment';

import DeleteIcon from '../../assets/images/delete.svg';
import EditIcon from '../../assets/images/edit.svg';

import './Task.scss';

const Task = ({ task, editTask, deleteTask }) => {

    const { id, responsibility, title, deadline, show } = task;

    const formattedDate = moment(deadline).format('DD/MM/YYYY');

    return (
        <article className={`task ${show ? '' : 'd-none'}`} id={id}>
            <div className="task_custom">
                <div className="task_custom_info">
                    <h3>{title}</h3>

                    <p>Responsibility Level: <span>{responsibility}</span></p>
                    <p>Deadline: <span>{formattedDate}</span></p>
                </div>

                <div className="task_custom_buttons">
                    <button
                        className="btn btn-outline-warning"
                        onClick={() => editTask(task)}
                    >
                        <img src={EditIcon} alt="Edit" />
                    </button>

                    <button
                        className="btn btn-outline-danger ml-2"
                        onClick={() => deleteTask(id)}
                    >
                        <img src={DeleteIcon} alt="Delete" />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default Task;
