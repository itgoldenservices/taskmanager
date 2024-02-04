import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Sortable } from '@shopify/draggable';

import { auth, db } from '../../firebase';

import useForm from '../../hooks/useForm';

import { calculateDeadLineTask, calculateDeadLineTaskInverse } from '../../helpers';

import Task from '../Task';

import CreateIcon from '../../assets/images/create.svg';

import './Tasks.scss';

const Tasks = ({ history }) => {

    const [user, setUser] = useState(null);
    const [showAside, setShowAside] = useState(false);
    const [edicion, setEdicion] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        (auth.currentUser) ? setUser(auth.currentUser) : history.push('/');

        if (user) {
            try {

                (async () => {
                    const data = await db.collection(user.uid).get()
                    const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setTasks(arrayData);
                })();

            } catch (error) {

                toast.error('❓ There was an error');

            }

            const sortable = new Sortable(document.querySelectorAll('.task-container'), {
                draggable: 'article',
                delay: 200
            });

            sortable.on('sortable:stop', async e => {
                if (user) {
                    const id = e.data.dragEvent.data.originalSource.id;

                    if (e.newContainer.classList.contains('to-do')) {
                        await db.collection(user.uid).doc(id).update({
                            state: 'to-do'
                        });
                    } else if (e.newContainer.classList.contains('in-progress')) {
                        await db.collection(user.uid).doc(id).update({
                            state: 'in-progress'
                        });
                    } else if (e.newContainer.classList.contains('done')) {
                        await db.collection(user.uid).doc(id).update({
                            state: 'done'
                        });
                    }
                }
            });
        }

        // eslint-disable-next-line
    }, [user]);

    const deleteTask = async id => {

        try {

            await db.collection(user.uid).doc(id).delete();
            const newTasks = tasks.map(task => task.id === id ? { ...task, show: false } : task)
            setTasks(newTasks);

            toast.success('❌ Task deleted successfully');

        } catch (error) {

            toast.error('❓ There was an error');

        }
    };

    const editTask = task => {
        setShowAside(true);

        const inicio = moment(task.created);
        const final = moment(task.deadline);

        const fecha = final.diff(inicio, 'days');
        task.date = calculateDeadLineTaskInverse(fecha);

        setEdicion(task);
    };

    return (
        <>
            <button
                className="button d-flex mx-auto mt-5"
                onClick={() => setShowAside(true)}
            >
                <img src={CreateIcon} alt="new" className="mr-1" />
                New Task
            </button>

            <main className="container my-5">
                <div className="main-container">
                    <div className="container">
                        <h2>To do</h2>

                        <div className="task task-container to-do">
                            {
                                tasks.map(task => task.state === 'to-do' && (
                                    <Task
                                        key={task.id}
                                        editTask={editTask}
                                        deleteTask={deleteTask}
                                        task={task}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="container">
                        <h2>In Progress</h2>

                        <div className="task task-container in-progress">
                            {
                                tasks.map(task => task.state === 'in-progress' && (
                                    <Task
                                        key={task.id}
                                        editTask={editTask}
                                        deleteTask={deleteTask}
                                        task={task}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    <div className="container">
                        <h2>Done</h2>

                        <div className="task task-container done">
                            {
                                tasks.map(task => task.state === 'done' && (
                                    <Task
                                        key={task.id}
                                        task={task}
                                        editTask={editTask}
                                        deleteTask={deleteTask}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>

            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <NewTask
                user={user}
                edicion={edicion}
                showAside={showAside}
                setShowAside={setShowAside}
                setTasks={setTasks}
                setEdicion={setEdicion}
            />
        </>
    );
};

const NewTask = ({ user, edicion, setEdicion, showAside, setShowAside, setTasks }) => {

    const [{ titleTask, responsibility, deadlineTask }, handleInputChange, handleInputReset, handleInputEdit] = useForm({
        titleTask: '',
        responsibility: '',
        deadlineTask: '',
    });

    useEffect(() => {
        if (edicion) {
            handleInputEdit({
                titleTask: edicion.title,
                responsibility: edicion.responsibility,
                deadlineTask: edicion.date
            });
        }

        // eslint-disable-next-line
    }, [edicion]);

    const createTask = async e => {
        e.preventDefault();

        // Validate
        if (!titleTask.trim()) return toast.error('📑 Title is mandatory');
        if (!responsibility.trim()) return toast.error('📑 Responsibility level is mandatory');
        if (!deadlineTask.trim()) return toast.error('📑 Deadline is mandatory');

        if (edicion) {
            // Edit Mode

            try {
                await db.collection(user.uid).doc(edicion.id).update({
                    title: titleTask.trim(),
                    responsibility: responsibility.trim(),
                    deadline: calculateDeadLineTask(edicion.created, deadlineTask.trim())
                });


                setTasks(tasks => (
                    tasks.map(task => task.id === edicion.id ? {
                        ...task,
                        title: titleTask.trim(),
                        responsibility: responsibility.trim(),
                        deadline: calculateDeadLineTask(task.created, deadlineTask.trim())
                    } : task)
                ));

                toast.success('🖊️ Task updated successfully');
            } catch (error) {

                toast.error('❓ There was an error');

            }

            setEdicion(null);
        } else {
            // Create new task

            try {
                const now = moment().format('YYYY/MM/DD');

                const newTask = {
                    title: titleTask.trim(),
                    responsibility: responsibility.trim(),
                    state: 'to-do',
                    show: true,
                    deadline: calculateDeadLineTask(now, deadlineTask.trim()),
                    created: now
                }

                const data = await db.collection(user.uid).add(newTask);

                setTasks(tasks => ([
                    ...tasks,
                    { ...newTask, id: data.id }
                ]));

                toast.success('✔️ Task added successfully');

            } catch (error) {

                toast.error('❓ There was an error');

            }
        }

        handleInputReset();
        setShowAside(false);
    };

    return (
        <aside className={`${showAside ? 'active' : ''}`}>
            <div className="aside-container">
                <h2>{edicion ? 'Edit Task' : 'New Task'}</h2>

                <div className="form-container">
                    <form>

                        <div className="input-container">
                            <label htmlFor="titleTask">Title</label>

                            <input
                                type="text"
                                id="titleTask"
                                name="titleTask"
                                placeholder="Write a descriptive title"
                                value={titleTask}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="input-container">
                            <label htmlFor="responsibility">Responsibility Level</label>

                            <select
                                id="responsibility"
                                name="responsibility"
                                value={responsibility}
                                onChange={handleInputChange}
                            >
                                <option value="">-Select-</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>

                        <div className="input-container">
                            <label htmlFor="deadlineTask">Deadline</label>

                            <select
                                id="deadlineTask"
                                name="deadlineTask"
                                value={deadlineTask}
                                onChange={handleInputChange}
                            >
                                <option value="">-Select-</option>
                                <option value="one">1 day</option>
                                <option value="two">2 days</option>
                                <option value="three">3 days</option>
                                <option value="five">5 days</option>
                                <option value="seven">1 week</option>
                            </select>
                        </div>

                        <div className="action-container">
                            <button
                                type="submit"
                                onClick={createTask}
                            >
                                Save
                            </button>

                            <button
                                type="reset"
                                onClick={() => {
                                    handleInputReset();
                                    setShowAside(false);
                                    setEdicion(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </aside>
    );
};

export default withRouter(Tasks);
