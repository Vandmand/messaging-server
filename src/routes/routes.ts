import messageNew from "./messages/new";
import index from "./messages/index";
import login from "./users/login";
import logout from "./users/logout";
import _new from "./users/new";

export default {
  messages: { new: messageNew, index: index },
  users: { login, logout, new: _new },
};
