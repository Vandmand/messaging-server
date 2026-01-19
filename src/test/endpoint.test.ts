test("Server index return 200", async () => {
  const res = await fetch("http://localhost:6969");

  expect(res.status).toBe(200);
});

test("Create user endpoint", async () => {
  const res = await fetch("http://localhost:6969/users/new", {
    method: "POST",
    body: JSON.stringify({
      name: "test",
      password: "test",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  expect([200, 500]).toContain(res.status);
});

test("Get user messages", async () => {
  const res = await fetch("http://localhost:6969/messages");

  expect(res.status).toBe(200);
});

test("User login successful", async () => {
  const res = await fetch("http://localhost:6969/users/login", {
    method: "POST",
    body: JSON.stringify({
      name: "test",
      password: "test",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const { uuid } = await res.json();
  expect(uuid).toBeDefined();
});

test("User logout successful", async () => {
  const res = await fetch("http://localhost:6969/users/login", {
    method: "POST",
    body: JSON.stringify({
      name: "test",
      password: "test",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const { uuid } = await res.json();

  const res2 = await fetch("http://localhost:6969/users/logout", {
    method: "POST",
    body: JSON.stringify({
      uuid: uuid,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  expect(res2.status).toBe(200);
});

test("Message sent", async () => {
  const res = await fetch("http://localhost:6969/users/login", {
    method: "POST",
    body: JSON.stringify({
      name: "test",
      password: "test",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const { uuid } = await res.json();

  const messages = await fetch("http://localhost:6969/messages/new", {
    method: "POST",
    body: JSON.stringify({
      from: uuid,
      content: "Hiii :3",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  expect(messages.status).toBe(200);

  await fetch("http://localhost:6969/users/logout", {
    method: "POST",
    body: JSON.stringify({
      uuid: uuid,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
});
