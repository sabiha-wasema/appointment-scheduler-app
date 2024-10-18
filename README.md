# Appointment Scheduler Application

This is an appointment scheduler application developed using React, allowing users to log in, create, and manage appointments with other users.

## Features

1. **User Registration and Login**
   - Implement user registration and login functionality using username and password.

2. **User Interaction**
   - Users can view and search for other users.
   - Users can schedule appointments with any other user, including title, description, date, and time.

3. **Appointment Management**
   - Users can search and filter appointments (upcoming and past).
   - Scheduler can cancel appointments before the scheduled time.
   - Appointment holders can accept or decline appointments.
   - Option to include a recorded audio message from the scheduler.

## Technologies Used

- **Frontend**: React
- **Backend**: Firebase (for authentication, database, and storage)
- **Styling**: Tailwind CSS (or other frameworks for responsiveness)
- **Additional Libraries**: React Router.

## Setup Instructions

### Prerequisites

- Ensure you have Node.js and npm installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sabiha-wasema/appointment-scheduler-app
   cd appointment-scheduler
   npm install
  

## Set up Firebase:
- Create a project on Firebase Console
- Get your configuration keys.
- Add your Firebase configuration in the src/services/firebaseConfig.js file.

## Run the application:
    npm run dev

## Live demo ( https://appointment-scheduler-ap-8b0dc.web.app/ )
