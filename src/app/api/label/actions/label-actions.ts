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
