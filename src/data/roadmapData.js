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
    description: "Complete guide to mastering Authentication in Node.js from basics to production systems",
    nodes: [

      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is Authentication?",
          "Authentication vs Authorization",
          "Why Authentication matters",
          "HTTP Stateless nature & why sessions are needed",
          "Password Hashing basics (bcrypt)"
        ]
      },

      {
        id: 2,
        title: "Token Based Authentication",
        level: "freshers",
        topics: [
          "What is JWT (JSON Web Token)?",
          "JWT Structure (Header, Payload, Signature)",
          "Signing & Verifying JWT",
          "Access Token vs Refresh Token",
          "Storing Tokens (Cookie vs LocalStorage)",
          "Token Expiry & Renewal"
        ]
      },

      {
        id: 3,
        title: "Session Based Authentication",
        level: "freshers",
        topics: [
          "Session-based auth (cookies + server session)",
          "Session vs Token based Auth",
          "Session Store (Memory, Redis)",
          "Session Fixation basics",
          "Logout & Session Destruction"
        ]
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
          "GitHub OAuth in Node.js",
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
          "CORS in Authentication context",
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
    description: "Complete guide to mastering Caching from basics to production-grade distributed systems",
    nodes: [

      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is Caching?",
          "Why Caching matters (Speed, Cost, Scale)",
          "Cache Hit vs Cache Miss",
          "Cache Hit Ratio",
          "Where Cache Lives (Browser, Server, DB, CDN)",
          "Why Netflix needs Caching (streaming at scale)"
        ]
      },

      {
        id: 2,
        title: "Cache Reading Strategies",
        level: "freshers",
        topics: [
          "Cache-Aside (Lazy Loading)",
          "Read-Through Cache",
          "When to use which strategy"
        ]
      },

      {
        id: 3,
        title: "Cache Writing Strategies",
        level: "freshers",
        topics: [
          "Write-Through Cache",
          "Write-Behind (Write-Back) Cache",
          "Write-Around Cache",
          "Pros & Cons of each"
        ]
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
        ]
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
    description: "WebSockets",
    nodes: [

      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is WebSocket?",
          "HTTP vs WebSocket",
          "Why HTTP is not enough for Real-Time",
          "Request-Response vs Full-Duplex",
          "WebSocket Handshake (Upgrade request)",
          "ws:// vs wss://"
        ]
      },

      {
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
    description: "Complete guide to mastering load balancing from basics to production systems",
    nodes: [

      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What is Load Balancing?",
          "Why Load Balancers are needed",
          "Problems without Load Balancer (single server overload)",
          "High Availability (HA) basics"
        ]
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

        ]
      },

      {
        id: 3,
        title: "State Management",
        level: "freshers",
        topics: [
          "Stateless vs Stateful systems",
          "Sticky Sessions (Session Affinity)"
        ]
      },

      {
        id: 4,
        title: "Health Checks & Failover",
        level: "freshers",
        topics: [
          "Active health checks",
          "Passive health checks",
          "Failover handling"
        ]
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
    description: "Complete guide to mastering Node.js Streams from basics to production systems",
    nodes: [
      {
        id: 1,
        title: "Basics (Foundation)",
        level: "freshers",
        topics: [
          "What are Streams?",
          "Why Streams are needed",
          "Problems without Streams (memory overload with large files)",
          "Buffer vs Stream",
          "Event-driven architecture basics"
        ]
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
          "PassThrough Streams"
        ]
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
        ]
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
  }
];
