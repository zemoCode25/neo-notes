import { TResult } from "@/app/types/content";

export async function createNote(formData: FormData) {
  const title = formData.get("title"); // Get data from form fields
  const note = formData.get("note");

  try {
    const response = await fetch("/api/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title, note: note }),
    });
    const result: TResult = await response.json();
    if (!response.ok) {
      throw new Error("Failed to save note");
    }
    return result;
  } catch (err) {
    throw Error(`${err}`);
  }
}

export async function retriveNote() {
  try {
    const response = await fetch("/api/note", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error("Failed to save note");
    }
    return result;
  } catch (err) {
    throw Error(`${err}`);
  }
}
export async function updateNote(formData: FormData, id: number) {
  const title = formData.get("title"); // Get data from form fields
  const note = formData.get("note");

  try {
    const response = await fetch("/api/note", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, title: title, note: note }),
    });
    const result: TResult = await response.json();
    if (!response.ok) {
      throw new Error("Failed to save note");
    }
    return result;
  } catch (err) {
    throw Error(`${err}`);
  }
}
