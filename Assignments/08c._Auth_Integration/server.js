import express from "express";
import pkg from "express-openid-connect";

const { auth, requiresAuth } = pkg;

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: "VzRMgrzN3Aly4K7lxfXvY9zCbYZ8z0nH",
  issuerBaseURL: "https://dev-fah7aemgjg6sityt.us.auth0.com",
  secret: "LONG_RANDOM_STRING",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// the /profile route will show the user profile as JSON
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});