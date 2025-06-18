import { TCreateLabel } from "@/app/types/label/create-label";
import { TLabel } from "@/app/types/label/label";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function retriveAllLabels() {
  try {
    const response = await fetch(`${API_URL}/api/label`, {
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

export async function createLabelToDB(labelDetails: TCreateLabel) {
  try {
    const response = await fetch(`${API_URL}/api/label`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(labelDetails),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Failed to create label");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error creating label:", error);
    throw Error(`${error}`);
  }
}

export async function updateLabelToDB(labelDetails: TLabel) {
  try {
    const response = await fetch(`${API_URL}/api/label/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(labelDetails),
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(response?.status);
      console.log(result?.error);
      throw new Error("Failed to save label");
    }
    return result;
  } catch (err) {
    throw Error(`${err}`);
  }
}

export async function deleteLabelToDB(id: number) {
  try {
    const response = await fetch(`${API_URL}/api/label/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete label");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    throw Error(`${err}`);
  }
}
