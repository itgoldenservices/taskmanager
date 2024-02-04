import React from "react";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";
import { Carousel } from "react-bootstrap";

import "./Home.scss";

const Home = () => {
  return (
    <main className="home">
      <h2 className="home_title">Task Manager</h2>

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block mx-auto img-fluid"
            src="../../assets/images/screen1.png"
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
            src="../../assets/images/screen2.png"
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
            src="../../assets/images/screen3.png"
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
          <img src="../../assets/images/add.svg" alt="add" className="img" />
          <h2>Ease</h2>
          <p>Create tasks quickly in just one step.</p>
        </article>

        <article className="article deadlines">
          <img src="../../assets/images/time.svg" alt="time" className="img" />
          <h2>Deadlines</h2>
          <p>Easily set deadlines for your tasks.</p>
        </article>

        <article className="article notes">
          <img
            src="../../assets/images/levels.svg"
            alt="levels"
            className="img"
          />
          <h2>Responsibility</h2>
          <p>Assign responsibility levels to your tasks.</p>
        </article>
      </section>

      <div className="home_about">
        <section className="container">
          <h2>About the Application</h2>

          <div className="home_about_info">
            <p>
              Task Manager is an application for organizing tasks into the
              following categories: <span>To do</span>, <span>In Progress</span>
              , <span>Done</span>, to maintain organization when performing
              tasks. Developed with ReactJS, SASS, Bootstrap, DraggableJS,
              MomentJS, Firebase.
            </p>
          </div>
        </section>
      </div>

      <section className="container home_contact">
        <h2>Contact the Developer</h2>

        <div className="home_contact_social">
          <a
            href="https://twitter.com/developaul"
            target="_blank"
            rel="noopener noreferrer"
            className="social twitter"
          >
            <AiOutlineTwitter size={"10rem"} />
            <span>@developaul</span>
          </a>

          <a
            href="https://github.com/developaul"
            target="_blank"
            rel="noopener noreferrer"
            className="social github"
          >
            <AiOutlineGithub size={"10rem"} />
            <span>@developaul</span>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Home;
