# SocketMan

This package is a developer tool for monitoring and testing Socket.IO events.

### Getting Started

1. Download the npm package `npm i socketman`
2. Add `socketman.io` to the cors property of your Socket.IO server instance
3. Invoke the setup method using your Socket.IO server instance

```JS
const { createServer } = require("http");
const { Server } = require("socket.io");
const { setup } = require("socketman");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: ["http://socketman.io"]
  }
});

setup(io);

httpServer.listen(3000);
```

4. Navigate to socketman.io in your browser
5. Use the credentials from the `setup` method to create a connection between the webpage's socket instance and your server

---

### Options

`setup(io, options)`

```JS
namespaceName: string?
auth: {username, password} | false
```

#

**`namespaceName`** _optional_

Default: `'/admin'`

The name of the namespace which will be created to inteface with socketman.io

#

**`auth`** _mandatory_

Default: `-`

If specifying options, auth is mandatory. Auth can be disabled:

```
setup(io, {
  auth: false
});
```

Or endbled:

```
setup(io, {
  auth: false
});
```

---

### Usage

**Listen Page**

All events will be logged to the Listen page. Here events can be filtered by attributes including:

- Event Name
- Room
- Namespace
- Direction (Incoming, Outgoing, Test Emit)
- Socket ID

**Emit Page**

Test events on this page. Create an event by providing an event name. Optionally, add any desired payloads or a callback. Payloads must be provided in JSON format; a red indicator will appear on the argument if the JSON is invalid or does not match the user-defined type.

Save an event by giving it a name in the Save or Load Event section of the page and then clicking "Save Event". Saved events are added to local storage. To load an event, select one from the dropdown.

---

## Contributors

<table>
    <td align="center">
    <a href="https://github.com/kmccracko">
    <img src="https://avatars.githubusercontent.com/u/46660286?v=4" width="100px;" alt=""/>
    <br />
    <sub><b>kmccracko</b></sub>
    </a>
    </td>
    <td align="center">
    <a href="https://github.com/moodymango">
    <img src="https://avatars.githubusercontent.com/u/84095263?v=4" width="100px;" alt=""/>
    <br />
    <sub><b>moodymango</b></sub>
    </a>
    </td>
    <td align="center">
    <a href="https://github.com/nia-h">
    <img src="https://avatars.githubusercontent.com/u/45723309?s=60&v=4" width="100px;" alt=""/>
    <br />
    <sub><b>nia-h</b></sub>
    </a>
    </td>
    <td align="center">
    <a href="https://github.com/mar815">
    <img src="https://avatars.githubusercontent.com/u/100739715?s=60&v=4" width="100px;" alt=""/>
    <br />
    <sub><b>mar815</b></sub>
    </a>
    </td>
</table>
