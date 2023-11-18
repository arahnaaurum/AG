//NB Не ставлю axios, потому что для уровня сложности данного проекта достаточно fetch
import { URL } from "../constant";
import { User, UserResponse } from "../types/user";

export async function fetchAllUsers(pageNumber?: number): Promise<UserResponse | undefined> {
  const response = await fetch(`${URL}/users${pageNumber ? `?page=${pageNumber}` : ''}`);
  if (response.ok) {
    const result = await response.json();
    return result;
  }
}

export async function fetchUserById(id: number): Promise<User | undefined> {
  const response = await fetch(`${URL}/users/${id}`);
  if (response.ok) {
    const result = await response.json();
    return result.data;
  }
}

export async function registerUser(email: string, password: string): Promise<{id: number; token: string} | undefined> {
  //На не-тестовом API тело запроса формировалось бы следующим образом:
  // const data = {
  //   email: email,
  //   password: password
  // }
  //Но для API reqres.in подставим мок-данные
  const data = {
    email: "eve.holt@reqres.in",
    password: "pistol"
  }
  const response = await fetch(`${URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
}

export async function patchUser(key: string, value: string, id: number) {
  let data = {
    [key]: value
  };
  const response = await fetch(`${URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const result = await response.json();
    return result[key]
  }
}