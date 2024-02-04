import React from 'react';
import { AiOutlineTwitter, AiOutlineGithub } from 'react-icons/ai';
import { Carousel } from 'react-bootstrap';

import capture1 from '../../assets/images/screen1.png';
import capture2 from '../../assets/images/screen2.png';
import capture3 from '../../assets/images/screen3.png';

import addIcon from '../../assets/images/add.svg';
import timeIcon from '../../assets/images/time.svg';
import levelsIcon from '../../assets/images/levels.svg';

import './Home.scss';

const Home = () => {
    return (
        <main className="home">

            <h2 className="home_title">Task Manager</h2>

            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block mx-auto img-fluid"
                        src={capture1}
                        alt="First slide"
                    />

                    <Carousel.Caption>
                        <h3>Sort Tasks</h3>
                        <p>Simply drag and drop to organize your tasks.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block mx-auto img-fluid"
                        src={capture2}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Add Tasks</h3>
                        <p>Easily add new tasks to your list.</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="d-block mx-auto img-fluid"
                        src={capture3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Manage Tasks</h3>
                        <p>Your tasks are always visible for editing or deletion.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <section className="container home_services">
                <article className="article ease">
                    <img src={addIcon} alt="add" className="img" />
                    <h2>Ease</h2>
                    <p>Create tasks quickly in just one step.</p>
                </article>

                <article className="article deadlines">
                    <img src={timeIcon} alt="time" className="img" />
                    <h2>Deadlines</h2>
                    <p>Easily set deadlines for your tasks.</p>
                </article>

                <article className="article notes">
                    <img src={levelsIcon} alt="levels" className="img" />
                    <h2>Responsibility</h2>
                    <p>Assign responsibility levels to your tasks.</p>
                </article>
            </section>

            <div className="home_about">
                <section className="container">
                    <h2>About the Application</h2>

                    <div className="home_about_info">
                        <p>
                            Task Manager is an application for organizing tasks into the following categories: <span>To do</span>, <span>In Progress</span>, <span>Done</span>, to maintain organization when performing tasks. Developed with ReactJS, SASS, Bootstrap, DraggableJS, MomentJS, Firebase.
                        </p>
                    </div>
                </section>
            </div>

            <section className="container home_contact">
                <h2>Contact the Developer</h2>

                <div className="home_contact_social">
                    <a href="https://twitter.com/developaul" target="_blank" rel="noopener noreferrer" className="social twitter">
                        <AiOutlineTwitter size={'10rem'} />
                        <span>@developaul</span>
                    </a>

                    <a href="https://github.com/developaul" target="_blank" rel="noopener noreferrer" className="social github">
                        <AiOutlineGithub size={'10rem'} />
                        <span>@developaul</span>
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Home;
