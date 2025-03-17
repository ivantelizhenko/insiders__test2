export function saveToLocalStage(key: string, object: any) {
  const stringObject = JSON.stringify(object);

  localStorage.setItem(key, stringObject);
}

export function getLocalStorage(key: string) {
  const data = localStorage.getItem(key);

  if (!data) return;

  return JSON.parse(data);
}
