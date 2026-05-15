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
          "How Flipkart Knows It's Really You",
          "Hashed & Salted: Why Hackers Can't Steal Your Flipkart Password",
        ],
        topicDetails: {
          "How Flipkart Knows It's Really You": [
            {
              type: "paragraph",
              text: "You open Flipkart. Browse shoes. Check prices. Nobody stops you. But the moment you try to place an order — boom. Login wall. Why does Flipkart suddenly care who you are?"
            },
            {
              type: "curious-callout",
              text: "❓ Flipkart lets 400M strangers browse freely. So why does it suddenly stop you at checkout?"
            },
            {
              type: "heading",
              text: "The Real Problem Flipkart is Solving"
            },
            {
              type: "paragraph",
              text: "Without knowing who you are, Flipkart can't protect anything."
            },
            {
              type: "error-callout",
              title: "No login system means:",
              list: [
                "Anyone can place orders using your saved address",
                "Anyone can see your bank details and past orders",
                "Flipkart can't stop fraud — it doesn't know who did what",
                "Returns, refunds, complaints become impossible to track"
              ],
              footer: "Authentication is not a feature. It's the foundation everything else is built on."
            },
            {
              type: "heading",
              text: "So What Exactly is Authentication?"
            },
            {
              type: "paragraph",
              text: "Authentication is proving you are who you claim to be."
            },
            {
              type: "info-callout",
              text: "💡 Think of a nightclub bouncer. Anyone can stand outside. But to get in — you show your ID. He doesn't care what you'll do inside. He just confirms you're real. That single check is Authentication."
            },
            {
              type: "heading",
              text: "What Actually Happens When You Hit Login on Flipkart"
            },
            {
              type: "step",
              title: "Step 1 — You submit your credentials",
              desc: "You type your email and password. Hit login. That's it from your side."
            },
            {
              type: "code",
              code: "POST /login\n{\n  email: \"raj@gmail.com\",\n  password: \"raj@secure99\"\n}"
            },
            {
              type: "step",
              title: "Step 2 — Flipkart's server searches for you",
              desc: "The backend checks — does any account exist with this email?"
            },
            {
              type: "code",
              code: "const user = await User.findOne({ email: \"raj@gmail.com\" })\n// If null → user doesn't exist → reject immediately"
            },
            {
              type: "step",
              title: "Step 3 — Password is checked",
              desc: "Account found. Now it verifies your password matches what's stored."
            },
            {
              type: "step",
              title: "Step 4 — Decision",
              desc: "✅ Match → You're in. Flipkart now knows it's you.\n❌ No match → Rejected. 'Invalid credentials.'"
            },

            {
              type: "warning-callout",
              text: "⚠️ Flipkart checks your password from the database. Does that mean Flipkart stores your password exactly as you typed it? password: 'raj@secure99' — If a hacker breaks in tomorrow, every single password is exposed. Plain text. Ready to steal. So does Flipkart actually store it like this? Absolutely not. And what they do instead is far more clever."
            },
            {
              type: "image",
              src: "auth1.png"
            },
          ],

          "Hashed & Salted: Why Hackers Can't Steal Your Flipkart Password": [

            {
              type: "paragraph",
              text: "Flipkart verified you're real. But one scary problem remains — if Flipkart stores your password in plain text and gets hacked, every password is exposed instantly. So how does Flipkart actually store passwords?"
            },
            {
              type: "curious-callout",
              text: "❓ Flipkart has 400M user passwords. If they store them as plain text — one hack = 400M passwords stolen. So what do they actually store?"
            },
            {
              type: "heading",
              text: "The Plain Text Problem"
            },
            {
              type: "paragraph",
              text: "Imagine Flipkart's database looks like this:"
            },
            {
              type: "code",
              code: "// ❌ What Flipkart must NEVER do\n{\n  email: \"raj@gmail.com\",\n  password: \"raj@secure99\"  // plain text — disaster waiting to happen\n}"
            },
            {
              type: "error-callout",
              title: "If this database gets hacked:",
              list: [
                "Every user's password is visible instantly",
                "Hackers try same passwords on Gmail, Instagram, banks",
                "One Flipkart breach = accounts compromised everywhere",
                "Flipkart faces massive legal action and loses all trust"
              ],
              footer: "This is exactly why no serious company stores plain text passwords. Ever."
            },
            {
              type: "heading",
              text: "What is Hashing?"
            },
            {
              type: "paragraph",
              text: "Hashing converts your password into a completely unreadable string. And here's the key — it cannot be reversed."
            },
            {
              type: "code",
              code: "// Your password\n\"raj@secure99\"\n\n// After hashing\n\"$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy\""
            },
            {
              type: "info-callout",
              text: "💡 Think of hashing like a meat grinder. You put meat in — you get minced meat out. You cannot put minced meat back in and get the original piece. Hashing works exactly the same way with your password."
            },
            {
              type: "paragraph",
              text: "When you login, Flipkart doesn't reverse the hash. It hashes what you just typed and compares the two hashes."
            },
            {
              type: "code",
              code: "// Login check — Flipkart never sees your real password\nconst isMatch = await bcrypt.compare(\n  \"raj@secure99\",     // what you just typed\n  user.passwordHash   // what's stored in database\n)\n\n// ✅ Hashes match → Login successful\n// ❌ Hashes don't match → Access denied"
            },
            {
              type: "heading",
              text: "But Wait — Hashing Alone Has a Problem"
            },
            {
              type: "paragraph",
              text: "Two users with the same password get the same hash. That's a crack in plain hashing."
            },
            {
              type: "code",
              code: "// ❌ Dangerous pattern\nraj@gmail.com    → hash(\"password123\") → \"abc123hash\"\npriya@gmail.com  → hash(\"password123\") → \"abc123hash\"\n\n// Hacker sees same hash twice\n// Instantly knows both users have identical passwords\n// Cracks one → cracks both"
            },
            {
              type: "warning-callout",
              text: "⚠️ Hackers use Rainbow Tables — pre-computed lists of millions of common passwords and their hashes. If your hash matches their table — your password is cracked in seconds. Plain hashing doesn't stop this."
            },
            {
              type: "heading",
              text: "Salting — The Fix That Makes Every Hash Unique"
            },
            {
              type: "paragraph",
              text: "A salt is a random string added to your password before hashing. Every user gets a unique salt — so even identical passwords produce completely different hashes."
            },
            {
              type: "code",
              code: "// ✅ With salting — same password, completely different hashes\nraj@gmail.com\n  salt: \"xK9#mP2\"\n  hash(\"password123\" + \"xK9#mP2\") → \"$2b$10$uniquehash1\"\n\npriya@gmail.com  \n  salt: \"qL4@nR7\"\n  hash(\"password123\" + \"qL4@nR7\") → \"$2b$10$uniquehash2\"\n\n// Same password. Completely different hashes.\n// Rainbow tables are now useless."
            },
            {
              type: "info-callout",
              text: "💡 Salt is like adding a unique fingerprint to every password before locking it away. Even if two people have the same password — their stored hash looks completely different."
            },
            {
              type: "heading",
              text: "How Flipkart Uses bcrypt"
            },
            {
              type: "paragraph",
              text: "bcrypt does hashing + salting together automatically. This is what Flipkart actually runs:"
            },
            {
              type: "code",
              code: "const bcrypt = require('bcrypt')\n\nconst saltRounds = 10  // how complex the hash is\nconst passwordHash = await bcrypt.hash(\"raj@secure99\", saltRounds)\n\n// What gets saved in database\n{\n  email: \"raj@gmail.com\",\n  password: \"$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy\"\n  // ✅ Flipkart itself cannot reverse this\n}"
            },
            {
              type: "heading",
              text: "The Full Picture"
            },
            {
              type: "step",
              title: "Step 1 — You create your Flipkart account",
              desc: "You type your password. Flipkart never stores it as-is."
            },
            {
              type: "step",
              title: "Step 2 — bcrypt hashes + salts it",
              desc: "Random salt generated. Password + salt hashed 1024 times. Unreadable string stored in database."
            },
            {
              type: "step",
              title: "Step 3 — You login next time",
              desc: "You type your password again. bcrypt hashes it with the same salt. Compares to stored hash."
            },
            {
              type: "step",
              title: "Step 4 — Match or reject",
              desc: "✅ Hashes match → You're in.\n❌ No match → Rejected. Even Flipkart can't tell you your own password."
            },
            {
              type: "warning-callout",
              text: "⚠️ Password is safe in the database. But now Flipkart has a completely new problem — you're verified once at login. But how does it remember you're logged in as you browse from page to page? It can't ask for your password on every click. That's where Sessions come in."
            },
            {
              type: "image",
              src: "auth2.png"
            },
          ]
        }
      },

      {
        id: 2,
        title: "Session Based Authentication",
        level: "freshers",
        topics: [
          "How Flipkart Remembers You",
        ],
        topicDetails: {
          "How Flipkart Remembers You": [
            {
              type: "paragraph",
              text: "You logged in. Flipkart verified your password. But now you click 'My Orders' — how does Flipkart know the request is still you? You didn't send your password again."
            },
            {
              type: "curious-callout",
              text: "❓ HTTP is stateless — every request is a stranger. So how does Flipkart remember you across 50 clicks without asking your password every time?"
            },
            {
              type: "heading",
              text: "The Stateless Problem"
            },
            {
              type: "paragraph",
              text: "Every HTTP request is completely independent. The server has zero memory of what happened before."
            },
            {
              type: "error-callout",
              title: "Without sessions this is what happens:",
              list: [
                "You login → server verifies you → great",
                "You click My Orders → server has no idea who you are",
                "You click Add to Cart → stranger again",
                "Every single click needs a fresh login"
              ],
              footer: "HTTP doesn't remember you. So Flipkart has to build memory on top of it. That's exactly what sessions do."
            },
            {
              type: "info-callout",
              text: "💡 Think of a concert. You show your ticket at the gate — they verify you once. Then they put a wristband on you. Now you can walk in and out freely all night. Nobody checks your ticket again — they just check the wristband. Sessions work exactly like this. Login = show ticket. Session cookie = wristband."
            },
            {
              type: "heading",
              text: "How Flipkart Sessions Actually Work"
            },
            {
              type: "step",
              title: "Step 1 — You login successfully",
              desc: "Password verified. Flipkart now needs to remember you."
            },
            {
              type: "step",
              title: "Step 2 — Server creates a Session ID",
              desc: "A unique random ID is generated just for your login. This is your wristband."
            },
            {
              type: "step",
              title: "Step 3 — Session ID is sent as a Cookie",
              desc: "Server sends this ID to your browser. Browser stores it automatically."
            },
            {
              type: "code",
              code: "// Server creates session after login\nreq.session.userId = user._id\nreq.session.email = \"raj@gmail.com\"\n\n// Browser automatically receives and stores\n// Set-Cookie: sessionId=abc123xyz; HttpOnly; Secure"
            },
            {
              type: "step",
              title: "Step 4 — Every request sends cookie automatically",
              desc: "Every time you click anything on Flipkart — browser sends that cookie automatically. You don't do anything."
            },
            {
              type: "step",
              title: "Step 5 — Server reads the cookie",
              desc: "Server gets your session ID, looks it up, finds your data. Knows it's you."
            },
            {
              type: "code",
              code: "// Every request — server checks session\napp.get('/my-orders', (req, res) => {\n  if (!req.session.userId) {\n    return res.status(401).json({ error: 'Not logged in' })\n  }\n  // ✅ Session found — we know who you are\n  const orders = await Order.find({ userId: req.session.userId })\n  res.json(orders)\n})"
            },
            {
              type: "heading",
              text: "But Where Does Flipkart Store These Sessions?"
            },
            {
              type: "paragraph",
              text: "Flipkart doesn't run on one server — it runs on hundreds. This creates a serious problem."
            },
            {
              type: "error-callout",
              title: "The multi-server problem:",
              list: [
                "You login → Server 1 creates your session → stores in its memory",
                "You click My Orders → request goes to Server 2",
                "Server 2 has no idea about your session — Server 1 stored it",
                "You're logged out even though you just logged in ❌"
              ],
              footer: "Storing sessions in server memory breaks the moment you have more than one server."
            },
            {
              type: "heading",
              text: "This is Where Redis Comes In"
            },
            {
              type: "paragraph",
              text: "Instead of each server storing sessions in its own memory — all servers store sessions in one shared place. That shared place is Redis."
            },
            {
              type: "info-callout",
              text: "💡 Redis is an extremely fast in-memory database. Think of it as a giant shared whiteboard all servers can read and write to. We will go deep into Redis in a separate roadmap — for now just understand: Redis = shared super-fast memory that all servers can access."
            },
            {
              type: "code",
              code: "// Session stored in Redis — not server memory\napp.use(session({\n  store: new RedisStore({ client: redisClient }),\n  secret: 'flipkart-secret-key',\n  resave: false,\n  saveUninitialized: false,\n  cookie: { secure: true, httpOnly: true }\n}))\n\n// Server 1 saves it → Server 2 reads it ✅"
            },
            {
              type: "step",
              title: "Full flow with Redis",
              desc: "Login → Server 1 creates session → saved in Redis → cookie sent to browser."
            },
            {
              type: "step",
              title: "Next request",
              desc: "Click My Orders → cookie sent → any server reads Redis → finds your session → knows it's you ✅"
            },
            {
              type: "heading",
              text: "Logout — Destroying the Session"
            },
            {
              type: "paragraph",
              text: "Logout is simple — delete the session from Redis. Cookie becomes useless."
            },
            {
              type: "code",
              code: "app.post('/logout', (req, res) => {\n  req.session.destroy((err) => {\n    if (err) return res.status(500).json({ error: 'Logout failed' })\n    res.clearCookie('sessionId')\n    // ✅ Session deleted from Redis\n    // Cookie in browser is now worthless\n    res.json({ message: 'Logged out successfully' })\n  })\n})"
            },
            {
              type: "warning-callout",
              text: "⚠️ Sessions + Redis work well. But Flipkart has 400M users — that's 400M sessions sitting in Redis at all times. Memory is expensive. Every single request needs a round trip to Redis to verify you. At massive scale this becomes a real bottleneck. What if the server stored absolutely nothing? No Redis. No session. No database lookup on every request. That's exactly what JWT solves."
            },
            {
              type: "image",
              src: "auth3.png"
            }
          ]
        }
      },

      {
        id: 3,
        title: "Token Based Authentication",
        level: "freshers",
        topics: [
          "JWT: The Token Flipkart Never Has to Store",
          "Access Token vs Refresh Token: How Flipkart Keeps You Logged In Safely",
          "Storing Tokens: Why Flipkart Never Trusts LocalStorage",
        ],
        topicDetails: {
          "JWT: The Token Flipkart Never Has to Store": [
            {
              type: "paragraph",
              text: "Sessions work but Flipkart has to store 400M sessions in Redis. Expensive. Slow at scale. What if the server stored nothing at all?"
            },
            {
              type: "curious-callout",
              text: "❓ What if instead of remembering you on the server — you carried a token that proved itself? No lookup needed. No Redis. Nothing."
            },
            {
              type: "heading",
              text: "What is JWT?"
            },
            {
              type: "paragraph",
              text: "JWT stands for JSON Web Token. It's a small encoded string that carries your identity inside it. Server creates it once after login — and never stores it anywhere."
            },
            {
              type: "info-callout",
              text: "💡 Think of JWT like a government ID. The police don't call a central database every time they check your ID. The ID itself proves who you are. JWT works exactly the same — the token carries its own proof."
            },
            {
              type: "heading",
              text: "What's Inside a JWT?"
            },
            {
              type: "paragraph",
              text: "Every JWT has 3 parts separated by dots. Header tells which algorithm was used. Payload carries your actual data like userId and email. Signature is the tamper-proof seal — if anyone changes even one character the signature breaks instantly."
            },
            {
              type: "code",
              code: "// Decoded Payload — what Flipkart stores inside the token\n{\n  userId: \"raj_123\",\n  email: \"raj@gmail.com\",\n  role: \"customer\",\n  exp: 1716239022  // when this token expires\n}"
            },
            {
              type: "heading",
              text: "How Flipkart Uses JWT — Step by Step"
            },
            {
              type: "step",
              title: "Step 1 — You login successfully",
              desc: "Password is verified. Instead of creating a session — Flipkart's server creates a JWT, signs it with a secret key only Flipkart knows, and sends it to your browser. Nothing stored on the server."
            },
            {
              type: "step",
              title: "Step 2 — Your browser stores the token",
              desc: "Browser saves this JWT. Every request you make after this — browser sends the token along in the request header."
            },
            {
              type: "step",
              title: "Step 3 — Server verifies without any lookup",
              desc: "When your request arrives — server checks the signature using its secret key. If valid it instantly knows who you are. No Redis. No database call. No memory used."
            },
            {
              type: "step",
              title: "Step 4 — Tampered token? Rejected instantly",
              desc: "If anyone tries to modify the token — change the userId, fake a role — the signature breaks. Server rejects it immediately without any database check."
            },
            {
              type: "code",
              code: "// Server verifies token on every request\nconst decoded = jwt.verify(token, process.env.JWT_SECRET)\n\n// ✅ Valid → { userId: 'raj_123', email: 'raj@gmail.com' }\n// ❌ Tampered → Error thrown. Access denied."
            },
            {
              type: "warning-callout",
              text: "⚠️ JWT has one real problem. Once Flipkart creates a token — it cannot cancel it until it expires. If your token gets stolen, the attacker has full access until expiry. This is why tokens are kept short-lived — 15 minutes. But then how does Flipkart keep you logged in for days without asking your password every 15 minutes? That's where Access Token and Refresh Token come in."
            },
            {
              type: "image",
              src: "auth4.png"
            }
          ],

          "Access Token vs Refresh Token: How Flipkart Keeps You Logged In Safely": [
            {
              type: "paragraph",
              text: "JWT can't be cancelled once created. So Flipkart can't make tokens last too long — if stolen, attacker has full access. But they also can't ask you to login every 15 minutes. How do they solve this?"
            },
            {
              type: "curious-callout",
              text: "❓ Flipkart keeps you logged in for days — but tokens expire in 15 minutes. How does that even work?"
            },
            {
              type: "heading",
              text: "Two Tokens. Two Jobs."
            },
            {
              type: "paragraph",
              text: "Flipkart solves this by using two tokens at the same time. Each has a completely different job and a completely different lifetime."
            },
            {
              type: "info-callout",
              text: "💡 Think of it like a hotel. Access Token = your room key card. Works for today only. Refresh Token = your booking confirmation. Even if key card expires — you go to reception, show your booking, get a new key card. You never have to check in again from scratch."
            },
            {
              type: "heading",
              text: "Access Token"
            },
            {
              type: "paragraph",
              text: "Access Token is the token you send with every request. Short-lived — usually 15 minutes. This is what Flipkart's server checks when you hit any API like My Orders or Add to Cart."
            },
            {
              type: "paragraph",
              text: "Because it expires in 15 minutes — even if a hacker steals it, the damage window is tiny. 15 minutes and it's completely useless."
            },
            {
              type: "heading",
              text: "Refresh Token"
            },
            {
              type: "paragraph",
              text: "Refresh Token is a separate long-lived token — usually 7 to 30 days. It has only one job: get a new Access Token when the old one expires. It never goes with every request. It sits safely stored and only comes out when needed."
            },
            {
              type: "paragraph",
              text: "When your Access Token expires — browser silently sends the Refresh Token to Flipkart's server. Server verifies it and issues a brand new Access Token. You never see any of this. You stay logged in seamlessly."
            },
            {
              type: "heading",
              text: "The Full Flow"
            },
            {
              type: "step",
              title: "Step 1 — You login",
              desc: "Flipkart creates both tokens at once. Access Token expires in 15 minutes. Refresh Token expires in 30 days. Both sent to your browser."
            },
            {
              type: "step",
              title: "Step 2 — You use the app normally",
              desc: "Every request sends only the Access Token. Refresh Token stays hidden and safe."
            },
            {
              type: "step",
              title: "Step 3 — Access Token expires after 15 minutes",
              desc: "Next request fails with 401 Unauthorized. Browser catches this automatically."
            },
            {
              type: "step",
              title: "Step 4 — Silent refresh happens",
              desc: "Browser sends Refresh Token to Flipkart's /refresh endpoint. Server verifies it, creates a brand new Access Token. All of this in milliseconds — you see nothing."
            },
            {
              type: "step",
              title: "Step 5 — You continue seamlessly",
              desc: "New Access Token is used for next 15 minutes. This cycle repeats until Refresh Token itself expires after 30 days. Only then does Flipkart ask you to login again."
            },
            {
              type: "heading",
              text: "Access Token vs Refresh Token"
            },
            {
              type: "table",
              headers: ["", "Access Token", "Refresh Token"],
              rows: [
                ["Job", "Access APIs and resources", "Get new Access Token"],
                ["Lifetime", "15 minutes", "7 to 30 days"],
                ["Sent with", "Every request", "Only when Access Token expires"],
                ["If stolen", "Usable for 15 minutes only", "Can issue new tokens — high risk"],
                ["Stored in", "Memory or cookie", "HttpOnly secure cookie"],
                ["Flipkart checks", "On every API call", "Only at /refresh endpoint"]
              ]
            },
            {
              type: "warning-callout",
              text: "⚠️ Refresh Token is the more dangerous one. If stolen — attacker can keep generating new Access Tokens indefinitely. Both tokens need to be stored somewhere in the browser. But where exactly? Cookie? LocalStorage? The wrong choice exposes 400M Flipkart users to attacks."
            },
            {
              type: "image",
              src: "auth5.png"
            }
          ],

          "Storing Tokens: Why Flipkart Never Trusts LocalStorage": [
            {
              type: "paragraph",
              text: "You have two tokens. Both need to live somewhere in the browser between requests. Sounds simple — just store them somewhere. But the wrong choice exposes 400M Flipkart users to attacks."
            },
            {
              type: "curious-callout",
              text: "❓ Cookie vs LocalStorage — both store data in browser. So why does it matter where Flipkart stores its tokens?"
            },
            {
              type: "heading",
              text: "Option 1 — LocalStorage"
            },
            {
              type: "paragraph",
              text: "LocalStorage is the easiest option. Simple to use, survives page refresh, any JavaScript on the page can read it. That last part is exactly the problem."
            },
            {
              type: "error-callout",
              title: "The XSS Attack — how hackers steal from LocalStorage:",
              list: [
                "Hacker injects malicious JavaScript into Flipkart's page",
                "That script runs: localStorage.getItem('accessToken')",
                "Token stolen. Sent to hacker's server instantly.",
                "Hacker now has full access to your Flipkart account"
              ],
              footer: "Any JavaScript on the page can read LocalStorage — including the hacker's script. This is called an XSS attack and it's extremely common."
            },
            {
              type: "heading",
              text: "Option 2 — HttpOnly Cookie"
            },
            {
              type: "paragraph",
              text: "HttpOnly Cookie is a special type of cookie that JavaScript cannot read at all. Only the browser can access it — and it gets sent automatically with every request to the server."
            },
            {
              type: "info-callout",
              text: "💡 HttpOnly means exactly what it says — this cookie works over HTTP only. No JavaScript can touch it. Even if a hacker injects a script on Flipkart's page — document.cookie returns nothing. The token is invisible to all JavaScript."
            },
            {
              type: "heading",
              text: "How Flipkart Sets HttpOnly Cookies"
            },
            {
              type: "code",
              code: "// Server sets token as HttpOnly cookie after login\nres.cookie('refreshToken', token, {\n  httpOnly: true,   // JavaScript cannot read this\n  secure: true,     // Only sent over HTTPS\n  sameSite: 'Strict' // Not sent on cross-site requests\n})"
            },
            {
              type: "heading",
              text: "So What Goes Where?"
            },
            {
              type: "table",
              headers: ["", "LocalStorage", "HttpOnly Cookie"],
              rows: [
                ["JavaScript can read?", "✅ Yes — dangerous", "❌ No — safe"],
                ["XSS attack risk", "🔴 High", "🟢 None"],
                ["Sent automatically?", "❌ No — manual", "✅ Yes — automatic"],
                ["CSRF attack risk", "🟢 None", "🔴 Needs protection"],
                ["Best for", "Non sensitive data", "Tokens — Access + Refresh"],
                ["Flipkart uses it for", "UI preferences", "Auth tokens"]
              ]
            },
            {
              type: "warning-callout",
              text: "⚠️ Token is stored safely. You're logged in. But being logged in doesn't mean you can do everything on Flipkart. A customer shouldn't access the seller dashboard. A delivery partner shouldn't cancel orders. Flipkart needs to decide what each user is allowed to do — and that's a completely different problem from authentication."
            },
            {
              type: "image",
              src: "auth6.png"
            }
          ]
        }
      },

      // {
      //   id: 4,
      //   title: "Authorization",
      //   level: "freshers",
      //   topics: [
      //     "Authorization: What You're Allowed to Do on Flipkart",
      //     "Role Based Access Control (RBAC)",
      //     "Protecting Routes (Public vs Private)",
      //     "Authorization Header & Middleware"
      //   ],
      //   topicDetails: {
      //     "Authorization: What You're Allowed to Do on Flipkart": [
      //       {
      //         type: "paragraph",
      //         text: "You're logged in. Flipkart knows exactly who you are. But now a different question — just because Flipkart knows it's you, does that mean you can do everything on the platform?"
      //       },
      //       {
      //         type: "curious-callout",
      //         text: "❓ A Flipkart delivery boy and a Flipkart admin both have accounts. Both are logged in. Should they see the same things and do the same things?"
      //       },
      //       {
      //         type: "heading",
      //         text: "Authentication vs Authorization"
      //       },
      //       {
      //         type: "paragraph",
      //         text: "Authentication answers — who are you? Authorization answers — what are you allowed to do? These are two completely separate checks and Flipkart runs both on every single request."
      //       },
      //       {
      //         type: "info-callout",
      //         text: "💡 Think of a Flipkart office. Security guard at gate checks your ID — that's Authentication. But once inside, only HR can access salary data, only engineers can push code, only managers can approve leaves. Those restrictions inside — that's Authorization."
      //       },
      //       {
      //         type: "heading",
      //         text: "Why Flipkart Needs Authorization"
      //       },
      //       {
      //         type: "error-callout",
      //         title: "Without Authorization on Flipkart:",
      //         list: [
      //           "Any logged in user could delete any product listing",
      //           "A customer could access the seller dashboard and change prices",
      //           "A delivery partner could cancel orders they don't handle",
      //           "Any user could access admin panels and user data"
      //         ],
      //         footer: "Authentication gets you through the door. Authorization decides which rooms you can enter."
      //       },
      //       {
      //         type: "heading",
      //         text: "How Flipkart Thinks About Users"
      //       },
      //       {
      //         type: "paragraph",
      //         text: "Flipkart has many types of users on the same platform. Each type has a role. Each role has specific permissions attached to it."
      //       },
      //       {
      //         type: "table",
      //         headers: ["Role", "What They Can Do"],
      //         rows: [
      //           ["Customer", "Browse, buy, return, review"],
      //           ["Seller", "Add products, manage inventory, view own orders"],
      //           ["Delivery Partner", "View assigned orders, update delivery status"],
      //           ["Admin", "Everything — manage users, sellers, products, refunds"]
      //         ]
      //       },
      //       {
      //         type: "paragraph",
      //         text: "Same platform. Same login system. Completely different access for each role. This is Role Based Access Control — and that's exactly what's coming next."
      //       },
      //       {
      //         type: "warning-callout",
      //         text: "⚠️ Roles exist — buyer, seller, admin, delivery agent. But how does Flipkart actually manage and enforce these roles systematically across every route and every action? Checking roles manually in every single route handler would be unmaintainable chaos. There's a systematic way to handle this."
      //       }
      //     ],

      //     "Role Based Access Control (RBAC)": [
      //       {
      //         type: "paragraph",
      //         text: "Flipkart has millions of users. Buyers, sellers, delivery agents, admins, support staff. Each needs different access. Checking roles manually in every route — if user.role === 'admin', if user.role === 'seller' — scattered across thousands of files would be a maintenance disaster. RBAC solves this."
      //       },
      //       {
      //         type: "curious-callout",
      //         text: "❓ How does Flipkart enforce different permissions for different roles across every route — without duplicating checks everywhere?"
      //       },
      //       {
      //         type: "heading",
      //         text: "What is RBAC?"
      //       },
      //       {
      //         type: "paragraph",
      //         text: "Role Based Access Control is a pattern where permissions are tied to roles — not to individual users. You don't give Ram access to the seller dashboard. You give the 'seller' role access to the seller dashboard. Ram gets access only when his role is 'seller'. Change the role, change the access."
      //       },
      //       {
      //         type: "code",
      //         code: "// Without RBAC — messy, scattered, error-prone:\napp.get('/seller/dashboard', (req, res) => {\n  if (req.user.role !== 'seller') return res.status(403).send('Denied')\n})\n\napp.get('/seller/products', (req, res) => {\n  if (req.user.role !== 'seller') return res.status(403).send('Denied')\n})\n// Repeated everywhere. One missed check = security hole. ❌"
      //       },
      //       {
      //         type: "heading",
      //         text: "RBAC Done Right — Reusable Middleware"
      //       },
      //       {
      //         type: "step",
      //         title: "Step 1 — Define a reusable role-checking middleware",
      //         desc: "One function. Takes allowed roles. Returns a middleware. Used everywhere."
      //       },
      //       {
      //         type: "code",
      //         code: "const authorizeRoles = (...allowedRoles) => {\n  return (req, res, next) => {\n    const userRole = req.user.role\n\n    if (!allowedRoles.includes(userRole)) {\n      return res.status(403).json({ error: 'Access Denied' }) // ❌\n    }\n\n    next() // ✅ role matches — continue\n  }\n}"
      //       },
      //       {
      //         type: "step",
      //         title: "Step 2 — Apply it to routes",
      //         desc: "Each route declares exactly which roles can access it. Clean and explicit."
      //       },
      //       {
      //         type: "code",
      //         code: "app.get('/seller/dashboard',\n  authenticateToken,          // Step 1: is this user logged in?\n  authorizeRoles('seller'),   // Step 2: do they have the right role?\n  sellerDashboardController\n)\n\napp.get('/orders/update-status',\n  authenticateToken,\n  authorizeRoles('delivery_agent', 'admin'), // multiple roles allowed\n  updateStatusController\n)"
      //       },
      //       {
      //         type: "step",
      //         title: "Ram (buyer) hits /seller/dashboard",
      //         desc: "authenticateToken passes — he's logged in. authorizeRoles('seller') runs — his role is 'buyer'. 403 returned. ❌"
      //       },
      //       {
      //         type: "step",
      //         title: "Priya (seller) hits /seller/dashboard",
      //         desc: "authenticateToken passes. authorizeRoles('seller') passes — her role matches. Request continues. ✅"
      //       },
      //       {
      //         type: "info-callout",
      //         text: "💡 With RBAC middleware, every route is self-documenting. Looking at any route, you instantly know who needs to be logged in and what role they need. One middleware handles all enforcement. No duplication. No missed checks."
      //       },
      //       {
      //         type: "warning-callout",
      //         text: "⚠️ Roles are enforced on the backend. But what about the frontend? Some Flipkart routes should be accessible without login — homepage, product listings. Others require login — checkout, orders. Some require specific roles — seller dashboard. How does Flipkart protect frontend routes from being accessed by the wrong users?"
      //       }
      //     ],

      //     "Protecting Routes (Public vs Private)": [
      //       {
      //         type: "paragraph",
      //         text: "Flipkart's homepage loads for anyone — no login needed. But visit /checkout without logging in — redirected to login instantly. Visit /seller/dashboard as a buyer — blocked again. Three types of access. Three types of route protection. All working silently, every time."
      //       },
      //       {
      //         type: "curious-callout",
      //         text: "❓ How does Flipkart decide which pages anyone can see, which need login, and which need a specific role — and enforce it on both frontend and backend?"
      //       },
      //       {
      //         type: "heading",
      //         text: "Three Types of Routes on Flipkart"
      //       },
      //       {
      //         type: "code",
      //         code: "Public Routes:\n  /home, /products, /search, /product/:id\n  → Anyone can access. No token needed.\n\nPrivate Routes:\n  /checkout, /my-orders, /wishlist, /profile\n  → Must be logged in. Any valid role.\n\nRole-Protected Routes:\n  /seller/dashboard, /admin/users, /delivery/status\n  → Must be logged in AND have the correct role."
      //       },
      //       {
      //         type: "heading",
      //         text: "Backend Route Protection"
      //       },
      //       {
      //         type: "code",
      //         code: "// Public — no middleware:\napp.get('/products', productController)\n\n// Private — must be authenticated:\napp.get('/my-orders',\n  authenticateToken,\n  myOrdersController\n)\n\n// Role-protected:\napp.get('/seller/dashboard',\n  authenticateToken,\n  authorizeRoles('seller'),\n  sellerDashboardController\n)"
      //       },
      //       {
      //         type: "heading",
      //         text: "Frontend Route Protection — React"
      //       },
      //       {
      //         type: "paragraph",
      //         text: "Backend protection is the real security. But on the frontend, Flipkart also prevents users from seeing pages they shouldn't — avoiding broken UI states and unnecessary API calls."
      //       },
      //       {
      //         type: "code",
      //         code: "const PrivateRoute = ({ children }) => {\n  const { isLoggedIn } = useAuth()\n  return isLoggedIn ? children : <Navigate to='/login' />\n}\n\nconst RoleRoute = ({ children, allowedRole }) => {\n  const { user } = useAuth()\n  return user?.role === allowedRole\n    ? children\n    : <Navigate to='/unauthorized' />\n}"
      //       },
      //       {
      //         type: "step",
      //         title: "Ram (buyer) visits /seller/dashboard",
      //         desc: "Frontend RoleRoute checks his role — 'buyer' ≠ 'seller' → redirected to /unauthorized. Never even loads the page."
      //       },
      //       {
      //         type: "step",
      //         title: "Ram tries to call /seller/dashboard API directly",
      //         desc: "Even bypassing the frontend — backend authorizeRoles('seller') runs → 403 Forbidden. ❌"
      //       },
      //       {
      //         type: "warning-callout",
      //         text: "⚠️ Frontend route protection is UX — not security. A user can disable JavaScript or call your APIs directly. The real enforcement must always happen on the backend. But routes are protected now — the last piece is how the backend actually receives and verifies the user's identity on every single request. That's the Authorization Header and Middleware."
      //       }
      //     ],

      //     "Authorization Header & Middleware": [
      //       {
      //         type: "paragraph",
      //         text: "Every protected route on Flipkart needs to know: who is making this request? Is their token valid? What is their role? This check happens before the route handler runs — on every single protected request. Flipkart centralizes this in one place: the Authorization Header and a middleware that reads it."
      //       },
      //       {
      //         type: "curious-callout",
      //         text: "❓ How does the backend reliably receive the JWT on every request — and verify it once before any route logic runs?"
      //       },
      //       {
      //         type: "heading",
      //         text: "The Authorization Header — How JWT Travels"
      //       },
      //       {
      //         type: "paragraph",
      //         text: "When Ram makes any authenticated request, his app attaches the JWT to the Authorization header using the Bearer scheme. This is the industry standard — not a query param, not a request body."
      //       },
      //       {
      //         type: "code",
      //         code: "// Every authenticated request from frontend:\nGET /my-orders\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9...\n\n// Axios — attaching token to every request automatically:\naxios.interceptors.request.use(config => {\n  const token = getAccessToken()\n  if (token) {\n    config.headers['Authorization'] = `Bearer ${token}`\n  }\n  return config\n})"
      //       },
      //       {
      //         type: "heading",
      //         text: "The authenticateToken Middleware"
      //       },
      //       {
      //         type: "paragraph",
      //         text: "One middleware function intercepts every protected request, extracts the JWT from the Authorization header, verifies it, and attaches the decoded user to the request object."
      //       },
      //       {
      //         type: "code",
      //         code: "const authenticateToken = (req, res, next) => {\n  const authHeader = req.headers['authorization']\n  const token = authHeader && authHeader.split(' ')[1]\n\n  if (!token) {\n    return res.status(401).json({ error: 'No token provided' })\n  }\n\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET)\n    req.user = decoded  // { userId: 1, email: '...', role: 'buyer' }\n    next()  // ✅ token valid — continue\n  } catch (err) {\n    return res.status(401).json({ error: 'Invalid or expired token' })\n  }\n}"
      //       },
      //       {
      //         type: "heading",
      //         text: "The Full Middleware Chain"
      //       },
      //       {
      //         type: "code",
      //         code: "app.get('/my-orders',\n  authenticateToken,        // 1. Is token valid? Who is this?\n  myOrdersController        // 2. Fetch and return their orders\n)\n\napp.get('/seller/dashboard',\n  authenticateToken,        // 1. Is token valid? Who is this?\n  authorizeRoles('seller'), // 2. Do they have seller role?\n  sellerDashboardController // 3. Return seller data\n)"
      //       },
      //       {
      //         type: "step",
      //         title: "Request arrives at /my-orders",
      //         desc: "authenticateToken runs — extracts JWT, verifies signature, sets req.user. ✅"
      //       },
      //       {
      //         type: "step",
      //         title: "Route handler runs",
      //         desc: "Reads req.user.userId — fetches only Ram's orders. Not everyone's."
      //       },
      //       {
      //         type: "code",
      //         code: "const myOrdersController = async (req, res) => {\n  const orders = await Order.find({ userId: req.user.userId })\n  // req.user set by authenticateToken middleware\n  // Ram only sees Ram's orders ✅\n  res.json(orders)\n}"
      //       },
      //       {
      //         type: "success-callout",
      //         text: "✅ That completes the full authentication and authorization pipeline. Login → password hashed safely → session or JWT issued → token stored securely → every request verified → roles enforced → routes protected. This is exactly how Flipkart handles 400M users securely. Level 2 goes deeper — OAuth, social login, MFA, and security hardening."
      //       }
      //     ]
      //   }
      // },





      {
        id: 4,
        title: "OAuth & Social Login",
        level: "intermediate",
        topics: [
          "What is OAuth 2.0 & How Google Login Works",
          "Authorization Code Flow Through Flipkart",
          "Google Login in Node.js (Passport.js)"
        ]
      },

      {
        id: 5,
        title: "Security Hardening",
        level: "intermediate",
        topics: [
          "HTTPS & Secure Cookies",
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
            { type: "image", src: "netflixcache.png" },
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
            { type: "image", src: "chit.png" },
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
            { type: "image", src: "hitratio.png" },
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
            { type: "image", "src": "stored.png" },
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
            { type: "image", src: "caside.png" },
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
            }
            ,
            { type: "image", src: "rthrough.png" },
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

            { type: "image", src: "writethrough.png" },
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
            }
            , { type: "image", src: "writeb.png" },
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
              text: "Every second, millions of Netflix users are watching shows. The view count for Breaking Bad is updating thousands of times per second. If Netflix wrote every view count update to cache — the cache would be flooded with rapidly changing numbers, each one becoming stale almost instantly. Caching it is pointless."
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
            { type: "image", src: "waround.png" },
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
        title: "Cache Eviction",
        level: "freshers",
        topics: [
          // "TTL (Time to Live)",
          "LRU (Least Recently Used)",
          "LFU (Least Frequently Used)",
          "FIFO (First In First Out)",
          // "Manual & Event-Driven Invalidation"
        ],
        topicDetails: {
          // "TTL (Time to Live)": [
          //   {
          //     type: "paragraph",
          //     text: "Netflix cached Stranger Things metadata — description, cast, episode list. That data sits in Redis. It will sit there forever — unless Netflix tells it when to expire. Three months later, a new episode drops. The cache still has the old episode list. Users see wrong data. Nobody knows why."
          //   },
          //   {
          //     type: "curious-callout",
          //     text: "❓ How does Netflix make sure cached data doesn't live forever and become stale?"
          //   },
          //   {
          //     type: "heading",
          //     text: "Give Every Cached Item an Expiry Time"
          //   },
          //   {
          //     type: "paragraph",
          //     text: "TTL — Time to Live — is a timer you attach to every cached item. When the timer runs out, the item is automatically deleted from cache. Next request is a Cache Miss, fresh data is fetched from database, cached again with a new TTL. Clean cycle."
          //   },
          //   {
          //     type: "code",
          //     code: "cache.set('stranger_things', data, ttl=3600)\n// This data lives for 3600 seconds (1 hour)\n// After 1 hour — automatically deleted\n// Next request → Cache Miss → fresh DB fetch"
          //   },
          //   {
          //     type: "paragraph",
          //     text: "Netflix sets different TTLs based on how often data changes."
          //   },
          //   { type: "image", src: "TTL.png" },
          //   {
          //     type: "code",
          //     code: "Show metadata (title, cast)  → TTL: 24 hours\nEpisode list                 → TTL: 1 hour\nTrending shows list          → TTL: 5 minutes\nReal-time view counts        → TTL: 60 seconds"
          //   },
          //   {
          //     type: "success-callout",
          //     text: "✅ TTL is the simplest cache invalidation strategy. Set it and forget it. Data auto-expires. No manual cleanup. Netflix uses TTL on almost every cached item as the baseline."
          //   },
          //   {
          //     type: "warning-callout",
          //     text: "⚠️ TTL handles expiry over time — but what about when Redis runs out of memory right now? Netflix has 10,000 shows cached. Cache is full. A new show needs to be added. Something has to be removed to make space. Which one? That's where eviction policies come in — LRU, LFU, FIFO."
          //   }
          // ],

          "LRU (Least Recently Used)": [
            {
              type: "paragraph",
              text: "Netflix's Redis cache is full. 10,000 shows are cached. A new show just dropped — 'Scam 2024'. It needs to be added to cache. Something has to go. How does Redis decide which show to evict? It looks at one thing — which show was accessed the least recently."
            },
            {
              type: "heading",
              text: "Remove What Nobody Has Touched Lately"
            },
            { type: "image", src: "lru.png" },
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
            }
            ,
            { type: "image", src: "lfu.png" },
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
            { type: "image", src: "FIFO.png" },
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

          // "Manual & Event-Driven Invalidation": [
          //   {
          //     type: "paragraph",
          //     text: "It's 12:00 AM. Netflix just dropped all 8 episodes of Stranger Things Season 5 simultaneously worldwide. Every user opening the show needs to see the new season immediately. But the cache has the old season data — cached with a 24 hour TTL. That TTL won't expire for another 18 hours. 18 hours of users seeing wrong episode counts. That's unacceptable."
          //   },
          //   {
          //     type: "curious-callout",
          //     text: "❓ How does Netflix wipe specific cache entries instantly — the moment something important changes — without waiting for TTL or eviction policies?"
          //   },
          //   {
          //     type: "heading",
          //     text: "Manual Invalidation — Wipe It Right Now"
          //   },
          //   {
          //     type: "paragraph",
          //     text: "Manual invalidation means explicitly deleting a cache entry the moment you know the data has changed. No waiting. The next request will be a Cache Miss — fetching fresh data from the database and caching it again."
          //   },
          //   {
          //     type: "step",
          //     title: "Netflix content team publishes Season 5",
          //     desc: "New episodes are uploaded. Database is updated with new episode list."
          //   },
          //   {
          //     type: "step",
          //     title: "Manually delete the cache entry",
          //     desc: "Engineering triggers an immediate cache delete for the Stranger Things entry."
          //   },
          //   {
          //     type: "code",
          //     code: "cache.delete('stranger_things')\n// Cache entry wiped instantly ✅"
          //   },
          //   {
          //     type: "step",
          //     title: "First user opens Stranger Things",
          //     desc: "Cache Miss. Netflix fetches fresh data from DB — now includes Season 5. Cached again."
          //   },
          //   {
          //     type: "step",
          //     title: "All users after that",
          //     desc: "Cache Hit — Season 5 data. Everyone sees the new season immediately. ✅"
          //   },
          //   {
          //     type: "heading",
          //     text: "Event-Driven Invalidation — Automate It"
          //   },
          //   {
          //     type: "paragraph",
          //     text: "Manual invalidation still requires someone to remember to delete the cache. Netflix automates this with event-driven invalidation — whenever the database is updated, it automatically fires an event that triggers cache deletion. No human needed."
          //   },
          //   {
          //     type: "code",
          //     code: "// Database update triggers an event:\ndb.update('stranger_things', newData)\n→ fires event: 'show_updated'\n\n// Cache listener catches it:\non('show_updated', (showId) => {\n  cache.delete(showId) // Auto-invalidated ✅\n})"
          //   },
          //   {
          //     type: "paragraph",
          //     text: "The moment any show data changes in the database — the event fires, the cache is cleared, fresh data is ready on the next request. No developer has to remember to do it. No stale data ever sits in cache after an update."
          //   },
          //   {
          //     type: "success-callout",
          //     text: "✅ Netflix uses event-driven invalidation for all content updates — new episodes, changed thumbnails, updated descriptions, removed titles. The cache stays perfectly in sync with the database automatically — the moment something changes."
          //   },
          //   {
          //     type: "info-callout",
          //     text: "🎯 Full picture — TTL handles natural expiry over time. LRU/LFU/FIFO handle eviction when memory is full. Manual invalidation handles urgent one-off clears. Event-driven handles automatic real-time sync. Netflix uses all four together — that's how the cache always stays fresh at scale."
          //   }
          // ]
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

  }
  // ,
  // {
  //   id: "websockets-gaming",
  //   image: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/steam-icon.png",
  //   title: "How Gaming Apps Use WebSockets",
  //   description:
  //     "Learn how BGMI delivers ultra-fast real-time multiplayer battles using WebSockets — from live player movement syncing, low-latency gunfight updates, team voice coordination, matchmaking systems, event broadcasting, and scalable game servers handling millions of concurrent players.",
  //   tags: [
  //     "WebSockets",
  //     "Real-Time Communication",
  //     "Low Latency",
  //     "Socket.IO",
  //   ],
  //   nodes: [

  //     {
  //       id: 1,
  //       title: "Basics (Foundation)",
  //       level: "freshers",
  //       topics: [
  //         "What is WebSocket?",
  //         "HTTP vs WebSocket",
  //         "Why HTTP is not enough for Real-Time",
  //         "ws:// vs wss://"
  //       ],
  //       topicDetails: {
  //         "What is WebSocket?": [
  //           {
  //             type: "paragraph",
  //             text: "You're playing BGMI. You and your squad just landed at Pochinki. Your teammate spots an enemy behind the house — and instantly, without any delay, that info appears on your screen. No refresh button. No loading spinner. It just... shows up in real-time. That's not magic — that's WebSocket working behind the scenes."
  //           },
  //           {
  //             type: "image",
  //             src: "websocket_1.png"
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ How does your teammate's movement show up on YOUR screen instantly — without you asking for it?"
  //           },
  //           {
  //             type: "heading",
  //             text: "A Direct, Always-Open Line Between You and the Server"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "WebSocket is a communication protocol — just like HTTP — but with one massive difference. When you open a WebSocket connection, it stays open. It doesn't close after one request-response like HTTP does. Think of it like a phone call. Once the call connects, both sides can talk whenever they want, as many times as they want, without hanging up and redialing every single time."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "📞 HTTP = sending a letter. You write it, post it, wait for a reply, then write another letter. WebSocket = a phone call. Once connected, both sides can talk freely, instantly, without delay."
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — How WebSocket Works in a BGMI Match"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Let's trace the entire flow of what happens from the moment you tap 'Start Match' to the moment you get a kill — and see exactly where WebSocket is doing its thing."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — You tap 'Start Match'",
  //             desc: "Your phone opens a WebSocket connection to the BGMI game server. This connection stays open for the ENTIRE match — 30 minutes straight. No disconnecting and reconnecting."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — You land at Pochinki",
  //             desc: "Your phone sends your landing coordinates to the server: { action: 'land', x: 120, y: 450 }. The server instantly pushes this to all 99 other players so they can see where you landed."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — You pick up an M416",
  //             desc: "Your phone sends: { action: 'pickup', item: 'M416' }. Server updates your inventory. Your teammates see you picked up a weapon — all in real-time."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — An enemy runs behind a building",
  //             desc: "The ENEMY's phone sent their movement to the server. The server pushes that movement data TO YOUR PHONE — without you asking. You see the enemy move on your screen instantly."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 5 — You fire and get a kill",
  //             desc: "Your phone sends: { action: 'shoot', weapon: 'M416', direction: 'north' }. Server calculates the hit. Server pushes kill notification to everyone: 'Player_42 eliminated Player_87 with M416'. All 98 remaining players see it."
  //           },
  //           {
  //             type: "code",
  //             code: "The entire flow on ONE WebSocket connection:\n\nYour Phone ←————— OPEN CONNECTION ——————→ BGMI Server\n   │                                           │\n   ├─ SEND: { land at Pochinki }               │\n   │                     Server PUSHES to 99 ──→│\n   ├─ SEND: { pickup M416 }                    │\n   │                     Server PUSHES to squad→│\n   │←── RECEIVE: { enemy at x:200, y:300 } ────┤\n   ├─ SEND: { shoot, direction: north }         │\n   │←── RECEIVE: { kill confirmed! } ──────────┤\n   │                     Server PUSHES to all ──→│\n   │                                           │\n   └─────── Connection stays OPEN ─────────────┘\n\nAll of this happens on a SINGLE connection.\nNo reopening. No re-asking. Just continuous flow."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Notice the key difference — your phone sends data whenever YOU do something (move, shoot, pickup). But the server ALSO sends data to your phone whenever ANYONE ELSE does something — without you asking. That two-way, instant communication is what makes WebSocket special. HTTP can never do this — the server can only respond when you ask."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ WebSocket gives you a persistent, two-way, real-time connection between client and server. Both sides can send data at any time without waiting. That's why BGMI feels instant — because it IS instant."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ But wait — we already have HTTP, right? Every website uses it. Why can't BGMI just use normal HTTP requests? What's so wrong with HTTP that we needed a whole new protocol? Let's compare them head-to-head."
  //           }
  //         ],

  //         "HTTP vs WebSocket": [
  //           {
  //             type: "paragraph",
  //             text: "Imagine BGMI used normal HTTP instead of WebSocket. You shoot an enemy. Your phone sends an HTTP request to the server — 'Hey, I just fired a bullet.' The server responds — 'OK, bullet registered.' Connection closed. Now you want to know if the bullet hit? Send ANOTHER request. Want to know if the enemy is still alive? ANOTHER request. Want the updated scoreboard? ANOTHER request. Every single piece of information = a brand new connection."
  //           },
  //           {
  //             type: "error-callout",
  //             title: "If BGMI used HTTP for real-time gameplay:",
  //             list: [
  //               "Every move, every bullet, every footstep = a new HTTP request",
  //               "Each request opens a new connection, sends data, gets a response, then closes",
  //               "100 players × 30 actions per second = 3,000 HTTP requests every second",
  //               "Massive overhead. Massive latency. Unplayable lag."
  //             ],
  //             footer: "HTTP was designed for loading web pages — not for real-time combat with 100 players."
  //           },
  //           {
  //             type: "heading",
  //             text: "The Same Gunfight — HTTP vs WebSocket"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Let's play out the exact same 1v1 gunfight scenario using both protocols. You'll feel the difference immediately."
  //           },
  //           {
  //             type: "step",
  //             title: "HTTP — You spot an enemy",
  //             desc: "Your phone sends HTTP request #1: 'Where are enemies?' → Server responds with positions → Connection closed. Took ~150ms. By the time you got the response, the enemy already moved."
  //           },
  //           {
  //             type: "step",
  //             title: "HTTP — You fire a bullet",
  //             desc: "Your phone sends HTTP request #2: 'I fired at position X' → Server responds: 'Shot registered' → Connection closed. Another ~150ms. You don't even know if it hit yet."
  //           },
  //           {
  //             type: "step",
  //             title: "HTTP — Did the bullet hit?",
  //             desc: "Your phone sends HTTP request #3: 'Did my shot hit?' → Server responds: 'Yes, 27 damage' → Connection closed. Another ~150ms. Total time for ONE gunfight action: ~450ms of pure overhead."
  //           },
  //           {
  //             type: "step",
  //             title: "WebSocket — The same fight, but instant",
  //             desc: "Your phone SENDS: 'I fired' → Server PUSHES back: 'Hit! 27 damage' → Server PUSHES enemy's new position → All on the SAME open connection. Total time: ~5ms. You see the hit marker instantly."
  //           },
  //           {
  //             type: "code",
  //             code: "HTTP (Request-Response):\nYou ask  → Server replies → Connection CLOSED  (150ms)\nYou ask  → Server replies → Connection CLOSED  (150ms)\nYou ask  → Server replies → Connection CLOSED  (150ms)\n(Every single time — open, send, receive, close)\n\nWebSocket (Persistent Connection):\nYou connect → Connection stays OPEN\nYou send anytime → Server sends anytime\nBoth talk freely → No reopening needed\n(One connection — unlimited messages — ~5ms per message)"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "With HTTP, the server can NEVER send you data on its own. It can only respond when you ask. So if your enemy moves behind you in BGMI — the server knows, but it can't tell you unless you ask first. That 200ms delay of asking again and again? In a gunfight, you're already dead."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "With WebSocket, the server pushes data the moment something happens. Enemy moved? Server tells you immediately. Zone shrinking? Server tells everyone at once. No asking. No delay."
  //           },
  //           {
  //             type: "table",
  //             headers: ["Feature", "HTTP", "WebSocket"],
  //             rows: [
  //               ["Connection", "Opens & closes", "Stays open"],
  //               ["Direction", "Client asks only", "Both sides talk"],
  //               ["Latency", "High (~150ms/req)", "Ultra low (~5ms)"],
  //               ["Overhead", "Headers every time", "Tiny frames"],
  //               ["Server can push?", "❌ Never", "✅ Anytime"],
  //               ["Best for", "Web pages, APIs", "Gaming, chat, live"]
  //             ]
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ HTTP = great for loading a webpage. WebSocket = essential for real-time apps like BGMI where every millisecond counts. Different tools for different jobs."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ OK so HTTP is slow for real-time — but couldn't we hack it? What if we just keep sending HTTP requests super fast — like every 100ms? Wouldn't that feel real-time? Let's see why that approach fails badly."
  //           }
  //         ],

  //         "Why HTTP is not enough for Real-Time": [
  //           {
  //             type: "paragraph",
  //             text: "Some developers think — why not just use HTTP but send requests really fast? Like, every 100 milliseconds, ask the server 'Hey, anything new?' This approach is called HTTP Polling. And yes, people have tried it. Here's what happens when you try to run a BGMI-like game on HTTP Polling."
  //           },
  //           {
  //             type: "heading",
  //             text: "Approach 1 — HTTP Polling (Ask Again and Again)"
  //           },
  //           {
  //             type: "code",
  //             code: "Every 100ms your phone asks:\n→ 'Any updates?'  Server: 'Nope.'\n→ 'Any updates?'  Server: 'Nope.'\n→ 'Any updates?'  Server: 'Yes — enemy moved!'\n→ 'Any updates?'  Server: 'Nope.'\n→ 'Any updates?'  Server: 'Nope.'\n\n90% of requests return nothing.\nBut each one still opens a connection, sends headers, waits for response."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "You're wasting bandwidth, battery, and server resources asking the same question thousands of times when nothing has changed. Now multiply this by 100 players in one match. That's 1,000 useless requests per second hitting the server — just for one match. BGMI runs millions of matches simultaneously."
  //           },
  //           {
  //             type: "heading",
  //             text: "Approach 2 — Long Polling (Ask and Wait)"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A slightly better hack. Instead of asking every 100ms, your phone sends one request and the server holds it open — doesn't respond until there's actually something new. When it finally responds, your phone immediately sends another request. It's better than regular polling, but still not great."
  //           },
  //           {
  //             type: "error-callout",
  //             title: "Why Long Polling still fails for BGMI:",
  //             list: [
  //               "Server holds thousands of open HTTP connections — eats memory",
  //               "Still has overhead of HTTP headers on every reconnection",
  //               "One-directional — server can only respond, never initiate",
  //               "Reconnection gap — between response and next request, you miss data",
  //               "At BGMI scale (100 players, 30 updates/sec), it collapses"
  //             ],
  //             footer: "Long polling is a clever hack — but it's still duct tape on a system not designed for real-time."
  //           },
  //           {
  //             type: "heading",
  //             text: "Why WebSocket Wins"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "WebSocket doesn't poll. It doesn't ask repeatedly. It opens ONE connection and keeps it alive. Both sides — your phone and the server — can send messages at any time. No wasted requests. No empty responses. No reconnection gaps. Just a clean, direct, always-open pipe."
  //           },
  //           {
  //             type: "code",
  //             code: "HTTP Polling for 100 players:\n→ 100 × 10 requests/sec = 1,000 connections/sec\n→ Each with full HTTP headers (~800 bytes)\n→ Total overhead: ~800 KB/sec of pure waste\n\nWebSocket for 100 players:\n→ 100 persistent connections (already open)\n→ Each message: ~20 bytes (tiny frame)\n→ Total overhead: almost zero"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ WebSocket was literally invented because HTTP couldn't handle real-time. Gaming, live chat, stock tickers, collaborative editing — anything where data flows constantly in both directions — WebSocket is the answer."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ So we know WebSocket is the right choice. But when you see a WebSocket URL, it looks different — ws://something or wss://something. What's the difference? And why does it matter for security in BGMI?"
  //           }
  //         ],

  //         "ws:// vs wss://": [
  //           {
  //             type: "paragraph",
  //             text: "When you connect to a website, you see http:// or https:// in the URL. WebSocket has its own versions — ws:// and wss://. They work exactly the same way as their HTTP counterparts. ws:// is unencrypted. wss:// is encrypted with TLS/SSL — just like HTTPS."
  //           },
  //           {
  //             type: "heading",
  //             text: "ws:// — Open, Unprotected Connection"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "With ws://, your data travels as plain text. Anyone sitting between your phone and the BGMI server — like someone on the same Wi-Fi — could theoretically read or modify the data. Imagine playing BGMI on a café Wi-Fi and someone intercepts your position data and feeds it to their squad. That's a nightmare."
  //           },
  //           {
  //             type: "code",
  //             code: "ws://game.bgmi.com/match\n→ Data sent in plain text\n→ Anyone on the network can sniff it\n→ Position, health, ammo — all visible"
  //           },
  //           {
  //             type: "heading",
  //             text: "wss:// — Encrypted, Secure Connection"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "wss:// wraps the WebSocket connection inside TLS encryption — the same security layer that protects your bank transactions online. Every message between your phone and the server is encrypted. Even if someone intercepts it, they see gibberish — not your coordinates."
  //           },
  //           {
  //             type: "code",
  //             code: "wss://game.bgmi.com/match\n→ Data encrypted with TLS\n→ Interceptor sees: 'x#4k!@mZ9...' (gibberish)\n→ Your position, health, actions — all protected"
  //           },
  //           {
  //             type: "info-callout",
  //             text: "🔒 Think of ws:// as sending a postcard — anyone can read it. wss:// is a sealed, locked envelope — only the recipient can open it."
  //           },
  //           {
  //             type: "table",
  //             headers: ["Protocol", "Encrypted?", "Port", "Use Case"],
  //             rows: [
  //               ["ws://", "No", "80", "Local dev, testing"],
  //               ["wss://", "Yes (TLS)", "443", "Production apps"]
  //             ]
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ BGMI and every production game uses wss:// — always encrypted. No serious game sends player data unprotected. In fact, most browsers now block ws:// on HTTPS pages entirely."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "🎯 Quick summary — WebSocket is the protocol. ws:// is the insecure version. wss:// is the secure version. Always use wss:// in production. Now that you understand what WebSocket is and why it exists — let's dive into HOW it actually works. The handshake, persistent connections, full duplex — the core mechanics."
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       id: 2,
  //       title: "Core Concepts & Characteristics",
  //       level: "freshers",
  //       topics: [
  //         "Handshake",
  //         "Persistent Connection",
  //         "Full Duplex Communication",
  //         "Event Based Architecture",
  //         "Stateful Connection",
  //         "Low Latency",
  //         "Connection Management Mechanisms",
  //         "Reconnection Handling"
  //       ],
  //       topicDetails: {
  //         "Handshake": [
  //           {
  //             type: "paragraph",
  //             text: "You open BGMI, tap 'Start Match', and within seconds you're in the lobby with 99 other players. But before any game data starts flowing — before you see the plane, before the map loads — something happens behind the scenes. Your phone and the BGMI server do a quick handshake. It's like a secret greeting that upgrades your connection from regular HTTP to a WebSocket connection."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ Why does WebSocket start with HTTP? Can't it just connect directly?"
  //           },
  //           {
  //             type: "heading",
  //             text: "The WebSocket Handshake — How the Connection Starts"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "WebSocket doesn't just open a raw connection out of nowhere. It starts as a normal HTTP request — but with a special header that says 'Hey server, I want to upgrade this to a WebSocket connection.' If the server agrees, it responds with '101 Switching Protocols' — and from that moment on, both sides are on a WebSocket connection. No more HTTP. This upgrade approach is used because every device, browser, and firewall in the world already understands HTTP — so starting with HTTP guarantees the initial request gets through."
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — BGMI Handshake Flow"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — You tap 'Start Match' in BGMI",
  //             desc: "Your phone creates a new WebSocket object internally. But it doesn't directly open a WebSocket. Instead, it sends a regular HTTP GET request to the BGMI server — with two special headers: 'Upgrade: websocket' and a unique 'Sec-WebSocket-Key'."
  //           },
  //           {
  //             type: "code",
  //             code: "Your phone sends this HTTP request:\n\nGET /match HTTP/1.1\nHost: game.bgmi.com\nUpgrade: websocket          ← 'I want WebSocket, not HTTP'\nConnection: Upgrade         ← 'Please upgrade this connection'\nSec-WebSocket-Key: dGhlIHN  ← A unique key (base64 encoded)\nSec-WebSocket-Version: 13   ← WebSocket protocol version"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — BGMI server receives the request",
  //             desc: "The server reads the Upgrade header. It checks — do I support WebSocket? Is this key valid? Is this player allowed to connect? If everything checks out, the server agrees to upgrade."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Server responds with '101 Switching Protocols'",
  //             desc: "This is the critical moment. The server doesn't respond with a normal 200 OK. It responds with status 101 — meaning 'I'm switching from HTTP to WebSocket right now.' It also sends back a computed 'Sec-WebSocket-Accept' key that proves it received YOUR specific key."
  //           },
  //           {
  //             type: "code",
  //             code: "Server responds:\n\nHTTP/1.1 101 Switching Protocols  ← 'Agreed! Upgrading now'\nUpgrade: websocket\nConnection: Upgrade\nSec-WebSocket-Accept: s3pPLM    ← Server's proof (computed from your key)"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Connection upgraded. WebSocket is LIVE.",
  //             desc: "From this moment on, the connection is no longer HTTP. It's a full WebSocket connection. Both sides can now send messages freely, in both directions, without any HTTP overhead. Your phone starts sending your player data and the server starts pushing match data to you."
  //           },
  //           {
  //             type: "code",
  //             code: "Complete handshake flow:\n\nYour Phone                              BGMI Server\n    │                                        │\n    ├── HTTP GET /match ────────────────────→ │\n    │   (Upgrade: websocket)                 │\n    │   (Sec-WebSocket-Key: abc123)          │\n    │                                        │\n    │ ←─────────── 101 Switching Protocols ──┤\n    │              (Sec-WebSocket-Accept)     │\n    │                                        │\n    │ ══════ WebSocket Connection OPEN ══════ │\n    │                                        │\n    ├── { action: 'join', player: 42 } ────→ │\n    │ ←── { match_id: 4521, map: 'Erangel' } │\n    │                                        │\n    └── Game data flows freely both ways ────┘"
  //           },
  //           {
  //             type: "info-callout",
  //             text: "🤝 Think of the handshake like entering a VIP club. You walk up to the door (HTTP request), show your VIP pass (Upgrade header), the bouncer verifies it and stamps your hand (101 + Accept key), and now you're inside a different world — direct WebSocket communication. The door (HTTP) got you in, but once inside, you're in the VIP zone (WebSocket)."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ The handshake happens only ONCE — when you first connect to the BGMI match. After that, the connection stays open for the entire game. No more handshakes. No more HTTP. Just pure, fast WebSocket communication."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ The handshake upgrades the connection — but what keeps it alive for the next 30 minutes of gameplay? That's the Persistent Connection — and it's the core reason WebSocket feels instant."
  //           }
  //         ],

  //         "Persistent Connection": [
  //           {
  //             type: "paragraph",
  //             text: "Once the handshake is done and you're in the BGMI match, the WebSocket connection doesn't close. It stays open — for the ENTIRE duration of the match. 30 minutes of non-stop communication on a single connection. No reconnecting. No re-handshaking. Just one continuous pipe between your phone and the server."
  //           },
  //           {
  //             type: "heading",
  //             text: "One Connection, Unlimited Messages"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "In HTTP, every interaction is a separate connection — open, send, receive, close, repeat. In WebSocket, you open the connection once and it persists. Your phone sends thousands of messages (your movements, shots, pickups) and the server sends thousands back (enemy positions, zone updates, airdrops) — all through that single connection."
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — One Connection, Entire BGMI Match"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Handshake completes (0:00)",
  //             desc: "WebSocket connection is established. This single connection will now stay alive for the entire 30-minute match. Your phone and the server are permanently linked."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Lobby phase (0:00 - 1:00)",
  //             desc: "Your phone sends: 'I'm ready.' Server sends: 'Waiting for 100 players... 78/100... 99/100... Match starting!' All through the SAME connection that just opened."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Plane + Landing (1:00 - 3:00)",
  //             desc: "Server pushes plane path to all 100 players. You tap to jump — your phone sends your jump coordinates. Server pushes your landing position to others. Hundreds of messages already — still the SAME connection."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Mid-game combat (3:00 - 25:00)",
  //             desc: "You move, loot, shoot, throw grenades, heal. Each action = a message sent. Enemy positions, zone shrinks, kill feeds, airdrop alerts — all pushed by the server. By now, 30,000+ messages have flowed through this ONE connection."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 5 — Final circle + Chicken Dinner (25:00 - 30:00)",
  //             desc: "Intense combat. Messages flying every few milliseconds. You get the final kill. Server pushes: 'Winner Winner Chicken Dinner!' Match stats arrive. Connection STILL open — same one from Step 1."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 6 — Match ends. Connection closes.",
  //             desc: "Only NOW does the WebSocket connection close — after 30 minutes and 50,000+ messages. One connection handled the entire match."
  //           },
  //           {
  //             type: "code",
  //             code: "HTTP approach (if BGMI used it):\nOpen connection → Send position → Close\nOpen connection → Send shot fired → Close\nOpen connection → Send grenade thrown → Close\n(50,000 actions = 50,000 connections = server on fire 🔥)\n\nWebSocket approach (what BGMI actually uses):\nOpen connection once → stays open for 30 minutes\nSend position ✅\nSend shot fired ✅\nSend grenade thrown ✅\n... 50,000 more messages ...\n(50,000 actions = 0 new connections = smooth gameplay)"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Persistent connection = connect once, communicate forever. That's why BGMI feels smooth and instant. No connection setup overhead on every action. One pipe. Unlimited messages. 30 minutes straight."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ But a persistent connection alone isn't enough. What if only YOUR phone could send data and the server had to wait until you asked? That's one-way. BGMI needs BOTH sides talking at the same time — that's Full Duplex."
  //           }
  //         ],

  //         "Full Duplex Communication": [
  //           {
  //             type: "paragraph",
  //             text: "You're running across Erangel. At the exact same moment — you're sending your position to the server AND the server is sending you an enemy's position. Both directions, at the same time. Neither side has to wait for the other to finish. That's full duplex communication."
  //           },
  //           {
  //             type: "heading",
  //             text: "Both Sides Talk Simultaneously"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "HTTP is half-duplex — you send a request, then you wait for the server to respond. One direction at a time. Like a walkie-talkie — you press the button, talk, release, then wait. WebSocket is full-duplex — like a phone call. Both people can talk at the same time. No turn-taking."
  //           },
  //           {
  //             type: "code",
  //             code: "Half-Duplex (HTTP — like a walkie-talkie):\nYou: 'I moved to position X'  → wait...\nServer: 'OK, noted.'          → wait...\nYou: 'I fired a bullet'       → wait...\nServer: 'OK, hit registered.' → wait...\n(One talks, the other listens. Alternating.)\n\nFull-Duplex (WebSocket — like a phone call):\nYou:    'I moved to X'          ←→  Server: 'Zone is shrinking'\nYou:    'I fired a bullet'      ←→  Server: 'Enemy at position Y'\nYou:    'I picked up a scope'   ←→  Server: 'Airdrop incoming'\n(Both talking at the same time. No waiting.)"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — A Squad Fight in Full Duplex"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Imagine you're in a squad fight near Military Base. Here's what's happening on the WebSocket connection in a single second — your phone is sending AND receiving data at the EXACT same time:"
  //           },
  //           {
  //             type: "step",
  //             title: "At 00:00.000 — You move right to take cover",
  //             desc: "YOUR PHONE SENDS → { action: 'move', direction: 'right' }. At the EXACT same instant, SERVER PUSHES → { event: 'enemy_spotted', position: { x: 340, y: 220 } }. Both messages travel simultaneously on the same connection."
  //           },
  //           {
  //             type: "step",
  //             title: "At 00:00.050 — You fire your M416",
  //             desc: "YOUR PHONE SENDS → { action: 'shoot', weapon: 'M416' }. At the EXACT same instant, SERVER PUSHES → { event: 'teammate_knocked', player: 'squad_mate_3' }. You're shooting while learning your teammate got knocked — both at once."
  //           },
  //           {
  //             type: "step",
  //             title: "At 00:00.100 — You throw a smoke grenade",
  //             desc: "YOUR PHONE SENDS → { action: 'grenade', type: 'smoke' }. At the EXACT same instant, SERVER PUSHES → { event: 'zone_shrinking', timeLeft: 45 }. You're throwing smoke while the zone update arrives — no delay, no waiting."
  //           },
  //           {
  //             type: "code",
  //             code: "What happens in 1 second of a BGMI squad fight:\n\nYOUR PHONE (sending)          ←→  SERVER (pushing)\n─────────────────────────────────────────────────\n{ move: right }               ←→  { enemy at x:340 }\n{ shoot: M416 }               ←→  { teammate knocked }\n{ grenade: smoke }            ←→  { zone shrinking }\n{ move: crouch }              ←→  { kill feed update }\n{ heal: medkit }              ←→  { airdrop incoming }\n\nAll 10 messages — 5 sent, 5 received — in ONE second.\nAll on the SAME connection. All SIMULTANEOUSLY."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "In BGMI, this is critical. While you're sending your actions, the server is simultaneously pushing updates from 99 other players to your screen. If it had to wait for you to finish sending before it could push enemy positions — you'd be playing with constant delays. Full duplex eliminates that problem entirely."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Full duplex = both sides send and receive at the same time, over the same connection. It's what makes BGMI feel like everyone is in the same world, moving in real-time."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ WebSocket can send and receive simultaneously — but how does each side know what type of message it received? A position update? A gunshot? A zone change? That's where Event-Based Architecture comes in."
  //           }
  //         ],

  //         "Event Based Architecture": [
  //           {
  //             type: "paragraph",
  //             text: "The BGMI server is constantly sending your phone different types of data — player positions, gunshot sounds, zone updates, kill notifications, airdrop locations. All of this comes through the same WebSocket connection. So how does your phone know what to DO with each message? It uses events."
  //           },
  //           {
  //             type: "heading",
  //             text: "Every Message Has a Label — That's an Event"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Instead of sending raw data and hoping the client figures it out, WebSocket communication is organized into events. Each message is tagged with an event name — like 'player_moved', 'shot_fired', 'zone_update'. The client has listeners set up for each event, and when a specific event arrives, the matching listener runs the right code."
  //           },
  //           {
  //             type: "code",
  //             code: "Server sends different events:\n→ { event: 'player_moved', data: { id: 42, x: 300, y: 150 } }\n→ { event: 'shot_fired', data: { id: 42, weapon: 'M416' } }\n→ { event: 'zone_update', data: { center: [400, 400], radius: 500 } }\n→ { event: 'airdrop', data: { x: 600, y: 200 } }\n\nClient has listeners for each:\nsocket.on('player_moved', updatePlayerPosition)\nsocket.on('shot_fired', playGunSound)\nsocket.on('zone_update', drawNewZone)\nsocket.on('airdrop', showAirdropOnMap)"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — How an Airdrop Event Flows Through the System"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Server decides to drop an airdrop",
  //             desc: "The game clock hits 10 minutes. The server's game logic triggers an airdrop. It picks a random location on the map — x: 600, y: 200 — and creates an event message with the name 'airdrop'."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Server broadcasts the 'airdrop' event to all 100 players",
  //             desc: "Server sends: { event: 'airdrop', data: { x: 600, y: 200, contents: ['AWM', 'Ghillie Suit'] } }. Notice — the message has a clear event name: 'airdrop'. This label is everything."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Your phone receives the raw message",
  //             desc: "Your BGMI client receives the data on the WebSocket. It parses the JSON. It reads the event name: 'airdrop'. Now it knows EXACTLY which listener to trigger — not the zone listener, not the kill feed listener — the airdrop listener."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — The 'airdrop' listener fires automatically",
  //             desc: "Your client has socket.on('airdrop', showAirdropOnMap) registered. This function runs — it draws the airdrop icon on your minimap, plays the plane flyby sound, and shows the smoke trail animation. All from one event."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 5 — Other events keep flowing independently",
  //             desc: "While the airdrop animation plays, your client ALSO receives 'player_moved' events, 'zone_update' events, 'shot_fired' events — all at the same time. Each one triggers its own separate listener. Nothing blocks anything else. Clean separation."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "When the server sends a 'zone_update' event, only the zone-drawing code runs. When it sends 'shot_fired', only the gunshot sound plays. Each event triggers exactly the right action. No confusion. No giant if-else chains checking what type of message it is. Clean, organized, scalable."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Event-based architecture keeps WebSocket communication organized and clean. Each event = one specific action. Your BGMI client knows exactly what to do with every message because each one is clearly labeled."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Events help organize messages — but there's something deeper happening. The server remembers who you are throughout the match. It knows your health, your position, your inventory. That's not how HTTP works — HTTP forgets you after every request. WebSocket maintains state. That's a Stateful Connection."
  //           }
  //         ],

  //         "Stateful Connection": [
  //           {
  //             type: "paragraph",
  //             text: "In HTTP, the server has amnesia. Every request is brand new — the server doesn't remember who you are, what you did last time, or what page you were on. You have to re-identify yourself every single time (that's why cookies and tokens exist). WebSocket is completely different — once you're connected, the server remembers everything about you for the entire session."
  //           },
  //           {
  //             type: "heading",
  //             text: "The Server Knows You — The Whole Time"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "When you join a BGMI match, the server creates a state object for you. It tracks your player ID, your position on the map, your health (100 HP), your equipped weapons, your inventory, your kill count. This state stays alive for the entire duration of the WebSocket connection. The server doesn't need to re-authenticate you or re-fetch your data on every message."
  //           },
  //           {
  //             type: "code",
  //             code: "When you connect to a BGMI match, server creates:\n{\n  playerId: 'player_42',\n  position: { x: 0, y: 0 },\n  health: 100,\n  weapons: ['M416', 'AWM'],\n  kills: 0,\n  alive: true\n}\n\nThis state STAYS in memory for the entire match.\nEvery message you send updates this state.\nEvery message the server sends uses this state."
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — How Your State Changes During a Match"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — You land and pick up an M416",
  //             desc: "You send: { action: 'pickup', item: 'M416' }. Server updates your state: weapons becomes ['M416']. No database call. No re-authentication. Just an in-memory update — instant."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Enemy shoots you. You take 27 damage.",
  //             desc: "Server receives hit calculation. Updates your state: health drops from 100 to 73. Server pushes to YOUR phone: { event: 'damage', hp: 73 }. Your health bar drops on screen."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — You use a medkit. Health restored.",
  //             desc: "You send: { action: 'heal', item: 'medkit' }. Server updates state: health goes from 73 back to 100. Medkit removed from inventory. All in-memory. All instant."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — You get a kill.",
  //             desc: "Server confirms your bullet hit. Updates state: kills becomes 1. Enemy's state: alive becomes false. Server broadcasts kill feed to all 100 players. Your state object now reflects the kill."
  //           },
  //           {
  //             type: "code",
  //             code: "Your state after 15 minutes of gameplay:\n{\n  playerId: 'player_42',\n  position: { x: 450, y: 320 },   ← updated 10,000+ times\n  health: 100,                     ← went 100→73→100\n  weapons: ['M416', 'AWM'],        ← picked up 2 weapons\n  kills: 3,                        ← got 3 eliminations\n  alive: true                      ← still in the game\n}\n\nAll of this is tracked in SERVER MEMORY.\nNo database lookups. No cookies. No re-auth.\nThe WebSocket connection IS the session."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Compare this to HTTP — if BGMI used HTTP, the server would forget you after every single request. You'd need to send your player ID, re-authenticate with a token, and the server would have to look up your state from a database — on EVERY action. That's thousands of database queries per second per player. Impossible at scale."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Stateful connection = the server maintains your entire game state in memory as long as the WebSocket is open. That's why BGMI never asks you to re-login mid-match or loses track of your health."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ State tracking and events are great — but none of it matters if the data is slow. In a gunfight, even 200ms of delay means you lose. How does WebSocket achieve near-zero delay? That's Low Latency."
  //           }
  //         ],

  //         "Low Latency": [
  //           {
  //             type: "paragraph",
  //             text: "In BGMI, the difference between 20ms and 200ms latency is the difference between getting the kill and getting killed. When you peek around a corner and see an enemy, you need that information NOW — not 200ms later. WebSocket is built for this kind of speed."
  //           },
  //           {
  //             type: "heading",
  //             text: "Why WebSocket Is So Fast"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Three things make WebSocket latency incredibly low compared to HTTP. First — no connection setup overhead. The connection is already open, so there's no TCP handshake or TLS negotiation on every message. Second — tiny frame headers. HTTP sends 500-800 bytes of headers with every request. A WebSocket frame header is just 2-14 bytes. Third — no request-response cycle. The server pushes data the instant it's available — no waiting for the client to ask."
  //           },
  //           {
  //             type: "code",
  //             code: "HTTP request overhead per message:\n→ TCP handshake: ~50ms\n→ TLS negotiation: ~100ms\n→ HTTP headers: ~800 bytes\n→ Total per message: ~150ms + 800 bytes\n\nWebSocket message overhead:\n→ Connection already open: 0ms\n→ Frame header: 2-14 bytes\n→ Total per message: ~1-5ms + 14 bytes\n\nIn a BGMI gunfight — 150ms vs 5ms.\nThat's 30x faster."
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — The Same Peek Fight, Two Different Latencies"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "You and an enemy both peek around a corner at the exact same time. Both fire. Who wins? The one with lower latency. Here's the timeline:"
  //           },
  //           {
  //             type: "step",
  //             title: "Player A — 20ms ping (good Wi-Fi, nearby server)",
  //             desc: "At 0ms: Player A peeks and fires. At 5ms: message reaches server. At 10ms: server calculates hit, sends damage to Player B. At 20ms: Player A sees hit marker on screen. Total round-trip: 20ms."
  //           },
  //           {
  //             type: "step",
  //             title: "Player B — 150ms ping (mobile data, far server)",
  //             desc: "At 0ms: Player B peeks and fires at the SAME time. At 75ms: message reaches server. But by 10ms, Player A's shot already registered. Server already dealt damage to Player B. At 150ms: Player B finally sees the hit marker — but they're already knocked."
  //           },
  //           {
  //             type: "step",
  //             title: "Result — Player A wins, every single time",
  //             desc: "Player A's shot registered 65ms before Player B's shot even reached the server. In a game where both players have the same skill, the one with 20ms ping ALWAYS beats the one with 150ms ping. That's why low latency matters so much."
  //           },
  //           {
  //             type: "code",
  //             code: "Timeline of the same peek fight:\n\n0ms     ─ Both players peek and fire\n5ms     ─ Player A's shot reaches server     ← WebSocket, 20ms ping\n10ms    ─ Server registers A's hit on B\n20ms    ─ Player A sees hit marker ✅\n75ms    ─ Player B's shot reaches server     ← too late\n80ms    ─ Server: 'B is already knocked'\n150ms   ─ Player B sees 'YOU WERE KNOCKED'\n\nPlayer A won because their data arrived 70ms sooner.\nThat's the power of low latency."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "That ping number you see in the top-right corner of your BGMI screen — 20ms, 50ms, 100ms — that's the round-trip time of your WebSocket connection. Lower ping = data reaches the server and comes back faster = smoother gameplay. Players with 20ms ping have a genuine advantage over players with 150ms ping."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Low latency is not a feature of WebSocket — it's the entire point. Every design decision in the protocol — persistent connection, tiny headers, no request-response cycle — exists to make communication as fast as possible."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ A low-latency connection is great — but what about managing 100 of them at the same time? The BGMI server handles 100 players per match, thousands of matches running simultaneously. How does it manage all these connections? That's Connection Management."
  //           }
  //         ],

  //         "Connection Management Mechanisms": [
  //           {
  //             type: "paragraph",
  //             text: "A single BGMI match has 100 players. Each player has one WebSocket connection. The BGMI server runs thousands of matches at the same time. That's potentially hundreds of thousands of simultaneous WebSocket connections on their servers. Managing this many connections — tracking who's connected, routing messages to the right players, cleaning up dead connections — is a serious engineering challenge."
  //           },
  //           {
  //             type: "heading",
  //             text: "How the Server Tracks Every Player"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "The server maintains a connection pool — essentially a list of all active WebSocket connections. Each connection is tagged with metadata: player ID, match ID, connection time, last activity timestamp. When a message needs to go to a specific player, the server looks up their connection in the pool and sends it directly."
  //           },
  //           {
  //             type: "code",
  //             code: "Server's connection pool for Match #4521:\n\nconnections = {\n  'player_01': { socket: ws1, health: 100, alive: true },\n  'player_02': { socket: ws2, health: 75, alive: true },\n  'player_03': { socket: ws3, health: 0, alive: false },\n  ...\n  'player_100': { socket: ws100, health: 100, alive: true }\n}\n\nBroadcast zone update → loop through all, send to each\nSend kill notification → find killer + victim, send to both\nPlayer disconnects → remove from pool, notify others"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — How the Server Routes a Kill"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Player_42 fires at Player_87",
  //             desc: "Server receives: { action: 'shoot', from: 'player_42', direction: 'north' }. Server uses Player_42's position from the connection pool to calculate bullet trajectory."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Server checks all nearby players",
  //             desc: "Server loops through the connection pool. Finds Player_87 is in the bullet's path. Calculates damage: 27 HP. Updates Player_87's state in the pool: health drops from 100 to 0. alive = false."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Server sends targeted messages",
  //             desc: "To Player_42's socket: { event: 'kill_confirmed', victim: 'Player_87' }. To Player_87's socket: { event: 'you_died', killer: 'Player_42', weapon: 'M416' }. To Player_42's squad: { event: 'teammate_got_kill' }."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Server broadcasts to everyone",
  //             desc: "To ALL 100 connections: { event: 'kill_feed', killer: 'Player_42', victim: 'Player_87', weapon: 'M416' }. Everyone sees the kill in the top-right feed. Different messages to different targets — all managed by the connection pool."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Connection management also handles grouping. In BGMI squad mode, the server groups 4 players together. Messages meant for your squad — like voice chat data or pings — only go to those 4 connections, not all 100. This is similar to Socket.IO's 'rooms' concept."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Connection management is the backbone of any WebSocket server. Without it, the server wouldn't know who to send data to, which connections are alive, or which match a player belongs to."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Managing connections is one thing — but what happens when a connection drops? Your Wi-Fi glitches, your network switches from 4G to Wi-Fi, or you walk through a dead zone. The connection breaks. What does BGMI do? That's Reconnection Handling."
  //           }
  //         ],

  //         "Reconnection Handling": [
  //           {
  //             type: "paragraph",
  //             text: "You're in the final circle in BGMI — 5 players left. Suddenly your Wi-Fi disconnects for 3 seconds. When it comes back, you expect to be right back in the match — same position, same health, same weapons. And most of the time, you are. That's not luck — that's reconnection handling doing its job."
  //           },
  //           {
  //             type: "heading",
  //             text: "What Happens When Your Connection Drops"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "When a WebSocket connection breaks, the server doesn't immediately delete your state. It knows network interruptions happen all the time — especially on mobile. So it keeps your player state alive for a grace period (say 60-90 seconds) and waits for you to reconnect. If you come back within that window, you're back in the game as if nothing happened."
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — Your Wi-Fi Dies in the Final Circle"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Your Wi-Fi disconnects (15:42:00)",
  //             desc: "Your phone's WebSocket connection breaks. The onclose event fires on your client. Your phone immediately knows it lost connection."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Server detects the drop (15:42:01)",
  //             desc: "Server notices Player_42's connection is gone. But it does NOT delete your state. Instead, it starts a 90-second grace timer. Your player character stands still in the game. Other players see 'Player_42: connection unstable'."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Client starts reconnection attempts (15:42:01)",
  //             desc: "Your phone automatically starts trying to reconnect using exponential backoff: wait 1 second → try → fail. Wait 2 seconds → try → fail. Wait 4 seconds → try..."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Wi-Fi comes back. Reconnection succeeds! (15:42:04)",
  //             desc: "After 4 seconds, your Wi-Fi reconnects. Your phone establishes a NEW WebSocket connection to the server. It sends your player token to re-authenticate: 'Hey, I'm Player_42, I was in Match #4521.'"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 5 — Server recognizes you and syncs state (15:42:04)",
  //             desc: "Server checks: Is Player_42's grace timer still active? Yes — only 4 seconds passed. Server links the new WebSocket connection to your preserved state. Sends full game state sync: current position, health, inventory, zone location, alive players."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 6 — You're back in the match (15:42:05)",
  //             desc: "Your screen updates with the current game state. You're exactly where you were — same health, same weapons, same position. The zone moved while you were gone — that's now reflected. You continue playing as if nothing happened."
  //           },
  //           {
  //             type: "code",
  //             code: "Complete reconnection timeline:\n\n15:42:00  ─ Wi-Fi dies. WebSocket connection breaks.\n15:42:01  ─ Server: 'Player_42 dropped. Grace: 90s'\n15:42:01  ─ Client: Attempt 1 → wait 1s → try → FAIL\n15:42:03  ─ Client: Attempt 2 → wait 2s → try → FAIL\n15:42:04  ─ Wi-Fi reconnects!\n15:42:04  ─ Client: Attempt 3 → try → SUCCESS ✅\n15:42:04  ─ Client sends: { token: 'abc', matchId: 4521 }\n15:42:04  ─ Server: 'Welcome back! Here's your state:'\n15:42:05  ─ Full state sync complete. Game resumes.\n\nTotal downtime: ~5 seconds.\nYou missed nothing. You lost nothing."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "But what if you DON'T reconnect within the grace period? If 90 seconds pass and you're still offline — the server removes your state, marks you as disconnected, and your character is eliminated from the match. That's why BGMI sometimes shows 'connection timeout' when your network is out for too long."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Good reconnection handling is why BGMI doesn't kick you out instantly when your network hiccups. The server gives you a window to come back, preserves your state, and syncs everything when you reconnect."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "🎯 Full picture of WebSocket core concepts — Handshake opens the door. Persistent Connection keeps it open. Full Duplex lets both sides talk freely. Events organize the conversation. Stateful Connection remembers everything. Low Latency makes it instant. Connection Management tracks everyone. Reconnection Handling recovers from failures. Together — this is how BGMI runs a seamless real-time experience for 100 players."
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       id: 3,
  //       title: "WebSocket Lifecycle",
  //       level: "freshers",
  //       topics: [
  //         "Connection Establishment",
  //         "Sending & Receiving Messages",
  //         "Ping / Pong (Heartbeat)",
  //         "Connection Close & Codes",
  //         "WebSocket Events (onopen, onmessage, onerror, onclose)"
  //       ],
  //       topicDetails: {
  //         "Connection Establishment": [
  //           {
  //             type: "paragraph",
  //             text: "You tap 'Start Match' in BGMI. Behind the scenes, your phone goes through a precise sequence to establish a WebSocket connection with the game server. It's not random — it follows a strict order. Understand this order and you understand how every real-time connection in the world starts."
  //           },
  //           {
  //             type: "heading",
  //             text: "The Three-Step Connection Process"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "First, a TCP connection is established between your phone and the server — this is the raw network link. Second, if using wss://, a TLS handshake encrypts the connection. Third, the WebSocket upgrade handshake happens — the HTTP request with the Upgrade header that we covered earlier. Only after all three steps succeed does the WebSocket connection become active."
  //           },
  //           {
  //             type: "code",
  //             code: "Step 1 — TCP Handshake (network level):\nYour Phone → SYN → Server\nServer → SYN-ACK → Your Phone\nYour Phone → ACK → Server\n✅ Raw connection established\n\nStep 2 — TLS Handshake (security level):\nYour Phone ←→ Server exchange certificates\n✅ Encrypted tunnel established\n\nStep 3 — WebSocket Upgrade (application level):\nYour Phone → HTTP GET with 'Upgrade: websocket'\nServer → 101 Switching Protocols\n✅ WebSocket connection is now LIVE\n\nTotal time: ~50-150ms (you never notice it)"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — What Happens When You Tap 'Start Match'"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Let's trace the exact timeline from the moment you tap 'Start Match' in BGMI to the moment your WebSocket is live and game data starts flowing:"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — TCP Handshake (0ms - 30ms)",
  //             desc: "Your phone sends a SYN packet to the BGMI server. The server replies with SYN-ACK. Your phone confirms with ACK. This is the raw network link — like dialing a phone number and hearing it ring. No data has been exchanged yet, just a basic 'can we talk?' confirmation."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — TLS Handshake (30ms - 80ms)",
  //             desc: "Now your phone and the server negotiate encryption. They exchange certificates, agree on an encryption algorithm, and create session keys. After this, every byte flowing between them is encrypted. This is why BGMI uses wss:// — so no one on your Wi-Fi can sniff your game data."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — WebSocket Upgrade Request (80ms - 100ms)",
  //             desc: "Your phone sends an HTTP GET request with the special headers: 'Upgrade: websocket' and 'Sec-WebSocket-Key'. This tells the server: 'I don't want regular HTTP. I want a persistent WebSocket connection for real-time gaming.'"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Server Sends 101 Switching Protocols (100ms - 120ms)",
  //             desc: "The BGMI server validates your request. Is this player authenticated? Is there room in a match? If yes — it responds with HTTP 101, confirming the upgrade. From this exact millisecond, the connection is no longer HTTP. It's WebSocket."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 5 — WebSocket is LIVE. Game data starts flowing (120ms+)",
  //             desc: "Your phone sends: { type: 'join', playerId: 42 }. Server responds: { type: 'welcome', matchId: 4521, map: 'Erangel', players: 98 }. The lobby appears. Players load in. The plane route generates. All on this single WebSocket connection."
  //           },
  //           {
  //             type: "code",
  //             code: "Complete timeline:\n\n  0ms  ─── You tap 'Start Match'\n 30ms  ─── TCP handshake complete (raw link)\n 80ms  ─── TLS handshake complete (encrypted)\n100ms  ─── HTTP Upgrade request sent\n120ms  ─── 101 Switching Protocols received\n120ms  ─── WebSocket is LIVE ✅\n121ms  ─── First game message sent\n130ms  ─── Server responds with match data\n   ⋮   ─── 30 minutes of real-time gameplay\n 30min ─── Match ends. Connection closes.\n\nThe entire setup took ~120ms.\nYou didn't feel a thing."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "This entire process happens in under 150 milliseconds. By the time the BGMI loading screen finishes, your WebSocket connection is already established and ready to send game data. The connection stays open until the match ends or something breaks it."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Connection establishment is the entry point of the WebSocket lifecycle. TCP → TLS → Upgrade. Three steps, done once, and you're connected for the entire match."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ The connection is established — now what? You need to actually send and receive game data through it. How does that work?"
  //           }
  //         ],

  //         "Sending & Receiving Messages": [
  //           {
  //             type: "paragraph",
  //             text: "Once the WebSocket connection is established, both your phone and the BGMI server can send messages freely. There's no 'request-response' pattern here. Either side can send a message at any moment — and the other side receives it instantly. Messages are sent as small data packets called frames."
  //           },
  //           {
  //             type: "heading",
  //             text: "How Messages Flow in a BGMI Match"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Every action you take — moving, shooting, crouching, opening a door — gets packed into a small message and sent to the server. The server processes it, updates the game state, and broadcasts relevant updates to other players. All of this happens in milliseconds, continuously, for the entire match."
  //           },
  //           {
  //             type: "code",
  //             code: "You move forward:\nYour phone SENDS → { type: 'move', dir: 'north', speed: 5 }\nServer RECEIVES → updates your position in game state\nServer SENDS to others → { player: 42, pos: { x: 150, y: 300 } }\n\nEnemy fires at you:\nEnemy phone SENDS → { type: 'shoot', target: 42, weapon: 'AKM' }\nServer RECEIVES → calculates if bullet hits\nServer SENDS to you → { type: 'damage', hp: -27, from: 'AKM' }\nYour screen shows: health drops from 100 to 73"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — Tracing a Single Bullet"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Let's follow one bullet from the moment you pull the trigger to the moment the enemy sees their health drop — and count every WebSocket message involved:"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — You fire your AKM (0ms)",
  //             desc: "You tap the fire button. Your BGMI client creates a message: { type: 'shoot', weapon: 'AKM', direction: { x: 0.7, y: 0.3 }, position: { x: 450, y: 320 } }. This message is packed into a WebSocket frame — total size: about 60 bytes. Your phone sends it."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Server receives the shot (5ms)",
  //             desc: "The BGMI server receives your frame in ~5ms. It unpacks the message. Now it needs to figure out — did this bullet hit anyone? It checks the positions of all nearby players from its in-memory state."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Server calculates the hit (6ms)",
  //             desc: "Server finds Player_87 is at position { x: 460, y: 325 } — directly in the bullet's path. It calculates damage: AKM deals 27 HP. Player_87's health drops from 100 to 73 in the server state."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Server sends MULTIPLE messages (7ms)",
  //             desc: "Server sends to YOU: { type: 'hit_marker', damage: 27 } — you see the hit marker. Server sends to Player_87: { type: 'damage', hp: 73, from: 'AKM' } — their health bar drops. Server sends to ALL: { type: 'gunshot_sound', position: { x: 450, y: 320 } } — nearby players hear the shot."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 5 — Everyone's screen updates (10-20ms)",
  //             desc: "YOU see: hit marker animation ✅. Player_87 sees: health drops, screen flashes red, damage direction indicator ✅. Nearby players hear: gunshot sound from your direction ✅. All from ONE trigger pull. All within 20ms."
  //           },
  //           {
  //             type: "code",
  //             code: "One bullet = 4+ WebSocket messages:\n\nMessage 1: You → Server    │ 'I fired my AKM'        │ ~60 bytes\nMessage 2: Server → You     │ 'Hit! 27 damage'        │ ~30 bytes\nMessage 3: Server → Victim  │ 'You took 27 damage'    │ ~40 bytes\nMessage 4: Server → Nearby  │ 'Gunshot at x:450'      │ ~35 bytes\n\nTotal data for one bullet: ~165 bytes\nTotal time: ~10-20ms\n\nIn a 30-min match with 100 players:\n→ ~200,000 messages\n→ ~10 MB of total data\n→ All on persistent WebSocket connections"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Messages in WebSocket are lightweight. Unlike HTTP where every request carries 500+ bytes of headers, a WebSocket message frame has just 2-14 bytes of overhead. The actual game data (position, action) might be another 20-50 bytes. So each message is tiny — which is why thousands of them can flow per second without lag."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Sending and receiving messages is the core of WebSocket communication. Both sides send whenever they want. Messages are tiny. Delivery is instant. That's the heartbeat of every real-time application."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Messages flow constantly during the match — but what if the connection is open but nobody is sending anything? How does the server know if you're still there or if your phone silently disconnected? That's where Ping/Pong comes in."
  //           }
  //         ],

  //         "Ping / Pong (Heartbeat)": [
  //           {
  //             type: "paragraph",
  //             text: "You're hiding in a building in BGMI, not moving, not shooting — just camping. Your phone hasn't sent any game data to the server in 2 minutes. The server starts wondering — is this player still connected? Or did their network die silently? Without a way to check, the server would keep the connection open forever — wasting resources on a player who might be long gone."
  //           },
  //           {
  //             type: "heading",
  //             text: "The Heartbeat — Are You Still Alive?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Ping/Pong is WebSocket's built-in heartbeat mechanism. The server periodically sends a tiny Ping frame to your phone. Your phone automatically responds with a Pong frame. If the server sends a Ping and gets no Pong back within a timeout — it knows your connection is dead and closes it."
  //           },
  //           {
  //             type: "code",
  //             code: "Every 30 seconds:\nServer → PING → Your Phone\nYour Phone → PONG → Server\n✅ Connection confirmed alive\n\nServer → PING → Your Phone\n... 10 seconds pass ... no PONG\n... 20 seconds pass ... no PONG\n❌ Connection assumed dead. Server closes it."
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — Camping in a Building, Heartbeat Keeps You Alive"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — You're camping. No game data is being sent. (15:20:00)",
  //             desc: "You're prone inside a building in Pochinki, not moving, not shooting. Your phone hasn't sent any game action to the server in 90 seconds. From the server's perspective — silence. Is this player camping or did their phone die?"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Server sends a Ping (15:20:30)",
  //             desc: "The server's heartbeat timer fires every 30 seconds. It sends a tiny Ping frame (just 2 bytes) to your phone: 'Hey, are you still there?' This is invisible to you — it's a protocol-level control frame, not a game message."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Your phone automatically responds with Pong (15:20:30)",
  //             desc: "Your phone's WebSocket layer (not your game code — the protocol itself) instantly sends back a Pong frame. This is automatic. You don't write code for this. The browser/client handles it. Server receives the Pong: 'Player_42 is still alive. Connection healthy.'"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — 30 seconds later, another Ping (15:21:00)",
  //             desc: "Server sends another Ping. Your phone sends another Pong. Connection confirmed alive again. This cycle repeats every 30 seconds for the entire match — even when you're AFK or camping."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 5 — But what if your Wi-Fi secretly died? (15:21:30)",
  //             desc: "Server sends a Ping... but this time, no Pong comes back. Server waits 10 seconds — nothing. Waits 20 seconds — still nothing. Server concludes: 'Player_42's connection is dead.' It closes the connection and starts the reconnection grace timer."
  //           },
  //           {
  //             type: "code",
  //             code: "Healthy heartbeat (you're camping but connected):\n\n15:20:00 ─ You stop moving (camping)\n15:20:30 ─ Server → PING → Phone → PONG → Server  ✅ alive\n15:21:00 ─ Server → PING → Phone → PONG → Server  ✅ alive\n15:21:30 ─ Server → PING → Phone → PONG → Server  ✅ alive\n(You can camp for hours — heartbeat keeps the connection valid)\n\nDead connection (Wi-Fi silently died):\n\n15:21:30 ─ Wi-Fi dies silently (you don't know yet)\n15:22:00 ─ Server → PING → ... no PONG ... ⏳\n15:22:10 ─ Still no PONG ... ⏳\n15:22:20 ─ TIMEOUT! Server closes connection ❌\n15:22:20 ─ Server starts 90s grace timer for reconnection"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "This happens silently in the background. You never see it. The Ping and Pong frames are tiny — just 2 bytes of control data. They don't carry game data. They exist purely to verify the connection is still alive. Without them, dead connections would pile up and eventually crash the server."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "💓 Think of Ping/Pong like a doctor checking your pulse. The heart beats (Pong responds) — patient is alive. No heartbeat? Something is wrong. Take action."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Ping/Pong ensures dead connections are detected and cleaned up quickly. In BGMI, this means the server never wastes resources on disconnected players — and can notify the squad that their teammate dropped."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Ping/Pong detects dead connections — but what about intentional disconnections? When the match ends, or a player quits, the connection needs to close cleanly. How does that work?"
  //           }
  //         ],

  //         "Connection Close & Codes": [
  //           {
  //             type: "paragraph",
  //             text: "The BGMI match is over. You got that Chicken Dinner. Now the game needs to close the WebSocket connection cleanly — not just cut the wire, but tell the server why it's closing. WebSocket has a proper closing handshake with status codes, so both sides know exactly what happened."
  //           },
  //           {
  //             type: "heading",
  //             text: "The Clean Shutdown — Close Frame"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "When either side wants to close the connection, it sends a special Close frame with a status code and optionally a reason message. The other side responds with its own Close frame — and only then is the connection fully terminated. It's a graceful goodbye, not a sudden hang-up."
  //           },
  //           {
  //             type: "code",
  //             code: "Match ends — clean close:\nClient → Close Frame (1000, 'Match complete') → Server\nServer → Close Frame (1000, 'Goodbye') → Client\n✅ Both sides agree. Connection closed gracefully.\n\nPlayer quits mid-match:\nClient → Close Frame (1001, 'Player quit') → Server\nServer → updates game state → removes player\nServer → Close Frame (1001, 'Acknowledged') → Client\n✅ Server knows the player intentionally left."
  //           },
  //           {
  //             type: "heading",
  //             text: "Common WebSocket Close Codes"
  //           },
  //           {
  //             type: "code",
  //             code: "Code  │ Meaning              │ BGMI Example\n──────┼──────────────────────┼───────────────────────────\n1000  │ Normal closure       │ Match ended normally\n1001  │ Going away           │ Player quit the app\n1002  │ Protocol error       │ Corrupted game data received\n1003  │ Unsupported data     │ Server got invalid message format\n1006  │ Abnormal closure     │ Network died (no close frame sent)\n1008  │ Policy violation     │ Player caught cheating, kicked\n1011  │ Server error         │ BGMI server crashed\n1012  │ Service restart      │ Server maintenance/update"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — Three Ways a BGMI Connection Closes"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Different situations produce different close codes. Here are three real scenarios — and exactly how the close handshake plays out in each:"
  //           },
  //           {
  //             type: "step",
  //             title: "Scenario 1 — Chicken Dinner! Match ends normally (Code 1000)",
  //             desc: "You get the final kill. Server calculates: match over. Server sends you final stats (kills, damage, rank). Then server sends Close Frame with code 1000 and reason 'Match complete'. Your phone sends Close Frame back with 1000. Connection terminated gracefully. Your BGMI client shows the results screen."
  //           },
  //           {
  //             type: "step",
  //             title: "Scenario 2 — You rage quit mid-match (Code 1001)",
  //             desc: "You're tilted. You force-close the BGMI app. Your phone sends Close Frame with code 1001 ('Going away'). Server receives it. Server updates game state: Player_42 left the match. Server removes your connection from the pool. Server broadcasts to other players: 'Player_42 has left the match.' Your squad sees you disconnected."
  //           },
  //           {
  //             type: "step",
  //             title: "Scenario 3 — Cheater detected and kicked (Code 1008)",
  //             desc: "Server's anti-cheat detects suspicious behavior — impossible headshot accuracy. Server sends Close Frame with code 1008 ('Policy violation') and reason 'Anti-cheat: abnormal behavior detected.' Server forcefully closes the connection. The cheater sees: 'You have been banned.' No reconnection allowed."
  //           },
  //           {
  //             type: "step",
  //             title: "Scenario 4 — Your network dies silently (Code 1006)",
  //             desc: "Your phone enters a dead zone. Connection breaks WITHOUT a Close Frame — your phone couldn't send one because the network is gone. Server eventually detects the dead connection via missing Pong heartbeat. Server closes with code 1006 ('Abnormal closure'). This is the ONLY code where no Close Frame was exchanged — because the network died before anyone could say goodbye."
  //           },
  //           {
  //             type: "code",
  //             code: "How the client uses close codes to decide what to do:\n\nonclose = (event) => {\n  switch (event.code) {\n    case 1000:  // Normal close\n      showResultsScreen();     // Match ended. Show stats.\n      break;\n    case 1001:  // Player quit\n      showMainMenu();          // Back to lobby.\n      break;\n    case 1006:  // Network died\n      attemptReconnect();      // Try to get back in!\n      break;\n    case 1008:  // Kicked/banned\n      showBanNotice();         // You're banned. No retry.\n      break;\n    case 1011:  // Server crashed\n      showServerError();       // 'Server down. Try later.'\n      break;\n  }\n}"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Code 1006 is special — it means the connection broke without a proper Close frame. This is what happens when your network dies suddenly. The server detects it through the missing Pong (heartbeat) and closes the connection from its side. The client never got to say goodbye."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Close codes give both sides clarity on WHY the connection ended. Was it normal? Did someone quit? Did the server crash? This information helps the client decide whether to reconnect, show an error, or move to the results screen."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ We've covered individual parts of the lifecycle — connection, messages, heartbeats, closing. But in code, how do you actually LISTEN for all of these? That's where WebSocket Events come in — the actual JavaScript API."
  //           }
  //         ],

  //         "WebSocket Events (onopen, onmessage, onerror, onclose)": [
  //           {
  //             type: "paragraph",
  //             text: "Everything we've discussed — establishing the connection, sending messages, detecting errors, handling close — all of it maps to four JavaScript events. These are the hooks you use in code to react to each stage of the WebSocket lifecycle. If you understand these four events, you can build any real-time application."
  //           },
  //           {
  //             type: "heading",
  //             text: "The Four WebSocket Events"
  //           },
  //           {
  //             type: "code",
  //             code: "const socket = new WebSocket('wss://game.bgmi.com/match');\n\n// 1. onopen — Connection established successfully\nsocket.onopen = () => {\n  console.log('Connected to BGMI match server!');\n  socket.send(JSON.stringify({ type: 'join', playerId: 42 }));\n};\n\n// 2. onmessage — Server sent us data\nsocket.onmessage = (event) => {\n  const data = JSON.parse(event.data);\n  if (data.type === 'player_moved') updateMap(data);\n  if (data.type === 'zone_update') drawZone(data);\n  if (data.type === 'damage') reduceHealth(data.hp);\n};\n\n// 3. onerror — Something went wrong\nsocket.onerror = (error) => {\n  console.log('Connection error!', error);\n  showErrorToast('Connection issue detected');\n};\n\n// 4. onclose — Connection ended\nsocket.onclose = (event) => {\n  console.log('Disconnected:', event.code, event.reason);\n  if (event.code !== 1000) {\n    attemptReconnect(); // abnormal close — try reconnecting\n  }\n};"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "That's the entire lifecycle in code. onopen fires once when the connection is established — this is where you send your initial data (join the match). onmessage fires every time the server sends data — this is where all game updates are processed. onerror fires when something goes wrong — network issues, invalid data, server problems. onclose fires when the connection ends — with the close code telling you why."
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — A Complete BGMI Match Through 4 Events"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Let's trace an entire BGMI match from start to finish — and see exactly which WebSocket event fires at each stage:"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — onopen fires (Match starts)",
  //             desc: "You tap 'Start Match'. TCP handshake → TLS → Upgrade → 101 → WebSocket is live. The onopen callback fires ONCE. Your code inside onopen sends: { type: 'join', playerId: 42 }. Server responds with match data. You're in the lobby."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — onmessage fires (Plane, landing, looting)",
  //             desc: "Server sends plane route → onmessage fires. You land → server pushes nearby player positions → onmessage fires again. You pick up a gun → server confirms → onmessage. Every single update from the server triggers onmessage. In the first 5 minutes alone, onmessage fires hundreds of times."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — onmessage fires (Combat, kills, zone)",
  //             desc: "Enemy moves → onmessage → update their position on your map. You get shot → onmessage → reduce your health bar. Zone shrinks → onmessage → redraw the blue circle. Kill feed updates → onmessage → show who eliminated who. This is the HEART of the match — onmessage handles everything."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — onerror fires (Network glitch)",
  //             desc: "At minute 20, your Wi-Fi stutters for a moment. The WebSocket detects the issue. onerror fires with error details. Your code shows a small toast: 'Connection unstable.' The connection recovers on its own this time — no disconnect. onerror warned you, but the match continues."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 5 — onmessage fires (Chicken Dinner!)",
  //             desc: "You get the final kill! Server sends: { type: 'match_over', rank: 1, kills: 8 }. onmessage fires one last time. Your code shows the Chicken Dinner screen with your stats."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 6 — onclose fires (Connection ends)",
  //             desc: "Server sends Close Frame with code 1000. Your phone responds with Close Frame. Connection is terminated. onclose fires with event.code = 1000 and event.reason = 'Match complete'. Your code checks: code is 1000 → normal end → show results screen. No reconnection needed."
  //           },
  //           {
  //             type: "code",
  //             code: "Complete event timeline of a BGMI match:\n\n00:00  ─ onopen    → 'Connected! Sending join request...'    [fires 1 time]\n00:01  ─ onmessage → 'Plane route received'                  \n00:02  ─ onmessage → 'Landing zone data'                     \n00:03  ─ onmessage → 'Nearby player positions'               \n  ⋮    ─ onmessage → (enemy positions, zone, kills, loot...) [fires ~50,000 times]\n20:00  ─ onerror   → 'Network glitch detected'               [fires 0-3 times]\n29:58  ─ onmessage → 'Final kill! Match over! Rank: #1'      \n30:00  ─ onclose   → 'Connection closed. Code: 1000'         [fires 1 time]\n\nSummary:\n  onopen    → fires ONCE at the start\n  onmessage → fires THOUSANDS of times (all game data)\n  onerror   → fires RARELY (only on problems)\n  onclose   → fires ONCE at the end"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Four events — that's all you need. onopen to start, onmessage for all communication, onerror for problems, onclose for the end. Master these four and you can build chat apps, live dashboards, multiplayer games — anything real-time."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "🎯 Full WebSocket Lifecycle — Establish connection (TCP → TLS → Upgrade) → Send and receive messages (tiny frames, both directions) → Ping/Pong heartbeats keep it alive → Close gracefully with status codes → Four JS events (onopen, onmessage, onerror, onclose) let you hook into every stage. This is the complete journey of a WebSocket connection — from birth to death."
  //           }
  //         ]
  //       }
  //     },

  //     {
  //       id: 4,
  //       title: "WebSockets in Node.js",
  //       level: "freshers",
  //       topics: [
  //         "ws library setup",
  //         "Creating a WebSocket Server",
  //         "Broadcasting messages to all clients",
  //         "Handling multiple clients",
  //         "Socket.IO basics vs raw ws"
  //       ],
  //       topicDetails: {
  //         "ws library setup": [
  //           {
  //             type: "paragraph",
  //             text: "Time to get your hands dirty. You know what WebSocket is, how it works, and why BGMI uses it. Now let's build one. In Node.js, the most popular library for raw WebSocket implementation is called 'ws'. It's lightweight, fast, and gives you direct control over WebSocket connections — no magic, no abstractions."
  //           },
  //           {
  //             type: "heading",
  //             text: "Installing and Setting Up ws"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Setting up ws takes exactly two steps — install the package and create a server. That's it. No complex configuration. No boilerplate. You can have a working WebSocket server in under 10 lines of code."
  //           },
  //           {
  //             type: "code",
  //             code: "// Step 1 — Install the ws library\nnpm install ws\n\n// Step 2 — Create a basic WebSocket server\nconst WebSocket = require('ws');\n\nconst server = new WebSocket.Server({ port: 8080 });\n\nserver.on('connection', (socket) => {\n  console.log('A player connected!');\n\n  socket.on('message', (data) => {\n    console.log('Received:', data.toString());\n  });\n\n  socket.send('Welcome to the BGMI match server!');\n});\n\nconsole.log('WebSocket server running on ws://localhost:8080');"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — From Zero to Working WebSocket Server"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Create a new project folder",
  //             desc: "Open your terminal. Create a folder: mkdir bgmi-server. Navigate into it: cd bgmi-server. Initialize Node.js: npm init -y. This creates package.json — your project is ready."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Install the ws library",
  //             desc: "Run: npm install ws. This downloads the ws package — a tiny, fast WebSocket library with zero dependencies. Your node_modules folder now has everything you need."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Create server.js and paste the code above",
  //             desc: "Create a file called server.js. Paste the WebSocket server code. The key line is: new WebSocket.Server({ port: 8080 }) — this starts a WebSocket server on port 8080, ready to accept connections."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Run the server",
  //             desc: "Run: node server.js. You see: 'WebSocket server running on ws://localhost:8080'. Your server is now LIVE — waiting for players to connect."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 5 — Test it from a browser",
  //             desc: "Open your browser console (F12 → Console). Type: const ws = new WebSocket('ws://localhost:8080'). Instantly, your server logs: 'A player connected!' and sends back: 'Welcome to the BGMI match server!'. You just made your first WebSocket connection."
  //           },
  //           {
  //             type: "code",
  //             code: "Testing in browser console:\n\n> const ws = new WebSocket('ws://localhost:8080')\n> ws.onmessage = (e) => console.log(e.data)\n  → 'Welcome to the BGMI match server!'\n\n> ws.send('Hello from player!')\n  → Server logs: 'Received: Hello from player!'\n\nYour first real-time, two-way communication. Done in 5 minutes."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "That's a fully working WebSocket server. When a player (client) connects, the server logs it, listens for messages from that player, and sends a welcome message. This is the foundation of every real-time server — whether it's a chat app, a stock ticker, or a BGMI match server."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ The ws library gives you raw WebSocket power in Node.js. No overhead. No opinions. Just pure WebSocket — exactly what you need to understand how real-time communication works under the hood."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ The setup is done — but this server only handles one connection passively. How do we build a proper game server that creates a match, accepts players, and manages game state? That's Creating a WebSocket Server properly."
  //           }
  //         ],

  //         "Creating a WebSocket Server": [
  //           {
  //             type: "paragraph",
  //             text: "A real BGMI-style game server doesn't just accept connections — it manages matches. When 100 players connect, the server needs to group them into a match, track each player's state, process their actions, and push updates to everyone. Let's build a simplified version of this."
  //           },
  //           {
  //             type: "heading",
  //             text: "A BGMI-Style Match Server"
  //           },
  //           {
  //             type: "code",
  //             code: "const WebSocket = require('ws');\nconst server = new WebSocket.Server({ port: 8080 });\n\n// Game state — tracks all players in the match\nconst players = new Map();\n\nserver.on('connection', (socket) => {\n  // Generate a unique player ID\n  const playerId = 'player_' + Math.random().toString(36).substr(2, 5);\n\n  // Initialize player state\n  players.set(playerId, {\n    socket: socket,\n    position: { x: 0, y: 0 },\n    health: 100,\n    alive: true\n  });\n\n  console.log(`${playerId} joined! Total players: ${players.size}`);\n\n  // Send player their ID\n  socket.send(JSON.stringify({\n    type: 'welcome',\n    playerId: playerId,\n    totalPlayers: players.size\n  }));\n\n  // Handle incoming messages from this player\n  socket.on('message', (raw) => {\n    const data = JSON.parse(raw);\n\n    if (data.type === 'move') {\n      // Update player position in game state\n      const player = players.get(playerId);\n      player.position = data.position;\n    }\n  });\n\n  // Handle disconnection\n  socket.on('close', () => {\n    players.delete(playerId);\n    console.log(`${playerId} left. Remaining: ${players.size}`);\n  });\n});"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — 3 Players Join Your Match Server"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Player 1 connects",
  //             desc: "A WebSocket connection arrives. Server generates ID: 'player_a3f2k'. Creates state: { position: {0,0}, health: 100, alive: true }. Stores it in the players Map. Sends welcome message with their ID. Server logs: 'player_a3f2k joined! Total players: 1'."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Player 2 connects",
  //             desc: "Another connection arrives. Server generates ID: 'player_b7x9m'. Creates state. Adds to the Map. Now players.size = 2. Server logs: 'player_b7x9m joined! Total players: 2'. Both players have independent WebSocket connections, tracked separately."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Player 1 sends a move message",
  //             desc: "Player 1's socket receives: { type: 'move', position: { x: 120, y: 450 } }. Server parses it, finds type === 'move', looks up player_a3f2k in the Map, updates their position from {0,0} to {120, 450}. State updated in memory — no database needed."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Player 3 connects, then Player 2 disconnects",
  //             desc: "Player 3 joins (total: 3). Then Player 2's socket fires 'close' event — maybe they quit. Server runs: players.delete('player_b7x9m'). Their state is gone. Cleaned up. Server logs: 'player_b7x9m left. Remaining: 2'."
  //           },
  //           {
  //             type: "code",
  //             code: "Server's players Map over time:\n\n0s   → Map: { }                              (empty)\n1s   → Map: { player_a3f2k: { hp:100 } }     (1 player)\n2s   → Map: { player_a3f2k, player_b7x9m }   (2 players)\n3s   → player_a3f2k moves to { x:120, y:450 } (state updated)\n5s   → player_c1q8n joins                     (3 players)\n6s   → player_b7x9m disconnects               (2 players)\n6s   → Map: { player_a3f2k, player_c1q8n }    (cleaned up)"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "This server does three things every real game server does — accepts players and assigns them IDs, maintains their game state in memory, and handles their messages (like movement). When a player disconnects, their state is cleaned up. This is the skeleton that BGMI and every multiplayer game builds on."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ A WebSocket server is just a regular Node.js server that maintains persistent connections and state for each client. The pattern is always the same — accept connection, track state, process messages, handle disconnect."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ This server tracks players — but when one player moves, the others don't know about it. We need to send that player's movement to EVERY other player in the match. That's broadcasting."
  //           }
  //         ],

  //         "Broadcasting messages to all clients": [
  //           {
  //             type: "paragraph",
  //             text: "When you move in BGMI, all 99 other players need to see you move. When the zone shrinks, all 100 players need to get that update at the same time. This is called broadcasting — sending one message to every connected client. It's the most common pattern in any multiplayer game."
  //           },
  //           {
  //             type: "heading",
  //             text: "Sending Updates to Every Player"
  //           },
  //           {
  //             type: "code",
  //             code: "// Broadcast function — sends a message to ALL connected players\nfunction broadcast(data) {\n  const message = JSON.stringify(data);\n\n  server.clients.forEach((client) => {\n    if (client.readyState === WebSocket.OPEN) {\n      client.send(message);\n    }\n  });\n}\n\n// Usage — zone update goes to everyone:\nbroadcast({\n  type: 'zone_update',\n  center: { x: 400, y: 400 },\n  radius: 300,\n  timeLeft: 60\n});\n// All 100 players receive this at the same time ✅"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — Zone Shrinks, All 100 Players Get Notified"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Server's game timer triggers zone shrink",
  //             desc: "The server's match clock hits the 10-minute mark. Game logic calculates the new zone: center moves to { x: 400, y: 400 }, radius shrinks to 300m. Server creates the zone_update message."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Server calls broadcast(zoneData)",
  //             desc: "The broadcast function kicks in. It JSON.stringify's the zone data. Then it loops through server.clients — that's ALL connected WebSocket connections. For each client, it checks: is the readyState OPEN? If yes — send the message."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — All 100 players receive the zone update simultaneously",
  //             desc: "Player 1 receives it → redraws blue zone on map. Player 2 receives it → redraws blue zone. Player 100 receives it → redraws blue zone. Everyone sees the SAME zone, at the SAME time. This is broadcasting."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "But sometimes you don't want to send to EVERYONE. When you move, the server should tell everyone EXCEPT you — because you already know you moved. This is called broadcasting to others."
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — You Move, 99 Others See It"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — You send a move message to the server",
  //             desc: "Your phone sends: { type: 'move', position: { x: 120, y: 450 } }. Server receives it. Updates your position in the players Map."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Server calls broadcastToOthers(yourSocket, moveData)",
  //             desc: "Server loops through ALL clients. For each one, it checks: is this client the same socket as yours? If YES — skip (you already know you moved). If NO — send the position update."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — 99 players see you move, you don't get your own movement echoed back",
  //             desc: "All 99 other players receive: { type: 'player_moved', playerId: 'player_42', position: { x: 120, y: 450 } }. Their screens update your character's position. You see nothing extra — your client already moved you locally."
  //           },
  //           {
  //             type: "code",
  //             code: "// Broadcast to everyone EXCEPT the sender\nfunction broadcastToOthers(senderSocket, data) {\n  const message = JSON.stringify(data);\n\n  server.clients.forEach((client) => {\n    if (client !== senderSocket && client.readyState === WebSocket.OPEN) {\n      client.send(message);\n    }\n  });\n}\n\n// When a player moves — tell everyone else:\nsocket.on('message', (raw) => {\n  const data = JSON.parse(raw);\n  if (data.type === 'move') {\n    broadcastToOthers(socket, {\n      type: 'player_moved',\n      playerId: playerId,\n      position: data.position\n    });\n  }\n});"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Broadcasting is the backbone of multiplayer games. broadcast() sends to all players (zone updates, match events). broadcastToOthers() sends to everyone except the sender (player movements, actions). Two functions — and you can power an entire game."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Broadcasting to everyone works — but what about squad mode? In BGMI, your squad voice chat should only go to your 4 teammates, not all 100 players. How do we handle multiple groups of clients? That's handling multiple clients."
  //           }
  //         ],

  //         "Handling multiple clients": [
  //           {
  //             type: "paragraph",
  //             text: "A BGMI match isn't just 100 isolated players — it's 25 squads of 4 players each. Some messages should go to your squad only (voice chat, pings). Some should go to nearby players only (footstep sounds). Some go to everyone (zone updates). Managing these different groups of clients is what separates a toy WebSocket server from a real game server."
  //           },
  //           {
  //             type: "heading",
  //             text: "Grouping Players Into Rooms"
  //           },
  //           {
  //             type: "code",
  //             code: "// Room/squad management\nconst squads = new Map();\n\n// When a player connects, assign them to a squad\nserver.on('connection', (socket) => {\n  const playerId = generateId();\n  const squadId = assignToSquad(playerId); // 'squad_01', 'squad_02', etc.\n\n  // Add player to their squad room\n  if (!squads.has(squadId)) {\n    squads.set(squadId, new Set());\n  }\n  squads.get(squadId).add(socket);\n\n  // Send message to squad only:\n  function sendToSquad(squadId, data) {\n    const message = JSON.stringify(data);\n    squads.get(squadId).forEach((memberSocket) => {\n      if (memberSocket.readyState === WebSocket.OPEN) {\n        memberSocket.send(message);\n      }\n    });\n  }\n\n  // Player pings a location — only squad sees it\n  socket.on('message', (raw) => {\n    const data = JSON.parse(raw);\n    if (data.type === 'ping_location') {\n      sendToSquad(squadId, {\n        type: 'teammate_ping',\n        playerId: playerId,\n        location: data.location\n      });\n    }\n  });\n});"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — You Ping a Location, Only Your Squad Sees It"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Match starts. 100 players organized into 25 squads.",
  //             desc: "Server creates 25 entries in the squads Map. Squad_01 has 4 sockets: [Player_1, Player_2, Player_3, Player_4]. Squad_02 has 4 sockets. And so on. Each player's socket is stored ONLY in their squad's Set."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — You (Player_2 in Squad_01) ping a location on the map",
  //             desc: "You tap the map and mark an enemy location. Your phone sends: { type: 'ping_location', location: { x: 450, y: 320 } }. Server receives the message from your socket."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Server calls sendToSquad('squad_01', pingData)",
  //             desc: "Server looks up 'squad_01' in the squads Map. Gets the Set of 4 sockets. Loops through ONLY these 4 sockets — not all 100. Sends the ping data to Player_1, Player_2 (you), Player_3, and Player_4."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Only your 3 teammates see the ping marker",
  //             desc: "Player_1 sees ping on their minimap ✅. Player_3 sees ping on their minimap ✅. Player_4 sees ping on their minimap ✅. The other 96 players? They received NOTHING. They don't even know you pinged. That's targeted messaging."
  //           },
  //           {
  //             type: "code",
  //             code: "Server's squads Map:\n\nsquads = {\n  'squad_01': Set { socket_1, socket_2, socket_3, socket_4 },\n  'squad_02': Set { socket_5, socket_6, socket_7, socket_8 },\n  ...\n  'squad_25': Set { socket_97, socket_98, socket_99, socket_100 }\n}\n\nYou ping a location (you're in squad_01):\n→ sendToSquad('squad_01', pingData)\n→ Only 4 sockets get the message\n→ 96 other sockets? Untouched.\n\nZone update? → broadcast() → all 100 sockets\nSquad ping?  → sendToSquad() → only 4 sockets\nNearby sound? → sendToNearby() → only ~10 sockets"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "The key idea is simple — maintain a Map of groups (squads, rooms, channels) and put each client's socket into the right group. When you need to send a message, look up the group and loop through its members. This is exactly what Socket.IO's 'rooms' feature automates — but here you're seeing the raw logic behind it."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Handling multiple clients = organize sockets into groups, then target your messages. Squad-only messages, nearby-player messages, global broadcasts — all use the same pattern: find the group, loop through sockets, send."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Building all this grouping, broadcasting, and room logic from scratch with raw ws works — but it's a LOT of boilerplate. What if there was a library that gives you rooms, broadcasting, auto-reconnection, and event handling out of the box? That's Socket.IO. Let's compare."
  //           }
  //         ],

  //         "Socket.IO basics vs raw ws": [
  //           {
  //             type: "paragraph",
  //             text: "You've been building everything with the raw ws library — manual broadcasting, manual rooms, manual reconnection logic. It works, but it's a lot of code for common patterns. Socket.IO is a higher-level library built on top of WebSocket that gives you all of these features out of the box. The question is — when do you use which?"
  //           },
  //           {
  //             type: "heading",
  //             text: "The Same Feature — Two Approaches"
  //           },
  //           {
  //             type: "code",
  //             code: "// RAW ws — Broadcasting to a room (manual):\nconst squads = new Map();\nfunction sendToSquad(squadId, data) {\n  const msg = JSON.stringify(data);\n  squads.get(squadId).forEach(s => {\n    if (s.readyState === WebSocket.OPEN) s.send(msg);\n  });\n}\n\n// SOCKET.IO — Broadcasting to a room (built-in):\nio.to('squad_01').emit('teammate_ping', { location: { x: 100, y: 200 } });\n// One line. Done. ✅"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Socket.IO gives you rooms, namespaces, auto-reconnection, acknowledgements (confirm message received), and even a fallback to HTTP long-polling if WebSocket fails. All the stuff you'd have to build yourself with raw ws — Socket.IO hands it to you."
  //           },
  //           {
  //             type: "code",
  //             code: "Feature                  │ raw ws          │ Socket.IO\n─────────────────────────┼─────────────────┼──────────────\nRooms / Groups           │ Build yourself  │ Built-in\nAuto-reconnection        │ Build yourself  │ Built-in\nEvent names              │ Build yourself  │ Built-in\nBroadcasting             │ Manual loop     │ One-liner\nFallback (if WS fails)   │ None            │ HTTP long-poll\nBinary data support      │ Yes             │ Yes\nAcknowledgements         │ Build yourself  │ Built-in\nOverhead / Size          │ Tiny            │ Larger\nRaw performance          │ Faster          │ Slightly slower\nLearning curve           │ Lower level     │ Higher level"
  //           },
  //           {
  //             type: "heading",
  //             text: "Step-by-Step — Choosing Between ws and Socket.IO for a BGMI-Style Game"
  //           },
  //           {
  //             type: "step",
  //             title: "Scenario 1 — You're building a learning project to understand WebSocket",
  //             desc: "Use raw ws. You'll build broadcast(), sendToSquad(), reconnection logic all by hand. It's more code, but you'll understand every single byte flowing through the wire. This is how you truly learn the protocol."
  //           },
  //           {
  //             type: "step",
  //             title: "Scenario 2 — You're building a production chat app with rooms",
  //             desc: "Use Socket.IO. You need rooms (group chats), auto-reconnection (users on flaky mobile networks), broadcasting (send to a room with one line). Socket.IO gives you all of this out of the box. You'd spend weeks building it with raw ws."
  //           },
  //           {
  //             type: "step",
  //             title: "Scenario 3 — You're building a high-performance game server (100 players, 60 updates/sec)",
  //             desc: "Use raw ws. When you need maximum performance and minimum overhead — every byte matters. Socket.IO adds a protocol layer on top of WebSocket (event names, packet IDs, etc.) that adds a few bytes to every message. At 100 players × 60 updates/second = 6,000 messages/sec — those extra bytes add up."
  //           },
  //           {
  //             type: "step",
  //             title: "Scenario 4 — You need to support old browsers or corporate firewalls that block WebSocket",
  //             desc: "Use Socket.IO. It automatically falls back to HTTP long-polling if WebSocket is blocked. Raw ws has no fallback — if WebSocket doesn't work, your app is dead. Socket.IO handles this transparently."
  //           },
  //           {
  //             type: "code",
  //             code: "Quick decision guide:\n\n'I want to learn WebSocket deeply'        → raw ws ✅\n'I need rooms and broadcasting quickly'    → Socket.IO ✅\n'I need maximum raw performance'           → raw ws ✅\n'I need auto-reconnection out of the box'  → Socket.IO ✅\n'I'm building a game with 60fps updates'   → raw ws ✅\n'I'm building a chat app in a weekend'     → Socket.IO ✅\n'I need fallback for old browsers'         → Socket.IO ✅\n'I want to understand the protocol itself' → raw ws ✅"
  //           },
  //           {
  //             type: "info-callout",
  //             text: "🎮 Think of it this way — raw ws is like building a car engine from scratch. You understand every part. Socket.IO is like buying a car. You can drive immediately. For learning, use ws. For production apps, Socket.IO saves you weeks of work."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Use raw ws when you need maximum performance, minimum overhead, or want to learn how WebSocket works at the lowest level. Use Socket.IO when you're building production apps and want rooms, reconnection, and broadcasting without reinventing the wheel."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "🎯 You now know WebSocket from ground zero — what it is, how it compares to HTTP, the full protocol lifecycle, and how to build a real server in Node.js. The foundation is solid. Next up — Socket.IO deep dive, where you'll learn rooms, namespaces, and scaling WebSocket to millions of concurrent connections."
  //           }
  //         ]
  //       }
  //     },

  //     {
  //       id: 5,
  //       title: "Socket.IO",
  //       level: "intermediate",
  //       topics: [
  //         "Socket.IO vs raw WebSocket",
  //         "Rooms & Namespaces",
  //         "Emitting & Listening to Events",
  //         "Broadcasting to Room vs All clients",
  //         "Acknowledgements",
  //         "Fallback to HTTP Long Polling",
  //         "Socket.IO middleware"
  //       ]
  //     },

  //     {
  //       id: 6,
  //       title: "Real-Time Data Sync",
  //       level: "intermediate",
  //       topics: [
  //         "State Synchronization",
  //         "Delta Compression (send only changes)",
  //         "Message Serialization (JSON vs Binary)",
  //         "MessagePack & Protocol Buffers basics",
  //         "Handling out-of-order messages"
  //       ]
  //     },

  //     {
  //       id: 7,
  //       title: "Scaling WebSocket Servers",
  //       level: "intermediate",
  //       topics: [
  //         "Why WebSockets are hard to scale",
  //         "Sticky Sessions with Load Balancer",
  //         "Redis Pub/Sub for multi-server broadcast",
  //         "Socket.IO Redis Adapter",
  //         "Horizontal Scaling of WebSocket servers"
  //       ]
  //     },

  //     {
  //       id: 8,
  //       title: "Performance & Optimization",
  //       level: "experienced",
  //       topics: [
  //         "Binary frames vs Text frames",
  //         "Payload size optimization",
  //         "Batching messages",
  //         "Throttling & Debouncing events",
  //         "Backpressure handling",
  //         "Memory management per connection"
  //       ]
  //     },

  //     {
  //       id: 9,
  //       title: "Security in WebSockets",
  //       level: "experienced",
  //       topics: [
  //         "Authentication over WebSocket (JWT on connect)",
  //         "Origin Validation",
  //         "Rate Limiting WebSocket messages",
  //         "Input Validation on server side",
  //         "DDoS Protection for WebSocket servers",
  //         "Secure WebSocket (wss://) in production"
  //       ]
  //     },

  //     {
  //       id: 10,
  //       title: "Production Architecture",
  //       level: "experienced",
  //       topics: [
  //         "WebSocket Gateway pattern",
  //         "Multi-region WebSocket deployment",
  //         "WebSocket behind AWS API Gateway",
  //         "Using Cloudflare for WebSocket",
  //         "Monitoring WebSocket connections (Prometheus, Grafana)",
  //         "Graceful shutdown & drain connections"
  //       ]
  //     }

  //   ]
  // },
  // {
  //   id: "loadbalancer-booking",
  //   image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Booking.com_Icon_2022.svg",
  //   title: "How Booking.com Handles Millions of Users",
  //   description: "Explore how Booking.com handles massive traffic spikes — from round-robin & least-connections algorithms, NGINX reverse proxy setup, health checks, sticky sessions, to auto-scaling load balancers in cloud environments.",
  //   tags: ["NGINX", "Load Balancer", "Reverse Proxy"],
  //   nodes: [

  //     {
  //       id: 1,
  //       title: "Basics (Foundation)",
  //       level: "freshers",
  //       topics: [
  //         "What is Load Balancer and Why do we need it?",
  //         "What is High Availability — How Booking.com stays online 24/7"
  //       ],
  //       topicDetails: {
  //         "What is Load Balancer and Why do we need it?": [
  //           {
  //             type: "paragraph",
  //             text: "Imagine it's New Year's Eve and you're desperately searching for a hotel in Goa on Booking.com. Now imagine 20 lakh other people doing the exact same thing — same app, same moment, same panic. Any normal system would collapse under that pressure. But Booking.com handles it smoothly, every single time. The secret behind that? Load Balancing."
  //           },


  //           // 🔴 PROBLEM
  //           {
  //             type: "heading",
  //             text: "The Problem — One Server Can't Handle Everything"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Before we understand the solution, let's understand the problem. What actually happens when 20 lakh people hit the same server at the same time?"
  //           },
  //           {
  //             type: "error-callout",
  //             title: "If Booking.com had only ONE server:",
  //             list: [
  //               "20 lakh requests crash into that one server",
  //               "It slows down... lags... then completely crashes",
  //               "Nobody can search hotels, view rooms, or make payments",
  //               "Booking.com loses crores of rupees in just minutes"
  //             ],
  //             footer: "This is called Server Overload — a very real, very expensive problem."
  //           },
  //           { type: "image", src: "traffic.png" },

  //           // 💡 SOLUTION INTRO
  //           {
  //             type: "heading",
  //             text: "So What is a Load Balancer?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Simple answer — instead of one server doing all the work, Booking.com runs many servers doing the same job. And a Load Balancer sits in front of all of them, acting like a smart traffic cop — deciding which server gets which request, so no single server drowns."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "🍔 Think of it like McDonald's on a Sunday. 500 people walk in — instead of one counter handling everyone, the manager opens 10 counters and sends each customer to the free one. That manager? That's your Load Balancer."
  //           },

  //           // ⚙️ HOW IT WORKS - STEP BY STEP
  //           {
  //             type: "heading",
  //             text: "How Does It Actually Work? — Step by Step"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — You search 'Hotels in Goa'",
  //             desc: "You enter your destination, pick your dates, and hit Search. Simple enough, right?"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Your request hits the Load Balancer first",
  //             desc: "Your request never goes directly to a server. It lands on the Load Balancer first — every single time, no exceptions."
  //           },
  //           {
  //             type: "code",
  //             code: "You → Load Balancer → Server A / Server B / Server C"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Load Balancer finds the least busy server",
  //             desc: "It checks all servers in real time and picks the one with the least load:\n\nServer A → 900 requests (busy)\nServer B → 850 requests (busy)\nServer C → 200 requests ← Your request goes here"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Server C responds with your results",
  //             desc: "Server C fetches hotels in Goa and sends results back to you — in milliseconds. You don't feel a thing."
  //           },
  //           { type: "image", src: "load-balancer.png" },
  //           {
  //             type: "success-callout",
  //             text: "✅ 20 lakh users. New Year's Eve. Peak traffic. Booking.com stays fast, smooth, and crash-free. That's Load Balancing doing its job."
  //           },

  //           // 🔀 ADVANCED - SEPARATE LOAD BALANCERS
  //           {
  //             type: "heading",
  //             text: "One More Thing — Booking.com Uses Separate Load Balancers"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Booking.com doesn't use just one Load Balancer for everything. It separates traffic by job — searching, viewing, and paying all have their own lanes."
  //           },
  //           {
  //             type: "code",
  //             code: "Search Hotels  →  Search Load Balancer  →  Search Servers\nView Rooms     →  Rooms Load Balancer   →  Room Servers\nMake Payment   →  Payment Load Balancer →  Payment Servers"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "So even if 1 crore people are searching hotels at once, your payment goes through on its own separate lane — completely unaffected. Smart, right?"
  //           },

  //           // ⚠️ CLIFFHANGER
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ But wait — what if the Load Balancer itself crashes? Or a server dies mid-request? Who saves you then? That's exactly what High Availability solves — coming up next!"
  //           }
  //         ],

  //         "What is High Availability — How Booking.com stays online 24/7": [

  //           // 🎬 HOOK
  //           {
  //             type: "paragraph",
  //             text: "You found the perfect hotel in Goa on Booking.com. ₹12,000 for New Year's Eve. You click 'Pay Now', enter your card details, and hit Confirm. At that exact moment — the payment server crashes. What happens to your ₹12,000? What happens to your booking?"
  //           },

  //           // 🔴 PROBLEM
  //           {
  //             type: "heading",
  //             text: "Servers Do Crash. It's Not If — It's When."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Every server in the world will crash at some point. Hardware fails. Memory overloads. Bugs slip through. The real question is — what happens to the user when it does?"
  //           },
  //           {
  //             type: "error-callout",
  //             title: "If Booking.com had no backup plan:",
  //             list: [
  //               "Payment fails right in the middle of your transaction",
  //               "Money deducted from your account — hotel not booked",
  //               "You see a random error screen with no explanation",
  //               "You call support. They have no idea what happened."
  //             ],
  //             footer: "1 minute of downtime on Booking.com = thousands of lost bookings + crores in losses."
  //           },
  //           { type: "image", src: "HA-problem.png" },

  //           // 💡 SOLUTION INTRO
  //           {
  //             type: "heading",
  //             text: "So What is High Availability?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "High Availability simply means — even if something breaks inside the system, the user never feels it. No error. No downtime. No panic. The app just keeps running like nothing happened."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "🛣️ Think of a highway with 4 lanes. One lane is blocked? Traffic moves to the other 3. The highway never fully shuts down. That's exactly what High Availability does for servers."
  //           },

  //           // ⚙️ HOW IT WORKS
  //           {
  //             type: "heading",
  //             text: "How Does Booking.com Stay Up Even When a Server Crashes?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "They never rely on just one server. Booking.com runs the same payment system on multiple servers simultaneously. If one dies, the others are already running and ready to take over — instantly."
  //           },
  //           { type: "image", src: "paymentserver.png" },
  //           {
  //             type: "paragraph",
  //             text: "But how does the system know when a server dies? It doesn't wait for a human to notice. The Load Balancer pings every server every few seconds — asking one simple question: 'Hey, are you alive?'"
  //           },
  //           {
  //             type: "code",
  //             code: "Every 5 seconds:\n→ Ping Server A ... 200 OK ✅\n→ Ping Server B ... 200 OK ✅\n→ Ping Server C ... ❌ No response\n   Server C marked DOWN. Removed from pool instantly."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "The moment a server stops responding — it's out. All traffic automatically shifts to the healthy ones. No human involvement. No delay. The user never sees a thing."
  //           },

  //           // 🪜 STEP BY STEP - YOUR ₹12,000 STORY
  //           {
  //             type: "heading",
  //             text: "Back to Your ₹12,000 — Here's What Actually Happened"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — You click Pay Now",
  //             desc: "Your ₹12,000 payment request is sent to Payment Server A — the least busy one at that moment."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Server A crashes mid-request",
  //             desc: "Memory overload. Hardware failure. A rogue bug. Server A goes completely dark — mid-transaction."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — System detects it within seconds",
  //             desc: "The Load Balancer pinged Server A. No response. It immediately marks Server A as DOWN and removes it from the pool."
  //           },
  //           {
  //             type: "code",
  //             code: "GET /health → Server A → ❌ Timeout\nServer A = DOWN. Rerouting traffic to Server B..."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Your payment lands on Server B",
  //             desc: "Server B picks up right where Server A left off. Payment goes through. Booking confirmed. ✅"
  //           },
  //           { type: "image", src: "paymentsuccess.jpeg" },
  //           {
  //             type: "success-callout",
  //             text: "✅ You never saw an error. You never even knew Server A crashed. Your booking was confirmed. Your ₹12,000 is safe. That's High Availability — working silently in the background, every single time."
  //           },

  //           // 🖼️ FULL PICTURE
  //           {
  //             type: "heading",
  //             text: "The Full Picture — Load Balancer + High Availability Together"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "These two concepts aren't separate — they work as a team. The Load Balancer distributes traffic smartly. High Availability ensures no crash ever reaches the user. Together, they make Booking.com bulletproof."
  //           },
  //           {
  //             type: "code",
  //             code: "Your Request\n       ↓\n  Load Balancer\n  (splits traffic smartly)\n       ↓\n┌──────────┬──────────┬──────────┐\n│ Server A │ Server B │ Server C │\n└──────────┴──────────┴──────────┘\n       ↓\n Ping every 5s → server dead?\n → Traffic shifts automatically. User feels nothing."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "🎯 Load Balancer handles the traffic. High Availability handles the failures. Together — Booking.com stays alive no matter what."
  //           },

  //           // ⚠️ CLIFFHANGER INTO ALGORITHMS
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ But wait — when 20 lakh users hit Booking.com at the same time, how does the Load Balancer decide who goes to Server A, who goes to Server B, and who goes to Server C? Does it just go one by one? Does it check who's least busy? Does it randomly pick? There are actual algorithms behind this decision — and that's exactly what we're breaking down next."
  //           }
  //         ]
  //       }
  //     },

  //     {
  //       id: 2,
  //       title: "Load Balancing Algorithms",
  //       level: "freshers",
  //       topics: [
  //         "Round Robin",
  //         "Weighted Round Robin",
  //         "Least Connections",
  //         "Least Response Time",
  //         "IP Hash",

  //       ],
  //       topicDetails: {

  //         "Round Robin": [
  //           {
  //             type: "paragraph",
  //             text: "New Year's Eve. 20 lakh users on Booking.com — all searching, filtering, comparing hotels at the same time. Requests are flying in every millisecond. The Load Balancer has 3 servers ready. So — who gets which request?"
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ Does it pick randomly? Does it check which server is free? Or does it just go one by one?"
  //           },
  //           {
  //             type: "heading",
  //             text: "The Simplest Approach — Just Take Turns"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Round Robin does exactly that. No overthinking. No checking server load. Just — next in line, you're up. Request 1 goes to Server A. Request 2 to Server B. Request 3 to Server C. Then back to Server A again. It keeps rotating forever."
  //           },
  //           {
  //             type: "code",
  //             code: "Request 1 → Server A\nRequest 2 → Server B\nRequest 3 → Server C\nRequest 4 → Server A  ← back to start\n... repeats forever"
  //           },
  //           {
  //             type: "heading",
  //             text: "How It Works on Booking.com — Step by Step"
  //           },

  //           {
  //             type: "step",
  //             title: "Step 1 — 3 users search hotels at the same second",
  //             desc: "Ravi, Priya, and Ankit all search Hotels in Goa at the exact same moment on New Year's Eve. Three requests hit the Load Balancer at once."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Load Balancer doesn't think. It just rotates.",
  //             desc: "It doesn't check which server is free. It doesn't check speed. It simply follows the order — Server A, then B, then C."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Every server gets one request. Equal. Done.",
  //             desc: "Ravi goes to Server A. Priya goes to Server B. Ankit goes to Server C. All three servers handled exactly one request each. No server sat idle. No server got overloaded. Simple and fair."
  //           }
  //           ,
  //           {
  //             type: "success-callout",
  //             text: "✅ Simple. Fast. No extra logic needed. Works perfectly when all servers are identical and requests are roughly the same size — like users just browsing and searching hotels."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ But here's the catch — what if Booking.com's servers are NOT identical? Server A has 16GB RAM. Server B has 4GB RAM. Round Robin still sends them equal requests. Server B will choke while Server A sits half-empty. That's unfair — and it causes slowdowns. So what do we do? That's where Weighted Round Robin comes in."
  //           }
  //         ],

  //         "Weighted Round Robin": [
  //           {
  //             type: "paragraph",
  //             text: "Booking.com just upgraded Server A — 16GB RAM, faster CPU, built to handle 3x more traffic. Server B is the old one — 4GB RAM, slower. If Round Robin sends them equal requests, Server B will choke while Server A sits half-empty. Same rotation won't work here."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What if we could tell the Load Balancer — Server A is stronger, give it more requests?"
  //           },
  //           {
  //             type: "heading",
  //             text: "Same Rotation — But Not Equal Turns"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Weighted Round Robin gives each server a weight based on how powerful it is. Higher weight means more requests. Lower weight means fewer. Server A gets weight 3. Server B gets weight 1. So in every cycle of 4 requests — Server A handles 3, Server B handles 1."
  //           },
  //           {
  //             type: "heading",
  //             text: "How It Works on Booking.com — Step by Step"
  //           },

  //           {
  //             type: "step",
  //             title: "Step 1 — 2 users search hotels at the same time",
  //             desc: "Ravi and Priya both hit Search together. Their requests reach the Load Balancer at the same moment."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Load Balancer reads server weights",
  //             desc: "Server A has weight 3 — it can handle more requests. Server B has weight 1 — it handles fewer requests each cycle."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Requests go based on server capacity",
  //             desc: "Ravi's request goes to Server A. Priya's request also goes to Server A because it has higher weight and more capacity."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Pattern continues automatically",
  //             desc: "As more users arrive, Server A keeps receiving more requests while Server B gets fewer. Traffic stays balanced based on server power."
  //           }
  //           ,
  //           {
  //             type: "success-callout",
  //             text: "✅ Booking.com uses this when they have a mix of new and old servers. The powerful ones carry more load. The older ones handle what they can. Nothing goes to waste."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ But weights are set manually — you decide them once and they stay fixed. The Load Balancer never actually checks if Server A is busy or free right now. It just blindly follows the weights. What if Server A is already drowning in 900 heavy requests and Server B is completely free? Weighted Round Robin won't care. It'll still send 3 to Server A. We need something smarter — that's where Least Connections comes in."
  //           }
  //         ],

  //         "Least Connections": [
  //           {
  //             type: "paragraph",
  //             text: "It's peak time on Booking.com. Server A is handling 900 active connections — users mid-booking, filling payment details, waiting for confirmation. Server B just cleared a bunch of requests and is sitting at 200 connections. A new user hits Search. Where should the request go?"
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What if instead of rotating, we just looked at who has the least work right now and sent it there?"
  //           },
  //           {
  //             type: "heading",
  //             text: "Stop Rotating — Start Observing"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Least Connections does exactly that. Before every request, the Load Balancer checks all servers in real time — how many active connections does each one have right now? — and sends the new request to whoever has the least. No rotation. No weights. Just live observation."
  //           },
  //           {
  //             type: "heading",
  //             text: "How It Works on Booking.com — Step by Step"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Ravi clicks Pay Now for his Goa hotel",
  //             desc: "Ravi's payment request hits the Load Balancer. It immediately checks all three servers live. Server A has 900 connections, Server B has 200, Server C has 650. Server B is the least busy — Ravi's payment goes there instantly."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Priya applies heavy filters on hotel search",
  //             desc: "Priya is filtering 500 hotels by price, photos, rating, and availability — a heavy request. Load Balancer checks again. Server B now has 201 connections but is still the least busy. Priya's request goes to Server B."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Server A suddenly clears 700 requests",
  //             desc: "Server A just finished a huge batch. Its connections drop from 900 to 150. Now Ankit's search request comes in. Load Balancer checks — Server A is now the least busy. Ankit goes to Server A. Just like that, traffic shifted automatically."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — This check happens before every single request",
  //             desc: "Not once a minute. Not once a second. Before every request — Load Balancer takes a live snapshot, finds the least busy server, and routes there. Always accurate. No human involved."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Ravi's payment, Priya's heavy search, Ankit's request — all went to whoever had the most breathing room at that exact moment. No guessing. No fixed turns. Just real-time intelligence keeping Booking.com smooth."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ But counting connections isn't the full picture. Server B has 200 connections — but what if they're all slow and heavy, taking 10 seconds each? Server C has 650 connections — but they're all nearly done, responding in 50ms. Least Connections would still pick Server B. And your user waits. We need an algorithm that also measures how fast each server is actually responding — that's Least Response Time."
  //           }
  //         ],

  //         "Least Response Time": [
  //           {
  //             type: "paragraph",
  //             text: "Server B has 200 connections. Server A has 400. Least Connections picks Server B — fewer connections, must be better. But Server B is responding in 800ms — it's struggling, maybe old hardware or a memory issue. Server A is responding in 50ms — fast, healthy, ready. Least Connections just sent your request to the wrong server."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What if the Load Balancer looked at both — how many connections AND how fast each server is actually responding right now?"
  //           },
  //           {
  //             type: "heading",
  //             text: "Pick the Fastest, Not Just the Emptiest"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Least Response Time does exactly this. It combines two signals — active connections and current response speed. The server with the best mix of low connections and fast response wins every request. Not the emptiest. The fastest."
  //           },
  //           {
  //             type: "heading",
  //             text: "How It Works on Booking.com — Step by Step"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Sneha applies a coupon code at checkout",
  //             desc: "Sneha hits Apply on her 20% off coupon. Load Balancer checks all servers — connections and response speed both. Server A has 400 connections but is responding in 50ms. Server B has 200 connections but is taking 800ms. Server A wins. Coupon validates instantly."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Mohit loads 30 room photos for a beachfront suite",
  //             desc: "Heavy request — 30 high quality images. Load Balancer checks again. Server B is now at 820ms and getting worse. Server A is still at 55ms. Even with more connections, Server A is clearly healthier. Mohit's photos go to Server A and load fast."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Server B recovers on its own",
  //             desc: "Server B clears its backlog. Response time drops from 820ms back to 45ms. Now Divya checks room availability for 5 adults. Load Balancer checks — Server B is now the fastest. Divya's request goes to Server B. Traffic shifted automatically the moment Server B recovered."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — No human touched anything",
  //             desc: "No config change. No alert. No engineer woke up at midnight. The Load Balancer noticed Server B was slow, avoided it, and came back to it the moment it recovered. All by itself. In real time."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Sneha's coupon applied instantly. Mohit's photos loaded fast. Divya's availability check came back in milliseconds. Every request went to the fastest, healthiest server at that exact moment — automatically."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ But all 4 algorithms so far — Round Robin, Weighted, Least Connections, Least Response Time — treat every request as brand new. They don't remember who you are. So imagine Karan spent 10 minutes on Booking.com — searched hotels, filtered by pool and breakfast, shortlisted 3 rooms — all saved on Server A. He clicks to view a room. Load Balancer sends him to Server B. Server B has no idea who Karan is. No filters. No shortlist. Everything gone. That's the problem IP Hash was built to solve."
  //           }
  //         ],

  //         "IP Hash": [
  //           {
  //             type: "paragraph",
  //             text: "You spent 10 minutes on Booking.com — searched hotels in Goa, filtered by pool and breakfast, shortlisted 3 options, and finally clicked on the perfect one. All of that is stored on Server A. Now you click View Rooms. The Load Balancer sends this new request to Server B. Server B has never seen you before. No filters. No shortlist. Your entire session is gone."
  //           },
  //           {
  //             type: "error-callout",
  //             title: "Without sticking to the same server:",
  //             list: [
  //               "Your selected filters disappear completely",
  //               "Cart gets wiped mid-booking",
  //               "Login session breaks — you're suddenly logged out",
  //               "Payment flow fails halfway through"
  //             ],
  //             footer: "This is called Session Loss — and it's a terrible user experience."
  //           },
  //           {
  //             type: "heading",
  //             text: "Same User — Always Same Server"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "IP Hash fixes this permanently. Every device on the internet has an IP address — a unique number that identifies it. IP Hash takes that number, runs a simple calculation on it, and always maps that IP to the same server. Same user, same IP, same server — every single time, for the entire session."
  //           },
  //           {
  //             type: "heading",
  //             text: "How It Works on Booking.com — Step by Step"
  //           },
  //           {
  //             type: "step",
  //             title: "Step 1 — Karan opens Booking.com for the first time",
  //             desc: "The moment Karan's first request hits the Load Balancer, it reads his IP address. It runs a quick hash on that IP and maps Karan permanently to Server B for this session. From this point on — every request Karan makes goes to Server B. No exceptions."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 2 — Karan searches, filters, and shortlists hotels",
  //             desc: "Karan searches Hotels in Goa, filters by swimming pool and free breakfast, and shortlists 3 hotels. Every click goes to Server B. Server B builds up everything about Karan — his login, his filters, his shortlist, his browsing history on this session."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 3 — Karan opens a hotel to check room details",
  //             desc: "Karan clicks on a beachfront resort. New request fires. Load Balancer hashes his IP again — same IP, same result, same server. Goes to Server B. Server B already knows Karan. Room details load instantly. Filters are intact. Nothing reset."
  //           },
  //           {
  //             type: "step",
  //             title: "Step 4 — Karan completes payment",
  //             desc: "Karan selects a room, fills in guest details, applies a coupon, and hits Pay Now. All of this — four separate requests — go to Server B automatically. No session breaks. No re-login prompt. No lost cart. Server B had everything from click one. Payment goes through cleanly."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ From first search to payment confirmation — Karan never switched servers once. His filters stayed. His cart stayed. His login stayed. IP Hash kept him on Server B for the entire journey — silently, automatically, without Karan ever knowing it existed."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "💡 Now you know all 5 algorithms. Round Robin for equal servers. Weighted for unequal servers. Least Connections for real-time load. Least Response Time for speed-aware routing. IP Hash for sticky sessions. Each one solves a different problem — and Booking.com uses the right one for the right job."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ But IP Hash creates a new question — Karan is always pinned to Server B. What if Server B crashes right in the middle of his payment? His session was only on Server B. It's gone. The system needs to detect the crash, move Karan to another server, and somehow not lose his session. That's exactly what Stateless vs Stateful systems solve — and that's what's coming next."
  //           }
  //         ]
  //       }
  //     },

  //     {
  //       id: 3,
  //       title: "State Management",
  //       level: "freshers",
  //       topics: [
  //         "Stateless vs Stateful systems",
  //         "Sticky Sessions (Session Affinity)"
  //       ],
  //       topicDetails: {
  //         "Stateless vs Stateful systems": [
  //           {
  //             type: "paragraph",
  //             text: "You're on Booking.com. You log in, search hotels in Goa, apply filters — pool, breakfast included, under ₹8,000. You click on a hotel. Behind the scenes, your request goes to Server A. Now you click 'View Rooms'. This request lands on Server B. Server B has absolutely no memory of who you are or what you just did."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ Does the server remember you between requests? Or does it treat every click like you're a brand new stranger?"
  //           },
  //           {
  //             type: "heading",
  //             text: "Stateless — Every Request Stands Alone"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A Stateless server has no memory. Every request that comes in must carry all the information needed to process it — who you are, what you want, your login token, everything. The server reads it, responds, and immediately forgets you ever existed."
  //           },
  //           {
  //             type: "code",
  //             code: "Request → Server A\n{\n  token: \"user_abc_jwt\",\n  action: \"search\",\n  city: \"Goa\"\n}\n→ Server A responds. Forgets you. Done."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Next request goes to Server B? No problem. Server B reads the same token, understands who you are, handles it. It doesn't need to remember you — because you brought everything it needs."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Stateless is beautiful for Load Balancing — any server can handle any request. No server is tied to any user. Scale up, scale down, swap servers freely."
  //           },
  //           {
  //             type: "heading",
  //             text: "Stateful — The Server Remembers You"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A Stateful server stores your session data in its own memory. It remembers your login, your cart, your filters — everything. But here's the catch — only that one server knows about you. If your next request goes to a different server, it has zero idea who you are."
  //           },
  //           {
  //             type: "code",
  //             code: "Request 1 → Server A\nServer A stores: { user: 'ram', cart: ['Hotel Goa'] }\n\nRequest 2 → Server B\nServer B: ❌ Who is ram? I have no data."
  //           },
  //           {
  //             type: "error-callout",
  //             title: "Stateful servers cause real problems when:",
  //             list: [
  //               "Load Balancer routes your next request to a different server",
  //               "Your server crashes mid-session",
  //               "You're in the middle of checkout and suddenly logged out",
  //               "Scaling up adds new servers — but they have no idea about existing users"
  //             ],
  //             footer: "This is exactly why most modern systems prefer Stateless — but Stateful still has its place."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ So if Stateful is so problematic, why does Booking.com still use it for certain flows like payments? Because some things genuinely need session memory — and that's where Sticky Sessions come in."
  //           }
  //         ],

  //         "Sticky Sessions (Session Affinity)": [
  //           {
  //             type: "paragraph",
  //             text: "You're at the final step on Booking.com — payment page. You've entered your card details. The system is processing. At this exact moment, the Load Balancer sends your next request to a different server. That server has no memory of your payment flow. The transaction breaks. ₹12,000 gone. Booking lost."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What if we could tell the Load Balancer — once a user lands on a server, keep them there for the entire session?"
  //           },
  //           {
  //             type: "heading",
  //             text: "Sticky Sessions — Stay With the Same Server"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Sticky Sessions means the Load Balancer remembers which server you started with — and keeps sending all your requests to that same server for the entire session. You're 'stuck' to your server. On purpose."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "How does it remember? It gives you a cookie the moment you first connect. Every request you make after that carries this cookie. The Load Balancer reads it and routes you to your assigned server — every single time."
  //           },
  //           {
  //             type: "code",
  //             code: "First Request:\nYou → Load Balancer → Server B\nLoad Balancer sets: SERVERID=B (cookie)\n\nAll future requests:\nYou → Load Balancer reads cookie → Server B ✅\nAlways Server B. Until session ends."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Server B already has your payment state, your booking details, your session. Every click from here — confirm room, enter card, hit pay — all goes to Server B. No data loss. No broken flow."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Booking.com uses Sticky Sessions specifically for checkout and payment — where losing session mid-way would be catastrophic. Start on Server B, finish on Server B."
  //           },
  //           {
  //             type: "error-callout",
  //             title: "But Sticky Sessions come with trade-offs:",
  //             list: [
  //               "If Server B crashes, your entire session is lost — cookie is useless now",
  //               "Server B might get overloaded while Server A and C sit idle",
  //               "Hard to scale — new servers don't get existing sticky users"
  //             ],
  //             footer: "Use it only where truly needed — like payment flows. For everything else, go Stateless."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Both Stateless and Sticky Sessions assume the servers are alive and healthy. But what if Server B — the one your entire payment session is stuck to — suddenly goes down? Who notices? How fast? What happens next? That's exactly what Health Checks and Failover handle."
  //           }
  //         ]
  //       }
  //     },

  //     {
  //       id: 4,
  //       title: "Health Checks & Failover",
  //       level: "freshers",
  //       topics: [
  //         "Active health checks",
  //         "Passive health checks",

  //       ],
  //       topicDetails: {
  //         "Active health checks": [
  //           {
  //             type: "paragraph",
  //             text: "Booking.com has 5 payment servers running. Everything looks fine on the dashboard. But Server C — quietly, without any warning — starts running out of memory. It's not fully dead yet. It's just... stuck. Not responding. Users are hitting it. Requests are going in. Nothing is coming back."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ How does the Load Balancer know Server C is sick — before even more users get routed to it?"
  //           },
  //           {
  //             type: "heading",
  //             text: "Don't Wait for a Crash — Go Check"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Active Health Checks means the Load Balancer doesn't wait for something to go wrong. It proactively pings every server at regular intervals — every few seconds — asking one simple question: 'Are you alive and working?'"
  //           },
  //           {
  //             type: "code",
  //             code: "Every 5 seconds:\nGET /health → Server A → 200 OK ✅\nGET /health → Server B → 200 OK ✅\nGET /health → Server C → ❌ Timeout\n\nServer C marked as DOWN.\nRemoved from pool immediately."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Server C didn't fully crash. But it stopped responding to health pings. That's enough. The Load Balancer pulls it out of rotation right away — no more users get sent there."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Active checks catch problems early — before users feel them. The server is removed silently. Traffic shifts to healthy servers. Nobody on Booking.com notices anything."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "And it's not just a basic ping. Booking.com's health check endpoint actually verifies the full system is working — can the server reach the database? Can it process a payment? Is response time acceptable?"
  //           },
  //           {
  //             type: "code",
  //             code: "GET /health\n→ DB connection: ✅\n→ Payment gateway: ✅\n→ Response time: 45ms ✅\n→ Status: 200 OK — All good"
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Active checks go out and ask servers 'are you okay?' — great for catching problems early. But what about failures that happen mid-request — while a user is literally in the middle of a booking? The ping hasn't gone out yet. The next one is 5 seconds away. What catches that?"
  //           }
  //         ],

  //         "Passive health checks": [
  //           {
  //             type: "paragraph",
  //             text: "A user clicks Confirm Booking on Booking.com. The request goes to Server D. Server D accepts it — but then returns a 500 error. Something broke mid-request. The next active health check ping is 4 seconds away. That's 4 seconds of more users still being sent to a broken server."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What if the Load Balancer could detect a sick server just by watching real traffic — without sending any pings at all?"
  //           },
  //           {
  //             type: "heading",
  //             text: "Watch Real Requests — Not Test Pings"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Passive Health Checks don't send any pings. Instead, the Load Balancer silently watches every real request going through. If a server starts throwing errors — 500s, timeouts, failed responses — it notices the pattern and acts."
  //           },
  //           {
  //             type: "code",
  //             code: "Request 1 → Server D → 500 Error ❌\nRequest 2 → Server D → 500 Error ❌\nRequest 3 → Server D → Timeout  ❌\n\n3 failures in a row.\nServer D marked as DOWN. Removed from pool."
  //           },
  //           {
  //             type: "paragraph",
  //             text: "No test ping needed. The real traffic itself revealed the problem. The Load Balancer catches it mid-flight and pulls Server D out before more users are affected."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Passive checks are instant — they react to real failures as they happen, not on a timer. Booking.com uses both active and passive together. Active catches slow degradation early. Passive catches sudden mid-request failures immediately."
  //           },

  //         ]
  //       }
  //     },

  //     {
  //       id: 5,
  //       title: "Networking Layer Understanding",
  //       level: "intermediate",
  //       topics: [
  //         "Layer 4 Load Balancing (TCP/UDP)",
  //         "Layer 7 Load Balancing (HTTP/HTTPS)",
  //       ]
  //     },

  //     {
  //       id: 6,
  //       title: "System Design Level Concepts",
  //       level: "intermediate",
  //       topics: [
  //         "Vertical Scaling",
  //         "Horizontal Scaling",
  //         "Reverse Proxy",
  //         "API Gateway vs Load Balancer",
  //         "Latency vs Throughput",
  //         "Connection pooling",
  //         "Keep-alive mechanism"
  //       ]
  //     },

  //     {
  //       id: 7,
  //       title: "Advanced Traffic Management",
  //       level: "experienced",
  //       topics: [
  //         "Path-based routing",
  //         "Host-based routing",
  //         "Header-based routing",
  //         "Geo Load Balancing",
  //         "Anycast vs DNS routing",
  //         "Rate limiting",
  //         "Throttling",
  //         "Request prioritization"
  //       ]
  //     },

  //     {
  //       id: 8,
  //       title: "Reliability & Failure Handling",
  //       level: "experienced",
  //       topics: [
  //         "Failover",
  //         "Circuit Breaker pattern",
  //         "Retry mechanisms",
  //         "Timeout handling",
  //         "Active-Active setup",
  //         "Active-Passive setup",
  //         "Thundering Herd Problem",
  //         "Cascading failures"
  //       ]
  //     },

  //     {
  //       id: 9,
  //       title: "Security in Load Balancing",
  //       level: "experienced",
  //       topics: [
  //         "SSL/TLS Termination",
  //         "HTTPS offloading",
  //         "DDoS protection basics",
  //         "Web Application Firewall (WAF)",
  //         "IP filtering"
  //       ]
  //     },

  //     {
  //       id: 10,
  //       title: "Cloud & Real Tools",
  //       level: "experienced",
  //       topics: [
  //         "NGINX Load Balancer",
  //         "HAProxy",
  //         "Envoy Proxy",
  //         "AWS ELB / ALB / NLB",
  //         "Cloudflare Load Balancing",
  //         "Kubernetes Ingress Controller"
  //       ]
  //     }

  //   ]
  // },
  // {
  //   id: "streams-nodejs",
  //   image: "https://static.vecteezy.com/system/resources/previews/056/505/637/non_2x/jiohotstar-app-icon-on-transparent-background-free-png.png",
  //   title: "How Jio Hotstar Streams Live matches",
  //   description: "Understand how Jio Hotstar streams live cricket to millions — covering Node.js Readable & Writable streams, backpressure handling, piping, Transform streams, and HLS-based adaptive bitrate streaming for video delivery.",
  //   tags: ["Streams", "Buffers", "HLS"],
  //   nodes: [
  //     {
  //       id: 1,
  //       title: "Basics (Foundation)",
  //       level: "freshers",
  //       topics: [

  //         "What are Streams and why do we need it?",
  //         "Buffer vs Stream",
  //         "Event-driven architecture",
  //       ],
  //       topicDetails: {
  //         "What are Streams and why do we need it?": [
  //           {
  //             type: "paragraph",
  //             text: "You're on Hotstar. You click play on a 2-hour IPL match. The video starts in 2 seconds. But the full match file is 8GB. Hotstar didn't download all 8GB before playing. You're watching byte 1 while byte 50,000,000 is still being fetched. That's a Stream — and without it, modern video platforms simply couldn't exist."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What would actually happen if Hotstar tried to load the entire match file into memory before playing it?"
  //           },
  //           {
  //             type: "heading",
  //             text: "What Happens Without Streams"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Without streams, Hotstar's server would have to read the entire 8GB match file into RAM first, then send it to you. Multiply that by 10 million concurrent viewers during an IPL final — each needing 8GB in RAM simultaneously. That's 80,000 TB of RAM just to serve one match. The server crashes in seconds. Every viewer gets a black screen."
  //           },
  //           {
  //             type: "error-callout",
  //             title: "Without Streams — what Hotstar's server would face:",
  //             list: [
  //               "Read entire 8GB file into RAM before sending even 1 byte",
  //               "10 million viewers = 10 million × 8GB loaded simultaneously",
  //               "Server RAM exhausted instantly — crashes for everyone",
  //               "No video plays until the entire file is loaded — minutes of waiting"
  //             ],
  //             footer: "This is not hypothetical. This is exactly what happens when you use fs.readFile() on large files in Node.js."
  //           },
  //           {
  //             type: "heading",
  //             text: "What is a Stream?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A Stream is a way to handle data piece by piece — called chunks — instead of loading everything at once. Hotstar reads a small chunk of the match file, sends it to your browser, reads the next chunk, sends that. Memory used at any point: just one chunk. Not 8GB. Just a few kilobytes at a time."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "💡 Think of it like a water pipeline. Water from a reservoir doesn't teleport into your tap all at once. It flows continuously through pipes — a little at a time. You get water the moment you open the tap. The reservoir doesn't need to empty into a bucket first. Streams work exactly the same way with data."
  //           },
  //           {
  //             type: "heading",
  //             text: "Streams vs No Streams — Side by Side"
  //           },
  //           {
  //             type: "code",
  //             code: "// ❌ Without Streams — fs.readFile:\n// Loads entire file into RAM first, then sends\nfs.readFile('ipl-match.mp4', (err, data) => {\n  res.end(data)  // 8GB sitting in RAM before 1 byte sent\n})\n\n// ✅ With Streams — fs.createReadStream:\n// Reads and sends chunk by chunk — RAM stays low\nfs.createReadStream('ipl-match.mp4').pipe(res)"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Streams let Hotstar serve millions of viewers simultaneously — using a fraction of the memory. Data flows as it's produced. Users see content instantly. Servers stay alive. That's why every high-scale platform — Hotstar, YouTube, Netflix — is built on streams."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Streams work because Node.js processes data in chunks. But what exactly is a chunk? And what was happening before streams existed — what is a Buffer? Understanding Buffer vs Stream is what makes the rest of this click."
  //           }
  //         ],

  //         "Buffer vs Stream": [
  //           {
  //             type: "paragraph",
  //             text: "Hotstar is sending you an IPL match. The data is travelling from their server to your browser over the network. But networks aren't perfectly smooth — sometimes data arrives faster than your player can render it, sometimes slower. There needs to be a temporary holding area that absorbs the fluctuation. That holding area is a Buffer."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ If Streams send data chunk by chunk — where do those chunks sit while waiting to be processed?"
  //           },
  //           {
  //             type: "heading",
  //             text: "What is a Buffer?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A Buffer is a temporary storage area in memory — a fixed-size chunk of raw binary data. Think of it as a waiting room. Data arrives from the network or file system, sits in the Buffer briefly, gets processed, and then the Buffer is cleared for the next batch. In Node.js, Buffer is a global class that holds raw bytes."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "💡 Think of watching Hotstar on a slow connection. You've seen that spinning loader — 'Buffering...'. That's literally the Buffer filling up. Hotstar is waiting for enough chunks to arrive and sit in the buffer before it can play the next few seconds smoothly. The buffer is absorbing the network inconsistency."
  //           },
  //           {
  //             type: "heading",
  //             text: "Buffer vs Stream — The Core Difference"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A Buffer holds ALL the data in memory at once — waiting until everything is ready before doing anything. A Stream processes data as it arrives — chunk by chunk — without waiting for the whole thing. For small data, Buffer is fine. For large files like match recordings, live streams, or file uploads — Buffer is a memory disaster."
  //           },
  //           {
  //             type: "code",
  //             code: "// Buffer approach — waits for ALL data:\nconst data = fs.readFileSync('match.mp4')\n// 8GB sitting in RAM. Nothing sent yet.\n\n// Stream approach — processes as it arrives:\nconst stream = fs.createReadStream('match.mp4')\nstream.on('data', chunk => {\n  // Process this chunk NOW. Move on. RAM stays low.\n})"
  //           },
  //           {
  //             type: "heading",
  //             text: "How Buffer and Stream Work Together"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Buffers and Streams aren't opposites — they work together. A Stream internally uses Buffers. As Hotstar's server reads the match file, each chunk it reads is temporarily a Buffer. The Stream moves those Buffers along one at a time — processes one, discards it, picks up the next. The Stream is the pipeline. The Buffer is what flows through it."
  //           },
  //           {
  //             type: "code",
  //             code: "// Each 'chunk' inside a stream IS a Buffer:\nfs.createReadStream('match.mp4').on('data', chunk => {\n  console.log(Buffer.isBuffer(chunk))  // → true\n  console.log(chunk.length)            // → 65536 (64KB at a time)\n})"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Buffer = temporary holding area for raw bytes. Stream = the pipeline that moves Buffers along chunk by chunk. Together they let Hotstar stream 8GB match files to millions of users — using only kilobytes of RAM at any moment."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Streams move data in chunks — but how does Node.js know when a chunk has arrived? How does it react without blocking? That's the foundation of how Node.js works — Event-driven architecture. Without understanding events, Stream code looks like magic."
  //           }
  //         ],

  //         "Event-driven architecture": [
  //           {
  //             type: "paragraph",
  //             text: "Hotstar's server is streaming a match to 10 million users simultaneously. It's also accepting new user logins, processing payments, handling chat messages — all at the same time. Node.js runs on a single thread. How does it manage all of this without everything waiting in a queue? The answer is Event-driven architecture — and it's the reason Node.js exists."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ Node.js has only one thread. How does it handle millions of things happening at the same time without freezing?"
  //           },
  //           {
  //             type: "heading",
  //             text: "The Traditional Way — Blocking"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "In a traditional blocking model, when Hotstar's server reads a file, it stops everything and waits. Read file — wait. File done — continue. Next request — wait again. With 10 million users, that means 10 million things all waiting in line. One slow file read blocks everyone behind it."
  //           },
  //           {
  //             type: "error-callout",
  //             title: "Blocking model on Hotstar's scale:",
  //             list: [
  //               "User 1 requests match stream — server starts reading file — blocks",
  //               "User 2 arrives — server is busy — waits",
  //               "User 3, 4, 5... all waiting in line",
  //               "One slow disk read = everyone frozen"
  //             ],
  //             footer: "This is why traditional blocking servers need one thread per user — expensive, doesn't scale."
  //           },
  //           {
  //             type: "heading",
  //             text: "The Event-Driven Way — Non-Blocking"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Node.js never waits. Instead of blocking, it says: 'Start reading the file. When a chunk is ready, fire an event. I'll handle it then.' Meanwhile it goes and handles User 2, User 3, User 4. When the file chunk is ready — the event fires — Node.js handles it instantly. This is the Event Loop."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "💡 Think of a restaurant. A blocking waiter takes User 1's order, stands in the kitchen waiting for the food, brings it back, then goes to User 2. An event-driven waiter takes User 1's order, hands it to the kitchen, immediately goes to User 2, User 3, User 4. When kitchen rings the bell (event fires) — he picks up the food and delivers it. Same one person. 10x the tables served."
  //           },
  //           {
  //             type: "heading",
  //             text: "How This Connects to Streams"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Streams are built entirely on events. When Hotstar's server reads a chunk of the match file — it fires a 'data' event. When the file ends — 'end' event. When something goes wrong — 'error' event. Your code just listens for these events and reacts. Node.js handles the timing."
  //           },
  //           {
  //             type: "code",
  //             code: "const stream = fs.createReadStream('match.mp4')\n\nstream.on('data', chunk => {\n  // 🔔 event fired — chunk is ready\n  res.write(chunk)  // send to user\n})\n\nstream.on('end', () => {\n  // 🔔 event fired — file fully read\n  res.end()\n})\n\nstream.on('error', err => {\n  // 🔔 event fired — something went wrong\n  res.status(500).end()\n})"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Event-driven architecture = don't wait, just listen. Node.js starts a task, registers a listener, moves on. When the task completes — the event fires — the listener runs. This is why one Node.js server can stream matches to 10 million users simultaneously on a single thread."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Streams fire events — but what kind of stream fires what kind of event? Not all streams are the same. Hotstar's server reads a file (Readable), writes a response (Writable), and sometimes does both (Duplex). Each type has a different job — and that's exactly what Types of Streams covers next."
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       id: 2,
  //       title: "Types of Streams",
  //       level: "freshers",
  //       topics: [
  //         "Readable Streams",
  //         "Writable Streams",
  //         "Duplex Streams",
  //         "Transform Streams",
  //       ],
  //       topicDetails: {
  //         "Readable Streams": [
  //           {
  //             type: "paragraph",
  //             text: "Hotstar needs to read an 8GB IPL match file and send it to your browser. It can't load 8GB into RAM. It needs to read the file piece by piece — chunk by chunk — and push each chunk out as soon as it's ready. The stream that reads data and makes it available for consumption is a Readable Stream."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ Who produces the data in a stream? Who's on the 'output' end pushing chunks out — the file system, the network, the database?"
  //           },
  //           {
  //             type: "heading",
  //             text: "What is a Readable Stream?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A Readable Stream is a source of data. It produces data and makes it available to be consumed. You don't push data into it — you read data out of it. On Hotstar's server, the match file is the source. fs.createReadStream reads it chunk by chunk and fires 'data' events as each chunk becomes available."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "💡 A Readable Stream is like a tap. Water (data) flows out of it. You don't put water in — you only take water out. The source (reservoir/file) is behind it. You just open the tap and consume what comes out."
  //           },
  //           {
  //             type: "heading",
  //             text: "Readable Stream in Action — Hotstar File Streaming"
  //           },
  //           {
  //             type: "step",
  //             title: "User clicks Play on Hotstar",
  //             desc: "Server receives the request for the match file."
  //           },
  //           {
  //             type: "step",
  //             title: "Server creates a Readable Stream on the file",
  //             desc: "fs.createReadStream opens the file and starts reading it in chunks — default 64KB per chunk."
  //           },
  //           {
  //             type: "step",
  //             title: "data event fires for each chunk",
  //             desc: "Each 64KB chunk fires a 'data' event. Server sends that chunk to the user immediately."
  //           },
  //           {
  //             type: "step",
  //             title: "end event fires when file is fully read",
  //             desc: "Stream signals completion. Server closes the response. User's player has received the full file — streamed chunk by chunk."
  //           },
  //           {
  //             type: "code",
  //             code: "const fs = require('fs')\n\nconst readable = fs.createReadStream('ipl-match.mp4')\n\nreadable.on('data', chunk => {\n  console.log(`Chunk received: ${chunk.length} bytes`)\n})\n\nreadable.on('end', () => {\n  console.log('File fully read ✅')\n})"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Real-world Readable Streams on Hotstar: fs.createReadStream for match files, HTTP request bodies (incoming upload streams), database query result streams for large datasets, live match score feeds from data providers."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Readable Stream = data source. It produces chunks, fires events, lets you consume data without loading everything into memory. Hotstar reads an 8GB file with kilobytes of RAM at any moment — because of Readable Streams."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Readable Streams produce data — but something has to receive it. When Hotstar reads the match file, where does each chunk go? To the user's browser — through a Writable Stream."
  //           }
  //         ],

  //         "Writable Streams": [
  //           {
  //             type: "paragraph",
  //             text: "Hotstar read a chunk of the match file using a Readable Stream. Now that chunk needs to go somewhere — to the user's browser, to a new file, to a database. The stream that receives data and does something with it is a Writable Stream. If Readable is the tap, Writable is the drain."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ Every chunk that comes out of a Readable Stream has to go somewhere. What receives it, processes it, and decides what to do with it?"
  //           },
  //           {
  //             type: "heading",
  //             text: "What is a Writable Stream?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A Writable Stream is a destination for data. You write chunks into it. It consumes them — sends to network, writes to file, stores in database. On Hotstar's server, the HTTP response object is a Writable Stream. Every chunk read from the match file gets written into the response — which sends it to the user's browser."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "💡 A Writable Stream is like a drain. Water (data) flows into it. You don't take water out — you only pour water in. What happens to that water (where it goes) is the Writable Stream's job — file system, network, database."
  //           },
  //           {
  //             type: "code",
  //             code: "const fs = require('fs')\n\nconst writable = fs.createWriteStream('match-copy.mp4')\n\nwritable.write(chunk1)\nwritable.write(chunk2)\nwritable.end()  // signal: no more data coming\n\nwritable.on('finish', () => {\n  console.log('All chunks written ✅')\n})"
  //           },
  //           {
  //             type: "heading",
  //             text: "Readable + Writable Together — Hotstar's Core Flow"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Hotstar's actual streaming flow connects a Readable and Writable Stream together. The Readable reads the match file chunk by chunk. Each chunk gets written into the Writable HTTP response. The user's browser receives it in real time. This connection between Readable and Writable — that's what pipe() does, which comes up in Piping."
  //           },
  //           {
  //             type: "code",
  //             code: "// Hotstar streaming a match to a user:\nconst readable = fs.createReadStream('ipl-match.mp4')\nreadable.pipe(res)  // res is a Writable Stream\n// Readable feeds into Writable — chunk by chunk ✅"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Writable Stream = data destination. It receives chunks and consumes them. The HTTP response, a new file, a database connection — all Writable Streams. Together with Readable Streams, they form the complete data pipeline."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Readable reads. Writable writes. But what if Hotstar needs a stream that does both — receives data AND sends data? Like a live chat server that both receives messages and broadcasts them. That's a Duplex Stream."
  //           }
  //         ],

  //         "Duplex Streams": [
  //           {
  //             type: "paragraph",
  //             text: "During a live IPL match on Hotstar, there's a live commentary chat — you send messages and receive other users' messages simultaneously. One connection. Data flowing in both directions at the same time. A Readable handles one direction. A Writable handles the other. But what handles both simultaneously? A Duplex Stream."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What kind of stream can both produce data AND consume data at the same time — independently in both directions?"
  //           },
  //           {
  //             type: "heading",
  //             text: "What is a Duplex Stream?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A Duplex Stream is both Readable and Writable at the same time — independently. Data can flow in and data can flow out simultaneously, with no relationship between what goes in and what comes out. The most common real-world Duplex Stream is a TCP socket — the foundation of every network connection."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "💡 Think of a phone call. You speak (write data out) and listen (read data in) simultaneously. What you say has no direct relationship to what you hear — they're independent streams of audio flowing in opposite directions on the same connection. That's a Duplex Stream."
  //           },
  //           {
  //             type: "code",
  //             code: "const net = require('net')\n\n// TCP socket — a real Duplex Stream:\nconst socket = net.createConnection({ port: 3000 })\n\n// Writable side — send data:\nsocket.write('User joined match commentary')\n\n// Readable side — receive data:\nsocket.on('data', chunk => {\n  console.log('Received:', chunk.toString())\n})"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Duplex Streams on Hotstar: WebSocket connections for live chat during matches, TCP connections between Hotstar's microservices, network sockets for real-time score updates, peer-to-peer connections for low-latency streaming."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Duplex = Readable + Writable independently. Data flows both ways simultaneously. TCP sockets, WebSockets, network connections — all Duplex Streams. The two directions are completely independent — what goes in has nothing to do with what comes out."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Duplex has two independent directions. But what if the output IS dependent on the input — you read data, transform it, and output the modified version? Like Hotstar compressing a 1080p stream to 480p for users on slow connections. That's a Transform Stream."
  //           }
  //         ],

  //         "Transform Streams": [
  //           {
  //             type: "paragraph",
  //             text: "A user in a village opens Hotstar on 2G. Sending them the full 1080p match at 8GB would buffer forever. Hotstar's server needs to take the 1080p stream coming in, compress it down to 480p in real time, and send the smaller version out. Data goes in one end, gets modified, comes out the other end. That's a Transform Stream."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What if you need to modify data as it flows through — compress it, encrypt it, convert it — without storing the whole thing first?"
  //           },
  //           {
  //             type: "heading",
  //             text: "What is a Transform Stream?"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "A Transform Stream is a Duplex Stream where the output is directly derived from the input. Data comes in, gets transformed, goes out — chunk by chunk. Unlike Duplex where input and output are independent, in Transform they're connected. What you read out is a modified version of what you wrote in."
  //           },
  //           {
  //             type: "info-callout",
  //             text: "💡 Think of a translation booth at a UN meeting. Speech goes in (English), gets transformed in real time, comes out the other side (Hindi). Same content, different form. Nobody stores the entire speech first — it's transformed as it flows. That's a Transform Stream."
  //           },
  //           {
  //             type: "code",
  //             code: "const zlib = require('zlib')\nconst fs = require('fs')\n\n// Transform Stream — compress match file as it streams:\nfs.createReadStream('match-1080p.mp4')  // data in\n  .pipe(zlib.createGzip())              // transform: compress\n  .pipe(fs.createWriteStream('match-480p.mp4.gz'))  // data out\n// Entire 8GB compressed chunk by chunk — minimal RAM ✅"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Transform Streams Hotstar uses in production: zlib.createGzip() for compressing streams before sending, crypto.createCipher() for encrypting DRM-protected content, custom Transform streams for converting video formats on the fly, JSON parsing streams for large API responses."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Transform = data in → modify → data out. Input and output are linked. Compress, encrypt, convert, parse — all Transform Streams. Hotstar serves 480p to 2G users and 4K to fiber users from the same source file — using Transform Streams in real time."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Four types of streams — each with a specific job. But streams don't work in silence. They communicate through events — 'data', 'end', 'error', 'finish'. Missing even one event listener means missed chunks, silent failures, or memory leaks. Stream Events are what make streams actually controllable."
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       id: 3,
  //       title: "Stream Events & Methods",
  //       level: "freshers",
  //       topics: [
  //         "data, end, error, finish events",
  //         "read(), write(), push(), pipe()",
  //         "Stream lifecycle",
  //         "Flowing vs Paused mode"
  //       ],
  //       topicDetails: {
  //         "data, end, error, finish events": [
  //           {
  //             type: "paragraph",
  //             text: "Hotstar's server is streaming a match. Chunks are flowing. But how does the server know when a chunk arrived? How does it know the file ended? How does it catch a network failure mid-stream without crashing? Streams don't return values — they communicate entirely through events. Miss an event, and the stream fails silently."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ A stream is running in the background asynchronously. How does your code know what's happening — chunk arrived, file done, something broke?"
  //           },
  //           {
  //             type: "heading",
  //             text: "The 4 Core Stream Events"
  //           },
  //           {
  //             type: "heading",
  //             text: "'data' — A chunk is ready"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Fires on Readable Streams every time a new chunk is available. This is where you process each piece — send it to the user, transform it, write it somewhere. Each chunk is a Buffer by default."
  //           },
  //           {
  //             type: "code",
  //             code: "stream.on('data', chunk => {\n  res.write(chunk)  // send this chunk to Hotstar user\n})"
  //           },
  //           {
  //             type: "heading",
  //             text: "'end' — No more data to read"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Fires on Readable Streams when all data has been consumed. The match file has been fully read. Time to close the response, log completion, or trigger the next step."
  //           },
  //           {
  //             type: "code",
  //             code: "stream.on('end', () => {\n  res.end()  // match fully streamed to user ✅\n})"
  //           },
  //           {
  //             type: "heading",
  //             text: "'finish' — All data has been written"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Fires on Writable Streams when all writes are complete and the stream is flushed. Different from 'end' — 'end' is for Readable (done reading), 'finish' is for Writable (done writing)."
  //           },
  //           {
  //             type: "code",
  //             code: "writable.on('finish', () => {\n  console.log('Match recording saved ✅')\n})"
  //           },
  //           {
  //             type: "heading",
  //             text: "'error' — Something went wrong"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "Fires on any stream when an error occurs — file not found, network dropped, disk full. If you don't listen for 'error', Node.js throws an uncaught exception and crashes the entire server. Always handle errors on every stream."
  //           },
  //           {
  //             type: "code",
  //             code: "stream.on('error', err => {\n  console.error('Stream failed:', err.message)\n  res.status(500).end()  // send error to user\n})"
  //           },
  //           {
  //             type: "error-callout",
  //             title: "What happens if you skip the 'error' event:",
  //             list: [
  //               "File not found mid-stream → unhandled error thrown",
  //               "Node.js crashes the entire process",
  //               "All 10 million Hotstar users lose their stream simultaneously",
  //               "Server needs manual restart"
  //             ],
  //             footer: "Always attach an error listener to every stream. No exceptions."
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ data → chunk arrived, process it. end → reading done, close up. finish → writing done, confirm. error → something broke, handle it. Four events. Every stream uses them. Miss one — especially error — and the stream becomes a ticking time bomb."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ Events tell you what happened. But how do you actually control the stream — manually read a chunk, push data in, or connect streams together? That's what read(), write(), push(), and pipe() do."
  //           }
  //         ],

  //         "read(), write(), push(), pipe()": [
  //           {
  //             type: "paragraph",
  //             text: "Events tell you when things happen on a stream. But you also need to actively control streams — manually pull a chunk, push data into a stream, write a chunk out, or connect two streams together. These four methods are the hands-on controls of every stream in Node.js."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ How do you manually control what flows through a stream — read a specific chunk, write data in, push data out, or connect two streams together?"
  //           },
  //           {
  //             type: "heading",
  //             text: "read() — Manually pull a chunk from a Readable"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "read() is used in paused mode — you explicitly ask for the next chunk instead of waiting for 'data' events to fire automatically. Gives you precise control over how fast you consume the stream."
  //           },
  //           {
  //             type: "code",
  //             code: "stream.on('readable', () => {\n  const chunk = stream.read()  // manually pull one chunk\n  if (chunk) res.write(chunk)\n})"
  //           },
  //           {
  //             type: "heading",
  //             text: "write() — Push a chunk into a Writable"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "write() sends a chunk of data into a Writable Stream. Hotstar uses this to write each video chunk into the HTTP response as it arrives from the file stream."
  //           },
  //           {
  //             type: "code",
  //             code: "res.write(chunk)      // send chunk to user's browser\nfile.write(chunk)     // write chunk to disk"
  //           },
  //           {
  //             type: "heading",
  //             text: "push() — Feed data into a custom Readable"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "push() is used when building custom Readable Streams. You push chunks in from your own data source — a database, an API, generated data. push(null) signals the stream is done."
  //           },
  //           {
  //             type: "code",
  //             code: "const { Readable } = require('stream')\nconst liveScores = new Readable({ read() {} })\n\nliveScores.push('CSK: 45/2')   // push live score chunk\nliveScores.push('MI: 67/3')\nliveScores.push(null)           // stream ended"
  //           },
  //           {
  //             type: "heading",
  //             text: "pipe() — Connect Readable directly to Writable"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "pipe() is the most important method. It connects a Readable Stream to a Writable Stream — automatically taking each chunk from the Readable and writing it into the Writable. No manual event handling needed. Hotstar uses this to connect the file read stream directly to the HTTP response."
  //           },
  //           {
  //             type: "code",
  //             code: "// Without pipe — manual and verbose:\nreadable.on('data', chunk => writable.write(chunk))\nreadable.on('end', () => writable.end())\n\n// With pipe — one line:\nreadable.pipe(writable)  // ✅ same result, automatic"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ read() pulls chunks manually. write() sends chunks into a Writable. push() feeds custom Readable Streams. pipe() connects them all automatically. pipe() alone handles 90% of real streaming use cases — including Hotstar's entire video delivery pipeline."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ These methods work differently depending on the stream's current state. A stream isn't always ready to be read from or written to — it moves through different states during its lifetime. Understanding the Stream lifecycle tells you exactly when each method is safe to call."
  //           }
  //         ],

  //         "Stream lifecycle": [
  //           {
  //             type: "paragraph",
  //             text: "A Hotstar stream doesn't just exist and run forever. It's created, it starts flowing, it might pause, it resumes, it ends, it might error and close. Every stream goes through a lifecycle — specific states from birth to completion. Understanding this prevents writing to a closed stream, reading from an unready stream, or missing data because you attached a listener too late."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What states does a stream pass through — and what can go wrong if you interact with it at the wrong state?"
  //           },
  //           {
  //             type: "heading",
  //             text: "Readable Stream Lifecycle"
  //           },
  //           {
  //             type: "step",
  //             title: "Created — stream exists but hasn't started",
  //             desc: "fs.createReadStream() called. File handle opened. No data flowing yet. Listeners not attached yet."
  //           },
  //           {
  //             type: "step",
  //             title: "Flowing — data events firing",
  //             desc: "Once a 'data' listener is attached or .resume() is called, stream enters flowing mode. Chunks fire automatically as fast as the source produces them."
  //           },
  //           {
  //             type: "step",
  //             title: "Paused — data stopped temporarily",
  //             desc: "stream.pause() called or the consumer is too slow. Data production stops. Chunks wait in internal buffer. Will resume when .resume() is called or pipe() manages it automatically."
  //           },
  //           {
  //             type: "step",
  //             title: "Ended — all data consumed",
  //             desc: "push(null) was called internally. 'end' event fires. No more data will ever come from this stream. Stream is done."
  //           },
  //           {
  //             type: "step",
  //             title: "Closed/Destroyed — stream cleaned up",
  //             desc: "'close' event fires. File handles released. Memory freed. Stream cannot be used again."
  //           },
  //           {
  //             type: "heading",
  //             text: "Writable Stream Lifecycle"
  //           },
  //           {
  //             type: "step",
  //             title: "Created — ready to receive data",
  //             desc: "fs.createWriteStream() or res object ready. write() can be called."
  //           },
  //           {
  //             type: "step",
  //             title: "Writing — chunks being processed",
  //             desc: "write() calls accepted. Internally buffered and flushed to destination — disk, network, etc."
  //           },
  //           {
  //             type: "step",
  //             title: "Ending — writable.end() called",
  //             desc: "No more write() calls allowed. Remaining buffered data is flushed out."
  //           },
  //           {
  //             type: "step",
  //             title: "Finished — all data written",
  //             desc: "'finish' event fires. All chunks are on disk or sent over network. Stream done."
  //           },
  //           {
  //             type: "code",
  //             code: "// Lifecycle visible in code:\nconst stream = fs.createReadStream('match.mp4')\n// State: Created\n\nstream.on('data', chunk => { /* State: Flowing */ })\nstream.on('end', () => { /* State: Ended */ })\nstream.on('close', () => { /* State: Closed */ })"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Created → Flowing → Paused → Resumed → Ended → Closed. Every stream follows this path. Knowing where a stream is in its lifecycle tells you exactly what you can do with it — and prevents silent data loss or crashes from calling methods at the wrong time."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ The lifecycle moves between Flowing and Paused states — and this isn't just internal behavior. It directly controls how fast data moves through your pipeline. If Hotstar's stream flows too fast for a slow user's connection, the server could run out of memory. Flowing vs Paused mode is how streams handle this exact problem."
  //           }
  //         ],

  //         "Flowing vs Paused mode": [
  //           {
  //             type: "paragraph",
  //             text: "A Hotstar user on a fast fiber connection can receive 100MB/s. A user on 2G can receive maybe 0.5MB/s. The match file reads at the same speed for both. If Hotstar keeps reading and pushing chunks at full speed for the 2G user — the chunks pile up in memory faster than they can be sent. Eventually the server runs out of RAM. Flowing vs Paused mode is how streams prevent this."
  //           },
  //           {
  //             type: "curious-callout",
  //             text: "❓ What happens when a Readable Stream produces data faster than the Writable Stream can consume it? Who pumps the brakes?"
  //           },
  //           {
  //             type: "heading",
  //             text: "Flowing Mode"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "In Flowing mode, the stream reads data as fast as possible and fires 'data' events continuously. No waiting. No pausing. Data rushes through. This happens automatically as soon as you attach a 'data' listener or call .resume(). Great for fast consumers. Dangerous for slow ones."
  //           },
  //           {
  //             type: "code",
  //             code: "// Flowing mode — triggered by attaching 'data' listener:\nstream.on('data', chunk => {\n  res.write(chunk)  // if res is slow, chunks pile up in memory\n})\n// Stream flows at full speed — no backpressure control"
  //           },
  //           {
  //             type: "heading",
  //             text: "Paused Mode"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "In Paused mode, the stream does nothing until you explicitly call read(). Data waits. No 'data' events fire automatically. You control the pace — read a chunk, process it, read the next. This is the default state before any listener is attached."
  //           },
  //           {
  //             type: "code",
  //             code: "// Paused mode — manual control:\nstream.on('readable', () => {\n  const chunk = stream.read()  // pull only when ready\n  if (chunk) slowWriter.write(chunk)\n})"
  //           },
  //           {
  //             type: "heading",
  //             text: "Backpressure — The Real Problem pipe() Solves"
  //           },
  //           {
  //             type: "paragraph",
  //             text: "When a Readable produces faster than a Writable consumes — chunks pile up in memory. This is called backpressure. pipe() handles this automatically — when the Writable's buffer is full, pipe() pauses the Readable. When the buffer drains, pipe() resumes it. No manual work needed. This is why pipe() is the standard for production streaming."
  //           },
  //           {
  //             type: "code",
  //             code: "// pipe() manages flowing/paused automatically:\nfs.createReadStream('match.mp4').pipe(res)\n// If res (2G user) is slow → stream auto-pauses ✅\n// When res drains → stream auto-resumes ✅\n// RAM stays controlled regardless of user speed ✅"
  //           },
  //           {
  //             type: "success-callout",
  //             text: "✅ Flowing = data rushes out automatically. Paused = you control the pace manually. pipe() switches between them intelligently — pausing when the consumer is slow, resuming when it catches up. This backpressure management is why Hotstar can serve 2G users and fiber users from the same stream without running out of memory."
  //           },
  //           {
  //             type: "warning-callout",
  //             text: "⚠️ pipe() manages backpressure automatically — and it's also how you connect multiple streams together into a pipeline. Read a file, compress it, encrypt it, send it — all in one chain. That's Piping and Chaining, coming up next."
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       id: 4,
  //       title: "Piping & Chaining",
  //       level: "freshers",
  //       topics: [
  //         "pipe() method",
  //         "pipeline() utility",
  //         "Chaining multiple streams",
  //         "Error handling in pipes"
  //       ]
  //     },
  //     {
  //       id: 5,
  //       title: "Buffering & Backpressure",
  //       level: "intermediate",
  //       topics: [
  //         "What is Backpressure?",
  //         "highWaterMark option",
  //         "Handling slow consumers",
  //         "drain event",
  //         "cork() and uncork()"
  //       ]
  //     },
  //     {
  //       id: 6,
  //       title: "Custom Streams",
  //       level: "intermediate",
  //       topics: [
  //         "Implementing custom Readable",
  //         "Implementing custom Writable",
  //         "Implementing custom Transform",
  //         "stream.Readable.from()",
  //         "async generators as streams"
  //       ]
  //     },
  //     {
  //       id: 7,
  //       title: "Streams with File System",
  //       level: "intermediate",
  //       topics: [
  //         "fs.createReadStream()",
  //         "fs.createWriteStream()",
  //         "Streaming large file reads/writes",
  //         "File compression with zlib streams",
  //         "Efficient file copying with pipe"
  //       ]
  //     },
  //     {
  //       id: 8,
  //       title: "Streams with HTTP",
  //       level: "intermediate",
  //       topics: [
  //         "Request & Response as streams",
  //         "Streaming file uploads",
  //         "Streaming file downloads",
  //         "Chunked Transfer Encoding",
  //         "Server-Sent Events (SSE)"
  //       ]
  //     },
  //     {
  //       id: 9,
  //       title: "Advanced Stream Patterns",
  //       level: "experienced",
  //       topics: [
  //         "Object Mode streams",
  //         "Interleaving & merging streams",
  //         "Splitting streams (broadcast)",
  //         "Stream composition patterns",
  //         "Writable stream with batching",
  //         "Throttling stream throughput"
  //       ]
  //     },
  //     {
  //       id: 10,
  //       title: "Streams in Production",
  //       level: "experienced",
  //       topics: [
  //         "Streaming with gzip/brotli compression",
  //         "Streaming CSV/JSON parsing (csv-parse, JSONStream)",
  //         "Streaming with databases (Sequelize, MongoDB cursor)",
  //         "Streams in child_process (stdin/stdout/stderr)",
  //         "WebSockets as Duplex streams",
  //         "Streams in AWS S3 uploads/downloads"
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: "rate-limiting-razorpay",
  //   image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg",
  //   title: "Understand Rate Limiting through Razorpay",
  //   description: "Learn how Razorpay protects its payment APIs — from fixed & sliding window algorithms, token bucket rate limiting, Redis-based distributed counters, to DDoS protection and customer-tier throttling in production.",
  //   tags: ["Rate Limiting", "Redis", "DDoS"],
  //   nodes: [

  //     // FRESHERS - Node.js Implementation
  //     {
  //       id: 1,
  //       title: "Basics (Foundation)",
  //       level: "freshers",
  //       topics: [
  //         "What is Rate Limiting?",
  //         "Why Rate Limiting is needed?",
  //         "Without Rate Limiting — What goes wrong?",
  //         "Where is Rate Limiting applied?",
  //         "Client-side vs Server-side Rate Limiting"
  //       ]
  //     },

  //     {
  //       id: 2,
  //       title: "Core Concepts & Algorithms",
  //       level: "freshers",
  //       topics: [
  //         "Fixed Window Algorithm",
  //         "Sliding Window Algorithm",
  //         "Token Bucket Algorithm",
  //         "Leaky Bucket Algorithm",
  //       ]
  //     },

  //     {
  //       id: 3,
  //       title: "Rate Limiting in Node.js",
  //       level: "freshers",
  //       topics: [
  //         "express-rate-limit setup",
  //         "Limiting by IP Address",
  //         "Limiting by User ID",
  //         "Custom Rate Limit Rules",
  //         "Returning 429 Too Many Requests",
  //         "Rate Limit Headers (X-RateLimit-*)"
  //       ]
  //     },

  //     {
  //       id: 4,
  //       title: "Rate Limiting with Redis",
  //       level: "freshers",
  //       topics: [
  //         "Why Redis for Rate Limiting?",
  //         "Storing counters in Redis",
  //         "TTL based expiry in Redis",
  //         "rate-limiter-flexible library",
  //         "Distributed Rate Limiting basics"
  //       ]
  //     },

  //     // INTERMEDIATE - System Design
  //     {
  //       id: 5,
  //       title: "Designing Rate Limiters",
  //       level: "intermediate",
  //       topics: [
  //         "Rate Limiting at API Gateway level",
  //         "Per User vs Per IP vs Per Endpoint",
  //         "Global vs Local Rate Limiting",
  //         "Soft Limit vs Hard Limit",
  //         "Burst Allowance & Throttling"
  //       ]
  //     },

  //     {
  //       id: 6,
  //       title: "Rate Limiting in Distributed Systems",
  //       level: "intermediate",
  //       topics: [
  //         "Why single server rate limiting fails at scale",
  //         "Centralized vs Decentralized Rate Limiting",
  //         "Redis Cluster for Rate Limiting",
  //         "Race Conditions in distributed counters",
  //         "Lua scripts in Redis for atomicity"
  //       ]
  //     },


  //     // ADVANCED - Production Architecture
  //     {
  //       id: 7,
  //       title: "Rate Limiting at Scale",
  //       level: "experienced",
  //       topics: [
  //         "Rate Limiting at Load Balancer (NGINX, HAProxy)",
  //         "Rate Limiting at CDN level (Cloudflare)",
  //         "AWS API Gateway throttling",
  //         "Kong API Gateway rate limiting plugin",
  //         "Rate Limiting with Service Mesh (Istio)"
  //       ]
  //     },

  //     {
  //       id: 8,
  //       title: "Security & DDoS Protection",
  //       level: "experienced",
  //       topics: [
  //         "Rate Limiting vs DDoS Protection",
  //         "Bot Detection & Rate Limiting",
  //         "IP Reputation based limiting",
  //         "Adaptive Rate Limiting",
  //         "Rate Limiting + WAF (Web Application Firewall)"
  //       ]
  //     },

  //     {
  //       id: 9,
  //       title: "Production Best Practices",
  //       level: "experienced",
  //       topics: [
  //         "Monitoring Rate Limit breaches (Prometheus, Grafana)",
  //         "Alerting on suspicious traffic spikes",
  //         "Rate Limit Bypass prevention",
  //         "Multi-region Rate Limiting",
  //         "Customer-tier based Rate Limiting (Free vs Pro vs Enterprise)"
  //       ]
  //     }

  //   ]
  // },
  ,
  {
    id: "nodejs-internals-uber",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    title: "Understand How Node.js Works through Uber",
    description: "Discover why Uber chose Node.js — deep dive into the event loop, call stack, microtask queue, async/await internals, libuv thread pool, non-blocking I/O, and how Node.js handles thousands of concurrent ride requests.",
    tags: ["Event Loop", "libuv", "V8 Engine"],
    nodes: [

      // FRESHERS - Core Internals
      {
        "id": 1,
        "title": "Basics (Foundation)",
        "level": "freshers",
        "topics": [
          "What is Node.js?",
          "Single vs Multi Threaded",
          "Blocking vs Non Blocking / Synchronous vs Asynchronous",

        ],
        "topicDetails": {
          "What is Node.js?": [
            {
              "type": "paragraph",
              "text": "You open MakeMyTrip during Diwali vacation season. You search 'Mumbai to Delhi'. Within 2 seconds — flights appear, prices update live, seats disappear in real time, discount coupons apply instantly. Ever wondered what powers all this behind the scenes? That's Node.js."
            },
            {
              "type": "curious-callout",
              "text": "❓ How does MakeMyTrip talk to airlines, hotels, payment gateways, and lakhs of users simultaneously without crashing?"
            },
            {
              "type": "heading",
              "text": "Before Node.js — JavaScript Was Stuck Inside Browsers"
            },
            {
              "type": "paragraph",
              "text": "Originally, JavaScript could only run inside browsers like Chrome or Firefox. It could make buttons clickable and update webpages — but it could not run a backend server."
            },
            {
              "type": "error-callout",
              "title": "Without Node.js:",
              "list": [
                "JavaScript could not connect to airline APIs",
                "JavaScript could not process payments",
                "JavaScript could not store bookings in databases",
                "JavaScript could not send OTPs or booking confirmations",
                "MakeMyTrip would need separate frontend and backend languages"
              ],
              "footer": "JavaScript was powerful — but trapped inside the browser."
            },
            {
              "type": "heading",
              "text": "Then Node.js Changed Everything"
            },
            {
              "type": "paragraph",
              "text": "Node.js allowed JavaScript to run on servers. Suddenly the same language running inside Chrome could now power entire backend systems."
            },
            {
              "type": "info-callout",
              "text": "💡 Think of JavaScript like a travel agent. Earlier, the agent could only sit at the customer desk (browser). Node.js opened a huge backend office where the same agent now handles flights, hotels, payments, and bookings."
            },
            {
              "type": "code",
              "code": "// Before Node.js\nJavaScript → Browser only\n\n// After Node.js\nJavaScript → Browser + Server"
            },
            {
              "type": "heading",
              "text": "What Happens When You Search Flights on MakeMyTrip"
            },
            {
              "type": "step",
              "title": "Step 1 — You enter Mumbai → Delhi",
              "desc": "You select departure city, destination, travel date, and click Search."
            },
            {
              "type": "step",
              "title": "Step 2 — Request reaches Node.js server",
              "desc": "Your phone sends the request to MakeMyTrip's backend. Node.js receives it instantly."
            },
            {
              "type": "step",
              "title": "Step 3 — Node.js starts multiple tasks together",
              "desc": "Node.js now contacts airline APIs, hotel systems, pricing engines, and discount systems simultaneously."
            },
            {
              "type": "step",
              "title": "Step 4 — Airline APIs are contacted",
              "desc": "IndiGo, Air India, Vistara, Akasa, SpiceJet — all receive requests at the same time asking for flight prices and seat availability."
            },
            {
              "type": "step",
              "title": "Step 5 — Node.js does NOT wait",
              "desc": "Instead of waiting for one airline to respond, Node.js immediately starts handling requests from other users."
            },
            {
              "type": "step",
              "title": "Step 6 — Other users continue using MakeMyTrip",
              "desc": "At the same moment, thousands of other users are booking hotels, checking buses, applying coupons, and making payments."
            },
            {
              "type": "step",
              "title": "Step 7 — Airline APIs start responding",
              "desc": "IndiGo responds first with 12 flights. Air India responds with 8 flights. Vistara sends premium fare options."
            },
            {
              "type": "step",
              "title": "Step 8 — Node.js combines everything",
              "desc": "Node.js merges all airline responses into one clean flight list."
            },
            {
              "type": "step",
              "title": "Step 9 — Smart processing happens",
              "desc": "Flights are sorted by cheapest price, shortest duration, or best timings. Discounts and coupons are applied automatically."
            },
            {
              "type": "step",
              "title": "Step 10 — Results appear on your screen",
              "desc": "Within 2 seconds, you see dozens of live flight options."
            },
            {
              "type": "success-callout",
              "text": "✅ Node.js handled thousands of slow airline API calls without freezing the server."
            },
            {
              "type": "heading",
              "text": "Now Imagine Booking the Flight"
            },
            {
              "type": "step",
              "title": "Step 1 — You click Book Now",
              "desc": "Node.js immediately starts the booking workflow."
            },
            {
              "type": "step",
              "title": "Step 2 — Seat gets locked",
              "desc": "Node.js asks the airline to temporarily reserve your seat so nobody else books it."
            },
            {
              "type": "step",
              "title": "Step 3 — Payment starts",
              "desc": "Node.js contacts Razorpay/Paytm/payment gateway to process your payment."
            },
            {
              "type": "step",
              "title": "Step 4 — Booking gets confirmed",
              "desc": "Once payment succeeds, Node.js confirms the ticket with the airline."
            },
            {
              "type": "step",
              "title": "Step 5 — PNR gets generated",
              "desc": "Airline sends back booking confirmation and PNR number."
            },
            {
              "type": "step",
              "title": "Step 6 — Notifications are triggered",
              "desc": "Node.js sends SMS, email confirmation, invoice PDF, and app notification simultaneously."
            },
            {
              "type": "info-callout",
              "text": "💡 All these tasks happen in parallel — not one by one."
            },
            {
              "type": "heading",
              "text": "Why MakeMyTrip Loves Node.js"
            },
            {
              "type": "table",
              "headers": ["Problem", "How Node.js Helps"],
              "rows": [
                ["Thousands of users searching together", "Handles huge concurrent traffic"],
                ["Slow airline APIs", "Non-blocking async requests"],
                ["Real-time price updates", "Fast event-driven architecture"],
                ["Payments + notifications together", "Runs tasks in parallel"],
                ["High traffic during holidays", "Efficient memory usage"],
                ["Need fast responses", "Very low latency"]
              ]
            },
            {
              "type": "code",
              "code": "// What MakeMyTrip's Node.js server may be doing simultaneously\n\nUser 1 -> Searching Mumbai flights\nUser 2 -> Booking Goa hotel\nUser 3 -> Cancelling ticket\nUser 4 -> Making payment\nUser 5 -> Applying coupon\nUser 6 -> Downloading invoice\n\n// All handled together using Node.js"
            },
            {
              "type": "heading",
              "text": "The Biggest Superpower of Node.js"
            },
            {
              "type": "paragraph",
              "text": "Node.js is extremely good at handling I/O tasks — tasks where the server spends most of its time waiting for APIs, databases, payments, or external systems."
            },
            {
              "type": "info-callout",
              "text": "💡 Flight booking systems are mostly waiting systems. Waiting for airlines. Waiting for payments. Waiting for databases. Node.js shines exactly in these situations."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ But this creates another important question — if Node.js uses one single thread, how does it handle lakhs of users simultaneously without freezing? That's exactly what Single Threaded vs Multi Threaded explains next."
            },
            {
              "type": "success-callout",
              "text": "✅ Node.js is simply JavaScript running on the server. Simple idea — powering massive systems like MakeMyTrip every second."
            }
          ],
          "Single vs Multi Threaded": [
            {
              "type": "paragraph",
              "text": "Imagine 1 lakh people trying to book flights on MakeMyTrip during Diwali sale night. Flights are disappearing every second. Prices are changing constantly. How does the server handle so many people at the same time without crashing?"
            },
            {
              "type": "curious-callout",
              "text": "❓ Does MakeMyTrip create 1 lakh workers for 1 lakh users? Or is there a smarter way?"
            },
            {
              "type": "heading",
              "text": "First — What is a Thread?"
            },
            {
              "type": "paragraph",
              "text": "A thread is like a worker inside the server. That worker picks up a task, does the work, then moves to the next task."
            },
            {
              "type": "info-callout",
              "text": "💡 Think of a thread like a travel agent at MakeMyTrip support desk. One agent can help one customer at a time."
            },
            {
              "type": "heading",
              "text": "The Multi Threaded Approach"
            },
            {
              "type": "paragraph",
              "text": "In a multi threaded system, every user request gets its own dedicated worker."
            },
            {
              "type": "step",
              "title": "Step 1 — Rahul searches for flights",
              "desc": "Server creates Thread 1 for Rahul. Thread 1 asks airline APIs for ticket prices from Mumbai to Delhi."
            },
            {
              "type": "step",
              "title": "Step 2 — Airline APIs are slow",
              "desc": "Thread 1 now waits for Indigo, Air India, and Vistara APIs to respond. During this time, the thread is doing absolutely nothing."
            },
            {
              "type": "step",
              "title": "Step 3 — Priya searches for hotels",
              "desc": "Server creates Thread 2 for Priya. Thread 2 asks hotel databases for room availability."
            },
            {
              "type": "step",
              "title": "Step 4 — Thread 2 also waits",
              "desc": "Hotel database is slow. Thread 2 sits idle waiting for results."
            },
            {
              "type": "step",
              "title": "Step 5 — Thousands of users arrive",
              "desc": "50,000 users start searching flights and hotels during Diwali sale."
            },
            {
              "type": "step",
              "title": "Step 6 — Server creates 50,000 threads",
              "desc": "Each user gets a dedicated worker thread. Most threads are just waiting for APIs and databases."
            },
            {
              "type": "error-callout",
              "title": "What goes wrong?",
              "list": [
                "50,000 threads consume massive memory",
                "Most threads sit idle waiting",
                "Context switching between threads becomes expensive",
                "CPU wastes time managing threads instead of serving users",
                "Server memory explodes under heavy traffic"
              ],
              "footer": "Too many workers become the problem itself."
            },
            {
              "type": "heading",
              "text": "The Single Threaded Way — How Node.js Handles It"
            },
            {
              "type": "paragraph",
              "text": "Node.js uses one main thread. But that thread never waits for slow tasks."
            },
            {
              "type": "info-callout",
              "text": "💡 Instead of hiring 50,000 travel agents, MakeMyTrip hires one super-fast dispatcher who keeps assigning work and never stops moving."
            },
            {
              "type": "step",
              "title": "Step 1 — Rahul searches for flights",
              "desc": "Single thread receives Rahul's request."
            },
            {
              "type": "step",
              "title": "Step 2 — Node.js fires airline API requests",
              "desc": "Node.js sends requests to Indigo, Air India, and Vistara APIs."
            },
            {
              "type": "step",
              "title": "Step 3 — Node.js DOES NOT WAIT",
              "desc": "Instead of sitting idle, the thread immediately moves to the next user."
            },
            {
              "type": "step",
              "title": "Step 4 — Priya searches hotels",
              "desc": "Same thread instantly handles Priya's request and fires hotel availability queries."
            },
            {
              "type": "step",
              "title": "Step 5 — Aman searches trains",
              "desc": "Same thread now handles train booking queries."
            },
            {
              "type": "step",
              "title": "Step 6 — APIs respond later",
              "desc": "Whenever airline or hotel APIs respond, Node.js picks up the response and sends results back to users."
            },
            {
              "type": "step",
              "title": "Step 7 — Diwali Sale Spike",
              "desc": "Even if 1 lakh users arrive, Node.js keeps firing requests asynchronously instead of creating 1 lakh waiting workers."
            },
            {
              "type": "success-callout",
              "text": "✅ One thread handles massive traffic because it never blocks waiting for slow databases or APIs."
            },
            {
              "type": "heading",
              "text": "Why This Saves So Much Memory"
            },
            {
              "type": "step",
              "title": "Multi Threaded Memory Usage",
              "desc": "1 thread ≈ 1MB memory. 50,000 users = 50GB memory."
            },
            {
              "type": "step",
              "title": "Single Threaded Memory Usage",
              "desc": "Each async callback uses only tiny memory. 50,000 users may consume only a few hundred MB."
            },
            {
              "type": "info-callout",
              "text": "💡 Node.js wins because waiting requests don't occupy expensive worker threads."
            },
            {
              "type": "code",
              "code": "// Multi Threaded\nRahul Request  -> Thread 1 -> waiting...\nPriya Request  -> Thread 2 -> waiting...\nAman Request   -> Thread 3 -> waiting...\n\n// Thousands of waiting threads\n// Huge memory usage\n// Server slows down\n\n\n// Node.js Single Threaded\nRahul Request -> Fire API request -> Move on\nPriya Request -> Fire DB request  -> Move on\nAman Request  -> Fire API request -> Move on\n\n// APIs respond later\n// Thread handles responses one by one\n// No waiting. No huge memory usage."
            },
            {
              "type": "table",
              "headers": ["Aspect", "Multi Threaded", "Single Threaded (Node.js)"],
              "rows": [
                ["Worker Model", "1 worker per request", "1 event loop for all requests"],
                ["Waiting Strategy", "Worker waits idle", "Thread never waits"],
                ["Memory Usage", "Very high", "Very low"],
                ["Handling 1 lakh users", "Can crash server", "Handles efficiently"],
                ["Best For", "CPU-heavy work", "I/O-heavy apps"],
                ["MakeMyTrip Operations", "❌ Not ideal", "✅ Perfect fit"],
                ["Flight/Hotel APIs", "Threads blocked waiting", "Async non-blocking calls"],
                ["Scalability", "Expensive", "Efficient"]
              ]
            },
            {
              "type": "heading",
              "text": "But Wait — Is Single Thread Always Better?"
            },
            {
              "type": "paragraph",
              "text": "Not always. Node.js is amazing for I/O-heavy tasks like booking systems, APIs, chats, and payments. But if one task becomes CPU heavy — like video rendering or huge calculations — the single thread can freeze."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ If one heavy calculation blocks the single thread, all users start waiting. That's why understanding Blocking vs Non-Blocking is extremely important."
            }
          ],
          "Blocking vs Non Blocking / Synchronous vs Asynchronous": [
            {
              "type": "paragraph",
              "text": "You search flights on MakeMyTrip. The server now has to contact airline APIs to fetch ticket prices and seat availability. While those airline systems are responding, what happens to other users searching flights? Does the server stop and wait? Or does it continue handling everyone else? That's the difference between Blocking and Non-Blocking."
            },
            {
              "type": "curious-callout",
              "text": "❓ While MakeMyTrip is waiting for airline responses for Rahul, what happens to Priya's hotel booking request?"
            },
            {
              "type": "heading",
              "text": "Blocking — The Server Stops Everything"
            },
            {
              "type": "paragraph",
              "text": "In blocking code, the server waits for one task to finish before doing anything else."
            },
            {
              "type": "step",
              "title": "Rahul searches flights",
              "desc": "Rahul searches Mumbai to Delhi flights. Server contacts airline APIs for prices and seat availability."
            },
            {
              "type": "step",
              "title": "Server starts waiting",
              "desc": "The airline API is slow. Server waits for the response. During this time, it does nothing else."
            },
            {
              "type": "step",
              "title": "Priya searches hotels",
              "desc": "Priya searches Goa hotels. But the server is still busy waiting for Rahul's airline response."
            },
            {
              "type": "step",
              "title": "Requests start piling up",
              "desc": "Meanwhile thousands of other users continue searching flights, hotels, buses, and trains."
            },
            {
              "type": "step",
              "title": "Airline API finally responds",
              "desc": "Only after Rahul's airline data returns does the server finally start handling Priya's request."
            },
            {
              "type": "error-callout",
              "title": "What goes wrong in blocking systems?",
              "list": [
                "One slow airline API freezes the server",
                "Other users are forced to wait",
                "Requests pile up rapidly during traffic spikes",
                "App feels slow and unresponsive",
                "High traffic sales can crash the system"
              ],
              "footer": "One waiting request blocks everyone behind it."
            },
            {
              "type": "code",
              "code": "// BLOCKING CODE\nconst flights = airlineAPI.getFlightsSync();\n\n// Server waits here\n// Priya's hotel search is waiting\n// Other users are waiting too\n\nshowFlights(flights);"
            },
            {
              "type": "heading",
              "text": "Non-Blocking — The Server Keeps Moving"
            },
            {
              "type": "paragraph",
              "text": "In non-blocking systems, the server starts the slow task and immediately moves on to handle other users."
            },
            {
              "type": "step",
              "title": "Rahul searches flights",
              "desc": "Node.js sends requests to airline APIs for Rahul's flight search."
            },
            {
              "type": "step",
              "title": "Node.js does NOT wait",
              "desc": "Instead of waiting for airline responses, Node.js immediately becomes free again."
            },
            {
              "type": "step",
              "title": "Priya searches hotels",
              "desc": "The same thread instantly handles Priya's hotel search request."
            },
            {
              "type": "step",
              "title": "More users continue arriving",
              "desc": "Thousands of users continue booking tickets, applying coupons, checking buses, and making payments."
            },
            {
              "type": "step",
              "title": "Airline APIs respond later",
              "desc": "Whenever airline APIs send flight data back, Node.js picks up the response and sends results to Rahul."
            },
            {
              "type": "step",
              "title": "Everyone gets handled smoothly",
              "desc": "Rahul gets flight results. Priya gets hotel listings. Other users continue using the app normally."
            },
            {
              "type": "success-callout",
              "text": "✅ Non-blocking systems don't freeze while waiting. They keep serving other users continuously."
            },
            {
              "type": "info-callout",
              "text": "💡 Blocking is like a MakeMyTrip support agent staying on hold with one airline for 2 minutes while ignoring every other customer. Non-Blocking is like putting the airline call on hold and continuing to help everyone else."
            },
            {
              "type": "code",
              "code": "// NON-BLOCKING CODE\nairlineAPI.getFlights((flights) => {\n   showFlights(flights);\n});\n\n// Node.js immediately moves on\n// Priya's request is handled instantly\n// Thousands of users continue normally"
            },
            {
              "type": "table",
              "headers": ["Aspect", "Blocking", "Non-Blocking"],
              "rows": [
                ["While waiting", "Server freezes", "Server keeps working"],
                ["Other users", "Must wait", "Handled immediately"],
                ["Airline API delays", "Freeze the app", "Run in background"],
                ["Traffic spikes", "System slows badly", "Handles smoothly"],
                ["User experience", "Feels laggy", "Feels fast"],
                ["Node.js default", "❌", "✅"]
              ]
            },
            {
              "type": "heading",
              "text": "Why Node.js Uses Non-Blocking"
            },
            {
              "type": "paragraph",
              "text": "Applications like MakeMyTrip spend most of their time waiting — waiting for airlines, hotels, payment gateways, and databases. Node.js avoids wasting time during these waits."
            },
            {
              "type": "info-callout",
              "text": "💡 Node.js is designed for systems where thousands of users are constantly waiting for external APIs and databases."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ But if Node.js keeps moving without waiting — who remembers Rahul's airline response when it comes back later? That's handled by the Event Loop — the brain behind Node.js asynchronous behavior."
            }
          ]


        },
      },
      {
        "id": 2,
        "title": "Event Loop",
        "level": "freshers",
        "topics": [
          "What is the Event Loop and How does it works ?",
        ],
        "topicDetails": {
          "What is the Event Loop and How does it works ?": [
            {
              "type": "paragraph",
              "text": "Raj searches Mumbai to Delhi. Priya books a flight to Goa. 50,000 others are browsing deals at the same time. Node.js has one thread. So how does it handle all of them without missing one? Four things work together — Call Stack, Node APIs, Callback Queue, and Microtask Queue. Let's walk through exactly what happens when Raj clicks 'Pay Now' on MakeMyTrip."
            },
            {
              "type": "curious-callout",
              "text": "❓ One thread, lakhs of payment requests — what's actually happening inside Node.js step by step?"
            },
            {
              "type": "heading",
              "text": "1. Call Stack — The Active Worker"
            },
            {
              "type": "paragraph",
              "text": "The Call Stack is where Node.js actually runs code. One task at a time. Think of it as MakeMyTrip's booking agent — picks up a request, gives instructions, and moves on immediately without waiting."
            },
            {
              "type": "step",
              "title": "Step 1 — Raj clicks 'Pay Now'",
              "desc": "Raj selects his Mumbai-Delhi flight and clicks Pay Now. The Call Stack picks up his payment request instantly and starts processing it — validating the booking amount, checking the coupon code, preparing the payment data."
            },
            {
              "type": "step",
              "title": "Step 2 — Hits a slow task",
              "desc": "Call Stack needs to charge Raj's card — that means calling Razorpay's payment gateway API. That network call could take 200-400ms. The Call Stack can't sit and wait that long. So it hands the payment API call off immediately and clears itself."
            },
            {
              "type": "step",
              "title": "Step 3 — Already on Priya's request",
              "desc": "Call Stack didn't wait even one millisecond. It's already picked up Priya's flight booking request and doing the same thing. This is why MakeMyTrip never freezes even during peak sale hours."
            },
            {
              "type": "info-callout",
              "text": "💡 Call Stack = MakeMyTrip's booking agent. Takes your payment request, fires it to Razorpay, hangs up immediately — never stays on hold waiting for the bank to respond."
            },
            {
              "type": "heading",
              "text": "2. Node APIs — The Background Workers"
            },
            {
              "type": "paragraph",
              "text": "When the Call Stack hands off Raj's payment — Node APIs take over and process it silently in the background. The Razorpay API call, seat inventory lock, GST calculation — all happening while the Call Stack is already handling new requests."
            },
            {
              "type": "step",
              "title": "Step 4 — Payment API call runs in background",
              "desc": "Node APIs take Raj's Razorpay request and fire it to the payment gateway. The Call Stack has no idea — it's already processing its 500th booking request. Raj's payment is sitting with the bank, waiting for approval."
            },
            {
              "type": "step",
              "title": "Step 5 — Multiple things happen in parallel",
              "desc": "At the same time — Priya's seat is being locked in Air India's inventory, Sara's refund is being processed by the bank, coupon validations for 200 users are running. All in the background. All parallel. None of them blocking each other."
            },
            {
              "type": "info-callout",
              "text": "💡 Node APIs = MakeMyTrip's backend payment team. The booking agent handed them Raj's payment request and walked away. They'll call back once the bank approves or declines."
            },
            {
              "type": "heading",
              "text": "3. Callback Queue — The Waiting Room"
            },
            {
              "type": "paragraph",
              "text": "When the payment gateway responds — the result doesn't jump straight back in. It lines up in the Callback Queue and waits for the Call Stack to be free."
            },
            {
              "type": "step",
              "title": "Step 6 — Razorpay responds for Raj",
              "desc": "Razorpay responds — 'Payment of ₹4,599 successful, transaction ID RZP_8821'. This response moves into the Callback Queue — it waits in line patiently. It doesn't interrupt whatever the Call Stack is currently doing."
            },
            {
              "type": "step",
              "title": "Step 7 — Bank responds for Priya",
              "desc": "Priya's payment also clears — ₹7,200 for her Goa flight. Also moves into the Callback Queue — right behind Raj's response. In order, no jumping, no cutting the queue."
            },
            {
              "type": "info-callout",
              "text": "💡 Callback Queue = Completed payment confirmations sitting in a waiting room — in order, ready to be processed and turned into booking confirmations when the agent is free."
            },
            {
              "type": "heading",
              "text": "4. Microtask Queue — The VIP Lane"
            },
            {
              "type": "paragraph",
              "text": "Not everything waits in the same line. Critical operations like locking the seat in airline inventory use Promises — and Promises go into the Microtask Queue. They always jump ahead of the regular Callback Queue. Because locking a seat is more critical than sending a booking email."
            },
            {
              "type": "step",
              "title": "Step 8 — Raj's seat lock Promise resolves",
              "desc": "The moment Raj's payment is confirmed, a Promise fires to lock seat 14B on IndiGo 6E-201. Instead of joining the regular Callback Queue — this Promise goes into the Microtask Queue. VIP lane. Nobody else can grab that seat while this is pending."
            },
            {
              "type": "step",
              "title": "Step 9 — Microtask runs first",
              "desc": "Event Loop checks — Microtask Queue has Raj's seat lock. Processes it first before any regular callbacks. Seat 14B is locked against Raj's PNR. Only now does the Event Loop move to the regular Callback Queue for lower-priority tasks like sending the confirmation email."
            },
            {
              "type": "info-callout",
              "text": "💡 Microtask Queue = MakeMyTrip's priority lane. Seat locks and payment confirmations go first — so two users can never accidentally book the same seat. Emails and SMS notifications wait their turn."
            },
            {
              "type": "heading",
              "text": "The Event Loop — Connecting Everything"
            },
            {
              "type": "paragraph",
              "text": "The Event Loop is the manager watching all four pieces. It keeps checking — is the Call Stack free? Is anything in Microtask Queue? Is anything in Callback Queue? It never stops. It never sleeps. It's what ensures Raj's ₹4,599 payment always results in a confirmed PNR."
            },
            {
              "type": "step",
              "title": "Step 10 — Event Loop checks Microtask Queue",
              "desc": "Call Stack is free. Event Loop checks Microtask Queue first — Raj's seat lock Promise is there. Sends it to Call Stack. Seat 14B locked against PNR MMT8821. Processed immediately."
            },
            {
              "type": "step",
              "title": "Step 11 — Event Loop checks Callback Queue",
              "desc": "Microtask Queue is empty. Event Loop now checks Callback Queue — Raj's Razorpay payment confirmation is there. Sends it to Call Stack. Booking confirmed, PNR generated, ticket PDF created."
            },
            {
              "type": "step",
              "title": "Step 12 — Loop continues forever",
              "desc": "Event Loop goes back to checking. Priya's payment confirmation is next. Then Sara's refund. Then 200 coupon validations. It never stops — which is exactly why MakeMyTrip never misses a single payment or double-books a seat."
            },
            {
              "type": "code",
              "code": "// Full Event Loop flow — Raj's flight payment in one picture\n\nRaj clicks Pay Now      → Call Stack picks up\nRazorpay API needed     → Handed to Node APIs → Call Stack free\nPriya's booking         → Call Stack picks up immediately\nRazorpay responds       → Sits in Callback Queue\nSeat lock Promise       → Sits in Microtask Queue (VIP)\nEvent Loop checks       → Microtask first → Seat 14B locked ✅\nEvent Loop checks       → Callback next  → PNR MMT8821 confirmed ✅\nConfirmation email      → Callback Queue → SMS + email sent ✅\n\n// Nobody waited. Nobody's seat was double-booked."
            },
            {
              "type": "success-callout",
              "text": "✅ Call Stack processes the payment request. Node APIs call Razorpay in the background. Microtask Queue locks the seat with top priority. Callback Queue handles confirmation and email after. Event Loop connects all four — non stop, forever. That's how MakeMyTrip handles lakhs of payments during a Big Billion Sale without double-booking a single seat."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Now you know how MakeMyTrip never misses a payment. But what happens when Node.js has to handle something extremely heavy — like recalculating prices for every flight on the platform at once? That's where it struggles. And that's what we cover next."
            }
          ],

          "Call Stack": [
            {
              "type": "paragraph",
              "text": "When Raj clicks Pay Now on MakeMyTrip, the server runs a series of function calls — handlePayment() calls validateBooking() which calls checkSeatAvailability() which calls queryAirlineInventory(). Each function call is placed on a stack, executed, and removed when done. This is the Call Stack — the place where JavaScript code actually executes."
            },
            {
              "type": "heading",
              "text": "The Stack — Last In, First Out"
            },
            {
              "type": "paragraph",
              "text": "The Call Stack works like a stack of boarding passes at a counter. You add passes on top (push). You take passes from the top (pop). In JavaScript, every time a function is called, it's pushed onto the stack. When it returns, it's popped off. The Event Loop can only run code when the Call Stack is empty — that's the rule. If a payment function is running on the stack, everything else waits."
            },
            {
              "type": "code",
              "code": "function queryAirlineInventory(flightId, seatClass) {\n  return inventory[flightId][seatClass].available;\n}\n\nfunction checkSeatAvailability(flightId, passengers) {\n  return queryAirlineInventory(flightId, passengers.seatClass);\n}\n\nfunction validateBooking(bookingData) {\n  return checkSeatAvailability(bookingData.flightId, bookingData.passengers);\n}\n\nfunction handlePayment(request) {\n  const isAvailable = validateBooking(request.booking);\n  return isAvailable;\n}\n\nhandlePayment(request); // Raj's Pay Now click starts here"
            },
            {
              "type": "heading",
              "text": "Step-by-Step — Call Stack in Action for Raj's Payment"
            },
            {
              "type": "step",
              "title": "Step 1 — handlePayment() is called",
              "desc": "Event Loop picks up Raj's payment request. Pushes handlePayment onto the Call Stack. Stack: [handlePayment]. This function starts executing — it reads the booking amount (₹4,599), the flight details (6E-201), and the passenger count."
            },
            {
              "type": "step",
              "title": "Step 2 — validateBooking() is called inside it",
              "desc": "handlePayment calls validateBooking to confirm the booking is still valid. Pushed on top. Stack: [handlePayment, validateBooking]. validateBooking is now running — checking if the coupon is still valid, if the fare hasn't changed, if the flight is still operating."
            },
            {
              "type": "step",
              "title": "Step 3 — checkSeatAvailability() is called",
              "desc": "validateBooking calls checkSeatAvailability to confirm seat 14B is still free. Stack: [handlePayment, validateBooking, checkSeatAvailability]. Then inside that, queryAirlineInventory is called to hit the airline's live inventory. Stack: [handlePayment, validateBooking, checkSeatAvailability, queryAirlineInventory]."
            },
            {
              "type": "step",
              "title": "Step 4 — Functions complete and pop off",
              "desc": "queryAirlineInventory returns 'seat available' and pops off. checkSeatAvailability uses that result, returns true, and pops off. validateBooking confirms the booking is valid and pops off. handlePayment now has everything it needs to fire the Razorpay API call."
            },
            {
              "type": "step",
              "title": "Step 5 — Call Stack is empty",
              "desc": "handlePayment hands off the Razorpay API call to Node APIs (non-blocking) and pops off. Stack is now empty: []. Event Loop can now process the next item — maybe Priya's booking that was waiting, or a price update from Air India. The stack being empty is what ALLOWS the Event Loop to keep running."
            },
            {
              "type": "code",
              "code": "Call Stack — Raj's payment step by step:\n\n→ handlePayment(request) called\n  Stack: [handlePayment]\n\n→ validateBooking(bookingData) called\n  Stack: [handlePayment, validateBooking]\n\n→ checkSeatAvailability(flightId, passengers) called\n  Stack: [handlePayment, validateBooking, checkSeatAvailability]\n\n→ queryAirlineInventory(flightId, seatClass) called\n  Stack: [handlePayment, validateBooking, checkSeatAvailability, queryAirlineInventory]\n\n← queryAirlineInventory returns 'seat 14B available'\n  Stack: [handlePayment, validateBooking, checkSeatAvailability]\n\n← checkSeatAvailability returns true\n  Stack: [handlePayment, validateBooking]\n\n← validateBooking returns 'booking valid'\n  Stack: [handlePayment]\n\n← handlePayment fires Razorpay API (non-blocking) → returns\n  Stack: []  ← EMPTY! Event Loop picks up Priya's booking next."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Here's the critical rule: if a function on the Call Stack takes too long — like synchronously checking seat availability for all 500 flights at once — NOTHING ELSE CAN RUN. No payments process, no bookings confirm, no prices update — until that function finishes. This is called 'blocking the event loop' and during a Big Billion Sale, even 100ms of blocking means thousands of users see a frozen screen."
            },
            {
              "type": "code",
              "code": "// BAD — blocks the Call Stack, freezes MakeMyTrip\nfunction recalculateAllFlightPrices() {\n  // Loops through every flight, every date, every class\n  for (let i = 0; i < 10000000; i++) {\n    applyDynamicPricingAlgorithm(flights[i]);\n  }\n}\n// During this loop: NO payments processed,\n// NO bookings confirmed, NO seat locks issued.\n// Every user on MakeMyTrip sees a frozen screen.\n\n// GOOD — hand heavy work off to a worker thread\nworker.postMessage({ task: 'recalculatePrices', data: flightData });\n// Main thread is free immediately — payments keep flowing."
            },
            {
              "type": "success-callout",
              "text": "✅ The Call Stack is where JavaScript executes — one function at a time, top of the stack. For MakeMyTrip's payment flow, keeping functions short and non-blocking is critical. Heavy price recalculations go to worker threads. Fast seat checks and payment validations run synchronously. The Call Stack should never be held up for long — every millisecond it's blocked is a payment not being processed."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ The Call Stack handles fast synchronous checks. But the actual Razorpay API call — the one that talks to the bank and takes 200-400ms — can't live here. That goes through Node APIs. Where does it live while it's waiting for the bank to respond?"
            }
          ],

          "Web APIs / Node APIs": [
            {
              "type": "paragraph",
              "text": "When MakeMyTrip's server receives Raj's payment request and needs to call Razorpay's API, it can't put that 300ms bank call on the Call Stack — that would freeze every other booking for 300ms. Instead, Node.js has a set of background APIs — powered by libuv — that handle all time-consuming operations outside the Call Stack. These are called Node APIs."
            },
            {
              "type": "heading",
              "text": "The Handoff — From Call Stack to Node APIs"
            },
            {
              "type": "paragraph",
              "text": "When MakeMyTrip's payment code hits an async operation — calling Razorpay, locking a seat in airline inventory, reading fare rules from a file, or setting a payment timeout — Node.js doesn't execute it on the Call Stack. It HANDS IT OFF to the Node API layer (libuv). The Call Stack is immediately freed to process Priya's booking, Sara's refund, and 500 other users. When Razorpay responds, libuv places the callback in a queue and the Event Loop picks it up."
            },
            {
              "type": "code",
              "code": "MakeMyTrip's payment flow uses these Node APIs constantly:\n\nrazorpay.createOrder(paymentData, callback)          → HTTP API (OS kernel)\ndb.query('LOCK seat 14B for PNR MMT8821')            → Database API (libuv thread pool)\nfs.readFile('/config/fare-rules.json', callback)     → File System API (libuv thread pool)\nsetTimeout(() => expireBookingSession(), 600000)     → Timer API (10 min payment window)\nairlineAPI.confirmTicket(pnr, callback)              → HTTP API (OS kernel)\n\nAll of these LEAVE the Call Stack immediately.\nlibuv handles them in the background.\nCallbacks come back when Razorpay/airline/DB responds."
            },
            {
              "type": "heading",
              "text": "Step-by-Step — Raj's ₹4,599 Payment Through Node APIs"
            },
            {
              "type": "step",
              "title": "Step 1 — Payment request hits Node.js (on Call Stack)",
              "desc": "handlePayment(req) runs on the Call Stack. It validates the booking synchronously — checks amount ₹4,599, flight 6E-201, passenger details. All fast, all synchronous. Stack: [handlePayment]."
            },
            {
              "type": "step",
              "title": "Step 2 — Razorpay API call handed off to Node API",
              "desc": "handlePayment calls razorpay.createOrder(paymentData, onPaymentResponse). This line runs on the Call Stack for a microsecond — but it immediately hands the actual HTTP call to libuv. The Call Stack doesn't wait for Razorpay to respond. handlePayment finishes and pops off. Stack empties."
            },
            {
              "type": "step",
              "title": "Step 3 — While Razorpay processes (300ms), MakeMyTrip handles everything else",
              "desc": "Razorpay is now running in libuv — completely outside the Call Stack. During these 300ms, the Event Loop handles 50 other bookings: Priya's seat lock, Sara's refund request, coupon validations, hotel check-ins. The main thread never blocked."
            },
            {
              "type": "step",
              "title": "Step 4 — Razorpay responds. Callback enters the queue.",
              "desc": "300ms later, Razorpay responds — 'Payment of ₹4,599 approved, transaction ID RZP_8821'. libuv takes the onPaymentResponse callback and places it in the Callback Queue. It's ready to run — but waits for the Event Loop to pick it up."
            },
            {
              "type": "step",
              "title": "Step 5 — Event Loop picks up the callback",
              "desc": "Event Loop sees the payment callback waiting. Call Stack is empty. Event Loop pushes onPaymentResponse onto the Call Stack. It runs: confirms the PNR, locks seat 14B, generates the ticket PDF, triggers the confirmation email and SMS to Raj. Done."
            },
            {
              "type": "code",
              "code": "Complete flow — Raj's ₹4,599 payment:\n\nCALL STACK             NODE API (libuv)           CALLBACK QUEUE\n────────────────────   ─────────────────────────  ──────────────\nhandlePayment()\n  → razorpay.pay()  ─→ [Razorpay HTTP call...]         -\n  → (returns)\n[EMPTY]                [Razorpay processing...]          -\n\n(Priya's booking,       [Razorpay processing...]          -\n Sara's refund,\n 48 other bookings)\n\n[EMPTY]              [Razorpay: ₹4,599 approved] ─→ [onPaymentResponse]\n\nonPaymentResponse()    ──────────────────────────  [EMPTY]\n  → confirmPNR()\n  → lockSeat('14B')\n  → sendTicketEmail()\n[EMPTY]\n\n✅ Call Stack was never blocked for 300ms.\n   Razorpay ran in the background.\n   Callback ran the moment it was ready."
            },
            {
              "type": "info-callout",
              "text": "🏢 Think of Node APIs as MakeMyTrip's outsourced payment processing team. When the booking agent (Call Stack) gets Raj's payment, they hand the actual bank communication to Razorpay's team (Node API / libuv). The agent is immediately free to handle Priya's booking. When Razorpay clears Raj's payment, the result lands in the agent's inbox (Callback Queue) and gets processed next."
            },
            {
              "type": "success-callout",
              "text": "✅ Node APIs (backed by libuv) are what make MakeMyTrip's payment flow non-blocking. Every Razorpay call, every seat lock database query, every airline ticket confirmation — all handed off to Node APIs, all running in the background, all coming back as callbacks. The Call Stack stays free to keep taking new bookings."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Payment callbacks from Razorpay go into a queue — but they have to wait their turn. That queue is the Callback Queue. And there's a separate queue with higher priority — the Microtask Queue — where seat lock Promises go. Understanding who goes first is what prevents double-booking. Let's see how they work."
            }
          ],

          "Callback Queue (Task Queue)": [
            {
              "type": "paragraph",
              "text": "MakeMyTrip's server just finished three async operations at the same time: Razorpay confirmed Raj's ₹4,599 payment, a 10-minute booking session timer expired for an abandoned cart, and Air India's inventory API responded with updated seat availability. All three callbacks are ready to run — but the Call Stack can only do one thing at a time. They line up in the Callback Queue and the Event Loop processes them in order."
            },
            {
              "type": "heading",
              "text": "The Queue — First In, First Out"
            },
            {
              "type": "paragraph",
              "text": "The Callback Queue is a waiting room for callbacks that are ready to run. When Razorpay responds, when a booking timer expires, when an airline API returns seat data — the callback is placed here. The Event Loop checks this queue at the end of each tick. If the Call Stack is empty, it takes one callback from the front, pushes it to the Call Stack, and runs it."
            },
            {
              "type": "code",
              "code": "What fills MakeMyTrip's Callback Queue:\n→ Razorpay / PayU payment response callbacks\n→ Airline API response callbacks (seat availability, PNR status)\n→ setTimeout callbacks (booking session expiry, price lock timers)\n→ setInterval callbacks (flight status refresh every 30 seconds)\n→ Database I/O callbacks (booking records, user history)\n\nWhat does NOT go in the Callback Queue:\n→ Promise .then() callbacks    ← Microtask Queue (higher priority!)\n→ async/await continuations   ← Microtask Queue\n→ process.nextTick()          ← Microtask Queue"
            },
            {
              "type": "heading",
              "text": "Step-by-Step — Three MakeMyTrip Callbacks Arrive at Once"
            },
            {
              "type": "paragraph",
              "text": "It's peak sale hour. MakeMyTrip's server triggered three operations simultaneously. All three complete within milliseconds of each other. Here's exactly how the Callback Queue handles them:"
            },
            {
              "type": "step",
              "title": "Setup — Three async operations were started",
              "desc": "At t=0ms: razorpay.createOrder(paymentData, cb1) — Raj's payment sent to Razorpay 300ms ago. setTimeout(() => expireSession(), 600000, cb2) — Priya's 10-minute booking session timer set 10 minutes ago. airlineAPI.getSeats('6E-201', cb3) — Air India seat refresh started 150ms ago. All three complete at approximately the same time."
            },
            {
              "type": "step",
              "title": "t=300ms — All three callbacks arrive in the Callback Queue",
              "desc": "Razorpay approves Raj's payment. Priya's session timer expires. Air India responds with seat data. All three callbacks are placed in the Callback Queue: Queue: [cb1_paymentApproved, cb2_sessionExpired, cb3_seatData]. They arrived in this order, so they'll be processed in this order."
            },
            {
              "type": "step",
              "title": "t=300ms — Event Loop checks: Call Stack empty?",
              "desc": "Event Loop looks at the Call Stack. It's empty — the previous booking code finished. Event Loop also checks Microtask Queue first — nothing there. Now it takes cb1_paymentApproved from the front of the Callback Queue and pushes it to the Call Stack."
            },
            {
              "type": "step",
              "title": "t=300ms — cb1 runs: Raj's payment confirmed",
              "desc": "cb1_paymentApproved runs: confirms ₹4,599 received, generates PNR MMT8821, fires a Promise to lock seat 14B in IndiGo's system (goes to Microtask Queue immediately), triggers confirmation email (goes to Node API — non-blocking). cb1 finishes and pops off the stack."
            },
            {
              "type": "step",
              "title": "t=301ms — cb2 runs: Priya's session expires",
              "desc": "Call Stack is empty. Event Loop checks Microtask Queue — seat lock Promise from cb1 is there. Runs it first (seat 14B locked for Raj). Then takes cb2_sessionExpired: releases the seats Priya had held, marks her booking as abandoned, sends a 'Complete your booking' push notification. Finishes."
            },
            {
              "type": "step",
              "title": "t=302ms — cb3 runs: Air India seat data refreshed",
              "desc": "cb3_seatData runs: updates MakeMyTrip's in-memory seat map for flight 6E-201, marks 3 newly available seats, triggers a price recalculation (non-blocking). Queue is now empty. Event Loop loops again — waiting for the next payment, the next booking, the next API response."
            },
            {
              "type": "code",
              "code": "Callback Queue — MakeMyTrip payment processing timeline:\n\nt=0ms    razorpay.createOrder() started — Raj's ₹4,599\nt=0ms    setTimeout(600000) started — Priya's session\nt=0ms    airlineAPI.getSeats() started — 6E-201 refresh\n\nt=300ms  Razorpay approved  → cb1 enters queue\nt=300ms  Session expired    → cb2 enters queue\nt=300ms  Seat data arrived  → cb3 enters queue\n\nCallback Queue: [cb1_payment, cb2_session, cb3_seats]\n\nEvent Loop:\n  → Microtask empty? YES → take cb1 → run → PNR MMT8821 generated\n  → Microtask has seat lock! → run it → seat 14B locked for Raj\n  → take cb2 → run → Priya's session released\n  → take cb3 → run → seat map updated\n  → Queue empty → wait...\n\nAll three handled. Raj has his ticket. Priya's seats released. No double-booking."
            },
            {
              "type": "info-callout",
              "text": "⏰ Important: setTimeout(fn, 0) does NOT run immediately — even with 0ms delay. It goes through the Callback Queue and waits for: (1) Call Stack to empty, (2) ALL Microtask Queue Promises to run, THEN it runs. For MakeMyTrip, this means a booking session expiry timer (even set to 0ms) will always run after all pending payment Promises complete."
            },
            {
              "type": "success-callout",
              "text": "✅ The Callback Queue is the waiting room for completed async operations. MakeMyTrip's payment confirmations, session timeouts, and airline API responses all queue here. The Event Loop processes them one by one — in order, without blocking — ensuring every rupee is accounted for and every seat is correctly assigned."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ There's a second queue that runs BEFORE the Callback Queue on every tick — the Microtask Queue. This is where Promise callbacks go. And it has strict priority. Understanding this priority is exactly what prevents two users from booking the same seat at the same time."
            }
          ],

          "Microtask Queue (Promises)": [
            {
              "type": "paragraph",
              "text": "Raj and Priya click 'Pay Now' for the same last seat on IndiGo 6E-201 at exactly the same millisecond. Raj's payment clears first. A Promise fires to lock seat 14B. At the same time, a setTimeout callback is waiting in the Callback Queue for a session expiry check. Which one runs first? The Promise. Always. The Microtask Queue is processed completely before the Callback Queue is touched. This is what prevents double-booking — and understanding it is critical for writing correct payment flows in Node.js."
            },
            {
              "type": "heading",
              "text": "Types of Promises"
            },
            {
              "type": "paragraph",
              "text": "The Microtask Queue holds callbacks from Promises (.then(), .catch(), .finally()), async/await continuations, and process.nextTick(). The Event Loop has a strict rule: after every item from the Call Stack runs, drain the entire Microtask Queue before picking up the next item from the Callback Queue. Even if 1,000 seat-lock Promises arrive, ALL of them run before the next timer callback."
            },
            {
              "type": "code",
              "code": "Priority order in MakeMyTrip's Node.js server (highest to lowest):\n1. process.nextTick()    → Microtask Queue (highest priority)\n2. Promise callbacks     → Microtask Queue\n3. setTimeout/API calls  → Callback Queue (lower priority)\n4. setImmediate          → Check Queue\n\nRule: Empty the Microtask Queue COMPLETELY\n      before touching the Callback Queue.\n\nFor MakeMyTrip: seat locks (Promises) ALWAYS run\nbefore session timers (setTimeout). No exceptions."
            },
            {
              "type": "heading",
              "text": "Step-by-Step — Why the Last Seat Goes to Raj and Not Priya"
            },
            {
              "type": "step",
              "title": "Step 1 — Raj and Priya pay at the same millisecond",
              "desc": "Both payments hit MakeMyTrip's server at t=0ms. Both are sent to Razorpay simultaneously. Raj's bank approves first — 280ms. Priya's bank approves second — 285ms. A 5ms difference. That's all it takes."
            },
            {
              "type": "step",
              "title": "Step 2 — Raj's payment callback fires a Promise",
              "desc": "Raj's Razorpay callback runs. Inside it, a Promise fires: lockSeat('14B', 'MMT8821'). This Promise goes into the Microtask Queue immediately — not the Callback Queue. It's at the front of the VIP lane."
            },
            {
              "type": "step",
              "title": "Step 3 — Event Loop checks Microtask Queue FIRST",
              "desc": "Before touching anything else — before Priya's payment callback, before any timer, before any other operation — the Event Loop drains the Microtask Queue. Raj's seat lock Promise runs: seat 14B is now locked against PNR MMT8821 in IndiGo's inventory."
            },
            {
              "type": "step",
              "title": "Step 4 — Now Priya's payment callback runs",
              "desc": "Microtask Queue is empty. Event Loop picks up Priya's payment confirmation from the Callback Queue. But when it tries to lock seat 14B — it's already locked. MakeMyTrip immediately refunds Priya's ₹4,599 and shows her a 'Sorry, this seat was just booked' message with alternative options."
            },
            {
              "type": "step",
              "title": "Step 5 — Why this matters beyond just seat locking",
              "desc": "Every critical operation in MakeMyTrip's payment flow uses Promises — seat locks, PNR generation, payment confirmations. By using the Microtask Queue, they're guaranteed to complete before any lower-priority work (analytics logging, email triggers, session updates) runs. The critical path always finishes first."
            },
            {
              "type": "code",
              "code": "// MakeMyTrip's seat booking — Promise priority in action\nconsole.log('1 - Payment received for Raj');\n\nsetTimeout(() => {\n  console.log('4 - Update analytics dashboard (setTimeout)');\n}, 0);\n\nPromise.resolve()\n  .then(() => lockSeat('14B', 'MMT8821'))\n  .then(() => {\n    console.log('3 - Seat 14B locked for Raj (Promise)');\n  });\n\nconsole.log('2 - Firing Razorpay confirmation...');\n\n// Output:\n// 1 - Payment received for Raj\n// 2 - Firing Razorpay confirmation...\n// 3 - Seat 14B locked for Raj (Promise)       ← BEFORE setTimeout!\n// 4 - Update analytics dashboard (setTimeout) ← AFTER seat is locked!"
            },
            {
              "type": "code",
              "code": "// MakeMyTrip's complete payment flow with async/await\nasync function processPayment(paymentRequest) {\n  console.log('Processing payment for:', paymentRequest.userId);\n\n  // Calls Razorpay — handed to Node API, non-blocking\n  const paymentResult = await razorpay.confirmPayment(paymentRequest);\n  // Everything after 'await' is a Promise continuation → Microtask Queue\n\n  // These run in Microtask Queue — BEFORE any setTimeout callbacks\n  const pnr = await generatePNR(paymentResult.transactionId);\n  await lockSeatInAirlineInventory(pnr, paymentRequest.seatId);\n  await updateBookingDatabase(pnr, paymentRequest);\n\n  console.log('Booking confirmed:', pnr); // e.g. MMT8821\n  // Only NOW does the Event Loop check the Callback Queue\n  // for lower-priority tasks like analytics, email triggers\n}"
            },
            {
              "type": "table",
              "headers": ["Queue", "What goes here", "Priority", "MakeMyTrip example"],
              "rows": [
                ["Microtask Queue", "Promise .then(), async/await, process.nextTick()", "HIGH — runs first, always", "Seat lock, PNR generation, payment confirmation"],
                ["Callback Queue", "setTimeout, setInterval, API response callbacks", "NORMAL — runs after all microtasks", "Session expiry timer, analytics update, email trigger"],
                ["Call Stack", "Synchronous code", "IMMEDIATE — blocks everything", "Coupon validation, amount calculation, request parsing"]
              ]
            },
            {
              "type": "info-callout",
              "text": "⚠️ One real trap: if MakeMyTrip's code creates an infinite chain of Promises (each .then() creates another Promise), the Microtask Queue never empties — and the Callback Queue never runs. This means session expiry timers stop firing, analytics never update, email triggers never run. In production, always ensure Promise chains eventually resolve — infinite microtask loops are a silent performance killer."
            },
            {
              "type": "success-callout",
              "text": "✅ The Microtask Queue (Promises, async/await) runs before the Callback Queue (setTimeout, API callbacks) on every Event Loop tick. For MakeMyTrip, this means seat locks and PNR generation always complete before session timers or analytics callbacks run — ensuring nobody ever gets double-booked and every rupee lands in the right place."
            },
            {
              "type": "info-callout",
              "text": "🎯 Full picture — Call Stack runs payment validation code. Node APIs call Razorpay in the background. Seat lock Promises go to the high-priority Microtask Queue. Payment response callbacks go to the Callback Queue. Event Loop connects all four — drain microtasks first, then callbacks, repeat forever. This is how MakeMyTrip processes lakhs of payments during a sale without a single seat being double-booked."
            }
          ]
        }
      },
      {
        "id": 3,
        "title": "Async Programming",
        "level": "freshers",
        "topics": [
          "Callbacks",
          "Promises",
          "Async / Await",
          "Callback Hell & How to Avoid It"
        ],
        "topicDetails": {
          "Callbacks": [
            {
              "type": "paragraph",
              "text": "You book a hotel on MakeMyTrip. The moment you click 'Confirm Booking', MakeMyTrip's server needs to do something slow — call the hotel's reservation system and wait for them to confirm your room. That could take 2-3 seconds. Should the entire server freeze for 2-3 seconds while waiting? Obviously not. So instead, MakeMyTrip says — 'here's what to do when the hotel responds' — and passes a function. That function is a callback."
            },
            {
              "type": "heading",
              "text": "Callbacks — The Original Async Pattern"
            },
            {
              "type": "paragraph",
              "text": "A callback is simply a function you pass to another function, saying 'run this when you're done.' In Node.js, this is the foundation of async programming. You call a slow operation — a hotel API, a payment gateway, a database write — and you hand it a callback. The slow operation runs in the background. When it finishes, it calls your function with the result. You don't sit and wait. You move on."
            },
            {
              "type": "paragraph",
              "text": "Node.js has a specific convention for callbacks: the first argument is always an error object (null if everything went fine), and the second argument is the result. This is called the 'error-first callback' pattern — and every built-in Node.js API follows it. If you see (err, result) as the callback signature, you're looking at a Node.js callback."
            },
            {
              "type": "code",
              "code": "// Node.js callback convention: (error, result)\n// error is null if success. error has a message if something went wrong.\n\n// MakeMyTrip: Confirm hotel booking (callback style)\nhotelAPI.confirmRoom(bookingDetails, (error, confirmation) => {\n  if (error) {\n    console.log('Hotel API error:', error.message);\n    return; // stop processing, don't proceed\n  }\n  // Success — confirmation has the hotel's booking reference\n  console.log('Room confirmed:', confirmation.referenceId);\n  sendConfirmationEmail(userId, confirmation);\n});"
            },
            {
              "type": "heading",
              "text": "Where Callbacks Work Well"
            },
            {
              "type": "paragraph",
              "text": "Callbacks are a perfect fit when you have a single async operation and you just want to do something when it's done. Reading a config file when the server starts. Sending a single email after a booking confirms. Writing a log entry to disk. These are simple, one-step operations — you fire them, you handle the result, you're done. No chaining needed."
            },
            {
              "type": "code",
              "code": "// GOOD USE of callbacks — single operations, no chaining needed\n\n// 1. Reading fare config when MakeMyTrip server starts\nfs.readFile('/config/fare-rules.json', (err, data) => {\n  if (err) throw err;\n  fareConfig = JSON.parse(data);\n  console.log('Fare config loaded');\n});\n\n// 2. Logging a booking to disk\nfs.appendFile('/logs/bookings.log', bookingEntry, (err) => {\n  if (err) console.error('Log write failed:', err);\n});\n\n// 3. Sending a single SMS confirmation\nsmsService.send(phoneNumber, message, (err, receipt) => {\n  if (err) console.error('SMS failed:', err);\n  else console.log('SMS sent, receipt:', receipt.id);\n});"
            },
            {
              "type": "heading",
              "text": "Where Callbacks Break Down"
            },
            {
              "type": "paragraph",
              "text": "The moment you need to do multiple async operations in sequence — where each step depends on the result of the previous one — callbacks start creating problems. Because each async operation needs its own callback, and if the next operation starts inside that callback, and the one after that starts inside that callback, you end up with functions nested inside functions nested inside functions. The code grows to the right instead of downward."
            },
            {
              "type": "paragraph",
              "text": "Consider MakeMyTrip's hotel booking flow: first confirm the room with the hotel API, then charge the customer's card, then generate the voucher, then send the confirmation email, then update the user's booking history. Five steps. Five callbacks. Each nested inside the previous one. This is the beginning of Callback Hell — and we'll see the full picture in the next topic."
            },
            {
              "type": "heading",
              "text": "Step-by-Step — Hotel Booking Confirmation Using Callbacks"
            },
            {
              "type": "step",
              "title": "Step 1 — User confirms hotel booking",
              "desc": "Server receives the request with hotel ID, check-in date, number of guests, and payment details. The first async operation needed: confirm room availability with the hotel's reservation API. This takes 1-2 seconds — a real hotel system responding in real time."
            },
            {
              "type": "step",
              "title": "Step 2 — Hotel API confirms room (callback fires)",
              "desc": "hotelAPI.confirmRoom() is called with a callback. When the hotel responds, the callback fires with (err, confirmation). If err is null, we have a room reference number. Now the next step can start — but it starts inside this callback."
            },
            {
              "type": "step",
              "title": "Step 3 — Charge the card (nested inside previous callback)",
              "desc": "Inside the hotel confirmation callback, razorpay.charge() is called with another callback. This callback receives (err, payment). The card processing takes another 300ms. While it's running, the original callback is still on the stack, waiting."
            },
            {
              "type": "step",
              "title": "Step 4 — Generate voucher (nested inside payment callback)",
              "desc": "Inside the payment callback, voucherService.generate() is called with yet another callback. This hits a database write. Another level of nesting. We're now three functions deep just to get a voucher."
            },
            {
              "type": "code",
              "code": "// MakeMyTrip hotel booking — callbacks chained:\nhotelAPI.confirmRoom(bookingDetails, (err, confirmation) => {\n  if (err) return handleError(err);\n\n  razorpay.charge(userId, fare, (err, payment) => {\n    if (err) return handleError(err);\n\n    voucherService.generate(confirmation, (err, voucher) => {\n      if (err) return handleError(err);\n\n      emailService.send(userId, voucher, (err) => {\n        if (err) return handleError(err);\n\n        db.updateBookingHistory(userId, confirmation, (err) => {\n          if (err) return handleError(err);\n          console.log('Booking complete!');\n          // 5 levels deep. This is Callback Hell.\n        });\n      });\n    });\n  });\n});"
            },
            {
              "type": "info-callout",
              "text": "💡 Notice the shape of that code — it grows to the right like a staircase. Each async step adds another level of indentation. The actual logic (confirm, charge, generate, send, update) is buried inside error checks. Adding a 6th step means inserting inside 5 existing functions. This is exactly the problem Promises were invented to solve."
            },
            {
              "type": "heading",
              "text": "When to Use Callbacks — and When Not To"
            },
            {
              "type": "paragraph",
              "text": "Use callbacks when the operation is a single async step with no follow-up async work. Reading a config file on startup. Writing a log entry. Sending a one-off notification. They're perfect for fire-and-forget situations where you don't need to chain the result into another async call."
            },
            {
              "type": "paragraph",
              "text": "Avoid callbacks the moment you need to chain two or more async operations sequentially. As soon as Step 2 depends on the result of Step 1 — and Step 3 depends on Step 2 — you're heading into nested hell. That's when Promises or async/await will serve you much better. A simple rule: if you ever find yourself writing a callback inside a callback, switch to Promises."
            },
            {
              "type": "success-callout",
              "text": "✅ Callbacks are the foundation of async Node.js — every Promise and every async/await is built on top of them. They work perfectly for single async operations. They become painful for sequential multi-step flows. Understanding callbacks deeply is essential — because when something breaks in an async flow, understanding the callback underneath helps you debug it."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Callback Hell is the reason Promises were invented. Five levels of nesting, error handling copy-pasted in every callback, impossible to add a new step without restructuring the entire pyramid. That's the problem Promises solve — and that's what we cover next."
            }
          ],

          "Promises": [
            {
              "type": "paragraph",
              "text": "You book a train ticket on MakeMyTrip. Instead of making you stand at the counter while the system checks availability, prints the ticket, and processes the payment — they hand you a token. 'Come back when your number is called.' That token is a Promise. It represents something that will either be ready (fulfilled) or unavailable (rejected) in the future. You can plan around it without knowing the result yet."
            },
            {
              "type": "heading",
              "text": "A Promise — Three States"
            },
            {
              "type": "paragraph",
              "text": "A Promise object represents a value that doesn't exist yet but will in the future. It always exists in one of three states. Pending means the async operation is still running — the train booking system is checking seat availability. Fulfilled means the operation succeeded — seats confirmed, here's your PNR. Rejected means it failed — no seats available, or the payment gateway timed out."
            },
            {
              "type": "paragraph",
              "text": "The critical rule: once a Promise moves from Pending to either Fulfilled or Rejected, it is permanently in that state. You cannot un-fulfill a Promise. You cannot retry a rejected Promise — you create a new one. This immutability is what makes Promises reliable in a payment flow. A payment Promise that resolves with a transaction ID is forever resolved with that ID."
            },
            {
              "type": "code",
              "code": "// Promise states:\nconst bookingPromise = confirmTrainSeat(pnrDetails);\n// State: PENDING (IRCTC API is running)\n\nbookingPromise\n  .then(confirmation => {\n    // State: FULFILLED — seat confirmed\n    console.log('PNR:', confirmation.pnr);\n    return generateTicketPDF(confirmation);\n  })\n  .catch(error => {\n    // State: REJECTED — no seats or API error\n    console.log('Booking failed:', error.message);\n    offerAlternateTrains(pnrDetails.route);\n  })\n  .finally(() => {\n    // Runs regardless of success or failure\n    releaseTemporarySeatHold(pnrDetails.seatId);\n    console.log('Seat hold released');\n  });"
            },
            {
              "type": "heading",
              "text": "Where Promises Work Better Than Callbacks"
            },
            {
              "type": "paragraph",
              "text": "Promises shine the moment you have sequential async operations — where each step depends on the result of the previous one. The .then() chain reads top to bottom, like a recipe. Each .then() receives the result of the Promise returned by the previous .then(). If any step fails, the error falls all the way down to a single .catch() — no more duplicating error checks at every level."
            },
            {
              "type": "paragraph",
              "text": "They also work exceptionally well when you need to run multiple independent async operations at the same time and wait for all of them. Promise.all() fires all of them simultaneously and resolves when every one of them is done. This is how MakeMyTrip refreshes hotel prices, checks room availability, and loads user preferences all in parallel when you open a hotel page — not one by one."
            },
            {
              "type": "heading",
              "text": "Step-by-Step — Train Booking Rewritten With Promises"
            },
            {
              "type": "step",
              "title": "Step 1 — confirmTrainSeat() returns a Promise",
              "desc": "Instead of accepting a callback, confirmTrainSeat returns a Promise object immediately. The IRCTC API call runs in the background. The Call Stack is free. When the API responds, the Promise fulfills with the seat confirmation details — coach, berth number, PNR."
            },
            {
              "type": "step",
              "title": "Step 2 — Chain .then() for each next step",
              "desc": "Each .then() receives the resolved value from the previous Promise and returns a new Promise. The chain reads exactly like the logical sequence: confirm seat → charge card → generate ticket → send to user. Flat. No indentation pyramid."
            },
            {
              "type": "step",
              "title": "Step 3 — One .catch() handles every failure",
              "desc": "If the IRCTC API fails, OR the card charge fails, OR the ticket PDF generation fails — the error skips all remaining .then() calls and falls directly to .catch(). One handler. No copy-pasting error logic at every step. This single change makes debugging train booking failures dramatically easier."
            },
            {
              "type": "code",
              "code": "// Callback version — nested pyramid:\nconfirmTrainSeat(details, (err, seat) => {\n  if (err) return handleError(err);\n  chargeCard(userId, fare, (err, payment) => {\n    if (err) return handleError(err);\n    generateTicket(seat, (err, ticket) => {\n      if (err) return handleError(err);\n      sendToUser(userId, ticket, (err) => {\n        if (err) return handleError(err);\n        console.log('Ticket sent!'); // 4 levels deep\n      });\n    });\n  });\n});\n\n// Promise version — flat chain:\nconfirmTrainSeat(details)\n  .then(seat => chargeCard(userId, fare))\n  .then(payment => generateTicket(seat, payment))\n  .then(ticket => sendToUser(userId, ticket))\n  .then(() => console.log('Ticket sent!'))\n  .catch(err => handleError(err));\n\n// Same logic. Zero nesting. ONE error handler."
            },
            {
              "type": "heading",
              "text": "Promise.all — Loading a Hotel Page in Parallel"
            },
            {
              "type": "paragraph",
              "text": "When you open a hotel listing on MakeMyTrip, the page needs three things: the hotel's room prices for your dates, the user's loyalty points balance, and the list of active promo codes. These three are completely independent of each other — there's no reason to fetch them one by one. Promise.all fires all three simultaneously and waits for all three to finish."
            },
            {
              "type": "code",
              "code": "// Sequential — slow, wasteful (each waits for previous)\nconst prices = await hotelAPI.getRoomPrices(hotelId, dates);   // 400ms\nconst points = await loyaltyAPI.getPoints(userId);              // 200ms\nconst promos = await promoAPI.getActiveCodes(userId);           // 150ms\n// Total: 750ms — user waits 3/4 of a second\n\n// Promise.all — all three run simultaneously\nconst [prices, points, promos] = await Promise.all([\n  hotelAPI.getRoomPrices(hotelId, dates),   // 400ms ─┐\n  loyaltyAPI.getPoints(userId),              // 200ms  ├─ all running at once\n  promoAPI.getActiveCodes(userId)            // 150ms ─┘\n]);\n// Total: 400ms — as fast as the slowest one\n// Hotel page loads almost 2x faster."
            },
            {
              "type": "heading",
              "text": "When to Use Promises — and When Not To"
            },
            {
              "type": "paragraph",
              "text": "Use Promises when you have sequential async operations that need to chain — booking confirmation flowing into payment flowing into voucher generation. Use Promise.all when you have multiple independent async operations that can run simultaneously. Use Promise.race when you want the result of whichever finishes first — for example, querying two different hotel inventory databases and taking whichever responds faster."
            },
            {
              "type": "paragraph",
              "text": "Avoid raw Promises when the chain gets long and complex — more than four or five .then() calls starts to feel abstract again. When a .then() receives data from two previous steps (not just the immediately previous one), you have to resort to tricks like outer variable assignment or restructuring, which defeats the readability benefit. That's the moment to move to async/await, which solves the variable-scope problem cleanly."
            },
            {
              "type": "success-callout",
              "text": "✅ Promises flatten callback hell, provide clean error handling with a single .catch(), and unlock powerful parallel execution with Promise.all. MakeMyTrip uses Promises extensively — especially for independent data loading where multiple API calls can run simultaneously. But for long sequential flows where each step uses data from multiple previous steps, async/await is cleaner."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Promises are great but .then().then().then() chains can still feel disconnected — especially when step 4 needs a variable from step 1. async/await solves this completely. It lets you write async code that reads exactly like synchronous code, with all variables in the same scope."
            }
          ],

          "Async / Await": [
            {
              "type": "paragraph",
              "text": "MakeMyTrip's bus booking flow has six steps: check seat availability, apply loyalty points, charge the card, issue the bus operator's ticket, generate the PDF, and notify the user. Written as a Promise chain, step 4 might need data from step 1 and step 3 — which means juggling variables across .then() calls in ways that get messy. async/await solves this by letting all six steps live in the same function, same scope, reading top to bottom like a synchronous recipe."
            },
            {
              "type": "heading",
              "text": "async/await — Synchronous Syntax, Asynchronous Behavior"
            },
            {
              "type": "paragraph",
              "text": "The 'async' keyword before a function does one thing: it makes that function always return a Promise. The 'await' keyword inside an async function pauses that function at that line and waits for the Promise to resolve — but critically, it doesn't block the server. While this function is paused, the Event Loop is free to handle every other request that comes in."
            },
            {
              "type": "paragraph",
              "text": "This is the breakthrough: 'await' pauses ONE function, not the entire Node.js server. Every other user's request keeps being handled normally. The paused function picks up exactly where it left off the moment its awaited Promise resolves. The result feels like synchronous code but behaves entirely asynchronously."
            },
            {
              "type": "code",
              "code": "// Promise chain version — variable scoping gets awkward:\nfunction completeBusBooking(bookingId) {\n  let savedSeat; // need to declare outside to share across .then()\n  return checkSeatAvailability(bookingId)\n    .then(seat => { savedSeat = seat; return applyLoyaltyPoints(userId); })\n    .then(discount => chargeCard(userId, fare - discount))\n    .then(payment => issueBusTicket(savedSeat, payment)) // needs savedSeat from step 1!\n    .then(ticket => generatePDF(ticket))\n    .catch(err => handleError(err));\n}\n\n// async/await version — all variables in same scope, reads naturally:\nasync function completeBusBooking(bookingId) {\n  try {\n    const seat = await checkSeatAvailability(bookingId);\n    const discount = await applyLoyaltyPoints(userId);\n    const payment = await chargeCard(userId, fare - discount);\n    const ticket = await issueBusTicket(seat, payment); // seat is right here!\n    const pdf = await generatePDF(ticket);\n    await notifyUser(userId, pdf);\n    console.log('Bus booking complete!');\n  } catch (err) {\n    handleError(err);\n  }\n}"
            },
            {
              "type": "heading",
              "text": "Step-by-Step — How 'await' Works Under the Hood"
            },
            {
              "type": "paragraph",
              "text": "When you look at an 'await' line, it feels synchronous — like the code just pauses and waits. But under the hood, something more precise is happening. The function is suspended, the Call Stack is freed, and the Event Loop continues running everything else. Here's the exact sequence:"
            },
            {
              "type": "step",
              "title": "Step 1 — async function starts running on the Call Stack",
              "desc": "completeBusBooking() is called. It executes synchronously — reads the bookingId, logs whatever needs logging — until it hits the first 'await' line. Everything before the first await runs immediately, blocking nothing."
            },
            {
              "type": "step",
              "title": "Step 2 — 'await checkSeatAvailability()' is hit",
              "desc": "checkSeatAvailability() is called — it fires an API call to the bus operator's system and returns a Promise. The 'await' keyword sees that Promise is still Pending. It suspends completeBusBooking() and removes it from the Call Stack. The Event Loop is now free."
            },
            {
              "type": "step",
              "title": "Step 3 — Server handles hundreds of other requests while waiting",
              "desc": "While the bus operator API takes its 200ms to respond, the Event Loop handles other work: someone searching for hotels, someone checking flight prices, someone cancelling a booking. None of them are aware that completeBusBooking is paused. The server isn't frozen — one function is paused."
            },
            {
              "type": "step",
              "title": "Step 4 — Bus operator responds. Promise resolves.",
              "desc": "The API comes back with seat availability. The Promise resolves. This resolution goes into the Microtask Queue (because it's a Promise). Event Loop picks it up immediately on the next tick."
            },
            {
              "type": "step",
              "title": "Step 5 — completeBusBooking() RESUMES from where it paused",
              "desc": "The function is restored to the Call Stack. The 'seat' variable is now populated with the availability data. Execution continues to the next line: 'await applyLoyaltyPoints()'. The cycle repeats — pause, other work happens, resume."
            },
            {
              "type": "code",
              "code": "async function completeBusBooking(bookingId) {\n  console.log('A: Starting bus booking');\n\n  const seat = await checkSeatAvailability(bookingId);\n  // ↑ PAUSES. Event Loop handles ~40 other requests.\n  // ↓ RESUMES when bus operator responds (~200ms)\n  console.log('B: Seat confirmed —', seat.number);\n\n  const payment = await chargeCard(userId, fare);\n  // ↑ PAUSES. Razorpay processing — ~300ms.\n  // ↓ RESUMES when card is charged.\n  console.log('C: Payment done — ₹', payment.amount);\n\n  const ticket = await issueBusTicket(seat, payment);\n  // ↑ PAUSES. Operator issues ticket reference.\n  // ↓ RESUMES with ticket data.\n  console.log('D: Ticket issued —', ticket.referenceId);\n}\n\n// What the server does during those pauses:\n// Someone opens MakeMyTrip app → handled\n// Someone checks hotel prices → handled\n// Someone cancels a flight → handled\n// None of them waited for this function."
            },
            {
              "type": "heading",
              "text": "When to Use async/await — and When Not To"
            },
            {
              "type": "paragraph",
              "text": "async/await is the right choice for sequential multi-step flows where later steps need data from earlier steps. The bus booking flow above is a perfect example — issueBusTicket needs both the seat AND the payment. With async/await, both are just local variables in scope. It's also the right choice when you want readable, debuggable code — stack traces in async/await are far cleaner than in raw Promise chains."
            },
            {
              "type": "paragraph",
              "text": "Where async/await needs help: parallel operations. If you write 'await A; await B; await C;' — those run one by one even if they're independent of each other. For parallel operations, combine async/await with Promise.all: 'const [a, b, c] = await Promise.all([A(), B(), C()])'. This gives you clean syntax AND parallel execution — the best of both."
            },
            {
              "type": "code",
              "code": "// DON'T do this — sequential when parallel would be faster:\nasync function loadHotelPage(hotelId, userId) {\n  const prices = await hotelAPI.getRoomPrices(hotelId);  // 400ms\n  const reviews = await reviewAPI.getReviews(hotelId);   // 300ms\n  const wishlist = await db.getUserWishlist(userId);      // 150ms\n  // Total: 850ms — all waiting in line for no reason\n}\n\n// DO this — parallel with Promise.all inside async/await:\nasync function loadHotelPage(hotelId, userId) {\n  const [prices, reviews, wishlist] = await Promise.all([\n    hotelAPI.getRoomPrices(hotelId),   // all three\n    reviewAPI.getReviews(hotelId),     // run at\n    db.getUserWishlist(userId)         // the same time\n  ]);\n  // Total: 400ms — as fast as the slowest one\n  // Hotel page loads in half the time.\n}"
            },
            {
              "type": "success-callout",
              "text": "✅ async/await is how modern Node.js applications are written. It's Promises with readable syntax — code reads top to bottom, variables are in scope where you need them, errors are caught with familiar try/catch. For MakeMyTrip's multi-step booking flows, it's the clear winner over nested callbacks or raw Promise chains."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Even with async/await, you can still write messy, hard-to-maintain code if you don't structure it well. The original problem — Callback Hell — is worth fully understanding, because its root cause (poor async structure) can creep back in disguised form. Let's look at what Callback Hell actually looks like and all three ways to escape it."
            }
          ],

          "Callback Hell & How to Avoid It": [
            {
              "type": "paragraph",
              "text": "MakeMyTrip's holiday package booking flow has seven steps: check flight availability, check hotel availability, apply loyalty points, charge the card, issue flight tickets, confirm hotel voucher, and send the complete itinerary. Every single step is async. Written with callbacks — the way early Node.js code was written — this creates a staircase of doom that starts at column 0 and ends at column 70, with error handling copy-pasted seven times."
            },
            {
              "type": "heading",
              "text": "What Callback Hell Looks Like"
            },
            {
              "type": "paragraph",
              "text": "The shape of Callback Hell is a pyramid growing to the right. Each async step opens a new callback, indenting everything inside it another level. The actual business logic — the part that actually matters — is buried inside layers of error checks and closing braces. New engineers joining the team can't figure out what the code is doing without tracing the nesting manually. Debugging a failed booking at 2am means mentally unwinding seven layers of callbacks to find which one failed."
            },
            {
              "type": "code",
              "code": "// MakeMyTrip holiday package booking — Callback Hell:\nflightAPI.checkAvailability(route, dates, (err, flight) => {\n  if (err) return handleError(err);\n\n  hotelAPI.checkAvailability(city, dates, (err, hotel) => {\n    if (err) return handleError(err);\n\n    loyaltyAPI.applyPoints(userId, (err, discount) => {\n      if (err) return handleError(err);\n\n      razorpay.charge(userId, totalFare - discount, (err, payment) => {\n        if (err) return handleError(err);\n\n        flightAPI.issueTicket(flight, payment, (err, ticket) => {\n          if (err) return handleError(err);\n\n          hotelAPI.confirmVoucher(hotel, payment, (err, voucher) => {\n            if (err) return handleError(err);\n\n            emailService.sendItinerary(userId, ticket, voucher, (err) => {\n              if (err) return handleError(err);\n              console.log('Package booked!'); // 7 levels deep\n            });\n          });\n        });\n      });\n    });\n  });\n});\n// 7 levels. 7 error checks.\n// Try adding a fraud detection step in the middle of this."
            },
            {
              "type": "heading",
              "text": "Why Callback Hell is Dangerous at Scale"
            },
            {
              "type": "paragraph",
              "text": "It's not just aesthetics. Callback Hell creates serious engineering problems when a platform like MakeMyTrip is handling lakhs of bookings. When a payment fails in production, the error could come from any of the seven steps — but the stack trace points you to the deepest callback and you have to unwind the nesting manually to understand the full context. Adding a new step (say, an IRCTC API call for train tickets joining the flow) means inserting into the middle of the pyramid and re-indenting everything below it."
            },
            {
              "type": "paragraph",
              "text": "Testing is also near-impossible. Every step is entangled with the ones above and below it. To test whether the hotel voucher confirmation works, you have to set up mocks for every step above it — flight availability, loyalty points, card charge — just to reach the code you actually want to test. Error handling is inconsistent because each developer who touched a different callback level wrote the error check slightly differently."
            },
            {
              "type": "heading",
              "text": "Step-by-Step — Three Ways to Escape Callback Hell"
            },
            {
              "type": "step",
              "title": "Solution 1 — Named Functions (flatten without changing the pattern)",
              "desc": "The simplest fix: instead of anonymous functions nested inside each other, give each callback a name and define it at the top level. The pyramid disappears because each function is defined separately. Each one is independently testable. The flow reads as a flat sequence of function calls. This doesn't require changing to Promises — it just restructures existing callback code."
            },
            {
              "type": "code",
              "code": "// Solution 1: Named functions — same callbacks, flat structure\nfunction onFlightAvailable(err, flight) {\n  if (err) return handleError(err);\n  hotelAPI.checkAvailability(city, dates, onHotelAvailable);\n}\n\nfunction onHotelAvailable(err, hotel) {\n  if (err) return handleError(err);\n  loyaltyAPI.applyPoints(userId, onPointsApplied);\n}\n\nfunction onPointsApplied(err, discount) {\n  if (err) return handleError(err);\n  razorpay.charge(userId, totalFare - discount, onPaymentDone);\n}\n\nfunction onPaymentDone(err, payment) {\n  if (err) return handleError(err);\n  // ... continues at the same indent level\n}\n\n// Start the chain:\nflightAPI.checkAvailability(route, dates, onFlightAvailable);\n\n// Flat! Each function can be tested in isolation.\n// Adding fraud detection = add one new named function."
            },
            {
              "type": "step",
              "title": "Solution 2 — Promises (.then() chain)",
              "desc": "Convert each step to return a Promise instead of accepting a callback. Chain them with .then(). The entire seven-step flow becomes seven lines of flat code with one .catch() at the end. Error handling is no longer copy-pasted — one handler catches failures from any step. This is the industry standard for medium-complexity async flows."
            },
            {
              "type": "code",
              "code": "// Solution 2: Promises — flat chain\nflightAPI.checkAvailability(route, dates)\n  .then(flight => hotelAPI.checkAvailability(city, dates))\n  .then(hotel => loyaltyAPI.applyPoints(userId))\n  .then(discount => razorpay.charge(userId, totalFare - discount))\n  .then(payment => flightAPI.issueTicket(flight, payment))\n  .then(ticket => hotelAPI.confirmVoucher(hotel, payment))\n  .then(voucher => emailService.sendItinerary(userId, ticket, voucher))\n  .then(() => console.log('Package booked!'))\n  .catch(err => handleError(err));\n\n// 7 steps. Perfectly flat. ONE error handler.\n// Adding fraud detection = add one .then() line."
            },
            {
              "type": "step",
              "title": "Solution 3 — async/await (the MakeMyTrip engineering team's choice)",
              "desc": "The cleanest solution for complex flows. Each step is a single line with 'await'. All variables are in the same scope — flight, hotel, discount, payment are all accessible at any step below them without tricks. One try/catch handles everything. Adding a step means adding one line. Reading the function tells the exact story of what happens when a user books a holiday package."
            },
            {
              "type": "code",
              "code": "// Solution 3: async/await — clean, readable, maintainable\nasync function bookHolidayPackage(userId, route, city, dates) {\n  try {\n    const flight = await flightAPI.checkAvailability(route, dates);\n    const hotel = await hotelAPI.checkAvailability(city, dates);\n    const discount = await loyaltyAPI.applyPoints(userId);\n    const payment = await razorpay.charge(userId, totalFare - discount);\n    const ticket = await flightAPI.issueTicket(flight, payment);\n    const voucher = await hotelAPI.confirmVoucher(hotel, payment);\n    await emailService.sendItinerary(userId, ticket, voucher);\n    console.log('Holiday package booked!');\n  } catch (err) {\n    handleError(err);\n  }\n}\n\n// 7 steps. Zero nesting. ONE try/catch.\n// flight, hotel, discount all in scope — no hacks.\n// New step = new 'await' line. Testing each step = trivial.\n// Reading this = reading a recipe. Crystal clear."
            },
            {
              "type": "table",
              "headers": ["Approach", "Nesting", "Error Handling", "Variable Scope", "Readability", "Best For"],
              "rows": [
                ["Nested Callbacks", "Deep pyramid", "Copy-pasted at each level", "Trapped inside each callback", "Poor", "Nothing new — avoid"],
                ["Named Functions", "Flat", "Still manual per function", "Still scoped per function", "Better", "Legacy code cleanup"],
                ["Promises .then()", "Flat chain", "One .catch()", "Needs outer vars for sharing", "Good", "Parallel ops, simple chains"],
                ["async/await", "None", "One try/catch", "All in same scope", "Excellent", "Sequential multi-step flows"]
              ]
            },
            {
              "type": "success-callout",
              "text": "✅ Callback Hell is solved by restructuring — named functions, Promises, or async/await. MakeMyTrip's engineering team uses async/await for all complex booking flows where multiple steps share data, and Promise.all inside async/await for independent parallel operations. The evolution from callbacks to async/await represents how the JavaScript ecosystem learned to write async code properly."
            },
            {
              "type": "info-callout",
              "text": "🎯 Full picture of Async Programming in Node.js — Callbacks are the foundation: pass a function, get called when done. Promises flatten the chain and give you parallel execution with Promise.all. async/await gives you synchronous-looking code with full async behavior. All three are built on the same Event Loop. Use callbacks for single fire-and-forget operations. Use Promise.all for parallel independent calls. Use async/await for any multi-step sequential flow where later steps need earlier data."
            }
          ]
        }
      },
      {
        "id": 4,
        "title": "Non-Blocking I/O & libuv",
        "level": "freshers",
        "topics": [
          "What is libuv & Thread Pool"
        ],
        "topicDetails": {
          "What is libuv & Thread Pool": [
            {
              "type": "paragraph",
              "text": "When MakeMyTrip's Node.js server says 'query the database' and immediately moves on — who is actually running that database query? Not the main JavaScript thread. That's libuv: a C library that ships with Node.js, handles all async operations in the background, and notifies the Event Loop when work is done."
            },
            {
              "type": "heading",
              "text": "Where libuv Sits in Node.js"
            },
            {
              "type": "code",
              "code": "┌──────────────────────────────────────────┐\n│          YOUR APPLICATION CODE           │  ← JavaScript\n│   (hotel booking, payment processing)    │\n├──────────────────────────────────────────┤\n│               NODE.JS CORE               │  ← JavaScript\n│       (http, fs, crypto modules)         │\n├──────────────────────────────────────────┤\n│                V8 ENGINE                 │  ← C++\n│         (executes JavaScript)            │\n├──────────────────────────────────────────┤\n│                  LIBUV                   │  ← C\n│   (async I/O, event loop, thread pool)   │\n├──────────────────────────────────────────┤\n│             OPERATING SYSTEM             │\n│    (Linux epoll / macOS kqueue / Win)    │\n└──────────────────────────────────────────┘"
            },
            {
              "type": "paragraph",
              "text": "libuv sits between Node.js and the operating system. It implements the Event Loop, manages a thread pool for heavy background tasks, and uses the OS's native async mechanisms for network operations. Every async operation on MakeMyTrip's server — hotel API calls, payment processing, config file reads — eventually goes through libuv."
            },
            {
              "type": "heading",
              "text": "Two Ways libuv Handles Work"
            },
            {
              "type": "step",
              "title": "Network I/O — directly through the OS kernel",
              "desc": "Razorpay API calls, hotel API requests, database queries over the network — these use the OS's native async capabilities (epoll on Linux). The OS kernel monitors thousands of connections simultaneously and tells libuv when data arrives. No threads needed. This is how MakeMyTrip handles lakhs of simultaneous users with minimal resources."
            },
            {
              "type": "step",
              "title": "File system & DNS — through libuv's thread pool",
              "desc": "Reading fare config files, DNS lookups for internal services, password hashing with crypto — the OS doesn't always provide a non-blocking interface for these. So libuv runs them on background threads from its pool. The main JavaScript thread stays free."
            },
            {
              "type": "code",
              "code": "// MakeMyTrip server — what goes where:\n\nrazorpay.charge(userId, fare)          → OS kernel (no threads)\nhotelAPI.confirmRoom(bookingDetails)   → OS kernel (no threads)\ndb.query('SELECT * FROM bookings')     → OS kernel (no threads)\n\nfs.readFile('/config/fare-rules.json') → libuv thread pool\ndns.lookup('internal.makemytrip.com')  → libuv thread pool\ncrypto.pbkdf2(password, salt, ...)     → libuv thread pool\n\nsetTimeout(() => expireSession(), 600000) → libuv timer"
            },
            {
              "type": "heading",
              "text": "The Thread Pool — Background Workers"
            },
            {
              "type": "paragraph",
              "text": "libuv creates 4 threads by default (configurable up to 1024 via the UV_THREADPOOL_SIZE environment variable). When a file read or DNS lookup arrives, it's assigned to an available thread. If all 4 are busy, the task waits in a queue. The main JavaScript thread never touches this work — it stays free to handle bookings, payments, and everything else."
            },
            {
              "type": "step",
              "title": "Scenario — MakeMyTrip loads 8 config files at startup",
              "desc": "Server starts and calls fs.readFile() 8 times. libuv has 4 threads. First 4 files start immediately on threads 1-4. Files 5-8 wait in queue. When the first 4 complete (~10ms), their callbacks go to the Event Loop. The 4 freed threads immediately pick up files 5-8. All 8 files loaded in ~20ms. With blocking I/O, it would have taken 80ms sequentially."
            },
            {
              "type": "code",
              "code": "Thread pool — MakeMyTrip server startup:\n\nThread 1: [fare-rules.json]_______[hotel-config.json]\nThread 2: [payment-config.json]___[airline-config.json]\nThread 3: [promo-rules.json]______[bus-config.json]\nThread 4: [loyalty-config.json]___[train-config.json]\n\nMain JS Thread: [handling bookings][handling payments][handling searches]\n                ← NEVER touches the file work above\n\n8 files loaded in ~20ms. Main thread never blocked."
            },
            {
              "type": "info-callout",
              "text": "💡 Think of libuv as MakeMyTrip's back office. The booking agents (main thread) never go fetch documents themselves — they hand requests to the back office (libuv) and immediately take the next customer. The back office has 4 staff (thread pool) for paperwork-heavy tasks, and uses the postal system (OS kernel) for anything that involves external communication."
            },
            {
              "type": "success-callout",
              "text": "✅ libuv is what makes Node.js non-blocking. Network calls go through the OS kernel — no threads needed. File reads and DNS go through the 4-thread pool. The main JavaScript thread stays free for MakeMyTrip's booking logic. Every single async operation — hotel confirmation, payment, config loading — flows through libuv."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ The thread pool defaults to 4 threads. For MakeMyTrip servers doing heavy file processing, tuning UV_THREADPOOL_SIZE matters. For servers doing mostly database and API calls (network I/O), the default is fine — those bypass the thread pool entirely and go straight through the OS kernel."
            }
          ]
        }
      },
      {
        "id": 5,
        "title": "Worker Threads & Child Processes",
        "level": "freshers",
        "topics": [
          "Why Node.js Needs Worker Threads & How to Use Them",
          "Child Processes (spawn, fork, exec)",
          "CPU Intensive Tasks in Node.js"
        ],
        "topicDetails": {
          "Why Node.js Needs Worker Threads & How to Use Them": [
            {
              "type": "paragraph",
              "text": "MakeMyTrip's dynamic pricing engine just got complex. Instead of a simple formula, it now runs an algorithm analyzing 40+ variables per search: season, route popularity, remaining seats, competitor prices, historical booking patterns. This takes 200ms of pure CPU work. On Node.js's single thread, those 200ms mean nobody's hotel search loads, no payments process, no bookings confirm. The entire server freezes. This is the CPU problem in Node.js — and Worker Threads are the solution."
            },
            {
              "type": "curious-callout",
              "text": "❓ Node.js is great at I/O — but what happens when you need to do serious CPU work without freezing the server?"
            },
            {
              "type": "heading",
              "text": "Why the Event Loop Freezes on CPU Work"
            },
            {
              "type": "paragraph",
              "text": "Node.js's single-threaded Event Loop handles I/O brilliantly — it never blocks waiting for a database or API. But CPU work is different. When JavaScript is actively computing — running a pricing algorithm, processing a large dataset — it sits on the Call Stack the entire time. The Event Loop cannot move. Everything waits until the computation finishes."
            },
            {
              "type": "code",
              "code": "// This FREEZES MakeMyTrip's server for ~200ms:\nfunction calculateDynamicPricing(searchData) {\n  let result = 0;\n  for (let i = 0; i < 100_000_000; i++) {\n    result += complexPricingModel(searchData[i % searchData.length]);\n  }\n  return result;\n}\n\n// When this runs on the main thread:\n// t=0ms:    Priya searches MUM→DEL. calculateDynamicPricing() starts.\n// t=0-200ms: EVENT LOOP IS FROZEN\n//   → Rahul's hotel search: queued, not processed\n//   → Amit's payment of ₹12,000: queued, not processed\n//   → Sneha's flight booking: queued, not processed\n// t=200ms:  function returns, Event Loop resumes\n// Every user felt 200ms of complete server freeze."
            },
            {
              "type": "paragraph",
              "text": "You might wonder — can't libuv's thread pool handle this? No. libuv's thread pool runs C-level operations like file reads and DNS lookups. Your JavaScript pricing algorithm can only run in a V8 engine instance — and by default, there's only one: the main thread. Worker Threads solve this by creating additional V8 instances that can run JavaScript in parallel."
            },
            {
              "type": "code",
              "code": "Without Worker Threads:\n┌──────────────────────────────────────────────────────────┐\n│  Main Thread                                             │\n│  [Priya:search] [FROZEN 200ms — Rahul, Amit, Sneha wait] │\n└──────────────────────────────────────────────────────────┘\n\nWith Worker Threads:\n┌──────────────────────────────────────────────────────────┐\n│  Main Thread                                             │\n│  [Priya:search] [Rahul:hotel] [Amit:pay] [Sneha:booking] │  ← smooth\n└──────────────────────────────────────────────────────────┘\n┌──────────────────────────────────────────────────────────┐\n│  Worker Thread                                           │\n│  [pricing algorithm for Priya's MUM→DEL — 200ms]        │  ← isolated\n└──────────────────────────────────────────────────────────┘"
            },
            {
              "type": "heading",
              "text": "Using Worker Threads — The worker_threads Module"
            },
            {
              "type": "paragraph",
              "text": "The worker_threads module has a simple pattern: the main thread creates a Worker, passes data in via workerData, and listens for a message back. The worker file receives the data, does the CPU work, and sends the result back via parentPort. They don't share scope — all communication is message passing."
            },
            {
              "type": "code",
              "code": "// pricing-worker.js — runs in the Worker Thread\nconst { workerData, parentPort } = require('worker_threads');\n\nconst { route, date, seatsLeft, competitors } = workerData;\n\n// 200ms of CPU work — isolated in its own thread\n// Priya searched MUM→DEL, Dec 15 — worker calculates her price\nfunction calculateDynamicPricing({ route, date, seatsLeft, competitors }) {\n  let basePrice = 3200; // MUM→DEL base fare\n  basePrice *= getSeasonMultiplier(date);     // Dec 15 = peak: +30%\n  basePrice *= getScarcityMultiplier(seatsLeft); // 12 seats left: +15%\n  basePrice = matchCompetitorPrice(basePrice, competitors); // IndiGo at ₹4,100\n  return Math.round(basePrice);\n}\n\nconst price = calculateDynamicPricing({ route, date, seatsLeft, competitors });\n\n// Send Priya's price back to main thread\nparentPort.postMessage({ price, route });"
            },
            {
              "type": "code",
              "code": "// main-server.js — main thread never freezes\nconst { Worker } = require('worker_threads');\n\nfunction getDynamicPrice(searchParams) {\n  return new Promise((resolve, reject) => {\n    const worker = new Worker('./pricing-worker.js', {\n      workerData: searchParams\n    });\n    worker.on('message', result => resolve(result.price));\n    worker.on('error', reject);\n  });\n}\n\nasync function handleFlightSearch(req) {\n  // Priya's request: MUM→DEL, Dec 15, 1 adult\n  const searchParams = {\n    route: req.route,       // 'MUM-DEL'\n    date: req.date,         // '2024-12-15'\n    seatsLeft: 12,\n    competitors: await getCompetitorPrices(req.route, req.date)\n  };\n\n  // Worker calculates Priya's price — main thread handles Rahul, Amit, Sneha\n  const price = await getDynamicPrice(searchParams);\n  console.log(`MUM→DEL price for ${req.date}: ₹${price}`);\n  // Output: MUM→DEL price for 2024-12-15: ₹4299\n}"
            },
            {
              "type": "heading",
              "text": "Step-by-Step — Worker Thread Lifecycle"
            },
            {
              "type": "step",
              "title": "Step 1 — Priya searches MUM→DEL, main thread creates the Worker",
              "desc": "Priya opens MakeMyTrip and searches MUM→DEL for Dec 15. The main thread receives her request and immediately calls new Worker('./pricing-worker.js', { workerData: { route: 'MUM-DEL', date: '2024-12-15', seatsLeft: 12, competitors: [...] } }). Node.js spawns a new OS thread with its own V8 engine. The main thread does not wait — it moves on instantly to handle Rahul's hotel search and Amit's payment confirmation."
            },
            {
              "type": "step",
              "title": "Step 2 — Worker calculates Priya's price while the server keeps running",
              "desc": "The worker runs calculateDynamicPricing() — analyzing 40+ variables: Dec 15 is peak holiday season (+30%), only 12 seats left (+15%), IndiGo is pricing at ₹4,100 on the same route. This takes 200ms of pure CPU. During those 200ms, the main thread is fully free — Rahul's hotel results load, Amit's ₹12,000 payment confirms, Sneha books her Goa flight. Nobody waits for Priya's pricing."
            },
            {
              "type": "step",
              "title": "Step 3 — Worker sends ₹4,299 back, Priya sees her price",
              "desc": "After 200ms, the worker calls parentPort.postMessage({ price: 4299, route: 'MUM-DEL' }). The message is queued on the main thread. The worker.on('message') callback fires, the Promise resolves, and MakeMyTrip's server returns Priya's search result — MUM→DEL for ₹4,299. Total wait: just 200ms for the algorithm. Rahul, Amit, and Sneha's requests were all handled in parallel during that time."
            },
            {
              "type": "step",
              "title": "Step 4 — Worker Pool handles Sunday evening peak traffic",
              "desc": "It's Sunday 8pm — MakeMyTrip's busiest hour. 500 users are searching simultaneously. If a new worker spawned per request, that's 500 OS threads — the server crashes. Instead, MakeMyTrip pre-creates a pool of 4 workers (one per CPU core). Worker 1 prices Priya's MUM→DEL, Worker 2 prices Rahul's BLR→HYD, Worker 3 prices Sneha's DEL→GOA, Worker 4 prices Amit's CCU→BOM — all in parallel. The remaining 496 requests queue and get picked up as workers finish. No crash, no spawning cost each time."
            },
            {
              "type": "success-callout",
              "text": "✅ Worker Threads give Node.js real parallelism for JavaScript code. MakeMyTrip's pricing algorithm, fraud scoring, and PDF booking confirmations can all run in Worker Threads — main thread stays free for I/O, workers handle CPU work. Added in Node.js v10, stable in v12."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Worker Threads are for JavaScript CPU work. But what if MakeMyTrip needs to run a Python ML model to predict Priya's flight delay, or compress last night's booking logs, or talk to a separate fraud detection service? That's where Child Processes come in — entirely separate OS processes, any language."
            }
          ],

          "Child Processes (spawn, fork, exec)": [
            {
              "type": "paragraph",
              "text": "MakeMyTrip's Node.js server can't do everything alone. Their ML team built a Python model that predicts flight delay probability for every search result. Their ops team runs nightly shell scripts to compress booking logs. Their fraud team runs a separate Node.js service that scores every transaction. None of these are Worker Threads — they're completely separate programs in different languages. The child_process module lets Node.js launch and talk to these external programs without blocking the main thread."
            },
            {
              "type": "heading",
              "text": "Three Ways to Create Child Processes"
            },
            {
              "type": "paragraph",
              "text": "exec() runs a shell command and buffers the complete output — use it for short commands with small output. spawn() runs a command and streams output as it arrives — use it for long-running processes or large outputs. fork() is spawn specifically for Node.js scripts — it automatically sets up a two-way communication channel (IPC) between parent and child."
            },
            {
              "type": "step",
              "title": "exec() — Compress last night's booking logs",
              "desc": "Every night at 2am, MakeMyTrip's server compresses the previous day's booking logs to free up disk space. This is a one-off shell command with small output — exactly what exec() is built for. The main thread fires the command and moves on. When gzip finishes, the callback runs. No blocking, no streams needed."
            },
            {
              "type": "code",
              "code": "const { exec } = require('child_process');\n\n// 2am cron: compress yesterday's booking logs\n// Jan 15 had 1.2 million bookings — log file is 4.3GB\nexec('gzip /logs/bookings-2024-01-15.log', (error, stdout, stderr) => {\n  if (error) {\n    // Alert ops team — disk space at risk\n    console.error('Log compression failed:', error.message);\n    notifyOpsTeam('Log compression failed for 2024-01-15');\n    return;\n  }\n  // 4.3GB → 380MB. Disk space recovered.\n  console.log('Booking logs compressed: 4.3GB → 380MB');\n  updateDashboard({ logsCompressed: true, date: '2024-01-15' });\n});\n\n// Main thread continues — doesn't wait for gzip\nconsole.log('Compression started. Handling early morning searches...');"
            },
            {
              "type": "step",
              "title": "spawn() — Run the Python flight delay prediction model",
              "desc": "When Priya searches MUM→DEL for Dec 15, MakeMyTrip doesn't just show price — it shows delay probability too. Their ML team built this model in Python (scikit-learn + historical DGCA data). Node.js can't run Python directly, so it spawns the process, sends Priya's flight data, and streams the prediction back as it arrives — no need to wait for the process to fully finish."
            },
            {
              "type": "code",
              "code": "const { spawn } = require('child_process');\n\n// Priya searched MUM→DEL, IndiGo 6E-204, Dec 15\n// Predict delay probability using Python ML model\nconst flightData = {\n  route: 'MUM-DEL',\n  airline: 'IndiGo',\n  flight: '6E-204',\n  date: '2024-12-15',\n  departureTime: '06:30',\n  historicalDelayRate: 0.23\n};\n\nconst pythonProcess = spawn('python3', [\n  './models/delay_predictor.py',\n  '--flight', JSON.stringify(flightData)\n]);\n\npythonProcess.stdout.on('data', (data) => {\n  const prediction = JSON.parse(data.toString());\n  // { delayChance: 34, expectedDelay: 22, confidence: 0.87 }\n  console.log(`IndiGo 6E-204: ${prediction.delayChance}% chance of delay`);\n  // Show Priya: \"34% delay probability — avg 22 min late\"\n  sendToClient(prediction);\n});\n\npythonProcess.on('close', (code) => {\n  console.log('Delay prediction complete, exit code:', code);\n});\n\n// Python model runs as a separate OS process\n// Main thread: serving Rahul's hotel search simultaneously"
            },
            {
              "type": "step",
              "title": "fork() — Score Amit's ₹85,000 booking with the fraud detection service",
              "desc": "Amit tries to book 5 Goa tickets for ₹85,000 in one transaction — unusually large for his account. MakeMyTrip's fraud detection runs as a separate Node.js process (it has its own ML model, its own DB connections, its own memory). The main server forks it and sends Amit's booking data. The fraud service responds with a risk score. If high risk, the booking goes to manual review. This two-way messaging is exactly what fork() is built for."
            },
            {
              "type": "code",
              "code": "// fraud-detector.js — child process\n// Runs as a separate Node.js program with its own ML model\nprocess.on('message', (bookingData) => {\n  // Amit's booking: ₹85,000, 5 tickets, new device, Mumbai IP\n  const riskScore = analyzeBookingPatterns({\n    userId: bookingData.userId,\n    amount: bookingData.amount,       // ₹85,000 — 8x his avg booking\n    ticketCount: bookingData.tickets, // 5 — unusual\n    deviceId: bookingData.deviceId,   // new device, first time seen\n    ipLocation: bookingData.ip        // matches account home city ✓\n  });\n\n  const isHighRisk = riskScore > 0.85;\n  process.send({ riskScore, isHighRisk, userId: bookingData.userId });\n});\n\n\n// main-server.js — parent process\nconst { fork } = require('child_process');\n\nconst fraudDetector = fork('./fraud-detector.js');\n\n// Amit clicks 'Confirm Booking' — send to fraud service\nfraudDetector.send({\n  userId: 'u42-amit-sharma',\n  amount: 85000,\n  tickets: 5,\n  route: 'MUM-GOA',\n  deviceId: 'device-new-xyz',\n  ip: '103.21.xx.xx'\n});\n\nfraudDetector.on('message', (result) => {\n  if (result.isHighRisk) {\n    // Score: 0.91 — hold for manual review\n    holdBookingForReview(result.userId, result.riskScore);\n    sendSMSToAmit('Your booking is under review. We\\'ll confirm within 2 hours.');\n  } else {\n    confirmBooking();\n    sendConfirmationEmail(result.userId);\n  }\n});"
            },
            {
              "type": "table",
              "headers": ["Method", "Use Case", "Output Style", "IPC", "MakeMyTrip Example"],
              "rows": [
                ["exec()", "Short shell commands", "Buffered (all at once)", "No", "Compress nightly booking logs (4.3GB → 380MB)"],
                ["spawn()", "Long-running, any language", "Streamed", "No", "Python model: predict IndiGo 6E-204 delay for Priya"],
                ["fork()", "Another Node.js script", "Streamed + messaging", "Yes (automatic)", "Fraud score Amit's ₹85,000 Goa booking"]
              ]
            },
            {
              "type": "info-callout",
              "text": "💡 Worker Threads vs Child Processes: Worker Threads live inside the same Node.js process — lighter, JS only, share memory if needed. Child Processes are fully separate OS programs — any language, isolated memory. MakeMyTrip's Python delay model needs a Child Process. MakeMyTrip's JS pricing algorithm needs a Worker Thread."
            },
            {
              "type": "success-callout",
              "text": "✅ Child Processes let MakeMyTrip's Node.js server orchestrate work across languages and programs — Python ML predictions with spawn(), nightly log compression with exec(), and real-time fraud scoring with fork(). The main thread stays free while each child does its job independently."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ When should you use Worker Threads vs Child Processes vs just async/await? The answer depends on what kind of work you're doing. Let's look at four concrete strategies — from the lightest fix to the heaviest solution."
            }
          ],

          "CPU Intensive Tasks in Node.js": [
            {
              "type": "paragraph",
              "text": "MakeMyTrip's backend handles three kinds of CPU-intensive work every second: dynamic pricing (analyzing 40+ variables per flight search), itinerary optimization (finding the best flight + hotel + cab combination across thousands of options), and fraud detection (pattern matching Amit's ₹85,000 booking against millions of past transactions). Each one freezes the Event Loop if run unchecked on the main thread. Knowing when to offload — and how — is one of the most important skills for any Node.js engineer."
            },
            {
              "type": "heading",
              "text": "How to Spot CPU-Intensive Work"
            },
            {
              "type": "paragraph",
              "text": "Simple test: if your function has await or callbacks, it's I/O-heavy — Node.js handles it fine. If it runs a tight loop, processes a large dataset in memory, or runs a complex algorithm with no pauses — it's CPU-intensive and needs special handling. The longer it runs without yielding, the more users are left waiting."
            },
            {
              "type": "code",
              "code": "// I/O bound — Node.js handles perfectly:\nasync function searchHotels(city, checkIn, checkOut) {\n  // Priya also wants a hotel in Delhi\n  const hotels = await db.query(\n    'SELECT * FROM hotels WHERE city = ? AND available_date = ?',\n    [city, checkIn]\n  );\n  return hotels.filter(h => h.rating >= 4.0);\n  // Most time: WAITING for DB response → Event Loop is free ✅\n  // While waiting, Rahul's flight search and Amit's payment run fine\n}\n\n// CPU bound — WILL freeze Event Loop:\nfunction optimizeItinerary(flights, hotels, cabs, preferences) {\n  // Find the best MUM→DEL flight + Delhi hotel + airport cab combo\n  // 50 flights × 200 hotels × 10 cab options = 100,000 combinations\n  let bestPlan = null;\n  for (const flight of flights) {\n    for (const hotel of hotels) {\n      for (const cab of cabs) {\n        const score = scoreTrip(flight, hotel, cab, preferences);\n        if (!bestPlan || score > bestPlan.score) {\n          bestPlan = { flight, hotel, cab, score };\n        }\n      }\n    }\n  }\n  return bestPlan;\n  // 400ms of pure CPU → Rahul, Sneha, 500 others all wait ❌\n}"
            },
            {
              "type": "heading",
              "text": "Four Strategies — Lightest to Heaviest"
            },
            {
              "type": "step",
              "title": "Strategy 1 — Batch price refresh with setImmediate()",
              "desc": "Every 15 minutes, MakeMyTrip refreshes prices for all 5,000 active routes. Running this in one go freezes the server for seconds. Instead, they process 50 routes at a time and yield to the Event Loop between each batch using setImmediate(). Priya's live search, Rahul's hotel booking, and Amit's payment all go through between batches. No single freeze is longer than ~4ms. No new threads, no new processes — just smart scheduling."
            },
            {
              "type": "code",
              "code": "// Every 15 minutes: refresh prices for all 5000 MakeMyTrip routes\nasync function recalculateAllPrices(allRoutes) {\n  const results = [];\n  const chunkSize = 50; // 50 routes per batch\n\n  for (let i = 0; i < allRoutes.length; i += chunkSize) {\n    const chunk = allRoutes.slice(i, i + chunkSize);\n\n    // Process this batch — e.g. MUM-DEL, BLR-HYD, DEL-GOA...\n    for (const route of chunk) {\n      results.push(calculateRoutePrice(route));\n    }\n\n    // Yield to Event Loop between batches\n    await new Promise(resolve => setImmediate(resolve));\n    // Priya's live search, Rahul's payment, Sneha's booking\n    // all get processed here between each batch ✅\n  }\n\n  return results;\n}\n// 5000 routes → 100 batches of 50\n// Each batch: ~4ms. Between each: Event Loop runs.\n// Total: ~400ms spread out — no user ever feels it."
            },
            {
              "type": "step",
              "title": "Strategy 2 — Worker Thread for real-time fraud scoring",
              "desc": "Every time a user clicks 'Confirm Booking', MakeMyTrip runs a fraud score in real time. For Amit's ₹85,000 Goa booking, this means pattern-matching his transaction against 50 million past bookings — pure JavaScript, heavy CPU, takes ~150ms. Too heavy to chunk (it's one atomic calculation), too frequent to be a microservice call. A Worker Thread is the right fit: JS code, runs in parallel, main thread stays free for everyone else booking simultaneously."
            },
            {
              "type": "step",
              "title": "Strategy 3 — Child Process for the Python delay prediction model",
              "desc": "When Priya sees IndiGo 6E-204 in her search results, MakeMyTrip shows '34% delay probability'. This prediction comes from a Python scikit-learn model trained on 3 years of DGCA flight data — it cannot run inside Node.js. The server spawns a Python child process, sends Priya's flight details, and streams the prediction back. Completely isolated, any language, no impact on the main thread."
            },
            {
              "type": "step",
              "title": "Strategy 4 — Microservice for itinerary optimization",
              "desc": "Priya clicks 'Holiday Packages' — MakeMyTrip finds the best combination of flight + hotel + cab across 100,000+ combinations, scores them against her preferences (budget, ratings, travel time), and ranks the top 10. This runs 24/7 at massive scale — not occasionally. So MakeMyTrip runs it as a dedicated Go microservice. Node.js makes a single non-blocking HTTP call, the Go service does all the heavy computation, and returns the ranked results. Node.js does zero CPU work."
            },
            {
              "type": "code",
              "code": "// Strategy 4: Call MakeMyTrip's Go itinerary optimization service\nasync function getBestHolidayPackages(searchParams) {\n  // Priya: MUM→DEL, Dec 15-20, budget ₹25,000, prefers 4★+ hotels\n  const payload = {\n    route: searchParams.route,          // 'MUM-DEL'\n    dates: searchParams.dates,          // ['2024-12-15', '2024-12-20']\n    budget: searchParams.budget,        // 25000\n    preferences: searchParams.prefs     // { hotelRating: 4, cabType: 'sedan' }\n  };\n\n  // HTTP call to Go microservice — just I/O for Node.js\n  const response = await fetch('http://itinerary-service:8080/optimize', {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(payload)\n  });\n\n  const packages = await response.json();\n  // Go service evaluated 100,000+ combinations\n  // Returns top 10 ranked packages for Priya\n  // Node.js did ZERO CPU work — just sent and received\n  return packages;\n}"
            },
            {
              "type": "table",
              "headers": ["Situation", "Strategy", "MakeMyTrip Example"],
              "rows": [
                ["Moderate CPU, JS", "Chunk with setImmediate()", "Refresh prices for 5,000 routes every 15 minutes"],
                ["Heavy CPU, JS, per request", "Worker Threads", "Real-time fraud score on Amit's ₹85,000 booking"],
                ["Heavy CPU, Python/Go", "Child Process (spawn)", "Predict IndiGo 6E-204 delay probability for Priya"],
                ["Constant heavy CPU, any scale", "Separate microservice", "Holiday package optimizer — flight + hotel + cab combos"],
                ["Light CPU + I/O", "Just async/await", "Search Delhi hotels for Priya's dates and rating filter"]
              ]
            },
            {
              "type": "success-callout",
              "text": "✅ CPU-intensive work must never run unchecked on Node.js's main thread. Use chunking for moderate batch work, Worker Threads for heavy per-request JS algorithms, Child Processes for other languages, and microservices for constant CPU load at scale. The rule never changes: keep the Event Loop free."
            },
            {
              "type": "info-callout",
              "text": "🎯 Full picture — Node.js single thread freezes on CPU work. Worker Threads add parallel JS execution (same process, separate V8 — Amit's fraud score). Child Processes run external programs in any language (Priya's Python delay model). Microservices handle constant heavy load (holiday package optimizer). Four strategies, one rule: the Event Loop must always stay free."
            }
          ]
        }
      },

      {
        "id": 6,
        "title": "Cluster Module",
        "level": "freshers",
        "topics": [
          "What is Clustering?",
          "cluster module in Node.js",
          "Master & Worker processes",
          "Load balancing across CPU cores"
        ],
        "topicDetails": {
          "What is Clustering?": [
            {
              "type": "paragraph",
              "text": "MakeMyTrip deploys their Node.js flight search server on a machine with 16 CPU cores. But Node.js is single-threaded — by default, the entire server runs on ONE core. 15 cores sit completely idle. When Priya, Rahul, Amit, and 10,000 other users search for flights simultaneously, only 1 core handles all of them. The other 15 watch. Clustering fixes this — it runs 16 Node.js processes simultaneously, one per core, all sharing port 3000, multiplying throughput by up to 16x."
            },
            {
              "type": "curious-callout",
              "text": "❓ A single Node.js process only uses 1 CPU core. How does MakeMyTrip use all 16 cores when thousands of users search flights at the same time?"
            },
            {
              "type": "heading",
              "text": "The Problem — One Process, One Core"
            },
            {
              "type": "paragraph",
              "text": "It's December — peak holiday booking season. MakeMyTrip's servers get hit with 50,000 flight searches per minute. Priya searches MUM→DEL, Rahul searches BLR→GOA, Amit searches DEL→CCU — all at the same moment. Without clustering, all 50,000 requests queue up on 1 core. Users wait. Pages time out. Rahul switches to Cleartrip. Without clustering, MakeMyTrip is paying for a 16-core server but using only 6% of it."
            },
            {
              "type": "code",
              "code": "Without clustering — December peak traffic:\nCPU Core 1:  [████████████████] 100% — all 50,000 searches here\nCPU Core 2:  [                ]   0% — idle\nCPU Core 3:  [                ]   0% — idle\n...15 cores idle. Priya waits 8 seconds for results.\n\nWith clustering — 16 workers:\nCPU Core 1:  [████████████████] — Worker 1 handles Priya's MUM→DEL\nCPU Core 2:  [████████████████] — Worker 2 handles Rahul's BLR→GOA\nCPU Core 3:  [████████████████] — Worker 3 handles Amit's DEL→CCU\n...all 16 cores active. Everyone gets results in 200ms."
            },
            {
              "type": "heading",
              "text": "What Clustering Does"
            },
            {
              "type": "paragraph",
              "text": "Clustering runs multiple Node.js processes — called workers — that all share port 3000. Each worker is a completely independent Node.js process with its own Event Loop, its own memory, and its own V8 instance. One Master process manages them all — it forks the workers, distributes incoming flight search requests, and restarts any worker that crashes."
            },
            {
              "type": "step",
              "title": "December 20th — MakeMyTrip's busiest day of the year",
              "desc": "Schools close for Christmas holidays. 2 million users open MakeMyTrip to book flights home. Without clustering: 1 worker handles all searches. Server response time: 12 seconds. Users abandon. With clustering: 16 workers each handle their share. Worker 1 handles Priya's MUM→DEL search, Worker 2 handles Rahul's BLR→GOA, Worker 3 handles Sneha's DEL→JAI — all simultaneously. Response time stays at 200ms. No one switches to a competitor."
            },
            {
              "type": "code",
              "code": "MakeMyTrip's clustered flight search server:\n\n      [Port 3000 — all flight search requests]\n                       ↓\n             [Master Process]\n            /    |    |    \\\n         [W1]  [W2]  [W3] ... [W16]\n         Core1 Core2 Core3   Core16\n\nPriya's MUM→DEL search → W1 → Core1\nRahul's BLR→GOA search → W2 → Core2  (simultaneously)\nAmit's DEL→CCU search  → W3 → Core3  (simultaneously)\nAll 16 workers running — 16x throughput"
            },
            {
              "type": "success-callout",
              "text": "✅ Clustering gives MakeMyTrip full CPU utilization. Instead of 1 process struggling with 50,000 searches on 1 core, 16 workers split the load across 16 cores. All share port 3000. The master restarts any crashed worker automatically. MakeMyTrip handles December peak traffic without breaking a sweat."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Clustering sounds straightforward — but how does one port serve 16 processes? How does the master distribute Priya's search to Worker 1 and Rahul's to Worker 2? The cluster module handles all of this."
            }
          ],

          "cluster module in Node.js": [
            {
              "type": "paragraph",
              "text": "Node.js ships with a built-in cluster module. With about 20 lines of code, MakeMyTrip transforms their single-process flight search server into a 16-worker cluster that uses every CPU core on the machine. The same server file runs in both master and worker mode — cluster.isMaster tells the process which role it plays."
            },
            {
              "type": "heading",
              "text": "The cluster Module API"
            },
            {
              "type": "paragraph",
              "text": "The cluster module runs the same file in two contexts. When Node.js first starts, cluster.isMaster is true — this is the master. It calls cluster.fork() once per CPU core. Each forked process runs the same file again, but cluster.isMaster is now false — so it starts the HTTP server instead. All workers bind to port 3000, but the master holds the actual port and routes each incoming flight search to a worker."
            },
            {
              "type": "code",
              "code": "// makemytrip-server.js — same file, master and worker\nconst cluster = require('cluster');\nconst http = require('http');\nconst os = require('os');\n\nif (cluster.isMaster) {\n  // Fork one worker per CPU core\n  for (let i = 0; i < os.cpus().length; i++) cluster.fork();\n\n  // Restart crashed workers automatically\n  cluster.on('exit', (worker) => {\n    console.log(`Worker ${worker.id} crashed. Restarting...`);\n    cluster.fork();\n  });\n} else {\n  // Each worker handles flight search requests\n  http.createServer((req, res) => {\n    handleFlightSearch(req, res);\n  }).listen(3000);\n\n  console.log(`Worker ${process.pid} ready on port 3000`);\n}"
            },
            {
              "type": "heading",
              "text": "Step-by-Step — MakeMyTrip Server Starting Up"
            },
            {
              "type": "step",
              "title": "Step 1 — MakeMyTrip deploys makemytrip-server.js, Master process starts",
              "desc": "The ops team deploys the server. Node.js starts. cluster.isMaster is true — this process is the master. It reads os.cpus().length — finds 16 cores on the server. Calls cluster.fork() 16 times. The master's startup job is done. It will never handle a flight search directly — that is entirely the workers' job."
            },
            {
              "type": "step",
              "title": "Step 2 — 16 Workers fork and start HTTP servers",
              "desc": "Each fork() creates a new OS process running the same makemytrip-server.js. But in these processes, cluster.isMaster is false — so they enter the else branch. Each worker starts an HTTP server on port 3000 and logs 'Worker ready'. All 16 workers are now alive, all on port 3000, all waiting for flight search requests."
            },
            {
              "type": "step",
              "title": "Step 3 — Priya searches MUM→DEL, her request hits Worker 3",
              "desc": "Priya opens MakeMyTrip on her phone and searches Mumbai to Delhi for Dec 25. Her request hits port 3000. The master receives it and hands it to Worker 3 (round-robin). Worker 3 queries the flight database, fetches available seats on IndiGo, Air India, and SpiceJet, calculates prices, and sends Priya her results — all on its own. Meanwhile Workers 1, 2, 4–16 are simultaneously handling Rahul, Amit, Sneha, and 12 more users."
            },
            {
              "type": "step",
              "title": "Step 4 — Worker 7 crashes on a bad search request",
              "desc": "A user sends a search with an invalid date format — December 32nd. Worker 7 hits an unhandled exception and crashes. The master's cluster.on('exit') fires immediately. It calls cluster.fork() — a new Worker 7 spins up within milliseconds and joins the pool. The other 15 workers never paused. Priya, Rahul, and Amit's searches all completed without interruption."
            },
            {
              "type": "code",
              "code": "// Master auto-restarts crashed workers:\ncluster.on('exit', (worker, code) => {\n  if (code !== 0) { // 0 = intentional shutdown, not a crash\n    console.log(`Worker ${worker.id} crashed. Replacing...`);\n    cluster.fork(); // new worker joins pool in milliseconds\n  }\n});"
            },
            {
              "type": "success-callout",
              "text": "✅ The cluster module transforms MakeMyTrip's single-core flight server into a 16-worker powerhouse with ~20 lines of code. One master forks 16 workers (one per CPU core). All workers share port 3000. Crashed workers are auto-restarted. MakeMyTrip gets full CPU utilization on every server in their fleet."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Master and Worker have very different responsibilities. What exactly does each do — and what happens when Worker 1 updates flight prices but Worker 2 still shows the old price to Priya?"
            }
          ],

          "Master & Worker processes": [
            {
              "type": "paragraph",
              "text": "In MakeMyTrip's clustered deployment, the Master process is the manager — it forks workers, watches their health, distributes connections, and coordinates config. Workers are the actual flight search servers — each independently handles searches, price lookups, and booking confirmations. They don't share memory or variables. This creates a critical problem: if Worker 1 updates IndiGo's MUM→DEL price to ₹4,299, Worker 2 still shows the old price of ₹3,800 to Priya."
            },
            {
              "type": "heading",
              "text": "The Master Process — Coordinator, Not Handler"
            },
            {
              "type": "paragraph",
              "text": "The master never handles a single flight search request. Its entire job is coordination: fork workers, keep them alive, send config updates, collect metrics. In a healthy MakeMyTrip cluster, the master is lightly loaded — all real CPU work happens in workers. Think of the master as MakeMyTrip's operations center: it doesn't search flights, it keeps the searchers running."
            },
            {
              "type": "code",
              "code": "if (cluster.isMaster) {\n  // Fork workers and send airline config on startup\n  for (let i = 0; i < NUM_CPUS; i++) {\n    const worker = cluster.fork();\n    worker.send({ type: 'config', airlines: loadAirlineConfig() });\n  }\n\n  // Collect search metrics from all workers\n  Object.values(cluster.workers).forEach(worker => {\n    worker.on('message', (msg) => {\n      if (msg.type === 'metrics') updateDashboard(msg);\n    });\n  });\n  // Master never touches a flight search — workers do that\n}"
            },
            {
              "type": "heading",
              "text": "Worker Processes — Independent Flight Search Servers"
            },
            {
              "type": "paragraph",
              "text": "Each worker is a completely independent Node.js process with its own heap, its own Event Loop, and its own copy of every variable. Workers do NOT share JavaScript memory with each other or with the master. This is the most important thing to understand about clustering — and the most common source of bugs in MakeMyTrip-scale applications."
            },
            {
              "type": "code",
              "code": "// THE BUG — workers don't share memory:\nlet mumDelPrice = 3800; // IndiGo MUM→DEL base price\n\n// Airline API updates price — hits Worker 1:\napp.post('/update-price', (req, res) => {\n  mumDelPrice = 4299; // only Worker 1 knows this ❌\n});\n\n// Priya checks price — her request hits Worker 5:\napp.get('/flight-price', (req, res) => {\n  res.json({ price: mumDelPrice }); // returns ₹3800 — wrong! ❌\n});\n\n// THE FIX — shared prices live in Redis:\napp.post('/update-price', async (req, res) => {\n  await redis.set('MUM-DEL-IndiGo', 4299); // all workers read this\n});\napp.get('/flight-price', async (req, res) => {\n  const price = await redis.get('MUM-DEL-IndiGo'); // ₹4299 ✅\n  res.json({ price });\n});"
            },
            {
              "type": "heading",
              "text": "Step-by-Step — Master-Worker Flow at MakeMyTrip"
            },
            {
              "type": "step",
              "title": "Step 1 — Master sends airline config to all workers on startup",
              "desc": "MakeMyTrip's server starts on December 1st — the start of holiday booking season. The master loads airline configurations from disk: IndiGo base fares, Air India routes, SpiceJet schedules. It sends this config to all 16 workers via IPC: worker.send({ type: 'config', airlines: airlineConfig }). Each worker caches it locally. Now all 16 workers can answer Priya's MUM→DEL search without each doing a slow disk read independently."
            },
            {
              "type": "step",
              "title": "Step 2 — Priya's flight search hits Worker 4, handled completely independently",
              "desc": "Priya searches MUM→DEL for Dec 25. Her request routes to Worker 4. Worker 4 uses its local airline config, queries the flight availability database (async), fetches real-time seat counts from IndiGo and Air India APIs (async), applies pricing rules, and returns 12 flight options to Priya — all on its own. Worker 4 never needs to talk to Worker 1, 3, or the master. It has everything it needs."
            },
            {
              "type": "step",
              "title": "Step 3 — IndiGo raises MUM→DEL fare, Worker 9 updates Redis",
              "desc": "At 2pm, IndiGo's API pushes a price update — MUM→DEL Dec 25 is now ₹4,299, up from ₹3,800. This update hits Worker 9. Worker 9 writes the new price to Redis: redis.set('MUM-DEL-IndiGo-Dec25', 4299). Now when Rahul's price check hits Worker 12, Worker 12 reads ₹4,299 from Redis and shows him the correct fare. If Worker 9 had only updated its local variable, Rahul and every other user who hit a different worker would still see ₹3,800 — wrong price, lost trust."
            },
            {
              "type": "step",
              "title": "Step 4 — Workers send search metrics to master every 10 seconds",
              "desc": "Every 10 seconds, each worker reports to the master: process.send({ type: 'metrics', searchCount: 3241, avgResponseTime: 180, topRoute: 'MUM-DEL' }). The master aggregates from all 16 workers — total searches: 51,856, avg response time: 176ms, most searched route today: MUM-DEL. This goes to MakeMyTrip's monitoring dashboard so the ops team can watch peak traffic in real time."
            },
            {
              "type": "step",
              "title": "Step 5 — Worker 11 crashes on a bad airline API response, master replaces it in 100ms",
              "desc": "SpiceJet's API returns malformed JSON for a GOA flight. Worker 11 hits an unhandled JSON parse error and crashes. The master's cluster.on('exit') fires — exit code is 1 (crash, not intentional). Master immediately calls cluster.fork(). New Worker 11 starts, receives the airline config from master, and joins the pool. Total gap: ~100ms. Priya, Rahul, Sneha, and Amit's searches all continued on the other 15 workers without any interruption."
            },
            {
              "type": "success-callout",
              "text": "✅ Master coordinates, workers serve. Master handles forking, health monitoring, config distribution, and metrics aggregation. Workers handle all flight search requests independently on separate CPU cores. Shared state like flight prices, seat availability, and active booking sessions lives in Redis — the single source of truth that all 16 workers read and write consistently."
            },
            {
              "type": "warning-callout",
              "text": "⚠️ Workers run in parallel — but how does incoming traffic get split across them? The load balancing mechanism determines whether each worker gets a fair share, or whether Worker 1 gets overwhelmed with 10,000 searches while Worker 16 handles only 200."
            }
          ],

          "Load balancing across CPU cores": [
            {
              "type": "paragraph",
              "text": "MakeMyTrip's cluster has 16 workers. During December peak, 50,000 flight searches per minute hit port 3000. How do searches get split — does Worker 1 get crushed with 30,000 while Worker 16 handles 2,000? Or does each worker get exactly 3,125? This is load balancing in a Node.js cluster — and it determines whether MakeMyTrip's December traffic kills the server or gets handled gracefully."
            },
            {
              "type": "heading",
              "text": "Two Load Balancing Approaches"
            },
            {
              "type": "paragraph",
              "text": "Node.js cluster uses round-robin by default on Linux and macOS — the master accepts each incoming connection and hands it to the next worker in sequence. On Windows, the OS itself distributes connections, which can be uneven. Node.js strongly recommends round-robin because it guarantees equal distribution — critical for MakeMyTrip's traffic where one slow worker can cascade into timeouts for thousands of users."
            },
            {
              "type": "code",
              "code": "// Force round-robin (recommended, default on Linux/macOS):\ncluster.schedulingPolicy = cluster.SCHED_RR;\n\n// Let OS decide (can be uneven — not recommended):\ncluster.schedulingPolicy = cluster.SCHED_NONE;"
            },
            {
              "type": "heading",
              "text": "Round-Robin — How MakeMyTrip Splits 50,000 Searches"
            },
            {
              "type": "paragraph",
              "text": "In round-robin, the master hands each new connection to the next worker in sequence — Priya's search to Worker 1, Rahul's to Worker 2, Amit's to Worker 3, and so on up to Worker 16, then loops back. Every worker gets the same number of searches over time. No worker starves. No worker drowns."
            },
            {
              "type": "code",
              "code": "MakeMyTrip — December peak, 50,000 searches/minute:\n\nSearch 001 → Worker 1  (Priya: MUM→DEL, Dec 25)\nSearch 002 → Worker 2  (Rahul: BLR→GOA, Dec 24)\nSearch 003 → Worker 3  (Amit: DEL→CCU, Dec 26)\n...\nSearch 016 → Worker 16 (Sneha: HYD→JAI, Dec 25)\nSearch 017 → Worker 1  (loops back)\n...\nAfter 1 minute: each worker handled exactly 3,125 searches.\nAll 16 cores at 100%. No user waited more than 200ms."
            },
            {
              "type": "heading",
              "text": "Step-by-Step — MakeMyTrip December 20th Peak Traffic"
            },
            {
              "type": "paragraph",
              "text": "December 20th — schools close, offices wind down. MakeMyTrip's biggest traffic day of the year. 2 million users open the app within 2 hours. Here's exactly how the clustered server handles it:"
            },
            {
              "type": "step",
              "title": "t=0ms — 2 million users hit port 3000 within 2 hours",
              "desc": "From 10am to 12pm, 2 million flight searches pour in. The OS delivers all incoming connections to the master's port 3000 socket. The master starts accepting and distributing as fast as it can. Without clustering, this kills the server — 1 core, 2 million searches, multi-minute wait times. With clustering, the master immediately begins splitting the load across 16 workers."
            },
            {
              "type": "step",
              "title": "t=1ms — Master distributes round-robin to 16 workers",
              "desc": "Priya's MUM→DEL search goes to Worker 1. Rahul's BLR→GOA goes to Worker 2. Amit's DEL→CCU goes to Worker 3. The cycle repeats — 16 workers each receive their equal share. Within 1ms, all 16 workers have received thousands of searches and are immediately processing them — querying flight databases, fetching seat availability from airline APIs, calculating prices."
            },
            {
              "type": "step",
              "title": "t=1ms to t=200ms — 16 cores process searches in parallel",
              "desc": "All 16 workers run simultaneously on 16 cores. Worker 1 is fetching IndiGo seat data for Priya (async). Worker 2 is querying SpiceJet fares for Rahul (async). Worker 3 is calculating multi-stop options for Amit (async). None block each other. 16 independent servers, 16 CPU cores, all at 100%. 2 million searches processed across 2 hours — peak response time stays at 200ms."
            },
            {
              "type": "step",
              "title": "t=200ms — Priya, Rahul, and Amit all see their results",
              "desc": "Flight database queries return (async). Airline API responses arrive (async). Pricing calculations complete. All 16 workers send their results back to users simultaneously. Priya sees 12 MUM→DEL flights. Rahul sees BLR→GOA options with prices. Amit sees DEL→CCU availability. Response time: 200ms across the board. Without clustering, they'd still be waiting 4 minutes."
            },
            {
              "type": "step",
              "title": "Worker 6 slows down — NGINX steps in",
              "desc": "During peak, Worker 6 got unlucky — it received several searches that triggered slow Air India API calls simultaneously. Worker 6's response time spikes to 3 seconds while other workers respond in 200ms. The cluster module's round-robin doesn't rebalance in-flight requests. This is why MakeMyTrip runs NGINX in front of the cluster — NGINX uses least-connections balancing and automatically stops sending new searches to Worker 6 until it recovers."
            },
            {
              "type": "code",
              "code": "# nginx.conf — MakeMyTrip production setup:\nupstream makemytrip_flight_servers {\n  least_conn; # route to worker with fewest active connections\n  server flight-server-01:3000;\n  server flight-server-02:3000;\n  server flight-server-03:3000;\n  # Each server runs 16 Node.js cluster workers internally\n}\n# Total: 3 servers × 16 workers = 48 parallel Node.js processes\n# NGINX balances across servers, cluster balances across cores"
            },
            {
              "type": "table",
              "headers": ["Layer", "Tool", "Balances Across", "MakeMyTrip Usage"],
              "rows": [
                ["Global", "AWS Load Balancer", "Data centers worldwide", "Mumbai, Singapore, US servers"],
                ["Server", "NGINX", "Multiple server machines", "flight-server-01 to flight-server-10"],
                ["Process", "Node.js Cluster", "CPU cores per machine", "16 workers per server"],
                ["Thread", "Worker Threads", "CPU cores (for CPU tasks)", "Dynamic pricing calculations"]
              ]
            },
            {
              "type": "success-callout",
              "text": "✅ Node.js cluster's round-robin load balancing evenly splits MakeMyTrip's 50,000 searches/minute across all 16 workers. Combined with NGINX at the server level and AWS globally, MakeMyTrip handles December peak traffic — 2 million searches in 2 hours — with 200ms response times across the board."
            },
            {
              "type": "info-callout",
              "text": "🎯 Full picture — Clustering solves Node.js's single-core limitation by running one worker per CPU core. The master coordinates and distributes via round-robin. Workers handle Priya's flight searches, Rahul's price checks, and Amit's bookings independently. Shared state (flight prices, seat availability) lives in Redis. NGINX handles server-level load balancing. Together, this stack is what keeps MakeMyTrip running smoothly on December 20th — their highest traffic day of the year."
            }
          ]
        }
      }




    ]
  }
];
