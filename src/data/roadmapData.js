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
    id: "authentication-nodejs",
    image: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flipkart-icon.png",
    title: "How Flipkart Authenticates Millions of Users",
    description: "Master authentication from scratch — covering password hashing with bcrypt, JWT access & refresh tokens, session management with cookies, and secure login flows used by platforms like Flipkart at scale.",
    tags: ["JWT", "Session", "Cookies", "OAuth"],
    nodes: [

      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is Authentication?",
          "What is Authorization? (Auth vs Authz)",  // ✅ added
          "Password Hashing (bcrypt and salting)"
        ],
        topicDetails: {
          "What is Authentication?": [
            {
              type: "paragraph",
              text: "You spend 10 minutes on Flipkart. Found the perfect iPhone. Added to cart. Hit Buy Now. And suddenly — Flipkart stops you. Wants you to log in first. You've seen this a hundred times. But have you ever stopped to think — why right at checkout? Why not when you were just browsing?"
            },
            { type: "image", src: checkout, alt: "Flipkart checkout page asking user to login" },
            {
              type: "curious-callout",
              text: "❓ Why does Flipkart let you browse freely but stops you the moment you try to buy something?"
            },
            {
              type: "heading",
              text: "What Happens If Flipkart Has No Login System?"
            },
            {
              type: "error-callout",
              title: "Without any login system on Flipkart:",
              list: [
                "Anyone can open your account and see your orders",
                "Anyone can view your saved addresses and bank details",
                "Anyone can place or cancel orders on your behalf",
                "No way to know who is actually doing what"
              ],
              footer: "No privacy. No security. Total chaos. That's exactly the problem Authentication solves."
            },
            {
              type: "heading",
              text: "What is Authentication?"
            },
            {
              type: "paragraph",
              text: "Authentication is simply verifying who you are. Before Flipkart lets you buy anything, save an address, or view your orders — it needs to confirm: 'Are you really who you say you are?' That's it. That's authentication."
            },
            {
              type: "info-callout",
              text: "💡 Think of it like the security guard at your office building. You can stand outside freely. But the moment you try to enter — he checks your ID. He's not checking what you're allowed to do inside. He's just confirming you are who you claim to be. That check is Authentication."
            },
            {
              type: "heading",
              text: "How Flipkart's Login Actually Works"
            },
            {
              type: "step",
              title: "You enter your email and password",
              desc: "You type ram@gmail.com and your password on Flipkart's login page and hit Login."
            },
            {
              type: "step",
              title: "Frontend sends it to the backend",
              desc: "Your credentials travel to Flipkart's server as a POST request."
            },
            {
              type: "code",
              code: "POST /login\n{\n  email: \"ram@gmail.com\",\n  password: \"ram123\"\n}"
            },
            {
              type: "step",
              title: "Server checks the database",
              desc: "Flipkart's server searches the database — is there any account with this email?"
            },
            {
              type: "code",
              code: "const user = await User.findOne({ email: \"ram@gmail.com\" })"
            },
            {
              type: "step",
              title: "Password is verified",
              desc: "If the user exists, it checks if the password matches what's stored."
            },
            {
              type: "step",
              title: "Server responds",
              desc: "✅ Password matches → Login successful. You're in.\n❌ Password wrong → Access denied. 'Invalid credentials.'"
            },
            { type: "image", src: login, alt: "Flipkart login page" },
            {
              type: "warning-callout",
              text: "⚠️ Wait — we just said Flipkart checks your password from the database. Does Flipkart really store your password like this?\n\npassword: 'ram123'\n\nIf someone hacks Flipkart's database — every user's password is exposed in plain text. That's a nightmare. So how does Flipkart actually store passwords safely? That's coming up."
            }
          ],

          "What is Authorization? (Auth vs Authz)": [
            {
              type: "paragraph",
              text: "You just logged into Flipkart. You're in. But now — you try to open another user's order history by changing the URL. Flipkart blocks you. Or you try to access the seller dashboard even though you're a regular buyer. Blocked again. Logging in worked. So why are you still being stopped?"
            },
            {
              type: "curious-callout",
              text: "❓ Flipkart knows who you are. So why does it still block certain pages and actions?"
            },
            {
              type: "heading",
              text: "Authentication vs Authorization — Two Different Questions"
            },
            {
              type: "paragraph",
              text: "Authentication asks — Who are you? Authorization asks — What are you allowed to do? These are two completely separate checks. Passing one doesn't mean you pass the other."
            },
            {
              type: "info-callout",
              text: "💡 Back to the office building analogy. The security guard checked your ID and let you in — that's Authentication. But once inside, you try to enter the CEO's private office. A different lock stops you — because your ID doesn't give you that access. That second check is Authorization."
            },
            {
              type: "heading",
              text: "How This Plays Out on Flipkart"
            },
            {
              type: "step",
              title: "You log in as a regular buyer",
              desc: "Flipkart verifies your email and password. Authentication done. ✅ You're in."
            },
            {
              type: "step",
              title: "You try to open the Seller Dashboard",
              desc: "You type flipkart.com/seller/dashboard in the browser."
            },
            {
              type: "step",
              title: "Flipkart checks your role",
              desc: "Your account is tagged as 'buyer'. Seller Dashboard requires role: 'seller'. You don't have it."
            },
            {
              type: "step",
              title: "Access denied",
              desc: "Flipkart blocks the page. Not because you aren't logged in — but because your account doesn't have seller permissions. ❌"
            },
            {
              type: "code",
              code: "// Authentication — who are you?\nuser = { id: 1, email: 'ram@gmail.com', role: 'buyer' }\n// ✅ Logged in\n\n// Authorization — what can you do?\nif (user.role !== 'seller') {\n  return 'Access Denied' // ❌\n}"
            },
            {
              type: "heading",
              text: "Flipkart Has Multiple Roles"
            },
            {
              type: "paragraph",
              text: "Flipkart isn't just buyers and sellers. There are admins who can ban accounts, delivery agents who can update order status, support staff who can view any order. Each role has different permissions — and Authorization enforces exactly that."
            },
            {
              type: "code",
              code: "Buyer        → view own orders, add to cart, buy\nSeller       → manage listings, view sales, update stock\nDelivery     → update delivery status only\nAdmin        → access everything, ban users, manage all orders"
            },
            {
              type: "success-callout",
              text: "✅ Authentication = Flipkart confirms you are Ram.\nAuthorization = Flipkart checks what Ram is allowed to do.\nBoth checks happen. Both are necessary. One without the other is incomplete."
            },
            {
              type: "warning-callout",
              text: "⚠️ Now that we know how Flipkart identifies and controls users — let's go back to that uncomfortable question. When you set your Flipkart password, how does Flipkart actually store it? Because storing 'ram123' as plain text in a database is a disaster waiting to happen."
            }
          ],

          "Password Hashing (bcrypt and salting)": [
            {
              type: "paragraph",
              text: "Imagine Flipkart's database gets hacked today. The attacker opens the users table. And sees this:"
            },
            {
              type: "code",
              code: "| email              | password    |\n|--------------------|-------------|\n| ram@gmail.com      | ram123      |\n| priya@gmail.com    | priya@456   |\n| arjun@gmail.com    | iloveyou    |"
            },
            {
              type: "error-callout",
              title: "Every single user's password is visible in plain text.",
              list: [
                "Attacker logs into every Flipkart account instantly",
                "Most people reuse passwords — same password works on Gmail, Instagram, bank apps",
                "Millions of accounts compromised in minutes",
                "Flipkart gets destroyed — legally, financially, reputation-wise"
              ],
              footer: "This is not hypothetical. This has happened to real companies. Plain text password storage is unforgivable."
            },
            {
              type: "heading",
              text: "Step 1 — Hashing: Store a Scrambled Version, Not the Real Password"
            },
            {
              type: "paragraph",
              text: "Instead of storing your actual password, Flipkart runs it through a hashing algorithm — bcrypt. Bcrypt takes your password and converts it into a completely scrambled, fixed-length string called a hash. This process is one-way — you can never reverse a hash back to the original password."
            },
            {
              type: "code",
              code: "bcrypt('ram123') \n→ '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'"
            },
            {
              type: "paragraph",
              text: "That long scrambled string is what Flipkart stores in the database — never 'ram123'. When you log in, Flipkart hashes what you typed and compares the two hashes. If they match, you're in. The real password never gets stored anywhere."
            },
            {
              type: "success-callout",
              text: "✅ Now even if the database is hacked, the attacker sees only scrambled hashes. Useless without the original password."
            },
            {
              type: "heading",
              text: "Step 2 — Salting: Make Every Hash Unique"
            },
            {
              type: "paragraph",
              text: "There's still one problem. If Ram and Priya both use the password 'iloveyou' — they'll both get the exact same hash. An attacker can pre-compute hashes for common passwords and look them up instantly. This is called a Rainbow Table attack."
            },
            {
              type: "code",
              code: "bcrypt('iloveyou') → '$2b$10$sameHashEveryTime...'\nbcrypt('iloveyou') → '$2b$10$sameHashEveryTime...'\n// Same password = same hash. Predictable. ❌"
            },
            {
              type: "paragraph",
              text: "Salting fixes this. Before hashing, bcrypt adds a random string — called a salt — to your password. Now even if two users have the same password, their hashes are completely different."
            },
            {
              type: "code",
              code: "Ram's password:   'iloveyou' + salt1 → unique hash A\nPriya's password: 'iloveyou' + salt2 → unique hash B\n\n// Same password. Completely different hashes. ✅"
            },
            {
              type: "step",
              title: "You set your Flipkart password: 'ram123'",
              desc: "Flipkart generates a random salt — a unique random string just for you."
            },
            {
              type: "step",
              title: "Salt is added to your password",
              desc: "'ram123' + 'xK9mP2' (salt) = 'ram123xK9mP2'"
            },
            {
              type: "step",
              title: "bcrypt hashes the combined string",
              desc: "The final hash is stored in the database — along with the salt."
            },
            {
              type: "code",
              code: "// Stored in database:\n{\n  email: 'ram@gmail.com',\n  hash: '$2b$10$xK9mP2...longscrambledstring',\n  salt: 'xK9mP2'\n}"
            },
            {
              type: "step",
              title: "You log in next time",
              desc: "Flipkart takes your typed password + your stored salt → hashes it → compares with stored hash. Match = Login success. ✅"
            },
            {
              type: "success-callout",
              text: "✅ Now Flipkart's database has zero plain text passwords. Every hash is unique even for identical passwords. An attacker with the full database still can't log in as anyone. That's bcrypt + salting doing its job."
            },
            {
              type: "info-callout",
              text: "💡 You never need to implement this from scratch. In Node.js, one library handles everything:\n\nbcrypt.hash('ram123', 10)  // hash + salt — done\nbcrypt.compare('ram123', storedHash)  // verify — done\n\nThe '10' is the salt rounds — how many times bcrypt scrambles the password. Higher = slower to crack. 10 is the standard for most apps."
            },
            {
              type: "warning-callout",
              text: "⚠️ Flipkart now knows who you are and stores your password safely. But after login — how does Flipkart remember you as you move from page to page? Every click is a new request. The server doesn't automatically know it's still you. That's the next problem — and it's solved by Sessions."
            }
          ]
        }
      },
      {
        id: 2,
        title: "Session Based Authentication",
        level: "freshers",
        topics: [
          "Session-based auth (cookies + server session)",
          "Session Store (Memory, Redis)",

          "Logout & Session Destruction"
        ],
        topicDetails: {
          "Session-based auth (cookies + server session)": [
            {
              type: "paragraph",
              text: "You just logged into Flipkart. Verified. But now you click on 'My Orders'. Then 'Wishlist'. Then 'Cart'. Each click is a brand new HTTP request — and HTTP is stateless. The server remembers nothing between requests. So how does Flipkart know it's still you on every single page?"
            },
            {
              type: "curious-callout",
              text: "❓ You logged in once — but how does Flipkart remember you across every page you visit after that?"
            },
            {
              type: "heading",
              text: "What is a Session?"
            },
            {
              type: "paragraph",
              text: "After you log in, Flipkart's server creates a Session — a small record stored on the server that says 'User Ram is currently logged in'. The server gives this session a unique ID — called a Session ID. That ID gets sent to your browser and stored as a Cookie."
            },
            {
              type: "info-callout",
              text: "💡 Think of it like a token at a restaurant. You place your order and the waiter gives you a token number — say #42. Every time you ask for something, you show token #42. The waiter doesn't need to re-verify who you are each time — he just looks up token #42 in his records. That token is your Session ID. The waiter's record book is the Session Store."
            },
            {
              type: "heading",
              text: "How Session-Based Auth Works on Flipkart — Step by Step"
            },
            {
              type: "step",
              title: "You log in with email and password",
              desc: "Flipkart verifies your credentials. Authentication successful. ✅"
            },
            {
              type: "step",
              title: "Server creates a session",
              desc: "Flipkart creates a session object and stores it server-side."
            },
            {
              type: "code",
              code: "// Session stored on server:\nsessionStore['abc123xyz'] = {\n  userId: 1,\n  email: 'ram@gmail.com',\n  role: 'buyer',\n  createdAt: '2024-01-01T10:00:00Z'\n}"
            },
            {
              type: "step",
              title: "Server sends Session ID to browser via Cookie",
              desc: "The session ID is set as a cookie in the response headers."
            },
            {
              type: "code",
              code: "Set-Cookie: sessionId=abc123xyz; HttpOnly; Secure"
            },
            {
              type: "step",
              title: "Browser stores the cookie",
              desc: "Your browser automatically saves this cookie and sends it with every future request to Flipkart."
            },
            {
              type: "step",
              title: "You click 'My Orders'",
              desc: "Your browser sends the request — with the cookie attached automatically."
            },
            {
              type: "code",
              code: "GET /my-orders\nCookie: sessionId=abc123xyz"
            },
            {
              type: "step",
              title: "Server looks up the session",
              desc: "Flipkart takes the session ID, looks it up in the session store, finds your user data. No re-login needed. ✅"
            },
            {
              type: "success-callout",
              text: "✅ One login. Cookie stored. Every request after that — server reads the cookie, finds the session, knows it's you. That's session-based auth in a nutshell."
            },
            {
              type: "warning-callout",
              text: "⚠️ Sessions work — but where are they actually stored? In the server's memory? In a database? What happens when Flipkart restarts a server and all sessions vanish? That's the next problem — and it's solved by the Session Store."
            }
          ],

          "Session Store (Memory, Redis)": [
            {
              type: "paragraph",
              text: "Flipkart just created a session for Ram. Great. But now — where does it save it? Every time Ram makes a request, the server needs to look up that session ID and find his data. That means sessions need to be stored somewhere fast, reliable, and accessible by all servers. That somewhere is called the Session Store."
            },
            {
              type: "curious-callout",
              text: "❓ Flipkart runs on thousands of servers. If Ram's session is stored on Server #12 — what happens when his next request hits Server #47?"
            },
            {
              type: "heading",
              text: "Option 1 — Memory Store"
            },
            {
              type: "paragraph",
              text: "By default, sessions are stored directly in the server's RAM — the Memory Store. It's fast. Zero setup. Works fine on your local machine."
            },
            {
              type: "code",
              code: "// Sessions live in server RAM:\nconst sessionStore = {}\nsessionStore['abc123xyz'] = { userId: 1, email: 'ram@gmail.com' }\n// Request comes in → look up in RAM → found instantly ✅"
            },
            {
              type: "error-callout",
              title: "But Memory Store breaks in production:",
              list: [
                "Server restarts → RAM is wiped → all sessions gone → every user logged out",
                "Flipkart has 10,000 servers → each has its own memory → sessions don't sync",
                "Ram logs in on Server #12 → next request hits Server #47 → session not found → logged out instantly",
                "Memory fills up with millions of sessions → server crashes"
              ],
              footer: "Memory Store is for local development only. Never for production."
            },
            {
              type: "heading",
              text: "Option 2 — Redis (The Production Standard)"
            },
            {
              type: "paragraph",
              text: "Redis is an external key-value store — blazing fast, runs in memory, but persists to disk. All of Flipkart's servers connect to one central Redis instance. Every session is stored there. Any server can look up any session. Problem solved."
            },
            {
              type: "code",
              code: "// Redis session store:\n// Server #12 creates session:\nredis.set('abc123xyz', JSON.stringify({ userId: 1, email: 'ram@gmail.com' }))\n\n// Server #47 gets next request:\nredis.get('abc123xyz') // ✅ Found — same Redis, different server\n\n// Server restarts? Redis is external — sessions survive ✅"
            },
            {
              type: "info-callout",
              text: "💡 Think of Redis like a shared locker room. Every server in Flipkart's fleet has a key to the same locker room. It doesn't matter which server Ram hits — they all look in the same place for his session."
            },
            {
              type: "code",
              code: "Memory Store vs Redis:\n\nMemory Store:\n  Speed      → ✅ Fast\n  Persistence → ❌ Lost on restart\n  Multi-server → ❌ Not shared\n  Production  → ❌ Never\n\nRedis:\n  Speed       → ✅ Fast (in-memory)\n  Persistence → ✅ Survives restarts\n  Multi-server → ✅ Shared by all\n  Production  → ✅ Standard choice"
            },
            {
              type: "success-callout",
              text: "✅ Redis gives Flipkart one central session store that all servers share. Fast lookups. Persistent. Scalable to millions of sessions. That's why every production app uses Redis for sessions."
            },
            {
              type: "warning-callout",
              text: "⚠️ Sessions are created and stored — but what happens when Ram clicks Logout? Just clearing the cookie in the browser isn't enough. If the session still exists on the server, someone with the old cookie ID can still use it. The session needs to be actively destroyed — on the server."
            }
          ],

          "Logout & Session Destruction": [
            {
              type: "paragraph",
              text: "Ram is done shopping on Flipkart. He clicks Logout. The page refreshes. He's back to the login screen. Looks simple. But something very specific just happened on the server — and if it didn't happen correctly, Ram's account is still wide open to anyone who has his session ID."
            },
            {
              type: "curious-callout",
              text: "❓ If someone copies Ram's session cookie before he logs out — can they still use it after he clicks Logout? What actually happens during logout?"
            },
            {
              type: "heading",
              text: "What Logout Must Do"
            },
            {
              type: "paragraph",
              text: "Logout is not just clearing a cookie on the browser. The session ID stored in the cookie is just a key. The actual session data lives on the server. If the server doesn't destroy the session — the key still works. Someone with the old cookie can still make authenticated requests."
            },
            {
              type: "error-callout",
              title: "What happens if logout only clears the browser cookie:",
              list: [
                "Session still exists in Redis — fully valid",
                "Attacker who copied the cookie earlier sends it in a request",
                "Server finds the session in Redis — thinks it's Ram",
                "Attacker has full access to Ram's account — even after Ram 'logged out'"
              ],
              footer: "Browser-only logout is incomplete. The server must kill the session."
            },
            {
              type: "heading",
              text: "Correct Logout — Step by Step"
            },
            {
              type: "step",
              title: "Ram clicks Logout",
              desc: "Browser sends a POST /logout request — with the session cookie attached."
            },
            {
              type: "code",
              code: "POST /logout\nCookie: sessionId=abc123xyz"
            },
            {
              type: "step",
              title: "Server deletes the session from Redis",
              desc: "The session record is permanently removed. The session ID is now dead — points to nothing."
            },
            {
              type: "code",
              code: "// Server-side logout:\nredis.del('abc123xyz')\n// Session is gone. Forever."
            },
            {
              type: "step",
              title: "Server clears the cookie in the browser",
              desc: "Server tells the browser to expire the cookie immediately."
            },
            {
              type: "code",
              code: "Set-Cookie: sessionId=; Max-Age=0; HttpOnly; Secure\n// Max-Age=0 tells browser: delete this cookie right now"
            },
            {
              type: "step",
              title: "Attacker tries the old session ID",
              desc: "Too late. Redis has no record of 'abc123xyz' anymore. Server returns 401 Unauthorized."
            },
            {
              type: "code",
              code: "// Attacker sends stolen cookie:\nGET /my-orders\nCookie: sessionId=abc123xyz\n\n// Server checks Redis:\nredis.get('abc123xyz') // → null\n\n// Response:\n401 Unauthorized ❌"
            },
            {
              type: "success-callout",
              text: "✅ Real logout = server destroys the session first, then clears the browser cookie. Even if someone stole the session ID — the moment Ram logs out, that ID is dead on the server. Useless."
            },
            {
              type: "warning-callout",
              text: "⚠️ Sessions solve the 'remember me' problem — but they have a cost. Every single request requires a Redis lookup. Flipkart gets millions of requests per second. That's millions of Redis hits per second just to verify 'is this session still valid?'. At massive scale — across mobile apps, microservices, third-party integrations — sessions become a bottleneck. There's a smarter way: what if the server didn't need to look anything up at all? That's exactly what JWT-based Token Authentication solves."
            }
          ]
        }
      },
      {
        id: 3,
        title: "Token Based Authentication",
        level: "freshers",
        topics: [
          "What is JWT and How JWT works?",
          "Access Token vs Refresh Token",
          "Storing Tokens (Cookie vs LocalStorage)",
          "Token Expiry & Renewal"
        ],
        topicDetails: {
          "What is JWT and How JWT works?": [
            {
              type: "paragraph",
              text: "Flipkart gets millions of requests per second. With session-based auth, every single one needs a Redis lookup — 'Is this session ID valid? Who does it belong to?' That's millions of database hits per second just for authentication. Add the mobile app, seller portal, delivery agent app — all hammering the same Redis instance. It becomes a bottleneck. There had to be a smarter way."
            },
            {
              type: "curious-callout",
              text: "❓ What if the server didn't need to look anything up at all? What if the token itself carried everything the server needs to know?"
            },
            {
              type: "heading",
              text: "What is JWT?"
            },
            {
              type: "paragraph",
              text: "JWT stands for JSON Web Token. Instead of storing your session on the server and giving you just an ID — JWT packs your actual user information into the token itself and hands it to you at login. You carry it. Every request, you send it. The server reads it, verifies it, and responds. Zero database lookup required."
            },
            {
              type: "info-callout",
              text: "💡 Think of it like a government-issued Aadhaar card. When you check into a hotel — the receptionist doesn't call a government office to verify you exist. All the info is right there on the card. They just check if it looks genuine. JWT works the same way — all the user data is inside the token, and the server just verifies it's authentic."
            },
            {
              type: "heading",
              text: "How JWT Works — The Full Flow"
            },
            {
              type: "step",
              title: "Ram logs in with email and password",
              desc: "Flipkart verifies credentials. Authentication successful. ✅"
            },
            {
              type: "step",
              title: "Server creates a JWT and signs it",
              desc: "Flipkart packs Ram's user info — userId, email, role — into a token and signs it with a secret key only the server knows. This signature is what makes the token tamper-proof."
            },
            {
              type: "code",
              code: "const token = jwt.sign(\n  { userId: 1, role: 'buyer' },\n  process.env.JWT_SECRET,\n  { expiresIn: '15m' }\n)"
            },
            {
              type: "step",
              title: "Server sends the token to Ram's browser",
              desc: "The JWT is returned in the login response. Ram's app stores it in memory."
            },
            {
              type: "step",
              title: "Ram clicks 'My Orders'",
              desc: "App attaches the JWT to the Authorization header and sends the request to the server."
            },
            {
              type: "code",
              code: "GET /my-orders\nAuthorization: Bearer eyJhbGci...SflKxw"
            },
            {
              type: "step",
              title: "Server verifies the token",
              desc: "Flipkart checks the signature to confirm nobody tampered with it, checks the expiry timestamp, and reads the payload — userId and role. All in one step. No database hit."
            },
            {
              type: "step",
              title: "Response sent",
              desc: "Server knows it's Ram, knows his role, returns his orders. All without touching a database. ✅"
            },
            {
              type: "heading",
              text: "What Does a JWT Actually Look Like?"
            },
            {
              type: "paragraph",
              text: "A JWT is a long string with exactly three parts separated by dots — Header, Payload, and Signature. The header says which algorithm was used. The payload holds the actual user data like userId, role, and expiry. The signature is a cryptographic seal — if anyone changes even one character in the payload, the signature breaks and the server rejects it instantly."
            },
            {
              type: "code",
              code: "// Header . Payload . Signature\neyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.SflKxw"
            },
            {
              type: "warning-callout",
              text: "⚠️ The payload is NOT encrypted — anyone can base64-decode and read it. Never store passwords, bank details, or sensitive data in a JWT payload."
            },
            {
              type: "success-callout",
              text: "✅ JWT is stateless — the token carries the user data, the server just verifies. No session store. No Redis. No DB lookup. One secret key is all Flipkart needs to verify millions of tokens per second across every server and service."
            },
            {
              type: "warning-callout",
              text: "⚠️ But JWT tokens can't last forever — a stolen token valid for 30 days is a disaster. Make it too short and users are re-logging in every 15 minutes. There's a smart solution: two tokens working together — an Access Token and a Refresh Token. Each with a very different job."
            }
          ],

          "Access Token vs Refresh Token": [
            {
              type: "paragraph",
              text: "Access tokens expire in 15 minutes — that's intentional. A short window limits damage if stolen. But nobody wants to re-enter their password every 15 minutes on Flipkart. At the same time, a 30-day access token is a nightmare — stolen once, the attacker has month-long access. This feels like an unsolvable tradeoff. Flipkart solves it with two tokens working together."
            },
            {
              type: "curious-callout",
              text: "❓ How does Flipkart keep you logged in for days — without making a stolen token dangerous?"
            },
            {
              type: "heading",
              text: "Two Tokens — Two Jobs"
            },
            {
              type: "paragraph",
              text: "The Access Token is short-lived — 15 minutes. It's sent with every API request. If stolen, the attacker only has a 15-minute window. The Refresh Token is long-lived — 7 days. It's never sent to APIs. Its only job is to get a new access token when the old one expires. It lives in an HttpOnly cookie so JavaScript can't touch it."
            },
            {
              type: "info-callout",
              text: "💡 Think of it like a building access system. Your access card opens doors — but expires every 15 minutes. Your master key can generate a new access card instantly — but you keep it locked in a safe, not in your pocket. Two separate tools. Two separate risk levels."
            },
            {
              type: "heading",
              text: "The Full Flow — Login to Silent Refresh"
            },
            {
              type: "step",
              title: "Ram logs in",
              desc: "Server issues both tokens at once. The access token goes to the app and is stored in memory. The refresh token is set as an HttpOnly cookie — the browser stores it automatically, JavaScript can't read it."
            },
            {
              type: "step",
              title: "Ram uses the app for 15 minutes",
              desc: "Every API call sends the access token in the Authorization header. Server verifies it. No DB hit. Fast. ✅"
            },
            {
              type: "step",
              title: "Access token expires",
              desc: "The next API call returns 401 Unauthorized. The access token's 15-minute window is up."
            },
            {
              type: "step",
              title: "App silently calls /refresh-token",
              desc: "The app catches the 401 and automatically calls the refresh endpoint. The browser sends the HttpOnly refresh token cookie automatically — no JavaScript needed. Ram sees nothing."
            },
            {
              type: "step",
              title: "Server issues a new access token",
              desc: "Server verifies the refresh token, and returns a fresh 15-minute access token. The app stores it in memory and retries the original request. Ram stays logged in. ✅"
            },
            {
              type: "step",
              title: "Refresh token expires — after 7 days",
              desc: "The /refresh-token call itself returns 401. No more silent renewal. App redirects Ram to the login page. This is the intended security boundary."
            },
            {
              type: "code",
              code: "// Complete lifecycle:\nLogin → Access Token (15m) + Refresh Token (7d)\n  ↓ 15 min\n401 → silent refresh → new Access Token ✅\n  ↓ 7 days\n401 on /refresh-token → redirect to Login"
            },
            {
              type: "success-callout",
              text: "✅ Short-lived access tokens limit damage if stolen. Long-lived refresh tokens keep users logged in without re-entering passwords. Silent refresh happens invisibly. Ram stays logged in for 7 days — with 15-minute security windows throughout."
            },
            {
              type: "warning-callout",
              text: "⚠️ Two tokens — but where exactly do they live in the browser? This isn't a preference question — it's a security decision. Storing tokens in the wrong place is one of the most common and catastrophic mistakes in web development. LocalStorage vs Cookies — the wrong choice exposes every user's token to attackers."
            }
          ],

          "Storing Tokens (Cookie vs LocalStorage)": [
            {
              type: "paragraph",
              text: "You have a JWT. You need to store it somewhere in the browser so it can be sent with every request. Two obvious options — LocalStorage and Cookies. Most developers reach for LocalStorage first. It's simple, it's easy, it works. It has also been responsible for some of the worst token theft incidents in web security history."
            },
            {
              type: "curious-callout",
              text: "❓ LocalStorage and Cookies both store data in the browser — what makes one a security disaster and the other the right choice for tokens?"
            },
            {
              type: "heading",
              text: "Option 1 — LocalStorage"
            },
            {
              type: "paragraph",
              text: "LocalStorage is easy to use — store the token on login, read it on every request, attach it to the Authorization header manually. Sounds fine. The problem: any JavaScript running on the page can read LocalStorage. Including malicious scripts injected through XSS attacks."
            },
            {
              type: "error-callout",
              title: "XSS + LocalStorage = every user's token stolen:",
              list: [
                "Attacker finds any XSS vulnerability on Flipkart — even in a product review field",
                "Injects a script that reads localStorage.getItem('accessToken') and sends it to attacker's server",
                "Every user who loads that page silently leaks their token",
                "Attacker has valid JWTs for thousands of users — full account access instantly"
              ],
              footer: "XSS is one of the most common vulnerabilities on the web. LocalStorage makes it catastrophic."
            },
            {
              type: "heading",
              text: "Option 2 — HttpOnly Cookie"
            },
            {
              type: "paragraph",
              text: "An HttpOnly cookie is set by the server — not by JavaScript. The browser stores it and sends it automatically with every matching request. The critical difference: JavaScript cannot read it. Not your code. Not injected malicious code. Not anyone's code. It's completely invisible to the JavaScript layer."
            },
            {
              type: "code",
              code: "res.cookie('refreshToken', token, {\n  httpOnly: true,\n  secure: true,\n  sameSite: 'Strict'\n})"
            },
            {
              type: "heading",
              text: "The Recommended Pattern for Production"
            },
            {
              type: "paragraph",
              text: "Store the access token in memory — a JavaScript variable or React state. It's never persisted anywhere, so XSS has nothing to steal. It gets lost on page refresh, but that's fine — the app silently fetches a new one using the refresh token. Store the refresh token in an HttpOnly cookie. JavaScript can't read it, it survives page refreshes, and the browser sends it automatically."
            },
            {
              type: "code",
              code: "// LocalStorage  → ❌ JS can read it → XSS steals it\n// HttpOnly Cookie → ✅ JS cannot read it → XSS blind"
            },
            {
              type: "success-callout",
              text: "✅ Access token in memory — nothing for XSS to steal. Refresh token in HttpOnly cookie — invisible to JavaScript entirely. This combination gives Flipkart both airtight security and seamless user experience."
            },
            {
              type: "warning-callout",
              text: "⚠️ Tokens are stored safely — but they don't last forever. Access tokens expire in 15 minutes. Refresh tokens expire in 7 days. What exactly happens at expiry? How does the app silently renew without interrupting Ram mid-checkout? That's the final piece — Token Expiry and Renewal."
            }
          ],

          "Token Expiry & Renewal": [
            {
              type: "paragraph",
              text: "Ram is in the middle of checkout on Flipkart. He's been browsing for 20 minutes. His access token silently expired 5 minutes ago. He clicks 'Place Order'. If Flipkart handles this wrong — he gets logged out mid-transaction. Cart cleared. Order lost. Terrible experience. But if tokens never expire — a stolen token means lifetime access for an attacker. Expiry and renewal is how Flipkart balances both."
            },
            {
              type: "curious-callout",
              text: "❓ Access token expires mid-session. How does Flipkart silently renew it without Ram ever knowing — or losing his checkout?"
            },
            {
              type: "heading",
              text: "What Happens When the Access Token Expires"
            },
            {
              type: "step",
              title: "Ram's access token hits expiry",
              desc: "The exp timestamp inside the JWT payload is now in the past. The token is dead."
            },
            {
              type: "step",
              title: "Ram clicks 'Place Order'",
              desc: "App sends the API request with the expired token in the Authorization header."
            },
            {
              type: "step",
              title: "Server rejects it with 401",
              desc: "jwt.verify() detects the expiry — returns 401 Unauthorized instantly."
            },
            {
              type: "step",
              title: "App catches the 401 silently",
              desc: "An Axios interceptor catches every 401 response globally — before it ever reaches any component. Instead of showing an error or logging Ram out, it triggers a silent refresh behind the scenes."
            },
            {
              type: "step",
              title: "App calls /refresh-token",
              desc: "The refresh token HttpOnly cookie is automatically attached by the browser. Server verifies it and returns a brand new access token."
            },
            {
              type: "step",
              title: "Original request is retried",
              desc: "The interceptor takes the new access token, attaches it to the original 'Place Order' request, and resends it — successfully. Ram sees his order placed. He noticed nothing. ✅"
            },
            {
              type: "code",
              code: "// Interceptor catches 401 → refresh → retry:\naxios.interceptors.response.use(\n  res => res,\n  async err => {\n    if (err.response.status === 401) {\n      const { data } = await axios.post('/refresh-token')\n      err.config.headers['Authorization'] = `Bearer ${data.accessToken}`\n      return axios(err.config)  // retry original request ✅\n    }\n  }\n)"
            },
            {
              type: "heading",
              text: "When the Refresh Token Also Expires"
            },
            {
              type: "step",
              title: "Refresh token expires after 7 days",
              desc: "The /refresh-token endpoint itself returns 401. The refresh token's exp timestamp is also in the past — nothing can save it."
            },
            {
              type: "step",
              title: "No more silent renewal possible",
              desc: "The interceptor catches the 401 from /refresh-token — recognizes it's not a regular API call — and stops retrying."
            },
            {
              type: "step",
              title: "App redirects Ram to login",
              desc: "Ram sees the login page. He enters credentials. Server issues a fresh access token and refresh token pair. The full cycle starts again."
            },
            {
              type: "success-callout",
              text: "✅ Access token expires every 15 minutes — stolen tokens are short-lived. Silent refresh keeps Ram logged in for 7 days without a single re-login prompt. After 7 days — fresh login, fresh tokens. Maximum security. Zero friction. That's the complete JWT lifecycle in production."
            }
          ],
        }
      },
      {
        id: 4,
        title: "Authorization",          // ✅ new module
        level: "freshers",
        topics: [
          "What is Authorization?",
          "Role Based Access Control (RBAC)",
          "Protecting Routes (Public vs Private)",
          "Authorization Header & Middleware"
        ],
        topicDetails: {
          "What is Authorization?": [
            {
              type: "paragraph",
              text: "Ram just logged into Flipkart. Authentication passed — Flipkart knows it's him. But now Ram types flipkart.com/seller/dashboard in the browser. He's a buyer. Not a seller. Yet he's logged in. So why does Flipkart still block him? Logging in was supposed to be the gate — why is there another one?"
            },
            {
              type: "curious-callout",
              text: "❓ Flipkart already knows who Ram is. So why does it still block certain pages and actions even after login?"
            },
            {
              type: "heading",
              text: "Authentication vs Authorization — Two Completely Different Questions"
            },
            {
              type: "paragraph",
              text: "Authentication asks — Who are you? Authorization asks — What are you allowed to do? These are two separate checks. Passing authentication does not mean you pass authorization. You need both — and they happen in order."
            },
            {
              type: "info-callout",
              text: "💡 Back to the office building. The security guard checked your ID at the entrance — that's Authentication. You're inside now. But you try to walk into the CEO's private office. A different lock stops you — your ID doesn't grant that access. That second check is Authorization."
            },
            {
              type: "heading",
              text: "How Authorization Plays Out on Flipkart"
            },
            {
              type: "step",
              title: "Ram logs in as a buyer",
              desc: "Authentication done. Flipkart issues a JWT with Ram's role embedded."
            },
            {
              type: "code",
              code: "// Ram's JWT payload:\n{\n  userId: 1,\n  email: 'ram@gmail.com',\n  role: 'buyer'  // ← this is what Authorization checks\n}"
            },
            {
              type: "step",
              title: "Ram tries to open the Seller Dashboard",
              desc: "He types flipkart.com/seller/dashboard — his JWT is sent with the request."
            },
            {
              type: "step",
              title: "Server checks his role",
              desc: "JWT decoded. Role is 'buyer'. Seller Dashboard requires role 'seller'. Mismatch."
            },
            {
              type: "code",
              code: "// Authorization check on server:\nconst decoded = jwt.verify(token, SECRET)\n// decoded.role → 'buyer'\n\nif (decoded.role !== 'seller') {\n  return res.status(403).json({ error: 'Access Denied' }) // ❌\n}"
            },
            {
              type: "step",
              title: "403 Forbidden — not 401",
              desc: "401 means not authenticated. 403 means authenticated but not authorized. Ram is logged in — just not allowed here."
            },
            {
              type: "heading",
              text: "Flipkart Has Multiple Roles — Each With Different Permissions"
            },
            {
              type: "code",
              code: "buyer:\n  ✅ View own orders\n  ✅ Add to cart, checkout\n  ❌ Manage listings\n  ❌ Ban users\n\nseller:\n  ✅ Manage own listings\n  ✅ View own sales data\n  ❌ Access other sellers' data\n  ❌ Ban users\n\ndelivery_agent:\n  ✅ Update delivery status\n  ❌ View order details beyond delivery info\n  ❌ Access any dashboard\n\nadmin:\n  ✅ Access everything\n  ✅ Ban users, manage all orders\n  ✅ View any account"
            },
            {
              type: "success-callout",
              text: "✅ Authentication = Flipkart confirms you are Ram. Authorization = Flipkart checks what Ram is allowed to do. Both checks happen. Both are necessary. One without the other is incomplete — and dangerous."
            },
            {
              type: "warning-callout",
              text: "⚠️ So roles exist — buyer, seller, admin, delivery agent. But how does Flipkart actually manage and enforce these roles systematically across every route and every action? That's the job of Role Based Access Control — RBAC."
            }
          ],

          "Role Based Access Control (RBAC)": [
            {
              type: "paragraph",
              text: "Flipkart has millions of users. Buyers, sellers, delivery agents, admins, support staff. Each needs different access to different parts of the system. Checking roles manually in every single route handler — if user.role === 'admin', if user.role === 'seller' — scattered across thousands of files would be unmaintainable chaos. There's a systematic way to handle this: RBAC."
            },
            {
              type: "curious-callout",
              text: "❓ How does Flipkart enforce different permissions for different roles across every route — without duplicating checks everywhere?"
            },
            {
              type: "heading",
              text: "What is RBAC?"
            },
            {
              type: "paragraph",
              text: "Role Based Access Control is a pattern where permissions are tied to roles — not to individual users. You don't give Ram access to the seller dashboard. You give the 'seller' role access to the seller dashboard. Ram gets access only when his role is 'seller'. Change the role, change the access. Clean, scalable, maintainable."
            },
            {
              type: "code",
              code: "// Without RBAC — messy, scattered, error-prone:\napp.get('/seller/dashboard', (req, res) => {\n  if (req.user.role !== 'seller') return res.status(403).send('Denied')\n  // ...\n})\n\napp.get('/seller/products', (req, res) => {\n  if (req.user.role !== 'seller') return res.status(403).send('Denied')\n  // ...\n})\n// Repeated everywhere. One missed check = security hole. ❌"
            },
            {
              type: "heading",
              text: "RBAC Done Right — Reusable Middleware"
            },
            {
              type: "step",
              title: "Define a reusable role-checking middleware",
              desc: "One function. Takes allowed roles. Returns a middleware. Used everywhere."
            },
            {
              type: "code",
              code: "// authorizeRoles.js:\nconst authorizeRoles = (...allowedRoles) => {\n  return (req, res, next) => {\n    const userRole = req.user.role  // from decoded JWT\n\n    if (!allowedRoles.includes(userRole)) {\n      return res.status(403).json({ error: 'Access Denied' }) // ❌\n    }\n\n    next() // ✅ role matches — continue\n  }\n}"
            },
            {
              type: "step",
              title: "Apply it to routes — clean and explicit",
              desc: "Each route declares exactly which roles can access it."
            },
            {
              type: "code",
              code: "// Routes with RBAC:\napp.get('/seller/dashboard',\n  authenticateToken,          // Step 1: is this user logged in?\n  authorizeRoles('seller'),   // Step 2: do they have the right role?\n  sellerDashboardController\n)\n\napp.get('/admin/users',\n  authenticateToken,\n  authorizeRoles('admin'),\n  adminUsersController\n)\n\napp.get('/orders/update-status',\n  authenticateToken,\n  authorizeRoles('delivery_agent', 'admin'), // multiple roles allowed\n  updateStatusController\n)"
            },
            {
              type: "step",
              title: "Ram (buyer) hits /seller/dashboard",
              desc: "authenticateToken passes — he's logged in. authorizeRoles('seller') runs — his role is 'buyer'. 403 returned. ❌"
            },
            {
              type: "step",
              title: "Priya (seller) hits /seller/dashboard",
              desc: "authenticateToken passes. authorizeRoles('seller') passes — her role matches. Request continues. ✅"
            },
            {
              type: "info-callout",
              text: "💡 With RBAC middleware, every route is self-documenting. Looking at any route, you instantly know: who needs to be logged in, and what role they need. One middleware handles all the enforcement. No duplication. No missed checks."
            },
            {
              type: "success-callout",
              text: "✅ RBAC separates authentication from authorization cleanly. Roles are defined once. Middleware enforces them everywhere. Adding a new role or changing permissions is a one-line change — not a hunt through thousands of files."
            },
            {
              type: "warning-callout",
              text: "⚠️ Roles are enforced on the backend. But what about the frontend? Some routes on Flipkart should be accessible without login — homepage, product listings. Others require login — checkout, orders. Some require specific roles — seller dashboard. How does Flipkart protect frontend routes from being accessed by the wrong users? That's Public vs Private route protection."
            }
          ],

          "Protecting Routes (Public vs Private)": [
            {
              type: "paragraph",
              text: "Flipkart's homepage loads for anyone — no login needed. But try to visit /checkout or /my-orders without logging in — Flipkart redirects you to login instantly. And even if you're logged in as a buyer — /seller/dashboard sends you away. Three types of access. Three types of route protection. All working silently, every time."
            },
            {
              type: "curious-callout",
              text: "❓ How does Flipkart decide which pages anyone can see, which need login, and which need a specific role — and enforce it consistently on both frontend and backend?"
            },
            {
              type: "heading",
              text: "Three Types of Routes on Flipkart"
            },
            {
              type: "code",
              code: "Public Routes:\n  /home, /products, /search, /product/:id\n  → Anyone can access. No token needed.\n\nPrivate Routes:\n  /checkout, /my-orders, /wishlist, /profile\n  → Must be logged in. Any valid role.\n\nRole-Protected Routes:\n  /seller/dashboard, /admin/users, /delivery/status\n  → Must be logged in AND have the correct role."
            },
            {
              type: "heading",
              text: "Backend Route Protection — Middleware Stack"
            },
            {
              type: "code",
              code: "// Public — no middleware:\napp.get('/products', productController)\n\n// Private — must be authenticated:\napp.get('/my-orders',\n  authenticateToken,   // ← blocks if no valid JWT\n  myOrdersController\n)\n\n// Role-protected — must be authenticated + correct role:\napp.get('/seller/dashboard',\n  authenticateToken,\n  authorizeRoles('seller'),  // ← blocks wrong roles\n  sellerDashboardController\n)"
            },
            {
              type: "heading",
              text: "Frontend Route Protection — React"
            },
            {
              type: "paragraph",
              text: "Backend protection is the real security. But on the frontend, Flipkart also prevents users from even seeing pages they shouldn't — avoiding unnecessary API calls and broken UI states."
            },
            {
              type: "code",
              code: "// PrivateRoute — redirect to login if not authenticated:\nconst PrivateRoute = ({ children }) => {\n  const { isLoggedIn } = useAuth()\n  return isLoggedIn ? children : <Navigate to='/login' />\n}\n\n// RoleRoute — redirect if wrong role:\nconst RoleRoute = ({ children, allowedRole }) => {\n  const { user } = useAuth()\n  return user?.role === allowedRole\n    ? children\n    : <Navigate to='/unauthorized' />\n}\n\n// Usage in React Router:\n<Route path='/my-orders'\n  element={\n    <PrivateRoute>\n      <MyOrders />\n    </PrivateRoute>\n  }\n/>\n\n<Route path='/seller/dashboard'\n  element={\n    <RoleRoute allowedRole='seller'>\n      <SellerDashboard />\n    </RoleRoute>\n  }\n/>"
            },
            {
              type: "warning-callout",
              text: "⚠️ Frontend route protection is UX — not security. A user can disable JavaScript, modify React state, or call your APIs directly. Frontend checks just improve experience. The real enforcement must always happen on the backend. Never trust the frontend alone."
            },
            {
              type: "step",
              title: "Ram (buyer) visits /seller/dashboard",
              desc: "Frontend RoleRoute checks his role — 'buyer' ≠ 'seller' → redirected to /unauthorized instantly. Never even loads the page."
            },
            {
              type: "step",
              title: "Ram tries to call /seller/dashboard API directly",
              desc: "Even bypassing the frontend — backend authorizeRoles('seller') middleware runs → 403 Forbidden. ❌"
            },
            {
              type: "success-callout",
              text: "✅ Public routes open to all. Private routes gated by authentication. Role routes gated by role. Both frontend and backend enforce this — frontend for UX, backend for actual security. Two layers. No gaps."
            },
            {
              type: "warning-callout",
              text: "⚠️ Routes are protected — but how does the backend actually receive and verify the user's identity on every request? The token needs to travel from the frontend to the backend in a standard way — and the backend needs a single consistent place to check it before any route handler runs. That's the Authorization Header and Middleware pattern."
            }
          ],

          "Authorization Header & Middleware": [
            {
              type: "paragraph",
              text: "Every protected route on Flipkart needs to know: who is making this request? Is their token valid? What is their role? This check happens before the route handler runs — on every single protected request. If this check is scattered across individual route handlers, one missed check is a security hole. Flipkart centralizes this in one place: the Authorization Header and a middleware that reads it."
            },
            {
              type: "curious-callout",
              text: "❓ How does the backend reliably receive the JWT on every request — and verify it once before any route logic runs?"
            },
            {
              type: "heading",
              text: "The Authorization Header — How JWT Travels"
            },
            {
              type: "paragraph",
              text: "When Ram makes any authenticated request, his app attaches the JWT to the Authorization header using the Bearer scheme. This is the industry standard — not a cookie, not a query param, not a request body."
            },
            {
              type: "code",
              code: "// Every authenticated request from frontend:\nGET /my-orders\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.SflKxw...\n\n// 'Bearer' = standard prefix that says 'I am presenting a token'\n// Everything after 'Bearer ' is the actual JWT"
            },
            {
              type: "code",
              code: "// Axios — attaching token to every request automatically:\naxios.interceptors.request.use(config => {\n  const token = getAccessToken()  // from memory\n  if (token) {\n    config.headers['Authorization'] = `Bearer ${token}`\n  }\n  return config\n})\n// Set once. Works for every API call. No repetition."
            },
            {
              type: "heading",
              text: "The authenticateToken Middleware — One Check for Everything"
            },
            {
              type: "paragraph",
              text: "On the backend, a single middleware function intercepts every protected request, extracts the JWT from the Authorization header, verifies it, and attaches the decoded user to the request object."
            },
            {
              type: "code",
              code: "// authenticateToken.js — runs before any protected route handler:\nconst authenticateToken = (req, res, next) => {\n\n  // Step 1: Extract token from header\n  const authHeader = req.headers['authorization']\n  const token = authHeader && authHeader.split(' ')[1]\n  // 'Bearer eyJ...' → split → ['Bearer', 'eyJ...']\n\n  // Step 2: Token missing\n  if (!token) {\n    return res.status(401).json({ error: 'No token provided' }) // ❌\n  }\n\n  // Step 3: Verify token\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET)\n    req.user = decoded  // { userId: 1, email: '...', role: 'buyer' }\n    next()  // ✅ token valid — continue to route handler\n\n  } catch (err) {\n    return res.status(401).json({ error: 'Invalid or expired token' }) // ❌\n  }\n}"
            },
            {
              type: "heading",
              text: "The Full Middleware Chain in Action"
            },
            {
              type: "code",
              code: "// Protected route — full chain:\napp.get('/my-orders',\n  authenticateToken,        // 1. Is token valid? Who is this?\n  myOrdersController        // 2. Fetch and return their orders\n)\n\napp.get('/seller/dashboard',\n  authenticateToken,        // 1. Is token valid? Who is this?\n  authorizeRoles('seller'), // 2. Do they have seller role?\n  sellerDashboardController // 3. Return seller data\n)\n\n// authenticateToken sets req.user\n// authorizeRoles reads req.user.role\n// Route handler uses req.user.userId to fetch the right data"
            },
            {
              type: "step",
              title: "Request arrives at /my-orders",
              desc: "authenticateToken runs — extracts JWT from Authorization header, verifies signature, sets req.user. ✅"
            },
            {
              type: "step",
              title: "Route handler runs",
              desc: "Reads req.user.userId — fetches only Ram's orders. Not everyone's. Not a random user's."
            },
            {
              type: "code",
              code: "// myOrdersController:\nconst myOrdersController = async (req, res) => {\n  const orders = await Order.find({ userId: req.user.userId })\n  // req.user set by authenticateToken middleware\n  // Ram only sees Ram's orders ✅\n  res.json(orders)\n}"
            },
            {
              type: "success-callout",
              text: "✅ JWT travels in the Authorization header — industry standard. One middleware extracts, verifies, and decodes it. req.user is set once and available to every route handler and role middleware downstream. Authentication and authorization work together as a clean, centralized pipeline."
            }
          ]
        }
      },





      {
        id: 4,
        title: "OAuth 2.0 & Social Login",
        level: "intermediate",
        topics: [
          "What is OAuth 2.0?",
          "OAuth Roles (Resource Owner, Client, Auth Server)",
          "Authorization Code Flow",
          "Implicit Flow (deprecated - why?)",
          "Client Credentials Flow",
          "Google OAuth in Node.js (Passport.js)",
          "Passport.js strategies"
        ]
      },

      {
        id: 5,
        title: "Security Hardening",
        level: "intermediate",
        topics: [
          "HTTPS & Secure Cookies",
          "HttpOnly & SameSite Cookie flags",
          "CSRF Attack & Prevention",
          "SQL Injection",
          "XSS Attack & Prevention",
          "Brute Force Protection (rate limiting login)",
          "Account Lockout mechanism",
          "Input validation & Sanitization"
        ]
      },

      {
        id: 6,
        title: "Multi-Factor Authentication (MFA)",
        level: "intermediate",
        topics: [
          "What is MFA & Why it matters",
          "OTP via Email & SMS (Twilio/Nodemailer)",
          "TOTP (Time-based OTP - Google Authenticator)",
          "speakeasy / otplib in Node.js",
          "Backup Codes implementation",
          "MFA enrollment & recovery flow"
        ]
      },

      {
        id: 7,
        title: "Advanced Token Management",
        level: "intermediate",
        topics: [
          "Refresh Token Rotation",
          "Token Blacklisting with Redis",
          "Sliding Sessions",
          "Silent Token Refresh flow",
          "Device-based token management",
          "Token Fingerprinting"
        ]
      },

      {
        id: 8,
        title: "OpenID Connect (OIDC)",
        level: "experienced",
        topics: [
          "OIDC vs OAuth 2.0",
          "ID Token vs Access Token",
          "UserInfo Endpoint",
          "JWKS (JSON Web Key Sets)",
          "Nonce & State parameter (CSRF protection in OIDC)",
          "Integrating Keycloak / Auth0 in Node.js"
        ]
      },

      {
        id: 9,
        title: "Distributed Auth Architecture",
        level: "experienced",
        topics: [
          "Centralized Auth Service design",
          "Auth in Microservices",
          "Service-to-Service Authentication",
          "API Gateway Auth (JWT validation at gateway)",
          "Shared session store across services (Redis)",
          "Propagating user identity across services"
        ]
      },

      {
        id: 10,
        title: "SSO (Single Sign-On)",
        level: "experienced",
        topics: [
          "What is SSO & How it works",
          "SSO with OAuth 2.0 + OIDC",
          "SAML based SSO basics",
          "SSO session management",
          "Logout across services (Single Logout - SLO)",
          "Enterprise SSO with Okta / Azure AD"
        ]
      },

      {
        id: 11,
        title: "Production Auth Patterns",
        level: "experienced",
        topics: [
          "Passwordless Authentication (Magic Link)",
          "WebAuthn / Passkeys",
          "Biometric Auth basics",
          "Risk-based Authentication",
          "Geo-based suspicious login detection",
          "Auth Audit Logging",
          "GDPR compliance in Auth (data minimization)"
        ]
      }

    ]
  },
  {
    id: "caching-netflix",
    image: "https://images.icon-icons.com/2699/PNG/512/netflix_logo_icon_170919.png",
    title: "How Netflix Caches Content for 200M+ Users",
    description: "Understand how Netflix serves 230M+ users without melting its database — from in-memory caching with Redis, cache-aside & read-through strategies, CDN edge caching, to cache invalidation patterns used in production.",
    tags: ["Redis", "CDN", "Cache Invalidation"],
    nodes: [

      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is Caching and why is it needed?",
          "Cache Hit vs Cache Miss",
          "Cache Hit Ratio",
          "Where Cache Lives (Browser, Server, DB, CDN)",
        ],
        topicDetails: {
          "What is Caching and why is it needed?": [
            {
              type: "paragraph",
              text: "You open Netflix. You click on Stranger Things. Season 1, Episode 1 starts playing in under 2 seconds. Now think about what just happened — Netflix has 230 million users. Thousands of them are clicking Stranger Things at this exact moment. Every single click needs the show title, description, thumbnail, cast, ratings, episode list. If Netflix fetched all of that from its main database every single time — the database would collapse in minutes."
            },
            {
              type: "curious-callout",
              text: "❓ How does Netflix respond in 2 seconds to millions of users — all asking for the same data?"
            },
            {
              type: "heading",
              text: "The Problem With Hitting the Database Every Time"
            },
            {
              type: "error-callout",
              title: "Without caching, every click on Netflix means:",
              list: [
                "A full trip to the database — halfway across the world",
                "Database handles millions of identical requests simultaneously",
                "Each query takes 200-500ms — feels slow and laggy",
                "Database gets overloaded and starts failing under peak traffic"
              ],
              footer: "Friday night. Everyone opens Netflix. Database gets hit with 10 million requests. It dies. Netflix goes down."
            },
            {
              type: "heading",
              text: "What is Caching?"
            },
            {
              type: "paragraph",
              text: "Caching means storing a copy of frequently used data in a fast, temporary storage — so the next time someone asks for it, you don't go all the way to the database. You grab it from the cache instead. Fast. Cheap. No database stress."
            },
            {
              type: "step",
              title: "First user clicks Stranger Things",
              desc: "Netflix fetches all the show data from the database — title, description, cast, episodes, thumbnails. Takes ~300ms."
            },
            {
              type: "step",
              title: "Netflix stores it in cache",
              desc: "That same data is now saved in a super-fast cache (Redis). Right next to the server. Ready to serve instantly."
            },
            {
              type: "step",
              title: "Second user clicks Stranger Things",
              desc: "Netflix checks cache first. Data is already there. Returns it in under 5ms. No database trip needed."
            },
            {
              type: "step",
              title: "10,000 users click Stranger Things",
              desc: "All 10,000 get served from cache. Database is not touched even once. Netflix stays fast and alive."
            },
            {
              type: "success-callout",
              text: "✅ Same data. Same response. 300ms becomes 5ms. Database load drops from 10 million hits to almost zero. That's caching."
            },
            {
              type: "warning-callout",
              text: "⚠️ But how does Netflix know if the data in cache is fresh or stale? What if the cache has it but it's outdated? What if it doesn't have it at all? Those two situations have names — Cache Hit and Cache Miss. Let's understand them."
            }
          ],

          "Cache Hit vs Cache Miss": [
            {
              type: "paragraph",
              text: "You open Netflix and search 'Stranger Things'. Netflix goes to check the cache. Two things can happen — either the data is sitting right there waiting for you, or it's not there at all and Netflix has to go fetch it. These two moments have names."
            },
            {
              type: "heading",
              text: "Cache Hit — The Data is Already There"
            },
            {
              type: "paragraph",
              text: "A Cache Hit happens when Netflix checks the cache and finds exactly what it needs. No database trip. No waiting. Just instant data."
            },
            {
              type: "step",
              title: "You search 'Stranger Things'",
              desc: "Netflix looks in the cache for Stranger Things data."
            },
            {
              type: "step",
              title: "Cache has it",
              desc: "Someone searched for it before. It's already stored. Netflix grabs it instantly."
            },
            {
              type: "code",
              code: "cache.get('stranger_things')\n→ ✅ HIT — data found\n→ Return in 5ms"
            },
            {
              type: "success-callout",
              text: "✅ Cache Hit = fast, cheap, database never involved. This is what Netflix optimises for."
            },
            {
              type: "heading",
              text: "Cache Miss — The Data is Not There"
            },
            {
              type: "paragraph",
              text: "A Cache Miss happens when Netflix checks the cache and finds nothing. Now it has no choice — it goes to the database, fetches the data, stores it in cache for next time, and then responds to you."
            },
            {
              type: "step",
              title: "You search for a brand new show just added today",
              desc: "Netflix checks cache. Nobody has searched for this yet. Cache is empty."
            },
            {
              type: "step",
              title: "Cache Miss — go to database",
              desc: "Netflix hits the main database. Fetches all show data. Takes ~300ms."
            },
            {
              type: "step",
              title: "Store in cache for next time",
              desc: "Netflix saves the data in cache. Next person who searches gets a Cache Hit."
            },
            {
              type: "code",
              code: "cache.get('new_show_xyz')\n→ ❌ MISS — not found\n→ Query database (~300ms)\n→ cache.set('new_show_xyz', data)\n→ Return data"
            },
            {
              type: "warning-callout",
              text: "⚠️ Cache Miss is expensive — database trip, slower response, more server load. Netflix's goal is to keep misses as rare as possible. But how do you measure that? That's where Cache Hit Ratio comes in."
            }
          ],

          "Cache Hit Ratio": [
            {
              type: "paragraph",
              text: "Netflix's engineering team is doing a performance review. Someone asks — 'How effective is our cache? Are users mostly getting Cache Hits or Cache Misses?' You can't just guess. You need a number. That number is the Cache Hit Ratio."
            },
            {
              type: "heading",
              text: "What is Cache Hit Ratio?"
            },
            {
              type: "paragraph",
              text: "Cache Hit Ratio is simply the percentage of requests that were served from cache — out of all requests that came in."
            },
            {
              type: "code",
              code: "Cache Hit Ratio = (Cache Hits / Total Requests) × 100\n\nExample:\n1000 requests came in\n920 served from cache (Hits)\n80 went to database (Misses)\n\nHit Ratio = (920 / 1000) × 100 = 92%"
            },
            {
              type: "paragraph",
              text: "Netflix targets a Cache Hit Ratio above 95% for popular content like Stranger Things, Wednesday, Money Heist. That means for every 100 users clicking a popular show, 95+ are served from cache and less than 5 ever touch the database."
            },
            {
              type: "info-callout",
              text: "💡 Higher Hit Ratio = faster Netflix, less database load, lower infrastructure cost. A drop from 95% to 80% during Friday night peak means millions of extra database queries — and a possible outage."
            },
            {
              type: "error-callout",
              title: "A low Cache Hit Ratio on Netflix means:",
              list: [
                "More users hitting the database directly",
                "Database slows down under load",
                "Show pages take longer to load",
                "Buffering and lag spike during peak hours"
              ],
              footer: "Netflix monitors hit ratio in real time. A sudden drop triggers an immediate alert."
            },
            {
              type: "warning-callout",
              text: "⚠️ Cache Hit Ratio tells you how well your cache is performing — but it doesn't tell you where the cache actually lives. Is it in the browser? On Netflix's server? In the database layer? Near you geographically? Cache can live in multiple places — and each one serves a different purpose."
            }
          ],

          "Where Cache Lives (Browser, Server, DB, CDN)": [
            {
              type: "paragraph",
              text: "You've opened Netflix on your laptop. You watched Stranger Things yesterday. Today you open it again — and the thumbnail loads before the page even fully renders. How? Netflix didn't fetch that from a server. It was already sitting on your laptop. Cache isn't just one place — it lives everywhere."
            },
            {
              type: "heading",
              text: "1 — Browser Cache (On Your Device)"
            },
            {
              type: "paragraph",
              text: "When you visit Netflix, your browser saves static files — thumbnails, CSS, JavaScript, logos — directly on your device. Next visit, your browser loads them locally without sending any request to Netflix's servers."
            },
            {
              type: "code",
              code: "You visit netflix.com\n→ Browser loads logo from local cache\n→ No request to Netflix servers\n→ Page loads instantly ✅"
            },
            {
              type: "heading",
              text: "2 — Server Cache (On Netflix's Backend)"
            },
            {
              type: "paragraph",
              text: "Netflix uses Redis — an in-memory cache — sitting right next to its backend servers. Show metadata, user preferences, trending lists — all stored in Redis. When your request hits Netflix's server, it checks Redis first before touching the database."
            },
            {
              type: "code",
              code: "Request → Netflix Server\n→ Check Redis cache\n→ ✅ HIT: return in 5ms\n→ ❌ MISS: query DB → store in Redis → return"
            },
            {
              type: "heading",
              text: "3 — Database Cache (Inside the DB Layer)"
            },
            {
              type: "paragraph",
              text: "Even the database itself has a built-in cache. Frequently run queries get their results cached inside the DB engine. Netflix's database doesn't re-run the same complex query a million times — if the result is cached, it returns it directly."
            },
            {
              type: "heading",
              text: "4 — CDN Cache (Close to You, Geographically)"
            },
            {
              type: "paragraph",
              text: "This is the big one for Netflix. Video files are massive. Streaming Stranger Things from a server in the US to a user in Mumbai would be painfully slow. So Netflix caches the actual video content on CDN servers placed physically close to you — in Mumbai, Bangalore, Delhi. You stream from the nearest CDN, not from a server in America."
            },
            {
              type: "code",
              code: "You in Mumbai → Request Episode 1\n→ CDN server in Mumbai has it cached\n→ Streams from 10ms away ✅\n\n(Without CDN → streams from US → 200ms latency → buffering 😭)"
            },
            {
              type: "success-callout",
              text: "✅ Browser cache handles static files. Server cache (Redis) handles metadata. DB cache handles repeated queries. CDN cache handles video streaming close to you. Netflix uses all four layers together — that's why it feels instant everywhere in the world."
            },
            {
              type: "warning-callout",
              text: "⚠️ Now we know where cache lives. But how does Netflix actually read data into the cache? Does it load everything upfront? Or only when someone asks for it? There are two strategies — and each works differently."
            }
          ]
        }
      },

      {
        id: 2,
        title: "Cache Reading Strategies",
        level: "freshers",
        topics: [
          "Cache-Aside (Lazy Loading)",
          "Read-Through Cache",
        ],
        topicDetails: {
          "Cache-Aside (Lazy Loading)": [
            {
              type: "paragraph",
              text: "Netflix just launched a brand new original series — 'Delhi Files'. Nobody has watched it yet. Nobody has searched for it. The cache is completely empty for this show. Now the first user in India searches for it. What does Netflix do?"
            },
            {
              type: "curious-callout",
              text: "❓ Should Netflix have pre-loaded every new show into cache? Or should it only cache things when someone actually asks for them?"
            },
            {
              type: "heading",
              text: "Cache-Aside — Load It Only When Needed"
            },
            {
              type: "paragraph",
              text: "Cache-Aside means the application itself manages the cache. It always checks cache first. If data isn't there — it fetches from the database, stores it in cache, and then returns it. Next time someone asks — it's already in cache."
            },
            {
              type: "step",
              title: "User searches 'Delhi Files'",
              desc: "Application checks Redis cache first."
            },
            {
              type: "step",
              title: "Cache Miss — not there yet",
              desc: "Nobody has searched this before. Cache has nothing."
            },
            {
              type: "step",
              title: "Fetch from database",
              desc: "Application queries the database for all Delhi Files metadata — title, cast, episodes, thumbnails."
            },
            {
              type: "step",
              title: "Store in cache",
              desc: "Application saves the result in Redis. TTL set to 1 hour."
            },
            {
              type: "step",
              title: "Return data to user",
              desc: "First user gets the data. Every user after that gets a Cache Hit — served in 5ms."
            },
            {
              type: "code",
              code: "data = cache.get('delhi_files')\n\nif not data:\n  data = db.query('SELECT * FROM shows WHERE title=delhi_files')\n  cache.set('delhi_files', data, ttl=3600)\n\nreturn data"
            },
            {
              type: "success-callout",
              text: "✅ Cache only fills up with data people actually request. No wasted memory pre-loading shows nobody watches. Netflix uses this for long-tail content — older shows, regional titles, niche content."
            },
            {
              type: "warning-callout",
              text: "⚠️ Cache-Aside has one weakness — the very first user always takes the slow path. Cache Miss → DB → slow response. What if you want cache to be populated automatically, without the application having to manage it manually? That's Read-Through Cache."
            }
          ],

          "Read-Through Cache": [
            {
              type: "paragraph",
              text: "In Cache-Aside, the application itself checks cache, then database, then stores in cache. The application is doing all the work. What if Netflix had so many services and teams that they couldn't trust every developer to correctly write that cache-check-then-db logic every time? What if the cache layer could just handle it automatically?"
            },
            {
              type: "heading",
              text: "Let the Cache Handle It"
            },
            {
              type: "paragraph",
              text: "In Read-Through Cache, the application only ever talks to the cache — never directly to the database. If the cache has the data, it returns it. If not, the cache itself goes to the database, fetches the data, stores it, and returns it. The application doesn't need to know or care."
            },
            {
              type: "step",
              title: "User opens Wednesday on Netflix",
              desc: "Application asks cache: 'Give me Wednesday show data.'"
            },
            {
              type: "step",
              title: "Cache checks itself",
              desc: "Cache Hit → returns data instantly. ✅"
            },
            {
              type: "step",
              title: "Or — Cache Miss",
              desc: "Cache doesn't have it. Cache itself goes to the database — not the application."
            },
            {
              type: "step",
              title: "Cache fetches, stores, returns",
              desc: "Cache gets the data from DB, saves it internally, returns it to the application."
            },
            {
              type: "code",
              code: "// Application code — simple and clean\ndata = cache.get('wednesday')\nreturn data\n\n// Cache handles everything internally:\n// Miss → fetch from DB → store → return"
            },
            {
              type: "info-callout",
              text: "💡 Cache-Aside: App manages the cache logic. Read-Through: Cache manages itself. Netflix uses Read-Through for its core content metadata layer — show titles, descriptions, ratings — where consistency matters and the team wants one single place managing cache population."
            },
            {
              type: "success-callout",
              text: "✅ Cleaner application code. Cache is always the single source. No developer accidentally forgets to write to cache. The cache layer takes full responsibility."
            },
            {
              type: "warning-callout",
              text: "⚠️ Both strategies are about reading data. But what about writing? When a Netflix editor updates Stranger Things' description, adds a new episode, or changes the thumbnail — how does that update reach the cache? There are three ways to write — and each comes with different trade-offs."
            }
          ]
        }
      },

      {
        id: 3,
        title: "Cache Writing Strategies",
        level: "freshers",
        topics: [
          "Write-Through Cache",
          "Write-Behind (Write-Back) Cache",
          "Write-Around Cache",
        ],
        topicDetails: {
          "Write-Through Cache": [
            {
              type: "paragraph",
              text: "Netflix's content team just updated the description of Stranger Things Season 5. New episode titles added. Thumbnail changed. This update needs to go into the database. But the cache still has the old data. If someone opens the show right now, they'll see the outdated description."
            },
            {
              type: "curious-callout",
              text: "❓ How do you make sure the cache and database always stay in sync when data changes?"
            },
            {
              type: "heading",
              text: "Write to Cache and Database at the Same Time"
            },
            {
              type: "paragraph",
              text: "Write-Through Cache means every time data is written, it's written to the cache AND the database simultaneously — in the same operation. Both are always in sync. No stale data."
            },
            {
              type: "step",
              title: "Editor updates Stranger Things description",
              desc: "The update request hits Netflix's backend."
            },
            {
              type: "step",
              title: "Write to cache first",
              desc: "New description is saved in Redis immediately."
            },
            {
              type: "step",
              title: "Write to database",
              desc: "Same update is written to the main database in the same operation."
            },
            {
              type: "step",
              title: "User opens Stranger Things",
              desc: "Cache has the latest data. User sees the updated description instantly. ✅"
            },
            {
              type: "code",
              code: "cache.set('stranger_things', newData)\ndb.update('stranger_things', newData)\n// Both updated. Always in sync."
            },
            {
              type: "success-callout",
              text: "✅ Cache and database are always consistent. No user ever sees stale data. Netflix uses this for critical data — show metadata, episode lists, content ratings."
            },
            {
              type: "error-callout",
              title: "Trade-off:",
              list: [
                "Every single write hits both cache and database",
                "Writes are slower — two operations every time",
                "If data is written but never read, you wasted a cache write"
              ],
              footer: "Write-Through is ideal when reads are frequent and data must always be fresh."
            },
            {
              type: "warning-callout",
              text: "⚠️ Write-Through writes to database immediately — every time. What if Netflix has thousands of small updates happening per second — user watch history, pause positions, ratings? Writing all of them instantly to the database is expensive. What if you could batch them up and write later?"
            }
          ],

          "Write-Behind (Write-Back) Cache": [
            {
              type: "paragraph",
              text: "You're watching Stranger Things on Netflix. Every 30 seconds, Netflix saves your watch progress — which episode, which minute, which second. That's thousands of tiny writes per second across 230 million users. If every single progress update hit the database instantly — the database would be hammered non-stop."
            },
            {
              type: "curious-callout",
              text: "❓ What if Netflix wrote to cache immediately but delayed the database write — batching them up and saving in bulk?"
            },
            {
              type: "heading",
              text: "Write Fast Now — Sync to Database Later"
            },
            {
              type: "paragraph",
              text: "Write-Behind Cache writes data to cache immediately and returns success to the user — but the database write happens later, asynchronously, in the background. Netflix confirms your progress is saved instantly. The actual DB write happens in a batch a few seconds later."
            },
            {
              type: "step",
              title: "You pause at 24:13 in Episode 3",
              desc: "Netflix writes your progress to Redis cache immediately. Done in 2ms."
            },
            {
              type: "step",
              title: "Returns success instantly",
              desc: "Netflix tells your app — progress saved. You didn't wait for any database write."
            },
            {
              type: "step",
              title: "Background job batches writes",
              desc: "Every few seconds, a background process collects all progress updates from cache and writes them to the database in one bulk operation."
            },
            {
              type: "code",
              code: "// Immediate:\ncache.set('user_123_progress', { ep: 3, time: '24:13' })\nreturn 'saved' ✅\n\n// Background (few seconds later):\ndb.bulkUpdate(cache.getPendingWrites())"
            },
            {
              type: "success-callout",
              text: "✅ Database load drops massively. Writes feel instant to the user. Netflix uses this for watch history, continue watching, pause positions — high-frequency writes where slight delay in DB sync is perfectly acceptable."
            },
            {
              type: "error-callout",
              title: "The risk:",
              list: [
                "Cache crashes before background sync runs",
                "Those unsaved writes are lost forever",
                "User's progress from the last few seconds disappears"
              ],
              footer: "Netflix accepts this small risk for watch progress — losing 5 seconds of position data is annoying, not catastrophic."
            },
            {
              type: "warning-callout",
              text: "⚠️ Write-Through and Write-Behind both write to cache. But what about data that changes so often that caching it would cause more confusion than help — like real-time view counts or live ratings? Sometimes it's better to skip the cache on writes entirely."
            }
          ],

          "Write-Around Cache": [
            {
              type: "paragraph",
              text: "Every second, millions of Netflix users are watching shows. The view count for Stranger Things is updating thousands of times per second. If Netflix wrote every view count update to cache — the cache would be flooded with rapidly changing numbers, each one becoming stale almost instantly. Caching it is pointless."
            },
            {
              type: "curious-callout",
              text: "❓ What if some data changes so frequently that writing it to cache is just a waste — and you're better off skipping the cache entirely on writes?"
            },
            {
              type: "heading",
              text: "Skip the Cache — Write Directly to Database"
            },
            {
              type: "paragraph",
              text: "Write-Around Cache bypasses the cache on writes completely. Data goes straight to the database. The cache is only populated later — when someone actually reads that data (Cache Miss → fetch from DB → store in cache)."
            },
            {
              type: "step",
              title: "View count updates every second",
              desc: "Netflix writes the new count directly to the database. Cache is not touched."
            },
            {
              type: "step",
              title: "User opens Stranger Things page",
              desc: "Netflix checks cache. No view count there (or it's stale)."
            },
            {
              type: "step",
              title: "Fetch from database",
              desc: "Gets the latest count from DB. Stores it in cache for a short TTL — say 60 seconds."
            },
            {
              type: "step",
              title: "Next user within 60 seconds",
              desc: "Cache Hit — served the count from 60 seconds ago. Close enough. ✅"
            },
            {
              type: "code",
              code: "// Write — skips cache entirely:\ndb.update('stranger_things_views', newCount)\n\n// Read — normal cache-aside:\ndata = cache.get('stranger_things_views')\nif not data:\n  data = db.query(...)\n  cache.set('stranger_things_views', data, ttl=60)"
            },
            {
              type: "success-callout",
              text: "✅ Cache isn't polluted with data that changes every second. Database handles high-frequency writes. Cache serves reads that are slightly delayed — which is perfectly fine for view counts. Nobody cares if the count shows 10.2M vs 10.3M."
            },
            {
              type: "warning-callout",
              text: "⚠️ All three write strategies assume cache has unlimited memory. But Redis has limits. What happens when the cache is full? How does Netflix decide which data to keep and which to throw out? That's Cache Invalidation — TTL, LRU, LFU and more."
            }
          ]
        }
      },

      {
        id: 4,
        title: "Cache Invalidation",
        level: "freshers",
        topics: [
          "TTL (Time to Live)",
          "LRU (Least Recently Used)",
          "LFU (Least Frequently Used)",
          "FIFO (First In First Out)",
          "Manual & Event-Driven Invalidation"
        ],
        topicDetails: {
          "TTL (Time to Live)": [
            {
              type: "paragraph",
              text: "Netflix cached Stranger Things metadata — description, cast, episode list. That data sits in Redis. It will sit there forever — unless Netflix tells it when to expire. Three months later, a new episode drops. The cache still has the old episode list. Users see wrong data. Nobody knows why."
            },
            {
              type: "curious-callout",
              text: "❓ How does Netflix make sure cached data doesn't live forever and become stale?"
            },
            {
              type: "heading",
              text: "Give Every Cached Item an Expiry Time"
            },
            {
              type: "paragraph",
              text: "TTL — Time to Live — is a timer you attach to every cached item. When the timer runs out, the item is automatically deleted from cache. Next request is a Cache Miss, fresh data is fetched from database, cached again with a new TTL. Clean cycle."
            },
            {
              type: "code",
              code: "cache.set('stranger_things', data, ttl=3600)\n// This data lives for 3600 seconds (1 hour)\n// After 1 hour — automatically deleted\n// Next request → Cache Miss → fresh DB fetch"
            },
            {
              type: "paragraph",
              text: "Netflix sets different TTLs based on how often data changes."
            },
            {
              type: "code",
              code: "Show metadata (title, cast)  → TTL: 24 hours\nEpisode list                 → TTL: 1 hour\nTrending shows list          → TTL: 5 minutes\nReal-time view counts        → TTL: 60 seconds"
            },
            {
              type: "success-callout",
              text: "✅ TTL is the simplest cache invalidation strategy. Set it and forget it. Data auto-expires. No manual cleanup. Netflix uses TTL on almost every cached item as the baseline."
            },
            {
              type: "warning-callout",
              text: "⚠️ TTL handles expiry over time — but what about when Redis runs out of memory right now? Netflix has 10,000 shows cached. Cache is full. A new show needs to be added. Something has to be removed to make space. Which one? That's where eviction policies come in — LRU, LFU, FIFO."
            }
          ],

          "LRU (Least Recently Used)": [
            {
              type: "paragraph",
              text: "Netflix's Redis cache is full. 10,000 shows are cached. A new show just dropped — 'Scam 2024'. It needs to be added to cache. Something has to go. How does Redis decide which show to evict? It looks at one thing — which show was accessed the least recently."
            },
            {
              type: "heading",
              text: "Remove What Nobody Has Touched Lately"
            },
            {
              type: "paragraph",
              text: "LRU — Least Recently Used — evicts whichever item hasn't been accessed for the longest time. The logic is simple: if nobody has opened that show's cache entry in a long time, they probably won't any time soon. So it's the safest thing to remove."
            },
            {
              type: "code",
              code: "Cache is full. Need space for 'Scam 2024'.\n\nLast accessed times:\n'Stranger Things'  → 2 minutes ago\n'Wednesday'        → 5 minutes ago\n'Taj Mahal 1989'   → 47 days ago  ← LRU\n\nEvict: 'Taj Mahal 1989' ✅\nAdd: 'Scam 2024' ✅"
            },
            {
              type: "paragraph",
              text: "Taj Mahal 1989 — an old regional show — hasn't been clicked in 47 days. It's the least recently used. It gets evicted. Scam 2024 takes its spot. If someone does search for Taj Mahal 1989 tomorrow, it's a Cache Miss — Netflix fetches it from DB and caches it again."
            },
            {
              type: "success-callout",
              text: "✅ LRU is Netflix's most commonly used eviction policy. It keeps popular, recently trending content in cache and naturally pushes out old, untouched content. Cache stays relevant automatically."
            },
            {
              type: "warning-callout",
              text: "⚠️ LRU looks at recency — when was it last accessed? But what about a show that was opened once last night and never again vs a show that's been opened 50,000 times total but not in the last hour? LRU would keep the one opened last night and evict the more popular one. Is recency always the best measure?"
            }
          ],

          "LFU (Least Frequently Used)": [
            {
              type: "paragraph",
              text: "Cache is full again. LRU would evict based on last access time. But consider this — 'Squid Game' hasn't been clicked in the last 2 hours. 'Some random documentary' was clicked once, 10 minutes ago. LRU evicts Squid Game because it's older. But Squid Game has been accessed 2 million times this week. That's a terrible eviction."
            },
            {
              type: "curious-callout",
              text: "❓ What if instead of recency, we tracked how many times each item has been accessed — and removed the least popular one?"
            },
            {
              type: "heading",
              text: "Remove What Nobody Actually Watches"
            },
            {
              type: "paragraph",
              text: "LFU — Least Frequently Used — tracks access count for every cached item. When eviction is needed, it removes the item with the lowest total access count. Not the oldest — the least watched."
            },
            {
              type: "code",
              code: "Cache is full. Need space.\n\nAccess counts:\n'Squid Game'          → 2,000,000 hits\n'Wednesday'           → 1,800,000 hits\n'Random Documentary'  → 3 hits  ← LFU\n\nEvict: 'Random Documentary' ✅\nKeep: Squid Game, Wednesday"
            },
            {
              type: "paragraph",
              text: "The documentary was cached but barely anyone opened it. 3 hits total. It's the least valuable item in cache. It goes. Squid Game — with 2 million hits — absolutely stays, even if it wasn't accessed in the last hour."
            },
            {
              type: "success-callout",
              text: "✅ LFU keeps genuinely popular content in cache regardless of recency. Netflix uses LFU for evergreen content — shows that have consistent long-term demand like Friends, Breaking Bad, Money Heist."
            },
            {
              type: "info-callout",
              text: "💡 LRU vs LFU: LRU = keep what was opened recently. LFU = keep what has been opened most. Netflix combines both signals in practice — recent AND popular content stays. Rarely watched AND old content gets evicted first."
            },
            {
              type: "warning-callout",
              text: "⚠️ LFU needs to track access counts for every cached item — that's extra memory and computation. For simpler systems that just need to evict in order, there's FIFO — the most basic approach of all."
            }
          ],

          "FIFO (First In First Out)": [
            {
              type: "paragraph",
              text: "Imagine Netflix's cache as a queue. Shows enter from the back and leave from the front. The show that entered the cache first — leaves first. Doesn't matter if it's popular. Doesn't matter when it was last accessed. First in, first out. Like a line at a movie ticket counter."
            },
            {
              type: "heading",
              text: "Simple Queue — Oldest Entry Leaves First"
            },
            {
              type: "paragraph",
              text: "FIFO evicts items in the exact order they were added to cache. No access tracking. No popularity score. No recency check. Pure order of entry."
            },
            {
              type: "code",
              code: "Cache entry order:\n1. 'Money Heist'    → added first\n2. 'Dark'           → added second\n3. 'Squid Game'     → added third\n\nCache full. Need space.\nFIFO evicts: 'Money Heist' (entered first) ✅"
            },
            {
              type: "paragraph",
              text: "Money Heist gets evicted — even if 500,000 people are watching it right now — just because it was cached first. FIFO doesn't care about that."
            },
            {
              type: "error-callout",
              title: "Why Netflix doesn't use FIFO for show content:",
              list: [
                "Doesn't consider popularity — evicts blockbusters as easily as flops",
                "Doesn't consider recency — might evict trending content",
                "Results in constant Cache Misses for popular old shows"
              ],
              footer: "FIFO is too naive for Netflix's content cache. LRU and LFU are smarter choices."
            },
            {
              type: "info-callout",
              text: "💡 FIFO works well for simpler use cases — like caching the last N API responses in order, or managing a fixed-size request log. Not ideal where popularity or recency matters."
            },
            {
              type: "warning-callout",
              text: "⚠️ TTL, LRU, LFU, FIFO — all these strategies evict based on time or usage patterns. But what about immediate invalidation? When Netflix releases a new season RIGHT NOW and needs every cached copy of that show wiped instantly — no waiting for TTL, no waiting for eviction. That's Manual and Event-Driven invalidation."
            }
          ],

          "Manual & Event-Driven Invalidation": [
            {
              type: "paragraph",
              text: "It's 12:00 AM. Netflix just dropped all 8 episodes of Stranger Things Season 5 simultaneously worldwide. Every user opening the show needs to see the new season immediately. But the cache has the old season data — cached with a 24 hour TTL. That TTL won't expire for another 18 hours. 18 hours of users seeing wrong episode counts. That's unacceptable."
            },
            {
              type: "curious-callout",
              text: "❓ How does Netflix wipe specific cache entries instantly — the moment something important changes — without waiting for TTL or eviction policies?"
            },
            {
              type: "heading",
              text: "Manual Invalidation — Wipe It Right Now"
            },
            {
              type: "paragraph",
              text: "Manual invalidation means explicitly deleting a cache entry the moment you know the data has changed. No waiting. The next request will be a Cache Miss — fetching fresh data from the database and caching it again."
            },
            {
              type: "step",
              title: "Netflix content team publishes Season 5",
              desc: "New episodes are uploaded. Database is updated with new episode list."
            },
            {
              type: "step",
              title: "Manually delete the cache entry",
              desc: "Engineering triggers an immediate cache delete for the Stranger Things entry."
            },
            {
              type: "code",
              code: "cache.delete('stranger_things')\n// Cache entry wiped instantly ✅"
            },
            {
              type: "step",
              title: "First user opens Stranger Things",
              desc: "Cache Miss. Netflix fetches fresh data from DB — now includes Season 5. Cached again."
            },
            {
              type: "step",
              title: "All users after that",
              desc: "Cache Hit — Season 5 data. Everyone sees the new season immediately. ✅"
            },
            {
              type: "heading",
              text: "Event-Driven Invalidation — Automate It"
            },
            {
              type: "paragraph",
              text: "Manual invalidation still requires someone to remember to delete the cache. Netflix automates this with event-driven invalidation — whenever the database is updated, it automatically fires an event that triggers cache deletion. No human needed."
            },
            {
              type: "code",
              code: "// Database update triggers an event:\ndb.update('stranger_things', newData)\n→ fires event: 'show_updated'\n\n// Cache listener catches it:\non('show_updated', (showId) => {\n  cache.delete(showId) // Auto-invalidated ✅\n})"
            },
            {
              type: "paragraph",
              text: "The moment any show data changes in the database — the event fires, the cache is cleared, fresh data is ready on the next request. No developer has to remember to do it. No stale data ever sits in cache after an update."
            },
            {
              type: "success-callout",
              text: "✅ Netflix uses event-driven invalidation for all content updates — new episodes, changed thumbnails, updated descriptions, removed titles. The cache stays perfectly in sync with the database automatically — the moment something changes."
            },
            {
              type: "info-callout",
              text: "🎯 Full picture — TTL handles natural expiry over time. LRU/LFU/FIFO handle eviction when memory is full. Manual invalidation handles urgent one-off clears. Event-driven handles automatic real-time sync. Netflix uses all four together — that's how the cache always stays fresh at scale."
            }
          ]
        }
      },

      {
        id: 5,
        title: "Redis as a Cache",
        level: "intermediate",
        topics: [
          "What is Redis & How it works",
          "Redis TTL & Key Expiry",
          "Redis Eviction Policies",
          "Redis Data Structures (String, Hash, List, Set, ZSet)",
          "Redis Memory Optimization"
        ]
      },

      {
        id: 6,
        title: "HTTP & CDN Caching",
        level: "intermediate",
        topics: [
          "How CDN Caching works",
          "Cache-Control Headers",
          "ETag & Conditional Requests",
          "Stale-While-Revalidate",
          "Browser Cache vs CDN Cache",
          "How Netflix uses Open Connect (their own CDN)"
        ]
      },

      {
        id: 7,
        title: "Cache Problems & Solutions",
        level: "intermediate",
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
        id: 8,
        title: "Application Level Caching",
        level: "intermediate",
        topics: [
          "In-Memory Caching (Node.js - node-cache)",
          "Memoization pattern",
          "Database Query Caching",
          "API Response Caching",
          "Fragment Caching",
          "Full Page Caching"
        ]
      },

      {
        id: 9,
        title: "Distributed Caching",
        level: "experienced",
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
        title: "Netflix EVCache (Real World)",
        level: "experienced",
        topics: [
          "What is EVCache (Netflix's caching system)",
          "EVCache Architecture & Design",
          "Memcached vs Redis at Netflix scale",
          "Replication across AWS Availability Zones",
          "Cache Warming strategies at Netflix",
          "Handling cache failures gracefully",
          "Fallback to DB when cache is down"
        ]
      },

      {
        id: 11,
        title: "Advanced Cache Patterns",
        level: "experienced",
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
        id: 12,
        title: "Production Caching Patterns",
        level: "experienced",
        topics: [
          "Cache Monitoring & Hit Rate Alerting",
          "Cache Eviction Tuning in Production",
          "Cost vs Performance tradeoffs",
          "Cache Size estimation",
          "Hot vs Cold Cache behavior",
          "Blue-Green Cache Deployments",
          "GDPR & Caching (PII data in cache)"
        ]
      }

    ]
  },
  {
    id: "websockets-gaming",
    image: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/steam-icon.png",
    title: "How Gaming Apps Use WebSockets",
    description: "Learn how multiplayer games achieve real-time communication — covering WebSocket handshake, persistent connections, full-duplex messaging, Socket.IO rooms, and scaling WebSocket servers for thousands of concurrent players.",
    tags: ["WebSocket", "Socket.IO", "Real-Time"],
    nodes: [

      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is WebSocket?",
          "HTTP vs WebSocket",
          "Why HTTP is not enough for Real-Time",
          "ws:// vs wss://"
        ]
      },
      {
        id: 2,
        title: "Core Concepts & Characteristics",
        level: "freshers",
        topics: [
          "Handshake",
          "Persistent Connection",
          "Full Duplex Communication",
          "Event Based Architecture",
          "Stateful Connection",
          "Low Latency",
          "Connection Management Mechanisms",
          "Reconnection Handling"
        ]
      },
      {
        id: 3,
        title: "WebSocket Lifecycle",
        level: "freshers",
        topics: [
          "Connection Establishment",
          "Sending & Receiving Messages",
          "Ping / Pong (Heartbeat)",
          "Connection Close & Codes",
          "WebSocket Events (onopen, onmessage, onerror, onclose)"
        ]
      },

      {
        id: 4,
        title: "WebSockets in Node.js",
        level: "freshers",
        topics: [
          "ws library setup",
          "Creating a WebSocket Server",
          "Broadcasting messages to all clients",
          "Handling multiple clients",
          "Socket.IO basics vs raw ws"
        ]
      },

      {
        id: 5,
        title: "Socket.IO",
        level: "intermediate",
        topics: [
          "Socket.IO vs raw WebSocket",
          "Rooms & Namespaces",
          "Emitting & Listening to Events",
          "Broadcasting to Room vs All clients",
          "Acknowledgements",
          "Fallback to HTTP Long Polling",
          "Socket.IO middleware"
        ]
      },

      {
        id: 6,
        title: "Real-Time Data Sync",
        level: "intermediate",
        topics: [
          "State Synchronization",
          "Delta Compression (send only changes)",
          "Message Serialization (JSON vs Binary)",
          "MessagePack & Protocol Buffers basics",
          "Handling out-of-order messages"
        ]
      },

      {
        id: 7,
        title: "Scaling WebSocket Servers",
        level: "intermediate",
        topics: [
          "Why WebSockets are hard to scale",
          "Sticky Sessions with Load Balancer",
          "Redis Pub/Sub for multi-server broadcast",
          "Socket.IO Redis Adapter",
          "Horizontal Scaling of WebSocket servers"
        ]
      },

      {
        id: 8,
        title: "Performance & Optimization",
        level: "experienced",
        topics: [
          "Binary frames vs Text frames",
          "Payload size optimization",
          "Batching messages",
          "Throttling & Debouncing events",
          "Backpressure handling",
          "Memory management per connection"
        ]
      },

      {
        id: 9,
        title: "Security in WebSockets",
        level: "experienced",
        topics: [
          "Authentication over WebSocket (JWT on connect)",
          "Origin Validation",
          "Rate Limiting WebSocket messages",
          "Input Validation on server side",
          "DDoS Protection for WebSocket servers",
          "Secure WebSocket (wss://) in production"
        ]
      },

      {
        id: 10,
        title: "Production Architecture",
        level: "experienced",
        topics: [
          "WebSocket Gateway pattern",
          "Multi-region WebSocket deployment",
          "WebSocket behind AWS API Gateway",
          "Using Cloudflare for WebSocket",
          "Monitoring WebSocket connections (Prometheus, Grafana)",
          "Graceful shutdown & drain connections"
        ]
      }

    ]
  },
  {
    id: "loadbalancer-booking",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Booking.com_Icon_2022.svg",
    title: "How Booking.com Handles Millions of Users",
    description: "Explore how Booking.com handles massive traffic spikes — from round-robin & least-connections algorithms, NGINX reverse proxy setup, health checks, sticky sessions, to auto-scaling load balancers in cloud environments.",
    tags: ["NGINX", "Load Balancer", "Reverse Proxy"],
    nodes: [

      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is Load Balancer and Why do we need it?",
          "What is High Availability — How Booking.com stays online 24/7"
        ],
        topicDetails: {
          "What is Load Balancer and Why do we need it?": [
            {
              type: "paragraph",
              text: "Imagine it's New Year's Eve and you're desperately searching for a hotel in Goa on Booking.com. Now imagine 20 lakh other people doing the exact same thing — same app, same moment, same panic. Any normal system would collapse under that pressure. But Booking.com handles it smoothly, every single time. The secret behind that? Load Balancing."
            },

            // 🔴 PROBLEM
            {
              type: "heading",
              text: "The Problem — One Server Can't Handle Everything"
            },
            {
              type: "paragraph",
              text: "Before we understand the solution, let's understand the problem. What actually happens when 20 lakh people hit the same server at the same time?"
            },
            {
              type: "error-callout",
              title: "If Booking.com had only ONE server:",
              list: [
                "20 lakh requests crash into that one server",
                "It slows down... lags... then completely crashes",
                "Nobody can search hotels, view rooms, or make payments",
                "Booking.com loses crores of rupees in just minutes"
              ],
              footer: "This is called Server Overload — a very real, very expensive problem."
            },

            // 💡 SOLUTION INTRO
            {
              type: "heading",
              text: "So What is a Load Balancer?"
            },
            {
              type: "paragraph",
              text: "Simple answer — instead of one server doing all the work, Booking.com runs many servers doing the same job. And a Load Balancer sits in front of all of them, acting like a smart traffic cop — deciding which server gets which request, so no single server drowns."
            },
            {
              type: "info-callout",
              text: "🍔 Think of it like McDonald's on a Sunday. 500 people walk in — instead of one counter handling everyone, the manager opens 10 counters and sends each customer to the free one. That manager? That's your Load Balancer."
            },

            // ⚙️ HOW IT WORKS - STEP BY STEP
            {
              type: "heading",
              text: "How Does It Actually Work? — Step by Step"
            },
            {
              type: "step",
              title: "Step 1 — You search 'Hotels in Goa'",
              desc: "You enter your destination, pick your dates, and hit Search. Simple enough, right?"
            },
            {
              type: "step",
              title: "Step 2 — Your request hits the Load Balancer first",
              desc: "Your request never goes directly to a server. It lands on the Load Balancer first — every single time, no exceptions."
            },
            {
              type: "code",
              code: "You → Load Balancer → Server A / Server B / Server C"
            },
            {
              type: "step",
              title: "Step 3 — Load Balancer finds the least busy server",
              desc: "It checks all servers in real time and picks the one with the least load:\n\nServer A → 900 requests (busy)\nServer B → 850 requests (busy)\nServer C → 200 requests ← Your request goes here"
            },
            {
              type: "step",
              title: "Step 4 — Server C responds with your results",
              desc: "Server C fetches hotels in Goa and sends results back to you — in milliseconds. You don't feel a thing."
            },
            {
              type: "success-callout",
              text: "✅ 20 lakh users. New Year's Eve. Peak traffic. Booking.com stays fast, smooth, and crash-free. That's Load Balancing doing its job."
            },

            // 🔀 ADVANCED - SEPARATE LOAD BALANCERS
            {
              type: "heading",
              text: "One More Thing — Booking.com Uses Separate Load Balancers"
            },
            {
              type: "paragraph",
              text: "Booking.com doesn't use just one Load Balancer for everything. It separates traffic by job — searching, viewing, and paying all have their own lanes."
            },
            {
              type: "code",
              code: "Search Hotels  →  Search Load Balancer  →  Search Servers\nView Rooms     →  Rooms Load Balancer   →  Room Servers\nMake Payment   →  Payment Load Balancer →  Payment Servers"
            },
            {
              type: "paragraph",
              text: "So even if 1 crore people are searching hotels at once, your payment goes through on its own separate lane — completely unaffected. Smart, right?"
            },

            // ⚠️ CLIFFHANGER
            {
              type: "warning-callout",
              text: "⚠️ But wait — what if the Load Balancer itself crashes? Or a server dies mid-request? Who saves you then? That's exactly what High Availability solves — coming up next!"
            }
          ],

          "What is High Availability — How Booking.com stays online 24/7": [

            // 🎬 HOOK
            {
              type: "paragraph",
              text: "You found the perfect hotel in Goa on Booking.com. ₹12,000 for New Year's Eve. You click 'Pay Now', enter your card details, and hit Confirm. At that exact moment — the payment server crashes. What happens to your ₹12,000? What happens to your booking?"
            },

            // 🔴 PROBLEM
            {
              type: "heading",
              text: "Servers Do Crash. It's Not If — It's When."
            },
            {
              type: "paragraph",
              text: "Every server in the world will crash at some point. Hardware fails. Memory overloads. Bugs slip through. The real question is — what happens to the user when it does?"
            },
            {
              type: "error-callout",
              title: "If Booking.com had no backup plan:",
              list: [
                "Payment fails right in the middle of your transaction",
                "Money deducted from your account — hotel not booked",
                "You see a random error screen with no explanation",
                "You call support. They have no idea what happened."
              ],
              footer: "1 minute of downtime on Booking.com = thousands of lost bookings + crores in losses."
            },

            // 💡 SOLUTION INTRO
            {
              type: "heading",
              text: "So What is High Availability?"
            },
            {
              type: "paragraph",
              text: "High Availability simply means — even if something breaks inside the system, the user never feels it. No error. No downtime. No panic. The app just keeps running like nothing happened."
            },
            {
              type: "info-callout",
              text: "🛣️ Think of a highway with 4 lanes. One lane is blocked? Traffic moves to the other 3. The highway never fully shuts down. That's exactly what High Availability does for servers."
            },

            // ⚙️ HOW IT WORKS
            {
              type: "heading",
              text: "How Does Booking.com Stay Up Even When a Server Crashes?"
            },
            {
              type: "paragraph",
              text: "They never rely on just one server. Booking.com runs the same payment system on multiple servers simultaneously. If one dies, the others are already running and ready to take over — instantly."
            },
            {
              type: "code",
              code: "Payment Server A ✅  ← active\nPayment Server B ✅  ← active\nPayment Server C ✅  ← standby, always ready"
            },
            {
              type: "paragraph",
              text: "But how does the system know when a server dies? It doesn't wait for a human to notice. The Load Balancer pings every server every few seconds — asking one simple question: 'Hey, are you alive?'"
            },
            {
              type: "code",
              code: "Every 5 seconds:\n→ Ping Server A ... 200 OK ✅\n→ Ping Server B ... 200 OK ✅\n→ Ping Server C ... ❌ No response\n   Server C marked DOWN. Removed from pool instantly."
            },
            {
              type: "paragraph",
              text: "The moment a server stops responding — it's out. All traffic automatically shifts to the healthy ones. No human involvement. No delay. The user never sees a thing."
            },

            // 🪜 STEP BY STEP - YOUR ₹12,000 STORY
            {
              type: "heading",
              text: "Back to Your ₹12,000 — Here's What Actually Happened"
            },
            {
              type: "step",
              title: "Step 1 — You click Pay Now",
              desc: "Your ₹12,000 payment request is sent to Payment Server A — the least busy one at that moment."
            },
            {
              type: "step",
              title: "Step 2 — Server A crashes mid-request",
              desc: "Memory overload. Hardware failure. A rogue bug. Server A goes completely dark — mid-transaction."
            },
            {
              type: "step",
              title: "Step 3 — System detects it within seconds",
              desc: "The Load Balancer pinged Server A. No response. It immediately marks Server A as DOWN and removes it from the pool."
            },
            {
              type: "code",
              code: "GET /health → Server A → ❌ Timeout\nServer A = DOWN. Rerouting traffic to Server B..."
            },
            {
              type: "step",
              title: "Step 4 — Your payment lands on Server B",
              desc: "Server B picks up right where Server A left off. Payment goes through. Booking confirmed. ✅"
            },
            {
              type: "success-callout",
              text: "✅ You never saw an error. You never even knew Server A crashed. Your booking was confirmed. Your ₹12,000 is safe. That's High Availability — working silently in the background, every single time."
            },

            // 🖼️ FULL PICTURE
            {
              type: "heading",
              text: "The Full Picture — Load Balancer + High Availability Together"
            },
            {
              type: "paragraph",
              text: "These two concepts aren't separate — they work as a team. The Load Balancer distributes traffic smartly. High Availability ensures no crash ever reaches the user. Together, they make Booking.com bulletproof."
            },
            {
              type: "code",
              code: "Your Request\n       ↓\n  Load Balancer\n  (splits traffic smartly)\n       ↓\n┌──────────┬──────────┬──────────┐\n│ Server A │ Server B │ Server C │\n└──────────┴──────────┴──────────┘\n       ↓\n Ping every 5s → server dead?\n → Traffic shifts automatically. User feels nothing."
            },
            {
              type: "success-callout",
              text: "🎯 Load Balancer handles the traffic. High Availability handles the failures. Together — Booking.com stays alive no matter what."
            },

            // ⚠️ CLIFFHANGER INTO ALGORITHMS
            {
              type: "warning-callout",
              text: "⚠️ But wait — when 20 lakh users hit Booking.com at the same time, how does the Load Balancer decide who goes to Server A, who goes to Server B, and who goes to Server C? Does it just go one by one? Does it check who's least busy? Does it randomly pick? There are actual algorithms behind this decision — and that's exactly what we're breaking down next."
            }
          ]
        }
      },

      {
        id: 2,
        title: "Load Balancing Algorithms",
        level: "freshers",
        topics: [
          "Round Robin",
          "Weighted Round Robin",
          "Least Connections",
          "Least Response Time",
          "IP Hash",

        ],
        topicDetails: {

          "Round Robin": [
            {
              type: "paragraph",
              text: "New Year's Eve. 20 lakh users on Booking.com — all searching, filtering, comparing hotels at the same time. Requests are flying in every millisecond. The Load Balancer has 3 servers ready. So — who gets which request?"
            },
            {
              type: "curious-callout",
              text: "❓ Does it pick randomly? Does it check which server is free? Or does it just go one by one?"
            },
            {
              type: "heading",
              text: "The Simplest Approach — Just Take Turns"
            },
            {
              type: "paragraph",
              text: "Round Robin does exactly that. No overthinking. No checking server load. Just — next in line, you're up. Request 1 goes to Server A. Request 2 to Server B. Request 3 to Server C. Then back to Server A again. It keeps rotating forever."
            },
            {
              type: "code",
              code: "Request 1 → Server A\nRequest 2 → Server B\nRequest 3 → Server C\nRequest 4 → Server A  ← back to start\n... repeats forever"
            },
            {
              type: "heading",
              text: "How It Works on Booking.com — Step by Step"
            },
            {
              type: "step",
              title: "Step 1 — 3 users search hotels at the same second",
              desc: "Ravi, Priya, and Ankit all search Hotels in Goa at the exact same moment on New Year's Eve. Three requests hit the Load Balancer at once."
            },
            {
              type: "step",
              title: "Step 2 — Load Balancer doesn't think. It just rotates.",
              desc: "It doesn't check which server is free. It doesn't check speed. It simply follows the order — Server A, then B, then C. Ravi goes to Server A. Priya goes to Server B. Ankit goes to Server C."
            },
            {
              type: "step",
              title: "Step 3 — 3 more users come in. Cycle repeats.",
              desc: "Sneha, Mohit, and Divya search next. Load Balancer starts from Server A again — no matter what. Sneha to Server A. Mohit to Server B. Divya to Server C. Same order. Every time."
            },
            {
              type: "step",
              title: "Step 4 — Every server gets equal work",
              desc: "By the end, all three servers handled exactly the same number of requests. No server sat idle. No server got overloaded. Simple and fair — as long as every request is roughly the same size."
            },
            {
              type: "success-callout",
              text: "✅ Simple. Fast. No extra logic needed. Works perfectly when all servers are identical and requests are roughly the same size — like users just browsing and searching hotels."
            },
            {
              type: "warning-callout",
              text: "⚠️ But here's the catch — what if Booking.com's servers are NOT identical? Server A has 16GB RAM. Server B has 4GB RAM. Round Robin still sends them equal requests. Server B will choke while Server A sits half-empty. That's unfair — and it causes slowdowns. So what do we do? That's where Weighted Round Robin comes in."
            }
          ],

          "Weighted Round Robin": [
            {
              type: "paragraph",
              text: "Booking.com just upgraded Server A — 16GB RAM, faster CPU, built to handle 3x more traffic. Server B is the old one — 4GB RAM, slower. If Round Robin sends them equal requests, Server B will choke while Server A sits half-empty. Same rotation won't work here."
            },
            {
              type: "curious-callout",
              text: "❓ What if we could tell the Load Balancer — Server A is stronger, give it more requests?"
            },
            {
              type: "heading",
              text: "Same Rotation — But Not Equal Turns"
            },
            {
              type: "paragraph",
              text: "Weighted Round Robin gives each server a weight based on how powerful it is. Higher weight means more requests. Lower weight means fewer. Server A gets weight 3. Server B gets weight 1. So in every cycle of 4 requests — Server A handles 3, Server B handles 1."
            },
            {
              type: "heading",
              text: "How It Works on Booking.com — Step by Step"
            },
            {
              type: "step",
              title: "Step 1 — 4 users search hotels at the same time",
              desc: "Ravi, Priya, Ankit, and Sneha all hit Search simultaneously on New Year's Eve. Four requests land on the Load Balancer at once."
            },
            {
              type: "step",
              title: "Step 2 — Load Balancer reads server weights",
              desc: "Before sending anything, it checks the weights. Server A has weight 3 — it can take 3 requests this cycle. Server B has weight 1 — it gets just 1. Total cycle = 4 requests."
            },
            {
              type: "step",
              title: "Step 3 — Requests go based on weight, not turn",
              desc: "Ravi, Priya, and Ankit — all three go to Server A one after another. Server A is powerful, it handles them easily. Sneha goes to Server B — just one request, well within its limit."
            },
            {
              type: "step",
              title: "Step 4 — Cycle repeats. Always fair. Never random.",
              desc: "Next 4 users come in — same pattern. Server A takes 3, Server B takes 1. Each server only gets what it can handle. No server crashes. No server sits idle."
            },
            {
              type: "success-callout",
              text: "✅ Booking.com uses this when they have a mix of new and old servers. The powerful ones carry more load. The older ones handle what they can. Nothing goes to waste."
            },
            {
              type: "warning-callout",
              text: "⚠️ But weights are set manually — you decide them once and they stay fixed. The Load Balancer never actually checks if Server A is busy or free right now. It just blindly follows the weights. What if Server A is already drowning in 900 heavy requests and Server B is completely free? Weighted Round Robin won't care. It'll still send 3 to Server A. We need something smarter — that's where Least Connections comes in."
            }
          ],

          "Least Connections": [
            {
              type: "paragraph",
              text: "It's peak time on Booking.com. Server A is handling 900 active connections — users mid-booking, filling payment details, waiting for confirmation. Server B just cleared a bunch of requests and is sitting at 200 connections. A new user hits Search. Where should the request go?"
            },
            {
              type: "curious-callout",
              text: "❓ What if instead of rotating, we just looked at who has the least work right now and sent it there?"
            },
            {
              type: "heading",
              text: "Stop Rotating — Start Observing"
            },
            {
              type: "paragraph",
              text: "Least Connections does exactly that. Before every request, the Load Balancer checks all servers in real time — how many active connections does each one have right now? — and sends the new request to whoever has the least. No rotation. No weights. Just live observation."
            },
            {
              type: "heading",
              text: "How It Works on Booking.com — Step by Step"
            },
            {
              type: "step",
              title: "Step 1 — Ravi clicks Pay Now for his Goa hotel",
              desc: "Ravi's payment request hits the Load Balancer. It immediately checks all three servers live. Server A has 900 connections, Server B has 200, Server C has 650. Server B is the least busy — Ravi's payment goes there instantly."
            },
            {
              type: "step",
              title: "Step 2 — Priya applies heavy filters on hotel search",
              desc: "Priya is filtering 500 hotels by price, photos, rating, and availability — a heavy request. Load Balancer checks again. Server B now has 201 connections but is still the least busy. Priya's request goes to Server B."
            },
            {
              type: "step",
              title: "Step 3 — Server A suddenly clears 700 requests",
              desc: "Server A just finished a huge batch. Its connections drop from 900 to 150. Now Ankit's search request comes in. Load Balancer checks — Server A is now the least busy. Ankit goes to Server A. Just like that, traffic shifted automatically."
            },
            {
              type: "step",
              title: "Step 4 — This check happens before every single request",
              desc: "Not once a minute. Not once a second. Before every request — Load Balancer takes a live snapshot, finds the least busy server, and routes there. Always accurate. No human involved."
            },
            {
              type: "success-callout",
              text: "✅ Ravi's payment, Priya's heavy search, Ankit's request — all went to whoever had the most breathing room at that exact moment. No guessing. No fixed turns. Just real-time intelligence keeping Booking.com smooth."
            },
            {
              type: "warning-callout",
              text: "⚠️ But counting connections isn't the full picture. Server B has 200 connections — but what if they're all slow and heavy, taking 10 seconds each? Server C has 650 connections — but they're all nearly done, responding in 50ms. Least Connections would still pick Server B. And your user waits. We need an algorithm that also measures how fast each server is actually responding — that's Least Response Time."
            }
          ],

          "Least Response Time": [
            {
              type: "paragraph",
              text: "Server B has 200 connections. Server A has 400. Least Connections picks Server B — fewer connections, must be better. But Server B is responding in 800ms — it's struggling, maybe old hardware or a memory issue. Server A is responding in 50ms — fast, healthy, ready. Least Connections just sent your request to the wrong server."
            },
            {
              type: "curious-callout",
              text: "❓ What if the Load Balancer looked at both — how many connections AND how fast each server is actually responding right now?"
            },
            {
              type: "heading",
              text: "Pick the Fastest, Not Just the Emptiest"
            },
            {
              type: "paragraph",
              text: "Least Response Time does exactly this. It combines two signals — active connections and current response speed. The server with the best mix of low connections and fast response wins every request. Not the emptiest. The fastest."
            },
            {
              type: "heading",
              text: "How It Works on Booking.com — Step by Step"
            },
            {
              type: "step",
              title: "Step 1 — Sneha applies a coupon code at checkout",
              desc: "Sneha hits Apply on her 20% off coupon. Load Balancer checks all servers — connections and response speed both. Server A has 400 connections but is responding in 50ms. Server B has 200 connections but is taking 800ms. Server A wins. Coupon validates instantly."
            },
            {
              type: "step",
              title: "Step 2 — Mohit loads 30 room photos for a beachfront suite",
              desc: "Heavy request — 30 high quality images. Load Balancer checks again. Server B is now at 820ms and getting worse. Server A is still at 55ms. Even with more connections, Server A is clearly healthier. Mohit's photos go to Server A and load fast."
            },
            {
              type: "step",
              title: "Step 3 — Server B recovers on its own",
              desc: "Server B clears its backlog. Response time drops from 820ms back to 45ms. Now Divya checks room availability for 5 adults. Load Balancer checks — Server B is now the fastest. Divya's request goes to Server B. Traffic shifted automatically the moment Server B recovered."
            },
            {
              type: "step",
              title: "Step 4 — No human touched anything",
              desc: "No config change. No alert. No engineer woke up at midnight. The Load Balancer noticed Server B was slow, avoided it, and came back to it the moment it recovered. All by itself. In real time."
            },
            {
              type: "success-callout",
              text: "✅ Sneha's coupon applied instantly. Mohit's photos loaded fast. Divya's availability check came back in milliseconds. Every request went to the fastest, healthiest server at that exact moment — automatically."
            },
            {
              type: "warning-callout",
              text: "⚠️ But all 4 algorithms so far — Round Robin, Weighted, Least Connections, Least Response Time — treat every request as brand new. They don't remember who you are. So imagine Karan spent 10 minutes on Booking.com — searched hotels, filtered by pool and breakfast, shortlisted 3 rooms — all saved on Server A. He clicks to view a room. Load Balancer sends him to Server B. Server B has no idea who Karan is. No filters. No shortlist. Everything gone. That's the problem IP Hash was built to solve."
            }
          ],

          "IP Hash": [
            {
              type: "paragraph",
              text: "You spent 10 minutes on Booking.com — searched hotels in Goa, filtered by pool and breakfast, shortlisted 3 options, and finally clicked on the perfect one. All of that is stored on Server A. Now you click View Rooms. The Load Balancer sends this new request to Server B. Server B has never seen you before. No filters. No shortlist. Your entire session is gone."
            },
            {
              type: "error-callout",
              title: "Without sticking to the same server:",
              list: [
                "Your selected filters disappear completely",
                "Cart gets wiped mid-booking",
                "Login session breaks — you're suddenly logged out",
                "Payment flow fails halfway through"
              ],
              footer: "This is called Session Loss — and it's a terrible user experience."
            },
            {
              type: "heading",
              text: "Same User — Always Same Server"
            },
            {
              type: "paragraph",
              text: "IP Hash fixes this permanently. Every device on the internet has an IP address — a unique number that identifies it. IP Hash takes that number, runs a simple calculation on it, and always maps that IP to the same server. Same user, same IP, same server — every single time, for the entire session."
            },
            {
              type: "heading",
              text: "How It Works on Booking.com — Step by Step"
            },
            {
              type: "step",
              title: "Step 1 — Karan opens Booking.com for the first time",
              desc: "The moment Karan's first request hits the Load Balancer, it reads his IP address. It runs a quick hash on that IP and maps Karan permanently to Server B for this session. From this point on — every request Karan makes goes to Server B. No exceptions."
            },
            {
              type: "step",
              title: "Step 2 — Karan searches, filters, and shortlists hotels",
              desc: "Karan searches Hotels in Goa, filters by swimming pool and free breakfast, and shortlists 3 hotels. Every click goes to Server B. Server B builds up everything about Karan — his login, his filters, his shortlist, his browsing history on this session."
            },
            {
              type: "step",
              title: "Step 3 — Karan opens a hotel to check room details",
              desc: "Karan clicks on a beachfront resort. New request fires. Load Balancer hashes his IP again — same IP, same result, same server. Goes to Server B. Server B already knows Karan. Room details load instantly. Filters are intact. Nothing reset."
            },
            {
              type: "step",
              title: "Step 4 — Karan completes payment",
              desc: "Karan selects a room, fills in guest details, applies a coupon, and hits Pay Now. All of this — four separate requests — go to Server B automatically. No session breaks. No re-login prompt. No lost cart. Server B had everything from click one. Payment goes through cleanly."
            },
            {
              type: "success-callout",
              text: "✅ From first search to payment confirmation — Karan never switched servers once. His filters stayed. His cart stayed. His login stayed. IP Hash kept him on Server B for the entire journey — silently, automatically, without Karan ever knowing it existed."
            },
            {
              type: "info-callout",
              text: "💡 Now you know all 5 algorithms. Round Robin for equal servers. Weighted for unequal servers. Least Connections for real-time load. Least Response Time for speed-aware routing. IP Hash for sticky sessions. Each one solves a different problem — and Booking.com uses the right one for the right job."
            },
            {
              type: "warning-callout",
              text: "⚠️ But IP Hash creates a new question — Karan is always pinned to Server B. What if Server B crashes right in the middle of his payment? His session was only on Server B. It's gone. The system needs to detect the crash, move Karan to another server, and somehow not lose his session. That's exactly what Stateless vs Stateful systems solve — and that's what's coming next."
            }
          ]
        }
      },

      {
        id: 3,
        title: "State Management",
        level: "freshers",
        topics: [
          "Stateless vs Stateful systems",
          "Sticky Sessions (Session Affinity)"
        ],
        topicDetails: {
          "Stateless vs Stateful systems": [
            {
              type: "paragraph",
              text: "You're on Booking.com. You log in, search hotels in Goa, apply filters — pool, breakfast included, under ₹8,000. You click on a hotel. Behind the scenes, your request goes to Server A. Now you click 'View Rooms'. This request lands on Server B. Server B has absolutely no memory of who you are or what you just did."
            },
            {
              type: "curious-callout",
              text: "❓ Does the server remember you between requests? Or does it treat every click like you're a brand new stranger?"
            },
            {
              type: "heading",
              text: "Stateless — Every Request Stands Alone"
            },
            {
              type: "paragraph",
              text: "A Stateless server has no memory. Every request that comes in must carry all the information needed to process it — who you are, what you want, your login token, everything. The server reads it, responds, and immediately forgets you ever existed."
            },
            {
              type: "code",
              code: "Request → Server A\n{\n  token: \"user_abc_jwt\",\n  action: \"search\",\n  city: \"Goa\"\n}\n→ Server A responds. Forgets you. Done."
            },
            {
              type: "paragraph",
              text: "Next request goes to Server B? No problem. Server B reads the same token, understands who you are, handles it. It doesn't need to remember you — because you brought everything it needs."
            },
            {
              type: "success-callout",
              text: "✅ Stateless is beautiful for Load Balancing — any server can handle any request. No server is tied to any user. Scale up, scale down, swap servers freely."
            },
            {
              type: "heading",
              text: "Stateful — The Server Remembers You"
            },
            {
              type: "paragraph",
              text: "A Stateful server stores your session data in its own memory. It remembers your login, your cart, your filters — everything. But here's the catch — only that one server knows about you. If your next request goes to a different server, it has zero idea who you are."
            },
            {
              type: "code",
              code: "Request 1 → Server A\nServer A stores: { user: 'ram', cart: ['Hotel Goa'] }\n\nRequest 2 → Server B\nServer B: ❌ Who is ram? I have no data."
            },
            {
              type: "error-callout",
              title: "Stateful servers cause real problems when:",
              list: [
                "Load Balancer routes your next request to a different server",
                "Your server crashes mid-session",
                "You're in the middle of checkout and suddenly logged out",
                "Scaling up adds new servers — but they have no idea about existing users"
              ],
              footer: "This is exactly why most modern systems prefer Stateless — but Stateful still has its place."
            },
            {
              type: "warning-callout",
              text: "⚠️ So if Stateful is so problematic, why does Booking.com still use it for certain flows like payments? Because some things genuinely need session memory — and that's where Sticky Sessions come in."
            }
          ],

          "Sticky Sessions (Session Affinity)": [
            {
              type: "paragraph",
              text: "You're at the final step on Booking.com — payment page. You've entered your card details. The system is processing. At this exact moment, the Load Balancer sends your next request to a different server. That server has no memory of your payment flow. The transaction breaks. ₹12,000 gone. Booking lost."
            },
            {
              type: "curious-callout",
              text: "❓ What if we could tell the Load Balancer — once a user lands on a server, keep them there for the entire session?"
            },
            {
              type: "heading",
              text: "Sticky Sessions — Stay With the Same Server"
            },
            {
              type: "paragraph",
              text: "Sticky Sessions means the Load Balancer remembers which server you started with — and keeps sending all your requests to that same server for the entire session. You're 'stuck' to your server. On purpose."
            },
            {
              type: "paragraph",
              text: "How does it remember? It gives you a cookie the moment you first connect. Every request you make after that carries this cookie. The Load Balancer reads it and routes you to your assigned server — every single time."
            },
            {
              type: "code",
              code: "First Request:\nYou → Load Balancer → Server B\nLoad Balancer sets: SERVERID=B (cookie)\n\nAll future requests:\nYou → Load Balancer reads cookie → Server B ✅\nAlways Server B. Until session ends."
            },
            {
              type: "paragraph",
              text: "Server B already has your payment state, your booking details, your session. Every click from here — confirm room, enter card, hit pay — all goes to Server B. No data loss. No broken flow."
            },
            {
              type: "success-callout",
              text: "✅ Booking.com uses Sticky Sessions specifically for checkout and payment — where losing session mid-way would be catastrophic. Start on Server B, finish on Server B."
            },
            {
              type: "error-callout",
              title: "But Sticky Sessions come with trade-offs:",
              list: [
                "If Server B crashes, your entire session is lost — cookie is useless now",
                "Server B might get overloaded while Server A and C sit idle",
                "Hard to scale — new servers don't get existing sticky users"
              ],
              footer: "Use it only where truly needed — like payment flows. For everything else, go Stateless."
            },
            {
              type: "warning-callout",
              text: "⚠️ Both Stateless and Sticky Sessions assume the servers are alive and healthy. But what if Server B — the one your entire payment session is stuck to — suddenly goes down? Who notices? How fast? What happens next? That's exactly what Health Checks and Failover handle."
            }
          ]
        }
      },

      {
        id: 4,
        title: "Health Checks & Failover",
        level: "freshers",
        topics: [
          "Active health checks",
          "Passive health checks",

        ],
        topicDetails: {
          "Active health checks": [
            {
              type: "paragraph",
              text: "Booking.com has 5 payment servers running. Everything looks fine on the dashboard. But Server C — quietly, without any warning — starts running out of memory. It's not fully dead yet. It's just... stuck. Not responding. Users are hitting it. Requests are going in. Nothing is coming back."
            },
            {
              type: "curious-callout",
              text: "❓ How does the Load Balancer know Server C is sick — before even more users get routed to it?"
            },
            {
              type: "heading",
              text: "Don't Wait for a Crash — Go Check"
            },
            {
              type: "paragraph",
              text: "Active Health Checks means the Load Balancer doesn't wait for something to go wrong. It proactively pings every server at regular intervals — every few seconds — asking one simple question: 'Are you alive and working?'"
            },
            {
              type: "code",
              code: "Every 5 seconds:\nGET /health → Server A → 200 OK ✅\nGET /health → Server B → 200 OK ✅\nGET /health → Server C → ❌ Timeout\n\nServer C marked as DOWN.\nRemoved from pool immediately."
            },
            {
              type: "paragraph",
              text: "Server C didn't fully crash. But it stopped responding to health pings. That's enough. The Load Balancer pulls it out of rotation right away — no more users get sent there."
            },
            {
              type: "success-callout",
              text: "✅ Active checks catch problems early — before users feel them. The server is removed silently. Traffic shifts to healthy servers. Nobody on Booking.com notices anything."
            },
            {
              type: "paragraph",
              text: "And it's not just a basic ping. Booking.com's health check endpoint actually verifies the full system is working — can the server reach the database? Can it process a payment? Is response time acceptable?"
            },
            {
              type: "code",
              code: "GET /health\n→ DB connection: ✅\n→ Payment gateway: ✅\n→ Response time: 45ms ✅\n→ Status: 200 OK — All good"
            },
            {
              type: "warning-callout",
              text: "⚠️ Active checks go out and ask servers 'are you okay?' — great for catching problems early. But what about failures that happen mid-request — while a user is literally in the middle of a booking? The ping hasn't gone out yet. The next one is 5 seconds away. What catches that?"
            }
          ],

          "Passive health checks": [
            {
              type: "paragraph",
              text: "A user clicks Confirm Booking on Booking.com. The request goes to Server D. Server D accepts it — but then returns a 500 error. Something broke mid-request. The next active health check ping is 4 seconds away. That's 4 seconds of more users still being sent to a broken server."
            },
            {
              type: "curious-callout",
              text: "❓ What if the Load Balancer could detect a sick server just by watching real traffic — without sending any pings at all?"
            },
            {
              type: "heading",
              text: "Watch Real Requests — Not Test Pings"
            },
            {
              type: "paragraph",
              text: "Passive Health Checks don't send any pings. Instead, the Load Balancer silently watches every real request going through. If a server starts throwing errors — 500s, timeouts, failed responses — it notices the pattern and acts."
            },
            {
              type: "code",
              code: "Request 1 → Server D → 500 Error ❌\nRequest 2 → Server D → 500 Error ❌\nRequest 3 → Server D → Timeout  ❌\n\n3 failures in a row.\nServer D marked as DOWN. Removed from pool."
            },
            {
              type: "paragraph",
              text: "No test ping needed. The real traffic itself revealed the problem. The Load Balancer catches it mid-flight and pulls Server D out before more users are affected."
            },
            {
              type: "success-callout",
              text: "✅ Passive checks are instant — they react to real failures as they happen, not on a timer. Booking.com uses both active and passive together. Active catches slow degradation early. Passive catches sudden mid-request failures immediately."
            },

          ]
        }
      },

      {
        id: 5,
        title: "Networking Layer Understanding",
        level: "intermediate",
        topics: [
          "Layer 4 Load Balancing (TCP/UDP)",
          "Layer 7 Load Balancing (HTTP/HTTPS)",
        ]
      },

      {
        id: 6,
        title: "System Design Level Concepts",
        level: "intermediate",
        topics: [
          "Vertical Scaling",
          "Horizontal Scaling",
          "Reverse Proxy",
          "API Gateway vs Load Balancer",
          "Latency vs Throughput",
          "Connection pooling",
          "Keep-alive mechanism"
        ]
      },

      {
        id: 7,
        title: "Advanced Traffic Management",
        level: "experienced",
        topics: [
          "Path-based routing",
          "Host-based routing",
          "Header-based routing",
          "Geo Load Balancing",
          "Anycast vs DNS routing",
          "Rate limiting",
          "Throttling",
          "Request prioritization"
        ]
      },

      {
        id: 8,
        title: "Reliability & Failure Handling",
        level: "experienced",
        topics: [
          "Failover",
          "Circuit Breaker pattern",
          "Retry mechanisms",
          "Timeout handling",
          "Active-Active setup",
          "Active-Passive setup",
          "Thundering Herd Problem",
          "Cascading failures"
        ]
      },

      {
        id: 9,
        title: "Security in Load Balancing",
        level: "experienced",
        topics: [
          "SSL/TLS Termination",
          "HTTPS offloading",
          "DDoS protection basics",
          "Web Application Firewall (WAF)",
          "IP filtering"
        ]
      },

      {
        id: 10,
        title: "Cloud & Real Tools",
        level: "experienced",
        topics: [
          "NGINX Load Balancer",
          "HAProxy",
          "Envoy Proxy",
          "AWS ELB / ALB / NLB",
          "Cloudflare Load Balancing",
          "Kubernetes Ingress Controller"
        ]
      }

    ]
  },
  {
    id: "streams-nodejs",
    image: "https://static.vecteezy.com/system/resources/previews/056/505/637/non_2x/jiohotstar-app-icon-on-transparent-background-free-png.png",
    title: "How Jio Hotstar Streams Live matches",
    description: "Understand how Jio Hotstar streams live cricket to millions — covering Node.js Readable & Writable streams, backpressure handling, piping, Transform streams, and HLS-based adaptive bitrate streaming for video delivery.",
    tags: ["Streams", "Buffers", "HLS"],
    nodes: [
      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [

          "What are Streams and why do we need it?",
          "Buffer vs Stream",
          "Event-driven architecture",
        ],
        topicDetails: {
          "What are Streams and why do we need it?": [
            {
              type: "paragraph",
              text: "You're on Hotstar. You click play on a 2-hour IPL match. The video starts in 2 seconds. But the full match file is 8GB. Hotstar didn't download all 8GB before playing. You're watching byte 1 while byte 50,000,000 is still being fetched. That's a Stream — and without it, modern video platforms simply couldn't exist."
            },
            {
              type: "curious-callout",
              text: "❓ What would actually happen if Hotstar tried to load the entire match file into memory before playing it?"
            },
            {
              type: "heading",
              text: "What Happens Without Streams"
            },
            {
              type: "paragraph",
              text: "Without streams, Hotstar's server would have to read the entire 8GB match file into RAM first, then send it to you. Multiply that by 10 million concurrent viewers during an IPL final — each needing 8GB in RAM simultaneously. That's 80,000 TB of RAM just to serve one match. The server crashes in seconds. Every viewer gets a black screen."
            },
            {
              type: "error-callout",
              title: "Without Streams — what Hotstar's server would face:",
              list: [
                "Read entire 8GB file into RAM before sending even 1 byte",
                "10 million viewers = 10 million × 8GB loaded simultaneously",
                "Server RAM exhausted instantly — crashes for everyone",
                "No video plays until the entire file is loaded — minutes of waiting"
              ],
              footer: "This is not hypothetical. This is exactly what happens when you use fs.readFile() on large files in Node.js."
            },
            {
              type: "heading",
              text: "What is a Stream?"
            },
            {
              type: "paragraph",
              text: "A Stream is a way to handle data piece by piece — called chunks — instead of loading everything at once. Hotstar reads a small chunk of the match file, sends it to your browser, reads the next chunk, sends that. Memory used at any point: just one chunk. Not 8GB. Just a few kilobytes at a time."
            },
            {
              type: "info-callout",
              text: "💡 Think of it like a water pipeline. Water from a reservoir doesn't teleport into your tap all at once. It flows continuously through pipes — a little at a time. You get water the moment you open the tap. The reservoir doesn't need to empty into a bucket first. Streams work exactly the same way with data."
            },
            {
              type: "heading",
              text: "Streams vs No Streams — Side by Side"
            },
            {
              type: "code",
              code: "// ❌ Without Streams — fs.readFile:\n// Loads entire file into RAM first, then sends\nfs.readFile('ipl-match.mp4', (err, data) => {\n  res.end(data)  // 8GB sitting in RAM before 1 byte sent\n})\n\n// ✅ With Streams — fs.createReadStream:\n// Reads and sends chunk by chunk — RAM stays low\nfs.createReadStream('ipl-match.mp4').pipe(res)"
            },
            {
              type: "success-callout",
              text: "✅ Streams let Hotstar serve millions of viewers simultaneously — using a fraction of the memory. Data flows as it's produced. Users see content instantly. Servers stay alive. That's why every high-scale platform — Hotstar, YouTube, Netflix — is built on streams."
            },
            {
              type: "warning-callout",
              text: "⚠️ Streams work because Node.js processes data in chunks. But what exactly is a chunk? And what was happening before streams existed — what is a Buffer? Understanding Buffer vs Stream is what makes the rest of this click."
            }
          ],

          "Buffer vs Stream": [
            {
              type: "paragraph",
              text: "Hotstar is sending you an IPL match. The data is travelling from their server to your browser over the network. But networks aren't perfectly smooth — sometimes data arrives faster than your player can render it, sometimes slower. There needs to be a temporary holding area that absorbs the fluctuation. That holding area is a Buffer."
            },
            {
              type: "curious-callout",
              text: "❓ If Streams send data chunk by chunk — where do those chunks sit while waiting to be processed?"
            },
            {
              type: "heading",
              text: "What is a Buffer?"
            },
            {
              type: "paragraph",
              text: "A Buffer is a temporary storage area in memory — a fixed-size chunk of raw binary data. Think of it as a waiting room. Data arrives from the network or file system, sits in the Buffer briefly, gets processed, and then the Buffer is cleared for the next batch. In Node.js, Buffer is a global class that holds raw bytes."
            },
            {
              type: "info-callout",
              text: "💡 Think of watching Hotstar on a slow connection. You've seen that spinning loader — 'Buffering...'. That's literally the Buffer filling up. Hotstar is waiting for enough chunks to arrive and sit in the buffer before it can play the next few seconds smoothly. The buffer is absorbing the network inconsistency."
            },
            {
              type: "heading",
              text: "Buffer vs Stream — The Core Difference"
            },
            {
              type: "paragraph",
              text: "A Buffer holds ALL the data in memory at once — waiting until everything is ready before doing anything. A Stream processes data as it arrives — chunk by chunk — without waiting for the whole thing. For small data, Buffer is fine. For large files like match recordings, live streams, or file uploads — Buffer is a memory disaster."
            },
            {
              type: "code",
              code: "// Buffer approach — waits for ALL data:\nconst data = fs.readFileSync('match.mp4')\n// 8GB sitting in RAM. Nothing sent yet.\n\n// Stream approach — processes as it arrives:\nconst stream = fs.createReadStream('match.mp4')\nstream.on('data', chunk => {\n  // Process this chunk NOW. Move on. RAM stays low.\n})"
            },
            {
              type: "heading",
              text: "How Buffer and Stream Work Together"
            },
            {
              type: "paragraph",
              text: "Buffers and Streams aren't opposites — they work together. A Stream internally uses Buffers. As Hotstar's server reads the match file, each chunk it reads is temporarily a Buffer. The Stream moves those Buffers along one at a time — processes one, discards it, picks up the next. The Stream is the pipeline. The Buffer is what flows through it."
            },
            {
              type: "code",
              code: "// Each 'chunk' inside a stream IS a Buffer:\nfs.createReadStream('match.mp4').on('data', chunk => {\n  console.log(Buffer.isBuffer(chunk))  // → true\n  console.log(chunk.length)            // → 65536 (64KB at a time)\n})"
            },
            {
              type: "success-callout",
              text: "✅ Buffer = temporary holding area for raw bytes. Stream = the pipeline that moves Buffers along chunk by chunk. Together they let Hotstar stream 8GB match files to millions of users — using only kilobytes of RAM at any moment."
            },
            {
              type: "warning-callout",
              text: "⚠️ Streams move data in chunks — but how does Node.js know when a chunk has arrived? How does it react without blocking? That's the foundation of how Node.js works — Event-driven architecture. Without understanding events, Stream code looks like magic."
            }
          ],

          "Event-driven architecture": [
            {
              type: "paragraph",
              text: "Hotstar's server is streaming a match to 10 million users simultaneously. It's also accepting new user logins, processing payments, handling chat messages — all at the same time. Node.js runs on a single thread. How does it manage all of this without everything waiting in a queue? The answer is Event-driven architecture — and it's the reason Node.js exists."
            },
            {
              type: "curious-callout",
              text: "❓ Node.js has only one thread. How does it handle millions of things happening at the same time without freezing?"
            },
            {
              type: "heading",
              text: "The Traditional Way — Blocking"
            },
            {
              type: "paragraph",
              text: "In a traditional blocking model, when Hotstar's server reads a file, it stops everything and waits. Read file — wait. File done — continue. Next request — wait again. With 10 million users, that means 10 million things all waiting in line. One slow file read blocks everyone behind it."
            },
            {
              type: "error-callout",
              title: "Blocking model on Hotstar's scale:",
              list: [
                "User 1 requests match stream — server starts reading file — blocks",
                "User 2 arrives — server is busy — waits",
                "User 3, 4, 5... all waiting in line",
                "One slow disk read = everyone frozen"
              ],
              footer: "This is why traditional blocking servers need one thread per user — expensive, doesn't scale."
            },
            {
              type: "heading",
              text: "The Event-Driven Way — Non-Blocking"
            },
            {
              type: "paragraph",
              text: "Node.js never waits. Instead of blocking, it says: 'Start reading the file. When a chunk is ready, fire an event. I'll handle it then.' Meanwhile it goes and handles User 2, User 3, User 4. When the file chunk is ready — the event fires — Node.js handles it instantly. This is the Event Loop."
            },
            {
              type: "info-callout",
              text: "💡 Think of a restaurant. A blocking waiter takes User 1's order, stands in the kitchen waiting for the food, brings it back, then goes to User 2. An event-driven waiter takes User 1's order, hands it to the kitchen, immediately goes to User 2, User 3, User 4. When kitchen rings the bell (event fires) — he picks up the food and delivers it. Same one person. 10x the tables served."
            },
            {
              type: "heading",
              text: "How This Connects to Streams"
            },
            {
              type: "paragraph",
              text: "Streams are built entirely on events. When Hotstar's server reads a chunk of the match file — it fires a 'data' event. When the file ends — 'end' event. When something goes wrong — 'error' event. Your code just listens for these events and reacts. Node.js handles the timing."
            },
            {
              type: "code",
              code: "const stream = fs.createReadStream('match.mp4')\n\nstream.on('data', chunk => {\n  // 🔔 event fired — chunk is ready\n  res.write(chunk)  // send to user\n})\n\nstream.on('end', () => {\n  // 🔔 event fired — file fully read\n  res.end()\n})\n\nstream.on('error', err => {\n  // 🔔 event fired — something went wrong\n  res.status(500).end()\n})"
            },
            {
              type: "success-callout",
              text: "✅ Event-driven architecture = don't wait, just listen. Node.js starts a task, registers a listener, moves on. When the task completes — the event fires — the listener runs. This is why one Node.js server can stream matches to 10 million users simultaneously on a single thread."
            },
            {
              type: "warning-callout",
              text: "⚠️ Streams fire events — but what kind of stream fires what kind of event? Not all streams are the same. Hotstar's server reads a file (Readable), writes a response (Writable), and sometimes does both (Duplex). Each type has a different job — and that's exactly what Types of Streams covers next."
            }
          ]
        }
      },
      {
        id: 2,
        title: "Types of Streams",
        level: "freshers",
        topics: [
          "Readable Streams",
          "Writable Streams",
          "Duplex Streams",
          "Transform Streams",
        ],
        topicDetails: {
          "Readable Streams": [
            {
              type: "paragraph",
              text: "Hotstar needs to read an 8GB IPL match file and send it to your browser. It can't load 8GB into RAM. It needs to read the file piece by piece — chunk by chunk — and push each chunk out as soon as it's ready. The stream that reads data and makes it available for consumption is a Readable Stream."
            },
            {
              type: "curious-callout",
              text: "❓ Who produces the data in a stream? Who's on the 'output' end pushing chunks out — the file system, the network, the database?"
            },
            {
              type: "heading",
              text: "What is a Readable Stream?"
            },
            {
              type: "paragraph",
              text: "A Readable Stream is a source of data. It produces data and makes it available to be consumed. You don't push data into it — you read data out of it. On Hotstar's server, the match file is the source. fs.createReadStream reads it chunk by chunk and fires 'data' events as each chunk becomes available."
            },
            {
              type: "info-callout",
              text: "💡 A Readable Stream is like a tap. Water (data) flows out of it. You don't put water in — you only take water out. The source (reservoir/file) is behind it. You just open the tap and consume what comes out."
            },
            {
              type: "heading",
              text: "Readable Stream in Action — Hotstar File Streaming"
            },
            {
              type: "step",
              title: "User clicks Play on Hotstar",
              desc: "Server receives the request for the match file."
            },
            {
              type: "step",
              title: "Server creates a Readable Stream on the file",
              desc: "fs.createReadStream opens the file and starts reading it in chunks — default 64KB per chunk."
            },
            {
              type: "step",
              title: "data event fires for each chunk",
              desc: "Each 64KB chunk fires a 'data' event. Server sends that chunk to the user immediately."
            },
            {
              type: "step",
              title: "end event fires when file is fully read",
              desc: "Stream signals completion. Server closes the response. User's player has received the full file — streamed chunk by chunk."
            },
            {
              type: "code",
              code: "const fs = require('fs')\n\nconst readable = fs.createReadStream('ipl-match.mp4')\n\nreadable.on('data', chunk => {\n  console.log(`Chunk received: ${chunk.length} bytes`)\n})\n\nreadable.on('end', () => {\n  console.log('File fully read ✅')\n})"
            },
            {
              type: "paragraph",
              text: "Real-world Readable Streams on Hotstar: fs.createReadStream for match files, HTTP request bodies (incoming upload streams), database query result streams for large datasets, live match score feeds from data providers."
            },
            {
              type: "success-callout",
              text: "✅ Readable Stream = data source. It produces chunks, fires events, lets you consume data without loading everything into memory. Hotstar reads an 8GB file with kilobytes of RAM at any moment — because of Readable Streams."
            },
            {
              type: "warning-callout",
              text: "⚠️ Readable Streams produce data — but something has to receive it. When Hotstar reads the match file, where does each chunk go? To the user's browser — through a Writable Stream."
            }
          ],

          "Writable Streams": [
            {
              type: "paragraph",
              text: "Hotstar read a chunk of the match file using a Readable Stream. Now that chunk needs to go somewhere — to the user's browser, to a new file, to a database. The stream that receives data and does something with it is a Writable Stream. If Readable is the tap, Writable is the drain."
            },
            {
              type: "curious-callout",
              text: "❓ Every chunk that comes out of a Readable Stream has to go somewhere. What receives it, processes it, and decides what to do with it?"
            },
            {
              type: "heading",
              text: "What is a Writable Stream?"
            },
            {
              type: "paragraph",
              text: "A Writable Stream is a destination for data. You write chunks into it. It consumes them — sends to network, writes to file, stores in database. On Hotstar's server, the HTTP response object is a Writable Stream. Every chunk read from the match file gets written into the response — which sends it to the user's browser."
            },
            {
              type: "info-callout",
              text: "💡 A Writable Stream is like a drain. Water (data) flows into it. You don't take water out — you only pour water in. What happens to that water (where it goes) is the Writable Stream's job — file system, network, database."
            },
            {
              type: "code",
              code: "const fs = require('fs')\n\nconst writable = fs.createWriteStream('match-copy.mp4')\n\nwritable.write(chunk1)\nwritable.write(chunk2)\nwritable.end()  // signal: no more data coming\n\nwritable.on('finish', () => {\n  console.log('All chunks written ✅')\n})"
            },
            {
              type: "heading",
              text: "Readable + Writable Together — Hotstar's Core Flow"
            },
            {
              type: "paragraph",
              text: "Hotstar's actual streaming flow connects a Readable and Writable Stream together. The Readable reads the match file chunk by chunk. Each chunk gets written into the Writable HTTP response. The user's browser receives it in real time. This connection between Readable and Writable — that's what pipe() does, which comes up in Piping."
            },
            {
              type: "code",
              code: "// Hotstar streaming a match to a user:\nconst readable = fs.createReadStream('ipl-match.mp4')\nreadable.pipe(res)  // res is a Writable Stream\n// Readable feeds into Writable — chunk by chunk ✅"
            },
            {
              type: "success-callout",
              text: "✅ Writable Stream = data destination. It receives chunks and consumes them. The HTTP response, a new file, a database connection — all Writable Streams. Together with Readable Streams, they form the complete data pipeline."
            },
            {
              type: "warning-callout",
              text: "⚠️ Readable reads. Writable writes. But what if Hotstar needs a stream that does both — receives data AND sends data? Like a live chat server that both receives messages and broadcasts them. That's a Duplex Stream."
            }
          ],

          "Duplex Streams": [
            {
              type: "paragraph",
              text: "During a live IPL match on Hotstar, there's a live commentary chat — you send messages and receive other users' messages simultaneously. One connection. Data flowing in both directions at the same time. A Readable handles one direction. A Writable handles the other. But what handles both simultaneously? A Duplex Stream."
            },
            {
              type: "curious-callout",
              text: "❓ What kind of stream can both produce data AND consume data at the same time — independently in both directions?"
            },
            {
              type: "heading",
              text: "What is a Duplex Stream?"
            },
            {
              type: "paragraph",
              text: "A Duplex Stream is both Readable and Writable at the same time — independently. Data can flow in and data can flow out simultaneously, with no relationship between what goes in and what comes out. The most common real-world Duplex Stream is a TCP socket — the foundation of every network connection."
            },
            {
              type: "info-callout",
              text: "💡 Think of a phone call. You speak (write data out) and listen (read data in) simultaneously. What you say has no direct relationship to what you hear — they're independent streams of audio flowing in opposite directions on the same connection. That's a Duplex Stream."
            },
            {
              type: "code",
              code: "const net = require('net')\n\n// TCP socket — a real Duplex Stream:\nconst socket = net.createConnection({ port: 3000 })\n\n// Writable side — send data:\nsocket.write('User joined match commentary')\n\n// Readable side — receive data:\nsocket.on('data', chunk => {\n  console.log('Received:', chunk.toString())\n})"
            },
            {
              type: "paragraph",
              text: "Duplex Streams on Hotstar: WebSocket connections for live chat during matches, TCP connections between Hotstar's microservices, network sockets for real-time score updates, peer-to-peer connections for low-latency streaming."
            },
            {
              type: "success-callout",
              text: "✅ Duplex = Readable + Writable independently. Data flows both ways simultaneously. TCP sockets, WebSockets, network connections — all Duplex Streams. The two directions are completely independent — what goes in has nothing to do with what comes out."
            },
            {
              type: "warning-callout",
              text: "⚠️ Duplex has two independent directions. But what if the output IS dependent on the input — you read data, transform it, and output the modified version? Like Hotstar compressing a 1080p stream to 480p for users on slow connections. That's a Transform Stream."
            }
          ],

          "Transform Streams": [
            {
              type: "paragraph",
              text: "A user in a village opens Hotstar on 2G. Sending them the full 1080p match at 8GB would buffer forever. Hotstar's server needs to take the 1080p stream coming in, compress it down to 480p in real time, and send the smaller version out. Data goes in one end, gets modified, comes out the other end. That's a Transform Stream."
            },
            {
              type: "curious-callout",
              text: "❓ What if you need to modify data as it flows through — compress it, encrypt it, convert it — without storing the whole thing first?"
            },
            {
              type: "heading",
              text: "What is a Transform Stream?"
            },
            {
              type: "paragraph",
              text: "A Transform Stream is a Duplex Stream where the output is directly derived from the input. Data comes in, gets transformed, goes out — chunk by chunk. Unlike Duplex where input and output are independent, in Transform they're connected. What you read out is a modified version of what you wrote in."
            },
            {
              type: "info-callout",
              text: "💡 Think of a translation booth at a UN meeting. Speech goes in (English), gets transformed in real time, comes out the other side (Hindi). Same content, different form. Nobody stores the entire speech first — it's transformed as it flows. That's a Transform Stream."
            },
            {
              type: "code",
              code: "const zlib = require('zlib')\nconst fs = require('fs')\n\n// Transform Stream — compress match file as it streams:\nfs.createReadStream('match-1080p.mp4')  // data in\n  .pipe(zlib.createGzip())              // transform: compress\n  .pipe(fs.createWriteStream('match-480p.mp4.gz'))  // data out\n// Entire 8GB compressed chunk by chunk — minimal RAM ✅"
            },
            {
              type: "paragraph",
              text: "Transform Streams Hotstar uses in production: zlib.createGzip() for compressing streams before sending, crypto.createCipher() for encrypting DRM-protected content, custom Transform streams for converting video formats on the fly, JSON parsing streams for large API responses."
            },
            {
              type: "success-callout",
              text: "✅ Transform = data in → modify → data out. Input and output are linked. Compress, encrypt, convert, parse — all Transform Streams. Hotstar serves 480p to 2G users and 4K to fiber users from the same source file — using Transform Streams in real time."
            },
            {
              type: "warning-callout",
              text: "⚠️ Four types of streams — each with a specific job. But streams don't work in silence. They communicate through events — 'data', 'end', 'error', 'finish'. Missing even one event listener means missed chunks, silent failures, or memory leaks. Stream Events are what make streams actually controllable."
            }
          ]
        }
      },
      {
        id: 3,
        title: "Stream Events & Methods",
        level: "freshers",
        topics: [
          "data, end, error, finish events",
          "read(), write(), push(), pipe()",
          "Stream lifecycle",
          "Flowing vs Paused mode"
        ],
        topicDetails: {
          "data, end, error, finish events": [
            {
              type: "paragraph",
              text: "Hotstar's server is streaming a match. Chunks are flowing. But how does the server know when a chunk arrived? How does it know the file ended? How does it catch a network failure mid-stream without crashing? Streams don't return values — they communicate entirely through events. Miss an event, and the stream fails silently."
            },
            {
              type: "curious-callout",
              text: "❓ A stream is running in the background asynchronously. How does your code know what's happening — chunk arrived, file done, something broke?"
            },
            {
              type: "heading",
              text: "The 4 Core Stream Events"
            },
            {
              type: "heading",
              text: "'data' — A chunk is ready"
            },
            {
              type: "paragraph",
              text: "Fires on Readable Streams every time a new chunk is available. This is where you process each piece — send it to the user, transform it, write it somewhere. Each chunk is a Buffer by default."
            },
            {
              type: "code",
              code: "stream.on('data', chunk => {\n  res.write(chunk)  // send this chunk to Hotstar user\n})"
            },
            {
              type: "heading",
              text: "'end' — No more data to read"
            },
            {
              type: "paragraph",
              text: "Fires on Readable Streams when all data has been consumed. The match file has been fully read. Time to close the response, log completion, or trigger the next step."
            },
            {
              type: "code",
              code: "stream.on('end', () => {\n  res.end()  // match fully streamed to user ✅\n})"
            },
            {
              type: "heading",
              text: "'finish' — All data has been written"
            },
            {
              type: "paragraph",
              text: "Fires on Writable Streams when all writes are complete and the stream is flushed. Different from 'end' — 'end' is for Readable (done reading), 'finish' is for Writable (done writing)."
            },
            {
              type: "code",
              code: "writable.on('finish', () => {\n  console.log('Match recording saved ✅')\n})"
            },
            {
              type: "heading",
              text: "'error' — Something went wrong"
            },
            {
              type: "paragraph",
              text: "Fires on any stream when an error occurs — file not found, network dropped, disk full. If you don't listen for 'error', Node.js throws an uncaught exception and crashes the entire server. Always handle errors on every stream."
            },
            {
              type: "code",
              code: "stream.on('error', err => {\n  console.error('Stream failed:', err.message)\n  res.status(500).end()  // send error to user\n})"
            },
            {
              type: "error-callout",
              title: "What happens if you skip the 'error' event:",
              list: [
                "File not found mid-stream → unhandled error thrown",
                "Node.js crashes the entire process",
                "All 10 million Hotstar users lose their stream simultaneously",
                "Server needs manual restart"
              ],
              footer: "Always attach an error listener to every stream. No exceptions."
            },
            {
              type: "success-callout",
              text: "✅ data → chunk arrived, process it. end → reading done, close up. finish → writing done, confirm. error → something broke, handle it. Four events. Every stream uses them. Miss one — especially error — and the stream becomes a ticking time bomb."
            },
            {
              type: "warning-callout",
              text: "⚠️ Events tell you what happened. But how do you actually control the stream — manually read a chunk, push data in, or connect streams together? That's what read(), write(), push(), and pipe() do."
            }
          ],

          "read(), write(), push(), pipe()": [
            {
              type: "paragraph",
              text: "Events tell you when things happen on a stream. But you also need to actively control streams — manually pull a chunk, push data into a stream, write a chunk out, or connect two streams together. These four methods are the hands-on controls of every stream in Node.js."
            },
            {
              type: "curious-callout",
              text: "❓ How do you manually control what flows through a stream — read a specific chunk, write data in, push data out, or connect two streams together?"
            },
            {
              type: "heading",
              text: "read() — Manually pull a chunk from a Readable"
            },
            {
              type: "paragraph",
              text: "read() is used in paused mode — you explicitly ask for the next chunk instead of waiting for 'data' events to fire automatically. Gives you precise control over how fast you consume the stream."
            },
            {
              type: "code",
              code: "stream.on('readable', () => {\n  const chunk = stream.read()  // manually pull one chunk\n  if (chunk) res.write(chunk)\n})"
            },
            {
              type: "heading",
              text: "write() — Push a chunk into a Writable"
            },
            {
              type: "paragraph",
              text: "write() sends a chunk of data into a Writable Stream. Hotstar uses this to write each video chunk into the HTTP response as it arrives from the file stream."
            },
            {
              type: "code",
              code: "res.write(chunk)      // send chunk to user's browser\nfile.write(chunk)     // write chunk to disk"
            },
            {
              type: "heading",
              text: "push() — Feed data into a custom Readable"
            },
            {
              type: "paragraph",
              text: "push() is used when building custom Readable Streams. You push chunks in from your own data source — a database, an API, generated data. push(null) signals the stream is done."
            },
            {
              type: "code",
              code: "const { Readable } = require('stream')\nconst liveScores = new Readable({ read() {} })\n\nliveScores.push('CSK: 45/2')   // push live score chunk\nliveScores.push('MI: 67/3')\nliveScores.push(null)           // stream ended"
            },
            {
              type: "heading",
              text: "pipe() — Connect Readable directly to Writable"
            },
            {
              type: "paragraph",
              text: "pipe() is the most important method. It connects a Readable Stream to a Writable Stream — automatically taking each chunk from the Readable and writing it into the Writable. No manual event handling needed. Hotstar uses this to connect the file read stream directly to the HTTP response."
            },
            {
              type: "code",
              code: "// Without pipe — manual and verbose:\nreadable.on('data', chunk => writable.write(chunk))\nreadable.on('end', () => writable.end())\n\n// With pipe — one line:\nreadable.pipe(writable)  // ✅ same result, automatic"
            },
            {
              type: "success-callout",
              text: "✅ read() pulls chunks manually. write() sends chunks into a Writable. push() feeds custom Readable Streams. pipe() connects them all automatically. pipe() alone handles 90% of real streaming use cases — including Hotstar's entire video delivery pipeline."
            },
            {
              type: "warning-callout",
              text: "⚠️ These methods work differently depending on the stream's current state. A stream isn't always ready to be read from or written to — it moves through different states during its lifetime. Understanding the Stream lifecycle tells you exactly when each method is safe to call."
            }
          ],

          "Stream lifecycle": [
            {
              type: "paragraph",
              text: "A Hotstar stream doesn't just exist and run forever. It's created, it starts flowing, it might pause, it resumes, it ends, it might error and close. Every stream goes through a lifecycle — specific states from birth to completion. Understanding this prevents writing to a closed stream, reading from an unready stream, or missing data because you attached a listener too late."
            },
            {
              type: "curious-callout",
              text: "❓ What states does a stream pass through — and what can go wrong if you interact with it at the wrong state?"
            },
            {
              type: "heading",
              text: "Readable Stream Lifecycle"
            },
            {
              type: "step",
              title: "Created — stream exists but hasn't started",
              desc: "fs.createReadStream() called. File handle opened. No data flowing yet. Listeners not attached yet."
            },
            {
              type: "step",
              title: "Flowing — data events firing",
              desc: "Once a 'data' listener is attached or .resume() is called, stream enters flowing mode. Chunks fire automatically as fast as the source produces them."
            },
            {
              type: "step",
              title: "Paused — data stopped temporarily",
              desc: "stream.pause() called or the consumer is too slow. Data production stops. Chunks wait in internal buffer. Will resume when .resume() is called or pipe() manages it automatically."
            },
            {
              type: "step",
              title: "Ended — all data consumed",
              desc: "push(null) was called internally. 'end' event fires. No more data will ever come from this stream. Stream is done."
            },
            {
              type: "step",
              title: "Closed/Destroyed — stream cleaned up",
              desc: "'close' event fires. File handles released. Memory freed. Stream cannot be used again."
            },
            {
              type: "heading",
              text: "Writable Stream Lifecycle"
            },
            {
              type: "step",
              title: "Created — ready to receive data",
              desc: "fs.createWriteStream() or res object ready. write() can be called."
            },
            {
              type: "step",
              title: "Writing — chunks being processed",
              desc: "write() calls accepted. Internally buffered and flushed to destination — disk, network, etc."
            },
            {
              type: "step",
              title: "Ending — writable.end() called",
              desc: "No more write() calls allowed. Remaining buffered data is flushed out."
            },
            {
              type: "step",
              title: "Finished — all data written",
              desc: "'finish' event fires. All chunks are on disk or sent over network. Stream done."
            },
            {
              type: "code",
              code: "// Lifecycle visible in code:\nconst stream = fs.createReadStream('match.mp4')\n// State: Created\n\nstream.on('data', chunk => { /* State: Flowing */ })\nstream.on('end', () => { /* State: Ended */ })\nstream.on('close', () => { /* State: Closed */ })"
            },
            {
              type: "success-callout",
              text: "✅ Created → Flowing → Paused → Resumed → Ended → Closed. Every stream follows this path. Knowing where a stream is in its lifecycle tells you exactly what you can do with it — and prevents silent data loss or crashes from calling methods at the wrong time."
            },
            {
              type: "warning-callout",
              text: "⚠️ The lifecycle moves between Flowing and Paused states — and this isn't just internal behavior. It directly controls how fast data moves through your pipeline. If Hotstar's stream flows too fast for a slow user's connection, the server could run out of memory. Flowing vs Paused mode is how streams handle this exact problem."
            }
          ],

          "Flowing vs Paused mode": [
            {
              type: "paragraph",
              text: "A Hotstar user on a fast fiber connection can receive 100MB/s. A user on 2G can receive maybe 0.5MB/s. The match file reads at the same speed for both. If Hotstar keeps reading and pushing chunks at full speed for the 2G user — the chunks pile up in memory faster than they can be sent. Eventually the server runs out of RAM. Flowing vs Paused mode is how streams prevent this."
            },
            {
              type: "curious-callout",
              text: "❓ What happens when a Readable Stream produces data faster than the Writable Stream can consume it? Who pumps the brakes?"
            },
            {
              type: "heading",
              text: "Flowing Mode"
            },
            {
              type: "paragraph",
              text: "In Flowing mode, the stream reads data as fast as possible and fires 'data' events continuously. No waiting. No pausing. Data rushes through. This happens automatically as soon as you attach a 'data' listener or call .resume(). Great for fast consumers. Dangerous for slow ones."
            },
            {
              type: "code",
              code: "// Flowing mode — triggered by attaching 'data' listener:\nstream.on('data', chunk => {\n  res.write(chunk)  // if res is slow, chunks pile up in memory\n})\n// Stream flows at full speed — no backpressure control"
            },
            {
              type: "heading",
              text: "Paused Mode"
            },
            {
              type: "paragraph",
              text: "In Paused mode, the stream does nothing until you explicitly call read(). Data waits. No 'data' events fire automatically. You control the pace — read a chunk, process it, read the next. This is the default state before any listener is attached."
            },
            {
              type: "code",
              code: "// Paused mode — manual control:\nstream.on('readable', () => {\n  const chunk = stream.read()  // pull only when ready\n  if (chunk) slowWriter.write(chunk)\n})"
            },
            {
              type: "heading",
              text: "Backpressure — The Real Problem pipe() Solves"
            },
            {
              type: "paragraph",
              text: "When a Readable produces faster than a Writable consumes — chunks pile up in memory. This is called backpressure. pipe() handles this automatically — when the Writable's buffer is full, pipe() pauses the Readable. When the buffer drains, pipe() resumes it. No manual work needed. This is why pipe() is the standard for production streaming."
            },
            {
              type: "code",
              code: "// pipe() manages flowing/paused automatically:\nfs.createReadStream('match.mp4').pipe(res)\n// If res (2G user) is slow → stream auto-pauses ✅\n// When res drains → stream auto-resumes ✅\n// RAM stays controlled regardless of user speed ✅"
            },
            {
              type: "success-callout",
              text: "✅ Flowing = data rushes out automatically. Paused = you control the pace manually. pipe() switches between them intelligently — pausing when the consumer is slow, resuming when it catches up. This backpressure management is why Hotstar can serve 2G users and fiber users from the same stream without running out of memory."
            },
            {
              type: "warning-callout",
              text: "⚠️ pipe() manages backpressure automatically — and it's also how you connect multiple streams together into a pipeline. Read a file, compress it, encrypt it, send it — all in one chain. That's Piping and Chaining, coming up next."
            }
          ]
        }
      },
      {
        id: 4,
        title: "Piping & Chaining",
        level: "freshers",
        topics: [
          "pipe() method",
          "pipeline() utility",
          "Chaining multiple streams",
          "Error handling in pipes"
        ]
      },
      {
        id: 5,
        title: "Buffering & Backpressure",
        level: "intermediate",
        topics: [
          "What is Backpressure?",
          "highWaterMark option",
          "Handling slow consumers",
          "drain event",
          "cork() and uncork()"
        ]
      },
      {
        id: 6,
        title: "Custom Streams",
        level: "intermediate",
        topics: [
          "Implementing custom Readable",
          "Implementing custom Writable",
          "Implementing custom Transform",
          "stream.Readable.from()",
          "async generators as streams"
        ]
      },
      {
        id: 7,
        title: "Streams with File System",
        level: "intermediate",
        topics: [
          "fs.createReadStream()",
          "fs.createWriteStream()",
          "Streaming large file reads/writes",
          "File compression with zlib streams",
          "Efficient file copying with pipe"
        ]
      },
      {
        id: 8,
        title: "Streams with HTTP",
        level: "intermediate",
        topics: [
          "Request & Response as streams",
          "Streaming file uploads",
          "Streaming file downloads",
          "Chunked Transfer Encoding",
          "Server-Sent Events (SSE)"
        ]
      },
      {
        id: 9,
        title: "Advanced Stream Patterns",
        level: "experienced",
        topics: [
          "Object Mode streams",
          "Interleaving & merging streams",
          "Splitting streams (broadcast)",
          "Stream composition patterns",
          "Writable stream with batching",
          "Throttling stream throughput"
        ]
      },
      {
        id: 10,
        title: "Streams in Production",
        level: "experienced",
        topics: [
          "Streaming with gzip/brotli compression",
          "Streaming CSV/JSON parsing (csv-parse, JSONStream)",
          "Streaming with databases (Sequelize, MongoDB cursor)",
          "Streams in child_process (stdin/stdout/stderr)",
          "WebSockets as Duplex streams",
          "Streams in AWS S3 uploads/downloads"
        ]
      }
    ]
  },
  {
    id: "rate-limiting-razorpay",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
    title: "Understand Rate Limiting through Razorpay",
    description: "Learn how Razorpay protects its payment APIs — from fixed & sliding window algorithms, token bucket rate limiting, Redis-based distributed counters, to DDoS protection and customer-tier throttling in production.",
    tags: ["Rate Limiting", "Redis", "DDoS"],
    nodes: [

      // FRESHERS - Node.js Implementation
      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is Rate Limiting?",
          "Why Rate Limiting is needed?",
          "Without Rate Limiting — What goes wrong?",
          "Where is Rate Limiting applied?",
          "Client-side vs Server-side Rate Limiting"
        ]
      },

      {
        id: 2,
        title: "Core Concepts & Algorithms",
        level: "freshers",
        topics: [
          "Fixed Window Algorithm",
          "Sliding Window Algorithm",
          "Token Bucket Algorithm",
          "Leaky Bucket Algorithm",
        ]
      },

      {
        id: 3,
        title: "Rate Limiting in Node.js",
        level: "freshers",
        topics: [
          "express-rate-limit setup",
          "Limiting by IP Address",
          "Limiting by User ID",
          "Custom Rate Limit Rules",
          "Returning 429 Too Many Requests",
          "Rate Limit Headers (X-RateLimit-*)"
        ]
      },

      {
        id: 4,
        title: "Rate Limiting with Redis",
        level: "freshers",
        topics: [
          "Why Redis for Rate Limiting?",
          "Storing counters in Redis",
          "TTL based expiry in Redis",
          "rate-limiter-flexible library",
          "Distributed Rate Limiting basics"
        ]
      },

      // INTERMEDIATE - System Design
      {
        id: 5,
        title: "Designing Rate Limiters",
        level: "intermediate",
        topics: [
          "Rate Limiting at API Gateway level",
          "Per User vs Per IP vs Per Endpoint",
          "Global vs Local Rate Limiting",
          "Soft Limit vs Hard Limit",
          "Burst Allowance & Throttling"
        ]
      },

      {
        id: 6,
        title: "Rate Limiting in Distributed Systems",
        level: "intermediate",
        topics: [
          "Why single server rate limiting fails at scale",
          "Centralized vs Decentralized Rate Limiting",
          "Redis Cluster for Rate Limiting",
          "Race Conditions in distributed counters",
          "Lua scripts in Redis for atomicity"
        ]
      },


      // ADVANCED - Production Architecture
      {
        id: 7,
        title: "Rate Limiting at Scale",
        level: "experienced",
        topics: [
          "Rate Limiting at Load Balancer (NGINX, HAProxy)",
          "Rate Limiting at CDN level (Cloudflare)",
          "AWS API Gateway throttling",
          "Kong API Gateway rate limiting plugin",
          "Rate Limiting with Service Mesh (Istio)"
        ]
      },

      {
        id: 8,
        title: "Security & DDoS Protection",
        level: "experienced",
        topics: [
          "Rate Limiting vs DDoS Protection",
          "Bot Detection & Rate Limiting",
          "IP Reputation based limiting",
          "Adaptive Rate Limiting",
          "Rate Limiting + WAF (Web Application Firewall)"
        ]
      },

      {
        id: 9,
        title: "Production Best Practices",
        level: "experienced",
        topics: [
          "Monitoring Rate Limit breaches (Prometheus, Grafana)",
          "Alerting on suspicious traffic spikes",
          "Rate Limit Bypass prevention",
          "Multi-region Rate Limiting",
          "Customer-tier based Rate Limiting (Free vs Pro vs Enterprise)"
        ]
      }

    ]
  },
  {
    id: "nodejs-internals-uber",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    title: "Understand How Node.js Works through Uber",
    description: "Discover why Uber chose Node.js — deep dive into the event loop, call stack, microtask queue, async/await internals, libuv thread pool, non-blocking I/O, and how Node.js handles thousands of concurrent ride requests.",
    tags: ["Event Loop", "libuv", "V8 Engine"],
    nodes: [

      // FRESHERS - Core Internals
      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is Node.js?",
          "Why Uber chose Node.js?",
          "How Node.js is different from Browser JS",
          "Single Threaded vs Multi Threaded",
          "What makes Node.js fast?"
        ]
      },

      {
        id: 2,
        title: "Event Loop",
        level: "freshers",
        topics: [
          "What is the Event Loop?",
          "Call Stack",
          "Web APIs / Node APIs",
          "Callback Queue (Task Queue)",
          "Microtask Queue (Promises)",
        ]
      },

      {
        id: 3,
        title: "Async Programming",
        level: "freshers",
        topics: [
          "Synchronous vs Asynchronous",
          "Callbacks",
          "Promises",
          "Async / Await",
          "Callback Hell & how to avoid it",
        ]
      },

      {
        id: 4,
        title: "Non-Blocking I/O & libuv",
        level: "freshers",
        topics: [
          "What is Blocking vs Non-Blocking I/O?",
          "What is libuv?",
          "Thread Pool in libuv",
          "How Node.js handles file & network operations",
        ]
      },

      // INTERMEDIATE - System Design
      {
        id: 5,
        title: "Worker Threads & Child Processes",
        level: "intermediate",
        topics: [
          "Why Node.js needs Worker Threads",
          "worker_threads module",
          "Child Processes (spawn, fork, exec)",
          "CPU Intensive tasks in Node.js",
        ]
      },

      {
        id: 6,
        title: "Cluster Module",
        level: "intermediate",
        topics: [
          "What is Clustering?",
          "cluster module in Node.js",
          "Master & Worker processes",
          "Load balancing across CPU cores"
        ]
      },

      {
        id: 7,
        title: "Memory Management",
        level: "intermediate",
        topics: [
          "V8 Engine & Heap Memory",
          "Garbage Collection in Node.js",
          "Memory Leaks — causes & detection",
          "Buffer & Memory allocation"
        ]
      },

      // ADVANCED - Production Architecture


    ]
  }
];
