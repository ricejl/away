import NotificationService from "./NotificationService.js";
import Axios from "axios";
let baseUrl = location.host.includes("localhost") ? "//localhost:3000/" : "/";

let auth = Axios.create({
  baseURL: baseUrl + "account/",
  timeout: 3000,
  withCredentials: true
});
let api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true
});
export default class AuthService {
  static async Login(creds) {
    try {
      let res = await auth.post("login", creds);
      return res.data;
    } catch (e) {
      NotificationService.errorMessage("Wrong email or password");
      throw new Error(
        `[login failed] : ${
          !e.response ? "No response from server" : e.response.data.error
        }`
      );
    }
  }
  static async Register(creds) {
    try {
      let res = await auth.post("register", creds);
      return res.data;
    } catch (e) {
      throw new Error(
        `[registration failed] : ${
          !e.response ? "No response from server" : e.response.data.error
        }`
      );
    }
  }
  static async Logout() {
    try {
      let res = await auth.delete("logout");
      return true;
    } catch (e) {
      throw new Error(
        `[logout failed] : ${
          !e.response ? "No response from server" : e.response.data.error
        }`
      );
    }
  }

  static async Authenticate() {
    try {
      let res = await auth.get("authenticate");
      let profile = await api.get("profiles");
      console.log("AuthService profile:", profile.data);
      return { user: res.data, profile: profile.data };
      // return res.data
    } catch (e) {
      console.warn(
        `[Authentication failed] : ${
          !e.response ? "No response from server" : e.response.data.error
        }`
      );
    }
  }
  static async AuthenticateCollab(collab) {
    try {
      let res = await auth.post("authenticateCollab", collab);
      console.log("From Authservice:" + collab, res.data);
      return res.data;
    } catch (e) {
      console.warn(e);
      NotificationService.errorMessage("Member not found");
    }
  }
  static async updateUserHasProfile() {
    try {
      let res = await auth.put("update");
      console.log("From updateUserHasProfile" + res.data);
      return res.data;
    } catch (error) {
      console.warn(error);
    }
  }
}
