// Multi-user session test script (Node 18+ required for global fetch)
const SERVER = process.env.SERVER || "http://localhost:4000";
const headers = { "Content-Type": "application/json" };

async function ensureUser(username, password, firstName, lastName) {
  // try signup
  let res = await fetch(`${SERVER}/api/users/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ username, password, firstName, lastName }),
  });
  if (res.status === 400) {
    // already exists; signin
    res = await fetch(`${SERVER}/api/users/signin`, {
      method: "POST",
      headers,
      body: JSON.stringify({ username, password }),
    });
  }
  if (!res.ok) throw new Error(`Failed to establish session for ${username}`);
  const user = await res.json();
  return { user, cookie: res.headers.get("set-cookie") };
}

async function withCookie(url, options, cookie) {
  return fetch(url, {
    ...options,
    headers: { ...options.headers, Cookie: cookie },
  });
}

async function main() {
  const u1 = await ensureUser("tester1", "pass123", "Tester", "One");
  const u2 = await ensureUser("tester2", "pass123", "Tester", "Two");

  // Fetch courses and enroll second user in first course
  const coursesRes = await fetch(`${SERVER}/api/courses`);
  const courses = await coursesRes.json();
  if (courses.length) {
    const targetCourse = courses[0];
    console.log("Enrolling tester2 in course", targetCourse._id);
    const enrollRes = await withCookie(
      `${SERVER}/api/courses/${targetCourse._id}/enroll`,
      { method: "POST", headers },
      u2.cookie
    );
    console.log("Enroll status", enrollRes.status);
  }

  // Profile checks
  const profile1 = await withCookie(
    `${SERVER}/api/users/profile`,
    { method: "POST", headers },
    u1.cookie
  );
  const profile2 = await withCookie(
    `${SERVER}/api/users/profile`,
    { method: "POST", headers },
    u2.cookie
  );
  console.log("Profile1", await profile1.json());
  console.log("Profile2", await profile2.json());
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
