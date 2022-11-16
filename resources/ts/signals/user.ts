import { createSignal, Resource } from "solid-js";
import User from "../contracts/user";

export const [user, setUser] = createSignal<Resource<User | undefined>>()