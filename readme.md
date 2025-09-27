***🤖 Open Source Project Recommender Agent***  
An AI-powered intelligent agent that recommends open-source GitHub repositories tailored to beginner-friendly contributions. It leverages the GitHub API to surface repositories with good-first-issues, helping developers kickstart their open-source journey.

**🚀 Features**   
✨ Smart recommendations based on user skills
🔍 Filters repositories with good first issues
📊 Displays repo name, link, stars, open issues, and last updated date
🛠️ Built with Flask + GitHub REST API
🌐 Deployed on Render (also runs locally)

**🧠 PEAS Representation**  
| **Component**   |                                     **Description**                                    |  
------------------------------------------------------------------------------------------------------------   
| **Performance** | Number of relevant repositories recommended, star count, issue activity, response time |   
| **Environment** |            GitHub repositories, user skill input, cloud/local hosting                  |   
| **Actuators**   |                 JSON API response with repository recommendations                      |   
| **Sensors**     |             Skill inputs via /recommend endpoint, GitHub API data fetch                |   



**📂 Project Structure**  
📁 open-source-agent/  
├── app.py             # Flask backend  
├── requirements.txt   # Python dependencies  
├── Procfile           # Deployment config for Render  
├── .gitignore         # Ignore env files and secrets  
└── README.md          # Project documentation  



**⚙️ Tech Stack**  
- **Backend:** Python, Flask, Flask-CORS, Requests  
- **API Integration:** GitHub REST API  
- **Deployment:** Render (Gunicorn server)  
- **Environment Variables:** .env (local), Render Dashboard (production)  

**🔑 Setup Instructions**  
1️⃣ Clone the Repository  
git clone [https://github.com/the-piyushgoel/open-source-agent.git](https://github.com/the-piyushgoel/open-soucre-agent.git)  
cd open-source-agent  


2️⃣ Install Dependencies  
pip install -r requirements.txt  


3️⃣ Add Environment Variable  
Create a .env file (for local use):  
GITHUB_TOKEN=your_personal_access_token  


4️⃣ Run Locally  
python app.py  


**Backend will be live at:** http://127.0.0.1:5000  

#👨‍💻 Team Name  
**CommitSquad⚡**  
Open Source Enthusiasts connecting devs with projects!  
