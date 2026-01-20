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
    title: "Sequential Image Classification Model",
    description:
      "Develop a Sequential Machine Learning Model that can identify and categorize images into predefined classes.",
    for: "junior",
  },
  {
    label: "ml",
    title: "CIFAR-10 Neural Network from Scratch",
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
    title: "Responsive Portfolio Website",
    description:
      "Build a personal portfolio website that demonstrates responsiveness, user interaction, and creative design. Mandatory Requirements: Header & Navigation, About Section, Projects Section, Contact Section, Footer, Styling & Color Constraints, Hidden Validator, and Documentation. The website must include custom CSS animations, real-time form validation, and be fully responsive. Bonus Challenges: Implement a 'Back to Top' button with custom animation, add dark mode toggle, display a live clock that shows your local time zone using JavaScript.",
    for: "junior",
  },
  {
    label: "frontend",
    title: "Interactive To-Do List",
    description:
      "Create a dynamic to-do list application that integrates custom input behaviors, sorting, and personalized motivational messages. Mandatory Requirements: Task Addition with autocomplete for recurring tasks, Task Display with custom styling based on priority, Interactivity for marking tasks as completed, Custom Sorting Logic, Local Storage Checksum, and Documentation. Bonus Challenges: Persist tasks in localStorage, add filters to switch between 'All,' 'Active,' and 'Completed' tasks, implement a custom notification for overdue tasks.",
    for: "junior",
  },
  {
    label: "frontend",
    title: "Weather Dashboard with API Integration",
    description:
      "Develop a weather dashboard using a JavaScript framework of your choice. This dashboard must integrate with at least two niche weather APIs, provide a multifaceted view of weather information, and incorporate personalized features. Mandatory Requirements: City Weather Search, Dynamic Visualization, Forecast Cards, Error Handling, Weather Journal, Temperature Unit Toggle, API Key Obfuscation, and Documentation. Bonus Challenges: Add geolocation support with an animated UI element, implement a 'Favorites' list with drag-and-drop reordering, provide an 'Export to PDF' button that exports the weather journal, optimize performance using memoization or debouncing.",
    for: "senior",
  },
  {
    label: "frontend",
    title: "E-Commerce Product Listing Page",
    description:
      "Create an e-commerce product listing page using a JavaScript framework of your choice. The page should dynamically fetch product data, allow interaction through filtering and sorting, and include personalized features that simulate a modern shopping experience. Mandatory Requirements: Product Listing with image carousel, Filtering & Sorting with debounced input, 'Recommended for You' Section, Wishlist Feature, Pagination/Infinite Scroll & Price Range Filter, and Documentation. Bonus Challenges: Implement a fully functioning shopping cart with quantity controls and real-time total calculation, enhance accessibility and add smooth hover animations for product cards.",
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
  },

  {
    label: "cp",
    title: "Task: Implement a Simple Sorting Algorithm and Compare Performance",
    description:
      "Description: Create a program that implements a basic sorting algorithm (e.g., Bubble Sort, Selection Sort, Insertion Sort) and compare its performance with other sorting algorithms using time complexity analysis.",
    for: "junior",
  },

  {
    label: "cp",
    title:
      "Task: Develop a Basic Library Management System with CRUD Operations",
    description:
      "Description: Build a simple command-line based library management system that allows users to manage books and members using basic CRUD (Create, Read, Update, Delete) operations directly within the application.",
    for: "junior",
  },
];
