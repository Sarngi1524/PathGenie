import "./WelcomeBanner.css";

export default function WelcomeBanner() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  return (
    <div className="welcome-banner">

      <div className="welcome-text">
        <h2>{greeting} </h2>

        <h1>Welcome to PathGenie</h1>

        <p>
          Monitor deliveries, optimize routes, manage your fleet,
          and keep your logistics operations running smoothly.
        </p>

        <button>View Deliveries</button>
      </div>

      <div className="welcome-image">
        <img
          src="/images/dashboard/dashboard-banner.png"
          alt="Dashboard Banner"
        />
      </div>

    </div>
  );
}