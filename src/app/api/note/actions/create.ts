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
    const result = await response.json();
    console.log(result);
  } catch (err) {
    throw Error(`${err}`);
  }
}
