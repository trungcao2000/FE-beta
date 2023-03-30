import React from 'react'

const AboutMe = () => {
    return (
        <div class="container">
            <div class="header">
                <h1>About Me</h1>
            </div>
            <div class="image">
                <img src="img/profile.jpg" alt="" />
            </div>
            <div class="intro column">
                <h2>Summary</h2>
                <p>I am a 22 year old web developer.</p>
                <p> Graduated from Ho Chi Minh City University of Food Industry (2018 - 2022).</p>
                <p>Major: Information Technology.</p>
                <p>I have knowledge and experience in the process of building website app projects.</p>
                <p>Can understand and use multiple frameworks, cross-platform responsive.</p>
                <address>
                    Contact to me <a href="mailto:caotrung2000@gmail.com">CVT IT</a>.
                </address>
            </div>
            <div class="skills column">
                <h3>My Skills</h3>
                <ul id="skill-list">
                    <li>Web Development</li>
                    <li>FE ReactJS</li>
                    <li>BE .Net Core Web Api (C#)</li>
                    <li>Design Process</li>
                    <li>Teamwork</li>
                    <li>Analytical Skills</li>
                </ul>
            </div>
        </div>
    )
}

export default AboutMe