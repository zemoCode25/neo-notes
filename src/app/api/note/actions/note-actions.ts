import { TResult } from "@/app/types/note";
import { TCreateNote } from "@/app/types/create-note";
import { TNote } from "@/app/types/note";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createNoteToDB(noteDetails: TCreateNote) {
  try {
    const response = await fetch(`${API_URL}/api/note/`, {
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
    const response = await fetch(`${API_URL}/api/note`, {
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

export async function updateNoteToDB(noteDetails: TNote) {
  try {
    const response = await fetch(`${API_URL}/api/note/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteDetails),
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
    const response = await fetch(`${API_URL}/api/note/`, {
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
