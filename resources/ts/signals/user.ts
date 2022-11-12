import { createSignal } from "solid-js";
import User from "../contracts/user";

export const [user, setUser] = createSignal<User>()