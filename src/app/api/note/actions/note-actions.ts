import { TResult } from "@/app/types/note";
import { TCreateNote } from "@/app/types/create-note";

export async function createNoteToDB(noteDetails: TCreateNote) {
  try {
    const response = await fetch("http://localhost:3000/api/note/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteDetails),
    });

    const result = await response.json();

    if (!response.ok) {
      // Use the error message from the API if available
      throw new Error(result.error || "Failed to save note");
    }
    if (!result.success) {
      throw new Error(result.error || "Failed to save note");
    }
    return result;
  } catch (err) {
    // err.message will contain the API error message if provided
    throw Error(`${err}`);
  }
}

export async function retriveNote() {
  try {
    const response = await fetch("http://localhost:3000/api/note/", {
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

export async function deleteNote(id: number) {
  try {
    const response = await fetch("/api/note", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete note");
    }
    const result: TResult = await response.json();
    return result;
  } catch (err) {
    throw Error(`${err}`);
  }
}
