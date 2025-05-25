export async function fetchSidebarItems() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return random mock data
  return [
    { id: "1", name: "Dashboard" },
    { id: "2", name: "Notes" },
    { id: "3", name: "Tasks" },
    { id: "4", name: "Settings" },
  ];
}
