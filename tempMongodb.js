exports = async function ({ headers }, response) {
  const jwt = require("jsonwebtoken");
  const mongodb = context.services.get("mongodb-atlas");
  const usersCollection = mongodb.db("OrganisationsWebApp").collection("users");

  // Extrahieren des Cookies aus den Headern
  const cookieHeader = headers.Cookie || "";

  // Ensure that we have a string to work with
  let cookieString = "";

  if (typeof cookieHeader === "string") {
    cookieString = cookieHeader;
  } else if (typeof cookieHeader === "object" && cookieHeader.length > 0) {
    // If it's an array of objects, extract the first one
    cookieString = cookieHeader[0];
  }
  console.log("cookestring", cookieString);
  console.log("cookestring", headers.Cookie);
  console.log("typeof", typeof cookieString);

  const cookies = cookieString.split(";").map((cookie) => cookie.trim());

  // Initialize authToken to null
  let authToken = null;

  // Iterate through the cookies to find the authToken
  cookies.forEach((cookie) => {
    if (cookie.startsWith("authToken=")) {
      authToken = cookie.substring("authToken=".length);
    }
  });

  // Wenn kein Token vorhanden ist, ist der Benutzer nicht authentifiziert
  if (!authToken) {
    response.setStatusCode(401);
    return { isAuthenticated: false, message: "Nicht authentifiziert" };
  }

  try {
    // Verifizieren des Tokens
    const decodedToken = jwt.verify(authToken, "secret");

    // Wenn das Token gültig ist, sende eine positive Antwort
    response.setStatusCode(200);
    const username = decodedToken.username;

    const user = await usersCollection.findOne({ username: username });

    if (!user) {
      // If user not found, return a response indicating that
      return { isAuthenticated: true, username: username, isAdmin: false };
    }

    // Extract the isAdmin field from the user document
    const isAdmin = user.isAdmin;
    console.log("user", user);
    console.log("isadmin,", user.isadmin);
    return { isAuthenticated: true, username: username, isAdmin: isAdmin };
  } catch (error) {
    // Bei einem Fehler (z.B. ungültiges Token), sende eine negative Antwort
    response.setStatusCode(401);
    return {
      isAuthenticated: false,
      message: "Token ungültig oder abgelaufen",
    };
  }
};
