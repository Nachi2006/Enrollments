import { useEffect, useLayoutEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import secureLocalStorage from "react-secure-storage";
interface Task {
  label: string;
  description: string;
  title: string;
  resources?: string[];
  for: string;
}
interface Props {
  selectedSubDomain: string;
  setSelectedSubDomain: React.Dispatch<React.SetStateAction<string>>;
}
const TechTask = ({ selectedSubDomain, setSelectedSubDomain }: Props) => {
  const [filteredTasks, setFilteredTask] = useState<Task[]>([]);
  const [isSC, setIsSC] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [taskState, setTaskState] = useState("");
  useEffect(() => {
    // Based on the subdomain we are filtering the task
    const filteredTask = techTaskData.filter(
      (task) =>
        task.label === selectedSubDomain 
      //&&(isSC === true ? task.for === "senior" : task.for === "junior")
    );
    if (filteredTask) {
      setFilteredTask(filteredTask);
    }
  }, [selectedSubDomain, isSC]);

  // useEffect(() => {
  //   const isSenior = secureLocalStorage.getItem("isSC");
  //   setIsSC();
  // }, [isSC]);
  // useEffect(() => {
  //   const isSenior = secureLocalStorage.getItem("isSC");
  //   setIsSC();
  // }, [isSC]);

  useLayoutEffect(() => {
    const userDetailsstore = secureLocalStorage.getItem("userDetails");

    if (typeof userDetailsstore !== "string") {
      console.warn("userDetailsstore is not a string:", userDetailsstore);
      setIsSC(false); // Default to false if storage data is invalid
      return;
    }

    try {
      const userDetails = JSON.parse(userDetailsstore);
      // console.log("Parsed userDetails:", userDetails);

      if (typeof userDetails.data.isSC === "boolean") {
        setIsSC(userDetails.data.isSC);
        // console.log(userDetails.data.isSC);
      } else {
        console.warn("Invalid isSC value:", userDetails.isSC);
        setIsSC(false);
      }
    } catch (error) {
      console.error("Error parsing userDetails:", error);
      setIsSC(false);
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const openTask = (task: Task) => {
    setActiveTask(task);
    setShowModal(true);
  };

  return (
    <div
      className={`w-full h-full overflow-y-hidden -task-container ${
        selectedSubDomain === "" ? "flex items-center" : ""
      }`}
    >
      {selectedSubDomain === "" && (
        <div className="flex justify-center flex-wrap w-full gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => setSelectedSubDomain("frontend")}
            className="nes-btn is-error w-[47%] md:w-[30%] py-3 md:py-4 custom-nes-error text-xs hover:scale-105 transition-transform duration-200"
          >
            Frontend
          </button>
          <button
            type="button"
            onClick={() => setSelectedSubDomain("backend")}
            className="nes-btn is-error w-[47%] md:w-[30%] py-3 md:py-4 custom-nes-error text-xs hover:scale-105 transition-transform duration-200"
          >
            Backend
          </button>
          <button
            type="button"
            onClick={() => setSelectedSubDomain("cyber-sec")}
            className="nes-btn is-error w-[47%] md:w-[30%] py-3 md:py-4 custom-nes-error text-xs hover:scale-105 transition-transform duration-200"
          >
            Cyber Security
          </button>
          <button
            type="button"
            onClick={() => setSelectedSubDomain("app")}
            className="nes-btn is-error w-[47%] md:w-[30%] py-3 md:py-4 custom-nes-error text-xs hover:scale-105 transition-transform duration-200"
          >
            App Dev
          </button>
          <button
            type="button"
            onClick={() => setSelectedSubDomain("ml")}
            className="nes-btn is-error w-[47%] md:w-[30%] py-3 md:py-4 custom-nes-error text-xs hover:scale-105 transition-transform duration-200"
          >
            AI/ML
          </button>
          
          {!isSC && (
            <button
              type="button"
              onClick={() => setSelectedSubDomain("cp")}
              className="nes-btn is-error w-[47%] md:w-[30%] py-3 md:py-4 custom-nes-error text-xs hover:scale-105 transition-transform duration-200"
            >
              CP
            </button>
          )}
        </div>
      )}

      {selectedSubDomain !== "" && (
        <div className="task-list-container">
          <div className="task-list-header">
            <span className="task-list-count">{filteredTasks.length} Tasks Available</span>
          </div>
          <div className="task-list-grid">
            {filteredTasks.map((task, index) => (
              <div
                key={`${task.label}-${task.title}-${index}`}
                role="button"
                tabIndex={0}
                onClick={() => openTask(task)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && openTask(task)
                }
                className="task-item"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="task-item-header">
                  <span className="task-item-number">Task {index + 1}</span>
                  <span className="task-item-badge">{task.for === "senior" ? "SC" : "Jr"}</span>
                </div>
                <h3 className="task-item-title">{task.title}</h3>
                <div className="task-item-footer">
                  <span className="task-item-cta">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {showModal && activeTask && (
        <TaskModal task={activeTask} onClose={() => setShowModal(false)} />
      )}
      {/* {showModal && <Modal task={taskState} setShowModal={setShowModal} />} */}
    </div>
  );
};

export default TechTask;
// function Modal({
//   task,
//   setShowModal,
// }: {
//   task: string;
//   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   return (
//     <div
//       className="bg-black p-4 min-w-[40vw] min-h-[30vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 nes-container is-dark is-rounded --submit-container"
//       style={{ position: "absolute" }}
//     >
//       <form method="">
//         <p className="title text-xl">Submit Task</p>
//         <input
//           type="text"
//           id="dark_field"
//           className="nes-input is-dark"
//           placeholder="Github Repository Link"
//           name={`${task}-github`}
//           required
//         />
//         <input
//           type="text"
//           id="dark_field"
//           className="nes-input is-dark"
//           placeholder="Demo Link"
//           name={`${task}-demo`}
//         />
//         <menu className="dialog-menu mt-4">
//           <button
//             className="nes-btn"
//             type="button"
//             onClick={() => setShowModal(false)}
//           >
//             Cancel
//           </button>
//           <button className="nes-btn is-error" type="submit" onClick={() => {}}>
//             Submit
//           </button>
//         </menu>
//       </form>
//     </div>
//   );
// }
const techTaskData = [
  {
    label: "backend",
    title: "Candidate Recruitment API",
    description:
      "Build an API to manage a candidate's journey from application to hiring.\n\nBase Requirements : 1) Candidate Management: CRUD for candidates (Name, Email, Role, Resume text).\n2) Fixed Pipeline : Implement sequential stages: APPLIED ->SCREENING -> INTERVIEW -> HIRED/REJECTED.\n3) Basic RBAC: 'Candidate' role (view own status) and 'Recruiter' role (view all, move candidates to the next stage).\n\nDeliverables : 1) Documented Endpoints.\n2) Database schema diagram showing Candidate and User roles.",
    for: "junior",
  },
  {
    label: "backend",
    title: "Personal Locker API",
    description:
      "Create a secure backend for personal document storage. \n\nBase Requirements: 1) Authentication: Endpoints for user Registration and Login (JWT or Session-based).\n2) File Handling: Secure endpoints for uploading and downloading files (PDFs, Images), restricted to the file owner.\n3) Integrity: Error handling for empty files, unsupported formats, and unauthorized access attempts.\n4) Metadata: Store file name, upload timestamp, size, and User ID in the database.\n\nDeliverables: 1) Working API: Backend with local or cloud storage integration (e.g., AWS S3).\n2) README: Guide on handling multi-part form data and implementing secure authentication.",
    for: "junior",
  },
  {
    label: "backend",
    title: "Advanced Appointment and Scheduling System",
    description:
      "Advanced Appointment & Scheduling System An API for professionals (e.g., Doctors) to manage availability and bookings. \n\nBase Requirements: 1) Recurring Schedules: Logic to define availability every Monday-Friday in 30-minute blocks. \n2) Collision Engine: Prevent double-booking and block past-time reservations. \nBonus (OTP Auth): Implement Email/SMS OTP verification for login using a third-party service (e.g., Nodemailer/Twilio). \n\nDeliverables: 1) A robust 'Rescheduling' endpoint that handles availability checks atomically. \n2) Unified endpoint for a user's full schedule (bookings + available slots).",
    for: "senior",
  },
  {
    label: "backend",
    title: "Collaborative Group Study API",
    description:
      "A platform for hosts to create study sessions with real-time elements. \n\nBase Requirements: 1) Session Management: Host generates a unique code; others join via JWT-secured endpoints. \n2) Real-time Communication: Implement a chatting facility. \n3) Use WebSockets (Socket.io) for the chat and real-time 'Member Joined/Left' notifications. \n\nDeliverables: 1) WebSocket implementation for instant messaging. \n2) Logic for session persistence (what happens when the host leaves?).",
    for: "senior",
  },
  {
    label: "ml",
    title: "Rental Price Prediction Model",
    description:
      "Perform data visualization and generate key insights from the given dataset. Then, build a machine learning model to predict rental prices based on various features such as location, property size, number of bedrooms, and amenities. Requirements: Conduct Exploratory Data Analysis (EDA) to identify trends, correlations, and anomalies. Visualize rental price distribution, correlations between price and key features, and geographic rent variations. Preprocess the dataset (handle missing values, normalize data, encode categorical variables). Train and evaluate a machine learning model for rent prediction. Interpret model results and provide actionable insights based on the findings.",
    resources: [
      "https://drive.google.com/file/d/193NnzSRruE3uZvkvT4XaUDNI_oVHbA_I/view?usp=drive_link",
      "https://drive.google.com/file/d/1XNK7ZL-5a4enlcubVoro0VYZ0QgZb42X/view?usp=drive_link",
    ],
    for: "junior",
  },
  {
    label: "ml",
    title: "Rock Paper Scissors Classification",
    description:
      "Develop a Sequential Machine Learning Model that can identify and categorize images into predefined classes.",
    for: "junior",
  },
  {
    label: "ml",
    title: "Covid 19 Tweet NLP Model",
    description:
      "Build a machine learning model from scratch to train on the CIFAR-10 dataset using only NumPy, Pandas, and other basic libraries (without TensorFlow or PyTorch). The model should be a fully connected neural network that can classify images into 10 categories.",
    for: "senior",
  },
  {
    label: "ml",
    title: "Advanced Spam Detection Model",
    description:
      "Build an advanced Spam Detection Model for Messages, using Natural Language Processing (NLP) techniques and an Advanced Deep Learning-based approach.",
    for: "senior",
  },
  {
    label: "frontend",
    title: "Event Registration Portal",
    description:
      "Develop a responsive, well-structured frontend portal for club event registrations that prioritizes clean UI and real-time user feedback.\n\n Base Requirements: 1) Core Structure: Include a header, navigation, footer, and dedicated sections for Event Details, Registration, and Contact Info.\n2) Design Consistency: Create a layout and flow inspired by the official club website while maintaining a beginner-friendly UI.\n3) Form Validation: Implement real-time input validation for all mandatory registration fields to ensure data integrity.\n\nDeliverables: 1) Responsive Frontend: A fully functional, mobile-friendly portal reflecting the club's branding.\n 2) Interactive Form: A validated registration form with success feedback (e.g., confirmation popup or message). \n3) Enhanced UX Features: Implementation of a form progress indicator or a dynamic event countdown timer.",
    for: "junior",
  },
  {
    label: "frontend",
    title: "Movie Search Engine (API Integration)",
    description:
      "Develop a responsive web application that fetches and displays movie data from the OMDB API using an intuitive, minimal interface.\n\n Base Requirements: 1) API Integration: Connect to the OMDB API to fetch real-time data (Title, Year, Poster, Rating) based on user queries.\n 2) Search Functionality: Implement a search bar with robust error handling for empty or invalid results.\n 3) Responsive UI: Create a clean, organized layout that adapts to different screen sizes and ensures smooth user interaction.\n\n Deliverables: 1) Functional Search Engine: A frontend application capable of dynamic content rendering from external API calls.\n2) Loading & Error States: Implementation of UI feedback such as loading indicators and user-friendly error messages.\n3) Enhanced Filtering: (Optional) Logic to filter results based on specific criteria, such as minimum IMDB ratings.",
    for: "junior",
  },
  {
    label: "frontend",
    title: "Gamified Application Journey",
    description:
      "Transform a standard four-step application process into an interactive, level-up experience using XP rewards, animated progress tracking, and persistent badge unlocks.\n\n Base Requirements: 1) Gamified Workflow: Implement a four-stage flow (Profile, Tasks, Submission, Status) guided by an animated horizontal stepper and a circular progress visual (SVG/Canvas).\n2) XP Engine: Build logic to award specific XP (20 for Profile, 10 per Task, 30 for Submission) and trigger badge unlocks at 50 and 100 XP thresholds.\n3) Data Persistence: Use localStorage to ensure XP totals, step progress, and earned badges remain saved across browser sessions.\n\n Deliverables 1) Interactive Dashboard: A frontend featuring smooth gradient transitions, a live XP counter, and an animated badge gallery.\n2) XP & Milestone Logic: A functional state management system that handles point accumulation and unlocks visual rewards.\n3) Enhanced UX Components: Implementation of 'pop-in' badge animations and optional features like a confetti burst or a social media 'snapshot' share tool.",
    for: "senior",
  },
  {
    label: "frontend",
    title: "The Minimalist Pokedex",
    description:
      "Build a premium, Apple-inspired web portal that integrates the PokeAPI to display Pokémon data through a lens of minimalism, high-quality typography, and fluid user interactions.\n\n Base Requirements: 1) Apple Aesthetic: Utilize 'San Francisco' style typography, generous white space, and a product-centric layout (e.g., clean lines and subtle gradients).\n2) Search & Fetch: Implement a search bar that queries the https://pokeapi.co/ database and renders data dynamically without full-page reloads.\n3) Interactive Stats: Display a 'Product Card' for each Pokémon featuring its official artwork, ID, and a beautifully visualized base stats section (HP, Attack, Defense, etc.).\n4) Robust Error Handling: Design graceful states for 'Not Found' queries or network issues using elegant UI notifications rather than browser alerts.\n\n Deliverables: 1) Refined Pokémon Interface: A single-page application (SPA) featuring a sleek search experience and a responsive detail view.\n2) Dynamic UI Components: Polished data visualization for stats and an 'Apple-style' loading state (e.g., a skeleton screen or a minimalist spinner).\n3) Creative Bonus Features: Implementation of a 'Shiny' toggle to switch sprite assets and a dynamic theme engine that adapts the site’s accent colors to the Pokémon’s type (e.g., Fire = Soft Red).",
    for: "senior",
  },
  {
    label: "cyber-sec",
    title: "Capture the Flag (CTF) Challenge",
    description:
      "Solve cybersecurity challenges in cryptography, web vulnerabilities, and reverse engineering to find hidden flags. Using platforms like PicoCTF or local setups, they should know about SQL injection, XSS, and encryption basics.",
    for: "senior",
  },
  {
    label: "cyber-sec",
    title: "Capture the Flag (CTF) Challenge",
    description:
      "Solve cybersecurity challenges in cryptography, web vulnerabilities, and reverse engineering to find hidden flags. Using platforms like PicoCTF or local setups, they should know about SQL injection, XSS, and encryption basics.",
    for: "junior",
  },
  {
    label: "cyber-sec",
    title: "Simulated Cyber Attack & Defense",
    description:
      "Your system is under attack! Identify vulnerabilities in your own machine using Nmap, Wireshark, and OWASP ZAP. Simulate an attack like a MITM (Man-in-the-Middle), SQL injection, or XSS, document your findings, and secure your system against exploitation. Submit a detailed report with attack steps, detection, and mitigation strategies.",
    for: "senior",
  },
  {
    label: "cyber-sec",
    title: "Simulated Cyber Attack & Defense",
    description:
      "Your system is under attack! Identify vulnerabilities in your own machine using Nmap, Wireshark, and OWASP ZAP. Simulate an attack like a MITM (Man-in-the-Middle), SQL injection, or XSS, document your findings, and secure your system against exploitation. Submit a detailed report with attack steps, detection, and mitigation strategies.",
    for: "junior",
  },
  {
    label: "app",
    title: "The Curious Case of the Lost Journal",
    description:
      "Build a Flutter mystery adventure where users explore locations, collect clues, and make decisions leading to multiple endings. Implement state management, custom navigation, an inventory system, and dialogues. Bonus: animations, local storage, a mini-game, and dark mode. Tests logic, UI, and state handling. ",
    for: "junior",
  },
  {
    label: "app",
    title: "The Curious Case of the Lost Journal",
    description:
      "Build a Flutter mystery adventure where users explore locations, collect clues, and make decisions leading to multiple endings. Implement state management, custom navigation, an inventory system, and dialogues. Bonus: animations, local storage, a mini-game, and dark mode. Tests logic, UI, and state handling. ",
    for: "senior",
  },
  {
    label: "app",
    title: "Glitch in the System",
    description:
      "Build a Flutter sci-fi adventure where users play as a hacker trapped in a virtual world. They must navigate a corrupted system, solve logic-based puzzles, and bypass security layers to escape. Implement state management, branching paths, hacking-themed UI, and interactive terminals. Bonus: glitch effects, encryption puzzles, and adaptive soundscapes.",

    for: "junior",
  },
  {
    label: "app",
    title: "Glitch in the System",
    description:
      "Build a Flutter sci-fi adventure where users play as a hacker trapped in a virtual world. They must navigate a corrupted system, solve logic-based puzzles, and bypass security layers to escape. Implement state management, branching paths, hacking-themed UI, and interactive terminals. Bonus: glitch effects, encryption puzzles, and adaptive soundscapes.",

    for: "senior",
  }
,
  {
    label: "cp",
    title: "HackerRank Competition",
    description:
      "A HackerRank Competition will be held on 'Date To be Announced'.\n\n Link to the Competition: ",
    for: "junior",
  },

  {
    label: "cp",
    title:
      "HackerRank Competition",
    description:
      "A HackerRank Competition will be held on 'Date To be Announced'.\n\n Link to the Competition: ",
    for: "senior",
  },
]