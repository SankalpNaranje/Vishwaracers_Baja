import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Team.css';

import UpdateMember from "./UpdateMember";
import teamBaja from '../Image/baja_team.jpeg';

function Team() {
  const [team, setTeam] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = (memberId) => {
    setSelectedMemberId(memberId);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    // Make a GET request to the /display-team route
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/team/display-team", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Parse the JSON response
        const json = await response.json();
        console.log(json);

        // Check if the response contains team members
        if (json.teamMembers) {
          setTeam(json.teamMembers);
        } else {
          console.log("No team members found");
        }
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    };

    fetchTeamMembers();
  }, []); // Empty dependency array to run the effect only once

  const loggedInUserId = localStorage.getItem("id");

  const handleDelete = async (memberId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/team/deletemember/${memberId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (response.status === 204) {
        // Remove the deleted member from the team state
        setTeam((prevTeam) => prevTeam.filter((member) => member._id !== memberId));
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  const domainGroups = team.reduce((groups, member) => {
    const domain = member.domain;
    if (!groups[domain]) {
      groups[domain] = [];
    }
    groups[domain].push(member);
    return groups;
  }, {});

  const domainPriority = [
    "Faculty",
    "Captain",
    "Vice-Captain",
    "Manager",
    "Finance_head",
    "Rollcage",
    "Brakes",
    "Electrical",
    "Vehicle_Dynamics",
    "DriveTrain",
    "Composite"
    // Add more domains as needed
  ];

  // Sort the domain groups based on priority
  const sortedDomainGroups = Object.entries(domainGroups)
    .sort(([domainA], [domainB]) => {
      const indexA = domainPriority.indexOf(domainA);
      const indexB = domainPriority.indexOf(domainB);
      return indexA - indexB;
    });

    function reveal() {
      var reveals = document.querySelectorAll(".reveal");
    
      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
    
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
    
    window.addEventListener("scroll", reveal);
  return (
    <div className='team'>
      <div className="team-image">
        <img class="fullscreen" src={teamBaja} alt="Pretty Pic"/>
      </div>
      <div className="team-introduction">
        <h1>
          <span style={{color:"#fff"}}>TEAM <span style={{color:"#fa5f1a"}}>VISHWARACERS</span></span>
        </h1>
        <div className="team-information reveal fade-left">
          <p>Embark on an exhilarating journey with Vishwaracers Baja, a team of passionate and driven engineers dedicated to the pursuit of excellence in the realm of Formula Racing Student. Hailing from the vibrant city of Pune, India, this collective of bright minds brings together a diverse range of skills and expertise, united by an unwavering commitment to innovation and automotive mastery.</p>
          <br />
          <p>With a burning passion for pushing the boundaries of automotive technology, the Vishwaracers Baja team is meticulously crafting a Formula Racing Student car that will embody their technical prowess and leave an indelible mark on the global motorsport landscape. Each meticulous design decision, every rigorous testing session, and every unwavering dedication to precision fuels their relentless pursuit of the pinnacle of automotive performance.</p>
          <br />
          <p>Guided by the spirit of collaboration and a shared vision of triumph, the Vishwaracers Baja team stands as a testament to the power of teamwork and the unwavering pursuit of excellence. Their journey is a testament to the transformative potential of engineering, where passion, innovation, and a relentless drive for success converge to create something truly remarkable.</p>
          <br />
          <p>As the Vishwaracers Baja team gears up for the challenges ahead, their unwavering spirit and unwavering pursuit of excellence serve as a beacon of inspiration, igniting the passion for innovation and engineering excellence within the hearts of aspiring engineers worldwide. Their legacy is not merely defined by victories on the racetrack but by the transformative impact they have had on the world of automotive engineering.</p>
          <br />
        </div>
      </div>

      <div className="team-container">
        {sortedDomainGroups.map(([domain, members]) => (
          <div key={domain}>
            <div className="member-position-heading reveal fade-left">
              <h3>
                <span>{getDomainHeading(domain)}</span>
              </h3>
            </div>
            <div className="Team-members">
              <div className="team-cards reveal fade-bottom">
                {members.map(member => (
                  <div className="team-card-details" key={member._id}>
                      <div className="update-delete-buttons">
                        {loggedInUserId === "64e1f9d254a4a71648e228ee" && (
                          <>
                            <button
                              className="update-button"
                              onClick={() => handleModalToggle(member._id)}
                            >
                              <i class="fa-solid fa-pen-to-square"> Update</i>
                            </button>
                            <button className="delete-button" onClick={() => handleDelete(member._id)}>
                            <i class="fa-solid fa-trash"> Delete</i>
                            </button>
                          </>
                        )}
                      </div>

                      {isModalOpen && selectedMemberId === member._id && (
                        <UpdateMember
                          memberId={member._id}
                          showModal={isModalOpen}
                          memberData={member}
                          onClose={handleModalToggle}
                        />
                      )}
                      
                    <div className="team-card" >
                      <div className="team-card-image">
                        <img src={`/images/${member.images[0]}`} alt="profile one" />
                      </div>
                      <ul className="team-social-icons">
                        {/* <li>
                          <a href={member.insta}>
                            <i className="fab fa-instagram"></i>
                          </a>
                        </li> */}
                        <li>
                          <a href={`mailto:${member.email}`}>
                            <i className="fa-solid fa-envelope"></i>
                          </a>
                        </li>
                        <li>
                          <a href={member.linkedin}>
                            <i className="fab fa-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                      <div className="team-details">
                        <h2>
                          {member.name}
                          <br />
                          <span className="job-title">{member.position}</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getDomainHeading(domain) {
  switch (domain) {
    case "Faculty":
      return "FACULTY ADVISORS";
    case "Captain":
      return "CAPTAIN";
    case "Vice-Captain":
      return "VICE CAPTAIN";
    case "Manager":
      return "MANAGER";
    case "Finance_head":
      return "FINANCE HEAD";
    case "Rollcage":
      return "ROLLCAGE";
    case "Brakes":
      return "BRAKES";
    case "Electrical":
      return "ELECTRICALS";
    case "Vehicle_Dynamics":
      return "VEHICLE DYNAMICS";
    case "DriveTrain":
      return "DRIVETRAIN";
    case "Composite":
      return "COMPOSITES";

    default:
      return "Other Domain"; // Default heading if domain is not recognized
  }
}

export default Team;

