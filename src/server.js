if (process.env.NODE_ENV === "development") {
  require("piping")()
}

import app from "./app"

app.listen(3000, () => {
  console.info("🚀 Listening on http://localhost:3000/")
})
